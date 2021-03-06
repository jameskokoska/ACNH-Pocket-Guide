import React, { Component } from "react";
import { Animated, Text, View, Easing } from "react-native";
//<FadeInOut duration={2} fadeIn={true} fadeInOut={true} scaleInOut={true} maxFade={0.8} minScale={0.5}>
//   <Text>Hi</Text>
//</FadeInOut>
class FadeInOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnimationValue: new Animated.Value(0),
      scaleAnimationValue: new Animated.Value(0),
    };
    this.scaleInOut = false;
    if(this.props.scaleInOut!==undefined && this.props.scaleInOut===true){
      this.scaleInOut = true;
    }
    this.maxFade = 1;
    if(this.props.maxFade!==undefined){
      this.maxFade = this.props.maxFade;
    }
    this.minScale = 1;
    if(this.props.minScale!==undefined){
      this.minScale = this.props.minScale;
    }
    this.duration = 400;
    if(this.props.duration!==undefined){
      this.duration = this.props.duration;
    }
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
  componentDidUpdate(prevProps) {
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
      toValue: 1,
      duration: this.duration,
      useNativeDriver: true,
    }).start();
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnimationValue, {
      toValue: 1-this.maxFade,
      duration: this.duration,
      useNativeDriver: true,
    }).start();
  };

  scaleIn = () => {
    Animated.timing(this.state.scaleAnimationValue, {
      toValue: 1,
      duration: this.duration,
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