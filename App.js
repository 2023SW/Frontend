import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import StarPage from './StarPage';
import Star from './Star';
import SearchBar from './SearchBar';



const MyApp = () => {
  return (
    <NavigationContainer>

      
      <SearchBar />
      <Star />
    </NavigationContainer>
  );
};
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
export default MyApp;