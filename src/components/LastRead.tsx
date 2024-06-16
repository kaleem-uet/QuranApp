import React from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image, ImageBackground, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';

const LastRead = () => {
  return (
    <View style={{
        backgroundColor: '#863ED5',
        borderRadius: 7,
        elevation: 20,
      }}>
        <View style={{
          marginTop: 20,
          marginLeft: 20,
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,

          }}>
            <Image source={require('../icon/read.png')} style={{
              width:20,
              height:14.1,
            }} />
            <Text style={styles.lastReadText}>Last Read</Text>
          </View>
          <Text style={styles.lastReadTitle}>Al-Fatiah</Text>
          <Text style={styles.lastReadText}>Ayah No: 1</Text>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <View>
          </View>
          <View>
            <Image source={require('../icon/quran.png')} />
          </View>
        </View>
      </View>
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
    lastReadText: {
      fontWeight: '400',
      fontSize: 14,
      color: '#fff', // Add your desired color
      lineHeight:21
    },
    lastReadTitle:{
      marginTop:10,
      color: '#fff',
      fontWeight:'800',
      fontSize:25,
    }
  })
export default LastRead