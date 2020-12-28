import React, { Component } from "react";
import {AppRegistry, StyleSheet, ScrollView , StatusBar, Text, View, Dimensions, Image} from "react-native";
import colors from '../Colors.js';
import Svg, { Circle, Rect } from 'react-native-svg';
import {parseActiveTime, isActive} from "./DateFunctions"

class ActiveTime extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render(){

    console.log(this.props.item["Name"]);
    // test functions
    const activeTime = this.props.item["NH Jan"];
    // console.log(activeTime);
    console.log(isActive(activeTime));

    return(
      // <View>
      //   <Image source={require("../assets/icons/clockActive.png")} style={{height: 100, width: 100, resizeMode:'contain'}}/>
      // </View>
      <View>
        <Image source={require("../assets/icons/months.png")} style={{height: 100, width: 100, resizeMode:'contain'}}/>
      </View>
    )
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