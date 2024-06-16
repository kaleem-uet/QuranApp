import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Surahs from './pages/surah';
import Header from './components/global/Header';
import SurahRecitation from './components/versesOfSurah';

type RootStackParamList = {
    Surahs: undefined; // Assuming no parameters for the Surahs screen
    SurahRecitation: {
      surahId: number;
      surahName: string;
      arabicName:String,
      numberOfAyahs:String,
      revelationType:String
    };
  };

  const Stack = createNativeStackNavigator<RootStackParamList>();

const MyStack = () => {
  return (
      <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: '#863ED5', // Change header background color
        },
        headerTintColor: '#fff', // Change header text color
        headerTitleStyle: {
          fontWeight: 'bold', // Change header title text style
        },
      }}
      >
        <Stack.Screen name="Surahs" component={Surahs} />
        <Stack.Screen
        name="SurahRecitation"
        component={SurahRecitation}
        options={({ route }) => ({
          title: route.params.surahName, // Dynamically set the title based on route params
        })}
      />
      </Stack.Navigator>
  );
};
export default MyStack