import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Text} from 'react-native';

function getMonth(currentMonth){
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[currentMonth];
}

function getMonthShort(currentMonth){
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
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

function parseActiveTime(activeTimea){
  // Format example: "4 AM"
  const splitString = activeTimea.split(" ");
  var hour = parseInt(splitString[0]);
  const ampm = splitString[1];
  if(ampm==="PM"&&hour!=="12"){
    hour = hour + 12
  }
  return hour
}

function isActive(activeTime){
  // active time format: "4 AM – 9 PM"
  // check if it is available
  if(activeTime!=="NA"||activeTime!=="All Day"){
    const splitString = activeTime.split(" – ");
    var currentHour = new Date().getHours();
    console.log(splitString);
    const activeStart = parseActiveTime(splitString[0]);
    const activeEnd = parseActiveTime(splitString[1]);
    currentHour = parseInt(currentHour);
    // check if current time is between available hours
    if(activeStart < currentHour < activeEnd){
      return true
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export {getMonthShort, getMonth, getWeekDay, getWeekDayShort, isActive, parseActiveTime};