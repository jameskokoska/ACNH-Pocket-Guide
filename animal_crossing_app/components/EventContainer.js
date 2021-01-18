import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'
import {getPhoto} from './GetPhoto'
import {getCurrentDateObject} from './DateFunctions';

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
    if(this.props.image.startsWith("http")){
      image = <Image style={[styles.eventImage]} source={{uri:this.props.image}}/>
    } else {
      image = <Image style={styles.eventImage} source={getPhoto(this.props.image)}/>
    }
    return(
        <View style={[styles.eventContainer,{backgroundColor:this.props.backgroundColor}]}>
          {image}
          <View style={styles.textContainer}>
            <TextFont bold={true} style={[styles.textContainerTop,{color:this.props.textColor}]}>{this.props.text}</TextFont>
            <TextFont style={[styles.textContainerBottom,{color:this.props.textColor}]}>{this.props.textBottom}</TextFont>
          </View>
          <View style={{width: 30, alignItems:"center", marginLeft: -8}}>
            <Image style={styles.eventCalendar} source={require("../assets/icons/calendarIcon.png")}/>
            <TextFont bold={true} style={{position:"absolute", top:1, textAlign:"center",color:"black", fontSize: 12, opacity: 0.8}}>{this.props.month}</TextFont>
            <TextFont bold={true} style={{position:"absolute", top:17, textAlign:"center",color:"black", fontSize: 24, opacity: 0.8}}>{this.props.day}</TextFont>
          </View>
        </View>
    )
  }
}

export function getEventsDay(currentDate){
  var currentMonth = currentDate.getMonth();
  var currentDay = currentDate.getDate();
  var currentYear = currentDate.getFullYear();
  var dayOfWeek = currentDate.getDay()
  var totalEvents = [];
  var northernHemisphere = global.settingsCurrent[0]["currentValue"]==="true";
  var eventDatum;
  if(dayOfWeek===0){
    eventDatum = {
        "Name": "Daisy Mae",
        "Month": getMonthName(currentMonth),
        "Day Start": currentDay,
        "Day End": "NA",
        "Special Day" : "NA",
        "Special Occurrence": "NA",
        "Hemisphere": "NA",
        "Time" : "5 AM - 12 PM",
        "Image" : "turnip.png"
    }
    totalEvents.push(eventDatum);
  } else if (dayOfWeek===6){
    eventDatum = {
        "Name": "K.K. Slider",
        "Month": getMonthName(currentMonth),
        "Day Start": currentDay,
        "Day End": "NA",
        "Special Day" : "NA",
        "Special Occurrence": "NA",
        "Hemisphere": "NA",
        "Time" : "8 PM - 12 AM",
        "Image" : "music.png"
    }
    totalEvents.push(eventDatum);
  }

  var snapshot = require("../assets/data/events.json")
  for(var i = 1; i < snapshot.length; i++){
    if(northernHemisphere && snapshot[i]["Hemisphere"]==="Southern"){
      continue;
    } else if (!northernHemisphere && snapshot[i]["Hemisphere"]==="Northern"){
      continue;
    } else if(snapshot[i]["Day Start"]==="NA"){
      // console.log(snapshot[i])
      var eventDay = getSpecialOccurrenceDate(currentYear, i, snapshot);
      // console.log(eventDay)
      // console.log(currentMonth)
      if(eventDay[0]===currentDay && eventDay[1]===currentMonth){
        eventDatum = {
          "Name": snapshot[i]["Name"],
          "Month": snapshot[i]["Month"],
          "Day Start": eventDay[0],
          "Day End": snapshot[i]["Day End"],
          "Special Day" : snapshot[i]["Special Day"],
          "Special Occurrence": snapshot[i]["Special Occurrence"],
          "Hemisphere": snapshot[i]["Hemisphere"],
          "Time" : snapshot[i]["Time"],
          "Image" : snapshot[i]["Image"]
        }
        totalEvents.push(eventDatum);
      }
      // ||currentDay<=parseInt(snapshot[i]["Day End"])
    } else if((currentDay===parseInt(snapshot[i]["Day Start"]))&& currentMonth===getMonthNumber(snapshot[i]["Month"])){
      eventDatum = {
        "Name": snapshot[i]["Name"],
        "Month": snapshot[i]["Month"],
        "Day Start": snapshot[i]["Day Start"],
        "Day End": snapshot[i]["Day End"],
        "Special Day" : snapshot[i]["Special Day"],
        "Special Occurrence": snapshot[i]["Special Occurrence"],
        "Hemisphere": snapshot[i]["Hemisphere"],
        "Time" : snapshot[i]["Time"],
        "Image" : snapshot[i]["Image"]
      }
      //Filter out birthdays so only villagers you hearted show up
      if(snapshot[i]["Name"].includes("Birthday")){
        for(var x = 0; x<global.collectionList.length; x++){
          if(global.collectionList[x].includes(snapshot[i]["Name"].replace("'s Birthday","")) && global.collectionList[x].includes("villagerCheckList")){
            totalEvents.push(eventDatum);
          }
        }
      } else {
        totalEvents.push(eventDatum);
      }
      
    }
  }
  return totalEvents;
}

function getSpecialOccurrenceDate(currentYear, i, snapshot){
  var occurrence = 0;
  var eventDate;
  var specialOccurrence = parseInt(snapshot[i]["Special Occurrence"]);
  for(var day = 1; day <= getDaysNumberMonth(snapshot[i]["Month"]); day++){
    if(day<10){
      eventDate = currentYear+"-"+getMonthNumber(snapshot[i]["Month"])+1+"-0"+day;
    } else {
      eventDate = currentYear+"-"+getMonthNumber(snapshot[i]["Month"])+1+"-"+day;
    }
    // console.log(eventDate)
    if(new Date(eventDate).getDay()===parseInt(getDayOfWeekObject(snapshot[i]["Special Day"]))){
      occurrence++;
    }
    if(occurrence==specialOccurrence){
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
    return 0;
  } else if(dayOfWeek==="Tuesday"){
    return 1;
  }else if(dayOfWeek==="Wednesday"){
    return 2;
  }else if(dayOfWeek==="Thursday"){
    return 3;
  }else if(dayOfWeek==="Friday"){
    return 4;
  }else if(dayOfWeek==="Saturday"){
    return 5;
  }else if(dayOfWeek==="Sunday"){
    return 6;
  }
}

const styles = StyleSheet.create({
  textContainerTop:{
    textAlign:"center",
    fontSize: 20,
  },
  textContainerBottom:{
    textAlign:"center",
    marginTop: 3,
    fontSize: 18,
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
    height: 90
  },
});