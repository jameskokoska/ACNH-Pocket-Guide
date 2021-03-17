import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import TextFont from '../components/TextFont';
import colors from '../Colors'
import {getPhoto} from "../components/GetPhoto"
import {getMonthFromString, getCurrentDateObject} from "../components/DateFunctions"
import {capitalize, getSettingsString} from "../LoadJsonData"
import {getSpecialOccurrenceDate} from "../components/EventContainer"
import FastImage from '../components/FastImage';


export default class CalendarPage extends Component {
  constructor(item) {
    super(item);

    this.state = {
      items: {},
      itemsColor: {}
    };
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={getCurrentDateObject()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markingType={'custom'}
        markedDates={this.state.itemsColor}
        // monthFormat={'yyyy'}
        theme={{ 
          // agendaDayTextColor: 'black',
          // agendaDayNumColor: 'black',
          // agendaTodayColor: 'black', 
          indicatorColor: colors.textBlack[global.darkMode],
          todayTextColor: '#00adf5',
          monthTextColor: colors.textBlack[global.darkMode],
          dayTextColor: colors.textBlack[global.darkMode],
          backgroundColor: colors.background[global.darkMode],
          calendarBackground: colors.backgroundLight[global.darkMode],
        }}
          
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }

  loadItems(day) {
    console.log(this.isDateInRange("February 25 – May 21", "2022", new Date()))

    const styleRepeatEvent = {customStyles: {
      container: { borderWidth:1, borderColor: colors.lightDarkAccentHeavy2[global.darkMode]},
      text: {fontWeight: 'bold'}
    }}

    const styleImportantEvent = {customStyles: {
      container: { borderWidth:2, borderColor: colors.cancelButton[global.darkMode]},
      text: {fontWeight: 'bold'}
    }}

    const styleBirthdayEvent = {customStyles: {
      container: { borderWidth:2, borderColor: colors.okButton[global.darkMode]},
      text: {fontWeight: 'bold'}
    }}

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const date = new Date(day.timestamp + i * 24 * 60 * 60 * 1000 - 10);
        const strTime = this.dateToString(date);
        const seasonData = require("../assets/data/seasonsandevents.json");
        const villagerData = require("../assets/data/villagers.json");
        
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];

          if(date.getDay()===0){
            this.state.items[strTime].push({
              name: 'Daisy Mae',
              time: '5 AM - 12 PM',
              image:"turnip.png",
              color: colors.white,
            });
            this.state.itemsColor[strTime] = styleRepeatEvent;
          } else if (date.getDay()===6){
            this.state.items[strTime].push({
              name: 'K.K. Slider',
              time: '8 PM - 12 AM',
              image:"music.png",
              color: colors.white,
            });
            this.state.itemsColor[strTime] = styleRepeatEvent;
          }
          villagerData.map( (villager, index)=>{
            if((date.getMonth()+1).toString()===(villager["Birthday"].split("/"))[0]&& date.getDate().toString()===(villager["Birthday"].split("/"))[1]){
              if(global.collectionList.includes("villagerCheckList"+villager["Name"])){
                this.state.items[strTime].push({
                  name: capitalize(villager["Name"]+ "'s Birthday"),
                  time: "All day",
                  image: villager["Icon Image"],
                  color: ["#2195F33F","#006EB34D"],
                });
                this.state.itemsColor[strTime] = styleBirthdayEvent;
              } else {
                this.state.items[strTime].push({
                  name: capitalize(villager["Name"]+ "'s Birthday"),
                  time: "All day",
                  image: villager["Icon Image"],
                  color: colors.white,
                });
              }
              
            }
          })

          seasonData.map( (event, index)=>{
            if(event["Northern Hemisphere Dates"]!=="NA" && getSettingsString("settingsNorthernHemisphere")==="true"){
              if(this.isDateInRange(event["Northern Hemisphere Dates"], date.getFullYear(), date)){
                this.state.items[strTime].push({
                  name: capitalize(event["Name"]),
                  time: event["Type"],
                  image: event["Name"],
                  color: colors.white,
                });
              }
            } else if (event["Southern Hemisphere Dates"]!=="NA" && getSettingsString("settingsNorthernHemisphere")!=="true"){
              if(this.isDateInRange(event["Southern Hemisphere Dates"], date.getFullYear(), date)){
                this.state.items[strTime].push({
                  name: capitalize(event["Name"]),
                  time: event["Type"],
                  image: event["Name"],
                  color: colors.white,
                });
              }
            } else if (event[date.getFullYear()+" Dates"]!=="NA"){
              if(this.isDateInRange(event[date.getFullYear()+" Dates"], date.getFullYear(), date)){
                this.state.items[strTime].push({
                  name: capitalize(event["Name"]),
                  time: event["Type"],
                  image: event["Name"],
                  color: colors.white,
                });
              }
            }
          })

          specialEvents.map( (event, index)=>{
            var eventDay = getSpecialOccurrenceDate(date.getFullYear(), index, specialEvents);
            if(eventDay[0]===date.getDate() && eventDay[1]===date.getMonth()){
              if(!event["Name"].includes("fireworks")){
                this.state.items[strTime].push({
                  name: capitalize(event["Name"]),
                  time: event["Time"],
                  image: event["Name"],
                  color: ["#D32F2F3F","#AB000E3A"],
                });
                this.state.itemsColor[strTime] = styleImportantEvent;
              } else {
                this.state.items[strTime].push({
                  name: capitalize(event["Name"]),
                  time: event["Time"],
                  image: event["Name"],
                  color: colors.white,
                });
              }

            }
          })

          

          // const numItems = Math.floor(Math.random() * 3);
          // for (let j = 0; j < numItems; j++) {
          //   this.state.items[strTime].push({
          //     name: 'Item for ' + strTime + ' #' + j,
          //     height: Math.max(50, Math.floor(Math.random() * 150))
          //   });
          // }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 10);
  }

