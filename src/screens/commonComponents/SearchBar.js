import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Colors } from '../../utils/colors';

const SearchBar = ({ data, onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = text => {
    setSearchText(text);
    const filteredData = data.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    onSearch(filteredData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <EvilIcon
          name="search"
          size={20}
          color={Colors.fontColorInActive}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <View>
      <Icon
          name="sliders"
          size={20}
          color={Colors.fontColorInActive}
          style={styles.searchIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginVertical: 10,
  },
  inputContainer: {
    width:'70%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 100,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: Colors.Secondary,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 35,
  },
});

export default SearchBar;
