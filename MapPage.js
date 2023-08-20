import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import SearchBar from './SearchBar';
import ScrollBlock_GPS from './ScrollBlock_GPS';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'; // Import the expo-location module

import RegionData from './Region.json';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MapPage = () => {
  const navigation = useNavigation();
  const [userLocation, setUserLocation] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
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

  const handleRegionSelect = region => {
    setSelectedRegion(region);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} />
      <View style={styles.container}>
        {userLocation && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {selectedRegion && (
              <Polygon
                coordinates={selectedRegion.geometry.coordinates[0]}
                fillColor="rgba(255, 0, 0, 0.3)" // Fill color of the polygon
              />
            )}
            <Marker coordinate={userLocation} />
          </MapView>
        )}
        <SearchBar onRegionSelect={handleRegionSelect} />
        <View style={styles.scrollBlockContainer}>
          <ScrollBlock_GPS />
        </View>
      </View>
    </>
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapPage;
