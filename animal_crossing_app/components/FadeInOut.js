import React, { Component } from "react";
import { Animated, Text, View, Easing } from "react-native";
//<FadeInOut fadeIn={true} fadeInOut={true} scaleInOut={true}>
//   <Text>Hi</Text>
//</FadeInOut>
class FadeInOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationValue: new Animated.Value(0),
    };
    this.fadeInOut = true;
    this.scaleInOut = true;
  }
  componentDidMount(){
    if(this.props.fadeIn===true){
      this.animateIn();
    } else if(this.props.fadeIn===false){
      this.animateOut();
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.fadeIn===true){
      this.animateIn();
    } else if(this.props.fadeIn===false){
      this.animateOut();
    }
  }
  animateIn = () => {
    Animated.timing(this.state.animationValue, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  animateOut = () => {
    Animated.timing(this.state.animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  render() {
    return (
      <Animated.View
        style={[this.props.style,[
          {
            opacity: this.state.animationValue,
            transform: [{ scale: 1}]
          }
        ]]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default FadeInOut ;