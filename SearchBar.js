import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // 여기에 검색 기능을 구현할 수 있습니다.
    console.log('검색어:', searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="장소를 검색하세요 (-동)"
        placeholderTextColor="#777"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // 가로 정렬을 위해 추가
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 60, // 여기에 marginTop을 추가하여 검색 바를 상단으로 이동
    marginLeft: 10,
    marginRight:10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    marginRight: 10,
    borderColor: 'black', // 테두리 색상 추가
    borderWidth: 1, // 테두리 두께 추가
  },
});

export default SearchBar;