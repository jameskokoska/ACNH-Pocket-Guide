import React, {Component} from 'react';
import {AccessibilityInfo, Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback, Dimensions} from 'react-native';
import TextFont from './TextFont';
import Popup from './Popup';
import ToggleSwitch from 'toggle-switch-react-native'
import colors from "../Colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSettingsString,getStorage, resetAlphabeticalFilters} from "../LoadJsonData"
import {cancelAllPushNotifications} from "../Notifications"
import { DropdownMenu } from './Dropdown';
import { WishlistSelectionPopup } from '../pages/WishlistPage';

class SettingsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggle:this.props.setting.currentValue === "true" ? true : false,
    }
  }
  render(){
    if(this.props.setting.hideCompletely===true){
      return <View/>
    }
    if(this.props.keyName==="settingsSelectDefaultWishlist" && (global.customLists===undefined || global.customLists.length<=0)){
      return <View/>
    }
    const hideSwitch = this.props.keyName==="settingsEditHomePage" || this.props.keyName==="settingsEditNotifications" || this.props.setting.dropdownValues!==undefined
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={() => {
        if(!hideSwitch){
          this.props.openPopup(this.props.setting);
        }else {
          if(this.props.keyName==="settingsEditHomePage"){
            this.props.setPage(0, true, "editSections")
          } else if(this.props.keyName==="settingsEditNotifications"){
            this.props.setPage(0, true, "editNotifications")
          }
        }
      }}>
        <View style={[styles.settingsContainer,{backgroundColor:this.props.backgroundColor}]}>
          <Image style={styles.settingsImage} source={this.props.setting.picture}/>
          <View style={styles.textContainer}>
            {this.props.setting.dropdownValues===undefined ? 
              <TextFont bold={true} style={[styles.textContainerTop,{color:this.props.textColor, fontSize:17}]}>{this.props.setting.displayName}</TextFont>
              :
              <View style={{marginVertical:-25, marginLeft:-9}}>
                <DropdownMenu
                  paddingHorizontal={10}
                  padding={25}
                  fontSize={17}
                  translate={true}
                  width={Dimensions.get('window').width-143}
                  selection={true}
                  items={[...this.props.setting.dropdownValues.map((item)=>{
                    return {label: item, value: item,}
                  })]}
                  defaultValue={this.props.setting.getDefaultValue()}
                  onChangeItem={async (item)=>{
                    await this.props.setting.onChangeItem(item); 
                    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
                    this.props.updateSettings();
                    if(this.props.keyName==="settingsDarkMode" || this.props.keyName==="settingsAutoDarkMode"){
                      this.props.updatePage()
                    }
                  }
                }/>
              </View>
            }
          </View>
          <View style={{position:"absolute", right: 8, transform: [{ scale: 0.75 }]}}>
            {!hideSwitch ? <ToggleSwitch
              animationSpeed={global.reducedMotion ? 0 : 250}
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
                if(this.props.keyName==="settingsSortAlphabetically"){
                  resetAlphabeticalFilters();
                }
                if(this.props.keyName==="settingsSelectDefaultWishlist" && this.state.toggle === true){
                  this.props.popupSelectWishlist()
                }
                if(this.props.keyName==="settingsReducedMotionAndAnimations"){
                  global.reducedMotion = await AccessibilityInfo.isReduceMotionEnabled() || this.state.toggle
                }
              }}
            /> : this.props.setting.dropdownValues!==undefined ? <View/> : <Image
                style={{width:35,height:35,resizeMode:'contain',marginRight:5}}
                source={global.darkMode ? require("../assets/icons/rightArrowWhite.png") : require("../assets/icons/rightArrow.png")}
              />
            }
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