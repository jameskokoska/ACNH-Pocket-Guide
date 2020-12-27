import React, { Component } from "react";
import {AppRegistry, StyleSheet, ScrollView , StatusBar, Text, View, Dimensions} from "react-native";
import colors from '../Colors.js';
import Svg, { Circle, Rect } from 'react-native-svg';

class ActiveTime extends Component {
  constructor(props) {
    super(props);
  }

  // render() {
  //   console.log(this.props);
  //   var displayText;
  //   if(this.props.displayText==="hello"){
  //     displayText = "yes";
  //   } else {
  //     displayText = "no";
  //   }
  //   return <Text style={[styles.text,{backgroundColor: colors.textWhite[colors.mode]}]}>{this.props.displayText2}</Text>
  // }

  render() {
    const width = 50;
    const size = width - 32;
    const strokeWidth = 50;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;

    return (
      // <Svg height={size} width={size}>
      //   <Circle
      //     cx={size / 2}
      //     cy={size / 2}
      //     r={radius}
      //     stroke="blue"
      //   />
      // </Svg>
      <Svg height="1000" width="1000">
        <Circle 
        x={size/2}
        cy={size/2}
        r="50"
        fill="pink"
        />
      </Svg>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize:26,
    borderRadius: 100,
    marginLeft: 13,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 4,
    paddingBottom: 4,
    elevation: 5,
    marginTop: 100
  },
})

export default ActiveTime;