  renderItem(item) {
    var image = <View/>
    if(item.image.startsWith("http")){
      image = <FastImage style={{width: 50, height: 50, resizeMode:'contain',}} source={{uri:item.image}} cacheKey={item.image}/>
    } else {
      image = <Image style={{width: 50, height: 50, resizeMode:'contain',}} source={getPhoto(item.image.toLowerCase(), item.time.toLowerCase())}/>
    }
    return(
        <View style={{padding: 20, paddingRight: 60, marginHorizontal: 10, marginVertical: 5,  flexDirection:"row", flex:1, alignItems: 'center', borderRadius: 10, backgroundColor:item.color[global.darkMode]}}>
          {image}
          <View style={{marginLeft: 18}}>
            <TextFont bold={true} style={{fontSize: 20,color: colors.textBlack[global.darkMode]}}>{item.name}</TextFont>
            <TextFont style={{marginTop: 3,fontSize: 18,color: colors.textBlack[global.darkMode]}}>{item.time}</TextFont>
          </View>
        </View>
    )
  }
  

  renderEmptyDate() {
    return (
      <View/>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  dateToString(date) {
    return date.toISOString().split('T')[0];
  }

  //range >> February 25 – May 21
  //date >> Date object
  isDateInRange(range,rangeYear, date){
    var rangeSplit = range.replace(/[^\x00-\x7F]/g, "");
    rangeSplit = rangeSplit.replace("  ", " ");
    rangeSplit = rangeSplit.split(" ");
    if(rangeSplit.length===4){
      var dateStart = new Date('January 10, 2000 12:00:00');
      dateStart.setMonth(getMonthFromString(rangeSplit[0]));
      dateStart.setDate(rangeSplit[1]);
      dateStart.setYear(rangeYear);
      var dateEnd= new Date('January 10, 2000 12:00:00');
      dateEnd.setMonth(getMonthFromString(rangeSplit[2]));
      dateEnd.setDate(rangeSplit[3]);
      dateEnd.setYear(rangeYear);
      if(parseInt(getMonthFromString(rangeSplit[2]))<parseInt(getMonthFromString(rangeSplit[0]))){
        dateEnd.setYear(parseInt(rangeYear)+1);
      }
      if(date>dateStart && date<dateEnd){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

const specialEvents = [
  {
        "Name": "Fireworks Show",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Sunday",
        "Special Occurrence": "1",
        "Hemisphere": "NA",
        "Time" : "7 PM - 12 AM",
        "Image" : "fireworks.png"
    },
    {
        "Name": "Fireworks Show",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Sunday",
        "Special Occurrence": "2",
        "Hemisphere": "NA",
        "Time" : "7 PM - 12 AM",
        "Image" : "fireworks.png"
    },
    {
        "Name": "Fireworks Show",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Sunday",
        "Special Occurrence": "3",
        "Hemisphere": "NA",
        "Time" : "7 PM - 12 AM",
        "Image" : "fireworks.png"
    },
    {
        "Name": "Fireworks Show",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Sunday",
        "Special Occurrence": "4",
        "Hemisphere": "NA",
        "Time" : "7 PM - 12 AM",
        "Image" : "fireworks.png"
    },
    {
        "Name": "Fireworks Show",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Sunday",
        "Special Occurrence": "5",
        "Hemisphere": "NA",
        "Time" : "7 PM - 12 AM",
        "Image" : "fireworks.png"
    },
   {
        "Name": "Bug-Off",
        "Month": "Jan",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "3",
        "Hemisphere": "Southern",
        "Time" : "9 AM - 6 PM",
        "Image" : "bugs.png"
    },
    {
        "Name": "Bug-Off",
        "Month": "Feb",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "3",
        "Hemisphere": "Southern",
        "Time" : "9 AM - 6 PM",
        "Image" : "bugs.png"
    },
    {
        "Name": "Bug-Off",
        "Month": "Nov",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "3",
        "Hemisphere": "Southern",
        "Time" : "9 AM - 6 PM",
        "Image" : "bugs.png"
    },
    {
        "Name": "Bug-Off",
        "Month": "Dec",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "3",
        "Hemisphere": "Southern",
        "Time" : "9 AM - 6 PM",
        "Image" : "bugs.png"
    },
    {
        "Name": "Bug-Off",
        "Month": "June",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "4",
        "Hemisphere": "Northern",
        "Time" : "9 AM - 6 PM",
        "Image" : "bugs.png"
    },
    {
        "Name": "Bug-Off",
        "Month": "July",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "4",
        "Hemisphere": "Northern",
        "Time" : "9 AM - 6 PM",
        "Image" : "bugs.png"
    },
    {
        "Name": "Bug-Off",
        "Month": "Aug",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "4",
        "Hemisphere": "Northern",
        "Time" : "9 AM - 6 PM",
        "Image" : "bugs.png"
    },
    {
        "Name": "Bug-Off",
        "Month": "Sept",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "4",
        "Hemisphere": "Northern",
        "Time" : "9 AM - 6 PM",
        "Image" : "bugs.png"
    },
    {
        "Name": "Fishing Tourney",
        "Month": "Jan",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "2",
        "Hemisphere": "Northern",
        "Time" : "9 AM - 6 PM",
        "Image" : "fish.png"
    },
    {
        "Name": "Fishing Tourney",
        "Month": "Apr",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "2",
        "Hemisphere": "NA",
        "Time" : "9 AM - 6 PM",
        "Image" : "fish.png"
    },
    {
        "Name": "Fishing Tourney",
        "Month": "July",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "2",
        "Hemisphere": "NA",
        "Time" : "9 AM - 6 PM",
        "Image" : "fish.png"
    },
    {
        "Name": "Fishing Tourney",
        "Month": "Oct",
        "Day Start": "NA",
        "Day End": "NA",
        "Special Day" : "Saturday",
        "Special Occurrence": "2",
        "Hemisphere": "NA",
        "Time" : "9 AM - 6 PM",
        "Image" : "fish.png"
    },
]