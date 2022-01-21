import React, { Component } from "react";
import { Animated, Text, View, Easing } from "react-native";
import { getSettingsString } from "../LoadJsonData";
//<FadeInOut duration={200} delay={2000} startValue={0} endValue={1} fadeIn={true} fadeInOut={true} scaleInOut={true} maxFade={0.8} minScale={0.5}>
//   <Text>Hi</Text>
//</FadeInOut>
class FadeInOut extends Component {
  constructor(props) {
    super(props);
    
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
    this.startValue = 0;
    if(this.props.startValue!==undefined){
      this.startValue = this.props.startValue;
    }
    this.endValue = 1;
    if(this.props.endValue!==undefined){
      this.endValue = this.props.endValue;
    }
    this.delay = 0;
    if(this.props.delay!==undefined){
      this.delay = this.props.delay;
    }
    this.state = {
      fadeAnimationValue: new Animated.Value(this.startValue),
      scaleAnimationValue: new Animated.Value(this.startValue),
    };
  }
  componentDidMount(){
    if(getSettingsString("settingsLowEndDevice")==="true"){
      return
    }
    if(this.props.fadeIn===true){
      this.fadeIn();
      this.scaleIn();
    } else if(this.props.fadeIn===false){
      this.fadeOut();
      this.scaleOut();
    }
  }
  componentDidUpdate(prevProps) {
    if(getSettingsString("settingsLowEndDevice")==="true"){
      return
    }
    if(prevProps!==this.props){
      if(this.props.fadeIn===true){
        this.fadeIn();
        this.scaleIn();
      } else if(this.props.fadeIn===false){
        this.fadeOut();
        this.scaleOut();
      }
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
    if(getSettingsString("settingsLowEndDevice")==="true"){
      return (
        <View
          style={[this.props.style,[
            {
              opacity: this.endValue,
            }
          ]]}
        >
          {this.props.children}
        </View>
      )
    } else {
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
}

export default FadeInOut ;