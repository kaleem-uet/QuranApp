import React, { useEffect, useState } from 'react'
import { Alert, Button, View } from 'react-native';
import Sound from 'react-native-sound';

function AudioPlay({audioUrl}) {
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    Sound.setCategory('Playback', true); // true = mixWithOthers

    const testInfo = {
      title: 'wav remote download',
      url: audioUrl,
    };

    const soundInstance = new Sound(audioUrl, '', error => {
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
    <View>
        <Button title=
             {isPlaying ? (
                "pause"
              ) : (
                "play"
              )
        } 
        onPress={playPause}
        />
    </View>
  )
}

export default AudioPlay