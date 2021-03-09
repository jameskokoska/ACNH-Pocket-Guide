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
import {ExportFile, LoadFile} from '../components/LoadFile';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {resetFilters} from '../LoadJsonData';
import {MailLink} from "../components/Formattings"

const music = require("../assets/data/music.json");
const {width} = Dimensions.get('window');


class SettingsPage extends Component {
  constructor(props){
    super(props);
    this.setCustomTime = this.setCustomTime.bind(this);
    this.state = {
      date:new Date(),
      time:new Date(),
      datePickerVisible: false,
    }
  }
  setCustomTime(){
    var date = this.state.date;
    date.setMinutes(this.state.time.getMinutes());
    date.setHours(this.state.time.getHours()); 
    global.customTime = date;
    AsyncStorage.setItem("customDate", date.toString());
  }
  render(){
    return(<>
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <ScrollView>
          <View style={{marginTop: 100}}/>
          <TextFont bold={true} style={{fontSize: 40, marginLeft: 30, color:colors.textBlack[global.darkMode]}}>Settings</TextFont>
          <View style={{marginTop: 20}}/>
          {global.settingsCurrent.map( (setting, index)=>
            {
              if(setting["keyName"]!="breaker"){
                return <SettingsContainer 
                  updateSettings={this.props.updateSettings}
                  key={setting["keyName"]+index.toString()} 
                  currentValue={setting["currentValue"]} 
                  backgroundColor={colors.white[global.darkMode]} 
                  textColor={colors.textBlack[global.darkMode]} 
                  image={setting["picture"]} 
                  text={setting["displayName"]} 
                  description={setting["description"]}
                  index={index}
                  keyName={setting["keyName"]}
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
          <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.setState({datePickerVisible:true})}} text={"Set Custom Date/Time"} />
          <DateTimePickerModal
            mode={"date"}
            onConfirm={(date)=>{this.setState({datePickerVisible:false, date:date,}); this.popupDateReminder.setPopupVisible(true); this.setCustomTime();}}
            onCancel={()=>{this.setState({datePickerVisible:false})}}
            isVisible={this.state.datePickerVisible}
          />
          <DateTimePickerModal
            mode={"time"}
            onConfirm={(date)=>{this.setState({datePickerVisible:false, time:date});}}
            onCancel={()=>{this.setState({datePickerVisible:false})}}
            isVisible={this.state.datePickerVisible}
          />
          <Popup ref={(popupDateReminder) => this.popupDateReminder = popupDateReminder} text="Custom Date" textLower="Ensure the 'Use a custom date' setting is enabled" button1={"OK"} button1Action={()=>{console.log("")}}/>
          
          <View style={{height: 50}}/>
          <SettingsDivider text="Data backup" margin="small"/>
          <ExportFile/><LoadFile/>

          <View style={{height: 50}}/>
          <SettingsDivider text="Data reset" margin="small"/>
          <ButtonComponent text="Clear All Set Filters" onPress={() => {
            resetFilters();
            this.popupClearFilters.setPopupVisible(true);
          }} vibrate={70} color={colors.filtersResetButton[global.darkMode]}/>
          <Popup ref={(popupClearFilters) => this.popupClearFilters = popupClearFilters} text="Cleared Set Filters" textLower="All the filters selected have been unset" button1={"OK"} button1Action={()=>{console.log("")}}/>


          <View style={{height: 20}}/>
          <ButtonComponent text="Reset Data" onPress={() => {this.popupWarning.setPopupVisible(true)}} vibrate={100} color={colors.cancelButton[global.darkMode]}/>
          <Popup ref={(popupWarning) => this.popupWarning = popupWarning} text="Reset Data" textLower="Would you like to reset your collection? This action cannot be undone." button2={"Reset"} button1={"Cancel"} button1Action={()=>{console.log("")}} button2Action={()=>{AsyncStorage.clear(); this.popupRestart.setPopupVisible(true)}}/>
          <Popup ref={(popupRestart) => this.popupRestart = popupRestart} text="Restart Required" textLower="Please restart the application." button1Action={()=>{console.log("")}} button2Action={()=>{AsyncStorage.setItem("collectedString", "");}} />
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


class SettingsDivider extends Component {
  render(){
    return <>
      <View style={{marginLeft:this.props.margin==="small" ? 10:23, width:"100%", height: 20, marginTop:9, marginBottom: 3}}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15,}}>{this.props.text}</TextFont>
      </View>
    </>
  }
}