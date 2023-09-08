import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';

const CustomTextInput = ({ placeholder, errorMessage, ...restProps }) => {
  const [isEmpty, setIsEmpty] = useState(true);

  const handleTextChange = (text) => {
    setIsEmpty(text === '');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isEmpty && styles.emptyInput]}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        {...restProps}
      />
      {isEmpty && errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  emptyInput: {
    borderColor: 'red', // Change border color for empty input
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default CustomTextInput;
