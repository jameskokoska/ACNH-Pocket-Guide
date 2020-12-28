import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Clock from '../components/Clock';
import HomeContentArea from '../components/HomeContentArea';
import {EventContainer,getEventsDay} from '../components/EventContainer';
import StoreHoursContainer from '../components/StoreHoursContainer';
import ProgressContainer from '../components/ProgressContainer';
import LottieView from 'lottie-react-native';
import colors from '../Colors'
import {capitalize,countCollection} from "../LoadJsonData"
import TextFont from "../components/TextFont"

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

class HomePage extends Component {
  render(){
    var fishCount = countCollection("fishCheckList");
    var fishPercentage = fishCount/80 * 100;
    var seaCount = countCollection("seaCheckList");
    var seaPercentage = seaCount/40 * 100;
    var bugsCount = countCollection("bugCheckList");
    var bugsPercentage = bugsCount/80 * 100;
    var fossilCount = countCollection("fossilCheckList");
    var fossilPercentage = fossilCount/73 * 100;
    var artCount = countCollection("artCheckList");
    var artPercentage = artCount/43 * 100;
    var musicCount = countCollection("songCheckList");
    var musicPercentage = musicCount/95 * 100;

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

    var landscape = <LottieView autoPlay loop style={{width: 425, height: 232, position:'absolute', top:30, zIndex:1, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/home.json')}/>
    if(new Date().getMonth()===11||new Date().getMonth()===0){
      landscape = <LottieView autoPlay loop style={{width: 425, height: 232, position:'absolute', top:30, zIndex:1, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/homeSnow.json')}/>
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
              backgroundColor={colors.eventBackground[colors.mode]}
              textColor={colors.textBlack[colors.mode]}
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
              backgroundColor={colors.eventBackground[colors.mode]}
              textColor={colors.textBlack[colors.mode]}
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
              backgroundColor={colors.eventBackground[colors.mode]}
              textColor={colors.textBlack[colors.mode]}
              image={event["Image"]}
              text={event["Name"]}
              textBottom={capitalize(event["Time"])}
              month={event["Month"]} 
              day={event["Day Start"]}
            />
          )}
          <View style={{height: 30}}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground1[colors.mode]} accentColor={colors.storeHoursColor[colors.mode]} title="Collection" titleColor={colors.collectionColor[colors.modeReverse]}>
          <View style={{height: 15}}/>
          <ProgressContainer color={colors.fishAppBar[0]} backgroundColor={colors.white[colors.mode]} textColor={colors.textBlack[colors.mode]} percentage={fishPercentage} image={require("../assets/icons/fish.png")} text={"Fish " + fishCount + "/80"}/>
          <ProgressContainer color={colors.fishAppBar[0]} backgroundColor={colors.white[colors.mode]} textColor={colors.textBlack[colors.mode]} percentage={seaPercentage} image={require("../assets/icons/octopus.png")} text={"Sea Creatures " + seaCount + "/40"}/>
          <ProgressContainer color={colors.bugAppBar[0]} backgroundColor={colors.white[colors.mode]} textColor={colors.textBlack[colors.mode]} percentage={bugsPercentage} image={require("../assets/icons/bugs.png")} text={"Bugs " + bugsCount + "/80"}/>
          <ProgressContainer color={colors.fossilAppBar[0]} backgroundColor={colors.white[colors.mode]} textColor={colors.textBlack[colors.mode]} percentage={fossilPercentage} image={require("../assets/icons/bones.png")} text={"Fossils " + fossilCount + "/73"}/>
          <ProgressContainer color={colors.artAppBar[0]} backgroundColor={colors.white[colors.mode]} textColor={colors.textBlack[colors.mode]} percentage={artPercentage} image={require("../assets/icons/colorPalette.png")} text={"Art " + artCount + "/43"}/>
          <ProgressContainer color={colors.musicAppBar[0]} backgroundColor={colors.white[colors.mode]} textColor={colors.textBlack[colors.mode]} percentage={musicPercentage} image={require("../assets/icons/music.png")} text={"Songs " + musicCount + "/95"}/>
          <View style={{height: 15}}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground2[colors.mode]} accentColor={colors.storeHoursColor[colors.mode]} title="Store Hours" titleColor={colors.storeHoursColor[colors.modeReverse]}>
          <View style={{height: 15}}/>
          <StoreHoursContainer image={require("../assets/icons/nook.png")} text="Nook's Cranny" textBottom="8 AM - 10 PM" openHour={8} closeHour={22}/>
          <StoreHoursContainer image={require("../assets/icons/able.png")} text="Able Sisters" textBottom="9 AM - 9 PM" openHour={9} closeHour={21}/>
          <View style={{height: 15}}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground1[colors.mode]} accentColor={colors.activeCreaturesColor[colors.mode]} title="Active Creatures" titleColor={colors.activeCreaturesColor[colors.modeReverse]}>
          <View style={{height: 30}}/>
          <View style={{height: 30}}/>
        </HomeContentArea>
      </ScrollView>
      <View style={{position:"absolute", width: "100%", height:"100%", zIndex:-5}}>
        {landscape}
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
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 4,
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