import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont';
import Popup from './Popup';
import ToggleSwitch from 'toggle-switch-react-native'
import colors from "../Colors"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSettingsString} from "../LoadJsonData"

class SettingsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      open:false,
      toggle:this.props.currentValue === "true" ? true : false,
    }
  }
  render(){
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={() => {this.setState({open:!this.state.open}); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
        <View style={[styles.settingsContainer,{backgroundColor:this.props.backgroundColor}]}>
          <Image style={styles.settingsImage} source={this.props.image}/>
          <View style={styles.textContainer}>
            <TextFont bold={true} style={[styles.textContainerTop,{color:this.props.textColor}]}>{this.props.text}</TextFont>
          </View>
          <View style={{position:"absolute", right: 8, transform: [{ scale: 0.75 }]}}>
            <ToggleSwitch
              isOn={this.state.toggle}
              onColor="#57b849"
              offColor="#DFDFDF"
              size="large"
              onToggle={() => {
                AsyncStorage.setItem(this.props.keyName, !this.state.toggle === true ? "true" : "false");
                global.settingsCurrent[this.props.index]["currentValue"] = !this.state.toggle === true ? "true" : "false";
                this.setState({toggle:!this.state.toggle});
                getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
              }}
            />
          </View>
        </View>
        <Popup text={this.props.text} textLower={this.props.description} button1={"OK"} button1Action={()=>{console.log("OK")}} popupVisible={this.state.open} close={() => this.setState({open:!this.state.open})}/>
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
    marginLeft: 13,
  },
  settingsImage: {
    width: 30,
    height: 30,
    resizeMode:'contain',
  },
  settingsContainer: {
    padding: 10,
    paddingLeft: 18,
    margin: 8,
    flexDirection:"row",
    flex:1,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    height: 70
  },
});