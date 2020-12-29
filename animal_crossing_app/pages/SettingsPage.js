import React, {Component} from 'react';
import {ScrollView, View, Dimensions, Text} from 'react-native';
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

const music = require("../assets/data/music.json");
const {width} = Dimensions.get('window');


class SettingsPage extends Component {
  constructor(props){
    super(props);
    this.setCustomTime = this.setCustomTime.bind(this);
    this.state = {
      open:false,
      openRestart:false,
      date:new Date(),
      time:new Date(),
      datePickerVisible: false,
      openDateReminder:false,
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
      <View style={{backgroundColor:colors.lightDarkAccent[colors.mode], height:"100%"}}>
        <ScrollView>
          <View style={{marginTop: 100}}/>
          <TextFont bold={true} style={{fontSize: 40, marginLeft: 30, color:colors.textBlack[colors.mode]}}>Settings</TextFont>
          <View style={{marginTop: 20}}/>
          {global.settingsCurrent.map( (setting, index)=>
            <SettingsContainer 
              key={setting["keyName"]} 
              currentValue={setting["currentValue"]} 
              backgroundColor={colors.white[colors.mode]} 
              textColor={colors.textBlack[colors.mode]} 
              image={setting["picture"]} 
              text={setting["displayName"]} 
              description={setting["description"]}
              index={index}
              keyName={setting["keyName"]}
            />
          )}
          <ButtonComponent vibrate={10} color={colors.dateButton[colors.mode]} onPress={()=>{this.setState({datePickerVisible:true})}} text={"Set Custom Date/Time"} />
          <DateTimePickerModal
            mode={"date"}
            onConfirm={(date)=>{this.setState({datePickerVisible:false, date:date, openDateReminder:true}); this.setCustomTime()}}
            onCancel={()=>{this.setState({datePickerVisible:false})}}
            isVisible={this.state.datePickerVisible}
          />
          <DateTimePickerModal
            mode={"time"}
            onConfirm={(date)=>{this.setState({datePickerVisible:false, time:date});}}
            onCancel={()=>{this.setState({datePickerVisible:false})}}
            isVisible={this.state.datePickerVisible}
          />
          <Popup text="Custom Date" textLower="Ensure the 'Use a custom date' setting is enabled" button1={"OK"} button1Action={()=>{console.log("")}} popupVisible={this.state.openDateReminder} close={() => this.setState({openDateReminder:!this.state.openDateReminder})}/>
          <View style={{height: 50}}/>
          <ExportFile/><LoadFile/>
          <View style={{height: 50}}/>
          <ButtonComponent text="Reset Data" onPress={() => {this.setState({open:true})}} vibrate={100} color={colors.cancelButton[colors.mode]}/>
          <Popup text="Reset Data" textLower="Would you like to reset your collection? This action cannot be undone." button2={"Reset"} button1={"Cancel"} button1Action={()=>{console.log("")}} button2Action={()=>{AsyncStorage.setItem("collectedString", ""); AsyncStorage.setItem("firstLogin", "true"); this.setState({openRestart:true});}} popupVisible={this.state.open} close={() => this.setState({open:!this.state.open})}/>
          <Popup text="Restart Required" textLower="Please restart the application." button1Action={()=>{console.log("")}} button2Action={()=>{AsyncStorage.setItem("collectedString", "");}} popupVisible={this.state.openRestart} close={() => this.setState({open:!this.state.open})}/>
          <View style={{height: 100}}/>
        </ScrollView>
     </View>
     </>
    )
  }
}
export default SettingsPage;