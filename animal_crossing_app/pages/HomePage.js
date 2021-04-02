import React, {Component} from 'react';
import {Vibration, Image, Dimensions, TouchableOpacity, TextInput, StyleSheet, Text, View} from 'react-native';
import Clock from '../components/Clock';
import HomeContentArea from '../components/HomeContentArea';
import {EventContainer,getEventsDay} from '../components/EventContainer';
import StoreHoursContainer from '../components/StoreHoursContainer';
import ProgressContainer from '../components/ProgressContainer';
import LottieView from 'lottie-react-native';
import colors from '../Colors'
import {setSettingsString, getCurrentVillagerNamesString, getInverseVillagerFilters, capitalize,countCollection,getStorage} from "../LoadJsonData"
import TextFont from "../components/TextFont"
import ActiveCreatures from "../components/ActiveCreatures"
import CurrentVillagers from "../components/CurrentVillagers"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentDateObject, doWeSwapDate} from '../components/DateFunctions';
import TodoList from '../components/TodoList';
import VisitorsList from '../components/VisitorsList';
import {translateIslandNameInputLabel2, translateIslandNameInputLabel1, getSettingsString, attemptToTranslate} from "../LoadJsonData"
import { ScrollView } from 'react-native-gesture-handler';
import Popup, {PopupBottomCustom} from "../components/Popup"
import VillagerPopup from "../popups/VillagerPopup"
import ToggleSwitch from 'toggle-switch-react-native'
import {SubHeader, Paragraph} from "../components/Formattings"
import FadeInOut from "../components/FadeInOut"
import {getMaterialImage} from "../components/GetPhoto"
import FastImage from "../components/FastImage"
import {cancelAllPushNotifications} from "../Notifications"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ButtonComponent from "../components/ButtonComponent"
import {SelectionImage} from "../components/Selections"

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

class HomePage extends Component {
  constructor(props){
    super(props);
    this.scrollViewRef = React.createRef();
    var eventSections = this.props.eventSections;
    if(eventSections["App notifications"]!==undefined){
      getSettingsString("settingsNotifications")==="true" ? eventSections["App notifications"]=true : eventSections["App notifications"]=false;
    }
    this.state = {sections:this.props.sections, eventSections:eventSections}
    this.refreshEvents();
  }
  refreshEvents = () => {
    cancelAllPushNotifications();
    this.todayEvents = getEventsDay(getCurrentDateObject(), this.state.eventSections);
    this.tomorrowEvents = getEventsDay(addDays(getCurrentDateObject(), 1), this.state.eventSections);
    this.thisWeekEvents = [];
    for(var i=2; i<7; i++){
      this.thisWeekEvents = this.thisWeekEvents.concat(getEventsDay(addDays(getCurrentDateObject(), i), this.state.eventSections));
    }
  }
  openVillagerPopup = (item) => {
    this.villagerPopupPopup.setPopupVisible(true, item);
  }
  setPages = async (checked,name) =>{
    var sections = this.state.sections;
    sections[name] = checked;
    this.setState({sections:sections});
    await AsyncStorage.setItem("Sections", JSON.stringify(sections));
  }

  setEventPages = async (checked,name) =>{
    var eventSections = this.state.eventSections;
    eventSections[name] = checked;
    this.setState({eventSections:eventSections});
    await AsyncStorage.setItem("EventSections", JSON.stringify(eventSections));
  }

