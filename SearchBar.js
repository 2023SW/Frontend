import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import RegionData from './Region.json';

const SearchBar = ({ onRegionSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = query => {
    setSearchQuery(query);
    const filteredSuggestions = RegionData.features.filter(feature =>
      feature.properties.adm_nm.includes(query)
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSelectRegion = region => {
    setSearchQuery(region.properties.adm_nm);
    onRegionSelect(region);
    setSuggestions([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="장소를 검색하세요 (-동)"
        placeholderTextColor="#777"
        value={searchQuery} 
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Ionicons name="search" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        style={styles.suggestionsContainer}
        data={suggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.suggestion}
            onPress={() => handleSelectRegion(item)}>
            <Text style={styles.suggestionText}>{item.properties.adm_nm}</Text>
          </TouchableOpacity>
        )}
      />
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
