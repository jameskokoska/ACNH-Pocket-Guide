import React, { useEffect, useState } from 'react';
import {
  I18nManager,
  LayoutChangeEvent,
  StatusBarAnimation,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Keyboard,
  StatusBar,
} from 'react-native';
import {
  DrawerKeyboardDismissMode,
  DrawerLockMode,
  DrawerPosition,
  DrawerType,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

function Overlay(props) {
  // Subtract 0.15 so the overlay disappears a bit earlier to allow touch interaction when menu still closing
  const overlayStyle = useAnimatedStyle(() => ({
    backgroundColor: props.color,
    opacity: props.progress.value-0.15,
    transform: [
      {
        translateX:
          // when the overlay should not be visible move it off the screen
          // to prevent it from intercepting touch events on Android
          props.progress.value <= 0.15
            ? 10000
            : 0,
      },
    ],
  }));

  const tap = Gesture.Tap();
  tap.onEnd((_event, success) => {
    'worklet';
    if (success && props.lockMode !== 'locked-open') {
      // close the drawer when tapped on the overlay only if the gesture
      // was not cancelled and it's not locked in opened state
      props.close();
    }
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[styles.overlay, overlayStyle]} />
    </GestureDetector>
  );
}


export const DrawerLayout = React.forwardRef(
  (
    {
      drawerWidth = 200,
      drawerPosition = 'left',
      drawerType = 'front',
      edgeWidth = 20,
      minSwipeDistance = 3,
      overlayColor = 'rgba(0, 0, 0, 0.7)',
      drawerLockMode = 'unlocked',
      enableTrackpadTwoFingerGesture = false,
      keyboardDismissMode,
      statusBarAnimation,
      hideStatusBar,
      drawerBackgroundColor,
      drawerContainerStyle,
      contentContainerStyle,
      children,
      renderNavigationView,
      onDrawerClose,
      onDrawerOpen,
      onDrawerSlide,
      onDrawerStateChanged,
    },
    ref
  ) => {
    const animationConfig = { damping: 40, stiffness: 350 };

    const fromLeft = drawerPosition === 'left';
    const drawerSlide = drawerType !== 'back';
    const containerSlide = drawerType !== 'front';

    // setting NaN as a starting value allows to tell when the value gets changes
    // for the first time
    const [containerWidth, setContainerWidth] = useState(Number.NaN);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const drawerState = useSharedValue('Idle');
    // between 0 and drawerWidth (drawer on the left) or -drawerWidth and 0 (drawer on the right)
    const drawerOffset = useSharedValue(0);
    // stores value of the offset at the start of the gesture
    const drawerSavedOffset = useSharedValue(0);
    const isDrawerOpenSaved = useSharedValue(false);
    // stores the translation that is supposed to be ignored (user tried to
    // drag while animation was running)
    const ignoredOffset = useSharedValue(0);
    // stores the x coordinate of the drag starting point (to ignore dragging on the overlay)
    const dragStartPosition = useSharedValue(0);
    // between 0 and 1, 0 - closed, 1 - opened
    const openingProgress = useDerivedValue(() => {
      if (fromLeft) {
        return drawerOffset.value / drawerWidth;
      } else {
        return -drawerOffset.value / drawerWidth;
      }
    }, [drawerOffset, containerWidth, drawerWidth, fromLeft]);

    // we rely on row and row-reverse flex directions to position the drawer
    // properly. Apparently for RTL these are flipped which requires us to use
    // the opposite setting for the drawer to appear from left or right
    // according to the drawerPosition prop
    const reverseContentDirection = I18nManager.isRTL ? fromLeft : !fromLeft;

    // set the drawer to closed position when the props change to prevent it from
    // opening or moving on the screen
    useEffect(() => {
      drawerOffset.value = 0;
      drawerSavedOffset.value = 0;

      setDrawerVisible(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerWidth, drawerPosition, drawerType]);

    // measure the container
    function handleContainerLayout({ nativeEvent }) {
      setContainerWidth(nativeEvent.layout.width);
    }

    function onDragStart() {
      if (keyboardDismissMode === 'on-drag') {
        Keyboard.dismiss();
      }

      // this is required in addition to the similar call below, because the gesture
      // doesn't change `drawerVisible` state to prevent re-render during gesture
      // so when dragging from closed it wouldn't hide the status bar
      if (hideStatusBar) {
        StatusBar.setHidden(true, statusBarAnimation ?? 'slide');
      }
    }

    function setState(newState, willShow) {
      if (hideStatusBar) {
        StatusBar.setHidden(willShow, statusBarAnimation ?? 'slide');
      }

      // dispach events
      if (drawerState.value !== newState || drawerVisible !== willShow) {
        // send state change event only when the state changed or the visibility of the
        // drawer (for example when drawer is in SETTLING state after opening and the user
        // taps on the overlay the state is still settling, but willShow is now false)
        onDrawerStateChanged?.(newState, willShow);
      }

      if (drawerVisible !== willShow) {
        setDrawerVisible(willShow);
      }

      if (newState === 'Idle') {
        if (willShow) {
          onDrawerOpen?.();
        } else {
          onDrawerClose?.();
        }
      }

      drawerState.value = newState;
    }

    function open() {
      'worklet';
      if (fromLeft && drawerOffset.value < drawerWidth) {
        // drawer is on the left and is not fully opened
        //runOnJS(setState)('Settling', true);
        runOnJS(setState)('Idle', true);

        drawerOffset.value = withSpring(
          drawerWidth,
          animationConfig,
          (finished) => {
            drawerSavedOffset.value = drawerOffset.value;
            if (finished) {
              // animation cannot be interrupted by a drag, but can be by
              // calling close or open (through tap or a controller)
              runOnJS(setState)('Idle', true);
            }
          }
        );
      } else if (!fromLeft && drawerOffset.value > -drawerWidth) {
        // drawer is on the right and is not fully opened
        //runOnJS(setState)('Settling', true);
        runOnJS(setState)('Idle', true);

        drawerOffset.value = withSpring(
          -drawerWidth,
          animationConfig,
          (finished) => {
            drawerSavedOffset.value = drawerOffset.value;
            if (finished) {
              // animation cannot be interrupted by a drag, but can be by
              // calling close or open (through tap or a controller)
              runOnJS(setState)('Idle', true);
            }
          }
        );
      } else {
        // drawer is fully opened
        runOnJS(setState)('Idle', true);
      }
    }

    function close() {
      'worklet';
      if (fromLeft && drawerOffset.value > 0) {
        // drawer is on the left and is not fully closed
        // runOnJS(setState)('Settling', false);
        runOnJS(setState)('Idle', false);

        drawerOffset.value = withSpring(0, animationConfig, (finished) => {
          drawerSavedOffset.value = drawerOffset.value;
          if (finished) {
            // animation cannot be interrupted by a drag, but can be by
            // calling close or open (through tap or a controller)
            runOnJS(setState)('Idle', false);
          }
        });
      } else if (!fromLeft && drawerOffset.value < 0) {
        // drawer is on the right and is not fully closed
        // runOnJS(setState)('Settling', false);
        runOnJS(setState)('Idle', false);

        drawerOffset.value = withSpring(0, animationConfig, (finished) => {
          drawerSavedOffset.value = drawerOffset.value;
          if (finished) {
            // animation cannot be interrupted by a drag, but can be by
            // calling close or open (through tap or a controller)
            runOnJS(setState)('Idle', false);
          }
        });
      } else {
        // drawer is fully closed
        runOnJS(setState)('Idle', false);
      }
    }

    // gestureOrientation is 1 if the expected gesture is from left to right and
    // -1 otherwise e.g. when drawer is on the left and is closed we expect left
    // to right gesture, thus orientation will be 1.
    const gestureOrientation = (fromLeft ? 1 : -1) * (drawerVisible ? -1 : 1);

    // When drawer is closed we want the hitSlop to be horizontally shorter than
    // the container size by the value of SLOP. This will make it only activate
    // when gesture happens not further than SLOP away from the edge
    const hitSlop = fromLeft
      ? { left: 0, width: drawerVisible ? undefined : edgeWidth }
      : { right: 0, width: drawerVisible ? undefined : edgeWidth };

    // *** THIS IS THE LARGE COMMENT ABOVE ***
    //
    // While closing the drawer when user starts gesture outside of its area (in greyed
    // out part of the window), we want the drawer to follow only once finger reaches the
    // edge of the drawer.
    // E.g. on the diagram below drawer is illustrate by X signs and the greyed out area by
    // dots. The touch gesture starts at '*' and moves left, touch path is indicated by
    // an arrow pointing left
    // 1) +---------------+ 2) +---------------+ 3) +---------------+ 4) +---------------+
    //    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXX|.........|
    //    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXX|.........|
    //    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXX|.........|
    //    |XXXXXXXX|......|    |XXXXXXXX|.<-*..|    |XXXXXXXX|<--*..|    |XXXXX|<-----*..|
    //    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXX|.........|
    //    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXX|.........|
    //    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXXXXX|......|    |XXXXX|.........|
    //    +---------------+    +---------------+    +---------------+    +---------------+
    //
    // For the above to work properly we define animated value that will keep
    // start position of the gesture. Then we use that value to calculate how
    // much we need to subtract from the dragX. If the gesture started on the
    // greyed out area we take the distance from the edge of the drawer to the
    // start position. Otherwise we don't subtract at all and the drawer be
    // pulled back as soon as you start the pan.
    //
    // This is used only when drawerType is "front"
    //

    const pan = Gesture.Pan();
    pan.failOffsetY([-15, 15]);
    pan.hitSlop(hitSlop);
    pan.activeOffsetX(gestureOrientation * minSwipeDistance);
    pan.enableTrackpadTwoFingerGesture(enableTrackpadTwoFingerGesture);
    pan.enabled(
      drawerLockMode !== 'locked-closed' && drawerLockMode !== 'locked-open'
    );
    pan.onStart((event) => {
      'worklet';
      ignoredOffset.value = 0;
      dragStartPosition.value = event.x;
      if(drawerOffset.value / drawerWidth > 0.95){
        isDrawerOpenSaved.value = true;
      } else {
        isDrawerOpenSaved.value = false;
      }
    });
    pan.onUpdate((event) => {
      'worklet';
      if (drawerState.value === 'Idle') {
        runOnJS(setState)('Dragging', drawerVisible);
        runOnJS(onDragStart)();
      }

      if (drawerState.value === 'Dragging') {
        let newOffset =
          drawerSavedOffset.value + event.translationX - ignoredOffset.value;

        if (fromLeft) {
          // refer to the large comment above
          if (
            drawerType === 'front' &&
            event.translationX < 0 &&
            drawerOffset.value > 0
          ) {
            newOffset += dragStartPosition.value - drawerWidth;
          }

          // clamp the offset so the drawer does not move away from the edge
          newOffset = Math.max(0, Math.min(drawerWidth, newOffset));
          
          // // close the drawer if we are swiping to close it
          // if(event.translationX < -100){
          //   close();
          // }
        } else {
          // refer to the large comment above
          if (
            drawerType === 'front' &&
            event.translationX > 0 &&
            drawerOffset.value < 0
          ) {
            newOffset +=
              dragStartPosition.value - (containerWidth - drawerWidth);
          }

          // clamp the offset so the drawer does not move away from the edge
          newOffset = Math.max(-drawerWidth, Math.min(0, newOffset));
        }

        drawerOffset.value = newOffset;

        // send event if there is a listener
        if (onDrawerSlide !== undefined) {
          runOnJS(onDrawerSlide)(openingProgress.value);
        }
      } else {
        // drawerState is SETTLING, save the translation to ignore it later
        ignoredOffset.value = event.translationX;
      }
    });
    pan.onEnd((_event) => {
      'worklet';
      if (drawerState.value === 'Dragging') {
        // update offsets and animations only when the drag was not ignored
        drawerSavedOffset.value = drawerOffset.value;

        // if the drawer was dragged more than half of its width open it,
        // otherwise close it
        if (fromLeft) {
          // console.log(drawerOffset.value / drawerWidth)
          // console.log(isDrawerOpenSaved.value)
          if(isDrawerOpenSaved.value===true && drawerOffset.value / drawerWidth < 0.9){
            close()
          }else if(isDrawerOpenSaved.value===true && drawerOffset.value / drawerWidth > 0.9){
            open()
          }else if(isDrawerOpenSaved.value===false && drawerOffset.value / drawerWidth > 0.1){
            open()
          } else {
            close()
          }
        } else {
          if (drawerOffset.value < -drawerWidth / 4) {
            open();
          } else {
            close();
          }
        }
      }
    });

    const dynamicDrawerStyles = {
      backgroundColor: drawerBackgroundColor,
      width: drawerWidth,
    };

    const drawerStyle = useAnimatedStyle(() => {
      let translateX = 0;

      if (drawerSlide) {
        // drawer is supposed to be moved with the gesture (in this case
        // drawer is anchored to be off the screen when not opened)
        if (fromLeft) {
          translateX = -drawerWidth;
        } else {
          translateX = containerWidth;
        }
        translateX += drawerOffset.value;
      } else {
        // drawer is stationary (in this case drawer is below the content
        // so it's anchored left edge to left edge or right to right)
        if (fromLeft) {
          translateX = 0;
        } else {
          translateX = containerWidth - drawerWidth;
        }
      }

      // if the drawer is not visible move it off the screen to prevent it
      // from intercepting touch events on Android
      if (drawerOffset.value === 0) {
        translateX = 10000;
      }

      return {
        flexDirection: reverseContentDirection ? 'row-reverse' : 'row',
        transform: [{ translateX }],
      };
    });

    const containerStyle = useAnimatedStyle(() => {
      let translateX = 0;

      if (containerSlide) {
        // the container should be moved with the gesture
        translateX = drawerOffset.value;
      }

      return {
        transform: [{ translateX }],
      };
    });

    if (ref !== null) {
      // ref is set, create a controller and pass it
      const controller = {
        open: () => {
          open();
        },
        close: () => {
          close();
        },
      };

      if (typeof ref === 'function') {
        ref(controller);
      } else {
        ref.current = controller;
      }
    }

    return (
      <GestureDetector gesture={pan}>
        <Animated.View style={styles.main} onLayout={handleContainerLayout}>
          <Animated.View
            style={[
              drawerType === 'front'
                ? styles.containerOnBack
                : styles.containerInFront,
              contentContainerStyle,
              containerStyle,
            ]}>
            <Overlay
              drawerType={drawerType}
              color={overlayColor}
              progress={openingProgress}
              lockMode={drawerLockMode}
              close={close}
            />
            {children}
            
          </Animated.View>

          <Animated.View
            style={[
              styles.drawerContainer,
              drawerContainerStyle,
              dynamicDrawerStyles,
              drawerStyle,
            ]}>
            {renderNavigationView(openingProgress)}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  drawerContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1001,
    flexDirection: 'row',
  },
  containerInFront: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1002,
  },
  containerOnBack: {
    ...StyleSheet.absoluteFillObject,
  },
  main: {
    flex: 1,
    zIndex: 0,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
});