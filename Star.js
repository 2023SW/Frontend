import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

const DATA = [
  { id: '1', title: '장소1', order: '1.', state: '상태' },
  { id: '2', title: '장소2', order: '2.', state: '상태' },
  { id: '3', title: '장소3', order: '3.', state: '상태' }
];

function Item({ title, order, state }) {
  return (
    <View style={styles.rectangle}>
      <View style={styles.leftContainer}>
        <Text style={styles.order}>{order}  {title}</Text>
      </View>
      <Text style={styles.state}>{state}</Text>
    </View>
  );
}

export default function App() {
  const [newPlace, setNewPlace] = useState('');
  const [places, setPlaces] = useState(DATA);

  const handleAddPlace = () => {
    if (newPlace.trim() === '') {
      return; // 빈 장소명은 추가하지 않음
    }

    const newId = (places.length + 1).toString();
    const newPlaceData = { id: newId, title: newPlace, order: `${newId}.`, state: '상태' };
    setPlaces([...places, newPlaceData]);
    setNewPlace('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.starText}>ㅇㅇ님이 즐겨찾는 지역</Text>
      <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPlace}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="장소를 추가하세요"
          value={newPlace}
          onChangeText={setNewPlace}
        />
      </View>
      <FlatList
        data={places}
        renderItem={({ item }) => <Item title={item.title} order={item.order} state={item.state} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
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
    marginTop: Constants.statusBarHeight,
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

 
// const renderItem = ({ item }) => (
//   <Text style={styles.listItem}>{item.title}</Text>
// );

// const handleStarPViewAll=()=>{
//   navigation.navigate('StarPage'); //전체보기 누르면 다른 창 넘어감
// };

//   const titleStyle={
//     marginBottom: 10,
//   };


//   return (
//     <View style={styles.scrollBlockContainer}>

//         <Text></Text>
//         <View style={[styles.horizontalLine, { width: '50%', left:'31%', right:'25%'}]} />
//         <View style={[styles.listBlock, { backgroundColor: 'white' ,borderColor: 'gray'}]}>
//           <Text style={[styles.sectionTitleHotPlace, titleStyle]}>핫플</Text>
//           <TouchableOpacity style={styles.viewAllButton} onPress={handleHotPlaceViewAll}>
//             <Text style={styles.viewAllText}>전체보기</Text>
//           </TouchableOpacity>
//         <FlatList
//           data={hotplace}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//         />
//         </View>

//         <View style={[styles.listBlock, { backgroundColor: 'white' ,borderColor: 'gray'}]}>
//           <Text style={[styles.sectionTitleColdPlace, titleStyle]}>한산</Text>
//           <TouchableOpacity style={styles.viewAllButton} onPress={handleColdPlaceViewAll}>
//             <Text style={styles.viewAllText}>전체보기</Text>
//           </TouchableOpacity>
//         <FlatList
//           data={coldplace}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//         />
//         </View>

//     </View>
//   );   
    


// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 50,
//   },
//   scrollBlockContainer: {
//     width: '100%',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
//   sectionTitleStarPage: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: 'red', 
//   },

//   name: {
//     color: "white",
//     fontSize: 15,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   gender: {
//     color: "white",
//     fontSize: 15,
//   },
//   age: {
//     color: "white",
//     fontSize: 15,
//   },
// });