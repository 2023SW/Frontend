import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ onRegionSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [placeData, setPlaceData] = useState([]);

  useEffect(() => {
    const loadPlaceData = async () => {
      const response = await fetch('./place.json'); // Assuming place.json is in your project directory
      const data = await response.json();
      setPlaceData(data);
    };

    loadPlaceData();
  }, []);

  const handleSearch = query => {
    setSearchQuery(query);
    const filteredSuggestions = placeData.filter(item => item["지역"].includes(query)); // Filter by "지역" property
    setSuggestions(filteredSuggestions);
  };

  const handleSelectPlace = place => {
    setSearchQuery(place["지역"]);
    onRegionSelect(place["지역"]);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="장소를 검색하세요"
        placeholderTextColor="#777"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleSearch(searchQuery)}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
      {suggestions.length > 0 && (
        <FlatList
          style={styles.suggestionsContainer}
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestion}
              onPress={() => handleSelectPlace(item)}>
              <Text style={styles.suggestionText}>{item["지역"]}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
container: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#fff',
borderRadius: 30,
padding: 5,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 4,
elevation: 5,
marginTop: 30,
marginLeft: 10,
marginRight: 10,
marginBottom: 20,
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
borderColor: 'black',
borderWidth: 1,
},
suggestionsContainer: {
marginTop: 5,
width: '100%',
position: 'absolute',
backgroundColor: '#fff',
zIndex: 1,
},
suggestion: {
borderBottomColor: '#ccc',
borderBottomWidth: 1,
paddingVertical: 10,
paddingHorizontal: 12,
},
suggestionText: {
fontSize: 16,
},
});

export default SearchBar;