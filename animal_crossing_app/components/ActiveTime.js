import React, { Component } from "react";
import {AppRegistry, StyleSheet, ScrollView , StatusBar, Text, View, Dimensions, Image} from "react-native";
import colors from '../Colors.js';
import Svg, { Circle, Rect } from 'react-native-svg';
import {parseActiveTime, isActive} from "./DateFunctions"

function buildMonthList(monthList){
  return;
}

function getActiveTime(){
  var hemispherePre = global.settingsCurrent[0]["currentValue"] === "true" ? "NH " : "SH "
  var currentMonthShort = getMonthShort(new Date().getMonth());
  console.log(item[hemispherePre+currentMonthShort]);
  return;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

class ActiveTime extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.get
    var radius;
    var centre;
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    console.log(this.props.item["Name"]);

    // test functions
    const activeTime = this.props.item["NH Mar"];
    // console.log(activeTime);
    console.log(isActive(activeTime));

    return(
      // <View>
      //   <Image source={require("../assets/icons/clockActive.png")} style={{height: 100, width: 100, resizeMode:'contain'}}/>
      // </View>
      <View>
        {months.map((object, index) => {
          return <Text key={index} style={{color: "white", position: "absolute"}}>
            {object}
            </Text>
        })}
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