import React, {Component} from 'react';
import {Dimensions, TouchableOpacity, TextInput, StyleSheet, Text, View} from 'react-native';
import Clock from '../components/Clock';
import HomeContentArea from '../components/HomeContentArea';
import {EventContainer,getEventsDay} from '../components/EventContainer';
import StoreHoursContainer from '../components/StoreHoursContainer';
import ProgressContainer from '../components/ProgressContainer';
import LottieView from 'lottie-react-native';
import colors from '../Colors'
import {capitalize,countCollection} from "../LoadJsonData"
import TextFont from "../components/TextFont"
import ActiveCreatures from "../components/ActiveCreatures"
import CurrentVillagers from "../components/CurrentVillagers"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentDateObject} from '../components/DateFunctions';
import TodoList from '../components/TodoList';
import VisitorsList from '../components/VisitorsList';
import {getSettingsString} from "../LoadJsonData"
import { ScrollView } from 'react-native-gesture-handler';
import {PopupBottomCustom} from "../components/Popup"
import VillagerPopup from "../popups/VillagerPopup"


function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

class HomePage extends Component {
  constructor(props){
    super(props);
    this.scrollViewRef = React.createRef();
    this.openPopup = this.openPopup.bind(this);
  }
  openPopup(item){
    this.villagerPopupPopup.setPopupVisible(true, item);
  }
  render(){
    var fishCount = countCollection("fishCheckList");
    var fishPercentage = fishCount/80 * 100;
    var seaCount = countCollection("seaCheckList");
    var seaPercentage = seaCount/40 * 100;
    var bugsCount = countCollection("bugCheckList");
    var bugsPercentage = bugsCount/80 * 100;
    var fossilCount = countCollection("fossilCheckList");
    var fossilPercentage = fossilCount/73 * 100;
    var artCount = countCollection("artCheckList");
    var artPercentage = artCount/43 * 100;
    var musicCount = countCollection("songCheckList");
    var musicPercentage = musicCount/95 * 100;
    var emojipediaCount = countCollection("emojiCheckList");
    var emojipediaPercentage = emojipediaCount/global.dataLoadedReactions[0].length * 100;

    var todayEvents = getEventsDay(getCurrentDateObject());
    var tomorrowEvents = getEventsDay(addDays(getCurrentDateObject(), 1));
    var thisWeekEvents = [];
    for(var i=2; i<7; i++){
      thisWeekEvents = thisWeekEvents.concat(getEventsDay(addDays(getCurrentDateObject(), i)));
    }
    var todayTitle=<View/>
    if(todayEvents.length>0){
      todayTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>Today</TextFont>
    }
    var tomorrowTitle=<View/>
    if(tomorrowEvents.length>0){
      tomorrowTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>Tomorrow</TextFont>
    }
    var thisWeekTitle=<View/>
    if(thisWeekEvents.length>0){
      thisWeekTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>This Week</TextFont>
    }

    var landscape = <View style={{width:Dimensions.get('window').width, height: "100%", zIndex:1, position:'absolute', overflow: "hidden" }}><LottieView autoPlay loop style={{width: 425, height: 232, position:'absolute', top:30, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/home.json')}/></View>
    if(getCurrentDateObject().getMonth()===11||getCurrentDateObject().getMonth()===0){
      landscape = <View style={{width:Dimensions.get('window').width, height: "100%", zIndex:1, position:'absolute', overflow: "hidden" }}><LottieView autoPlay loop style={{width: 425, height: 232, position:'absolute', top:30, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/homeSnow.json')}/></View>
    } else if (todayEvents[0]!==undefined && (todayEvents[0]["Name"]==="Festivale" || todayEvents[0]["Name"].includes("Firework")) || todayEvents[1]!==undefined && (todayEvents[1]["Name"]==="Festivale" || todayEvents[1]["Name"].includes("Firework"))){
      landscape = <View style={{width:Dimensions.get('window').width, height: "100%", zIndex:1, position:'absolute', overflow: "hidden" }}><LottieView autoPlay loop style={{width: 425, height: 232, position:'absolute', top:30, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/homeCelebration.json')}/></View>
    }
    return <>
      <ScrollView ref={this.scrollViewRef}>
        <View style={{height:45}}/>
        <Clock/>
        <View style={{height:125}}/>
        <HomeContentArea backgroundColor={colors.sectionBackground1[global.darkMode]} accentColor={colors.eventsColor[global.darkMode]} title="Events" titleColor={colors.eventsColor[global.darkModeReverse]}>
          {todayTitle}
          {todayEvents.map( (event, index)=>
            <EventContainer 
              key={event["Name"]} 
              backgroundColor={colors.eventBackground[global.darkMode]}
              textColor={colors.textBlack[global.darkMode]}
              image={event["Image"]}
              text={event["Name"]}
              textBottom={capitalize(event["Time"])}
              month={event["Month"]} 
              day={event["Day Start"]}
            />
          )}
          {tomorrowTitle}
          {tomorrowEvents.map( (event, index)=>
            <EventContainer 
              key={event["Name"]} 
              backgroundColor={colors.eventBackground[global.darkMode]}
              textColor={colors.textBlack[global.darkMode]}
              image={event["Image"]}
              text={event["Name"]}
              textBottom={capitalize(event["Time"])}
              month={event["Month"]} 
              day={event["Day Start"]}
            />
          )}
          {thisWeekTitle}
          {thisWeekEvents.map( (event, index)=>
            <EventContainer 
              key={event["Name"]} 
              backgroundColor={colors.eventBackground[global.darkMode]}
              textColor={colors.textBlack[global.darkMode]}
              image={event["Image"]}
              text={event["Name"]}
              textBottom={capitalize(event["Time"])}
              month={event["Month"]} 
              day={event["Day Start"]}
            />
          )}
          <View style={{height: 30}}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground2[global.darkMode]} accentColor={colors.todoColor[global.darkMode]} title="To-Do" titleColor={colors.todoColor[global.darkModeReverse]}>
          <View style={{height: 15}}/>
          <TodoList/>
          <View style={{height: 15}}/>
        </HomeContentArea>
        {/* <HomeContentArea backgroundColor={colors.sectionBackground2[global.darkMode]} accentColor={colors.todoColor[global.darkMode]} title="Visitors" titleColor={colors.visitorsColor[global.darkModeReverse]}>
          <View style={{height: 15}}/>
          <VisitorsList/>
          <View style={{height: 15}}/>
        </HomeContentArea> */}
        <HomeContentArea backgroundColor={colors.sectionBackground1[global.darkMode]} accentColor={colors.collectionColor[global.darkMode]} title="Collection" titleColor={colors.collectionColor[global.darkModeReverse]}>
          <View style={{height: 15}}/>
          <ProgressContainer color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={fishPercentage} image={require("../assets/icons/fish.png")} text={"Fish " + fishCount + "/80"}/>
          <ProgressContainer color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={seaPercentage} image={require("../assets/icons/octopus.png")} text={"Sea Creatures " + seaCount + "/40"}/>
          <ProgressContainer color={colors.bugAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={bugsPercentage} image={require("../assets/icons/bugs.png")} text={"Bugs " + bugsCount + "/80"}/>
          <ProgressContainer color={colors.fossilAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={fossilPercentage} image={require("../assets/icons/bones.png")} text={"Fossils " + fossilCount + "/73"}/>
          <ProgressContainer color={colors.artAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={artPercentage} image={require("../assets/icons/colorPalette.png")} text={"Art " + artCount + "/43"}/>
          <ProgressContainer color={colors.musicAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={musicPercentage} image={require("../assets/icons/music.png")} text={"Songs " + musicCount + "/95"}/>
          <ProgressContainer color={colors.emojipediaAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={emojipediaPercentage} image={require("../assets/icons/emote.png")} text={"Emotes " + emojipediaCount + "/" + global.dataLoadedReactions[0].length.toString()}/>
          <View style={{height: 15}}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground2[global.darkMode]} accentColor={colors.profileColor[global.darkMode]} title="Profile" titleColor={colors.profileColor[global.darkModeReverse]}>
          <View style={{height: 37}}/>
          <View style={{alignItems:"center"}}>
            <TextInput
              allowFontScaling={false}
              style={{fontSize: 30, width:"100%", textAlign:"center", color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold"}}
              onChangeText={async (text) => {AsyncStorage.setItem("name", text); global.name=text; console.log(text)}}
              placeholder={"[Name]"}
              placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
              defaultValue={global.name}
              multiline={true}
            />
            <TextFont bold={true} style={{marginTop: 0, marginBottom: -8, color:colors.fishText[global.darkMode]}}>of</TextFont>
            <TextInput
              allowFontScaling={false}
              style={{fontSize: 30, width:"100%", color:colors.textBlack[global.darkMode], textAlign:"center", fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}}
              onChangeText={async (text) => {AsyncStorage.setItem("islandName", text); global.islandName=text}}
              placeholder={"[Island]"}
              placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
              defaultValue={global.islandName}
              multiline={true}
            />
            <TextFont bold={true} style={{marginTop: 0, marginBottom: 5, color:colors.fishText[global.darkMode]}}>Island</TextFont>
            <View style={{height: 5}}/>
            <TouchableOpacity onPress={() => this.props.setPage(13)}>
              <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{getSettingsString("settingsNorthernHemisphere")==="true" ? "Northern Hemisphere" : "Southern Hemisphere"}</TextFont>
            </TouchableOpacity>
          </View>
          <View style={{height: 30}}/>
          <CurrentVillagers openPopup={this.openPopup} setPage={this.props.setPage}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground1[global.darkMode]} accentColor={colors.storeHoursColor[global.darkMode]} title="Store Hours" titleColor={colors.storeHoursColor[global.darkModeReverse]}>
          <View style={{height: 15}}/>
          <StoreHoursContainer image={require("../assets/icons/nook.png")} text="Nook's Cranny" textBottom="8 AM - 10 PM" openHour={8} closeHour={22}/>
          <StoreHoursContainer image={require("../assets/icons/able.png")} text="Able Sisters" textBottom="9 AM - 9 PM" openHour={9} closeHour={21}/>
          <View style={{height: 15}}/>
        </HomeContentArea>
        <HomeContentArea backgroundColor={colors.sectionBackground2[global.darkMode]} accentColor={colors.activeCreaturesColor[global.darkMode]} title="Active Creatures" titleColor={colors.activeCreaturesColor[global.darkModeReverse]}>
          <ActiveCreatures scrollViewRef={this.scrollViewRef}/>
        </HomeContentArea>
      </ScrollView>
      <View style={{position:"absolute", width: "100%", height:"100%", zIndex:-5}}>
        {landscape}
        <View style={[styles.homeScreenBackgroundTop,{backgroundColor:colors.skyColor[global.darkMode]}]}>
        </View>
        <View style={[styles.homeScreenBackgroundBottom,{backgroundColor:colors.grassColor[global.darkMode]}]}>
        </View>
      </View>
      <VillagerPopupPopup ref={(villagerPopupPopup) => this.villagerPopupPopup = villagerPopupPopup}/>
    </>
  }
}
export default HomePage;

class VillagerPopupPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item:""
    };   
  }

  setPopupVisible = (visible, item) => {
    this.setState({item:item});
    this.popup.setPopupVisible(true);
  }

  render(){
    var villagerPopup = <View/>
    if(this.state.item!==undefined && this.state.item!==""){
      villagerPopup = <VillagerPopup item={this.state.item}/>
    }
    return(
      <PopupBottomCustom ref={(popup) => this.popup = popup}>
        <TextFont bold={true} style={{textAlign:"center",fontSize: 30, marginTop: 0, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{this.state.item.["Name"]}</TextFont>
        {villagerPopup}
      </PopupBottomCustom>
    )
  }
}

const styles = StyleSheet.create({
  dayHeader:{
    fontSize: 20,
    marginTop: 15,
    marginHorizontal: 20,
    marginBottom: 4,
  },
  homeScreenList: {
    alignItems: 'center',
    width: "100%"
  },
  homeScreenBackgroundTop: {
    height: 295,
    width: "100%",
    backgroundColor: "#4298f5",
  },
  homeScreenBackgroundBottom: {
    height: "70%",
    width: "100%",
    zIndex: 6,
  },
});