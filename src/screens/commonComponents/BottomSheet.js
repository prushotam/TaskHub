import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useImperativeHandle} from 'react';
import {Gesture, GestureDetector, ScrollView} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SCREEN_HEIGHT } from '../../utils/others';
import { Colors } from '../../utils/colors';


const BottomSheet = React.forwardRef(({children}, ref) => {
  //Source Guide Video : Reactiive + Swipeable is a npm lib for the same thing

  const translateY = useSharedValue(0);
  const context = useSharedValue({y: 0});
  const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination = Number) => {
    'worklet';
    active.value = destination != 0;

    translateY.value = withSpring(destination, {damping: 50});
  });
  const isActive = useCallback(() => {
    return active.value;
  }, []);
  useImperativeHandle(ref, () => ({scrollTo, isActive}), [scrollTo, isActive]);
  //getting gesture
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y; // now sheet is draggable out of screen,to stop this
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y); // controlling max upside
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 3) {
        // translateY.value = withSpring(0, {damping: 50});
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.8) {
        // translateY.value = withSpring(MAX_TRANSLATE_Y, {damping: 50});
        scrollTo(MAX_TRANSLATE_Y);
      }
    });
  //assigning gesture value to new Style to transform it with sheet
  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{translateY: translateY.value}],
    };
  });

  
  
  //codes and jsx changes for backdrop
const rBackdropStyle = useAnimatedStyle(()=> {
return{
opacity: withTiming(active.value ? 1 : 0)
}

},[])

// controlling pointer events on active value and to tap & close on any part of backdrop
const rBackdropProps = useAnimatedProps(()=> {
return{
  pointerEvents : active.value? 'auto' : 'none'
}
}, [])

  return (
    <>
    <Animated.View
    // pointerEvents="auto"  enables-disbles the button to click of paywall component
    onTouchStart={()=>{
      //dismiss the bottom sheet on taping on bacdrop
      scrollTo(0)
    }}
    animatedProps={rBackdropProps}
    style={[
      {...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    }, rBackdropStyle, ]
  }
    />
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        <ScrollView style={{flex:1,backgroundColor:Colors.Primary}}>
        {children}
        </ScrollView>
      </Animated.View>
    </GestureDetector>
    </>
  );
});

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: '#010203',
    marginVertical: 15,
    alignSelf: 'center',
    borderRadius: 2,
  },
});
