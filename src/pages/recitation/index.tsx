import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import Sound from 'react-native-sound';
import DropdownComponent from '../../components/DropdownComponent';
import { fetchRecitations, fetchSurahsFromAlquran } from '../../utils/api';

interface AudioFile {
  id: number;
  chapter_id: number;
  file_size: number;
  format: string;
  audio_url: string;
}

interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

interface Recitation {
  id: number;
  reciter_name: string;
  style: string | null;
}

const SurahsRecitation: React.FC = () => {
  const [reciterId, setReciterId] = useState(1); 
  const [chapter, setChapter] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [audioLoading, setAudioLoading] = useState<{ [key: number]: boolean }>({});
  const [audioUrls, setAudioUrls] = useState<{ [key: number]: string }>({});
  const [playingSurah, setPlayingSurah] = useState<number | null>(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [recitations, setRecitations] = useState<{ label: string, value: number }[]>([]);

  useEffect(() => {
    

    fetchSurahsFromAlquran(setChapter, setLoading);
  }, []);

  useEffect(() => {
    fetchRecitations(setRecitations);
    
  }, []);
  

  useEffect(() => {
    if (reciterId) {
      setAudioUrls({});
      setPlayingSurah(null);
      if (sound) {
        sound.release();
        setSound(null);
      }
    }
  }, [reciterId]);

  const fetchAudioUrl = async (surahId: number) => {
    if (reciterId) {
      try {
        const response = await axios.get<AudioFile>(`https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${surahId}`);
        const audioUrl = response.data.audio_file.audio_url;
        setAudioUrls((prevUrls) => ({ ...prevUrls, [surahId]: audioUrl }));
        return audioUrl;
      } catch (error) {
        console.error('Error fetching audio URL:', error);
        Alert.alert('Error', 'Failed to fetch audio URL. Please try again.');
      }
    }
  };

  const handlePlayPause = async (surahId: number) => {
    if (playingSurah === surahId) {
      if (sound) {
        sound.stop(() => setPlayingSurah(null));
      }
    } else {
      try {
        setAudioLoading((prevLoading) => ({ ...prevLoading, [surahId]: true })); // Start loading state for specific surahId
        if (!audioUrls[surahId]) {
          const audioUrl = await fetchAudioUrl(surahId);
          if (audioUrl) {
            playSound(audioUrl, surahId);
          }
        } else {
          playSound(audioUrls[surahId], surahId);
        }
      } finally {
        setAudioLoading((prevLoading) => ({ ...prevLoading, [surahId]: false })); // End loading state for specific surahId
      }
    }
  };

  const playSound = (url: string, surahId: number) => {
    if (sound) {
      sound.release();
    }

    const soundInstance = new Sound(url, '', (error) => {
      if (error) {
        Alert.alert('Error', error.message);
        return;
      }
      soundInstance.play(() => {
        setPlayingSurah(null);
        soundInstance.release();
      });
    });

    setSound(soundInstance);
    setPlayingSurah(surahId);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#863ED5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.surahText}>اختر القارئ المفضل لديك</Text>
      <Text style={styles.surahText}>Choose Your Favorite Reciter</Text>
      <DropdownComponent
        data={recitations}
        placeholder="Select a reciter"
        searchPlaceholder="Search reciter..."
        selectedValue={reciterId}
        setSelectedValue={setReciterId}
      />
      <ScrollView style={styles.container}>
        {chapter.map((surah) => (
          <TouchableOpacity key={surah.id} onPress={() => handlePlayPause(surah.id)}>
            <View style={styles.surah}>
              <TouchableOpacity onPress={() => handlePlayPause(surah.id)}>
                {playingSurah === surah.id ? (
                  <Image source={require('../../icon/pause.png')} style={{ width: 20, height: 20 }} />
                ) : (
                  <>
                    {audioLoading[surah.id] ? (
                      <ActivityIndicator size="small" color="#863ED5" />
                    ) : (
                      <Image source={require('../../icon/play.png')} style={{ width: 20, height: 20 }} />
                    )}
                  </>
                )}
              </TouchableOpacity>
              <View>
                <Text style={styles.surahText}>{surah.name_arabic}</Text>
                <Text style={styles.englishName}>{surah.name_simple}</Text>
              </View>
            </View>
            <View style={styles.divider} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  surahText: {
    fontSize: 20,
    color: '#863ED5',
    fontWeight: '700',
    fontFamily: 'Amiri-Bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  surah: {
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    height: 62,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  englishName: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#240F4F',
  },
});

export default SurahsRecitation;
