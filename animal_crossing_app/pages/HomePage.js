import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Clock from '../components/Clock';
import HomeContentArea from '../components/HomeContentArea';
import {EventContainer,getEventsDay} from '../components/EventContainer';
import StoreHoursContainer from '../components/StoreHoursContainer';
import LottieView from 'lottie-react-native';
import colors from '../Colors'
import {capitalize} from "../LoadJsonData"
import TextFont from "../components/TextFont"

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

class HomePage extends Component {
  render(){
    var todayEvents = getEventsDay(new Date());
    var tomorrowEvents = getEventsDay(addDays(new Date(), 1));
    var thisWeekEvents = [];
    for(var i=2; i<7; i++){
      thisWeekEvents = thisWeekEvents.concat(getEventsDay(addDays(new Date(), i)));
    }
    var todayTitle=<View/>
    if(todayEvents.length>0){
      todayTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[colors.mode]}]}>Today</TextFont>
    }
    var tomorrowTitle=<View/>
    if(tomorrowEvents.length>0){
      tomorrowTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[colors.mode]}]}>Tomorrow</TextFont>
    }
    var thisWeekTitle=<View/>
    if(thisWeekEvents.length>0){
      thisWeekTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[colors.mode]}]}>This Week</TextFont>
    }
    return <>
      <ScrollView>
        <View style={{height:45}}/>
        <Clock/>
        <View style={{height:125}}/>
        <HomeContentArea backgroundColor={colors.lightDarkAccent[colors.mode]} accentColor={colors.eventsColor[colors.mode]} title="Events" titleColor={colors.eventsColor[colors.modeReverse]}>
          {todayTitle}
          {todayEvents.map( (event, index)=>
            <EventContainer 
              key={event["Name"]} 
              backgroundColor={colors.sectionBackground1[colors.mode]}
              textColor="white"
              image={event["Image"]}
              text={event["Name"]}
              textBottom={capitalize(event["Time"])}
              month={event["Month"]} 
              day={event["Day Start"]}
            />
          )}
          {tomorrowTitle}
          {tomorrowEvents.map( (event, index)=>
            <EventContainer 
              key={event["Name"]} 
              backgroundColor={colors.sectionBackground1[colors.mode]}
              textColor="white"
              image={event["Image"]}
              text={event["Name"]}
              textBottom={capitalize(event["Time"])}
              month={event["Month"]} 
              day={event["Day Start"]}
            />
          )}
          {thisWeekTitle}
          {thisWeekEvents.map( (event, index)=>
            <EventContainer 
              key={event["Name"]} 
              backgroundColor={colors.sectionBackground1[colors.mode]}
              textColor="white"
              image={event["Image"]}
              text={event["Name"]}
              textBottom={capitalize(event["Time"])}
              month={event["Month"]} 
              day={event["Day Start"]}
            />
          )}
          <View style={{height: 30}}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground2[colors.mode]} accentColor={colors.storeHoursColor[colors.mode]} title="SectionYeet" titleColor={colors.storeHoursColor[colors.modeReverse]}>
          <Clock/>
          <Text>Hello</Text>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground1[colors.mode]} accentColor={colors.activeCreaturesColor[colors.mode]} title="Collected" titleColor={colors.activeCreaturesColor[colors.modeReverse]}>
          <Text>Hello</Text>
          <StoreHoursContainer backgroundColor="green" textColor="white" image={require("../assets/icons/able.png")} text="Able Sisters" textBottom="8 - 12 PM"/>
          <StoreHoursContainer backgroundColor="green" textColor="white" image={require("../assets/icons/able.png")} text="Able Sisters" textBottom="8 - 12 PM"/>
        </HomeContentArea>
        <View style={{height:1000}}/>
      </ScrollView>
      <View style={{position:"absolute", width: "100%", height:"100%", zIndex:-5}}>
        <LottieView 
          autoPlay
          loop
          style={{
            width: 425,
            height: 232,
            position:'absolute',
            top:30,
            zIndex:1,
            transform: [
              { scale: 1.25 },
              { rotate: '0deg'},
            ],
          }} 
          source={require('../assets/homeSnow.json')}
        />
        <View style={[styles.homeScreenBackgroundTop,{backgroundColor:colors.skyColor[colors.mode]}]}>
        </View>
        <View style={[styles.homeScreenBackgroundBottom,{backgroundColor:colors.grassColor[colors.mode]}]}>
        </View>
      </View>
    </>
  }
}
export default HomePage;

const styles = StyleSheet.create({
  dayHeader:{
    fontSize: 20,
    marginTop: 18,
    marginLeft: 20,
    marginBottom: 8,
  },
  homeScreenList: {
    alignItems: 'center',
    width: "100%"
  },
  homeScreenBackgroundTop: {
    height: 295,
    width: "100%",
    backgroundColor: "#4298f5",
  },
  homeScreenBackgroundBottom: {
    height: "70%",
    width: "100%",
    zIndex: 6,
  },
});