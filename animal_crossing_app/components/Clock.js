import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import TextFont from './TextFont';


class Clock extends Component {
  constructor(props){
    super(props);
    this.state={
      fontLoaded:false
    }
  }
  async componentDidMount(){
  }
  render(){
    var date="May 23";
    return <View style={{alignItems: 'center'}}>
      {/* <Image
        style={{position:"absolute", top: -10, width:300, height: 200, resizeMode:'contain',}}
        source={require("../assets/icons/TestClock.png")}
      /> */}
      <View style={{flexDirection: 'row'}}> 
        <TextFont style={styles.clockTime} bold={true}>1:26</TextFont>
        <TextFont style={styles.meridian} bold={true}>PM</TextFont>
      </View>
      <View style={[styles.line,{width:date.length*21+120}]}/> 
      <View style={{flexDirection: 'row', alignItems: 'center'}}> 
        <TextFont style={styles.monthDay} bold={true}>{date}</TextFont>
        <TextFont style={styles.weekDay} bold={true}>Mon.</TextFont>
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
  },
  monthDay:{
    fontSize:35,
    color:"white",
  },
  line:{
    marginTop: 1,
    marginBottom: 7,
    borderRadius:100,
    height: 5,
    backgroundColor: 'white',
  },
  meridian:{
    fontSize:38,
    marginLeft: 5,
    marginBottom: 7,
    color: "white",
    alignSelf: "flex-end",
  },
  clockTime: {
    fontSize: 70,
    color: "white",
  },
})