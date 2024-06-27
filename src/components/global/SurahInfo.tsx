import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DropdownComponent from '../DropdownComponent';
import { getTranslationLanguage } from '../../utils/api';
interface soundPlayProps {
  setSelectedLanguage: (value: number | string) => void;
  selectedLanguage: number;
  surahId: number;
  surahName: string,
  arabicName: string,
  numberOfAyahs: string,
  revelationType: string
}
export default function SurahInfo({ setSelectedLanguage, selectedLanguage, arabicName, surahId, surahName, numberOfAyahs, revelationType }: soundPlayProps) {



  const [languages, setLanguages] = useState([]);

  const languageOptions = languages.map((language: {
    identifier: string; englishName: string 
}, index) => ({
    label: `${language.identifier} - ${language.englishName}`,
    value: language.identifier,
  }));


  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const res = await getTranslationLanguage();
        const transformedLanguages = res.data.map((item: { identifier: string, englishName: string }) => ({
          identifier: item.identifier,
          englishName: item.englishName,
        }));
        setLanguages(transformedLanguages);
      } catch (error) {
        console.error('Error fetching translations:', error);
      }
    };
    fetchTranslation();
  }, []);




  return (
    <View style={{
      backgroundColor: '#863ED5',
      borderRadius: 7,
      elevation: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      marginTop: 20,
      padding: 20,
      gap: 10,
    }}>
      <Text style={styles.verseText}>
        بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
      </Text>
      <Text style={styles.verseText}>
        {arabicName}
      </Text>
      <View style={{ marginTop: 10, gap: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.subVerseText}>
          {revelationType}
        </Text>
        <Text style={styles.subVerseText}>
          {numberOfAyahs} Verses
        </Text>
      </View>
      <View style={{ display: 'flex', width: '100%' }}>
        <Text style={styles.subVerseText}>
          Translation
        </Text>
        <DropdownComponent
          data={languageOptions}
          placeholder="Select a language"
          searchPlaceholder="Search language..."
          selectedValue={selectedLanguage}
          setSelectedValue={setSelectedLanguage}
        />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  verseText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'Amiri-Regular'
  },
  subVerseText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'Amiri-Regular'
  },
  mp3Button: {
    width: 30,
    height: 30,
  }
})