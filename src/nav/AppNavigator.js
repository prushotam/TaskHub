import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import Refine from '../screens/Refine';
import { Colors } from '../utils/colors';


const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <Stack.Navigator
    >
        <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name="Refine"
        component={Refine}
        options={{headerStyle:{backgroundColor:Colors.Primary},headerTintColor:Colors.fontColorActive}}
        />
    </Stack.Navigator>
  )
}

export default AppNavigator