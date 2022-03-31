import React, { Component } from "react";
import {TouchableOpacity, TouchableNativeFeedback, Platform} from "react-native";

export class TouchableNativeFeedback2 extends Component{
  render(){
    if(Platform.OS != "web")
      return(
        <TouchableNativeFeedback style={this.props.style} onLongPress={this.props.onLongPress} onPress={this.props.onPress} background={TouchableNativeFeedback.Ripple(this.props.background)}>
          {this.props.children}
        </TouchableNativeFeedback>
      )
    else
      return(
        <TouchableOpacity style={this.props.style} onLongPress={this.props.onLongPress} onPress={this.props.onPress}>
          {this.props.children}
        </TouchableOpacity>
      )
  }
}