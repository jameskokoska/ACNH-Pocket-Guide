import React, {Component, useState, useRef, useEffect} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'
import {getPhoto} from './GetPhoto'
import {getWeekDayShort, getMonthShort, getCurrentDateObject, addDays} from './DateFunctions';
import {getEventName, attemptToTranslate, capitalize, getSettingsString, translateBirthday, attemptToTranslateItem, allEventItemsCheck} from "../LoadJsonData"
import FastImage from './FastImage';
import {schedulePushNotification} from "../Notifications"
import {specialEvents, isDateInRange} from "./DateFunctions"
import colors from '../Colors'
import * as RootNavigation from '../RootNavigation.js';
import { useFocusEffect } from '@react-navigation/native';
import Check from './Check';

// <EventContainer 
//  backgroundColor="black" 
//  textColor="white" 
//  image={require("../assets/icons/music.png")} 
//  text="K.K. Slider" 
//  textBottom="6 - 8 PM" 
//  month="Nov" 
//  day="31"
// />

//If an event does not have any items associated with it, use a different event
//If another event with items does not exist, just leave it... it will not be tappable
function replaceEventNameForFilter(filter){
  if(filter){
    let eventChange = {"Valentine's Day" : "Valentine's Day (Nook Shopping)"}
    if(eventChange[filter]!==undefined){
      return eventChange[filter]
    } else {
      return filter
    }
  }
}

export function EventContainer(props){
  const [allCollected, setAllCollected] = useState(false);
  let onlyUpdateMe = false
  let eventFilter = replaceEventNameForFilter(props.event.filter)

  useFocusEffect(
    React.useCallback(() => {
      if(onlyUpdateMe){
        setTimeout(()=>{
          let result = allEventItemsCheck(eventFilter)
          setAllCollected(result)
        }, 10);
        onlyUpdateMe = false
      }
    },)
  );

  useEffect(() => {
    setTimeout(()=>{
      let result = allEventItemsCheck(eventFilter)
      setAllCollected(result)
    }, 10);
    onlyUpdateMe = false
  }, [])

    var image = <View/>
    if(props.event.image.startsWith("http")){
      image = <FastImage style={[styles.eventImage]} source={{uri:props.event.image}} cacheKey={props.event.image}/>
    } else {
      image = <Image style={styles.eventImage} source={getPhoto(props.event.image.toString().toLowerCase(), props.event.time.toString().toLowerCase())}/>
    }
    let child = <View style={[styles.eventContainer,{backgroundColor:props.event.color!==undefined?props.event.color:props.backgroundColor, marginHorizontal:props.showDate===false?10:20, paddingHorizontal:props.showDate===false?20:25,}]}>
      {image}
      <View style={{position:'absolute', right: -18, top: -18, zIndex:10}}>
        {allCollected?<Check play={allCollected} width={53} height={53}/>:<View/>}
      </View>
      <View style={[styles.textContainer,{paddingHorizontal: props.showDate===false?0:14}]}>
        <TextFont translate={false} numberOfLines={3} bold={true} style={[styles.textContainerTop,{color:props.textColor, textAlign:props.showDate===false?"left":"center", marginLeft:props.showDate===false?23:10}]}>{props.event.name}</TextFont>
        <TextFont style={[styles.textContainerBottom,{color:props.textColor, textAlign:props.showDate===false?"left":"center", marginLeft:props.showDate===false?23:10}]}>{props.event.time}</TextFont>
      </View>
      {props.showDate===false?<></>:
      <View style={{width: 33, alignItems:"center", marginLeft: -8}}>
        <Image style={styles.eventCalendar} source={require("../assets/icons/calendarIcon.png")}/>
        <TextFont bold={true} style={{position:"absolute", top:3, textAlign:"center",color:"black", fontSize: 10, opacity: 0.8}}>{getWeekDayShort(props.event.weekday)}</TextFont>
        <TextFont bold={true} style={{position:"absolute", top:17, textAlign:"center",color:"black", fontSize: 24, opacity: 0.8}}>{props.event.day}</TextFont>
      </View>}
    </View>

    if(eventFilter===undefined || allCollected==="no event items found"){
      return child
    } else {
      return <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+(eventFilter===undefined?"00":"AF"), false)}
        onPress={()=>{
          if(eventFilter!==undefined && allCollected!=="no event items found"){
            if(props.event.hasOwnProperty("type") && props.event.type==="villager"){
              props.openVillagerPopup(eventFilter)
            } else if(props.event.hasOwnProperty("filter") && props.event.filter==="K.K. concert"){
              props.setPage(4)
            } else {
              // props.setPage(23, true, eventFilter)
              RootNavigation.navigate('23', {propsPassed:eventFilter});
              onlyUpdateMe = true
            }
          }
        }}
      >
        {child}
      </TouchableNativeFeedback>
    }
}

