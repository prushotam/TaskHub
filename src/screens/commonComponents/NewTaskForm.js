import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {TextInput, IconButton, Text} from 'react-native-paper';
import {Colors} from '../../utils/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/others';
import DatePicker from 'react-native-date-picker';
import ChooseOption from './ChooseOptions';
import {useAppStateContext} from '../../utils/AppsStateContext';
import {insertDataIntoTable} from '../../utils/Database';
import Icon from 'react-native-vector-icons/EvilIcons';

const NewTaskForm = () => {
  const {selectedOption, setSelectedOption, tempState, setTempState} =
    useAppStateContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState('');

  const [open, setOpen] = useState(false);
  const [openChoose, setOpenChoose] = useState(false);

  const handleCreateTask = () => {
    if (title && description && priority != null) {
      const data = {
        title,
        description,
        date: date.toLocaleString(),
        priority,
      };
      insertDataIntoTable(
        'table_activeTask',
        data,
        resultSet => {
          ToastAndroid.show('Task created successfully', ToastAndroid.LONG);
          setTempState('TaskCreated');
        },
        error => {
          console.error('Error inserting data:', error);
          // Handle error
        },
      );
      setSelectedOption(null);
      setTitle('');
      setDescription('');
      setDate(new Date());
      setPriority('');
      setTempState('TaskCreated');
    } else {
      setTempState('Inputs are null');
    }
  };

  const handleCalendarPicker = () => {
    setOpen(true);
  };
  const options = [{label: 'High'}, {label: 'Medium'}, {label: 'Low'}];

  useEffect(() => {
    setPriority(selectedOption);
  }, [selectedOption]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Task Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Task Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <Text style={styles.text}>Select Deadline</Text>
      <View style={styles.dateContainer}>
        <Icon
          name={'calendar'}
          size={SCREEN_WIDTH * 0.09}
          color={Colors.SubduedBlue}
          onPress={() => handleCalendarPicker()}
        />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          androidVariant="nativeAndroid"
          minimumDate={date}
          title={'Choose Deadline'}
        />
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </View>
      <TouchableOpacity onPress={() => setOpenChoose(true)}>
        <TextInput
          label="Priority"
          value={priority}
          editable={false}
          style={styles.input}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCreateTask}>
        <IconButton
          mode="outlined"
          icon={'plus'}
          size={SCREEN_HEIGHT * 0.05}
          iconColor={Colors.fontColorActive}
          style={styles.submitButton}
        />
      </TouchableOpacity>
      <ChooseOption
        isVisible={openChoose}
        options={options}
        onClose={() => setOpenChoose(false)}
        header={'Set Priority'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: Colors.SubduedBlue,
  },
  submitButton: {
    marginTop: 20,
    alignSelf: 'center',
    borderColor: Colors.SubduedBlue,
  },
  text: {color: Colors.fontColorActive},
  dateText: {
    color: Colors.SubduedBlue,
    alignSelf: 'center',
    borderBottomColor: Colors.fontColorActive,
    borderBottomWidth: 0.5,
  },
});

export default NewTaskForm;
