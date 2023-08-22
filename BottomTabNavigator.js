import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native'; // NavigationContainer를 불러와야 합니다.
import { createStackNavigator } from '@react-navigation/stack';

import Map from './MapPage';
import Star from './page/Starpage';
import Clock from './page/Clockpage';
import Mypage from './page/Mypage';
import ShowMap from './ShowMap';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Map"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = 'gray'; // 클릭한 아이콘의 색상 설정

          if (route.name === 'Map') {
            iconName = 'location';
          } else if (route.name === 'Star') {
            iconName = 'star';
          } else if (route.name === 'Clock') {
            iconName = 'help-circle';
          } else if (route.name === 'Mypage') {
            iconName = 'person-circle';
           }
          if (focused) {
            iconColor = '#EEB33F'; // 클릭한 아이콘만 색상을 변경
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={32} color={iconColor}  />;
        },
        tabBarLabel: ({ focused, color }) => {
          let labelText;
          let labelColor = 'gray'; // 아이콘 텍스트의 기본 색상

          if (route.name === 'Map') {
            labelText = '지도';
          } else if (route.name === 'Star') {
            labelText = '즐겨찾기';
          } else if (route.name === 'Clock') {
            labelText = '장소 추천';
          } else if (route.name === 'Mypage') {
            labelText = '마이페이지';
          }
          if (focused) {
            labelColor = '#EEB33F'; // 클릭한 아이콘의 텍스트 색상 변경
          }

          return (
            <Text style={{ color: labelColor, fontSize: 12 }}>
              {labelText}
            </Text>
          );
        },
      })}
      
      
    >
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Star" options={{headerShown: false,}}>
          {() => (
            <Stack.Navigator>
              <Stack.Screen name="뒤로 가기" component={Star} />
              <Stack.Screen name="ShowMap" component={ShowMap} />
            </Stack.Navigator>
          )}
        </Tab.Screen>
      <Tab.Screen name="Clock" component={Clock} />
      <Tab.Screen name="Mypage" component={Mypage} />
      
    </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    
  },
});

export default BottomTabNavigator;