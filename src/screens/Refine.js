import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Animated, {SlideInRight} from 'react-native-reanimated';
import {SelectList} from 'react-native-dropdown-select-list';
import {Colors} from '../utils/colors';
import {Button, ProgressBar, TextInput} from 'react-native-paper';
import {SCREEN_WIDTH} from '../utils/others';

const CustomChip = ({label, selected, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selectedChip]}
      onPress={onPress}>
      <Text style={[styles.label, selected && styles.selectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const Refine = () => {
  const [selectedData, setSelectedData] = useState('');
  const selectData = [
    {key: '2', value: 'Away | Stay Discrete And Watch'},
    {key: '3', value: 'Busy | Do Not Disturb | Will Catchup Later'},
    {key: '4', value: 'SOS | Emergency! Need Assistance!HELP'},
  ];

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems1, setSelectedItems1] = useState([]);

  const handleChipPress = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(selected => selected !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const handleChipPress1 = item => {
    if (selectedItems1.includes(item)) {
      setSelectedItems1(selectedItems1.filter(selected => selected !== item));
    } else {
      setSelectedItems1([...selectedItems1, item]);
    }
  };

  const chipData = [
    {label: 'Coffee', value: '1'},
    {label: 'Business', value: '2'},
    {label: 'Hobbies', value: '3'},
    {label: 'Friendship', value: '4'},
  ];
  const chipData1 = [
    {label: 'Movies', value: '1'},
    {label: 'Dinning', value: '2'},
    {label: 'Dating', value: '3'},
    {label: 'Matrimony', value: '4'},
  ];
  return (
    <Animated.View
      style={{flex: 1, padding: 30, backgroundColor: Colors.fontColorActive}}
      entering={SlideInRight}>
      <Text style={styles.subHeadings}>Select Your Availibility</Text>
      <SelectList
        setSelected={setSelectedData}
        data={selectData}
        defaultOption={{key: '1', value: 'Available | Hey Let Us Connect'}}
        dropdownStyles={{zIndex: 100, borderColor: 'transparent'}}
        dropdownTextStyles={{color: Colors.Secondary}}
        inputStyles={{color: Colors.Secondary}}
      />
      <Text style={styles.subHeadings}>Add Your Status</Text>
      <TextInput
        style={styles.Input}
        placeholder="Hi community! I am open to new connections '😄'"
        mode="flat"
      />
      <Text style={styles.subHeadings}>Select Hyper local Distance</Text>
      <ProgressBar
        progress={0.8}
        color={Colors.Primary}
        style={{maxWidth: SCREEN_WIDTH * 0.9}}
      />

      <View style={{marginTop: 30, alignSelf:'center'}}>
        <Text style={styles.subHeadings}>Select Purpose</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 20,
          }}>
          {chipData.map(item => (
            <CustomChip
              key={item.value}
              label={item.label}
              selected={selectedItems.includes(item.value)}
              onPress={() => handleChipPress(item.value)}
            />
          ))}
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 20,
          }}>
          {chipData1.map(item => (
            <CustomChip
              key={item.value}
              label={item.label}
              selected={selectedItems1.includes(item.value)}
              onPress={() => handleChipPress1(item.value)}
            />
          ))}
        </View>
      </View>
      <Button style={styles.Button} textColor={Colors.fontColorActive}>
        Save & Explore
      </Button>
    </Animated.View>
  );
};

export default Refine;

const styles = StyleSheet.create({
  subHeadings: {color: Colors.Secondary, fontWeight: 700, marginVertical: 10},
  Input: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: Colors.Secondary,
    borderRadius: 15,
  },
  chip: {
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 5,
    marginBottom: 8,
    borderColor: Colors.Primary,
    borderWidth: 0.5,
  },
  selectedChip: {
    backgroundColor: Colors.Secondary,
  },
  label: {
    color: Colors.Secondary,
    fontSize: 12,
  },
  selectedLabel: {
    color: 'white',
  },
  Button: {
    backgroundColor: Colors.Primary,
    width: SCREEN_WIDTH * 0.4,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
