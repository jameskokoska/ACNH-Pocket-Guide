import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Text} from 'react-native';
import {getSettingsString} from "../LoadJsonData"

function getCurrentDateObject(){
  if(getSettingsString("settingsUseCustomDate")==="true"){
    return global.customTime;
  } else {
    return new Date();
  }
}


function getMonth(currentMonth){
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[currentMonth];
}

function getMonthFromString(currentMonthString, integer=false){
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  for(var i=0; i<months.length; i++){
    if(months[i].toLowerCase()===currentMonthString.toLowerCase()){
      if(integer){
        return i
      }
      if(i<10){
        return "0"+i;
      } else {
        return i+"";
      }
    }
  }
}

function getMonthShort(currentMonth){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan',];
  return months[currentMonth];
}

function getWeekDay(currentWeekDay){
  var weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return days[currentWeekDay];
}

function getWeekDayShort(currentWeekDay){
  var weekDays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
  return weekDays[currentWeekDay];
}

function parseActiveTime(splitString, offset){
  // Format example: "4 AM"
  var hour = parseInt(splitString[offset]);
  const meridian = splitString[offset+1];
  if(meridian==="PM"&&hour!=="12"){
    hour = hour + 12
  }
  return hour
}

function isActive(activeTime){
  // active time format: "4 AM – 9 PM"
  // check if it is available
  if(activeTime!=="NA"){
    if(activeTime==="All day"){
      return true;
    }
    var splitString = activeTime.replace(/[^\x00-\x7F]/g, "");
    splitString = splitString.replace("  ", " ");
    splitString = splitString.split(" ");
    var currentHour = new Date().getHours();
    const activeStart = parseActiveTime(splitString, 0);
    const activeEnd = parseActiveTime(splitString, 2);
    currentHour = parseInt(currentHour);
    // check if current time is between available hours
    if(activeStart < currentHour < activeEnd){
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isActive2(activeTime, currentHour){
  // active time format: "4 AM – 9 PM"
  // check if it is available
  //console.log(activeTime)
  if(activeTime!=="NA"){
    if(activeTime==="All day"){
      return true;
    }
    var splitString = activeTime.replace(/[^\x00-\x7F]/g, "");
    splitString = splitString.replace("  ", " ");
    splitString = splitString.split(" ");
    const activeStart = parseActiveTime(splitString, 0);
    const activeEnd = parseActiveTime(splitString, 2);
    currentHour = parseInt(currentHour);
    // check if current time is between available hours
    // console.log(splitString);
    // console.log(activeStart);
    // console.log(currentHour);
    // console.log(activeEnd);
    if(activeStart < activeEnd){
      if(activeStart <= currentHour && currentHour <= activeEnd){
        // console.log("trigger1")
        return true;
      }else{
        return false;
      }
    }
    else if(activeStart > activeEnd){
      if(activeStart <= currentHour || currentHour <= activeEnd){
        // console.log("trigger2")
        return true;
      }else{
        return false;
      }
    }
  }else{
    return false;
  }
}

export {getMonthFromString, getCurrentDateObject, getMonthShort, getMonth, getWeekDay, getWeekDayShort, isActive, isActive2, parseActiveTime};