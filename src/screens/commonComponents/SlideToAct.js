import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import {SCREEN_WIDTH} from '../../utils/others';
import {Colors} from '../../utils/colors';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
const SLIDING_CONTAINER_WIDTH = SCREEN_WIDTH * 0.25;
const SLIDING_CONTAINER_HEIGHT = SCREEN_WIDTH * 0.05;
const SLIDING_BALL_WIDTH = SCREEN_WIDTH * 0.08;
const SlideToAct = () => {
  const translateX = useSharedValue(0);
  const gesture = Gesture.Tap()
  .onEnd(() => {
    const toggled = SLIDING_CONTAINER_WIDTH - SLIDING_BALL_WIDTH;
    if ((translateX.value = toggled)) {
      translateX.value = SLIDING_BALL_WIDTH;
    } else {
      translateX.value = toggled;
    }
    console.log('end');
  });
  const animateSlider = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
      borderBottomRightRadius: SCREEN_WIDTH * 0.1,
      borderTopRightRadius: SCREEN_WIDTH * 0.1,
    };
  });

  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabelText}>Slide to stage-up progress</Text>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.slidingContainer}>
          <Animated.View style={[styles.slidingBall, animateSlider]} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default SlideToAct;

const styles = StyleSheet.create({
  switchLabelText: {
    fontSize: SCREEN_WIDTH * 0.015,
    color: Colors.DarkSlateGrey,
  },
  slidingBall: {
    width: SLIDING_BALL_WIDTH,
    height: SCREEN_WIDTH * 0.05,
    backgroundColor: Colors.fontColorActive,
    borderTopLeftRadius: SCREEN_WIDTH * 0.1,
    borderBottomLeftRadius: SCREEN_WIDTH * 0.1,
  },
  switchContainer: {
    position: 'absolute',
    bottom: SCREEN_WIDTH * 0.03,
  },
  slidingContainer: {
    width: SLIDING_CONTAINER_WIDTH,
    height: SLIDING_CONTAINER_HEIGHT,
    backgroundColor: Colors.Secondary,
    borderRadius: SCREEN_WIDTH * 0.1,
  },
});
