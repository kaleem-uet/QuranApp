import React from 'react'
import LastRead from '../../components/LastRead'
import ListOfSurah from '../../components/ListOfSurah'
import { View, Text,StyleSheet, StatusBar, SafeAreaView } from 'react-native';

const Surahs = () => {
  return (
    <SafeAreaView style={styles.container}>
       <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 20, }}>
    <Text style={styles.surahText}>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</Text>
    </View>
       <LastRead />
       <ListOfSurah />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  surahText: {
    fontSize: 20,
    color: '#863ED5',
    fontWeight: '700',
    fontFamily: 'Amiri-Bold'

  },
  imageContainer: {
    position: 'relative',
    width: 40,
    height: 40,
  },
  image: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  number: {
    position: 'absolute',
    top: 10,
    left: 16,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  textContainer: {
    marginLeft: 10,
  },

  lastReadTitle: {
    marginTop: 10,
    color: '#fff',
    fontWeight: '800',
    fontSize: 25,
  }
})
export default Surahs