import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import RegionData from './Region.json';
import { AutocompleteDropdown, TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';
import { useNavigation } from '@react-navigation/native'; // Navigation Hook 사용
import MapPage from './MapPage';
import ShowMap from './ShowMap';
import Yongsan from './Yongsan';

const SearchBar = ({ onRegionSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  const data = ['홍대', '합정', '상수', '연남', '강남', '역삼', '삼성', '신촌', '연희', '이대', '신사', '논현',	'청담',	'압구정',	'망원',	'상암' ,'서초', '교대', '방배',	'명동', '을지로', '동대문',	'성수', '왕십리', '서울숲', '영등포', '여의도', '문래'	, '종로', '광화문', '대학로'	, '송파'	, '잠실'	, '방이'	, '용산'	, '이태원'	, '한남'	, '관악'	, '신림'	, '서울대입구'	, '건대'	, '성신여대'	, '안암'	, '마포'	, '고척'	, '불광'	, '연신내'	, '은평'	, '강북'	, '쌍문'	, '목동'];

  const handleSearch = query => {
    setSearchQuery(query);

    if (query === '') {
      setSuggestions([]);
    } else {
      const filteredSuggestions = data.filter(item =>
        item.includes(query)
      );
      setSuggestions(filteredSuggestions);
    }
  };

  const handleSelectRegion = region => {
    setSearchQuery(region);
    onRegionSelect(region);
    setSuggestions([]);
    navigation.navigate('Yongsan');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
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
      <TouchableOpacity style={styles.button} onPress={handleClearSearch}>
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
            <Text style={styles.suggestionText}>{item}</Text>
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
    marginTop: 50,
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