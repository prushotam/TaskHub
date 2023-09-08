import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useDerivedValue,
  runOnJS,
  withSpring,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Colors} from '../../utils/colors';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/others';
import { useAppStateContext } from '../../utils/AppsStateContext';

const CustomProgressBar = () => {
  const translateX = useSharedValue(0);
  const translateXRef = useRef(translateX); // Create a ref to hold the shared value
  const { state, setState } = useAppStateContext();
  const [textValue, setTextValue] = useState(0)
  // Update the ref whenever translateX.value changes
  useEffect(() => {
    translateXRef.current = translateX; // Update the ref with the shared value
  }, [translateX]);

   const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateX.value = Math.max(
        0,
        Math.min(context.startX + event.translationX, SCREEN_WIDTH * 0.49)
      );
    },
  });

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translateXRef.current.value) }],
    };
  });

  const animatedLineStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(translateXRef.current.value),
      backgroundColor: Colors.fontColorActive,
    };
  });
  const textValueDerived = useDerivedValue(() => {
    const newValue = (translateXRef.current.value / (SCREEN_WIDTH * 0.49)) * 100;
    runOnJS(setTextValue)(newValue.toFixed(0));
    return newValue.toFixed(0);
  });

  return (
    <View style={styles.container}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View>
        <Animated.View style={[styles.box]}>
          <Animated.Text style={{color: Colors.DarkSlateGrey}}>{textValueDerived.value}</Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.line]}>
          <Animated.View style={[styles.line, animatedLineStyle]} />
          <Animated.View style={[styles.circle, animatedCircleStyle]} />
        </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: SCREEN_WIDTH * 0.55,
  },
  line: {
    justifyContent: 'center',
    width: SCREEN_WIDTH * 0.5,
    height: 5,
    backgroundColor: Colors.DarkSlateGrey,
    borderRadius: 10,
  },
  circle: {
    width: SCREEN_WIDTH * 0.04,
    height: SCREEN_WIDTH * 0.04,
    borderRadius: 10,
    backgroundColor: Colors.DarkSlateGrey,
    position: 'absolute',
    zIndex: 999,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'flex-end',
    height: SCREEN_HEIGHT * 0.04,
    width: SCREEN_HEIGHT * 0.04,
    // backgroundColor: Colors.Primary,
    position: 'relative',
    borderRadius: 10,
    elevation: 11,
  },
});

export default CustomProgressBar;
