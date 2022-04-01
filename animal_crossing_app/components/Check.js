import React, { Component } from "react";
import { Animated, Text, View, Easing, Platform } from "react-native";
import LottieView from 'lottie-react-native';
import {getSettingsString} from "../LoadJsonData"
import colors from "../Colors";

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
    } 
    // else {
    //   this.checkMarkAnimationJSON = require('../assets/checkAnimationFade.json');
    // }
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
    let duration = 500
    if(getSettingsString("settingsLowEndDevice")==="true"){
      duration = 0
    }
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  };
  animateOut = () => {
    let duration = 250
    if(getSettingsString("settingsLowEndDevice")==="true"){
      duration = 0
    }
    Animated.timing(this.state.progress, {
      toValue: 0,
      duration: duration,
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
        Platform.OS != 'web' ?
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
          />
          : <View
            style={[this.props.style,{
              opacity: this.props.play? (global.darkMode?0.95:1) : (global.darkMode?0.7:1),
              backgroundColor: !this.props.play?colors.checkRed[global.darkMode]:colors.checkGreen[global.darkMode],
              borderRadius:50,
              width: this.props.width,
              height: this.props.height,
              elevation:5,
              transform: "scale(0.5)",
            }]}
          />
        );
    }
    
  }
}

export default Check ;