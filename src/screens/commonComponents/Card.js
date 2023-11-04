import {StyleSheet, View, SafeAreaView} from 'react-native';
import React from 'react';
import {Colors} from '../../utils/colors';
import {Surface, Text} from 'react-native-paper';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../utils/others';
import Icon from 'react-native-vector-icons/EvilIcons';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {PanGestureHandler, ScrollView} from 'react-native-gesture-handler';
const CARD_HEIGHT = SCREEN_HEIGHT * 0.28;
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const Card = ({priority, title, date, description, children, onDelete, onShift}) => {
  const translateXThreshold = -SCREEN_WIDTH * 0.6;
  const translateXThreshold2 = SCREEN_WIDTH * 0.6;
  const translateX = useSharedValue(0);
  const iconTranslateX = useSharedValue(0);
  const ICON_OPACITY1 = useSharedValue(0);
  const ICON_OPACITY2 = useSharedValue(0);
  const marginVertical = useSharedValue('1%');
  const height = useSharedValue(CARD_HEIGHT);
  const width = useSharedValue(CARD_WIDTH);
  const gesture = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX
      if (translateX.value < -SCREEN_WIDTH * 0.2) {
        iconTranslateX.value = withTiming(30);
        ICON_OPACITY1.value = withTiming(1);
      }
      if (translateX.value > SCREEN_WIDTH * 0.2) {
        iconTranslateX.value = withTiming(-30);
        ICON_OPACITY2.value = withTiming(1);
      }
    },
    onEnd: (event, context) => {
      ICON_OPACITY1.value = withTiming(0);
      ICON_OPACITY2.value = withTiming(0);
      iconTranslateX.value = withTiming(0);
      const doCardDelete = translateXThreshold;
      const doCardShift = translateXThreshold2
      if (translateX.value < doCardDelete) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        height.value = withTiming(0);
        width.value = withTiming(0);
        marginVertical.value = withTiming('0%', undefined, finished => {
          if (finished) {
            runOnJS(onDelete)()
          }
        });
      } 
      else if (translateX.value > doCardShift) {
        translateX.value = withTiming(SCREEN_WIDTH);
        height.value = withTiming(0);
        width.value = withTiming(0);
        marginVertical.value = withTiming('0%', undefined, finished => {
          if (finished) {
            runOnJS(onShift)()
          }
        });
      }
      else {
        translateX.value = withTiming(event.translationX * 0);
        marginVertical.value = withTiming('1%');
      }
    },
  });
  const animatedCard = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
      height: height.value,
      width: width.value,
      marginVertical: marginVertical.value,
    };
  });

  const animateIcon = useAnimatedStyle(() => {
    return {
      transform: [{translateX: iconTranslateX.value}],
      opacity: ICON_OPACITY1.value,
    };
  });
  const animateIcon2 = useAnimatedStyle(() => {
    return {
      transform: [{translateX: iconTranslateX.value}],
      opacity: ICON_OPACITY2.value,
    };
  });

  return (
    <View style={styles.cardContainer}>
      <Animated.View style={[styles.iconContainer, animateIcon]}>
        <Icon name="trash" size={SCREEN_WIDTH * 0.1} color={'red'}>
        </Icon>
        <Text style={styles.iconText}>Swipe-left to delete task</Text>
      </Animated.View>
      <Animated.View style={[styles.iconContainer2, animateIcon2]}>
        <Icon name="arrow-right" size={SCREEN_WIDTH * 0.1} color={Colors.SubduedBlue}>
          </Icon> 
        <Text style={styles.iconText}>Swipe-right to stage progress</Text>
      </Animated.View>
      <PanGestureHandler onGestureEvent={gesture}>
        <Animated.View style={[styles.card, animatedCard]}>
          <Surface style={styles.surface} elevation={4}>
            <Text style={styles.label}>{priority}</Text>
          </Surface>
          <ScrollView contentContainerStyle={styles.cardItem} showsVerticalScrollIndicator={false} >
            <Text style={styles.name}>{title}</Text>
            <Text>{description}</Text>
            <Text style={{color: Colors.Secondary}}>Deadline: {date}</Text>
            {children}
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default Card;
const styles = StyleSheet.create({
  name:{
    fontSize:SCREEN_WIDTH*0.04,
    fontFamily:'Quicksand-Bold'
  },
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    flexDirection: 'row',
    borderRadius: 15,
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: Colors.Primary,
    width: CARD_WIDTH / 2,
    height: CARD_HEIGHT,
    position: 'absolute',
    right: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
  },
  iconContainer2: {
    backgroundColor: Colors.DarkSlateGrey,
    width: CARD_WIDTH / 2,
    height: CARD_HEIGHT,
    position: 'absolute',
    left: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
  },
  label: {
    color: Colors.fontColorActive,
    fontSize:SCREEN_WIDTH*0.02
  },
  cardItem: {
    width: SCREEN_WIDTH * 0.75,
    paddingLeft:SCREEN_WIDTH*0.1,
    paddingTop:SCREEN_WIDTH*0.05
    
  },
  surface: {
    height: SCREEN_HEIGHT * 0.05,
    width: SCREEN_WIDTH * 0.1,
    top: SCREEN_HEIGHT * 0.01,
    left: SCREEN_WIDTH*-0.05,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    backgroundColor: Colors.shadow,
    borderRadius: 150,
    position:'absolute',
  },
  iconText:{
    color:Colors.SubduedBlue,
    fontSize: SCREEN_WIDTH*0.04,
    textAlign:'center',
    maxWidth: SCREEN_WIDTH*0.35
  },
});
