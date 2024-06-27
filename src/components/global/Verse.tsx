import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Sound from 'react-native-sound';
import { getAudio } from '../../utils/api';

interface verseProps {
  ayah: string,
  verseNo: number,
  ayahAudio: string,
  sajda: boolean,
  translation:string
}
export default function Verse({ ayah, verseNo, ayahAudio, sajda,translation }: verseProps) {
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);




  useEffect(() => {
    Sound.setCategory('Playback', true); // true = mixWithOthers

    const testInfo = {
      title: 'wav remote download',
      url: ayahAudio,
    };

    const soundInstance = new Sound(testInfo.url, '', error => {
      if (error) {
        Alert.alert('Error', error.message);
      }
    });

   
    setSound(soundInstance);

    // Cleanup function to release the sound instance
    return () => {
      soundInstance.release();
    };
  }, []);


  const playPause = () => {
    if (isPlaying) {
      sound?.pause();
      setIsPlaying(false);
    } else {
      sound?.play((success) => {
        if (success) {
          // Reset sound position to the beginning to allow replaying
          sound.setCurrentTime(0);
          setIsPlaying(false)
        } else {
          console.log('Playback failed due to audio decoding errors.');
        }
      });
      setIsPlaying(true);
    }
  };
  


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.surahNumber}>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>
            {verseNo}
          </Text>
        </View>
        <View>
          <View style={{ flex: 1, alignItems: "center", flexDirection: 'row', gap: 20 }}>
            {/* <Image source={require('../../icon/share.png')} /> */}
            <TouchableOpacity onPress={playPause}>
              {isPlaying ? (
                <Image source={require('../../icon/pause.png')} style={{ width: 20, height: 20 }} />
              ) : (
                <Image source={require('../../icon/play.png')} style={{ width: 20, height: 20 }} />
              )}
            </TouchableOpacity>
            <Image source={require('../../icon/save.png')} />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20, }}>
        <Text style={styles.verseText}>{ayah===" بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ" ? " " :ayah}</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        {sajda && (
          <Text style={styles.verseText}>سجدۂ تلاوت</Text>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.verseTranslation}>
         {translation}
        </Text>
      </View>

      <View style={styles.divider} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'column',
    gap: 20,

  },
  header: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1219310D',
    borderRadius: 10,
  },
  surahNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    width: 27,
    height: 27,
    backgroundColor: '#863ED5',
    borderRadius: 13.5,
  },
  verseText: {
    fontSize: 20,
    color: '#863ED5',
    fontWeight: '700',
    fontFamily: 'Amiri-Regular'
  },
  verseTranslation: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    color: '#240F4F'
  },
  divider: {
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray'
  }
})