import React from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // 이 예제에서는 Ionicons 아이콘을 사용합니다.

import map from './map';
import star from './page/star';
import clock from './page/clock';
import mypage from './page/mypage';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="map"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = 'gray'; // 클릭한 아이콘의 색상 설정

          if (route.name === 'map') {
            iconName = 'location';
          } else if (route.name === 'star') {
            iconName = 'star';
          } else if (route.name === 'clock') {
            iconName = 'timer';
          } else if (route.name === 'mypage') {
            iconName = 'person-circle';
          }
          if (focused) {
            iconColor = '#EEB33F'; // 클릭한 아이콘만 색상을 변경
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={32} color={iconColor}  />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#EEB33F',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="map" component={map} />
      <Tab.Screen name="star" component={star} />
      <Tab.Screen name="clock" component={clock} />
      <Tab.Screen name="mypage" component={mypage} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    alignItems: 'center', // 아이콘을 세로축으로 가운데로 정렬
    
  },
});

export default BottomTabNavigator;
