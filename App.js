import React, { useState, useEffect } from 'react';
import Login from './Login';
import BottomTabNavigator from './BottomTabNavigator'; // BottomTabNavigator 파일 경로에 맞게 수정
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Map from './MapPage';
import ShowMap from './ShowMap';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


const MyApp = () => {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    // 3초 후에 로그인 화면을 감추고 탐색을 변경
    const timer = setTimeout(() => {
      setShowLogin(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {showLogin ? (
        <Login />
      ) : (
        <View style={styles.container}>
      <StatusBar style="auto" />
      <BottomTabNavigator />
           
    </View>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
});

export default MyApp;