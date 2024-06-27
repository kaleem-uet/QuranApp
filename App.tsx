import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Surahs from './src/pages/surah';
import { StatusBar } from 'react-native';
import SurahsRecitation from './src/pages/recitation';
import SurahTranslation from './src/components/SurahTranslation';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Surahs" screenOptions={{
      headerStyle: {
        backgroundColor: '#863ED5', // Change header background color
      },
      headerTintColor: '#fff', // Change header text color
      headerTitleStyle: {
        fontWeight: 'bold', // Change header title text style
      },
    }}>
      <Drawer.Screen name="Surahs" component={Surahs} />
      <Drawer.Screen name="Surahs Recitation" component={SurahsRecitation} />

    </Drawer.Navigator>
  );
}

function MyStack() {
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
      <Stack.Screen
        name="surah"
        component={MyDrawer}
        options={{ headerShown: false }} // Hide the header for the drawer navigator
      />
      <Stack.Screen
        name="SurahTranslation"
        component={SurahTranslation}
        options={({ route }) => ({
          title: route.params.surahName, // Dynamically set the title based on route params
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
     animated={true}
     backgroundColor="#863ED5"
     barStyle="light-content"
   />
      <MyStack />
    </NavigationContainer>
  );
}
