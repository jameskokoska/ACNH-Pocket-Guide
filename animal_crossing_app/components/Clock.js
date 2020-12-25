import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import TextFont from './TextFont';
import {getMonth, getWeekDayShort} from './DateFunctions';

class Clock extends Component {
  constructor(props){
    super(props);
    var month = getMonth(new Date().getMonth());
    var dayNum = new Date().getDate().toString();
    var weekDay = getWeekDayShort(new Date().getDay()) + ".";
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var afternoon = false;
    if(hours>12){
      hours=hours-12;
      afternoon=true;
    }
    if(hours===0){
      hours=12;
    }
    if(minutes.toString().length<2){
      minutes = "0" + minutes;
    }
    this.state = {
      date: month + " " + dayNum,
      time: hours + ":" + minutes,
      afternoonDisplay: afternoon ? "PM" : "AM",
      weekDay: weekDay
    }
  }
  componentDidMount(){
    this.timeInterval = setInterval(() => {

      var month = getMonth(new Date().getMonth());
      var dayNum = new Date().getDate().toString();
      var weekDay = getWeekDayShort(new Date().getDay()) + ".";
      var hours = new Date().getHours();
      var minutes = new Date().getMinutes();
      var afternoon = false;
      if(hours>12){
        hours=hours-12;
        afternoon=true;
      }
      if(hours===0){
        hours=12;
      }
      if(minutes.toString().length<2){
        minutes = "0" + minutes;
      }
      this.setState({
        date: month + " " + dayNum,
        time: hours + ":" + minutes,
        afternoonDisplay: afternoon ? "PM" : "AM",
        weekDay: weekDay
      })

    }, 10000);

  }

  componentWillUnmount(){
    clearInterval(this.timeInterval)
  }

  render(){
    
    
    return <View style={{alignItems: 'center'}}>
      {/* <Image
        style={{position:"absolute", top: -10, width:300, height: 200, resizeMode:'contain',}}
        source={require("../assets/icons/TestClock.png")}
      /> */}
      <View style={{flexDirection: 'row'}}> 
        <TextFont style={styles.clockTime} bold={true}>{this.state.time}</TextFont>
        <TextFont style={styles.meridian} bold={true}>{this.state.afternoonDisplay}</TextFont>
      </View>
      <View style={[styles.line,{width:this.state.date.length*21+120}]}/> 
      <View style={{flexDirection: 'row', alignItems: 'center'}}> 
        <TextFont style={styles.monthDay} bold={true}>{this.state.date}</TextFont>
        <TextFont style={styles.weekDay} bold={true}>{this.state.weekDay}</TextFont>
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