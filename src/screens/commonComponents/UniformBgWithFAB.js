import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../utils/colors'
import { FAB } from 'react-native-paper'

const UniformBgWithFAB = ({children}) => {
  return (
    <View style={{flex:1,backgroundColor:Colors.SubduedBlue}}>
        {children}
    </View>
  )
}

export default UniformBgWithFAB

const styles = StyleSheet.create({
    floatButton:{
        borderColor:Colors.Primary,
        borderWidth:1,
        borderRadius:50,
        backgroundColor:Colors.Primary,
        position:'absolute',
        bottom:5,
        right:5,
        color:Colors.fontColorActive
      }
})