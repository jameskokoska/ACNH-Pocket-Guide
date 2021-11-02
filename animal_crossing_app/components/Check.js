import React, { Component } from "react";
import { Animated, Text, View, Easing } from "react-native";
import LottieView from 'lottie-react-native';
import {getSettingsString} from "../LoadJsonData"

class Check extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
    if(props.checkType==="heart") {
      this.checkMarkAnimationJSON = require('../assets/heartAnimationNoFade.json');
    // } else if(props.fadeOut===false || getSettingsString("settingsShowBlankCheckMarks")==="true"){
    } else if(props.fadeOut===false || true){
      this.checkMarkAnimationJSON = require('../assets/checkAnimationNoFade.json');
    } else {
      this.checkMarkAnimationJSON = require('../assets/checkAnimationFade.json');
    }
  }
  componentDidMount(){
    this.mounted=true;
    if(this.props.play===true){
      this.animateIn();
    }
  }
  componentWillUnmount() {
    this.mounted=false
  }
  componentDidUpdate(prevProps) {
    if(this.mounted){
      if(prevProps.play!==this.props.play){
        this.animateIn();
        if(this.props.play===true){
          this.state.progress.setValue(0);
          this.animateIn();
        } else if(this.props.play===false){
          this.state.progress.setValue(0.13);
          this.animateOut();
        }
      }
    }
  }
  animateIn = () => {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };
  animateOut = () => {
    Animated.timing(this.state.progress, {
      toValue: 0,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };

  render() {
    // if(getSettingsString("settingsShowBlankCheckMarks")==="false"&&((this.props.fadeOut===true || this.props.fadeOut===undefined) && !this.props.play)){
    if(false&&((this.props.fadeOut===true || this.props.fadeOut===undefined) && !this.props.play)){
      return <View/>
    } else {
      return (
      <LottieView 
        autoPlay={false}
        loop={false}
        progress={this.state.progress}
        resizeMode="cover" 
        style={[this.props.style,{
          opacity: this.props.play? (global.darkMode?0.95:1) : (global.darkMode?0.7:1),
          width: this.props.width,
          height: this.props.height,
        }]} source={this.checkMarkAnimationJSON}
      />);
    }
    
  }
}

export default Check ;