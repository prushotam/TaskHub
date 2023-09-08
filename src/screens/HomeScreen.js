import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Colors} from '../utils/colors';
import Icon from 'react-native-vector-icons/EvilIcons';
import Dashboard from './bottomTabs/Dashboard';
import Tasks from './bottomTabs/Tasks';
import { SCREEN_WIDTH } from '../utils/others';

const Bottom = createMaterialBottomTabNavigator();
const HomeScreen = () => {
  return (
    <Bottom.Navigator
      barStyle={{backgroundColor: Colors.SubduedBlue}}
      inactiveColor={Colors.DarkSlateGrey}
      activeColor={Colors.LighterShadeOfPrimary}
      keyboardHidesNavigationBar
      sceneAnimationType="opacity"
      >
      <Bottom.Screen
        name="Tasks"
        component={Tasks}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="pencil" color={color} size={SCREEN_WIDTH*0.08} />
          ),
        }}
      />
     <Bottom.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="eye" color={color} size={SCREEN_WIDTH*0.08} style />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default HomeScreen;
