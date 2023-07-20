import React from 'react';
import { View, ScrollView, StyleSheet, TextInput, Text } from 'react-native';
import SearchBar from './SearchBar'; // SearchBar 컴포넌트를 불러옵니다.
import ScrollBlock_GPS from './ScrollBlock_GPS';
import HotPlacePage from './HotPlacePage'; // HotPlacePage 컴포넌트를 import
import ColdPlacePage from './ColdPlacePage'; // ColdPlacePage 컴포넌트를 import
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const map = () => {
  return (
    <View style={styles.container}>
      <SearchBar /> 
      <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="ScrollBlock_GPS" component={ScrollBlock_GPS} />
          <Stack.Screen name="HotPlacePage" component={HotPlacePage} />
          <Stack.Screen name="ColdPlacePage" component={ColdPlacePage} />
      </Stack.Navigator>
      <ScrollBlock_GPS /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default map;
