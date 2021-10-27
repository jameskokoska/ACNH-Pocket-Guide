import React, {Component} from 'react';
import {Animated, FlatList, TouchableNativeFeedback, Dimensions, Vibration, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import TextFont from '../components/TextFont';
import colors from '../Colors'
import {getPhoto} from "../components/GetPhoto"
import {doWeSwapDate, getMonthFromString, getCurrentDateObject, addDays, getMonthShort, getDateStringMonthDay, getDateStringWeekMonthDay, getMonth, getWeekDayShort} from "../components/DateFunctions"
import {getEventName, removeAccents, translateDateRange, attemptToTranslateItem, capitalize, getSettingsString, attemptToTranslate, translateBirthday} from "../LoadJsonData"
import {EventContainer, getEventsDay, getSpecialOccurrenceDate} from "../components/EventContainer"
import FastImage from '../components/FastImage';
import DelayInput from "react-native-debounce-input";
import {Header, MailLink, ExternalLink, SubHeader, Paragraph, HeaderNote} from "../components/Formattings"
import {LocaleConfig} from 'react-native-calendars';
import HeaderFlatList from "../components/Header"
import {VillagerPopupPopup} from "./HomePage"
import {specialEvents, isDateInRange} from "../components/DateFunctions"
import * as RootNavigation from '../RootNavigation.js';
import  {PanGestureHandler,ScrollView} from 'react-native-gesture-handler'
import LottieView from 'lottie-react-native';

//Note: to use Wix Agenda React Native - might to manually install package from repo as some resources may be missing from npm install

export default class CalendarPage extends Component {
  constructor(item) {
    super(item);

    this.state = {
      viewList: false,
      currentEvents: [{"topHeader":""}],
      currentDay:getCurrentDateObject()
    };
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
    this.currentDayOffset = 0
    this.setState({currentDay: new Date(date), currentEvents:[{"topHeader":""}], viewList:"today"})
    this.appendEvents(new Date(date),true)
  }
  render() {
    var viewList = <View/>
    if(this.state.viewList==="list"){
      viewList = <AllEventsList setPage={this.props.setPage}/>
    } else if (this.state.viewList==="calendar"){
      viewList = <CalendarView eventSections={this.eventSections} currentDate={getCurrentDateObject()} setCurrentDay={this.setCurrentDay}/>
    }
    return (<>
      <VillagerPopupPopup ref={(villagerPopupPopup) => this.villagerPopupPopup = villagerPopupPopup} setPage={this.props.setPage}/>
      {viewList}
      <FlatList
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
        viewList={()=>{if(this.mounted){this.setState({viewList:"list"});}}}
        viewToday={()=>{if(this.mounted){this.setState({viewList:"today"});}}}
        openCalendar={()=>{if(this.mounted){this.setState({viewList:"calendar"});}}}/>
    </>
    );    
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
      importantEvents:[]
    };
  }

  startTimeout = () => {
    setTimeout(async () => {
      this.setState({allowedToSwipe:true})
    }, 300)
    this.setState({eventColors:[], eventColorsHeavy:[], importantEvents:[]})
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
      for(let day = 0; day<amountOfDays+1; day++){
        let currentEventColors = []
        let currentEventColorsHeavy = []
        let eventsForDay = getEventsDay(addDays(firstDayInMonth(this.state.currentDate),day-1), this.props.eventSections, true)
        let currentImportantEvents = false
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
      }
      this.setState({eventColors:eventColors, eventColorsHeavy:eventColorsHeavy, importantEvents: importantEvents})
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
    return <View style={{backgroundColor:colors.background[global.darkMode], height:Dimensions.get('window').height, width:Dimensions.get('window').width}}>
      <ScrollView>
        <PanGestureHandler 
        activeOffsetX={[-10, 10]}
          onGestureEvent={({ nativeEvent: { translationX, velocityX } }) => {
            if(this.state.allowedToSwipe){
              if(velocityX<-1200){
                this.setState({allowedToSwipe:false, currentDate:new Date(this.state.currentDate.setMonth(this.state.currentDate.getMonth()+1))})
                this.startTimeout()
              }
              if(velocityX>1200){
                this.setState({allowedToSwipe:false, currentDate:new Date(this.state.currentDate.setMonth(this.state.currentDate.getMonth()-1))})
                this.startTimeout()
              }
            }
          }}
        >
          <View>
            <View style={{height:Dimensions.get('window').height/6-80}}/>
            <View style={{justifyContent:"center", alignItems:'center'}}>
              <View style={{flexDirection:"row"}}>
                <Header style={{fontSize: 38, marginHorizontal:20, marginTop: 100, width:((windowWidth-marginHorizontal*2-2))}}>{attemptToTranslate(getMonth(this.state.currentDate.getMonth())) + " " + currentYear.toString()}</Header>
              </View>
              <Header bold={false} style={{marginBottom:10, marginHorizontal:20, fontSize:13, width:((windowWidth-marginHorizontal*2-10))}}>Swipe left/right to change months</Header>
              <View style={{maxWidth:windowWidth,}}>
                <View style={{display:"flex",flexDirection:"row", overflow:"visible", flexWrap:"wrap", marginHorizontal:marginHorizontal}}>
                  {daysList.map((item)=>{
                    if(item<=-1000){
                      return <View key={item} style={{width:((windowWidth-marginHorizontal*2-70)/7), height: 20, alignItems:"center", justifyContent:"center", margin:5}}>
                        <SubHeader margin={false} style={{fontSize:11}}>{getWeekDayShort((item+1000)*-1)}</SubHeader>
                      </View>
                    }
                    if(item<1){
                      return <View key={item} style={{width:((windowWidth-marginHorizontal*2-70)/7), height: 50, alignItems:"center", justifyContent:"center", margin:5}}>
                      </View>
                    }
                    return <TouchableOpacity key={item} activeOpacity={0.6} onPress={()=>{this.props.setCurrentDay(new Date(this.state.currentDate).setDate(item))}}>
                      <View style={{borderRadius:10,borderWidth: 1.3, borderColor: this.state.importantEvents[item]?(this.state.eventColorsHeavy[item]!==undefined?this.state.eventColorsHeavy[item][0]:"transparent"):"transparent",backgroundColor:this.state.eventColors[item]!==undefined?this.state.eventColors[item][0]:"transparent", width:((windowWidth-marginHorizontal*2-70)/7), height: 50, alignItems:"center", justifyContent:"center", margin:5}}>
                        <SubHeader margin={false} style={{fontSize:15}}>{item.toString()}</SubHeader>
                        <View style={{flexDirection:"row", position:"absolute", bottom:7}}>
                          {this.state.eventColors[item]!==undefined?
                          this.state.eventColorsHeavy[item].map((item)=>{
                            return <View style={{borderRadius:10,backgroundColor:item, width:5, height: 5, marginHorizontal:2}}/>
                          })
                          :<View/>}
                        </View>
                      </View>
                    </TouchableOpacity>
                  })}
                </View>
              </View>
              <View style={{height:10}}/>
              {this.state.eventColors[0]===undefined?
                <LottieView autoPlay loop
                  style={{width: 100, zIndex:1,transform: [{ scale: 1 },{ rotate: '0deg'},],}}
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
        </PanGestureHandler>
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
    return <View style={{position:"absolute", zIndex:5, bottom:0, borderTopRightRadius: 20, borderTopLeftRadius: 20, flexDirection: "row", justifyContent:"space-evenly",elevation:5, backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode], width:Dimensions.get('window').width, height:45}}>
      <TouchableNativeFeedback onPress={()=>{this.props.viewToday(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}>
        <View style={{borderRadius: 10, borderWidth:3,borderColor:colors.lightDarkAccentHeavy2[global.darkMode],width:Dimensions.get('window').width/3, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <TextFont bold={true} style={{textAlign:"center", fontSize: 12,color: colors.textBlack[global.darkMode]}}>View Today</TextFont>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{this.props.openCalendar(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}>
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
            <HeaderFlatList disableFilters={true} disableSearch={false} title={"Events"} headerHeight={this.headerHeight} updateSearch={this.handleSearch} appBarColor={colors.background[global.darkMode]} searchBarColor={colors.searchbarBG[global.darkMode]} titleColor={colors.textBlack[global.darkMode]}/>
          </View>
        </Animated.View>
        <Animated.FlatList
          onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: this.scrollY}}}],{useNativeDriver: true,},)}
          data={this.state.searchData}
          renderItem={({ item }) => <RenderItemFlatList item={item} setPage={this.props.setPage}/>}
          keyExtractor={(item, index) => `list-item-${index}-${item["Unique Entry ID"]}`}
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
    image = <Image style={{width: 50, height: 50, resizeMode:'contain',}} source={getPhoto(item["Name"].toLowerCase(), item["Type"].toLowerCase())}/>
    var date = "";
    if(item["Dates (Northern Hemisphere)"]!=="NA" && getSettingsString("settingsNorthernHemisphere")==="true"){
      date = item["Dates (Northern Hemisphere)"];
    } else if (item["Dates (Southern Hemisphere)"]!=="NA" && getSettingsString("settingsNorthernHemisphere")!=="true"){
      date = item["Dates (Southern Hemisphere)"];
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
            // this.props.setPage(23, true, item["Name"])
            RootNavigation.navigate('23', {propsPassed:item["Name"]});
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
