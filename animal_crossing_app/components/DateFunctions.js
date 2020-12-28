import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Text} from 'react-native';

function getMonth(currentMonth){
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
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

function parseActiveTime(activeTime){
  // Format example: "4 AM"
  const splitString = activeTime.split(" ");
  const hour = parseInt(splitString[0]);
  const ampm = parseInt(splitString[1]);
  if(ampm==="PM"&&hour!=="12"){
    hour = hour + 12
  }
  return hour
}

function isActive(activeTime){
  // active time format: "4 AM – 9 PM"
  const splitString = activeTime.split(" - ")
  const currentHour = new Date().getHours();
  const activeStart = parseInt(splitString[0]);
  const activeEnd = parseInt(splitString[1]);
  currentHour = parseInt(currentHour);
  // check if it is available
  if(activeTime!=="NA"||"All Day"){
    // check if current time is between available hours
    if(activeStart < currentHour < splitString){
      return true
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export {getMonth, getWeekDay, getWeekDayShort, isActive, parseActiveTime};