export function getEventsDay(date, eventSections, showEventsIfInRange){
  const seasonData = require("../assets/data/DataCreated/Seasons and Events.json");
  const villagerData = global.dataLoadedVillagers[0];
  var totalEvents = [];

  villagerData.map( (villager, index)=>{
    if((date.getMonth()+1).toString()===(villager["Birthday"].split("/"))[0]&& date.getDate().toString()===(villager["Birthday"].split("/"))[1]){
      if(eventSections["Old Resident Villager's Birthdays"] && global.collectionListIndexed["oldResident"+"villagerCheckList"+villager["Name"]]===true){
        totalEvents.push({
          name: capitalize(translateBirthday(villager["NameLanguage"])),
          time: "All day",
          image: villager["Icon Image"],
          day:date.getDate(),
          weekday:date.getDay(),
          type:"villager",
          filter: villager,
          color:colors.specialEventResidentBirthdayBackground[global.darkMode],
          colorHeavy:colors.specialEventResidentBirthdayBackgroundHeavy[global.darkMode]
        });
        if(eventSections["App notifications"]){
          schedulePushNotification(date,eventSections["Set Notification Time"],"🎂 " + capitalize(translateBirthday(villager["NameLanguage"])),attemptToTranslateItem("All day"));
        }
      } else if(eventSections["Favorite Villager's Birthdays"] && global.collectionListIndexed["villagerCheckList"+villager["Name"]]===true){
        totalEvents.push({
          name: capitalize(translateBirthday(attemptToTranslateItem(villager["NameLanguage"]))),
          time: "All day",
          image: villager["Icon Image"],
          day:date.getDate(),
          weekday:date.getDay(),
          type:"villager",
          filter: villager,
          color:colors.specialEventBirthdayBackground[global.darkMode],
          colorHeavy:colors.specialEventBirthdayBackgroundHeavy[global.darkMode],
          important:true
        });
        if(eventSections["App notifications"]){
          schedulePushNotification(date,eventSections["Set Notification Time"],"🎂 " + capitalize(translateBirthday(attemptToTranslateItem(villager["Name"]))),attemptToTranslateItem("All day"));
        }
      } else if (eventSections["All Villager's Birthdays"]){
        totalEvents.push({
          name: capitalize(translateBirthday(attemptToTranslateItem(villager["NameLanguage"]))),
          time: "All day",
          image: villager["Icon Image"],
          day:date.getDate(),
          weekday:date.getDay(),
          type:"villager",
          filter: villager,
        });
        if(eventSections["App notifications"]){
          schedulePushNotification(date,eventSections["Set Notification Time"],"🎂 " + capitalize(translateBirthday(attemptToTranslateItem(villager["Name"]))),attemptToTranslate("All day"));
        }
      }
    }
  })

  specialEvents.map( (event, index)=>{
    if(event["Month"] == getMonthShort(parseInt(date.getMonth())) && parseInt(event["Day Start"]) == date.getDate()){
      totalEvents.push({
        name: capitalize(attemptToTranslate(event["Name"], true)),
        time: getSettingsString("settingsUse24HourClock") === "true" ? attemptToTranslate(event["Time24"]) : attemptToTranslate(event["Time"]),
        image: event["Name"],
        day:date.getDate(),
        weekday:date.getDay(),
        color:colors.specialEventBackground[global.darkMode],
        colorHeavy:colors.specialEventBackgroundHeavy[global.darkMode],
        type:"filter",
        filter:event["Name"],
      });
    } else {
      var eventDay = getSpecialOccurrenceDate(date.getFullYear(), index, specialEvents);
      if(eventDay[0]===date.getDate() && eventDay[1]===date.getMonth()){
        if(!event["Name"].includes("ireworks")){
          totalEvents.push({
            name: capitalize(attemptToTranslate(event["Name"], true)),
            time: getSettingsString("settingsUse24HourClock") === "true" ? event["Time24"] : event["Time"],
            image: event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            color:colors.specialEventBackground[global.darkMode],
            colorHeavy:colors.specialEventBackgroundHeavy[global.darkMode],
            type:"filter",
            filter:event["Name"],
            important:true
          });
          if(getSettingsString("settingsNotifications")){
            schedulePushNotification(date,eventSections["Set Notification Time"],"🏅" + capitalize(attemptToTranslate(event["Name"], true)),event["Time"]);
          }
        } else {
          totalEvents.push({
            name: capitalize(attemptToTranslate(event["Name"], true)),
            time: getSettingsString("settingsUse24HourClock") === "true" ? event["Time24"] : event["Time"],
            image: event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            color:colors.startEventBackground[global.darkMode],
            colorHeavy:colors.specialEventBackgroundHeavy[global.darkMode],
            type:"filter",
            filter:event["Name"]
          });
          if(getSettingsString("settingsNotifications")){
            schedulePushNotification(date,eventSections["Set Notification Time"],capitalize(attemptToTranslate(event["Name"], true)),event["Time"]);
          }
        }
      }
    }
  })

  let hemisphereShort = getSettingsString("settingsNorthernHemisphere")==="true" ? "NH" : "SH"
  let currentYear = date.getFullYear().toString()
  let eventDateKey = currentYear + " " + hemisphereShort
  seasonData.map( (event, index)=>{
    var eventName = getEventName(event["Name"])

    // if(date.getFullYear().toString() !== event["Year"] && event["Year"]!=="Any"){
    //   return
    // }

    if((event["Name"]!==undefined && !event["Name"].toLowerCase().includes("bug-off") && !event["Name"].toLowerCase().includes("fishing tourney") && !event["Name"].toLowerCase().includes("fireworks")) &&
      (event["Type"].toLowerCase()==="special event" || event["Type"].toLowerCase()==="basegame event") && !event["Name"].includes("days before") && !event["Name"].includes("weeks before") || 
      eventSections["Crafting Seasons"] && event["Type"].toLowerCase()==="crafting season" ||
      eventSections["Event Ready Days"] && event["Name"].toLowerCase().includes("days before") || 
      eventSections["Nook Shopping Events"] && event["Type"].toLowerCase()===("nook shopping event") || 
      eventSections["Zodiac Seasons"] && event["Type"].toLowerCase()===("zodiac season") || 
      eventSections["Shopping Seasons"] && event["Type"].toLowerCase()===("shopping season") || 
      (event["Type"].toLowerCase()==="calendar season" && event["Name"].toLowerCase().includes("shopping"))
    ){
      if(event[eventDateKey]!=="NA" && getSettingsString("settingsNorthernHemisphere")==="true"){
        if(isDateInRange(event[eventDateKey], date.getFullYear(), date, "startOnly")){
          let isImportant = event["Type"].toLowerCase()==="special event" && !event["Name"].includes("days before") && !event["Name"].includes("weeks before")
          totalEvents.push({
            name: capitalize(eventName),
            time: event["Type"],
            image: event["Display Name"]!==undefined?event["Display Name"]:event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            color:isImportant ? colors.specialEventBackground[global.darkMode]:colors.startEventBackground[global.darkMode],
            colorHeavy:isImportant ? colors.specialEventBackgroundHeavy[global.darkMode]:colors.startEventBackgroundHeavy[global.darkMode],
            type:"filter",
            filter:event["Display Name"]!==undefined?event["Display Name"]:event["Name"],
            important: isImportant
          });
          if(eventSections["App notifications"]){
            schedulePushNotification(date,eventSections["Set Notification Time"],capitalize(eventName),attemptToTranslate(event["Type"]));
          }
        } else if(eventSections["Show End Day of Events"] && isDateInRange(event[eventDateKey], date.getFullYear(), date, "endOnly")){
          totalEvents.push({
            name: capitalize(eventName) + " " + attemptToTranslate("End"),
            time: event["Type"],
            image: event["Display Name"]!==undefined?event["Display Name"]:event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            color:colors.warningEventBackground[global.darkMode],
            colorHeavy:colors.warningEventBackgroundHeavy[global.darkMode],
            type:"filter",
            filter:event["Display Name"]!==undefined?event["Display Name"]:event["Name"]
          });
          if(eventSections["App notifications"]){
            schedulePushNotification(date,eventSections["Set Notification Time"],attemptToTranslate("Last day!") + " " + capitalize(eventName),attemptToTranslate(capitalize(event["Type"])));
          }
        } else if(showEventsIfInRange && isDateInRange(event[eventDateKey], date.getFullYear(), date)){
          totalEvents.push({
            name: capitalize(eventName),
            time: event["Type"],
            image: event["Display Name"]!==undefined?event["Display Name"]:event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            type:"filter",
            filter:event["Display Name"]!==undefined?event["Display Name"]:event["Name"]
          });
        }
      } else if (event[eventDateKey]!=="NA" && getSettingsString("settingsNorthernHemisphere")!=="true"){
        if(isDateInRange(event[eventDateKey], date.getFullYear(), date, "startOnly")){
          let isImportant = event["Type"].toLowerCase()==="special event" && !event["Name"].includes("days before") && !event["Name"].includes("weeks before")
          totalEvents.push({
            name: capitalize(eventName),
            time: event["Type"],
            image: event["Display Name"]!==undefined?event["Display Name"]:event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            color:isImportant ? colors.specialEventBackground[global.darkMode]:colors.startEventBackground[global.darkMode],
            colorHeavy:isImportant ? colors.specialEventBackgroundHeavy[global.darkMode]:colors.startEventBackgroundHeavy[global.darkMode],
            type:"filter",
            filter:event["Display Name"]!==undefined?event["Display Name"]:event["Name"]
          });
          if(eventSections["App notifications"]){
            schedulePushNotification(date,eventSections["Set Notification Time"],capitalize(eventName),attemptToTranslate(event["Type"]));
          }
        } else if(eventSections["Show End Day of Events"] && isDateInRange(event[eventDateKey], date.getFullYear(), date, "endOnly")){
          totalEvents.push({
            name: capitalize(eventName) + " " + attemptToTranslate("End"),
            time: event["Type"],
            image: event["Display Name"]!==undefined?event["Display Name"]:event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            color:colors.warningEventBackground[global.darkMode],
            colorHeavy:colors.warningEventBackgroundHeavy[global.darkMode],
            type:"filter",
            filter:event["Display Name"]!==undefined?event["Display Name"]:event["Name"]
          });
          if(eventSections["App notifications"]){
            schedulePushNotification(date,eventSections["Set Notification Time"],attemptToTranslate("Last day!") + " " + eventName, attemptToTranslate(capitalize(event["Type"])));
          }
        } else if(showEventsIfInRange && isDateInRange(event[eventDateKey], date.getFullYear(), date)){
          totalEvents.push({
            name: capitalize(eventName),
            time: event["Type"],
            image: event["Display Name"]!==undefined?event["Display Name"]:event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            type:"filter",
            filter:event["Display Name"]!==undefined?event["Display Name"]:event["Name"]
          });
        }
      } 
    }
    
  })

  if(eventSections["Daisy Mae"] && date.getDay()===0){
    totalEvents.push({
      name: attemptToTranslate("Daisy Mae"),
      time: getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 12:00" : "5 AM - 12 PM",
      image:"turnip.png",
      day:date.getDate(),
      weekday:date.getDay(),
      type:"filter",
      filter:"Daisy Mae"
    });
    if(eventSections["App notifications"]){
      schedulePushNotification(date,eventSections["Set Notification Time"],"🥬 " + attemptToTranslate("Daisy Mae"),getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 12:00" : "5 AM - 12 PM");
    }
  } 
  
  //Check if there was a bug-off/fishing tourney the day before, then push K.K. pack one day
  var moveKKTo0 = false; //Day of the week to move to
  var moveKKTo1 = false; //Day of the week to move to
  var moveKK = false;
  var moveKKTo = 6;
  if(eventSections["K.K. Slider"]){
    specialEvents.map( (event, index)=>{
      var eventDay = getSpecialOccurrenceDate(date.getFullYear(), index, specialEvents);
      if(eventDay[0]===addDays(date,-1).getDate() && eventDay[1]===addDays(date,-1).getMonth()){
        moveKKTo0 = true;
      }
      if(eventDay[0]===addDays(date,-2).getDate() && eventDay[1]===addDays(date,-2).getMonth()){
        moveKKTo1 = true;
      }
      if(eventDay[0]===date.getDate() && eventDay[1]===date.getMonth()){
        moveKK = true;
      }
    })
    if(moveKKTo1 && moveKKTo0){
      moveKKTo = 1
    } else if (moveKKTo0){
      moveKKTo = 0
    }
  }
  

  if (eventSections["K.K. Slider"] && (date.getDay()===moveKKTo) && !moveKK){
    totalEvents.push({
      name: attemptToTranslate("K.K. Slider"),
      time: getSettingsString("settingsUse24HourClock") === "true" ? "18:00 - 00:00" : "6 PM - 12 AM",
      image:"music.png",
      day:date.getDate(),
      weekday:date.getDay(),
      type:"filter",
      filter:"K.K. concert"
    });
    if(eventSections["App notifications"]){
      schedulePushNotification(date,eventSections["Set Notification Time"],"🎵 " + attemptToTranslate("K.K. Slider"),getSettingsString("settingsUse24HourClock") === "true" ? "6:00 - 24:00" : "6 PM - 12 AM");
    }
  }

  return totalEvents;
}

export function getSpecialOccurrenceDate(currentYear, i, snapshot){
  var occurrence = 0;
  var eventDate = new Date();
  var specialOccurrence = parseInt(snapshot[i]["Special Occurrence"]);
  for(var day = 1; day <= getDaysNumberMonth(snapshot[i]["Month"]); day++){
    if(snapshot[i]["Hemisphere"]==="Northern" && getSettingsString("settingsNorthernHemisphere")==="false"){
      return [-1,-1]
    } else if(snapshot[i]["Hemisphere"]==="Southern" && getSettingsString("settingsNorthernHemisphere")==="true"){
      return [-1,-1]
    }
    eventDate.setFullYear(currentYear);
    eventDate.setMonth(getMonthStringNumber(snapshot[i]["Month"]));
    eventDate.setDate(day)
    // console.log(eventDate)
    
    if(new Date(eventDate).getDay()===parseInt(getDayOfWeekObject(snapshot[i]["Special Day"]))){
      occurrence++;
    }
    if(occurrence==specialOccurrence){
      // console.log(snapshot[i]["Name"])
      // console.log(new Date(eventDate))
      // console.log(new Date(eventDate).getDate())
      // console.log(parseInt(getDayOfWeekObject(snapshot[i]["Special Day"])))
      // console.log([day, getMonthNumber(snapshot[i]["Month"])])
      return [day, getMonthNumber(snapshot[i]["Month"])];
    }
  }
  return "0";
}

function getDaysNumberMonth(currentMonth){
  if(currentMonth==="Jan")
    return 31;
  else if(currentMonth==="Feb")
    return 28;
  else if(currentMonth==="Mar")
    return 31;
  else if(currentMonth==="Apr")
    return 30;
  else if(currentMonth==="May")
    return 31;
  else if(currentMonth==="June")
    return 30;
  else if(currentMonth==="July")
    return 31;
  else if(currentMonth==="Aug")
    return 31;
  else if(currentMonth==="Sept")
    return 30;
  else if(currentMonth==="Oct")
    return 31;
  else if(currentMonth==="Nov")
    return 30;
  else
    return 31;
}

function getMonthStringNumber(currentMonth){
  if(currentMonth==="Jan")
    return "00";
  else if(currentMonth==="Feb")
    return "01";
  else if(currentMonth==="Mar")
    return "02";
  else if(currentMonth==="Apr")
    return "03";
  else if(currentMonth==="May")
    return "04";
  else if(currentMonth==="June")
    return "05";
  else if(currentMonth==="July")
    return "06";
  else if(currentMonth==="Aug")
    return "07";
  else if(currentMonth==="Sept")
    return "08";
  else if(currentMonth==="Oct")
    return "09";
  else if(currentMonth==="Nov")
    return "10";
  else
    return "11";
}

function getMonthNumber(currentMonth){
  if(currentMonth==="Jan")
    return 0;
  else if(currentMonth==="Feb")
    return 1;
  else if(currentMonth==="Mar")
    return 2;
  else if(currentMonth==="Apr")
    return 3;
  else if(currentMonth==="May")
    return 4;
  else if(currentMonth==="June")
    return 5;
  else if(currentMonth==="July")
    return 6;
  else if(currentMonth==="Aug")
    return 7;
  else if(currentMonth==="Sept")
    return 8;
  else if(currentMonth==="Oct")
    return 9;
  else if(currentMonth==="Nov")
    return 10;
  else
    return 11;
}

function getMonthName(currentMonth){
  if(currentMonth===0)
    return "Jan";
  else if(currentMonth===1)
    return "Feb";
  else if(currentMonth===2)
    return "Mar";
  else if(currentMonth===3)
    return "Apr";
  else if(currentMonth===4)
    return "May";
  else if(currentMonth===5)
    return "June";
  else if(currentMonth===6)
    return "July";
  else if(currentMonth===7)
    return "Aug";
  else if(currentMonth===8)
    return "Sept";
  else if(currentMonth===9)
    return "Oct";
  else if(currentMonth===10)
    return "Nov";
  else
    return "Dec";
}

export function getDayOfWeekObject(dayOfWeek){
  if(dayOfWeek==="Monday"){
    return 1;
  } else if(dayOfWeek==="Tuesday"){
    return 2;
  }else if(dayOfWeek==="Wednesday"){
    return 3;
  }else if(dayOfWeek==="Thursday"){
    return 4;
  }else if(dayOfWeek==="Friday"){
    return 5;
  }else if(dayOfWeek==="Saturday"){
    return 6;
  }else if(dayOfWeek==="Sunday"){
    return 0;
  }
}

const styles = StyleSheet.create({
  textContainerTop:{
    textAlign:"center",
    fontSize: 19,
    marginHorizontal: 25, 
  },
  textContainerBottom:{
    textAlign:"center",
    marginTop: 3,
    fontSize: 16,
    marginHorizontal: 20, 
  },
  textContainer:{
    width: "80%",
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
    borderRadius: 10,
  },
});