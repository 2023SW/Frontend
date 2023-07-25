import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Text } from 'react-native';
import SearchBar from './SearchBar'; // SearchBar 컴포넌트를 불러옵니다.
import ScrollBlock_GPS from './ScrollBlock_GPS';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';






const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const MapPage = () => {
  const navigation = useNavigation();

  
  
  useEffect(() => {
    // 화면 로드 시 헤더 숨김 설정
    navigation.setOptions({ headerShown: false });
  }, []);
  
  return (
    <View style={styles.container}>
      <SearchBar searchBarStyle={styles.searchBar} />
      <View style={styles.scrollBlockContainer}>
        <ScrollBlock_GPS />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,

  },
  searchBar: {
  
    marginTop: 20,
  },
  scrollBlockContainer: {
    flex: 1,
    position: 'absolute', // Add position: 'absolute'
    bottom: 0, // Position at the bottom
    width: '100%',
  },
});

export default MapPage;