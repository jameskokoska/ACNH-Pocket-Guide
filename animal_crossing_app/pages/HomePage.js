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
import ActiveCreatures from "../components/ActiveCreatures"
import {getCurrentDateObject} from '../components/DateFunctions';

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

    var todayEvents = getEventsDay(getCurrentDateObject());
    var tomorrowEvents = getEventsDay(addDays(getCurrentDateObject(), 1));
    var thisWeekEvents = [];
    for(var i=2; i<7; i++){
      thisWeekEvents = thisWeekEvents.concat(getEventsDay(addDays(getCurrentDateObject(), i)));
    }
    var todayTitle=<View/>
    if(todayEvents.length>0){
      todayTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>Today</TextFont>
    }
    var tomorrowTitle=<View/>
    if(tomorrowEvents.length>0){
      tomorrowTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>Tomorrow</TextFont>
    }
    var thisWeekTitle=<View/>
    if(thisWeekEvents.length>0){
      thisWeekTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>This Week</TextFont>
    }

    var landscape = <LottieView autoPlay loop style={{width: 425, height: 232, position:'absolute', top:30, zIndex:1, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/home.json')}/>
    if(getCurrentDateObject().getMonth()===11||getCurrentDateObject().getMonth()===0){
      landscape = <LottieView autoPlay loop style={{width: 425, height: 232, position:'absolute', top:30, zIndex:1, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/homeSnow.json')}/>
    }
    return <>
      <ScrollView>
        <View style={{height:45}}/>
        <Clock/>
        <View style={{height:125}}/>
        <HomeContentArea backgroundColor={colors.lightDarkAccent[global.darkMode]} accentColor={colors.eventsColor[global.darkMode]} title="Events" titleColor={colors.eventsColor[global.darkModeReverse]}>
          {todayTitle}
          {todayEvents.map( (event, index)=>
            <EventContainer 
              key={event["Name"]} 
              backgroundColor={colors.eventBackground[global.darkMode]}
              textColor={colors.textBlack[global.darkMode]}
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
              backgroundColor={colors.eventBackground[global.darkMode]}
              textColor={colors.textBlack[global.darkMode]}
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
              backgroundColor={colors.eventBackground[global.darkMode]}
              textColor={colors.textBlack[global.darkMode]}
              image={event["Image"]}
              text={event["Name"]}
              textBottom={capitalize(event["Time"])}
              month={event["Month"]} 
              day={event["Day Start"]}
            />
          )}
          <View style={{height: 30}}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground1[global.darkMode]} accentColor={colors.storeHoursColor[global.darkMode]} title="Collection" titleColor={colors.collectionColor[global.darkModeReverse]}>
          <View style={{height: 15}}/>
          <ProgressContainer color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={fishPercentage} image={require("../assets/icons/fish.png")} text={"Fish " + fishCount + "/80"}/>
          <ProgressContainer color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={seaPercentage} image={require("../assets/icons/octopus.png")} text={"Sea Creatures " + seaCount + "/40"}/>
          <ProgressContainer color={colors.bugAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={bugsPercentage} image={require("../assets/icons/bugs.png")} text={"Bugs " + bugsCount + "/80"}/>
          <ProgressContainer color={colors.fossilAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={fossilPercentage} image={require("../assets/icons/bones.png")} text={"Fossils " + fossilCount + "/73"}/>
          <ProgressContainer color={colors.artAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={artPercentage} image={require("../assets/icons/colorPalette.png")} text={"Art " + artCount + "/43"}/>
          <ProgressContainer color={colors.musicAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={musicPercentage} image={require("../assets/icons/music.png")} text={"Songs " + musicCount + "/95"}/>
          <View style={{height: 15}}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground2[global.darkMode]} accentColor={colors.storeHoursColor[global.darkMode]} title="Store Hours" titleColor={colors.storeHoursColor[global.darkModeReverse]}>
          <View style={{height: 15}}/>
          <StoreHoursContainer image={require("../assets/icons/nook.png")} text="Nook's Cranny" textBottom="8 AM - 10 PM" openHour={8} closeHour={22}/>
          <StoreHoursContainer image={require("../assets/icons/able.png")} text="Able Sisters" textBottom="9 AM - 9 PM" openHour={9} closeHour={21}/>
          <View style={{height: 15}}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground1[global.darkMode]} accentColor={colors.activeCreaturesColor[global.darkMode]} title="Active Creatures" titleColor={colors.activeCreaturesColor[global.darkModeReverse]}>
          <ActiveCreatures/>
        </HomeContentArea>
      </ScrollView>
      <View style={{position:"absolute", width: "100%", height:"100%", zIndex:-5}}>
        {landscape}
        <View style={[styles.homeScreenBackgroundTop,{backgroundColor:colors.skyColor[global.darkMode]}]}>
        </View>
        <View style={[styles.homeScreenBackgroundBottom,{backgroundColor:colors.grassColor[global.darkMode]}]}>
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