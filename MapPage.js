import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Text, StatusBar } from 'react-native';
import SearchBar from './SearchBar';
import ScrollBlock_GPS from './ScrollBlock_GPS';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import * as Location from 'expo-location'; // Import the expo-location module

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MapPage = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null); // State to store user's location

  
  
  useEffect(() => {
    // 화면 로드 시 헤더 숨김 설정
    navigation.setOptions({ headerShown: false });
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('위치 접근 권한이 거부되었습니다');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  

  const generatePolygon = (centerLat, centerLng, radius) => {
    const polygonCoordinates = [];
    const numSides = 30; // Adjust number of sides
    const step = (2 * Math.PI) / numSides;
    const maxOpacity = 0.5; // Max fill opacity

    for (let i = 0; i < numSides; i++) {
      const angle = i * step;
      const lat = centerLat + radius * Math.cos(angle);
      const lng = centerLng + radius * Math.sin(angle);
      const opacity = 1 - (i / numSides) * maxOpacity; // Calculate opacity based on distance
      polygonCoordinates.push({ latitude: lat, longitude: lng });
    }

    return polygonCoordinates;
  };

  
  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={userLocation} />

          {/* <Polygon
            coordinates={generatePolygon(userLocation.latitude, userLocation.longitude, 0.001)}
            fillColor="rgba(255, 0, 0, 0.5)" // Adjust fill color
          /> */}
        </MapView>
      )}
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
  map: {
    ...StyleSheet.absoluteFillObject, // Take up the entire screen
  },
});

export default MapPage;