import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchBar from "../SearchBar";
import ShowMap from "../ShowMap";
import MapPage from "../MapPage";

const DATA = [
  { id: '1', title: '성신여대', order: '1.', state: '한산' },
  { id: '2', title: '을지로', order: '2.', state: '혼잡' },
  { id: '3', title: '광화문', order: '3.', state: '매우 혼잡' }
];

function Item({ title, order, state }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ShowMap',  { title, state });
  };



  useEffect(() => {
    // 화면 로드 시 헤더 숨김 설정 + import {useEffect} from "react";해야됨
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <TouchableOpacity style={styles} onPress={handlePress}>
      <View style={styles.rectangle}>
        <Text style={styles.order}>{order}  {title}</Text>
        <Text style={styles.state}>{state}</Text>
      </View>
    </TouchableOpacity>
  );
}

const Stack = createStackNavigator(); // 스택 네비게이터 생성

export default function App() {
  const [newPlace, setNewPlace] = useState('');
  const [places, setPlaces] = useState(DATA);

  const handleAddPlace = () => {
    if (newPlace.trim() === '') {
      return; // 빈 장소명은 추가하지 않음
    }

    const newId = (places.length + 1).toString();
    const newPlaceData = { id: newId, title: newPlace, order: `${newId}.`, state: '매우 혼잡' };
    setPlaces([...places, newPlaceData]);
    setNewPlace('');
  };



  return (

      <SafeAreaView style={styles.container}>
        <SearchBar/>
        <Text style={styles.starText}>
                <Text>수정</Text>
                <Text style={{ color: 'gray' }}> 님이 즐겨찾는 지역              </Text>
        </Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddPlace}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="장소를 추가하세요"
            placeholderTextColor="gray"
            value={newPlace}
            onChangeText={setNewPlace}
          />
        </View>
        <FlatList
          data={places}
          renderItem={({ item }) => (
            <Item title={item.title} order={item.order} state={item.state} onPress={() => navigation.navigate("ShowMap", { title: item.title, state: item.state })}></Item>
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

  );

  // const Stack = createStackNavigator();
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       {/* 'ShowMap' 화면을 정의하고 추가 */}
  //       <Stack.Screen name="ShowMap" component={ShowMap} />
  //       {/* 기존의 'StarPlace' 화면도 정의 */}
  //       <Stack.Screen name="StarPlace" component={StarPlace} options={{ title: '장소 상세 정보' }} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );

}



const styles = StyleSheet.create({
  starText: {
    paddingLeft: 25,
    fontSize: 30,
    fontWeight: "700",
    color: "#E9A011",
    marginBottom: 30,
  },
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  rectangle: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    margin: 5,
    borderRadius: 10,
    marginTop: 10,
  },
  order: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  state: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
  }
});