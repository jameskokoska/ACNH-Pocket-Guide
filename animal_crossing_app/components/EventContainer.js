import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'

// <EventContainer 
//  backgroundColor="black" 
//  textColor="white" 
//  image={require("../assets/icons/music.png")} 
//  text="K.K. Slider" 
//  textBottom="6 - 8 PM" 
//  month="Nov" 
//  day="31"
// />


class EventContainer extends Component {
  componentDidMount() {
    
  }
  render(){
    return(
        <View style={[styles.eventContainer,{backgroundColor:this.props.backgroundColor}]}>
          <Image style={styles.eventImage} source={this.props.image}/>
          <View style={styles.textContainer}>
            <TextFont bold={true} style={[styles.textContainerTop,{color:this.props.textColor}]}>{this.props.text}</TextFont>
            <TextFont style={[styles.textContainerBottom,{color:this.props.textColor}]}>{this.props.textBottom}</TextFont>
          </View>
          <View style={{width: 30, alignItems:"center", marginLeft: -8}}>
            <Image style={styles.eventCalendar} source={require("../assets/icons/calendarIcon.png")}/>
            <TextFont bold={true} style={{position:"absolute", top:1, textAlign:"center",color:"brown", fontSize: 12}}>{this.props.month}</TextFont>
            <TextFont bold={true} style={{position:"absolute", top:17, textAlign:"center",color:"brown", fontSize: 25}}>{this.props.day}</TextFont>
          </View>
        </View>
    )
  }
}
export default EventContainer;

const styles = StyleSheet.create({
  textContainerTop:{
    textAlign:"center",
    fontSize: 20,
  },
  textContainerBottom:{
    textAlign:"center",
    marginTop: 3,
    fontSize: 18,
  },
  textContainer:{
    width: "80%",
    marginLeft: -20,
  },
  eventCalendar: {
    width: 50,
    height: 50,
    resizeMode:'contain',
  },
  eventImage: {
    width: 50,
    height: 50,
    resizeMode:'contain',
  },
  eventContainer: {
    justifyContent: 'space-evenly',
    padding: 20,
    margin: 4,
    flexDirection:"row",
    flex:1,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    height: 90
  },
});