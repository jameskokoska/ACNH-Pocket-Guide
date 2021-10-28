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
import {getCurrentDateObject, doWeSwapDate, addDays} from '../components/DateFunctions';
import {TodoList, TurnipLog} from '../components/TodoList';
import VisitorsList from '../components/VisitorsList';
import {translateDreamAddressBeginning, translateIslandNameInputLabel2, translateIslandNameInputLabel1, getSettingsString, attemptToTranslate} from "../LoadJsonData"
import { ScrollView } from 'react-native-gesture-handler';
import Popup, {PopupBottomCustom} from "../components/Popup"
import VillagerPopup from "../popups/VillagerPopup"
import ToggleSwitch from 'toggle-switch-react-native'
import {SubHeader, Paragraph} from "../components/Formattings"
import FadeInOut from "../components/FadeInOut"
import {getMaterialImage} from "../components/GetPhoto"
import FastImage from "../components/FastImage"
import {cancelAllPushNotifications} from "../Notifications"
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonComponent from "../components/ButtonComponent"
import {SelectionImage} from "../components/Selections"
import PopupChangelog from '../components/PopupChangelog';
import LoanList from "../components/LoanList"
import { LinearGradient } from 'expo-linear-gradient';

class HomePage extends Component {
  constructor(props){
    super(props);
    var eventSections = props.eventSections;
    if(eventSections.hasOwnProperty("App notifications")){
      getSettingsString("settingsNotifications")==="true" ? eventSections["App notifications"]=true : eventSections["App notifications"]=false;
    }
    this.state = {sections:props.sections, eventSections:eventSections, editOrder:false, sectionsOrder:this.props.sectionsOrder}
    this.refreshEvents();
  }
  refreshEvents = () => {
    cancelAllPushNotifications();
    this.todayEvents = getEventsDay(getCurrentDateObject(), this.state.eventSections,this.props.eventSections["Show Events Happening Now"]);
    this.tomorrowEvents = getEventsDay(addDays(getCurrentDateObject(), 1), this.state.eventSections);
    this.thisWeekEvents = [];
    for(var i=2; i<7; i++){
      this.thisWeekEvents = this.thisWeekEvents.concat(getEventsDay(addDays(getCurrentDateObject(), i), this.state.eventSections));
    }
  }
  openVillagerPopup = (item) => {
    this.villagerPopupPopup?.setPopupVisible(true, item);
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

  scrollToEnd = () => {
    this.scrollViewRef?.scrollToEnd()
  }

  reorderItem = async (index, direction) => {
    //-1 moves the item down
    //1 moves the item up
    const items = this.state.sectionsOrder
    const position = index
    if (
      (direction === -1 && position === 0) ||
      (direction === 1 && position === items.length - 1)
    ) {
      return;
    }

    const item = items[position]; // save item for later
    
    items.splice(index, 1);
    items.splice(position + direction, 0, item);

    this.setState({sectionsOrder: items});
    await AsyncStorage.setItem("SectionsOrder", JSON.stringify(items));
  };

  render(){
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

    var landscape = <LottieView autoPlay loop style={{width: 690, height: 232, position:'absolute', top:32, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/home.json')}/>
    if(getCurrentDateObject().getMonth()===11||getCurrentDateObject().getMonth()===0){
      landscape = <LottieView autoPlay loop style={{width: 690, height: 232, position:'absolute', top:32, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/homeSnow.json')}/>
    } else if (this.todayEvents[0]!==undefined && (this.todayEvents[0].name==="Festivale" || this.todayEvents[0].name.includes("Firework")) || this.todayEvents[1]!==undefined && (this.todayEvents[1].name==="Festivale" || this.todayEvents[1].name.includes("Firework"))){
      landscape = <LottieView autoPlay loop style={{width: 690, height: 232, position:'absolute', top:32, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/homeCelebration.json')}/>
    }
    const sections = this.state.sections;

    return <View style={{height:"100%",width:"100%"}}>
      <PopupChangelog/>
      {/* <PopupBottomCustom ref={(popupSettings) => this.popupSettings = popupSettings} onClose={()=>{}}>
        <ConfigureHomePages 
          header={"Select Homepage Sections"} 
          refreshEvents={()=>{this.refreshEvents()}} 
          setPages={(checked,name)=>this.setPages(checked,name)} 
          sections={this.state.sections}
        />
      </PopupBottomCustom> */}
      <PopupBottomCustom ref={(popupEventsSettings) => this.popupEventsSettings = popupEventsSettings} onClose={()=>{}}>
        <ConfigureHomePages 
          setPage={(page)=>this.props.setPage(page)} 
          header={"Select Events"} 
          refreshEvents={()=>{this.refreshEvents()}} 
          setPages={(checked,name)=>this.setEventPages(checked,name)} 
          sections={this.state.eventSections}
        />
      </PopupBottomCustom>
      <ScrollView ref={(scrollViewRef) => this.scrollViewRef = scrollViewRef}>
        <View style={{height:45}}/>
        <Clock swapDate={doWeSwapDate()}/>
        <View style={{height:125}}/>
        <View style={{height:38}}>
        <View style={{padding:10, paddingVertical:12, position:"absolute",right:0, top: -15}}>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={{padding:5, paddingVertical:12}} 
              onPress={()=>{this.setState({editOrder:!this.state.editOrder}); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}
            }>
              <TextFont bold={false} style={{marginRight:10, color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"right"}}>{!this.state.editOrder?"Edit Sections":"Disable Edit Sections"}</TextFont>
            </TouchableOpacity>
          </View>
        </View>
        </View>

        {this.state.sectionsOrder.map( (section, index)=>{
          let backgroundColor = colors.sectionBackground1[global.darkMode]
          if(index%2!=0){
            backgroundColor = colors.sectionBackground2[global.darkMode]
          }
          if(section["name"]==="Events"){
            if(this.state.editOrder){
              let name = "Events"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.eventsColor[global.darkMode]} title={name} titleColor={colors.eventsColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Events"]===true?<HomeContentArea index={index} key={"Events"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.eventsColor[global.darkMode]} title="Events" titleColor={colors.eventsColor[global.darkModeReverse]}>
              <TouchableOpacity style={{padding:10, paddingVertical:12, position:"absolute",right:0}} 
                onPress={()=>{this.popupEventsSettings.setPopupVisible(true); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}
              }>
                <TextFont bold={false} style={{marginRight:10, color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"right"}}>{"Edit Events"}</TextFont>
              </TouchableOpacity>
              {todayTitle}
              {this.todayEvents.map( (event, index)=>
                <EventContainer 
                  openVillagerPopup={this.openVillagerPopup}
                  setPage={this.props.setPage}
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
                  openVillagerPopup={this.openVillagerPopup}
                  setPage={this.props.setPage}
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
                  openVillagerPopup={this.openVillagerPopup}
                  setPage={this.props.setPage}
                  key={event.name+index} 
                  backgroundColor={colors.eventBackground[global.darkMode]}
                  textColor={colors.textBlack[global.darkMode]}
                  event={event}
                  eventSections={this.state.eventSections}
                />
              )}
              <View style={{height: 2}}/>
              <TouchableOpacity style={{marginHorizontal: 20, marginVertical:10, backgroundColor:colors.eventBackground[global.darkMode], padding: 10, borderRadius: 10}} 
                onPress={()=>{this.props.setPage(16); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}
              >
                <TextFont bold={true} style={{color: colors.fishText[global.darkMode], fontSize: 18, textAlign:"center"}}>{"View All"}</TextFont>
              </TouchableOpacity>
              <View style={{height: 20}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="To-Do"){
            if(this.state.editOrder){
              let name = "To-Do"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.todoColor[global.darkMode]} title={name} titleColor={colors.todoColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["To-Do"]===true?<HomeContentArea index={index} key={"To-Do"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.todoColor[global.darkMode]} title="To-Do" titleColor={colors.todoColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <TodoList sections={sections} setLoadedToDo={this.setLoadedToDo} setPage={this.props.setPage}/>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Turnip Log"){
            if(this.state.editOrder){
              let name = "Turnip Log"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.turnipColor[global.darkMode]} title={name} titleColor={colors.turnipColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return this.props.sections["Turnip Log"]===true?<HomeContentArea index={index} key={"Turnip Log"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.turnipColor[global.darkMode]} title="Turnip Log" titleColor={colors.turnipColor[global.darkModeReverse]}>
              <View style={{height: 13}}/>
              <TurnipLog/>
              <View style={{height: 20}}/>
            </HomeContentArea>
            :<View/>
          }else if(section["name"]==="Visitors"){
            if(this.state.editOrder){
              let name = "Visitors"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.visitorsColor[global.darkMode]} title={name} titleColor={colors.visitorsColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Visitors"]===true?<HomeContentArea index={index} key={"Visitors"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.visitorsColor[global.darkMode]} title="Visitors" titleColor={colors.visitorsColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <VisitorsList setPage={this.props.setPage}/>
              <View style={{height: 25}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Collection"){
            if(this.state.editOrder){
              let name = "Collection"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.collectionColor[global.darkMode]} title={name} titleColor={colors.collectionColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Collection"]===true?<HomeContentArea index={index} key={"Collection"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.collectionColor[global.darkMode]} title="Collection" titleColor={colors.collectionColor[global.darkModeReverse]}>
              <CollectionProgress/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Profile"){
            if(this.state.editOrder){
              let name = "Profile"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.profileColor[global.darkMode]} title={name} titleColor={colors.profileColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Profile"]===true?<HomeContentArea index={index} key={"Profile"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.profileColor[global.darkMode]} title="Profile" titleColor={colors.profileColor[global.darkModeReverse]}>
              <View style={{height: 37}}/>
              <Profile setPage={this.props.setPage}/>
              <CurrentVillagers openVillagerPopup={this.openVillagerPopup} setPage={this.props.setPage}/>
              <View style={{height: 30}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Loan Tracking"){
            if(this.state.editOrder){
              let name = "Loan Tracking"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.loanTrackingColor[global.darkMode]} title={name} titleColor={colors.loanTrackingColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Loan Tracking"]===true?<HomeContentArea index={index} key={"Loan Tracking"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.loanTrackingColor[global.darkMode]} title="Loan Tracking" titleColor={colors.loanTrackingColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <LoanList/>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Store Hours"){
            if(this.state.editOrder){
              let name = "Store Hours"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.storeHoursColor[global.darkMode]} title={name} titleColor={colors.storeHoursColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Store Hours"]===true?<HomeContentArea index={index} key={"Store Hours"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.storeHoursColor[global.darkMode]} title="Store Hours" titleColor={colors.storeHoursColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <StoreHoursContainer image={require("../assets/icons/nook.png")} text="Nook's Cranny" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "8:00 - 22:00" : "8 AM - 10 PM"} openHour={8} closeHour={22}/>
              <StoreHoursContainer image={require("../assets/icons/able.png")} text="Able Sisters" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "9:00 - 21:00" : "9 AM - 9 PM"} openHour={9} closeHour={21}/>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>
          }
        })}
        
        <View style={{height: 55}}/>
        <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:colors.lightDarkAccent[global.darkMode], borderRadius:15, margin: 20, padding:20}} onPress={() => this.props.setPage(29, true, "giftsRedirect")}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center",}}>{"Active Creatures has been moved to a separate page."}</TextFont>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center",}}>{"You can tap here to go to that page, or open the sidebar."}</TextFont>
        </TouchableOpacity>
        <View style={{height: 75}}/>
      </ScrollView>
      
      <View style={{position:"absolute", width: "100%", height:"100%", zIndex:-5, top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',overflow: "hidden" }}>
        <View style={{width:690, height: "100%", zIndex:1, position:'absolute', overflow: "hidden", }}>
          {landscape}
          <LinearGradient
            colors={[colors.skyColor[global.darkMode], 'transparent']}
            style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: "100%", zIndex: 50}}
            start={{x:1.0, y:0}}
            end={{x: 0.9, y: 0}}
          />
          <LinearGradient
            colors={[colors.skyColor[global.darkMode], 'transparent']}
            style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: "100%", zIndex: 50}}
            start={{x: 0, y:0}}
            end={{x: 0.1, y: 0}}
          />
        </View>
        <View style={[styles.homeScreenBackgroundTop,{backgroundColor:colors.skyColor[global.darkMode]}]}/>
        <Image style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height-295, resizeMode:"stretch",zIndex:10, backgroundColor:colors.grassColor[global.darkMode]}} source={global.darkMode===1 ? require("../assets/icons/cliffDark.png") : require("../assets/icons/cliff.png")} />
      </View>
      <VillagerPopupPopup ref={(villagerPopupPopup) => this.villagerPopupPopup = villagerPopupPopup} setPage={this.props.setPage}/>
    </View>
  }
}
export default HomePage;

export class Profile extends Component{
  render(){
    return(
      <View style={{alignItems:"center", marginHorizontal:50}}>
        <TextInput
          maxLength = {15}
          allowFontScaling={false}
          style={{fontSize: 30, width:"100%", textAlign:"center", color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold"}}
          onChangeText={async (text) => {AsyncStorage.setItem("name"+global.profile, text); global.name=text;}}
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
          onChangeText={async (text) => {AsyncStorage.setItem("islandName"+global.profile, text); global.islandName=text}}
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
        <DreamAddress/>
        <FriendCode/>
        <CreatorCode/>
        <View style={{height: 18}}/>
        <SelectionImage 
          selectedImage={global.selectedFruit} 
          images={[getMaterialImage("apple",true),getMaterialImage("cherry",true),getMaterialImage("orange",true),getMaterialImage("peach",true),getMaterialImage("pear",true)]}
          onSelected={(image)=>{AsyncStorage.setItem("selectedFruit"+global.profile, image); global.selectedFruit=image;}}
          canDeselect={true}
          sizeImageOnline={[35,35]}
          sizeContainer={[45,45]}
        />
      </View>
    )
  }
}

export class DreamAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dreamAddress:global.dreamAddress,
    }
  }
  onChangeText = (text) =>{
    var newValue = "";
    if(text===translateDreamAddressBeginning()){
      this.setState({dreamAddress:""});
    } else if (text===translateDreamAddressBeginning()[0]){
      this.setState({dreamAddress:translateDreamAddressBeginning()+"-"});
    } else {
      const afterIndices = [4,9,14]; 
      var value = text.replace(translateDreamAddressBeginning()+"-","");
      for(let i=0; i<value.length; i++){
        if(afterIndices.includes(i)){
          newValue+="-";
        } 
        if (value[i] !== "-") {
          newValue+=value[i];
        }
      }
      newValue = translateDreamAddressBeginning()+"-"+newValue;
      this.setState({dreamAddress:newValue});
    }
    global.dreamAddress=newValue;
    AsyncStorage.setItem("dreamAddress"+global.profile, newValue);
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

export class FriendCode extends Component {
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
    AsyncStorage.setItem("friendCode"+global.profile, newValue);
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

export class CreatorCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      creatorCode:global.creatorCode,
    }
  }
  onChangeText = (text) =>{
    var newValue = "";
    if(text==="MA"){
      this.setState({creatorCode:""});
    } else if (text==="M"){
      this.setState({creatorCode:"MA-"});
    } else {
      const afterIndices = [4,9,14]; 
      var value = text.replace("MA-","");
      for(let i=0; i<value.length; i++){
        if(afterIndices.includes(i)){
          newValue+="-";
        } 
        if (value[i] !== "-") {
          newValue+=value[i];
        }
      }
      newValue = "MA-"+newValue;
      this.setState({creatorCode:newValue});
    }
    global.creatorCode=newValue;
    AsyncStorage.setItem("creatorCode"+global.profile, newValue);
  }
  render(){
    return(
      <>
        <TextInput
          maxLength = {17}
          allowFontScaling={false}
          style={{fontSize: 18, width:"100%", color:colors.textBlack[global.darkMode], textAlign:"center", fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}}
          onChangeText={async (text) => {this.onChangeText(text)}}
          placeholder={"["+attemptToTranslate("Creator Code")+"]"}
          placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          value={this.state.creatorCode}
          defaultValue={global.creatorCode}
          multiline={false}
        />
        <TextFont bold={false} style={{marginTop: -5, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{"Creator Code"}</TextFont>
      </>
    )
  }
}


export class ConfigureHomePages extends Component {
  constructor(props) {
    super(props);
    var sections = this.props.sections
    this.state = {
      sections:sections,
    }
    
  }
  setPages = (check,name) => {
    this.props.setPages(check,name);
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
      timePickerVisible: false,
      time:new Date(),
    }
  }
  toggle = () =>{
    this.setState({timePickerVisible:true})
  }
  setTime = (event, selectedTime) => {
    if(selectedTime!==undefined){
      this.setState({time:selectedTime,timePickerVisible:false})
      this.props.setPages(selectedTime, this.props.title);
    } else {
      this.setState({timePickerVisible:false})
    }
    return true;
  }
  render(){
    return (<>
      <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.toggle()}} text={this.props.title} />
      <View style={{height:20}}/>
      {this.state.timePickerVisible&& (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.time}
          mode={"time"}
          is24Hour={getSettingsString("settingsUse24HourClock")==="true"}
          display="spinner"
          onChange={this.setTime}
        />
      )}
      </>
    )
  }
}

export class ConfigureHomePageSettingContainer extends Component {
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


export class VillagerPopupPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item:""
    };   
  }

  setPopupVisible = (visible, item) => {
    this.setState({item:item});
    this.popup?.setPopupVisible(true);
  }

  render(){
    var villagerPopup = <View/>
    if(this.state.item!==undefined && this.state.item!==""){
      villagerPopup = <VillagerPopup item={this.state.item} setPage={this.props.setPage}/>
    }
    return(
      <PopupBottomCustom ref={(popup) => this.popup = popup}>
        <TextFont bold={true} style={{textAlign:"center",fontSize: 30, marginTop: 0, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{this.state.item["NameLanguage"]}</TextFont>
        {villagerPopup}
      </PopupBottomCustom>
    )
  }
}

export class CollectionProgress extends Component {
  render(){
    var fishCount = countCollection("fishCheckList");
    var fishCountTotal = 80;
    var fishPercentage = fishCount/fishCountTotal * 100;
    var seaCount = countCollection("seaCheckList");
    var seaCountTotal = 40;
    var seaPercentage = seaCount/seaCountTotal * 100;
    var bugsCount = countCollection("bugCheckList");
    var bugsCountTotal = 80;
    var bugsPercentage = bugsCount/bugsCountTotal * 100;
    var fossilCount = countCollection("fossilCheckList");
    var fossilCountTotal = 73
    var fossilPercentage = fossilCount/fossilCountTotal * 100;
    var artCount = countCollection("artCheckList");
    var artCountTotal = 43;
    var artPercentage = artCount/artCountTotal * 100;
    var musicCount = countCollection("songCheckList");
    var musicCountTotal = 95;
    var musicPercentage = musicCount/musicCountTotal * 100;
    var emojipediaCount = countCollection("emojiCheckList");
    var emojipediaCountTotal = global.dataLoadedReactions[0].length;
    var emojipediaPercentage = emojipediaCount/emojipediaCountTotal * 100;
    var recipeCount = countCollection("recipesCheckList");
    var recipeCountTotal = global.dataLoadedRecipes[0].length;
    var recipePercentage = recipeCount/recipeCountTotal * 100;
    var floorWallsCount = countCollection("floorWallsCheckList");
    var floorWallsCountTotal = global.dataLoadedFloorWalls[0].length;
    var floorWallsPercentage = floorWallsCount/floorWallsCountTotal * 100;
    //To get totals: run CreateFilterDefinition.py
    //"Furniture" and "Clothing"
    var furnitureCount = countCollection("furnitureCheckList");
    var furnitureCountTotal = 10129
    var furniturePercentage = furnitureCount/furnitureCountTotal * 100;
    var clothingCount = countCollection("clothingCheckList");
    var clothingCountTotal = 5828;
    var clothingPercentage = clothingCount/clothingCountTotal * 100;
    return(<>
      <View style={{height: 15}}/>
      <ProgressContainer color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={fishPercentage} image={require("../assets/icons/fish.png")} text={attemptToTranslate("Fish") + " " + fishCount + "/" + fishCountTotal.toString()}/>
      <ProgressContainer color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={seaPercentage} image={require("../assets/icons/octopus.png")} text={attemptToTranslate("Sea Creatures") + " " + seaCount + "/" + seaCountTotal.toString()}/>
      <ProgressContainer color={colors.bugAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={bugsPercentage} image={require("../assets/icons/bugs.png")} text={attemptToTranslate("Bugs") + " " + bugsCount + "/" + bugsCountTotal.toString()}/>
      <ProgressContainer color={colors.fossilAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={fossilPercentage} image={require("../assets/icons/bones.png")} text={attemptToTranslate("Fossils") + " " + fossilCount + "/" + fossilCountTotal.toString()}/>
      <ProgressContainer color={colors.artAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={artPercentage} image={require("../assets/icons/colorPalette.png")} text={attemptToTranslate("Art") + " " + artCount + "/" + artCountTotal.toString()}/>
      <ProgressContainer color={colors.musicAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={musicPercentage} image={require("../assets/icons/music.png")} text={attemptToTranslate("Songs") + " " + musicCount + "/" + musicCountTotal.toString()}/>
      <ProgressContainer color={colors.emojipediaAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={emojipediaPercentage} image={require("../assets/icons/emote.png")} text={attemptToTranslate("Emotes") + " " + emojipediaCount + "/" + emojipediaCountTotal.toString()}/>
      <ProgressContainer color={colors.toolsAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={recipePercentage} image={require("../assets/icons/crafting.png")} text={attemptToTranslate("Recipes") + " " + recipeCount + "/" + recipeCountTotal.toString()}/>
      <ProgressContainer color={colors.furnitureAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={furniturePercentage} image={require("../assets/icons/leaf.png")} text={attemptToTranslate("Furniture") + " " + furnitureCount + "/" + furnitureCountTotal.toString()}/>
      <ProgressContainer color={colors.floorWallsAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={clothingPercentage} image={require("../assets/icons/carpet.png")} text={attemptToTranslate("Floor & Walls") + " " + floorWallsCount + "/" + floorWallsCountTotal.toString()}/>
      <ProgressContainer color={colors.clothingAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={clothingPercentage} image={require("../assets/icons/top.png")} text={attemptToTranslate("Clothing") + " " + clothingCount + "/" + clothingCountTotal.toString()}/>
      <View style={{height: 15}}/>
      </>
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