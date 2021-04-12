import React, { Component } from "react";
import { Animated, Text, View, Easing } from "react-native";
//<FadeInOut duration={200} delay={2000} startValue={0} endValue={1} fadeIn={true} fadeInOut={true} scaleInOut={true} maxFade={0.8} minScale={0.5}>
//   <Text>Hi</Text>
//</FadeInOut>
class FadeInOut extends Component {
  constructor(props) {
    super(props);
    this.scaleInOut = true;
    this.duration = 400;
    this.startValue = 0;
    this.endValue = 1;
    this.state = {
      fadeAnimationValue: new Animated.Value(this.startValue),
      scaleAnimationValue: new Animated.Value(this.startValue),
    };
  }
  componentDidMount(){
    if(this.props.fadeIn===true){
      this.fadeIn();
      this.scaleIn();
    } else if(this.props.fadeIn===false){
      this.fadeOut();
      this.scaleOut();
    }
  }
  fadeIn = () => {
    Animated.timing(this.state.fadeAnimationValue, {
      toValue: this.endValue,
      duration: this.duration,
      useNativeDriver: true,
      delay:this.delay,
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnimationValue, {
      toValue: this.endValue-this.maxFade,
      duration: this.duration,
      useNativeDriver: true,
      delay:this.delay,
    }).start();
  };

  scaleIn = () => {
    Animated.timing(this.state.scaleAnimationValue, {
      toValue: 1,
      duration: this.duration,
      useNativeDriver: true,
    }).start();
  };

  scaleInOver = () => {
    Animated.timing(this.state.scaleAnimationValue, {
      toValue: 1.1,
      duration: this.duration+100,
      useNativeDriver: true,
    }).start();
  };

  scaleOut = () => {
    Animated.timing(this.state.scaleAnimationValue, {
      toValue: this.minScale,
      duration: this.duration,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <Animated.View
        style={[this.props.style,[
          {
            opacity: this.state.fadeAnimationValue,
            transform: [{ scale: this.scaleInOut ? this.state.scaleAnimationValue : 1}]
          }
        ]]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default FadeInOut ;