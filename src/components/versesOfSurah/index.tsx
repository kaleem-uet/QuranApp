import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { fetchSurahById } from '../../utils/api';
import Verse from '../global/Verse';
import SurahInfo from '../global/SurahInfo';
import axios from 'axios';
import AudioPlay from '../global/AudioPlay';

type Ayah = {
  number: number;
  audio: string;
  audioSecondary: string[];
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
};

type Surah = {
  ayahs: Ayah[];
  edition: {
    direction: string | null;
    englishName: string;
    format: string;
    identifier: string;
    language: string;
    name: string;
    type: string;
  };
  englishName: string;
  englishNameTranslation: string;
  name: string;
  number: number;
  numberOfAyahs: number;
  revelationType: string;
};

type SurahRecitationProps = {
  route: RouteProp<{ params: { surahId: number; surahName: string,arabicName:string,numberOfAyahs:string ,revelationType:string} }, 'params'>;
};

const Item: React.FC<{ ayah: Ayah }> = ({ ayah }) => (
  <View style={styles.item}>
    <Verse ayah={ayah.text} verseNo={ayah.numberInSurah} ayahAudio={ayah.audio} sajda={ayah.sajda} />
  </View>
);

const SurahRecitation: React.FC<SurahRecitationProps> = ({ route }) => {
  const { surahId, surahName ,arabicName,numberOfAyahs,revelationType} = route.params;
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const res = await fetchSurahById(surahId);
        setSurah(res);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Surah:', error);
        setLoading(false);
      }
    };

    fetchSurah();
  }, [surahId]);


  useEffect(() => {
    axios.get(`https://api.quran.com/api/v4/chapter_recitations/1/${surahId}`)
      .then((res) => {
        setAudioUrl(res.data.audio_file.audio_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [surahId]);








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
      <AudioPlay audioUrl={audioUrl}/>
      <FlatList
        ListHeaderComponent={<SurahInfo arabicName={arabicName} surahId={surahId} surahName={surahName} numberOfAyahs={numberOfAyahs} revelationType={revelationType} />}
        data={surah.ayahs}
        renderItem={({ item }) => <Item ayah={item} />}
        keyExtractor={(item) => item.number.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding:10,
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

export default SurahRecitation;
