
import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  Animated,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HotPlacePage from './HotPlacePage'; // HotPlacePage 컴포넌트를 import
import ColdPlacePage from './ColdPlacePage'; // ColdPlacePage 컴포넌트를 import

const ScrollBlock_GPS = () => {
  const pan = useRef(new Animated.Value(0)).current;
  const scrollBlockHeight = 50; // 원하는 스크롤 블록의 최소 높이로 변경
  const contentHeight = 300; // 스크롤 블록의 내용 높이
  const marginTop = 20;
  const maxScroll = contentHeight - (marginTop); // 스크롤 가능한 최대 높이 (검색바 아래)

  const navigation = useNavigation(); // useNavigation을 사용하여 navigation 객체 생성

  

  // 가상의 '핫플' 데이터 리스트
  const hotplace = [
    { id: '1', title: '1. 핫플1' },
    { id: '2', title: '2. 핫플2' },
    { id: '3', title: '3. 핫플3' },
    // ... 더 많은 항목 추가 가능
  ];

  // 가상의 '한산' 데이터 리스트
  const coldplace = [
    { id: '1', title: '1. 한산1' },
    { id: '2', title: '2. 한산2' },
    { id: '3', title: '3. 한산3' },
    // ... 더 많은 항목 추가 가능
  ];
  // FlatList의 아이템 렌더링 함수
  const renderItem = ({ item }) => (
    <Text style={styles.listItem}>{item.title}</Text>
  );
  

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

  const handleHotPlaceViewAll = () => {
    // '핫플' 리스트의 '전체보기' 버튼을 눌렀을 때 다른 페이지로 넘어가는 로직 구현
    navigation.navigate('HotPlacePage');
  };

  const handleColdPlaceViewAll = () => {
    // '한산' 리스트의 '전체보기' 버튼을 눌렀을 때 다른 페이지로 넘어가는 로직 구현
    navigation.navigate('ColdPlacePage');
  };
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
    <View style={styles.scrollBlockContainer}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.scrollBlock, { height, marginTop}]}
      >
        <Text></Text>
        <View style={[styles.horizontalLine, { width: '50%', left:'31%', right:'25%'}]} />
        <View style={[styles.listBlock, { backgroundColor: 'white' ,borderColor: 'gray'}]}>
          <Text style={[styles.sectionTitleHotPlace, titleStyle]}>핫플</Text>
          <TouchableOpacity style={styles.viewAllButton} onPress={handleHotPlaceViewAll}>
            <Text style={styles.viewAllText}>전체보기</Text>
          </TouchableOpacity>
        <FlatList
          data={hotplace}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        </View>
        
        <View style={[styles.listBlock, { backgroundColor: 'white' ,borderColor: 'gray'}]}>
          <Text style={[styles.sectionTitleColdPlace, titleStyle]}>한산</Text>
          <TouchableOpacity style={styles.viewAllButton} onPress={handleColdPlaceViewAll}>
            <Text style={styles.viewAllText}>전체보기</Text>
          </TouchableOpacity>
        <FlatList
          data={coldplace}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        </View>
      </Animated.View>
    </View>
  );
};


const GPSButton = () => {
  const handleGPSButtonClick = () => {
    // GPS 버튼을 클릭했을 때 위치 정보를 가져오는 로직을 구현
    console.log('현재 좌표: [위도, 경도]');
  };

  return (
    <View style={styles.gpsButtonContainer}>
      <TouchableOpacity onPress={handleGPSButtonClick} style={styles.gpsButton}>
        <Ionicons name="location" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <GPSButton />
      <ScrollBlock />
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
    },
    scrollBlock: {
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      // 위쪽 모서리를 검정색으로 표시
      borderTopColor: 'gray',
      borderTopWidth: 1.5,
      // 옆쪽 모서리를 검정색으로 표시
      borderLeftColor: 'gray',
      borderLeftWidth: 1.5,
      borderRightColor: 'gray',
      borderRightWidth: 1.5,
    },
    
    horizontalLine: {
        position: 'absolute',
        top: 10, // 블록 상단에 위치하도록 설정
        height: 2,
        backgroundColor: 'gray', // 선의 색상
        
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
      borderWidth: 1.5, // 테두리 두께를 2로 설정
      marginBottom: 10,
    },
    viewAllButton: {
        position: 'absolute',
        top: 5, // 오른쪽 상단에 위치하도록 설정
        right: 5,
        backgroundColor: 'gray', // '전체보기' 버튼 배경색을 gray로 설정
        padding: 5,
        borderRadius: 5,
    },
    viewAllText: {
        color: 'white', // '전체보기' 버튼 텍스트 색상을 white로 설정
        fontWeight: 'bold',
    },
    
    gpsButtonContainer: {
      position: 'absolute',
      bottom: 220, // GPS 아이콘이 스크롤 블록의 바로 상단에 위치하도록 값 변경
      right: 20,
    },
    gpsButton: {
      backgroundColor: 'white',
      borderRadius: 30,
      padding: 10,
      borderColor: 'black', // 테두리 색상 추가
      borderWidth: 1, // 테두리 두께 추가
    },
  });
export default ScrollBlock_GPS;
