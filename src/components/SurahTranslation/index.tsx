import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { fetchSurahById } from '../../utils/api';
import Verse from '../global/Verse';
import SurahInfo from '../global/SurahInfo';
import axios from 'axios';

type Ayah = {
  number: number;
  audio: string;
  text: string;
  numberInSurah: number;
  sajda: boolean;
};

type Surah = {
  ayahs: Ayah[];
};

type SurahTranslationProps = {
  route: RouteProp<{ params: { surahId: number; surahName: string; arabicName: string; numberOfAyahs: string; revelationType: string; } }, 'params'>;
};

const Item: React.FC<{ ayah: Ayah, translation: string }> = ({ ayah, translation }) => (
  <View style={styles.item}>
    <Verse ayah={ayah.text} verseNo={ayah.numberInSurah} ayahAudio={ayah.audio} sajda={ayah.sajda} translation={translation} />
  </View>
);

const SurahTranslation: React.FC<SurahTranslationProps> = ({ route }) => {
  const { surahId, surahName, arabicName, numberOfAyahs, revelationType } = route.params;
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [translations, setTranslations] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<number | string>('en.asad');

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const res = await fetchSurahById(surahId);
        setSurah(res);
      } catch (error) {
        console.error('Error fetching Surah:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurah();
  }, [surahId]);

  useEffect(() => {
    axios.get(`https://api.quran.com/api/v4/chapter_recitations/1/${surahId}`)
      .then(res => setAudioUrl(res.data.audio_file.audio_url))
      .catch(error => console.log(error));
  }, [surahId]);

  useEffect(() => {
    axios.get(`https://api.alquran.cloud/v1/surah/${surahId}/${selectedLanguage}`)
      .then(res => setTranslations(res.data.data.ayahs.map(ayah => ayah.text)))
      .catch(error => console.log("Error fetching translations:", error));
  }, [selectedLanguage]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#863ED5" />
      </View>
    );
  }

  if (!surah) {
    return (
      <View style={styles.container}>
        <Text>Error loading Surah.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<SurahInfo setSelectedLanguage={setSelectedLanguage} selectedLanguage={selectedLanguage} arabicName={arabicName} surahId={surahId} surahName={surahName} numberOfAyahs={numberOfAyahs} revelationType={revelationType} />}
        data={surah.ayahs}
        renderItem={({ item, index }) => <Item ayah={item} translation={translations[index]} />}
        keyExtractor={(item) => item.number.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default SurahTranslation;
