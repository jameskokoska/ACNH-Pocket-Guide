import React, { Component } from "react";
import {AppRegistry, StyleSheet, ScrollView , StatusBar, Text, View, Dimensions, Image, ImageBackground} from "react-native";
import colors from '../Colors.js';
import {parseActiveTime, isActive, isActive2, getCurrentDateObject, getMonthShort} from "./DateFunctions"
import {attemptToTranslate, getSettingsString} from "../LoadJsonData";
import { InfoLine } from "./BottomSheetComponents.js";

function getImage(name){
  switch(name){
    // current month images
    //jan
    case "../assets/icons/activeTime/cJan.png":
      return require("../assets/icons/activeTime/cJan.png");
    case "../assets/icons/activeTime/nJan.png":
      return require("../assets/icons/activeTime/nJan.png");
    //feb
    case "../assets/icons/activeTime/cFeb.png":
      return require("../assets/icons/activeTime/cFeb.png");
    case "../assets/icons/activeTime/nFeb.png":
      return require("../assets/icons/activeTime/nFeb.png");
    //mar
    case "../assets/icons/activeTime/cMar.png":
      return require("../assets/icons/activeTime/cMar.png");
    case "../assets/icons/activeTime/nMar.png":
      return require("../assets/icons/activeTime/nMar.png");
    //apr
    case "../assets/icons/activeTime/cApr.png":
      return require("../assets/icons/activeTime/cApr.png");
    case "../assets/icons/activeTime/nApr.png":
      return require("../assets/icons/activeTime/nApr.png");
    //may
    case "../assets/icons/activeTime/cMay.png":
      return require("../assets/icons/activeTime/cMay.png");
    case "../assets/icons/activeTime/nMay.png":
      return require("../assets/icons/activeTime/nMay.png");
    //jun
    case "../assets/icons/activeTime/cJun.png":
      return require("../assets/icons/activeTime/cJun.png");
    case "../assets/icons/activeTime/nJun.png":
      return require("../assets/icons/activeTime/nJun.png");
    //jul
    case "../assets/icons/activeTime/cJul.png":
      return require("../assets/icons/activeTime/cJul.png");
    case "../assets/icons/activeTime/nJul.png":
      return require("../assets/icons/activeTime/nJul.png");
    //aug
    case "../assets/icons/activeTime/cAug.png":
      return require("../assets/icons/activeTime/cAug.png");
    case "../assets/icons/activeTime/nAug.png":
      return require("../assets/icons/activeTime/nAug.png");
    //sep
    case "../assets/icons/activeTime/cSep.png":
      return require("../assets/icons/activeTime/cSep.png");
    case "../assets/icons/activeTime/nSep.png":
      return require("../assets/icons/activeTime/nSep.png");
    //oct
    case "../assets/icons/activeTime/cOct.png":
      return require("../assets/icons/activeTime/cOct.png");
    case "../assets/icons/activeTime/nOct.png":
      return require("../assets/icons/activeTime/nOct.png");
    //nov
    case "../assets/icons/activeTime/cNov.png":
      return require("../assets/icons/activeTime/cNov.png");
    case "../assets/icons/activeTime/nNov.png":
      return require("../assets/icons/activeTime/nNov.png");
    //dec
    case "../assets/icons/activeTime/cDec.png":
      return require("../assets/icons/activeTime/cDec.png");
    case "../assets/icons/activeTime/nDec.png":
      return require("../assets/icons/activeTime/nDec.png");
    // active month images
    //jan
    case "../assets/icons/activeTime/aJan.png":
      return require("../assets/icons/activeTime/aJan.png");
    case "../assets/icons/activeTime/iJan.png":
      return require("../assets/icons/activeTime/iJan.png");
    //feb
    case "../assets/icons/activeTime/aFeb.png":
      return require("../assets/icons/activeTime/aFeb.png");
    case "../assets/icons/activeTime/iFeb.png":
      return require("../assets/icons/activeTime/iFeb.png");
    //mar
    case "../assets/icons/activeTime/aMar.png":
      return require("../assets/icons/activeTime/aMar.png");
    case "../assets/icons/activeTime/iMar.png":
      return require("../assets/icons/activeTime/iMar.png");
    //apr
    case "../assets/icons/activeTime/aApr.png":
      return require("../assets/icons/activeTime/aApr.png");
    case "../assets/icons/activeTime/iApr.png":
      return require("../assets/icons/activeTime/iApr.png");
    //may
    case "../assets/icons/activeTime/aMay.png":
      return require("../assets/icons/activeTime/aMay.png");
    case "../assets/icons/activeTime/iMay.png":
      return require("../assets/icons/activeTime/iMay.png");
    //jun
    case "../assets/icons/activeTime/aJun.png":
      return require("../assets/icons/activeTime/aJun.png");
    case "../assets/icons/activeTime/iJun.png":
      return require("../assets/icons/activeTime/iJun.png");
    //jul
    case "../assets/icons/activeTime/aJul.png":
      return require("../assets/icons/activeTime/aJul.png");
    case "../assets/icons/activeTime/iJul.png":
      return require("../assets/icons/activeTime/iJul.png");
    //aug
    case "../assets/icons/activeTime/aAug.png":
      return require("../assets/icons/activeTime/aAug.png");
    case "../assets/icons/activeTime/iAug.png":
      return require("../assets/icons/activeTime/iAug.png");
    //sep
    case "../assets/icons/activeTime/aSep.png":
      return require("../assets/icons/activeTime/aSep.png");
    case "../assets/icons/activeTime/iSep.png":
      return require("../assets/icons/activeTime/iSep.png");
    //oct
    case "../assets/icons/activeTime/aOct.png":
      return require("../assets/icons/activeTime/aOct.png");
    case "../assets/icons/activeTime/iOct.png":
      return require("../assets/icons/activeTime/iOct.png");
    //nov
    case "../assets/icons/activeTime/aNov.png":
      return require("../assets/icons/activeTime/aNov.png");
    case "../assets/icons/activeTime/iNov.png":
      return require("../assets/icons/activeTime/iNov.png");
    //dec
    case "../assets/icons/activeTime/aDec.png":
      return require("../assets/icons/activeTime/aDec.png");
    case "../assets/icons/activeTime/iDec.png":
      return require("../assets/icons/activeTime/iDec.png");
    // current time image
    case "../assets/icons/activeTime/hour0.png":
      return require("../assets/icons/activeTime/hour0.png");
    case "../assets/icons/activeTime/hour1.png":
      return require("../assets/icons/activeTime/hour1.png");
    case "../assets/icons/activeTime/hour2.png":
      return require("../assets/icons/activeTime/hour2.png");
    case "../assets/icons/activeTime/hour3.png":
      return require("../assets/icons/activeTime/hour3.png");
    case "../assets/icons/activeTime/hour4.png":
      return require("../assets/icons/activeTime/hour4.png");
    case "../assets/icons/activeTime/hour5.png":
      return require("../assets/icons/activeTime/hour5.png");
    case "../assets/icons/activeTime/hour6.png":
      return require("../assets/icons/activeTime/hour6.png");
    case "../assets/icons/activeTime/hour7.png":
      return require("../assets/icons/activeTime/hour7.png");
    case "../assets/icons/activeTime/hour8.png":
      return require("../assets/icons/activeTime/hour8.png");
    case "../assets/icons/activeTime/hour9.png":
      return require("../assets/icons/activeTime/hour9.png");
    case "../assets/icons/activeTime/hour10.png":
      return require("../assets/icons/activeTime/hour10.png");
    case "../assets/icons/activeTime/hour11.png":
      return require("../assets/icons/activeTime/hour11.png");
    case "../assets/icons/activeTime/hour12.png":
      return require("../assets/icons/activeTime/hour12.png");
    case "../assets/icons/activeTime/hour13.png":
      return require("../assets/icons/activeTime/hour13.png");
    case "../assets/icons/activeTime/hour14.png":
      return require("../assets/icons/activeTime/hour14.png");
    case "../assets/icons/activeTime/hour15.png":
      return require("../assets/icons/activeTime/hour15.png");
    case "../assets/icons/activeTime/hour16.png":
      return require("../assets/icons/activeTime/hour16.png");
    case "../assets/icons/activeTime/hour17.png":
      return require("../assets/icons/activeTime/hour17.png");
    case "../assets/icons/activeTime/hour18.png":
      return require("../assets/icons/activeTime/hour18.png");
    case "../assets/icons/activeTime/hour19.png":
      return require("../assets/icons/activeTime/hour19.png");
    case "../assets/icons/activeTime/hour20.png":
      return require("../assets/icons/activeTime/hour20.png");
    case "../assets/icons/activeTime/hour21.png":
      return require("../assets/icons/activeTime/hour21.png");
    case "../assets/icons/activeTime/hour22.png":
      return require("../assets/icons/activeTime/hour22.png");
    case "../assets/icons/activeTime/hour23.png":
      return require("../assets/icons/activeTime/hour23.png");
    // active time images
    case "../assets/icons/activeTime/available0.png":
      return require("../assets/icons/activeTime/available0.png");
    case "../assets/icons/activeTime/available1.png":
      return require("../assets/icons/activeTime/available1.png");
    case "../assets/icons/activeTime/available2.png":
      return require("../assets/icons/activeTime/available2.png");
    case "../assets/icons/activeTime/available3.png":
      return require("../assets/icons/activeTime/available3.png");
    case "../assets/icons/activeTime/available4.png":
      return require("../assets/icons/activeTime/available4.png");
    case "../assets/icons/activeTime/available5.png":
      return require("../assets/icons/activeTime/available5.png");
    case "../assets/icons/activeTime/available6.png":
      return require("../assets/icons/activeTime/available6.png");
    case "../assets/icons/activeTime/available7.png":
      return require("../assets/icons/activeTime/available7.png");
    case "../assets/icons/activeTime/available8.png":
      return require("../assets/icons/activeTime/available8.png");
    case "../assets/icons/activeTime/available9.png":
      return require("../assets/icons/activeTime/available9.png");
    case "../assets/icons/activeTime/available10.png":
      return require("../assets/icons/activeTime/available10.png");
    case "../assets/icons/activeTime/available11.png":
      return require("../assets/icons/activeTime/available11.png");
    case "../assets/icons/activeTime/available12.png":
      return require("../assets/icons/activeTime/available12.png");
    case "../assets/icons/activeTime/available13.png":
      return require("../assets/icons/activeTime/available13.png");
    case "../assets/icons/activeTime/available14.png":
      return require("../assets/icons/activeTime/available14.png");
    case "../assets/icons/activeTime/available15.png":
      return require("../assets/icons/activeTime/available15.png");
    case "../assets/icons/activeTime/available16.png":
      return require("../assets/icons/activeTime/available16.png");
    case "../assets/icons/activeTime/available17.png":
      return require("../assets/icons/activeTime/available17.png");
    case "../assets/icons/activeTime/available18.png":
      return require("../assets/icons/activeTime/available18.png");
    case "../assets/icons/activeTime/available19.png":
      return require("../assets/icons/activeTime/available19.png");
    case "../assets/icons/activeTime/available20.png":
      return require("../assets/icons/activeTime/available20.png");
    case "../assets/icons/activeTime/available21.png":
      return require("../assets/icons/activeTime/available21.png");
    case "../assets/icons/activeTime/available22.png":
      return require("../assets/icons/activeTime/available22.png");
    case "../assets/icons/activeTime/available23.png":
      return require("../assets/icons/activeTime/available23.png");
  }
}

