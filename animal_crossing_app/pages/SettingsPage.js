import React, {Component} from 'react';
import {Image, ScrollView, View, Dimensions, TouchableOpacity} from 'react-native';
import TextFont from '../components/TextFont'
import SettingsContainer from '../components/SettingsContainer';
import colors from '../Colors';
import ButtonComponent from "../components/ButtonComponent"
import Popup from '../components/Popup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ExportFile, LoadFile, ExportClipboard, LoadClipboard} from '../components/LoadFile';
import DateTimePicker from '@react-native-community/datetimepicker';
import {attemptToTranslate, deleteSavedPhotos, resetFilters, getSettingsString, deleteGeneratedData} from '../LoadJsonData';
import {SubHeader, Paragraph, HeaderNote, MailLink, Header} from "../components/Formattings"
import DropDownPicker from 'react-native-dropdown-picker'
import {PopupBottomCustom} from "../components/Popup"
import { dataVersion } from '../Changelog';
import { DropdownMenu, DropdownMenuPicker } from '../components/Dropdown';
import { getCurrentDateObject } from '../components/DateFunctions';

class SettingsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      deletedInfo: ["0","0"]
    }
  }
  
  deleteSavedPhotos = async () =>{
    this.popupDeleteSavedPhotosWait.setPopupVisible(true);
    const deletedInfo = await deleteSavedPhotos();
    this.setState({deletedInfo:deletedInfo});
    this.popupDeleteSavedPhotosWait.setPopupVisible(false);
    this.popupDeleteSavedPhotos.setPopupVisible(true);
  }

  deleteGeneratedData = async () =>{
    this.popupDeleteSavedPhotosWait.setPopupVisible(true);
    const deletedInfo = await deleteGeneratedData();
    this.setState({deletedInfo:deletedInfo});
    this.popupDeleteSavedPhotosWait.setPopupVisible(false);
    this.popupDeleteGeneratedData.setPopupVisible(true);
  }

  setDateOffset = (timeOffset) => {
    global.customTimeOffset = timeOffset;
    AsyncStorage.setItem("customDateOffset"+global.profile, timeOffset.toString());
  }

  forceUpdatePage = () => {
    this.forceUpdate()
  }
  
  render(){
    return(<>
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <SettingsPopup ref={(popup) => this.popup = popup}/>
        <ScrollView>
          <View style={{marginTop: 100}}/>
          <Header>Settings</Header>
          <HeaderNote>Tap each setting to learn more</HeaderNote>
          <View style={{marginTop: 15}}/>
          <SettingsDivider text={"Game language"}/>
          <LanguagePicker restartPopup={(show)=>this.popupRestart.setPopupVisible(show)}/>
          <View style={{height:10}}/>
          <SettingsDivider text={"Island ordinance"}/>
          <OrdinancePicker setPage={this.props.setPage}/>
          <View style={{height:10}}/>
          {global.settingsCurrent.map( (setting, index)=>
            {
              if(setting["keyName"]!="breaker"){
                return <SettingsContainer 
                  updateSettings={this.props.updateSettings}
                  updatePage={this.forceUpdatePage}
                  key={setting["keyName"]+index.toString()} 
                  backgroundColor={colors.white[global.darkMode]} 
                  textColor={colors.textBlack[global.darkMode]} 
                  index={index}
                  keyName={setting["keyName"]}
                  openPopup={(setting)=>this.popup.openPopup(setting)}
                  setting={setting}
                  deleteSavedPhotos={this.deleteSavedPhotos}
                  popupLoadNotifications={()=>{this.popupLoadNotifications.setPopupVisible(true)}}
                  popupAutoBackups={()=>{this.popupAutoBackups.setPopupVisible(true)}}
                />
              } else {
                return <SettingsDivider
                  text={setting["text"]}
                  keyName={setting["keyName"]}
                  key={setting["keyName"]+index.toString()}
                />
              }
              
            }
          )}
          <Popup ref={(popupLoadNotifications) => this.popupLoadNotifications = popupLoadNotifications} text="Notifications" textLower="You can select event notifications under the [Edit Events] of the [Events] section on the homepage." button1={"Go to page"} button1Action={()=>{this.props.setPage(0)}} button2={"OK"} button2Action={()=>{}}/>
          <Popup ref={(popupAutoBackups) => this.popupAutoBackups = popupAutoBackups} text="Auto Backups" textLower="Make sure your credentials and account is setup on the Backup and Restore page." button1={"Go to page"} button1Action={()=>{this.props.setPage(30)}} button2={"OK"} button2Action={()=>{}}/>

          <CustomDatePicker showPopup={true} setDateOffset={this.setDateOffset}/>
          {/* <View style={{height: 50}}/>
          <SettingsDivider text="Data backup" margin="small"/>
          <ExportFile/><LoadFile/>
          <View style={{height: 10}}/>
          <ExportClipboard/><LoadClipboard/> */}

          <View style={{height: 50}}/>
          <SettingsDivider text="Data reset" margin="small"/>
          
          <ButtonComponent text="Clear All Set Filters" onPress={() => {
            resetFilters();
            this.popupClearFilters.setPopupVisible(true);
          }} vibrate={70} color={colors.filtersResetButton[global.darkMode]}/>
          <Popup ref={(popupClearFilters) => this.popupClearFilters = popupClearFilters} text="Cleared Set Filters" textLower="All the filters selected have been unset" button1={"OK"} button1Action={()=>{console.log("")}}/>
          
          <ButtonComponent text="Delete Downloaded Images" onPress={async () => {this.deleteSavedPhotos()}} vibrate={70} color={colors.filtersResetButton[global.darkMode]}/>
          <Popup ref={(popupDeleteSavedPhotos) => this.popupDeleteSavedPhotos = popupDeleteSavedPhotos} text={"Deleted Downloaded Images"} textLower={attemptToTranslate("All downloaded photos have been removed. A restart may be required to load back images.") + "\n" + attemptToTranslate("Deleted:") + " " +this.state.deletedInfo[0] + "\n" + attemptToTranslate("Storage cleared:") + " " +parseInt(this.state.deletedInfo[1]) + " MB"} button1={"OK"} button1Action={()=>{console.log("")}}/>
          <Popup ref={(popupDeleteSavedPhotosWait) => this.popupDeleteSavedPhotosWait = popupDeleteSavedPhotosWait} text="Deleting..." textLower="Please wait"/>
          <ButtonComponent text="Delete Generated Internal Data" onPress={async () => {this.deleteGeneratedData()}} vibrate={70} color={colors.filtersResetButton[global.darkMode]}/>
          <Popup ref={(popupDeleteGeneratedData) => this.popupDeleteGeneratedData = popupDeleteGeneratedData} text={"Deleted Generated Data"} textLower={attemptToTranslate("All generated data has been removed. Restart to regenerate the data.") + "\n" + attemptToTranslate("Deleted:") + " " +this.state.deletedInfo[0] + "\n" + attemptToTranslate("Storage cleared:") + " " +parseInt(this.state.deletedInfo[1]) + " MB"} button1={"OK"} button1Action={()=>{console.log("")}}/>
          
          <View style={{height: 20}}/>
          <ButtonComponent text="Reset Data" onPress={() => {this.popupWarning.setPopupVisible(true)}} vibrate={100} color={colors.cancelButton[global.darkMode]}/>
          <Popup ref={(popupWarning) => this.popupWarning = popupWarning} text="Reset Data" textLower="Would you like to reset your collection? This action cannot be undone." button2={"Reset"} button1={"Cancel"} button1Action={()=>{console.log("")}} button2Action={()=>{AsyncStorage.clear(); this.popupRestart.setPopupVisible(true)}}/>
          <Popup ref={(popupRestart) => this.popupRestart = popupRestart} text="Restart Required" textLower="Please restart the application."/>
          <View style={{height:50}}/>
          <MailLink/>
          <View style={{height: 50}}/>
          <TextFont bold={true} style={{marginLeft: 20, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 12,}}>{"\nDatabase v" + dataVersion}</TextFont>
          <TextFont bold={true} style={{marginLeft: 20, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 12,}}>{"App v" + global.version + " - " + global.versionCode}</TextFont>
          <View style={{height: 15}}/>
        </ScrollView>
     </View>
     </>
    )
  }
}
export default SettingsPage;

