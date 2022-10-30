import React, {Component, useEffect, useState} from 'react';
import {Animated, FlatList, TouchableNativeFeedback, Dimensions, Vibration, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import TextFont from '../components/TextFont';
import colors from '../Colors'
import {getPhoto} from "../components/GetPhoto"
import {doWeSwapDate, getMonthFromString, getCurrentDateObject, addDays, getMonthShort, getDateStringMonthDay, getDateStringWeekMonthDay, getMonth, getWeekDayShort} from "../components/DateFunctions"
import {getEventName, removeAccents, translateDateRange, attemptToTranslateItem, capitalize, getSettingsString, attemptToTranslate, translateBirthday, allEventItemsCheck, convertTimeTo24Hours} from "../LoadJsonData"
import {EventContainer, getEventsDay, getSpecialOccurrenceDate, replaceEventNameForFilter} from "../components/EventContainer"
import FastImage from '../components/FastImage';
import {Header, MailLink, ExternalLink, SubHeader, Paragraph, HeaderNote} from "../components/Formattings"
import HeaderFlatList from "../components/Header"
import {VillagerPopupPopup} from "./HomePage"
import {specialEvents, isDateInRange} from "../components/DateFunctions"
import * as RootNavigation from '../RootNavigation.js';
import  {ScrollView} from 'react-native-gesture-handler'
import LottieView from 'lottie-react-native';
import Check from '../components/Check';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

//Note: to use Wix Agenda React Native - might to manually install package from repo as some resources may be missing from npm install

export default class CalendarPage extends Component {
  constructor(item) {
    super(item);
    this.state = {
      loadCalendar: false,
      loadAll: false,
      view:"today",
      currentEvents: [{"topHeader":""}],
      currentDay:getCurrentDateObject()
    };
    this.calculatedEvents = {"hello":"hello"}
    this.currentDayOffset = 0;
    this.eventSections = {
      "App notifications" : false,
      "Set Notification Time" : "",
      "Favorite Villager's Birthdays" : true,
      "Old Resident Villager's Birthdays" : true,
      "All Villager's Birthdays" : true,
      "K.K. Slider" : true,
      "Daisy Mae" : true,
      "Crafting Seasons" : true,
      "Nook Shopping Events" : true,
      "Shopping Seasons" : true,
      "Event Ready Days" : true,
      "Zodiac Seasons" : true,
      "Break2" : true,
      "Show End Day of Events" : true,
    }
  }
  componentDidMount() {
    this.mounted = true;
    this.appendEvents(getCurrentDateObject())
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  openVillagerPopup = (item) => {
    this.villagerPopupPopup?.setPopupVisible(true, item);
  }
  appendEvents = (date, reset=false) => {
    let currentEventsStart = this.state.currentEvents
    if(reset){
      currentEventsStart = [{"topHeader":""}]
    }
    let newDate = addDays(date,this.currentDayOffset)
    let currentEvents = [...currentEventsStart, {"dateBreak":getDateStringWeekMonthDay(newDate)},...getEventsDay(newDate, this.eventSections, true)]
    this.currentDayOffset=this.currentDayOffset+1;
    this.setState({currentEvents:currentEvents})
  }
  setCurrentDay = (date) => {
    getSettingsString("settingsEnableVibrations")==="true"? Vibration.vibrate(5) : "";
    this.currentDayOffset = 0
    this.setState({currentDay: new Date(date), currentEvents:[{"topHeader":""}], view:"today"})
    this.appendEvents(new Date(date),true)
  }
  scrollToTop = () => {
    setTimeout(async () => {
      this.flatList?.scrollToOffset({ animated: true, offset: 0 });
    },200)
  }
  addCalculatedEvent = (id, allEventItemsCheck) => {
    this.calculatedEvents[id] = allEventItemsCheck
  }
  getCalculatedEvent = (id) => {
    if(this.calculatedEvents[id]===undefined)
      return false
    else
      return this.calculatedEvents[id]
  }
  render() {
    let viewList = <></>
    if(this.state.view==="list"){
      viewList =  <AllEventsList setPage={this.props.setPage}/>
    }
    let viewCalendar = <></>
    if(this.state.loadCalendar){
      viewCalendar = <View style={[(this.state.view==="today" || this.state.view==="list") && {display: 'none'}]}><CalendarView scrollToTop={this.scrollToTop} eventSections={this.eventSections} currentDate={getCurrentDateObject()} setCurrentDay={this.setCurrentDay}/></View>
    }
    return (<>
      <VillagerPopupPopup ref={(villagerPopupPopup) => this.villagerPopupPopup = villagerPopupPopup} setPage={this.props.setPage}/>
      {viewCalendar}
      {viewList}
      <FlatList
        ref={(flatList) => this.flatList = flatList}
        data={this.state.currentEvents}
        renderItem={({item}) => {
          if(item["topHeader"]!==undefined){
            return <Header style={{marginHorizontal:20, marginTop: 100}}>Events</Header>
          }
          if(item["dateBreak"]!==undefined){
            return <SubHeader margin={false} style={{marginLeft:15, fontSize:25,marginTop:17,marginBottom:8}}>{item["dateBreak"]}</SubHeader>
          }
          return <EventContainer 
            openVillagerPopup={this.openVillagerPopup}
            setPage={this.props.setPage}
            backgroundColor={colors.eventBackground[global.darkMode]}
            textColor={colors.textBlack[global.darkMode]}
            event={item}
            showDate={false}
            getCalculatedEvent={this.getCalculatedEvent}
            addCalculatedEvent={this.addCalculatedEvent}
            key={item.name}
          />
        }}
        windowSize={5}
        keyExtractor={(item, index) => `list-item2-${index}`}
        contentContainerStyle={{paddingBottom:Dimensions.get('window').height}}
        style={{}}
        onEndReached={()=>{this.appendEvents(this.state.currentDay)}}
        onEndReachedThreshold={0.9}
      />
      <BottomBar 
        viewList={()=>{if(this.mounted){this.setState({loadAll:true, view:"list"});}}}
        viewToday={()=>{if(this.mounted){this.setState({loadList:true, view:"today"});}}}
        openCalendar={()=>{if(this.mounted){this.setState({loadCalendar:true, view:"calendar"});}}}/>
    </>
    );    
  }

}

function firstDayInMonth(date) {
  let d = new Date(date);
  d.setDate(1);
  return d;
}

class CalendarView extends Component{
  constructor(props) {
    super(props);

    this.state = {
      monthOffset:0,
      allowedToSwipe:true,
      currentDate:this.props.currentDate,
      eventColors:[],
      eventColorsHeavy:[],
      importantEvents:[],
      todayDate:[]
    };
  }

  startTimeout = () => {
    getSettingsString("settingsEnableVibrations")==="true"? Vibration.vibrate(5) : "";
    this.setState({eventColors:[], eventColorsHeavy:[], importantEvents:[], todayDate:[]})
    this.getCurrentMonthEventColors()
  }

  componentDidMount(){
    this.getCurrentMonthEventColors()
  }

  getCurrentMonthEventColors = () => {
    setTimeout(async () => {
      let currentMonth = this.state.currentDate.getMonth()+1
      let currentYear = this.state.currentDate.getFullYear()
      let amountOfDays = new Date(currentYear, currentMonth, 0).getDate();
      let eventColors = []
      let eventColorsHeavy = []
      let importantEvents = []
      let todayDate = []
      for(let day = 0; day<amountOfDays+1; day++){
        let currentEventColors = []
        let currentEventColorsHeavy = []
        let eventsForDay = getEventsDay(addDays(firstDayInMonth(this.state.currentDate),day-1), this.props.eventSections, true)
        let currentImportantEvents = false
        let currentTodayDate = false
        if(this.state.currentDate.getMonth() === getCurrentDateObject().getMonth() && currentYear === getCurrentDateObject().getFullYear() && day === getCurrentDateObject().getDate()){
          currentTodayDate = true
        }
        for(let event = 0; event<eventsForDay.length; event++){
          if(eventsForDay[event]["color"]===undefined){
            continue
          }
          if(!currentEventColors.includes(eventsForDay[event]["color"])){
            currentEventColors.push(eventsForDay[event]["color"])
            currentEventColorsHeavy.push(eventsForDay[event]["colorHeavy"])
          }
          if(eventsForDay[event]["important"]===true){
            currentImportantEvents = true
          }
        }
        eventColors.push(currentEventColors)
        eventColorsHeavy.push(currentEventColorsHeavy)
        importantEvents.push(currentImportantEvents)
        todayDate.push(currentTodayDate)
      }
      this.setState({eventColors:eventColors, eventColorsHeavy:eventColorsHeavy, importantEvents: importantEvents, todayDate: todayDate})
    }, 10)
  }

  render(){
    let marginHorizontal = 20
    let currentMonth = this.state.currentDate.getMonth()+1
    let currentYear = this.state.currentDate.getFullYear()
    let monthDayStart = firstDayInMonth(this.state.currentDate).getDay();
    let amountOfDays = new Date(currentYear, currentMonth, 0).getDate();
    let daysList = [-1000,-1001,-1002,-1003,-1004,-1005,-1006] //-1000 indicates it is the day of week header
    for(let day = 1-monthDayStart; day<amountOfDays+1; day++){
      daysList.push(day)
    }
    let windowWidth = Dimensions.get('window').width;
    if(windowWidth>Dimensions.get('window').height)
      windowWidth = Dimensions.get('window').height;
    
    //Split up the list into rows of 7 days, to avoid flex box wrap weirdness
    let daysListIn7 = []
    let currentDaysList = []
    let counter = 1
    for(let i = 0; i < daysList.length; i++){
      currentDaysList.push(daysList[i])
      if(counter >= 7){
        daysListIn7.push(currentDaysList)
        currentDaysList = []
        counter = 0
      }
      counter++
    }
    if(currentDaysList!==[]){
      daysListIn7.push(currentDaysList)
    }
    return <View style={{backgroundColor:colors.background[global.darkMode], height:Dimensions.get('window').height, width:Dimensions.get('window').width}}>
      <ScrollView>
        <View>
          <View style={{height:Dimensions.get('window').height/6-80}}/>
          <View style={{justifyContent:"center", alignItems:'center'}}>
            <View style={{alignItems:"center", marginTop: 100, flexDirection:"row",justifyContent:"space-between", width:windowWidth-marginHorizontal*2}}>
              <TouchableOpacity style={{zIndex:5, justifyContent:"center", alignItems:"center",padding:10, borderRadius:8, backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode]}} activeOpacity={0.6} 
                onPress={()=>{
                  if(this.state.eventColors[0]!==undefined){
                    this.setState({allowedToSwipe:false, currentDate:new Date(this.state.currentDate.setMonth(this.state.currentDate.getMonth()-1))})
                    this.startTimeout()
                  }
                }}
              >
                <Image
                  style={{width:20,height:20,resizeMode:'contain',}}
                  source={global.darkMode ? require("../assets/icons/leftArrowWhite.png") : require("../assets/icons/leftArrow.png")}
                />
              </TouchableOpacity>
              <Header style={{marginHorizontal:0, fontSize: 28,position:"absolute", textAlign:"center", width:"100%", zIndex: 0}}>{attemptToTranslate(getMonth(this.state.currentDate.getMonth())) + " " + currentYear.toString()}</Header>
              <TouchableOpacity style={{zIndex:5, justifyContent:"center", alignItems:"center",padding:10, borderRadius:8, backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode]}} activeOpacity={0.6} 
                onPress={()=>{
                  if(this.state.eventColors[0]!==undefined){
                    this.setState({allowedToSwipe:false, currentDate:new Date(this.state.currentDate.setMonth(this.state.currentDate.getMonth()+1))})
                    this.startTimeout()
                  }
                }}
              >
                <Image
                  style={{width:20,height:20,resizeMode:'contain',}}
                  source={global.darkMode ? require("../assets/icons/rightArrowWhite.png") : require("../assets/icons/rightArrow.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{height:10}}/>
            <View style={{maxWidth:windowWidth}}>
              <View style={{display:"flex",flexDirection:"column",}}>
                {daysListIn7.map((daysList)=>{
                  return <View style={{display:"flex",flexDirection:"row"}}>
                    {daysList.map((item)=>{
                      if(item<=-1000){
                        return <View key={item} style={{width:((windowWidth-marginHorizontal*2-70)/7), height: 20, alignItems:"center", justifyContent:"center", margin:5}}>
                          <SubHeader numberOfLines={1} margin={false} style={{fontSize:11}}>{getWeekDayShort((item+1000)*-1)}</SubHeader>
                        </View>
                      }
                      if(item<1){
                        return <View key={item} style={{width:((windowWidth-marginHorizontal*2-70)/7), height: 50, alignItems:"center", justifyContent:"center", margin:5}}>
                        </View>
                      }
                      return <TouchableOpacity key={item} activeOpacity={0.6} onPress={()=>{this.props.setCurrentDay(new Date(this.state.currentDate).setDate(item)); this.props.scrollToTop()}}>
                        <View style={{borderRadius:10,borderWidth: 1.3, borderColor: this.state.todayDate[item] ? colors.textBlack[global.darkMode] : (this.state.importantEvents[item]?(this.state.eventColorsHeavy[item]!==undefined?this.state.eventColorsHeavy[item][0]:"transparent"):"transparent"),backgroundColor:this.state.eventColors[item]!==undefined?this.state.eventColors[item][0]:"transparent", width:((windowWidth-marginHorizontal*2-70)/7), height: 50, alignItems:"center", justifyContent:"center", margin:5}}>
                          <SubHeader margin={false} style={{fontSize:15}}>{item.toString()}</SubHeader>
                          <View style={{flexDirection:"row", position:"absolute", bottom:7}}>
                            {this.state.eventColors[item]!==undefined?
                            this.state.eventColorsHeavy[item].map((item)=>{
                              return <View key={item+10000} style={{borderRadius:10,backgroundColor:item, width:5, height: 5, marginHorizontal:2}}/>
                            })
                            :<View/>}
                          </View>
                        </View>
                      </TouchableOpacity>
                    })}
                  </View>
                })}
              </View>
            </View>
            <View style={{height:10}}/>
            {this.state.eventColors[0]===undefined?
              <LottieView autoPlay loop
                style={{width: 90, zIndex:1,transform: [{ scale: 1 },{ rotate: '0deg'},],}}
                source={require('../assets/loading.json')}
              />:<View/>
            }
            {this.state.eventColors[0]!==undefined?<>
              <View style={{height:20}}/>
              <LegendEntry name="Favorite Villager's Birthdays" color={colors.specialEventBirthdayBackgroundHeavy[global.darkMode]}/>
              <LegendEntry name="Old Resident Villager's Birthdays" color={colors.specialEventResidentBirthdayBackgroundHeavy[global.darkMode]}/>
              <LegendEntry name="Special Event" color={colors.specialEventBackgroundHeavy[global.darkMode]}/>
              <LegendEntry name="Event Starts" color={colors.startEventBackgroundHeavy[global.darkMode]}/>
              <LegendEntry name="Event Ends" color={colors.warningEventBackgroundHeavy[global.darkMode]}/>
              <View style={{height:Dimensions.get('window').height/6-10}}/>
              </>:<View/>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  }
}

class LegendEntry extends Component{
  render(){
    let marginHorizontal = 20
    let windowWidth = Dimensions.get('window').width;
    if(windowWidth>Dimensions.get('window').height)
      windowWidth = Dimensions.get('window').height;
    return <View style={{flexDirection:"row",width:(windowWidth-marginHorizontal*2-10), alignItems:'center', marginBottom:5}}>
      <View style={{borderRadius:10,backgroundColor:this.props.color, width:17, height: 17}}/>
      <Header bold={false} style={{marginHorizontal:5, fontSize:14, marginBottom:2}}>{this.props.name}</Header>
    </View>
  }
}


class BottomBar extends Component {  
  render(){
    return <View style={{position:"absolute", zIndex:5, bottom:0, borderTopRightRadius: 10, borderTopLeftRadius: 10, flexDirection: "row", justifyContent:"space-evenly",elevation:5, backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode], width:Dimensions.get('window').width, height:45}}>
      <TouchableOpacity onPress={()=>{this.props.viewToday(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
        <View style={{paddingHorizontal: 8, borderRadius: 10, borderWidth:3,borderColor:colors.lightDarkAccentHeavy2[global.darkMode],width:Dimensions.get('window').width/3, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <TextFont bold={true} style={{textAlign:"center", fontSize: 12,color: colors.textBlack[global.darkMode]}}>View List</TextFont>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.props.openCalendar(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
        <View style={{paddingHorizontal: 8, borderRadius: 10, borderWidth:3,borderColor:colors.lightDarkAccentHeavy2[global.darkMode],width:Dimensions.get('window').width/3, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <TextFont bold={true} style={{textAlign:"center", fontSize: 12,color: colors.textBlack[global.darkMode]}}>Open Calendar</TextFont>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{this.props.viewList(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
        <View style={{paddingHorizontal: 8, borderRadius: 10, borderWidth:3,borderColor:colors.lightDarkAccentHeavy2[global.darkMode],width:Dimensions.get('window').width/3, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <TextFont bold={true} style={{textAlign:"center", fontSize: 12,color: colors.textBlack[global.darkMode]}}>View All</TextFont>
        </View>
      </TouchableOpacity>
    </View>
  }
}

class AllEventsList extends Component{
  constructor(item) {
    super(item);
    this.data = require("../assets/data/DataCreated/Seasons and Events.json");
    this.state = {
      searchData: this.data,
    };
    this.calculatedEvents = {}
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
        if(removeAccents(eventName.toString().toLowerCase()).includes(removeAccents(text.toString().toLowerCase()))){
          outputData.push(event);
        } else if (attemptToTranslate(event["Type"]).toString().toLowerCase().includes(text.toString().toLowerCase())){
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

  addCalculatedEvent = (id, allEventItemsCheck) => {
    this.calculatedEvents[id] = allEventItemsCheck
  }
  getCalculatedEvent = (id) => {
    if(this.calculatedEvents[id]===undefined)
      return false
    else
      return this.calculatedEvents[id]
  }

  render(){
    return(<>
      <View style={{backgroundColor:colors.background[global.darkMode], height:Dimensions.get('window').height, width:Dimensions.get('window').width}}>
        <Animated.View style={{width:Dimensions.get('window').width,position:"absolute", zIndex:1, transform: [{ translateY: this.translateY }]}}>
          <View style={{backgroundColor: colors.background[global.darkMode], flex: 1,justifyContent: 'flex-end',height:this.headerHeight,}}>
            <HeaderFlatList disableFilters={true} disableSearch={false} title={"Events"} headerHeight={this.headerHeight} updateSearch={this.handleSearch} appBarColor={colors.background[global.darkMode]} searchBarColor={colors.searchbarBG[global.darkMode]} titleColor={colors.textBlack[global.darkMode]}/>
          </View>
        </Animated.View>
        <Animated.FlatList
          onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: this.scrollY}}}],{useNativeDriver: true,},)}
          data={this.state.searchData}
          renderItem={({ item }) => <RenderItemFlatList addCalculatedEvent={this.addCalculatedEvent} getCalculatedEvent={this.getCalculatedEvent} item={item} setPage={this.props.setPage} key={item["Unique Entry ID"]}/>}
          keyExtractor={(item, index) => `list-item-${index}-${item["Unique Entry ID"]}`}
          contentContainerStyle={{paddingBottom:Dimensions.get('window').height}}
          style={{paddingTop:this.headerHeight}}
        />
      </View>
    </>
    )
  }
}



export function RenderItemFlatList(props){
  const [allCollected, setAllCollected] = useState(false);
  let onlyUpdateMe = false
  let eventFilter = replaceEventNameForFilter(props.item["Name"])

  useFocusEffect(
    React.useCallback(() => {
      if(onlyUpdateMe){
        let result = allEventItemsCheck(eventFilter)
        if(props.addCalculatedEvent){
          props.addCalculatedEvent(eventFilter, result)
        }
        setAllCollected(result)
        onlyUpdateMe = false
      }
    },)
  );

  useEffect(() => {
    if(allCollected===false){
      let result = false
      if(props.getCalculatedEvent){
        result = props.getCalculatedEvent(eventFilter)
      }
      if(result===false){
        result = allEventItemsCheck(eventFilter)
        if(props.addCalculatedEvent){
          props.addCalculatedEvent(eventFilter, result)
        }
      }
      if(result!==false){
        setAllCollected(result)
      }
      onlyUpdateMe = false
    }
  })
  
  let item = props.item;
  let image = <View/>
  if(props.event?.image.startsWith("http")){
    image = <FastImage style={{width:65, height:65, resizeMode:'contain',}} source={{uri:allCollected[1]["Image"]}} cacheKey={allCollected[1]["Image"]}/>
  } else {
    let photoGot = getPhoto(item["Name"].toString().toLowerCase(), item["Type"].toString().toLowerCase(), true)
    if(photoGot===false && item["Type"]?.toString().toLowerCase()==="nook shopping event" && allCollected[1]!==false && allCollected[1]!==undefined && allCollected[1]["Image"]!==undefined){
      image = <FastImage style={{width:65, height:65, resizeMode:'contain',}} source={{uri:allCollected[1]["Image"]}} cacheKey={allCollected[1]["Image"]}/>
    } else if(photoGot===false && item["Type"]?.toString().toLowerCase()==="nook shopping event" && allCollected[1]!==false && allCollected[1]!==undefined && allCollected[1]["Closet Image"]!==undefined){
      image = <FastImage style={{width:65, height:65, resizeMode:'contain',}} source={{uri:allCollected[1]["Closet Image"]}} cacheKey={allCollected[1]["Closet Image"]}/>
    } else if(photoGot===false && item["Type"]?.toString().toLowerCase()==="nook shopping event" && allCollected[1]!==false && allCollected[1]!==undefined && allCollected[1]["Inventory Image"]!==undefined){
      image = <FastImage style={{width:65, height:65, resizeMode:'contain', margin:-7.5}} source={{uri:allCollected[1]["Inventory Image"]}} cacheKey={allCollected[1]["Inventory Image"]}/>
    } else {
      if(photoGot===false){
        photoGot = getPhoto(item["Name"].toString().toLowerCase(), item["Type"].toString().toLowerCase())
      }
      image = <Image style={{width: 50, height: 50, resizeMode:'contain', marginHorizontal: 7.5}} source={photoGot}/>
    }
  }
  
  var date = "";
  if(item[getCurrentDateObject().getFullYear().toString() + " NH"]!=="NA" && getSettingsString("settingsNorthernHemisphere")==="true"){
    date = item[getCurrentDateObject().getFullYear().toString() + " NH"];
  } else if (item[getCurrentDateObject().getFullYear().toString() + " SH"]!=="NA" && getSettingsString("settingsNorthernHemisphere")!=="true"){
    date = item[getCurrentDateObject().getFullYear().toString() + " SH"];
  } 
  if(date===undefined){
    date = ""
  }
  date = date.replace(/[^\x00-\x7F]/g, "-");
  date = date.replace("--", "- ");
  var dateComp;
  if(date!=="")
    dateComp = <TextFont style={{marginTop: 2,fontSize: 18,color: colors.textBlack[global.darkMode]}}>{capitalize(translateDateRange(date))}</TextFont>
  else 
    dateComp = <View/>

  let timeComp
  let time = item["Start Time"]!==undefined && item["End Time"]!==undefined && item["Start Time"]!=="5:00 AM" ? convertTimeTo24Hours(item["Start Time"])+" - "+convertTimeTo24Hours(item["End Time"]) : ""
  if(time!==""){
    timeComp = <TextFont style={{marginTop: -2,fontSize: 15,color: colors.textBlack[global.darkMode]}}>{time}</TextFont>
  } else {
    timeComp = <View/>
  }
  
  var eventName = getEventName(item["Name"]);

  return(
    <TouchableNativeFeedback 
      background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+(item["Name"]===undefined?"00":"AF"), false)}
      onPress={()=>{
        if(item["Name"]!==undefined){
          RootNavigation.navigate('23', {propsPassed:replaceEventNameForFilter(item["Name"])});
          onlyUpdateMe = true
        }
      }}
    >
      <View style={{width:Dimensions.get('window').width-20, flex: 1, backgroundColor: colors.white[global.darkMode], padding: 20, marginHorizontal: 10, marginVertical: 5,  flexDirection:"row", alignItems: 'center', borderRadius: 10}}>
        <View style={{position:'absolute', right: -18, top: -18, zIndex:10}}>
          {allCollected[0]===true?<Check play={allCollected[0]} width={53} height={53}/>:<View/>}
        </View>
        {image}
        <View style={{flex: 1, marginLeft:15}}>
          <TextFont bold={true} style={{fontSize: 20,color: colors.textBlack[global.darkMode]}}>{capitalize(eventName)}</TextFont>
          <TextFont style={{marginTop: 3,fontSize: 18,color: colors.textBlack[global.darkMode]}}>{capitalize(item["Type"])}</TextFont>
          {dateComp}
          {timeComp}
        </View>
      </View>
    </TouchableNativeFeedback>
  )
  
}