class ActiveTime extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }

  render(){
    const imagePrefix = "../assets/icons/activeTime/";
    const imageSuffix = ".png";
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // c/n + months
    var currentMonthImages = [];
    // a/i + months
    var activeMonthImages = [];
    // hour + hours
    var currentTimeImage;
    // available + hours
    var activeTimeImages = [];

    // gets current time stuff
    var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH ";
    var settingsUse24HourClock = getSettingsString("settingsUse24HourClock")==="true";
    var currentMonthShort = getMonthShort(getCurrentDateObject().getMonth());
    var currentHour = getCurrentDateObject().getHours();
    var currentTimeRange = this.props.item[hemispherePre+currentMonthShort];
    if(currentTimeRange==="NA"){
      currentTimeRange = this.props.item[hemispherePre+"time"];
    }
    var timeRangeList = [];

    // build current month indicator image list
    for(var i=0; i<months.length; i++){
      if(currentMonthShort===months[i]){
        currentMonthImages.push(imagePrefix + "c" + months[i] + imageSuffix);
      }else{
        currentMonthImages.push(imagePrefix + "n" + months[i] + imageSuffix);
      }
    }

    let activeList = [];

    // build active month indicator image list
    for(var i=0; i<months.length; i++){
      var timeRange = this.props.item[hemispherePre+months[i]];
      if(timeRange!=="NA"){
        activeMonthImages.push(imagePrefix + "a" + months[i] + imageSuffix);
        activeList.push(months[i])
      }else{
        activeMonthImages.push(imagePrefix + "i" + months[i] + imageSuffix);
        activeList.push(false)
      }
    }

    let timePeriods = [[]]
    for (let i=0; i < activeList.length; i++) {
      const item = activeList[i]
      if (item !== false && timePeriods[timePeriods.length-1].length <= 0) {
        timePeriods[timePeriods.length-1].push(item)
      } else if (item === false && timePeriods[timePeriods.length-1].length > 0){
        timePeriods[timePeriods.length-1].push(activeList[i-1])
        timePeriods.push([]);
      } 
    }
    if (timePeriods[timePeriods.length-1].length <=0) {
      timePeriods = timePeriods.splice(0, timePeriods.length-1);
    }
    // full year check
    if (timePeriods.length == 1 && timePeriods[0].length == 1 && timePeriods[0][0] == "Jan") {
      timePeriods[0].push("Dec");
    } else {
      // check dec - jan interval
      if (timePeriods[0][0] === "Jan" && timePeriods[timePeriods.length-1].length == 1) {
        timePeriods[timePeriods.length-1].push(timePeriods[0][1]);
        timePeriods = timePeriods.splice(1);
      }
    }

    let activeTimeString = ""
    let currentIndex = 0
    let ending = "; "
    for(const timePeriod of timePeriods){
      currentIndex=currentIndex+1
      if(currentIndex === timePeriods.length){
        ending = ""
      }
      if(timePeriod[1]===undefined){
        activeTimeString = activeTimeString + attemptToTranslate(timePeriod[0]) + " - " + attemptToTranslate("Dec") + ending
      } else if(timePeriod[1]==="Dec" && timePeriod[0]==="Jan"){
        activeTimeString = activeTimeString + attemptToTranslate("All Year") + ending
      } else if(timePeriod[0]!==timePeriod[1]){
        activeTimeString = activeTimeString + attemptToTranslate(timePeriod[0]) + " - " + attemptToTranslate(timePeriod[1]) + ending
      } else {
        activeTimeString = activeTimeString + attemptToTranslate(timePeriod[0]) + ending
      }
    }

    let textProperty2Text = this.props.item[hemispherePre+currentMonthShort];
    let redTextProperty2 = false
    if(textProperty2Text==="NA"){
      textProperty2Text = this.props.item[hemispherePre+"time"];
      redTextProperty2 = true;
    }
    if(settingsUse24HourClock && textProperty2Text!=="NA" && textProperty2Text!=="All day"){
      var splitText = textProperty2Text.split("; ")
      textProperty2Text = "";
      for(var z = 0; z<splitText.length; z++){
        var splitString = splitText[z].replace(/[^\x00-\x7F]/g, "");
        splitString = splitString.replace("  ", " ");
        splitString = splitString.split(" ");
        textProperty2Text = textProperty2Text + (z>0?"; ":"") + parseActiveTime(splitString, 0).toString()+":00" + " - " + parseActiveTime(splitString, 2).toString()+ ":00"
      }
    }

    // get current time image
    currentTimeImage = imagePrefix + "hour" + currentHour + imageSuffix;

    // build active time indicator image list
    timeRangeList = currentTimeRange.split("; ");
    // console.log(timeRangeList);
    // console.log(timeRangeList.length);
    for(var r=0; r<timeRangeList.length; r++){
      // console.log("TimeRangeList"+timeRangeList[r]);
      if(timeRangeList[r]!=="NA"){
        for(var i=0; i<24; i++){
          if(isActive2(timeRangeList[r], i)){
            activeTimeImages.push(imagePrefix + "available" + i + imageSuffix);
          }
        }
      } 
    }

    let isActiveCurrentHour = false
    if(isActive2(this.props.item[hemispherePre+currentMonthShort],getCurrentDateObject().getHours())){
      isActiveCurrentHour = true
    }

    // console.log(currentMonthImages);
    // console.log(activeMonthImages);
    // console.log(currentTimeImage);
    // console.log(activeTimeImages);
    // console.log(this.props.item["Name"]);

    return(
      <>
        <InfoLine
          image={require("../assets/icons/calendar.png")} 
          customText={activeTimeString}
          customColor={redTextProperty2?colors.redText[global.darkMode]:colors.textBlack[global.darkMode]}
        />
        <InfoLine
          image={require("../assets/icons/alarmClock.png")}
          customText={textProperty2Text}
          customColor={!isActiveCurrentHour?colors.redText[global.darkMode]:colors.textBlack[global.darkMode]}
        />
        <View style={{height:7}}/>
        <View style={{width: Dimensions.get('window').width, marginTop: 0, flexDirection: "row", justifyContent:"space-evenly"}}>
          <View style={{width: 160, height: 160, margin: 7,}}>
            {/* BG Month */}
            <Image source={require("../assets/icons/activeTime/month.png")} style={{position: "absolute", width: 160, height: 160}}/>
            {/* Current Month */}
            {currentMonthImages.map((object, index) => {
              return <Image source={getImage(object)} key={index} style={{position: "absolute", width: 160, height: 160}}></Image>
            })}
            {/* Monthly Activity */}
            {activeMonthImages.map((object, index) => {
              return <Image source={getImage(object)} key={index} style={{position: "absolute", width: 160, height: 160}}></Image>
            })}
          </View>

          <View style={{width: 160, height: 160, margin: 7,}}>
            {/* Daily Activity */}
            {activeTimeImages.map((object, index) => {
              return <Image source={getImage(object)} key={index} style={{position: "absolute", width: 160, height: 160}}></Image>
            })}
            {/* Current Time */}
            <Image source={getImage(currentTimeImage)} style={{position: "absolute", width: 160, height: 160}}></Image>
            {/* BG Clock */}
            <Image source={require("../assets/icons/activeTime/clock.png")} style={{position: "absolute", width: 160, height: 160}}/>
          </View>
        </View>
      </>
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