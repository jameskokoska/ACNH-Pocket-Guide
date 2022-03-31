import React, {Component} from 'react';
import {Animated, FlatList,  Dimensions, Vibration, Image, StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import TextFont from '../components/TextFont';
import colors from '../Colors'
import {getPhoto} from "../components/GetPhoto"
import {doWeSwapDate, getMonthFromString, getCurrentDateObject, addDays, getMonthShort, getDateStringMonthDay, getDateStringWeekMonthDay, getMonth, getWeekDayShort} from "../components/DateFunctions"
import {getEventName, removeAccents, translateDateRange, attemptToTranslateItem, capitalize, getSettingsString, attemptToTranslate, translateBirthday} from "../LoadJsonData"
import {EventContainer, getEventsDay, getSpecialOccurrenceDate} from "../components/EventContainer"
import FastImage from '../components/FastImage';
import {Header, MailLink, ExternalLink, SubHeader, Paragraph, HeaderNote} from "../components/Formattings"
import HeaderFlatList from "../components/Header"
import {VillagerPopupPopup} from "./HomePage"
import {specialEvents, isDateInRange} from "../components/DateFunctions"
import * as RootNavigation from '../RootNavigation.js';
import  {ScrollView} from 'react-native-gesture-handler'
import LottieView from 'lottie-react-native';
import { TouchableNativeFeedback2 } from '../components/TouchableNativeFeedback';

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
    getSettingsString("settingsEnableVibrations")==="true"? Vibration.vibrate(5) : "";
    this.currentDayOffset = 0
    this.setState({currentDay: new Date(date), currentEvents:[{"topHeader":""}], viewList:"today"})
    this.appendEvents(new Date(date),true)
  }
  scrollToTop = () => {
    setTimeout(async () => {
      this.flatList?.scrollToOffset({ animated: true, offset: 0 });
    },200)
  }
  render() {
    var viewList = <View/>
    if(this.state.viewList==="list"){
      viewList = <AllEventsList setPage={this.props.setPage}/>
    } else if (this.state.viewList==="calendar"){
      viewList = <CalendarView scrollToTop={this.scrollToTop} eventSections={this.eventSections} currentDate={getCurrentDateObject()} setCurrentDay={this.setCurrentDay}/>
    }
    return (<>
      <VillagerPopupPopup ref={(villagerPopupPopup) => this.villagerPopupPopup = villagerPopupPopup} setPage={this.props.setPage}/>
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
              <Header style={{marginHorizontal:0, fontSize: 28,position:"absolute", textAlign:"center", width:"100%"}}>{attemptToTranslate(getMonth(this.state.currentDate.getMonth())) + " " + currentYear.toString()}</Header>
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
              Platform.OS != 'web' ? <LottieView autoPlay loop
                style={{width: 90, zIndex:1,transform: [{ scale: 1 },{ rotate: '0deg'},],}}
                source={require('../assets/loading.json')}
              /> : null :<View/>
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
    image = <Image style={{width: 50, height: 50, resizeMode:'contain',}} source={getPhoto(item["Name"].toString().toLowerCase(), item["Type"].toString().toLowerCase())}/>
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
      <TouchableNativeFeedback2 
        background={(colors.inkWell[global.darkMode]+(item["Name"]===undefined?"00":"AF"), false)}
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
      </TouchableNativeFeedback2>
    )
  }
  
}
