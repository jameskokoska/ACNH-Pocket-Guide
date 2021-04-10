import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import TextFont from './TextFont';
import {getCurrentDateObject, getMonth, getWeekDayShort} from './DateFunctions';
import {getSettingsString} from "../LoadJsonData"

class Clock extends Component {
  constructor(props){
    super(props);
    var month = getMonth(getCurrentDateObject().getMonth());
    var dayNum = getCurrentDateObject().getDate().toString();
    var weekDay = getWeekDayShort(getCurrentDateObject().getDay());
    var hours = getCurrentDateObject().getHours();
    var minutes = getCurrentDateObject().getMinutes();
    var afternoon = false;
    if(hours>12 && getSettingsString("settingsUse24HourClock")==="false"){
      hours=hours-12;
      afternoon=true;
    }
    if(hours===0 && getSettingsString("settingsUse24HourClock")==="false"){
      hours=12;
    }
    if(minutes.toString().length<2){
      minutes = "0" + minutes;
    }
    var afternoonDisplay
    if(getSettingsString("settingsUse24HourClock")==="false"){
      afternoonDisplay = afternoon ? "PM" : "AM";
    } else {
      afternoonDisplay = ""
    }
    this.state = {
      month: month,
      dayNum: dayNum,
      time: hours + ":" + minutes,
      afternoonDisplay: afternoonDisplay,
      weekDay: weekDay
    }
  }
  componentDidMount(){
    this.timeInterval = setInterval(() => {

      var month = getMonth(getCurrentDateObject().getMonth());
      var dayNum = getCurrentDateObject().getDate().toString();
      var weekDay = getWeekDayShort(getCurrentDateObject().getDay());
      var hours = getCurrentDateObject().getHours();
      var minutes = getCurrentDateObject().getMinutes();
      var afternoon = false;
      if(hours>12 && getSettingsString("settingsUse24HourClock")==="false"){
        hours=hours-12;
        afternoon=true;
      }
      if(hours===0 && getSettingsString("settingsUse24HourClock")==="false"){
        hours=12;
      }
      if(minutes.toString().length<2){
        minutes = "0" + minutes;
      }
      var afternoonDisplay
      if(getSettingsString("settingsUse24HourClock")==="false"){
        afternoonDisplay = afternoon ? "PM" : "AM";
      } else {
        afternoonDisplay = ""
      }
      this.setState({
        month: month,
        dayNum: dayNum,
        time: hours + ":" + minutes,
        afternoonDisplay: afternoonDisplay,
        weekDay: weekDay
      })

    }, 10000);

  }

  componentWillUnmount(){
    clearInterval(this.timeInterval)
  }

  render(){
    var dateComp = <>
      <TextFont suffix={" "+this.state.dayNum} style={styles.monthDay} bold={true}>{this.state.month}</TextFont>
      <TextFont suffix="." style={styles.weekDay} bold={true}>{this.state.weekDay}</TextFont>
    </>
    if(this.props.swapDate){
      dateComp = <>
        <TextFont suffix="." style={[styles.weekDay,{marginRight:10,marginLeft:0}]} bold={true}>{this.state.weekDay}</TextFont>
        <TextFont prefix={this.state.dayNum+" "} style={[styles.monthDay,{paddingRight:0}]} bold={true}>{this.state.month}</TextFont>
      </>
    }
    return <View style={{alignItems: 'center'}}>
      {/* <Image
        style={{position:"absolute", top: -10, width:300, height: 200, resizeMode:'contain',}}
        source={require("../assets/icons/TestClock.png")}
      /> */}
      <View style={{flexDirection: 'row'}}> 
        <TextFont translate={false} style={styles.clockTime} bold={true}>{this.state.time}</TextFont>
        <TextFont style={styles.meridian} bold={true}>{this.state.afternoonDisplay}</TextFont>
      </View>
      <View style={[styles.line,{width:(this.state.dayNum.length+" ".length+this.state.month.length)*21+112}]}/> 
      <View style={{flexDirection: 'row', alignItems: 'center'}}> 
        {dateComp}
      </View>
    </View>
  }
}
export default Clock;

const styles = StyleSheet.create({
  weekDay:{
    fontSize:26,
    backgroundColor: "white",
    borderRadius: 100,
    marginLeft: 13,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 4,
    paddingBottom: 4,
    elevation: 5
  },
  monthDay:{
    fontSize:35,
    color:"white",
    elevation: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 20
  },
  line:{
    marginTop: 1,
    marginBottom: 7,
    borderRadius:100,
    height: 5,
    backgroundColor: 'white',
    elevation: 5
  },
  meridian:{
    fontSize:38,
    marginLeft: 5,
    marginBottom: 7,
    color: "white",
    alignSelf: "flex-end",
    elevation: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 20
  },
  clockTime: {
    fontSize: 70,
    color: "white",
    elevation: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 20
  },
})