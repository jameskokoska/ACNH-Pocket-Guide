import React, {Component} from 'react';
import {TextInput, TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import TextFont from '../components/TextFont'
import colors from '../Colors'
import {SubHeader, Header, Paragraph, HeaderNote} from "../components/Formattings"
import {getStorage, attemptToTranslate, setSettingsString, getSettingsString} from "../LoadJsonData"
import ButtonComponent from '../components/ButtonComponent'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ConfigureHomePageSettingContainer} from "./HomePage"
import {CustomDatePicker} from "./SettingsPage"
import {getWeekDayShort, getMonthShort, doWeSwapDate} from "../components/DateFunctions"
import {ProfileIcon} from "./ProfileCurrentPage"
import Popup from '../components/Popup';
import Toast from "react-native-toast-notifications";

export const profileNames = ["","Profile 1","Profile 2", "Profile 3", "Profile 4"]

export default class ProfilesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  loadProfileData = async (selectedProfile)=>{
    await AsyncStorage.setItem("selectedProfile", selectedProfile);
    await this.props.loadProfileData(selectedProfile);
    this.props.setPage(0);
  }
  render(){
    return(
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <ScrollView>
          <View style={{height: 100}}/>
          <Header>Profiles</Header>
          <HeaderNote>Profiles allow you to have multiple different islands/users to track different things. Load a profile to load the current saved settings and collection.</HeaderNote>
          <View style={{height: 20}}/>
          {profileNames.map( (profile)=>{
            return(
              <ProfilesComponent key={profile} profile={profile} loadProfileData={this.loadProfileData}/>
            ) 
          })}
          <View style={{height: 85}}/>
        </ScrollView>
     </View>
    )
  }
}

class ProfilesComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      date:new Date()
    }
  }
  async componentDidMount(){
    setTimeout(async ()=>{
      this.profile = this.props.profile;
      this.selected = false;
      if(global.profile===this.props.profile){
        this.selected = true;
        this.hemisphereSetting = await getStorage("settingsNorthernHemisphere","true")==="true"?true:false;
        this.customDateSetting = await getStorage("settingsUseCustomDate","false")==="true"?true:false;
      } else {
        this.hemisphereSetting = await getStorage("settingsNorthernHemisphereSaved"+this.profile,"true")==="true"?true:false;
        this.customDateSetting = await getStorage("settingsUseCustomDateSaved"+this.profile,"false")==="true"?true:false;
      }
      this.displayProfile = this.props.profile===""?"Main":this.props.profile;
      this.name = await getStorage("name"+this.profile,"");
      this.islandName = await getStorage("islandName"+this.profile,"");
      this.timeOffset = await getStorage("customDateOffset"+this.profile,"0");
      this.entries = (await getProfileData(this.profile))-3
      if(this.entries<0){
        this.entries = 0
      }
      this.forceUpdate();
      this.updateDate();
    },0)
  }
  updateNorthernHemisphere = async (value) => {
    if(this.selected){
      setSettingsString("settingsNorthernHemisphere",value?"true":"false");
    }
    await AsyncStorage.setItem("settingsNorthernHemisphereSaved"+this.profile, value?"true":"false");
    this.hemisphereSetting = value
  }
  updateCustomDate = async (value) => {
    if(this.selected){
      setSettingsString("settingsUseCustomDate",value?"true":"false");
    }
    await AsyncStorage.setItem("settingsUseCustomDateSaved"+this.profile, value?"true":"false");
    this.customDateSetting = value
    this.updateDate()
  }

  updateDate = () => {
    if(this.customDateSetting){
      var newDate = new Date(new Date().getTime() + parseInt(this.timeOffset));
      this.setState({date:newDate})
    } else {
      this.setState({date:new Date()})
    }
  }

  setDateOffset = (timeOffset) => {
    if(this.selected){
      global.customTimeOffset = timeOffset;
      this.timeOffset = timeOffset
      AsyncStorage.setItem("customDateOffset"+global.profile, timeOffset.toString());
    } else {
      this.timeOffset = timeOffset
      AsyncStorage.setItem("customDateOffset"+this.profile, timeOffset.toString());
    }
    this.updateDate();
  }

  render(){
    var time = this.state.date.getHours()+":"+this.state.date.getMinutes()
    if(this.state.date.getMinutes()<10){
      var time = this.state.date.getHours()+":0"+this.state.date.getMinutes()
    }
    if(getSettingsString("settingsUse24HourClock")==="false"){
      var hourEnd = time.indexOf(":");
      var H = +time.substr(0, hourEnd);
      var h = H % 12 || 12;
      var ampm = (H < 12 || H === 24) ? attemptToTranslate("AM") : attemptToTranslate("PM");
      time = h + time.substr(hourEnd, 3) + ampm;
    }
    return(
      <View style={{backgroundColor: this.selected?colors.selectedProfile[global.darkMode]:colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
        <View style={{height:5}}/>
        <View style={{marginHorizontal:20, flexDirection:"row", alignItems:"center"}}>
          <ProfileIcon profile={this.props.profile}/>
          <View>
            <SubHeader style={{fontSize:24, marginHorizontal:14}} margin={false}>{this.displayProfile}</SubHeader>
            {doWeSwapDate()?<SubHeader style={{fontSize:16, marginHorizontal:14}} margin={false}>{attemptToTranslate(getWeekDayShort(this.state.date.getDay())) + ". " + this.state.date.getDate() + " " + attemptToTranslate(getMonthShort(this.state.date.getMonth())) + ", " + time}</SubHeader>:<SubHeader style={{fontSize:17, marginHorizontal:14}} margin={false}>{attemptToTranslate(getWeekDayShort(this.state.date.getDay())) + ". " + attemptToTranslate(getMonthShort(this.state.date.getMonth())) + " " + this.state.date.getDate() + ", " + time}</SubHeader>}
            <SubHeader style={{fontSize:13, marginHorizontal:14}} margin={false}>{this.entries + " " + attemptToTranslate("entries.")}</SubHeader>
          </View>
        </View>
        <View style={{height:20}}/>
        <TextInput
          maxLength = {15}
          allowFontScaling={false}
          style={{marginHorizontal:20, fontSize: 20, color:colors.textBlack[global.darkMode], backgroundColor: colors.lightDarkAccent[global.darkMode], padding:8, paddingHorizontal:15, borderRadius:7, fontFamily: "ArialRounded"}}
          onChangeText={async (text) => {AsyncStorage.setItem("name"+this.profile, text); this.selected?global.name=text:"";}}
          placeholder={"["+attemptToTranslate("Name")+"]"}
          placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          defaultValue={this.name}
          multiline={false}
        />
        <View style={{height:10}}/>
        <TextInput
          maxLength = {15}
          allowFontScaling={false}
          style={{marginHorizontal:20, fontSize: 20, color:colors.textBlack[global.darkMode], backgroundColor: colors.lightDarkAccent[global.darkMode], padding:8, paddingHorizontal:15, borderRadius:7, fontFamily: "ArialRounded"}}
          onChangeText={async (text) => {AsyncStorage.setItem("islandName"+this.profile, text); this.selected?global.islandName=text:"";}}
          placeholder={"["+attemptToTranslate("Island")+"]"}
          placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          defaultValue={this.islandName}
          multiline={false}
        />
        <View style={{height:7}}/>
        <ConfigureHomePageSettingContainer title={"Northern Hemisphere"} defaultValue={this.hemisphereSetting} onCheck={(check) => {this.updateNorthernHemisphere(check)}}/>
        <ConfigureHomePageSettingContainer title={"Use a custom date"} defaultValue={this.customDateSetting} onCheck={(check) => {this.updateCustomDate(check)}}/>
        <View style={{marginHorizontal:10}}>
          <CustomDatePicker setDateOffset={this.setDateOffset}/>
          <View style={{flexDirection:"row", justifyContent:"space-between",}}>
            <ButtonComponent text="Erase" onPress={() => {this.popupWarning.setPopupVisible(true)}} vibrate={100} color={colors.cancelButton[global.darkMode]}/>
            {this.selected===false?<ButtonComponent vibrate={10} style={{alignSelf: 'flex-end'}} color={colors.okButton[global.darkMode]} text="Load Profile" onPress={() => {
              setSettingsString("settingsNorthernHemisphere",this.hemisphereSetting?"true":"false");
              setSettingsString("settingsUseCustomDate",this.customDateSetting?"true":"false");
              this.props.loadProfileData(this.profile);
              toast.show(attemptToTranslate(this.displayProfile) + " " + attemptToTranslate("loaded."), {type:"success",
              renderType:{
                success: (toast) => (
                  <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 20, marginVertical: 12, borderRadius: 5, backgroundColor: colors.popupSuccess[global.darkMode], alignItems:"center", justifyContent:"center"}}>
                    <TextFont translate={false} style={{color:"white", fontSize: 15}}>{toast.message}</TextFont>
                  </View>
                ),
              }
            })
            }}/>:<View/>}
          </View>
        </View>
        <Popup ref={(popupWarning) => this.popupWarning = popupWarning} text={attemptToTranslate("Erase") +" "+ attemptToTranslate(this.displayProfile)} textLower={attemptToTranslate("Would you like to reset your collection?") + "\n\n" + attemptToTranslate("It will only erase") + " " + attemptToTranslate(this.displayProfile) + " " + attemptToTranslate("data") } button2={"Reset"} button1={"Cancel"} button1Action={()=>{console.log("")}} button2Action={()=>{this.popupAreYouSure.setPopupVisible(true)}}/>
        <Popup ref={(popupAreYouSure) => this.popupAreYouSure = popupAreYouSure} text={attemptToTranslate("Reset?")} textLower={attemptToTranslate("Are you sure?") + "\n" +attemptToTranslate("This action cannot be undone.") + "\n\n" + attemptToTranslate("It will only erase") + " " + attemptToTranslate(this.displayProfile) + " " + attemptToTranslate("data") } button2={"Erase Data"} button1={"Cancel"} button1Action={()=>{console.log("")}} button2Action={async()=>{await resetProfileData(this.profile); this.popupRestart.setPopupVisible(true)}}/>
        <Popup ref={(popupRestart) => this.popupRestart = popupRestart} text="Restart Required" textLower="Please restart the application."/>
        <View style={{height:5}}/>
      </View>
    )
  }
}

async function resetProfileData(profileToReset){
  await AsyncStorage.setItem("collectedString"+profileToReset, "");
  await AsyncStorage.setItem("name"+profileToReset, "");
  await AsyncStorage.setItem("islandName"+profileToReset, "");
  await AsyncStorage.setItem("customDateOffset"+profileToReset, "0");
  return true
}

async function getProfileData(profile){
  return ((await getStorage("collectedString"+profile,"")).split("\n")).length;
}