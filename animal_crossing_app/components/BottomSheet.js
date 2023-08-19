import React, { createRef, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  withTiming,
  SlideInDown,
  SlideOutDown,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

export const HEIGHT = Dimensions.get('window').height;
export const OVERDRAG = 20;

// const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const BottomSheet = (props) => {
  const [isOpen, setOpen] = useState(props.visible);
  const panRef = createRef();
  const scrollViewRef = createRef();

  let canClose = true

  const onScroll = (event) => {
    if (event.nativeEvent.contentOffset.y <= 5 && offset.value <= 5) {
      canClose = true
    } else {
      if(startedClosing===false){
        canClose = false
      }
    }
  };
  
  useEffect(() => {
    if(props.visible){
      openSheet()
    } else {
      closeSheet()
    }
  }, [props.visible]);


  const offset = useSharedValue(0);

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const opacity = useAnimatedStyle(() => ({
    opacity: 1 - offset.value / HEIGHT - 0.5,
  }));


  let startY = 0;
  let startedClosing = false;

  const handlePanGestureEvent = (event)=>{
    if(canClose){
      startedClosing = true
      if(startY===0){
        startY=event.nativeEvent.y
      }
      const offsetDelta = (startY - event.nativeEvent.y) * -1 + offset.value;
      offset.value = offsetDelta > 0 ? offsetDelta : 0;
    }    
  }

  const closeSheet = () => {
    offset.value = 0;
    setOpen(false);
    props.setVisible(false)
    if(props.onClose!==undefined){
      props.onClose()
    } 
  }

  const openSheet = () => {
    offset.value = 0;
    setOpen(true);
    props.setVisible(true)
  }

  const handlePanGestureEnd = () => {
    startedClosing = false
    if (offset.value < HEIGHT * 0.05) {
      // Snap back to open
      offset.value = withSpring(0, {"damping":100});
    } else {
      // Closed sheet
      closeSheet()
      offset.value = withTiming(HEIGHT, {}, () => {
        runOnJS(closeSheet)();
      });
    }
  };
  
  const handlePanGestureStart = (event) => {
    startY = 0
  };

  return (
    <>
      {isOpen && (
        <>
          <Animated.View style={[styles.backdrop, opacity]} pointerEvents="none"/>
          <PanGestureHandler
            onGestureEvent={handlePanGestureEvent}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.END) {
                handlePanGestureEnd();
              } else if (nativeEvent.state === State.BEGAN) {
                handlePanGestureStart(nativeEvent);
              }
            }}
            ref={panRef}
          >
            <Animated.View
              style={[styles.sheet, translateY]}
              entering={SlideInDown.springify().mass(global.reducedMotion ? 0.00001 : 0.4).damping(100)}
              exiting={SlideOutDown.springify().mass(global.reducedMotion ? 0.00001 : 0.4).damping(100)}
            >
              <ScrollView
                ref={scrollViewRef}
                onScroll={onScroll}
                scrollEventThrottle={16}
                simultaneousHandlers={[panRef]}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity onPress={()=>{closeSheet()}} style={{flexGrow:1, paddingTop: props.reachabilityPaddingTop}}/>
                <View style={{ justifyContent: 'flex-end' }}>
                  {props.children}
                </View>
              </ScrollView>
            </Animated.View>
          </PanGestureHandler>
        </>
      )}
    </>
  );
}

export const reachabilityCalculation = (percent) => {
  return (((HEIGHT * percent) > 250 ? 250 : (HEIGHT * percent)) - 30)
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: "transparent",
    height: HEIGHT,
    width: "100%",
    position: "absolute",
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    color:"black",
    zIndex: 100,
  },
});

export default BottomSheet;