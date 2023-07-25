import React, { useRef, useState  } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import ShowMap from './ShowMap';


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
  const pan = useRef(new Animated.Value(0)).current;
  const scrollBlockHeight = 50; // 원하는 스크롤 블록의 최소 높이로 변경
  const contentHeight = 300; // 스크롤 블록의 내용 높이
  const marginTop = 20;
  const maxScroll = contentHeight - (marginTop); // 스크롤 가능한 최대 높이 (검색바 아래)

  const navigation = useNavigation();

  
  // 가상의 '핫플' 데이터 리스트
const hotplace = [
  { id: '1', title: '핫플1', order:'1.', state: '상태1' },
  { id: '2', title: '핫플2', order:'2.', state: '상태2' },
  { id: '3', title: '핫플3', order:'3.', state: '상태3' },
  // ... 더 많은 항목 추가 가능
];

// 가상의 '한산' 데이터 리스트
const coldplace = [
  { id: '1', title: '한산1', order:'1.', state: '상태1' },
  { id: '2', title: '한산2', order:'2.', state: '상태2' },
  { id: '3', title: '한산3', order:'3.', state: '상태3' },
  // ... 더 많은 항목 추가 가능
];

  // Function to handle list item press
  // const handleListItemPress = (item) => {
  //   // Navigate to the ShowMap and pass the selected item as a parameter
  //   navigation.navigate('ShowMap', { title: item.title, state: item.state });
  // };
  

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy < 0) {
        // 스크롤 블록이 아래로 움직이거나 최대 스크롤 높이까지만 허용
        pan.setValue(gestureState.dy < -maxScroll ? -maxScroll : gestureState.dy);
      }
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dy > 0) {
        // 스크롤 블록이 아래로 움직였을 때, 원래 위치로 복귀
        Animated.spring(pan, { toValue: 0, useNativeDriver: false }).start();
      } else if (gestureState.dy < -maxScroll) {
        // 스크롤 블록이 검색바 아래로 움직였을 때, 검색바 아래에서 멈추도록 설정
        Animated.spring(pan, { toValue: -maxScroll, useNativeDriver: false }).start();
      }
    },
  });

  
  
  const titleStyle = {
    
    marginBottom: 10, // 제목과 리스트들 사이의 간격을 10으로 조정
  };

  // 블록 높이 동적 조절
  const height = pan.interpolate({
    inputRange: [-maxScroll, 0],
    outputRange: [scrollBlockHeight + maxScroll+150, scrollBlockHeight],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.scrollBlockContainer, searchBarStyle]}>
      <View style={styles.gpsIconContainer}>
        <View style={styles.iconInnerCircle}>
          <TouchableOpacity onPress={() => console.log('GPS 아이콘 클릭됨')}>
            <Ionicons name="locate" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View {...panResponder.panHandlers} style={[styles.scrollBlock, { height, marginTop }]}>
      
        <View style={[styles.horizontalLine, { width: '30%', left:'40%', right:'25%'}]} />
        <View style={[styles.listBlock, { backgroundColor: 'white', borderColor: 'lightgray' }]}>
          <Text style={[styles.sectionTitleHotPlace, titleStyle]}>핫플</Text>
    
          <FlatList
            data={hotplace}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate("ShowMap", { title: item.title, state: item.state})}> 
                <View style={styles.listItem}>
                  <Text>{item.order} {item.title}</Text>
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
              <TouchableOpacity onPress={() => navigation.navigate("ShowMap", { title: item.title, state: item.state})}>
                <View style={styles.listItem}>
                  <Text>{item.order} {item.title}</Text>
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
        color: 'red', 
    },

    sectionTitleColdPlace: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'blue', 
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