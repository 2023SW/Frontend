import React from 'react';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet,TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const MyPageScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // 화면 로드 시 헤더 숨김 설정 + import {useEffect} from "react";해야됨
    navigation.setOptions({ headerShown: false });
  }, []);
  // 가정: 사용자 정보
  const userInfo = {
    name: 'Sujung',
    email: '20212023@sungshin.ac.kr',
    profileIconName: 'person-circle-outline', // Ionicons 아이콘 이름
  };
   // 가정: 현재 나의 위치와 혼잡도 정보
  const base = '현재 나의 위치';
  const currentLocation = '성북구 돈암동';
  const congestionStatus = '약간 혼잡'; // 혼잡도 상태 (예: Low, Moderate, High 등)

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogout = () => {
    console.log('Logout button clicked!');
  };

  const handleProfileEdit = () => {
    console.log('Profile edit button clicked!');
  };

  const handleRefresh = () => {
    console.log('Refreshing...');
    setIsRefreshing(true);
    // 여기에 새로고침 기능을 구현하면 됩니다.
    // 예를 들어, 백엔드와 통신하여 데이터를 다시 가져오거나, 캐시를 갱신하는 등의 작업을 수행할 수 있습니다.
    // 아래 setTimeout은 새로고침 상태를 시각적으로 확인하기 위해 임시로 넣은 예시 코드입니다.
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500); // 1.5초 후 새로고침 상태를 해제합니다.
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Icon name={userInfo.profileIconName} size={75} color="#ccc" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{userInfo.name}</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
        </View>
        <TouchableOpacity onPress={handleProfileEdit} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.locationContainer}>
      <Text style={[styles.base, { textAlign: 'left' }]}> {base}</Text>
        <Text style={[styles.location, { textAlign: 'left' }]}>
        {currentLocation}  <Text style={styles.congestionStatus}>{congestionStatus}</Text>해요!
        </Text>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Icon name="refresh-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* Your content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: 'row', // 가로 방향으로 아이템들을 정렬
    alignItems: 'center',
    backgroundColor: 'black',
    height: '45%', // 화면 세로의 1/3만큼을 차지하도록 설정
    paddingHorizontal: 20, // 프로필 수정 버튼과 로그아웃 버튼과의 간격을 조절
  },
  profileContainer: {
    marginRight: 20, // 프로필 사진과 정보 사이의 간격을 조절
    marginTop: -85, // 이름과 회원 정보가 상단에 올라가게 해줍니다.

  },
  infoContainer: {
    flex: 1, 
    justifyContent: 'flex-start', // 세로 방향으로 상단 정렬
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: -70, // 이름과 회원 정보가 상단에 올라가게 해줍니다.
    color:'white'
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  locationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2DCDC',
    borderRadius: 10, // 둥근 모서리를 위한 borderRadius 설정
    marginTop: -150, // 이름과 회원 정보가 상단에 올라가게 해줍니다.
    width: '95%', // 가로의 95%만큼의 공간을 차지하도록 설정
    paddingVertical: 40, // 세로 방향으로 내부 여백을 늘려서 블록을 두껍게 만듭니다.
    alignSelf:'center',
  },

  location: {
    fontSize: 18,
    color: 'white',
  },
  base: {
    fontsize: 10,
    fontWeight: 'bold',
    color:'black',
    marginTop: 0, // 'base'를 상단으로 올리기 위해 marginTop 추가
    marginBottom:10,
    
  },
  location: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  congestionStatus: {
    fontSize: 23,
    color: '#FF0000',
  },
  editButton: {
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 8,
    marginRight: 10, // 프로필 수정 버튼과 로그아웃 버튼과의 간격을 조절
    marginTop: -85, // 이름과 회원 정보가 상단에 올라가게 해줍니다.

  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutContainer: {
    marginTop: 30, // 로그아웃 버튼과 회원 정보 칸 사이 간격 설정
    alignItems: 'center', // 로그아웃 버튼을 가운데 정렬
  },
  logoutButton: {
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  logoutButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  refreshButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

});

export default MyPageScreen;