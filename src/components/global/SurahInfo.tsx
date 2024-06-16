import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
interface soundPlayProps {
  surahId: number; surahName: string, arabicName: string, numberOfAyahs: string, revelationType: string
}
export default function SurahInfo({ arabicName, surahId, surahName, numberOfAyahs, revelationType }: soundPlayProps) {
 
  
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
      <View style={{ marginTop: 10, gap:20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.subVerseText}>
          {revelationType}
        </Text>
        <Text style={styles.subVerseText}>
          {numberOfAyahs} Verses
        </Text>
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
  mp3Button:{
    width:30,
    height:30,
  }
})