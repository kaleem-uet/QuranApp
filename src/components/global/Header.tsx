import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native';

interface headerProps {
  title: string
}
export default function Header({ title }: headerProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} >
      <Image source={require('../../icon/menu.png')} />
    </TouchableOpacity>
      <Text style={styles.surahText} >{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    gap: 30,
    padding: 10,

  },

  surahText: {
    fontSize: 25,
    color: '#863ED5',
    fontWeight: '800',
    lineHeight: 30,
    fontFamily: 'Poppins'
  }

});