  setLoadedToDo = (status) => {
    this.setState({loadedToDo: status})
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
    var recipeCount = countCollection("recipesCheckList");
    var recipePercentage = recipeCount/global.dataLoadedRecipes[0].length * 100;

    var todayTitle=<View/>
    if(this.todayEvents.length>0){
      todayTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>Today</TextFont>
    }
    var tomorrowTitle=<View/>
    if(this.tomorrowEvents.length>0){
      tomorrowTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>Tomorrow</TextFont>
    }
    var thisWeekTitle=<View/>
    if(this.thisWeekEvents.length>0){
      thisWeekTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>This Week</TextFont>
    }

    var landscape = <View style={{width:Dimensions.get('window').width, height: "100%", zIndex:1, position:'absolute', overflow: "hidden" }}><LottieView autoPlay loop style={{width: 425, height: 232, position:'absolute', top:30, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/home.json')}/></View>
    if(getCurrentDateObject().getMonth()===11||getCurrentDateObject().getMonth()===0){
      landscape = <View style={{width:Dimensions.get('window').width, height: "100%", zIndex:1, position:'absolute', overflow: "hidden" }}><LottieView autoPlay loop style={{width: 425, height: 232, position:'absolute', top:30, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/homeSnow.json')}/></View>
    } else if (this.todayEvents[0]!==undefined && (this.todayEvents[0].name==="Festivale" || this.todayEvents[0].name.includes("Firework")) || this.todayEvents[1]!==undefined && (this.todayEvents[1].name==="Festivale" || this.todayEvents[1].name.includes("Firework"))){
      landscape = <View style={{width:Dimensions.get('window').width, height: "100%", zIndex:1, position:'absolute', overflow: "hidden" }}><LottieView autoPlay loop style={{width: 425, height: 232, position:'absolute', top:30, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/homeCelebration.json')}/></View>
    }
    const sections = this.state.sections;
    return <View style={{height:"100%",width:"100%"}}>
      <PopupBottomCustom ref={(popupSettings) => this.popupSettings = popupSettings} onClose={()=>{}}>
        <ConfigureHomePages header={"Select Homepage Sections"} refreshEvents={()=>{this.refreshEvents()}} setPages={(checked,name)=>this.setPages(checked,name)} sections={this.state.sections}/>
      </PopupBottomCustom>
      <PopupBottomCustom ref={(popupEventsSettings) => this.popupEventsSettings = popupEventsSettings} onClose={()=>{}}>
        <ConfigureHomePages setPage={(page)=>this.props.setPage(page)} header={"Select Events"} refreshEvents={()=>{this.refreshEvents()}} setPages={(checked,name)=>this.setEventPages(checked,name)} sections={this.state.eventSections}/>
      </PopupBottomCustom>
        <ScrollView ref={this.scrollViewRef}>
          <View style={{height:45}}/>
          <Clock swapDate={doWeSwapDate()}/>
          <View style={{height:125}}/>
          <View style={{height:38}}>
            <TouchableOpacity style={{padding:10, paddingVertical:12, position:"absolute",right:0}} 
              onPress={()=>{this.popupSettings.setPopupVisible(true); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}
            }>
              <TextFont bold={false} style={{marginRight:10, color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"right"}}>{"Edit Sections"}</TextFont>
            </TouchableOpacity>
          </View>
          {/* If todo is the first page to be loaded, wait to fade in */}
          <FadeInOut fadeIn={this.state.sections!==""&&(this.state.sections["Events"] || this.state.loadedToDo===true || this.state.sections["To-Do"]===false)?true:false} duration={200} startValue={0} endValue={1} maxFade={1} minScale={0.9} >
            {sections["Events"]===true?<HomeContentArea backgroundColor={colors.sectionBackground1[global.darkMode]} accentColor={colors.eventsColor[global.darkMode]} title="Events" titleColor={colors.eventsColor[global.darkModeReverse]}>
              <TouchableOpacity style={{padding:10, paddingVertical:12, position:"absolute",right:0}} 
                onPress={()=>{this.popupEventsSettings.setPopupVisible(true); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}
              }>
                <TextFont bold={false} style={{marginRight:10, color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"right"}}>{"Edit Events"}</TextFont>
              </TouchableOpacity>
              {todayTitle}
              {this.todayEvents.map( (event, index)=>
                <EventContainer 
                  key={event.name+index} 
                  backgroundColor={colors.eventBackground[global.darkMode]}
                  textColor={colors.textBlack[global.darkMode]}
                  event={event}
                  eventSections={this.state.eventSections}
                />
              )}
              {tomorrowTitle}
              {this.tomorrowEvents.map( (event, index)=>
                <EventContainer 
                  key={event.name+index} 
                  backgroundColor={colors.eventBackground[global.darkMode]}
                  textColor={colors.textBlack[global.darkMode]}
                  event={event}
                  eventSections={this.state.eventSections}
                />
              )}
              {thisWeekTitle}
              {this.thisWeekEvents.map( (event, index)=>
                <EventContainer 
                  key={event.name+index} 
                  backgroundColor={colors.eventBackground[global.darkMode]}
                  textColor={colors.textBlack[global.darkMode]}
                  event={event}
                  eventSections={this.state.eventSections}
                />
              )}
              <View style={{height: 30}}/>
            </HomeContentArea>:<View/>}
            {sections["To-Do"]===true?<HomeContentArea backgroundColor={colors.sectionBackground2[global.darkMode]} accentColor={colors.todoColor[global.darkMode]} title="To-Do" titleColor={colors.todoColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <TodoList sections={sections} setLoadedToDo={this.setLoadedToDo}/>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>}
            {sections["Visitors"]===true?<HomeContentArea backgroundColor={colors.sectionBackground2[global.darkMode]} accentColor={colors.visitorsColor[global.darkMode]} title="Visitors" titleColor={colors.visitorsColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <VisitorsList/>
              <View style={{height: 25}}/>
            </HomeContentArea>:<View/>}
            {sections["Collection"]===true?<HomeContentArea backgroundColor={colors.sectionBackground1[global.darkMode]} accentColor={colors.collectionColor[global.darkMode]} title="Collection" titleColor={colors.collectionColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <ProgressContainer color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={fishPercentage} image={require("../assets/icons/fish.png")} text={attemptToTranslate("Fish") + " " + fishCount + "/80"}/>
              <ProgressContainer color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={seaPercentage} image={require("../assets/icons/octopus.png")} text={attemptToTranslate("Sea Creatures") + " " + seaCount + "/40"}/>
              <ProgressContainer color={colors.bugAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={bugsPercentage} image={require("../assets/icons/bugs.png")} text={attemptToTranslate("Bugs") + " " + bugsCount + "/80"}/>
              <ProgressContainer color={colors.fossilAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={fossilPercentage} image={require("../assets/icons/bones.png")} text={attemptToTranslate("Fossils") + " " + fossilCount + "/73"}/>
              <ProgressContainer color={colors.artAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={artPercentage} image={require("../assets/icons/colorPalette.png")} text={attemptToTranslate("Art") + " " + artCount + "/43"}/>
              <ProgressContainer color={colors.musicAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={musicPercentage} image={require("../assets/icons/music.png")} text={attemptToTranslate("Songs") + " " + musicCount + "/95"}/>
              <ProgressContainer color={colors.emojipediaAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={emojipediaPercentage} image={require("../assets/icons/emote.png")} text={attemptToTranslate("Emotes") + " " + emojipediaCount + "/" + global.dataLoadedReactions[0].length.toString()}/>
              <ProgressContainer color={colors.toolsAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={recipePercentage} image={require("../assets/icons/crafting.png")} text={attemptToTranslate("Recipes") + " " + recipeCount + "/" + global.dataLoadedRecipes[0].length.toString()}/>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>}
            {sections["Profile"]===true?<HomeContentArea backgroundColor={colors.sectionBackground2[global.darkMode]} accentColor={colors.profileColor[global.darkMode]} title="Profile" titleColor={colors.profileColor[global.darkModeReverse]}>
              <View style={{height: 37}}/>
              <View style={{alignItems:"center", marginHorizontal:50}}>
                <TextInput
                  maxLength = {15}
                  allowFontScaling={false}
                  style={{fontSize: 30, width:"100%", textAlign:"center", color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold"}}
                  onChangeText={async (text) => {AsyncStorage.setItem("name", text); global.name=text;}}
                  placeholder={"["+attemptToTranslate("Name")+"]"}
                  placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
                  defaultValue={global.name}
                  multiline={false}
                />
                <TextFont bold={true} style={{marginTop: 0, marginBottom: -2, color:colors.fishText[global.darkMode]}}>{translateIslandNameInputLabel1()}</TextFont>
                <TextInput
                  maxLength = {15}
                  allowFontScaling={false}
                  style={{fontSize: 30, width:"100%", color:colors.textBlack[global.darkMode], textAlign:"center", fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}}
                  onChangeText={async (text) => {AsyncStorage.setItem("islandName", text); global.islandName=text}}
                  placeholder={"["+attemptToTranslate("Island")+"]"}
                  placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
                  defaultValue={global.islandName}
                  multiline={false}
                />
                <TextFont bold={true} style={{marginTop: 0, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{translateIslandNameInputLabel2()}</TextFont>
                <TouchableOpacity onPress={() => this.props.setPage(13)}>
                  <TextFont bold={false} style={{padding:10, color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{getSettingsString("settingsNorthernHemisphere")==="true" ? "Northern Hemisphere" : "Southern Hemisphere"}</TextFont>
                </TouchableOpacity>
                <View style={{height: 5}}/>
                {sections["Profile - Dream Address"]===true?<DreamAddress/>:<View/>}
                {sections["Profile - Friend Code"]===true?<FriendCode/>:<View/>}
                <View style={{height: 18}}/>
                <SelectionImage 
                  selectedImage={global.selectedFruit} 
                  images={[getMaterialImage("apple",true),getMaterialImage("cherry",true),getMaterialImage("orange",true),getMaterialImage("peach",true),getMaterialImage("pear",true)]}
                  onSelected={(image)=>{AsyncStorage.setItem("selectedFruit", image); global.selectedFruit=image;}}
                  canDeselect={true}
                  sizeImageOnline={[35,35]}
                  sizeContainer={[45,45]}
                />
              </View>
              <CurrentVillagers openVillagerPopup={this.openVillagerPopup} setPage={this.props.setPage}/>
              {/* {getCurrentVillagerNamesString()==="You have no favorite villagers"?<View/>:<TouchableOpacity onPress={() => this.props.setPage(21)}>
                {getInverseVillagerFilters(true)===""?<TextFont suffix={"\n"+attemptToTranslate("Note: you can get all items since you have all personality types!")} style={{marginHorizontal: 30, color: colors.fishText[global.darkMode], fontSize: 11, textAlign:"center"}}>{"See what you can get from your villagers."}</TextFont>:<>
                <TextFont style={{marginHorizontal: 30, color: colors.fishText[global.darkMode], fontSize: 11, textAlign:"center"}}>{"It is recommended you get all villager personalities to get DIYs and Reactions. Tap here to see what you might be missing out on."}</TextFont>
                <TextFont suffix={"\n "+getInverseVillagerFilters(true)} style={{marginHorizontal: 30, color: colors.fishText[global.darkMode], fontSize: 13, textAlign:"center"}}>{"Missing personalities:"}</TextFont></>}
              </TouchableOpacity>} */}
              <View style={{height: 30}}/>
            </HomeContentArea>:<View/>}
            {sections["Store Hours"]===true?<HomeContentArea backgroundColor={colors.sectionBackground1[global.darkMode]} accentColor={colors.storeHoursColor[global.darkMode]} title="Store Hours" titleColor={colors.storeHoursColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <StoreHoursContainer image={require("../assets/icons/nook.png")} text="Nook's Cranny" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "8:00 - 22:00" : "8 AM - 10 PM"} openHour={8} closeHour={22}/>
              <StoreHoursContainer image={require("../assets/icons/able.png")} text="Able Sisters" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "9:00 - 21:00" : "9 AM - 9 PM"} openHour={9} closeHour={21}/>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>}
            {sections["Active Creatures"]===true?<HomeContentArea backgroundColor={colors.sectionBackground2[global.darkMode]} accentColor={colors.activeCreaturesColor[global.darkMode]} title="Active Creatures" titleColor={colors.activeCreaturesColor[global.darkModeReverse]}>
              <ActiveCreatures scrollViewRef={this.scrollViewRef}/>
            </HomeContentArea>:<View/>}
            {sections["Active Creatures"]===true?<View/>:<View style={{height:130}}/>}
        </FadeInOut>
      </ScrollView>
      
      <View style={{position:"absolute", width: "100%", height:"100%", zIndex:-5}}>
        {landscape}
        <View style={[styles.homeScreenBackgroundTop,{backgroundColor:colors.skyColor[global.darkMode]}]}/>
        <Image style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height-295, resizeMode:"stretch",zIndex:10, backgroundColor:colors.grassColor[global.darkMode]}} source={global.darkMode===1 ? require("../assets/icons/cliffDark.png") : require("../assets/icons/cliff.png")} />
      </View>
      <VillagerPopupPopup ref={(villagerPopupPopup) => this.villagerPopupPopup = villagerPopupPopup} setVillagerGift={this.props.setVillagerGift}/>
    </View>
  }
}
export default HomePage;

class DreamAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dreamAddress:global.dreamAddress,
    }
  }
  onChangeText = (text) =>{
    var newValue = "";
    if(text==="DW"){
      this.setState({dreamAddress:""});
    } else if (text==="D"){
      this.setState({dreamAddress:"DW-"});
    } else {
      const afterIndices = [4,9,14]; 
      var value = text.replace("DW-","");
      for(let i=0; i<value.length; i++){
        if(afterIndices.includes(i)){
          newValue+="-";
        } 
        if (value[i] !== "-") {
          newValue+=value[i];
        }
      }
      newValue = "DW-"+newValue;
      this.setState({dreamAddress:newValue});
    }
    global.dreamAddress=newValue;
    AsyncStorage.setItem("dreamAddress", newValue);
  }
  render(){
    return(
      <>
        <TextInput
          maxLength = {17}
          allowFontScaling={false}
          style={{fontSize: 18, width:"100%", color:colors.textBlack[global.darkMode], textAlign:"center", fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}}
          onChangeText={async (text) => {this.onChangeText(text)}}
          placeholder={"["+attemptToTranslate("Dream Address")+"]"}
          placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          value={this.state.dreamAddress}
          defaultValue={global.dreamAddress}
          multiline={false}
        />
        <TextFont bold={false} style={{marginTop: -5, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{"Dream Address"}</TextFont>
      </>
    )
  }
}

class FriendCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      friendCode:global.friendCode,
    }
  }
  onChangeText = (text) =>{
    var newValue = "";
    if(text==="SW"){
      this.setState({friendCode:""});
    } else if (text==="S"){
      this.setState({friendCode:"SW-"});
    } else {
      const afterIndices = [4,9,14]; 
      var value = text.replace("SW-","");
      for(let i=0; i<value.length; i++){
        if(afterIndices.includes(i)){
          newValue+="-";
        } 
        if (value[i] !== "-") {
          newValue+=value[i];
        }
      }
      newValue = "SW-"+newValue;
      this.setState({friendCode:newValue});
    }
    global.friendCode=newValue;
    AsyncStorage.setItem("friendCode", newValue);
  }
  render(){
    return(
      <>
        <TextInput
          maxLength = {17}
          allowFontScaling={false}
          style={{fontSize: 18, width:"100%", color:colors.textBlack[global.darkMode], textAlign:"center", fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}}
          onChangeText={async (text) => {this.onChangeText(text)}}
          placeholder={"["+attemptToTranslate("Friend Code")+"]"}
          placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          value={this.state.friendCode}
          defaultValue={global.friendCode}
          multiline={false}
        />
        <TextFont bold={false} style={{marginTop: -5, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{"Friend Code"}</TextFont>
      </>
    )
  }
}


class ConfigureHomePages extends Component {
  constructor(props) {
    super(props);
    var sections = this.props.sections
    this.state = {
      sections:sections,
    }
    
  }
  setPages = (check,name) => {
    this.props.setPages(check,name);
    console.log(check)
    if(name==="To-Do - Turnip Log" && check){
      this.props.setPages(true,"To-Do");
    } else if(name==="To-Do" && !check){
      this.props.setPages(false,"To-Do - Turnip Log");
    } else if(name==="Profile - Dream Address" && check){
      this.props.setPages(true,"Profile");
    } else if(name==="Profile - Friend Code" && check){
      this.props.setPages(true,"Profile");
    } else if(name==="Profile" && !check){
      this.props.setPages(false,"Profile - Dream Address");
      this.props.setPages(false,"Profile - Friend Code");
    }
    if(this.props.header==="Select Events"){
      this.props.refreshEvents();
    }
    if(name==="App notifications"){
      setSettingsString("settingsNotifications", check?"true":"false")
    }
  }
  render(){
    const sectionNames = Object.keys(this.state.sections);
    return(<>
      <SubHeader>{this.props.header}</SubHeader>
      <View style={{height:10}}/>
        {sectionNames.map( (name, index)=>{
          if(name.includes("Break")){
            return <View style={{height:30}} key={name+index.toString()}/>
          } else if(name.includes("Info")){
            return <Paragraph styled={true} style={{marginBottom:10}} key={name+index.toString()}>{this.props.sections[name]}</Paragraph>
          } else if(name==="Set Notification Time"){
            return <SetNotificationTime key={name+index.toString()} title={name} setPages={this.setPages}/>
          } else {
            return <ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/>
          }
        })}
      </>
    )
  }
}

class SetNotificationTime extends Component {
  constructor(props){
    super(props);
    this.state = {
      datePickerVisible:false,
    }
  }
  toggle = () =>{
    this.setState({datePickerVisible:true})
  }
  render(){
    return (<>
      <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.toggle()}} text={this.props.title} />
      <View style={{height:20}}/>
      <DateTimePickerModal
        mode={"time"}
        onConfirm={(date)=>{this.props.setPages(date, this.props.title); this.setState({datePickerVisible:false})}}
        onCancel={()=>{this.setState({datePickerVisible:false})}}
        isVisible={this.state.datePickerVisible}
      />
      </>
    )
  }
}

class ConfigureHomePageSettingContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggle:this.props.defaultValue,
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.defaultValue!==prevProps.defaultValue){
      this.setState({toggle:this.props.defaultValue})
    }
  }
  toggle = () => {
    this.props.onCheck(!this.state.toggle);
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.setState({toggle:!this.state.toggle});
  }
  render(){
    return(
      <TouchableOpacity activeOpacity={0.65} onPress={()=>this.toggle()}>
        <View style={[styles.settingsContainer,{backgroundColor:colors.lightDarkAccent[global.darkMode]}]}>
            <View style={styles.textContainer}>
              <TextFont bold={true} style={[styles.textContainerTop,{color:colors.textBlack[global.darkMode]}]}>{this.props.title}</TextFont>
            </View>
          <View style={{position:"absolute", right: 8, transform: [{ scale: 0.75 }]}}>
            <ToggleSwitch
              isOn={this.state.toggle}
              onColor="#57b849"
              offColor="#DFDFDF"
              size="large"
              onToggle={() => {this.toggle();}}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}


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
      villagerPopup = <VillagerPopup item={this.state.item} setVillagerGift={this.props.setVillagerGift}/>
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
  textContainerTop:{
    fontSize: 17,
    marginRight: 100,
  },
  textContainer:{
    marginLeft: 30,
  },
  settingsContainer: {
    margin: 3,
    paddingVertical: 20,
    flexDirection:"row",
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
});