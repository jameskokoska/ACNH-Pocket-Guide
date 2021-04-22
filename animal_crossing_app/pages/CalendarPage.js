import React, {Component} from 'react';
import {Animated, FlatList, TouchableNativeFeedback, Dimensions, Vibration, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import TextFont from '../components/TextFont';
import colors from '../Colors'
import {getPhoto} from "../components/GetPhoto"
import {doWeSwapDate, getMonthFromString, getCurrentDateObject, addDays} from "../components/DateFunctions"
import {getEventName, removeAccents, translateDateRange, attemptToTranslateItem, capitalize, getSettingsString, attemptToTranslate, translateBirthday} from "../LoadJsonData"
import {getSpecialOccurrenceDate} from "../components/EventContainer"
import FastImage from '../components/FastImage';
import DelayInput from "react-native-debounce-input";
import {MailLink, ExternalLink, SubHeader, Paragraph} from "../components/Formattings"
import {LocaleConfig} from 'react-native-calendars';
import Header from "../components/Header"
import {VillagerPopupPopup} from "./HomePage"
import {specialEvents, isDateInRange} from "../components/DateFunctions"

export default class CalendarPage extends Component {
  constructor(item) {
    super(item);

    this.state = {
      items: {},
      itemsColor: {},
      viewList: false
    };
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  openVillagerPopup = (item) => {
    this.villagerPopupPopup?.setPopupVisible(true, item);
  }
  render() {
    LocaleConfig.locales['language'] = {
      monthNames: [attemptToTranslate('January'),attemptToTranslate('February'),attemptToTranslate('March'),attemptToTranslate('April'),attemptToTranslate('May'),attemptToTranslate('June'),attemptToTranslate('July'),attemptToTranslate('August'),attemptToTranslate('September'),attemptToTranslate('October'),attemptToTranslate('November'),attemptToTranslate('December')],
      monthNamesShort: [attemptToTranslate('Jan'),attemptToTranslate('Feb'),attemptToTranslate('Mar'),attemptToTranslate('Apr'),attemptToTranslate('May'),attemptToTranslate('Jun'),attemptToTranslate('Jul'),attemptToTranslate('Aug'),attemptToTranslate('Sep'),attemptToTranslate('Oct'),attemptToTranslate('Nov'),attemptToTranslate('Dec')],
      dayNames: [attemptToTranslate('Sunday'),attemptToTranslate('Monday'),attemptToTranslate('Tuesday'),attemptToTranslate('Wednesday'),attemptToTranslate('Thursday'),attemptToTranslate('Friday'),attemptToTranslate('Saturday')],
      dayNamesShort: [attemptToTranslate('Sun'),attemptToTranslate('Mon'),attemptToTranslate('Tue'),attemptToTranslate('Wed'),attemptToTranslate('Thu'),attemptToTranslate('Fri'),attemptToTranslate('Sat')],
      today: attemptToTranslate('Today')
    };
    LocaleConfig.defaultLocale = 'language';

    var viewAll = <View/>
    if(this.state.viewList){
      viewAll = <AllEventsList setPage={this.props.setPage}/>
    }
    return (<>
      <VillagerPopupPopup ref={(villagerPopupPopup) => this.villagerPopupPopup = villagerPopupPopup} setPage={this.props.setPage}/>
      {viewAll}
      <Agenda
        ref={(agenda) => this.agenda = agenda} 
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
      <BottomBar viewList={()=>{if(this.mounted){this.setState({viewList:!this.state.viewList})}}} viewToday={()=>{if(this.mounted){this.setState({viewList:false});} this.agenda.chooseDay(getCurrentDateObject())}} openAgenda={()=>{if(this.state.viewList && this.mounted){this.setState({viewList:false});}else{this.agenda.setScrollPadPosition(0, true); this.agenda.enableCalendarScrolling();}}}/>
    </>
    );
    
    
  }

  loadItems(day) {

    const styleRepeatEvent = {customStyles: {
      container: { borderWidth:1, borderColor: colors.lightDarkAccentHeavy2[global.darkMode]},
      text: {fontWeight: 'bold'}
    }}

    const styleImportantEvent = {customStyles: {
      container: { borderWidth:2, borderColor: colors.specialEventBackgroundHighlight[global.darkMode]},
      text: {fontWeight: 'bold'}
    }}

    const styleBirthdayEvent = {customStyles: {
      container: { borderWidth:2, borderColor: colors.specialEventBirthdayBackgroundHighlight[global.darkMode]},
      text: {fontWeight: 'bold'}
    }}

    setTimeout(() => {
      for (let i = -5; i < 50; i++) {
        const date = new Date();
        date.setDate(day.day + i);
        date.setMonth(day.month);
        date.setFullYear(day.year);
        const strTime = this.dateToString(date);
        const seasonData = require("../assets/data/data.json")["Seasons and Events"];
        const villagerData = require("../assets/data/data.json")["Villagers"];
        
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];

          villagerData.map( (villager, index)=>{
            if((date.getMonth()+1).toString()===(villager["Birthday"].split("/"))[0]&& date.getDate().toString()===(villager["Birthday"].split("/"))[1]){
              if(global.collectionList.includes("villagerCheckList"+villager["Name"])){
                this.state.items[strTime].push({
                  name: capitalize(translateBirthday(attemptToTranslateItem(villager["Name"]))),
                  time: "All day",
                  image: villager["Icon Image"],
                  color: ["#2195F33F","#006EB34D"],
                  type:"villager",
                  filter: villager,
                });
                this.state.itemsColor[strTime] = styleBirthdayEvent;
              } else {
                this.state.items[strTime].push({
                  name: capitalize(translateBirthday(attemptToTranslateItem(villager["Name"]))),
                  time: "All day",
                  image: villager["Icon Image"],
                  color: colors.white,
                  type:"villager",
                  filter: villager,
                });
              }
              
            }
          })

          specialEvents.map( (event, index)=>{
            var eventDay = getSpecialOccurrenceDate(date.getFullYear(), index, specialEvents);
            if(eventDay[0]===date.getDate() && eventDay[1]===date.getMonth()){
              if(!event["Name"].includes("ireworks")){
                this.state.items[strTime].push({
                  name: capitalize(event["Name"]),
                  time: getSettingsString("settingsUse24HourClock") === "true" ? event["Time24"] : event["Time"],
                  image: event["Name"],
                  color: colors.specialEventBackground,
                  type:"filter",
                  filter:event["Name"]
                });
                this.state.itemsColor[strTime] = styleImportantEvent;
              } else {
                this.state.items[strTime].push({
                  name: capitalize(event["Name"]),
                  time: getSettingsString("settingsUse24HourClock") === "true" ? event["Time24"] : event["Time"],
                  image: event["Name"],
                  color: colors.white,
                  type:"filter",
                  filter:event["Name"]
                });
              }

            }
          })

          if(date.getDay()===0){
            this.state.items[strTime].push({
              name: 'Daisy Mae',
              time: getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 12:00" : "5 AM - 12 PM",
              image:"turnip.png",
              color: colors.white,
              type:"filter",
              filter:"Daisy Mae"
            });
            this.state.itemsColor[strTime] = styleRepeatEvent;
          } 

          //Check if there was a bug-off/fishing tourney the day before, then push K.K. pack one day
          var moveKKTo0 = false; //Day of the week to move to
          var moveKKTo1 = false; //Day of the week to move to
          var moveKK = false;
          var moveKKTo = 6;
          
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

          if ((date.getDay()===moveKKTo) && !moveKK){
            this.state.items[strTime].push({
              name: 'K.K. Slider',
              time: getSettingsString("settingsUse24HourClock") === "true" ? "18:00 - 24:00" : "6 PM - 12 AM",
              image:"music.png",
              color: colors.white,
              type:"filter",
              filter:"K.K. concert"
            });
            if(this.state.itemsColor[strTime]===undefined){
              this.state.itemsColor[strTime] = styleRepeatEvent;
            }
          }

          seasonData.map( (event, index)=>{
            var eventName = getEventName(event["Name"])
            if(event["Dates (Northern Hemisphere)"]!=="NA" && getSettingsString("settingsNorthernHemisphere")==="true"){
              if(isDateInRange(event["Dates (Northern Hemisphere)"], date.getFullYear(), date)){
                this.state.items[strTime].push({
                  name: capitalize(eventName),
                  time: event["Type"],
                  image: event["Name"],
                  color: colors.white,
                  type:"filter",
                  filter:event["Name"]
                });
              }
            } else if (event["Dates (Southern Hemisphere)"]!=="NA" && getSettingsString("settingsNorthernHemisphere")!=="true"){
              if(isDateInRange(event["Dates (Southern Hemisphere)"], date.getFullYear(), date)){
                this.state.items[strTime].push({
                  name: capitalize(eventName),
                  time: event["Type"],
                  image: event["Name"],
                  color: colors.white,
                  type:"filter",
                  filter:event["Name"]
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
      if(this.mounted){
        this.setState({
          items: newItems
        });
      }
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
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+(item.filter===undefined?"00":"AF"), false)}
        onPress={()=>{
          if(item.filter!==undefined){
            if(item.hasOwnProperty("type") && item.type==="villager"){
              this.openVillagerPopup(item.filter)
            } else {
              this.props.setPage(23, true, item.filter)
            }
          }
        }}
      >
        <View style={{padding: 20, marginHorizontal: 10, marginVertical: 5,  flexDirection:"row", flex:1, alignItems: 'center', borderRadius: 10, backgroundColor:item.color[global.darkMode]}}>
          {image}
          <View style={{flex: 1, marginLeft: 18,}}>
            <TextFont bold={true} style={{fontSize: 20,color: colors.textBlack[global.darkMode]}}>{item.name}</TextFont>
            <TextFont style={{marginTop: 3,fontSize: 18,color: colors.textBlack[global.darkMode]}}>{item.time}</TextFont>
          </View>
        </View>
      </TouchableNativeFeedback>
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

  
  
}


class BottomBar extends Component {  
  render(){
    return <View style={{position:"absolute", zIndex:5, bottom:0, borderTopRightRadius: 20, borderTopLeftRadius: 20, flexDirection: "row", justifyContent:"space-evenly",elevation:5, backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode], width:Dimensions.get('window').width, height:45}}>
      <TouchableNativeFeedback onPress={()=>{this.props.viewToday(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}>
        <View style={{borderRadius: 10, borderWidth:3,borderColor:colors.lightDarkAccentHeavy2[global.darkMode],width:Dimensions.get('window').width/3, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <TextFont bold={true} style={{textAlign:"center", fontSize: 12,color: colors.textBlack[global.darkMode]}}>View Today</TextFont>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{this.props.openAgenda(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}>
        <View style={{borderRadius: 10, borderWidth:3,borderColor:colors.lightDarkAccentHeavy2[global.darkMode],width:Dimensions.get('window').width/3, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <TextFont bold={true} style={{textAlign:"center", fontSize: 12,color: colors.textBlack[global.darkMode]}}>Open Calendar</TextFont>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{this.props.viewList(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}>
        <View style={{borderRadius: 10, borderWidth:3,borderColor:colors.lightDarkAccentHeavy2[global.darkMode],width:Dimensions.get('window').width/3, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <TextFont bold={true} style={{textAlign:"center", fontSize: 12,color: colors.textBlack[global.darkMode]}}>View All</TextFont>
        </View>
      </TouchableNativeFeedback>
    </View>
  }
}

class AllEventsList extends Component{
  constructor(item) {
    super(item);
    this.data = require("../assets/data/data.json")["Seasons and Events"];
    this.state = {
      searchData: this.data,
    };
  }

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  handleSearch = (text) => {
    if(text===""){
      if(this.mounted){
        this.setState({searchData: this.data})
      }
    } else {
      var outputData = [];
      this.data.map( (event, index)=>{
        var eventName = getEventName(event["Name"])
        if(removeAccents(eventName.toLowerCase()).includes(removeAccents(text.toLowerCase()))){
          outputData.push(event);
        } else if (attemptToTranslate(event["Type"]).toLowerCase().includes(text.toLowerCase())){
          outputData.push(event);
        }
      })
      if(this.mounted){
        this.setState({searchData:outputData});
      }
    }
  }

  headerHeight = Dimensions.get('window').height*0.3;
  scrollY = new Animated.Value(0);
  scrollYClamped = Animated.diffClamp(this.scrollY, 0, this.headerHeight/0.8); //or 1.5
  translateY = this.scrollYClamped.interpolate({
    inputRange: [0, this.headerHeight],
    outputRange: [0, -(this.headerHeight)],
  });

  render(){
    return(<>
      <View style={{backgroundColor:colors.background[global.darkMode], height:Dimensions.get('window').height, width:Dimensions.get('window').width}}>
        <Animated.View style={{width:Dimensions.get('window').width,position:"absolute", zIndex:1, transform: [{ translateY: this.translateY }]}}>
          <View style={{backgroundColor: colors.background[global.darkMode], flex: 1,justifyContent: 'flex-end',height:this.headerHeight,}}>
            <Header disableFilters={true} disableSearch={false} title={"Events"} headerHeight={this.headerHeight} updateSearch={this.handleSearch} appBarColor={colors.background[global.darkMode]} searchBarColor={colors.searchbarBG[global.darkMode]} titleColor={colors.textBlack[global.darkMode]}/>
          </View>
        </Animated.View>
        <Animated.FlatList
          onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: this.scrollY}}}],{useNativeDriver: true,},)}
          data={this.state.searchData}
          renderItem={({ item }) => <RenderItemFlatList item={item} setPage={this.props.setPage}/>}
          keyExtractor={(item, index) => `list-item-${index}-${item.["Unique Entry ID"]}`}
          contentContainerStyle={{paddingBottom:Dimensions.get('window').height}}
          style={{paddingTop:this.headerHeight}}
        />
      </View>
    </>
    )
  }
}

class RenderItemFlatList extends Component{
  render(){
    var item = this.props.item;
    var image = <View/>
    image = <Image style={{width: 50, height: 50, resizeMode:'contain',}} source={getPhoto(item.["Name"].toLowerCase(), item.["Type"].toLowerCase())}/>
    var date = "";
    if(item["Dates (Northern Hemisphere)"]!=="NA" && getSettingsString("settingsNorthernHemisphere")==="true"){
      date = item.["Dates (Northern Hemisphere)"];
    } else if (item["Dates (Southern Hemisphere)"]!=="NA" && getSettingsString("settingsNorthernHemisphere")!=="true"){
      date = item.["Dates (Southern Hemisphere)"];
    } 
    date = date.replace(/[^\x00-\x7F]/g, "-");
    date = date.replace("--", "- ");
    var dateComp;
    if(date!=="")
      dateComp = <TextFont style={{marginTop: 3,fontSize: 18,color: colors.textBlack[global.darkMode]}}>{capitalize(translateDateRange(date))}</TextFont>
    else 
      dateComp = <View/>
    
    var eventName = getEventName(item["Name"]);
    return(
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+(item["Name"]===undefined?"00":"AF"), false)}
        onPress={()=>{
          if(item["Name"]!==undefined){
            this.props.setPage(23, true, item["Name"])
          }
        }}
      >
        <View style={{width:Dimensions.get('window').width-20, flex: 1, backgroundColor: colors.white[global.darkMode], padding: 20, marginHorizontal: 10, marginVertical: 5,  flexDirection:"row", alignItems: 'center', borderRadius: 10}}>
          {image}
          <View style={{flex: 1, marginLeft:15}}>
            <TextFont bold={true} style={{fontSize: 20,color: colors.textBlack[global.darkMode]}}>{capitalize(eventName)}</TextFont>
            <TextFont style={{marginTop: 3,fontSize: 18,color: colors.textBlack[global.darkMode]}}>{capitalize(item["Type"])}</TextFont>
            {dateComp}
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
  
}
