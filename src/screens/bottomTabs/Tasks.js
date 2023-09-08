import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Active from '../topTabs/Active'
import InProgress from '../topTabs/InProgress'
import Finished from '../topTabs/Finished'
import { Colors } from '../../utils/colors'


const Tab = createMaterialTopTabNavigator()
const Tasks = () => {
  return (
    <Tab.Navigator
screenOptions={{
  tabBarStyle:{backgroundColor: Colors.Secondary},
  tabBarActiveTintColor: Colors.fontColorActive,
  tabBarInactiveTintColor:Colors.fontColorInActive,
  tabBarLabelStyle:{textTransform:'capitalize'}
  }}
>
    <Tab.Screen name="Active" component={Active} />
    <Tab.Screen name="In-Progress" component={InProgress} />
    <Tab.Screen name="Completed" component={Finished} />
  </Tab.Navigator>
  )
}

export default Tasks

const styles = StyleSheet.create({})