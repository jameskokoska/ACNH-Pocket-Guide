import React, {Component} from 'react';
import {Linking,TouchableOpacity,ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont'
import SettingsContainer from '../components/SettingsContainer';
import colors from '../Colors';
import ButtonComponent from "../components/ButtonComponent"
import Popup from '../components/Popup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ExportFile, LoadFile, ExportClipboard, LoadClipboard} from '../components/LoadFile';
import DateTimePicker from '@react-native-community/datetimepicker';
import {attemptToTranslate, deleteSavedPhotos, resetFilters, getSettingsString} from '../LoadJsonData';
import {cancelAllPushNotifications, pushNotification} from '../Notifications'
import {SubHeader, Paragraph, HeaderNote, MailLink, Header} from "../components/Formattings"
import DropDownPicker from 'react-native-dropdown-picker'
import {PopupBottomCustom} from "../components/Popup"

class SettingsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      date:new Date(),
      time:new Date(),
      datePickerVisible: false,
      timePickerVisible: false,
      deletedInfo: ["0","0"]
    }
  }
  setCustomTime = () => {
    var date = this.state.date;
    date.setMinutes(this.state.time.getMinutes());
    date.setHours(this.state.time.getHours()); 
    if(date!==undefined){
      var timeOffset = date.getTime() - new Date().getTime();
      global.customTimeOffset = timeOffset;
      console.log(global.customTimeOffset)
      AsyncStorage.setItem("customDateOffset", timeOffset.toString());
    }
  }
  deleteSavedPhotos = async () =>{
    this.popupDeleteSavedPhotosWait.setPopupVisible(true);
    const deletedInfo = await deleteSavedPhotos();
    this.setState({deletedInfo:deletedInfo});
    this.popupDeleteSavedPhotosWait.setPopupVisible(false);
    this.popupDeleteSavedPhotos.setPopupVisible(true);
  }
  setDate = (event, selectedDate) => {
    if(selectedDate!==undefined){
      this.setState({date:selectedDate,datePickerVisible:false})
      this.setCustomTime();
    } else {
      this.setState({datePickerVisible:false})
    }
    if(getSettingsString("settingsUseCustomDate")!=="true"){
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
          {global.settingsCurrent.map( (setting, index)=>
            {
              if(setting["keyName"]!="breaker"){
                return <SettingsContainer 
                  updateSettings={this.props.updateSettings}
                  key={setting["keyName"]+index.toString()} 
                  backgroundColor={colors.white[global.darkMode]} 
                  textColor={colors.textBlack[global.darkMode]} 
                  index={index}
                  keyName={setting["keyName"]}
                  openPopup={(setting)=>this.popup.openPopup(setting)}
                  setting={setting}
                  deleteSavedPhotos={this.deleteSavedPhotos}
                  popupLoadNotifications={()=>{this.popupLoadNotifications.setPopupVisible(true)}}
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
          <Popup ref={(popupLoadNotifications) => this.popupLoadNotifications = popupLoadNotifications} text="Notifications" textLower="You can select event notifications under the [Edit Events] of the [Events] section on the homepage." button1={"OK"} button1Action={()=>{this.props.setPage(0)}}/>
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
          
          <View style={{height: 50}}/>
          <SettingsDivider text="Data backup" margin="small"/>
          <ExportFile/><LoadFile/>
          <View style={{height: 10}}/>
          <ExportClipboard/><LoadClipboard/>

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
          
          <View style={{height: 20}}/>
          <ButtonComponent text="Reset Data" onPress={() => {this.popupWarning.setPopupVisible(true)}} vibrate={100} color={colors.cancelButton[global.darkMode]}/>
          <Popup ref={(popupWarning) => this.popupWarning = popupWarning} text="Reset Data" textLower="Would you like to reset your collection? This action cannot be undone." button2={"Reset"} button1={"Cancel"} button1Action={()=>{console.log("")}} button2Action={()=>{AsyncStorage.clear(); this.popupRestart.setPopupVisible(true)}}/>
          <Popup ref={(popupRestart) => this.popupRestart = popupRestart} text="Restart Required" textLower="Please restart the application."/>
          <View style={{height:50}}/>
          <MailLink/>
          <View style={{height: 50}}/>
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
    return <>
      <PopupBottomCustom ref={(popup) => this.popup = popup}>
        <SubHeader margin={false}>{this.state.selected.displayName}</SubHeader>
        <Paragraph styled={true} margin={false}>{this.state.selected.description}</Paragraph>
      </PopupBottomCustom>
    </>
  }
}


export class LanguagePicker extends Component{
  render(){
    return(<>
      <View style={{marginTop:10, marginBottom:8, marginHorizontal:20, justifyContent:"center"}}>
        <DropDownPicker
          items={[
            {label: "English", value: "English",},
            {label: "English (Europe)", value: "English (Europe)",},
            {label: "Français", value: "French",},
            {label: "Français (Québec)", value: "French (US)",},
            {label: "Español (In progress - if you would like to help, feel free to email)", value: "Spanish",},
            {label: "Español (US) (In progress - if you would like to help, feel free to email)", value: "Spanish (US)",},
            {label: "German (In progress - if you would like to help, feel free to email)", value: "German",},
            {label: "Italian (Not fully supported)", value: "Italian",},
            {label: "Dutch (Not fully supported)", value: "Dutch",},
            {label: "Chinese (Not fully supported)", value: "Chinese",},
            {label: "Chinese (Traditional) (Not fully supported)", value: "Chinese (Traditional)",},
            {label: "Japanese (Not fully supported)", value: "Japanese",},
            {label: "Korean (Not fully supported)", value: "Korean",},
            {label: "Russian (Not fully supported)", value: "Russian",},
          ]}
          defaultValue={global.language}
          placeholder={"Select Language..."}
          dropDownMaxHeight={300}
          containerStyle={{height: 45}}
          style={[{width:"100%", borderWidth: 0, backgroundColor: colors.lightDarkAccentHeavyBackground[global.darkMode], borderTopLeftRadius: 8, borderTopRightRadius: 8,borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          searchablePlaceholderTextColor={colors.filterSearch[global.darkMode]}
          labelStyle={{fontFamily: "ArialRoundedBold", fontSize: 15, marginLeft:10, color:colors.textBlack[global.darkMode]}}
          customTickIcon={()=><View/>}
          activeItemStyle={{borderRadius: 10, backgroundColor: colors.lightDarkAccentHeavy[global.darkMode]}}
          dropDownStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 0, backgroundColor: colors.lightDarkAccent2[global.darkMode], opacity: 0.98, }}
          onChangeItem={async (item)=>{global.language=item.value, await AsyncStorage.setItem("Language", item.value); this.props.restartPopup(true)}}
        />
      </View>
      <HeaderNote>Translations only apply to game item names only, all other app content is in English. Some items may be missing translations. If you would like to help translate this app, feel free to reach out via email. </HeaderNote>
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