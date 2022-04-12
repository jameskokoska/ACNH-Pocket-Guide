import React, {Component} from 'react';
import {Vibration,TouchableNativeFeedback,TouchableOpacity, View, Image, Animated, Dimensions} from 'react-native';
import TextFont from './TextFont';
import {getStorage, capitalize, commas, findObjectWithGlobal, setSettingsString} from "../LoadJsonData"
import colors from '../Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSettingsString, attemptToTranslate} from "../LoadJsonData"
import { ToolItem } from './DurabilityList';
import ButtonComponent from './ButtonComponent';
import Popup from './Popup';
import GuideRedirectButton from './PopupGuideRedirectButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CustomDatePicker } from '../pages/SettingsPage';
import { ConfigureHomePageSettingContainer } from '../pages/HomePage';

export default class TimeTravel extends Component {
  constructor(props){
    super(props);
    this.state = {loaded:false}
  }

  async componentDidMount (){
    this.mounted=true;
    const customDateSetting = (await getSettingsString("settingsUseCustomDate")==="true")?true:false;
    this.setState({customDateSetting: customDateSetting, loaded: true})
  }

  componentWillUnmount(){
    this.mounted=false;
  }

  setDateOffset = (timeOffset, finalSet) => {
    global.customTimeOffset = timeOffset;
    AsyncStorage.setItem("customDateOffset"+global.profile, timeOffset.toString());
    if(finalSet && this.state.customDateSetting){
      this.props.setPage(0, true, "force refresh")
    }
  }

  updateCustomDate = async (value) => {
    setSettingsString("settingsUseCustomDate",value?"true":"false");
    await AsyncStorage.setItem("settingsUseCustomDateSaved"+this.profile, value?"true":"false");
    this.props.setPage(0, true, "force refresh")
    this.setState({customDateSetting: value})
  }

  render(){
    const extraInfo= {
      type:"guideRedirect",
      title:"Guide + FAQ",
      content:"You can read more details about shooting stars by visiting the guide page.",
      linkText: "Tap here to read more about shooting stars",
      redirectPassBack: "shootingStarsRedirect"
    }
    if(!this.state.loaded){
      return <View></View>
    }
    return <>
        <View style={{height:10}}/>
        <View style={{marginHorizontal: 10}}>
          <ConfigureHomePageSettingContainer backgroundColor={colors.eventBackground[global.darkMode]} title={"Use a custom date"} defaultValue={this.state.customDateSetting} onCheck={(check) => {this.updateCustomDate(check)}}/>
        </View>
        <View style={{marginHorizontal: 20}}>
          <CustomDatePicker showPopup={true} setDateOffset={this.setDateOffset}/>
        </View>
        <View style={{height:10}}/>

      </>
  }
}