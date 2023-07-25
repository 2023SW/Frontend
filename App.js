import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView, TextInput} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import Starpage from './page/Starpage';
import SearchBar from './SearchBar';
import ShowMap from './ShowMap';
import BottomTabNavigator from './BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MyApp = () => {
  const route={
    params:{
      title: 'ㅇㅇ동', state: '상태',
    }
  }
  return (
    <NavigationContainer independent={true}>

    <Stack.Navigator>
        <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Starpage" component={Starpage} options={{ title: '장소 상세 정보' }} />
        <Stack.Screen name="ShowMap" component={ShowMap} options={{ title: '지도 보기' }} />
      </Stack.Navigator>


    </NavigationContainer>
    
  );
};

export default MyApp;
