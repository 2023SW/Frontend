import React, { useState, useEffect } from 'react';
import Login from './Login';
import BottomTabNavigator from './BottomTabNavigator';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShowMap from './ShowMap';
import Constants from 'expo-constants';

const Stack = createStackNavigator();

export default function App() {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
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
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
              <Stack.Screen name="ShowMap" component={ShowMap} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