class SettingsPopup extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected:"",
    }
  }

  openPopup = (selected) =>{
    this.setState({selected:selected});
    this.popup?.setPopupVisible(true);
  }
  
  render(){
    var images = <View/>
    if(this.state.selected.displayPicture1!==undefined && this.state.selected.displayPicture2!==undefined){
      images = <View style={{flexDirection:"row", marginTop: 24}}>
        <Image style={{width: Dimensions.get('window').width/2-25, height:220, borderRadius:10, resizeMode:"contain"}} source={this.state.selected.displayPicture1}/>
        <View style={{width:20, height:20}}/>
        <Image style={{width: Dimensions.get('window').width/2-25, height:220, borderRadius:10, resizeMode:"contain"}} source={this.state.selected.displayPicture2}/>
      </View>
    }

    return <>
      <PopupBottomCustom ref={(popup) => this.popup = popup}>
        <SubHeader margin={false}>{this.state.selected.displayName}</SubHeader>
        <Paragraph styled={true} margin={false}>{this.state.selected.description}</Paragraph>
        {images}
      </PopupBottomCustom>
    </>
  }
}

export class CustomDatePicker extends Component{
  constructor(props){
    super(props);
    this.state = {
      date:getCurrentDateObject(),
      time:getCurrentDateObject(),
      datePickerVisible: false,
      timePickerVisible: false,
    }
  }
  setCustomTime = () => {
    var date = this.state.date;
    date.setMinutes(this.state.time.getMinutes());
    date.setHours(this.state.time.getHours()); 
    if(date!==undefined){
      var timeOffset = date.getTime() - new Date().getTime();
      this.props.setDateOffset(timeOffset)
    }
  }
  setDate = (event, selectedDate) => {
    if(selectedDate!==undefined){
      this.setState({date:selectedDate,datePickerVisible:false})
      this.setCustomTime();
    } else {
      this.setState({datePickerVisible:false})
    }
    if(getSettingsString("settingsUseCustomDate")!=="true" && this.props.showPopup){
      this.popupDateReminder?.setPopupVisible(true);
    }
    return true;
  }
  setTime = (event, selectedTime) => {
    if(selectedTime!==undefined){
      this.setState({time:selectedTime,timePickerVisible:false, datePickerVisible:true})
      this.setCustomTime();
    } else {
      this.setState({timePickerVisible:false})
    }
    return true;
  }
  render(){
    return(
      <>
        <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.setState({timePickerVisible:true})}} text={"Set Custom Date/Time"} />
        {this.state.datePickerVisible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.time}
            mode={"date"}
            is24Hour={getSettingsString("settingsUse24HourClock")==="true"}
            display="default"
            onChange={this.setDate}
          />
        )}
        {this.state.timePickerVisible && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.time}
            mode={"time"}
            is24Hour={getSettingsString("settingsUse24HourClock")==="true"}
            display="default"
            onChange={this.setTime}
          />
        )}
        <Popup ref={(popupDateReminder) => this.popupDateReminder = popupDateReminder} text="Custom Date" textLower="Ensure the 'Use a custom date' setting is enabled" button1={"OK"} button1Action={()=>{console.log("")}}/>
      </>
    )
  }
}


