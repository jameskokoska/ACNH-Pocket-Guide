import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'
import {getPhoto} from './GetPhoto'
import {getWeekDayShort, getMonthShort, getCurrentDateObject} from './DateFunctions';
import {getEventName, attemptToTranslate, capitalize, getSettingsString, translateBirthday, attemptToTranslateItem} from "../LoadJsonData"
import FastImage from './FastImage';
import {schedulePushNotification} from "../Notifications"
import {specialEvents, isDateInRange} from "./DateFunctions"
import colors from '../Colors'

// <EventContainer 
//  backgroundColor="black" 
//  textColor="white" 
//  image={require("../assets/icons/music.png")} 
//  text="K.K. Slider" 
//  textBottom="6 - 8 PM" 
//  month="Nov" 
//  day="31"
// />

export class EventContainer extends Component {
  render(){
    var image = <View/>
    if(this.props.event.image.startsWith("http")){
      image = <FastImage style={[styles.eventImage]} source={{uri:this.props.event.image}} cacheKey={this.props.event.image}/>
    } else {
      image = <Image style={styles.eventImage} source={getPhoto(this.props.event.image.toLowerCase(), this.props.event.time.toLowerCase())}/>
    }
    return(
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+(this.props.event.filter===undefined?"00":"AF"), false)}
        onPress={()=>{
          if(this.props.event.filter!==undefined){
            if(this.props.event.hasOwnProperty("type") && this.props.event.type==="villager"){
              this.props.openVillagerPopup(this.props.event.filter)
            } else {
              this.props.setPage(23, true, this.props.event.filter)
            }
          }
        }}
      >
        <View style={[styles.eventContainer,{backgroundColor:this.props.event.color!==undefined?this.props.event.color:this.props.backgroundColor}]}>
          {image}
          <View style={styles.textContainer}>
            <TextFont translate={false} numberOfLines={2} bold={true} style={[styles.textContainerTop,{color:this.props.textColor}]}>{this.props.event.name}</TextFont>
            <TextFont translate={false} style={[styles.textContainerBottom,{color:this.props.textColor}]}>{this.props.event.time}</TextFont>
          </View>
          <View style={{width: 33, alignItems:"center", marginLeft: -8}}>
            <Image style={styles.eventCalendar} source={require("../assets/icons/calendarIcon.png")}/>
            <TextFont bold={true} style={{position:"absolute", top:3, textAlign:"center",color:"black", fontSize: 10, opacity: 0.8}}>{getWeekDayShort(this.props.event.weekday)}</TextFont>
            <TextFont bold={true} style={{position:"absolute", top:17, textAlign:"center",color:"black", fontSize: 24, opacity: 0.8}}>{this.props.event.day}</TextFont>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

export function getEventsDay(date, eventSections, scheduleNotifications=false){
  const seasonData = require("../assets/data/data.json")["Seasons and Events"];
  const villagerData = require("../assets/data/data.json")["Villagers"];
  var totalEvents = [];

  villagerData.map( (villager, index)=>{
    if((date.getMonth()+1).toString()===(villager["Birthday"].split("/"))[0]&& date.getDate().toString()===(villager["Birthday"].split("/"))[1]){
      if(eventSections["Favorite Villager's Birthdays"] && global.collectionList.includes("villagerCheckList"+villager["Name"])){
        totalEvents.push({
          name: capitalize(translateBirthday(attemptToTranslateItem(villager["Name"]))),
          time: attemptToTranslate("All day"),
          image: villager["Icon Image"],
          day:date.getDate(),
          weekday:date.getDay(),
          type:"villager",
          filter: villager,
          color:colors.specialEventBirthdayBackground[global.darkMode]
        });
        if(eventSections["App notifications"] && scheduleNotifications){
          schedulePushNotification(date,eventSections["Set Notification Time"],"🎂 " + capitalize(translateBirthday(attemptToTranslateItem(villager["Name"]))),attemptToTranslateItem("All day"));
        }
      } else if (eventSections["All Villager's Birthdays"]){
        totalEvents.push({
          name: capitalize(translateBirthday(attemptToTranslateItem(villager["Name"]))),
          time: attemptToTranslate("All day"),
          image: villager["Icon Image"],
          day:date.getDate(),
          weekday:date.getDay(),
          type:"villager",
          filter: villager,
        });
        if(eventSections["App notifications"] && scheduleNotifications){
          schedulePushNotification(date,eventSections["Set Notification Time"],"🎂 " + capitalize(translateBirthday(attemptToTranslateItem(villager["Name"]))),attemptToTranslate("All day"));
        }
      }
    }
  })

  specialEvents.map( (event, index)=>{
    var eventDay = getSpecialOccurrenceDate(date.getFullYear(), index, specialEvents);
    if(eventDay[0]===date.getDate() && eventDay[1]===date.getMonth()){
      if(!event["Name"].includes("ireworks")){
        totalEvents.push({
          name: attemptToTranslate(capitalize(event["Name"])),
          time: getSettingsString("settingsUse24HourClock") === "true" ? event["Time24"] : event["Time"],
          image: event["Name"],
          day:date.getDate(),
          weekday:date.getDay(),
          color:colors.specialEventBackground[global.darkMode],
          type:"filter",
          filter:event["Name"],
        });
        if(getSettingsString("settingsNotifications") && scheduleNotifications){
          schedulePushNotification(date,eventSections["Set Notification Time"],"🏅" + attemptToTranslate(capitalize(event["Name"])),event["Time"]);
        }
      } else {
        totalEvents.push({
          name: attemptToTranslate(capitalize(event["Name"])),
          time: getSettingsString("settingsUse24HourClock") === "true" ? event["Time24"] : event["Time"],
          image: event["Name"],
          day:date.getDate(),
          weekday:date.getDay(),
          color:colors.startEventBackground[global.darkMode],
          type:"filter",
          filter:event["Name"]
        });
        if(getSettingsString("settingsNotifications") && scheduleNotifications){
          schedulePushNotification(date,eventSections["Set Notification Time"],attemptToTranslate(capitalize(event["Name"])),event["Time"]);
        }
      }
    }
  })

  seasonData.map( (event, index)=>{
    var eventName = getEventName(event["Name"])

    if((event["Type"].toLowerCase()==="special event" || event["Type"].toLowerCase()==="basegame event") && !event["Name"].toLowerCase().includes("ready days") || 
      eventSections["Crafting Seasons"] && event["Type"].toLowerCase()==="crafting season" ||
      eventSections["Event Ready Days"] && event["Name"].toLowerCase().includes("ready days") || 
      eventSections["Nook Shopping Events"] && event["Type"].toLowerCase()===("nook shopping event") || 
      eventSections["Zodiac Seasons"] && event["Type"].toLowerCase()===("zodiac season") || 
      eventSections["Shopping Seasons"] && event["Type"].toLowerCase()===("shopping season")
    ){
      if(event["Dates (Northern Hemisphere)"]!=="NA" && getSettingsString("settingsNorthernHemisphere")==="true"){
        if(isDateInRange(event["Dates (Northern Hemisphere)"], date.getFullYear(), date, "startOnly")){
          totalEvents.push({
            name: capitalize(eventName),
            time: attemptToTranslate(event["Type"]),
            image: event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            color:colors.startEventBackground[global.darkMode],
            type:"filter",
            filter:event["Name"]
          });
          if(eventSections["App notifications"] && scheduleNotifications){
            schedulePushNotification(date,eventSections["Set Notification Time"],capitalize(eventName),event["Type"]);
          }
        } else if(eventSections["Show End Day of Events"] && isDateInRange(event["Dates (Northern Hemisphere)"], date.getFullYear(), date, "endOnly")){
          totalEvents.push({
            name: capitalize(eventName) + " " + attemptToTranslate("End"),
            time: attemptToTranslate(capitalize(event["Type"])),
            image: event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            color:colors.warningEventBackground[global.darkMode],
            type:"filter",
            filter:event["Name"]
          });
          if(eventSections["App notifications"] && scheduleNotifications){
            schedulePushNotification(date,eventSections["Set Notification Time"],"Last day! " + capitalize(eventName),attemptToTranslate(capitalize(event["Type"])));
          }
        }
      } else if (event["Dates (Southern Hemisphere)"]!=="NA" && getSettingsString("settingsNorthernHemisphere")!=="true"){
        if(isDateInRange(event["Dates (Southern Hemisphere)"], date.getFullYear(), date, "startOnly")){
          totalEvents.push({
            name: capitalize(eventName),
            time: attemptToTranslate(capitalize(event["Type"])),
            image: event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            color:colors.startEventBackground[global.darkMode],
            type:"filter",
            filter:event["Name"]
          });
          if(eventSections["App notifications"] && scheduleNotifications){
            schedulePushNotification(date,eventSections["Set Notification Time"],capitalize(eventName),event["Type"]);
          }
        } else if(eventSections["Show End Day of Events"] && isDateInRange(event["Dates (Southern Hemisphere)"], date.getFullYear(), date, "endOnly")){
          totalEvents.push({
            name: capitalize(eventName) + " " + attemptToTranslate("End"),
            time: attemptToTranslate(capitalize(event["Type"])),
            image: event["Name"],
            day:date.getDate(),
            weekday:date.getDay(),
            color:colors.warningEventBackground[global.darkMode],
            type:"filter",
            filter:event["Name"]
          });
          if(eventSections["App notifications"] && scheduleNotifications){
            schedulePushNotification(date,eventSections["Set Notification Time"],attemptToTranslate("Last day!") + " " + eventName, attemptToTranslate(capitalize(event["Type"])));
          }
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
    if(eventSections["App notifications"] && scheduleNotifications){
      schedulePushNotification(date,eventSections["Set Notification Time"],"🥬 " + attemptToTranslate("Daisy Mae"),getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 12:00" : "5 AM - 12 PM");
    }
  } else if (eventSections["K.K. Slider"] && date.getDay()===6){
    totalEvents.push({
      name: attemptToTranslate("K.K. Slider"),
      time: getSettingsString("settingsUse24HourClock") === "true" ? "18:00 - 00:00" : "6 PM - 12 AM",
      image:"music.png",
      day:date.getDate(),
      weekday:date.getDay(),
      type:"filter",
      filter:"K.K. concert"
    });
    if(eventSections["App notifications"] && scheduleNotifications){
      schedulePushNotification(date,eventSections["Set Notification Time"],"🎵 " + attemptToTranslate("K.K. Slider"),getSettingsString("settingsUse24HourClock") === "true" ? "00:00 - 24:00" : "8 PM - 12 AM");
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

function getDayOfWeekObject(dayOfWeek){
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
    fontSize: 20,
    marginHorizontal: 25, 
  },
  textContainerBottom:{
    textAlign:"center",
    marginTop: 3,
    fontSize: 18,
    marginHorizontal: 20, 
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
  },
});