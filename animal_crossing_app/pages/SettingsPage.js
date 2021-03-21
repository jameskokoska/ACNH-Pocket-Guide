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
import {HeaderNote, MailLink, Header} from "../components/Formattings"
import DropDownPicker from 'react-native-dropdown-picker'

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
          <Header>Settings</Header>
          <HeaderNote>Tap each setting to learn more</HeaderNote>
          <View style={{marginTop: 15}}/>
          <SettingsDivider text={"Game language"}/>
          <LanguagePicker/>
          <View style={{height:10}}/>
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


export class LanguagePicker extends Component{
  render(){
    return(<>
      <View style={{marginTop:10, marginBottom:8, marginHorizontal:20, justifyContent:"center"}}>
        <DropDownPicker
          items={[
            {label: "English", value: "English",},
            {label: "English (Europe)", value: "English (Europe)",},
            {label: "German", value: "German",},
            {label: "Spanish", value: "Spanish",},
            {label: "Spanish (US)", value: "Spanish (US)",},
            {label: "French", value: "French",},
            {label: "French (Quebec)", value: "French (US)",},
            {label: "Italian", value: "Italian",},
            {label: "Dutch", value: "Dutch",},
            {label: "Chinese", value: "Chinese",},
            {label: "Chinese (Traditional)", value: "Chinese (Traditional)",},
            {label: "Japanese", value: "Japanese",},
            {label: "Korean", value: "Korean",},
            {label: "Russian", value: "Russian",},
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
          onChangeItem={async (item)=>{global.language=item.value, await AsyncStorage.setItem("Language", item.value);}}
        />
      </View>
      <HeaderNote>A restart may be required to see changes.</HeaderNote>
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