export class LanguagePicker extends Component{
  render(){
    let languages = [
      {label: "English", value: "English",},
      {label: "English (Europe)", value: "English (Europe)",},
      {label: "Français", value: "French",},
      {label: "Français (Québec)", value: "French (US)",},
      {label: "Español", value: "Spanish",},
      {label: "Español (US)", value: "Spanish (US)",},
      {label: "Deutsch", value: "German",},
      {label: "Русский", value: "Russian",},
      {label: "Italiano", value: "Italian",},
      {label: "Dutch", value: "Dutch",},
      {label: "Chinese (Simplified)", value: "Chinese",},
      {label: "Portuguêse" + " " + attemptToTranslate("(Items not translated)"), value: "Portuguese",},
      {label: "Chinese (Traditional) (Not fully supported)", value: "Chinese (Traditional)",},
      {label: "Japanese (Not fully supported)", value: "Japanese",},
      {label: "Korean (Not fully supported)", value: "Korean",},
    ]
    let pass = false
    for(let i = 0; i < languages.length; i++){
      if(global.language === languages[i]["value"]){
        pass = true
        break
      }
    }
    if(!pass){
      global.language = "English"
    }
    return(<>
      <View style={{marginTop:5, marginBottom:8, marginHorizontal:20, justifyContent:"center"}}>
        <DropdownMenu 
          width={Dimensions.get('window').width-83}
          selection={true}
          items={languages}
          defaultValue={global.language}
          onChangeItem={
            async (item)=>{global.language=item.value, await AsyncStorage.setItem("Language", item.value); 
          this.props.restartPopup(true)
        }}/>
      </View>
      <HeaderNote>Translations only apply to game item names only, all other app content is in English. Some items may be missing translations. If you would like to help translate this app, feel free to reach out via email. </HeaderNote>
    </>
    )
  }
}

export class OrdinancePicker extends Component{
  render(){
    let ordinances = [
      {label: "None", value: "",},
      {label: "Beautiful Island", value: "Beautiful Island",},
      {label: "Early Bird", value: "Early Bird",},
      {label: "Night Owl", value: "Night Owl",},
      {label: "Bell Boom", value: "Bell Boom",},
    ]
    return(<>
      <View style={{marginTop:5, marginBottom:5, marginHorizontal:20, justifyContent:"center"}}>
        <DropdownMenu 
          width={Dimensions.get('window').width-83}
          selection={true}
          items={ordinances}
          defaultValue={global.ordinance}
          onChangeItem={
            async (item)=>{global.ordinance=item.value, await AsyncStorage.setItem("ordinance"+global.profile, item.value); 
        }}/>
      </View>
      <TouchableOpacity onPress={() => this.props.setPage(15, true, "ordinanceRedirect")}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 13, textAlign:"center", padding:4,}}>{"You can read about Ordinances by tapping here."}</TextFont>
      </TouchableOpacity>
    </>
    )
  }
}

class SettingsDivider extends Component {
  render(){
    return <>
      <View style={{marginLeft:this.props.margin==="small" ? 10:23, width:"100%", height: 20, marginTop:9, marginBottom: 3}}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15,}}>{this.props.text}</TextFont>
      </View>
    </>
  }
}