import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchSurahs } from '../utils/api';
import { Surah } from '../utils/type';
import { useNavigation } from '@react-navigation/native';
type ProfileNavigationProp = {
  Profile: { surahId: number; surahName: string,
    arabicName:string,
    numberOfAyahs:string,
    revelationType:string

   };
};

function ListOfSurah() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ProfileNavigationProp>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const surahsData = await fetchSurahs();
        setSurahs(surahsData);        
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#863ED5" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {surahs.map((surah) => (
        <TouchableOpacity key={surah.number} 
        onPress={() => navigation.navigate('SurahTranslation', {
          surahId: surah.number,
          surahName:surah.englishName,
          arabicName:surah.name,
          numberOfAyahs:surah.numberOfAyahs,
          revelationType:surah.revelationType
        })}
        >
          <View style={styles.surah}>
            <View>
              <Text style={styles.surahText}>{surah.number}</Text>
              <Text style={styles.englishName}>{surah.englishName}</Text>
              <View style={styles.engNamedes}>
                <Text style={styles.engNameText}>{surah.revelationType}</Text>
                <Text style={styles.engNameText}>{surah.numberOfAyahs} Ayahs</Text>
              </View>
            </View>
            <Text style={styles.surahText}>{surah.name}</Text>
          </View>
          <View style={styles.divider} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the ScrollView takes up all available space
    padding: 10,
    backgroundColor: 'white',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray'
  },
  surahText: {
    fontSize: 20,
    color: '#863ED5',
    fontWeight: '700',
    fontFamily: 'Amiri-Bold'
  },
  engNamedes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '55%'
  },
  engNameText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#8789A3',
    lineHeight: 18,
  },
  englishName: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#240F4F'
  },
});

export default ListOfSurah;
