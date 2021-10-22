import React, {Component} from 'react';
import {Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'
import {getSettingsString} from "../LoadJsonData"

// <ButtonComponent
//   text={"Cancel"}
//   color={"red"}
//   vibrate={10}
//   onPress={() => { }}
// />

class ButtonComponent extends Component {
  componentDidMount() {
    
  }
  render(){
    return(
        <TouchableOpacity
          style={[this.props.style,{marginHorizontal:this.props.marginHorizontal===undefined?10:this.props.marginHorizontal, marginTop: 15, paddingHorizontal:30, paddingTop: 12, paddingBottom: 12, elevation:2, borderRadius: 19, backgroundColor: this.props.color,  justifyContent: 'center', alignItems: 'center'}]}
          activeOpacity={0.5}
          onPress={()=> {this.props.onPress(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(this.props.vibrate) : "";}}
        >
          <TextFont style={{fontSize: 16, color: "white", textAlign:"center"}}>{this.props.text}</TextFont>
        </TouchableOpacity>
    )
  }
}
export default ButtonComponent;