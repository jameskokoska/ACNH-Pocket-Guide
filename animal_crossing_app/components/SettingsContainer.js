import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont';
import Popup from './Popup';
import ToggleSwitch from 'toggle-switch-react-native'
import colors from "../Colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSettingsString,getStorage} from "../LoadJsonData"
import {cancelAllPushNotifications} from "../Notifications"

class SettingsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggle:this.props.setting.currentValue === "true" ? true : false,
    }
  }
  render(){
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={() => {this.props.openPopup(this.props.setting);}}>
        <View style={[styles.settingsContainer,{backgroundColor:this.props.backgroundColor}]}>
          <Image style={styles.settingsImage} source={this.props.setting.picture}/>
          <View style={styles.textContainer}>
            <TextFont bold={true} style={[styles.textContainerTop,{color:this.props.textColor}]}>{this.props.setting.displayName}</TextFont>
          </View>
          <View style={{position:"absolute", right: 8, transform: [{ scale: 0.75 }]}}>
            <ToggleSwitch
              isOn={this.state.toggle}
              onColor="#57b849"
              offColor="#DFDFDF"
              size="large"
              onToggle={async () => {
                await AsyncStorage.setItem(this.props.keyName, !this.state.toggle === true ? "true" : "false");
                global.settingsCurrent[this.props.index]["currentValue"] = !this.state.toggle === true ? "true" : "false";
                this.setState({toggle:!this.state.toggle});
                getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
                this.props.updateSettings();
                //Delete saved photos if photo downloading disabled
                console.log(this.props.keyName)
                if(this.props.keyName==="settingsDownloadImages" && this.state.toggle === false){
                  this.props.deleteSavedPhotos();
                }
                if(this.props.keyName==="settingsNotifications" && this.state.toggle === true){
                  cancelAllPushNotifications();
                  this.props.popupLoadNotifications();
                }
                if(this.props.keyName==="settingsAutoBackup" && this.state.toggle === true){
                  cancelAllPushNotifications();
                  this.props.popupAutoBackups();
                }
                if(this.props.keyName==="settingsNotifications" && this.state.toggle === false){
                  cancelAllPushNotifications();
                }
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}
export default SettingsContainer;

const styles = StyleSheet.create({
  textContainerTop:{
    fontSize: 17,
    marginRight: 100,
  },
  textContainerBottom:{
    marginTop: 2,
    fontSize: 16,
  },
  textContainer:{
    marginLeft: 15,
  },
  settingsImage: {
    width: 30,
    height: 30,
    resizeMode:'contain',
  },
  settingsContainer: {
    padding: 10,
    paddingLeft: 18,
    paddingVertical: 22,
    margin: 8,
    flexDirection:"row",
    flex:1,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
});