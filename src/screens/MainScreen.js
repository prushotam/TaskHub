import {View, TouchableOpacity, StatusBar, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useCallback, useRef, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SideScreen from './SideScreen';
import HomeScreen from './HomeScreen';
import {Colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FAB} from 'react-native-paper';
import {SCREEN_HEIGHT} from '../utils/others';
import ChooseOption from './commonComponents/ChooseOptions';
import {useAppStateContext} from '../utils/AppsStateContext';
import BottomSheet from './commonComponents/BottomSheet';
import NewTaskForm from './commonComponents/NewTaskForm';

const Drawer = createDrawerNavigator();
const MainScreen = () => {
  const {selectedOption, setSelectedOption, counter, setCounter} =
    useAppStateContext();
  const HeaderRightIcon = () => {
    const navigation = useNavigation(); // Get the navigation object using the useNavigation hook

    const handlePress = () => {
      navigation.navigate('Refine'); // Use the navigation object to open the drawer when the left icon is pressed
    };

    return (
      <TouchableOpacity onPress={handlePress} style={{marginHorizontal: 5}}>
        <Icon
          name="format-list-checks"
          size={30}
          color={Colors.fontColorActive}
        />
        <Text style={{color: Colors.fontColorActive}}>Refine</Text>
      </TouchableOpacity>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  const options = [{label: 'Individual'}, {label: 'Team'}];
  const selectedOptions = option => {
    setSelectedOption(option);
  };

  const ref = useRef(null);
  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-600);
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={Colors.Primary} />
      <Drawer.Navigator drawerContent={props => <SideScreen {...props} />}>
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerStyle: {backgroundColor: Colors.Primary},
            headerTitleContainerStyle: {flexWrap: 'wrap'},
            // headerTitle: 'Howdy Prushotam Mishra !!\n & Location', //Actually it should be updated from backend data but hardcoded here
            headerTitleStyle: {
              fontFamily: 'RobotoCondensed-Regular',
              fontSize: 15,
              flexWrap: 'wrap',
            },
            headerTintColor: Colors.fontColorActive,
            headerRight: () => HeaderRightIcon(),
          }}
        />
      </Drawer.Navigator>
      <FAB
        icon={'plus'}
        style={styles.floatButton}
        color={Colors.fontColorActive}
        size="medium"
        onPress={() => onPress()}
      />
      <BottomSheet ref={ref}>
        <NewTaskForm />
      </BottomSheet>

      <ChooseOption
        isVisible={modalVisible}
        options={options}
        onSelectOption={selectedOptions}
        selectedOption={selectedOption}
        onClose={() => setModalVisible(false)}
        header={'Select'}
      />
    </View>
  );
};

export default MainScreen;
const styles = StyleSheet.create({
  floatButton: {
    borderColor: Colors.Primary,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: Colors.Primary,
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.02,
    alignSelf: 'center',
  },
});
