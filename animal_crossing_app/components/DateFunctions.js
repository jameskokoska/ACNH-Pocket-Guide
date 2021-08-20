import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Text} from 'react-native';
import {getSettingsString, attemptToTranslate} from "../LoadJsonData"

export function doWeSwapDate(){
  if(global.language.includes("French")){
    return true;
  } else {
    return false;
  }
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

//in the form 2021-04-11
export function getDateStringMonthDay(date){
  var day = parseInt(date.slice(8,10))
  var month =attemptToTranslate(getMonth(parseInt(date.slice(5,7))-1))
  return attemptToTranslate("Week of") + " " + (doWeSwapDate()===false ? month + " " + day.toString() : day.toString() + " " + month);
}

function getCurrentDateObject(){
  if(getSettingsString("settingsUseCustomDate")==="true" && global.customTimeOffset!==undefined){
    var newDate = new Date(new Date().getTime() + parseInt(global.customTimeOffset));
    return newDate;
  } else {
    return new Date();
  }
}


function getMonth(currentMonth){
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  return months[currentMonth];
}

export function getMonday(weeksAgo = 1){
  var date = new Date(getCurrentDateObject());
  var day = date.getDay();
  var prevMonday = new Date(getCurrentDateObject());
  if(date.getDay() == 0){
    prevMonday.setDate(date.getDate() - 7*weeksAgo);
  }else{
    prevMonday.setDate(date.getDate() - (day+7*(weeksAgo-1)));
  }
  return prevMonday;
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
  return weekDays[currentWeekDay];
}

function getWeekDayShort(currentWeekDay){
  var weekDays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
  return weekDays[currentWeekDay];
}

export function toShortWeekDay(weekDayLong){
  var weekDaysDictionary = {'Sunday':'Sun','Monday':'Mon','Tuesday':'Tues','Wednesday':'Wed','Thursday':'Thurs','Friday':'Fri','Saturday':'Sat'};
  return weekDaysDictionary[weekDayLong];
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

function isActive2(activeTimeInput, currentHour){
  // active time format: "4 AM – 9 PM"
  // check if it is available
  //console.log(activeTime)
  var activeTimeList = activeTimeInput.split("; ")
  var activeTimeOutput = false;
  for(var i = 0; i < activeTimeList.length; i++){
    var activeTime = activeTimeList[i]
    if(activeTime!=="NA"){
      if(activeTime==="All day"){
        activeTimeOutput = true;
        break;
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
      // console.log(currentHour)
      // console.log(activeEnd)
      if(currentHour===activeEnd){
        activeTimeOutput = false;
        break;
      }
      if(activeStart < activeEnd){
        //5 - 20  currentHour:5
        // 21 - 5 currentHour: 22
        if(activeStart <= currentHour && currentHour < activeEnd){
          // console.log("trigger1")
          activeTimeOutput = true;
          break;
        }else{
          activeTimeOutput = false;
        }
      }
      else if(activeStart > activeEnd){
        if(activeStart <= currentHour || currentHour < activeEnd){
          // console.log("trigger2")
          activeTimeOutput = true;
          break;
        }else{
          activeTimeOutput = false;
        }
      }
    }else{
      activeTimeOutput = false;
    }
  }
  return activeTimeOutput
}

export {getMonthFromString, getCurrentDateObject, getMonthShort, getMonth, getWeekDay, getWeekDayShort, isActive, isActive2, parseActiveTime};

//range >> February 25 – May 21
  //date >> Date object
export function isDateInRange(range,rangeYear, date, specialCheck=""){ //startOnly, endOnly
  if(range===undefined || range.includes(";")){
    return false;
  }
  var rangeSplit = range.replace(/[^\x00-\x7F]/g, "");
  rangeSplit = rangeSplit.replace("  ", " ");
  rangeSplit = rangeSplit.split(" ");
  if(specialCheck!==""){
    if(specialCheck==="startOnly"){
      if(date.getMonth()===parseInt(getMonthFromString(rangeSplit[0], true)) && date.getDate() === parseInt(rangeSplit[1])){
        return true;
      } else {
        return false;
      }
    }else if(rangeSplit.length===4 && specialCheck==="endOnly"){
      if(date.getMonth()===parseInt(getMonthFromString(rangeSplit[2], true)) && date.getDate() === parseInt(rangeSplit[3])){
        return true;
      } else {
        return false;
      }
    } else {
      return;
    }
  }
  if(rangeSplit.length===4){
    var dateStart = new Date('January 10, 2000 12:00:00');
    dateStart.setMonth(getMonthFromString(rangeSplit[0]));
    dateStart.setDate(rangeSplit[1]);
    dateStart.setYear(rangeYear);
    var dateEnd= new Date('January 10, 2000 12:00:00');
    dateEnd.setMonth(getMonthFromString(rangeSplit[2]));
    dateEnd.setDate(parseInt(rangeSplit[3])+1); //ensures the end date is larger so current date is within range
    dateEnd.setYear(rangeYear);
    if(parseInt(getMonthFromString(rangeSplit[2]))<parseInt(getMonthFromString(rangeSplit[0]))){
      dateEnd.setYear(parseInt(rangeYear)+1);
    }
    if(date>dateStart && date<dateEnd){
      return true;
    } else {
      return false;
    }
  } else if(rangeSplit.length===2){
    if(date.getMonth()===parseInt(getMonthFromString(rangeSplit[0], true)) && date.getDate() === parseInt(rangeSplit[1])){
      return true;
    } else {
      return false;
    }
  } else{
    return false;
  }
}

export const specialEvents = [
  {
        "Name" : "Fireworks Show",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Sunday",
        "Special Occurrence": "1",
        "Hemisphere": "NA",
        "Time" : "7 PM - 12 AM",
        "Time24" : "19:00 - 00:00",
        "Image" : "fireworks.png"
    },
    {
        "Name" : "Fireworks Show",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Sunday",
        "Special Occurrence": "2",
        "Hemisphere": "NA",
        "Time" : "7 PM - 12 AM",
        "Time24" : "19:00 - 00:00",
        "Image" : "fireworks.png"
    },
    {
        "Name" : "Fireworks Show",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Sunday",
        "Special Occurrence": "3",
        "Hemisphere": "NA",
        "Time" : "7 PM - 12 AM",
        "Time24" : "19:00 - 00:00",
        "Image" : "fireworks.png"
    },
    {
        "Name" : "Fireworks Show",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Sunday",
        "Special Occurrence": "4",
        "Hemisphere": "NA",
        "Time" : "7 PM - 12 AM",
        "Time24" : "19:00 - 00:00",
        "Image" : "fireworks.png"
    },
    {
        "Name" : "Fireworks Show",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Sunday",
        "Special Occurrence": "5",
        "Hemisphere": "NA",
        "Time" : "7 PM - 12 AM",
        "Time24" : "19:00 - 00:00",
        "Image" : "fireworks.png"
    },
   {
        "Name" : "Bug-Off",
        "Month": "Jan",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "3",
        "Hemisphere": "Southern",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "bugs.png"
    },
    {
        "Name" : "Bug-Off",
        "Month": "Feb",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "3",
        "Hemisphere": "Southern",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "bugs.png"
    },
    {
        "Name" : "Bug-Off",
        "Month": "Nov",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "3",
        "Hemisphere": "Southern",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "bugs.png"
    },
    {
        "Name" : "Bug-Off",
        "Month": "Dec",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "3",
        "Hemisphere": "Southern",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "bugs.png"
    },
    {
        "Name" : "Bug-Off",
        "Month": "June",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "4",
        "Hemisphere": "Northern",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "bugs.png"
    },
    {
        "Name" : "Bug-Off",
        "Month": "July",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "4",
        "Hemisphere": "Northern",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "bugs.png"
    },
    {
        "Name" : "Bug-Off",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "4",
        "Hemisphere": "Northern",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "bugs.png"
    },
    {
        "Name" : "Bug-Off",
        "Month": "Sept",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "4",
        "Hemisphere": "Northern",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "bugs.png"
    },
    {
        "Name" : "Fishing Tourney",
        "Month": "Jan",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "2",
        "Hemisphere": "NA",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "fish.png"
    },
    {
        "Name" : "Fishing Tourney",
        "Month": "Apr",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "2",
        "Hemisphere": "NA",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "fish.png"
    },
    {
        "Name" : "Fishing Tourney",
        "Month": "July",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "2",
        "Hemisphere": "NA",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "fish.png"
    },
    {
        "Name" : "Fishing Tourney",
        "Month": "Oct",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "2",
        "Hemisphere": "NA",
        "Time" : "9 AM - 6 PM",
        "Time24" : "9:00 - 18:00",
        "Image" : "fish.png"
    },
]

