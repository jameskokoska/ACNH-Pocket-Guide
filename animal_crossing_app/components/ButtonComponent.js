import React, {Component} from 'react';
import {Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'

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
          style={[this.props.style,{marginLeft: 10, marginRight: 10, marginTop: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 7, backgroundColor: this.props.color,  justifyContent: 'center', alignItems: 'center'}]}
          activeOpacity={0.5}
          onPress={()=> {this.props.onPress(); Vibration.vibrate(this.props.vibrate);}}
        >
          <TextFont style={{fontSize: 16, color: "white"}}>{this.props.text}</TextFont>
        </TouchableOpacity>
    )
  }
}
export default ButtonComponent;