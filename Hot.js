import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';


const Hot = () => {
  const locationCoordinates = {
    latitude: 37.484272, // 방배동의 위도
    longitude: 126.988205, // 방배동의 경도
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleRight}>한산</Text>
      <Text style={styles.titleLeft}>방배동</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: locationCoordinates.latitude,
          longitude: locationCoordinates.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          title="방배동"
          coordinate={locationCoordinates}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,

  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8, // 화면 하단에 위치하도록 조정
  },
  titleLeft: {
    position: 'absolute',
    top: 20,
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleRight: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default Hot;
