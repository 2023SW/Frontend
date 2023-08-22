import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, PanResponder, Animated, FlatList, TextInput, Text,LogBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ShowMap from './ShowMap';
import Modal from 'react-native-modal';

const Stack = createStackNavigator();

const App_GPS = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MapPage" component={ScrollBlock_GPS} options={{ headerShown: false }} />
        <Stack.Screen name="ShowMap" component={ShowMap} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ScrollBlock_GPS = ({ searchBarStyle }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const mapViewRef = useRef(null); // Add this line to create the mapViewRef


  useEffect(() => {
    if (userLocation) {
      // 사용자 위치가 변경되면 지도의 region을 업데이트
      mapViewRef.current.animateToRegion(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000 // 애니메이션 지속 시간 (ms)
      );
    }
  }, [userLocation]);
  
  const pan = useRef(new Animated.Value(0)).current;
  const scrollBlockHeight = 50; // 원하는 스크롤 블록의 최소 높이로 변경
  const contentHeight = 300; // 스크롤 블록의 내용 높이
  const marginTop = 20;
  const maxScroll = contentHeight - (marginTop); // 스크롤 가능한 최대 높이 (검색바 아래)

  const navigation = useNavigation();

  
  // 가상의 '핫플' 데이터 리스트
const hotplace = [
  { id: '1', title: '강남', order: '1.', state: '(매우 혼잡)' },
  { id: '2', title: '홍대', order: '2.',state: '(매우 혼잡)' },
  { id: '3', title: '종로', order: '3.',state: '(혼잡)' },
  // ... 더 많은 항목 추가 가능
];

// 가상의 '한산' 데이터 리스트
const coldplace = [
  { id: '1', title: '미아', order: '1.',state: '(매우 한산)' },
  { id: '2', title: '한남', order: '2.',state: '(한산)' },
  { id: '3', title: '이촌', order: '3.',state: '(한산)' },
  // ... 더 많은 항목 추가 가능
];

const handleListItemPress = (item) => {
  navigation.navigate('ShowMap', { title: item.title, state: item.state });
};

const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderMove: (e, gestureState) => {
    if (gestureState.dy < 0) {
      pan.setValue(gestureState.dy < -maxScroll ? -maxScroll : gestureState.dy);
    }
  },
  onPanResponderRelease: (e, gestureState) => {
    if (gestureState.dy > 0) {
      Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
    } else if (gestureState.dy < -maxScroll) {
      Animated.spring(pan, { toValue: -maxScroll, useNativeDriver: false }).start();
    }
  },
});

const titleStyle = {
  marginBottom: 10,
};

const height = pan.interpolate({
  inputRange: [-maxScroll, 0],
  outputRange: [scrollBlockHeight + maxScroll + 150, scrollBlockHeight],
  extrapolate: 'clamp',
});
const handleGPSIconPress = async () => {
  setIsModalVisible(false);

  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('위치 접근 권한이 거부되었습니다');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
  setUserLocation(location.coords);
  // 사용자의 위치를 로그로 출력
  console.log('사용자의 위치 - 위도:', location.coords.latitude);
  console.log('사용자의 위치 - 경도:', location.coords.longitude);
};


return (
  <View style={[styles.scrollBlockContainer, searchBarStyle]}>
    <View style={styles.gpsIconContainer}>
      <View style={styles.iconInnerCircle}>
        <TouchableOpacity onPress={handleGPSIconPress}>
          <Ionicons name="locate" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text>Enter GPS Coordinate:</Text>
          <TextInput
            style={styles.gpsInput}
            placeholder="Latitude"
            keyboardType="numeric"
            onChangeText={(text) => setGpsCoordinate({ ...gpsCoordinate, latitude: parseFloat(text) })}
          />
          <TextInput
            style={styles.gpsInput}
            placeholder="Longitude"
            keyboardType="numeric"
            onChangeText={(text) => setGpsCoordinate({ ...gpsCoordinate, longitude: parseFloat(text) })}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setUserLocation(gpsCoordinate);
              setIsModalVisible(false);
            }}
          >
            <Text style={styles.modalButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <MapView
      ref={mapViewRef}
      style={{ flex: 1, width: '100%', height: '100%' }}
        region={{
          latitude: userLocation ? userLocation.latitude : 0,
          longitude: userLocation ? userLocation.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {userLocation && <Marker coordinate={userLocation} />}
      </MapView>

      <Animated.View {...panResponder.panHandlers} style={[styles.scrollBlock, { height, marginTop }]}>
      
        <View style={[styles.horizontalLine, { width: '30%', left:'40%', right:'25%'}]} />
        <View style={[styles.listBlock, { backgroundColor: 'white', borderColor: 'lightgray' }]}>
          <Text style={[styles.sectionTitleHotPlace, titleStyle]}>핫플</Text>
    
          <FlatList
          data={hotplace}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("ShowMap", { title: item.title, state: item.state })}>
              <View style={styles.listItem}>
                <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.7)' }}>{item.order} {item.title} {item.state}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        </View>
        <View style={[styles.listBlock, { backgroundColor: 'white', borderColor: 'lightgray' }]}>
          <Text style={[styles.sectionTitleColdPlace, titleStyle]}>한산</Text>
         
          <FlatList
          data={coldplace}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("ShowMap", { title: item.title, state: item.state })}>
              <View style={styles.listItem}>
              <Text style={{ fontSize: 19, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.7)' }}>{item.order} {item.title} {item.state}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        </View>
      </Animated.View>
    </View>
  );
};
  



const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 50,
    },
    scrollBlockContainer: {
      width: '100%',
      alignItems: 'center',
      overflow: 'hidden',
      paddingTop: 40,
      justifyContent: 'flex-end', // 스크롤 블록을 하단으로 위치하도록 설정
    },
    scrollBlock: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    
    horizontalLine: {
        position: 'absolute',
        top: 10, // 블록 상단에 위치하도록 설정
        height: 2,
        backgroundColor: 'lightgray', // 선의 색상
        
    },
    sectionTitleHotPlace: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#FF5555', 
    },

    sectionTitleColdPlace: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#0044BB', 
    },
    
    listItem: {
        fontSize: 25,
        marginVertical: 10,
        color: 'black', 
    },
    
    // 리스트 항목의 스타일
    listBlock: {
      borderRadius: 10, // 둥근 모서리를 만들기 위해 borderRadius 설정
      padding: 10,
      marginVertical: 5, // 각 리스트 항목들 사이에 5의 여백을 줌
      borderWidth: 1, // 테두리 두께를 2로 설정
      borderColor: 'lightgray', // 테두리 색상을 lightgray로 설정
      marginBottom: 10,
    },
    
    // GPS 아이콘 컨테이너 스타일
  gpsIconContainer: {
    position: 'absolute',
    top: -10,
    left: 6, // 변경된 부분: 왼쪽으로 이동
    padding: 10,
  },
  //  GPS 아이콘 원
  iconInnerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
    
   
  });
  export default ScrollBlock_GPS;