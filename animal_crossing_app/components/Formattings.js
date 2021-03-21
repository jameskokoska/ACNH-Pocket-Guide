import React, {Component} from 'react';
import {Vibration, Linking, TouchableOpacity, StyleSheet, View, Text, TouchableNativeFeedback} from 'react-native';
import colors from '../Colors'
import TextFont from './TextFont'

export class ExternalLink extends Component {
  render(){
    return(
        <TouchableOpacity onPress={() => Linking.openURL(this.props.link) }>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 16, marginLeft: 30, marginRight: 30, }}>{this.props.link}</TextFont>
        </TouchableOpacity>
    )
  }
}

export class HeaderNote extends Component {
  render(){
    return (
      <TextFont style={{fontSize: 13, marginHorizontal: 30, color:colors.textBlack[global.darkMode]}}>{this.props.children}</TextFont>
    )
  }
}

export class MailLink extends Component {
  render(){
    return(
        <TouchableOpacity onPress={() => Linking.openURL('mailto:dapperappdeveloper@gmail.com') }>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"Suggestions, bugs or concerns?"}</TextFont>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"Send me an email!"}</TextFont>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>dapperappdeveloper@gmail.com</TextFont>
        </TouchableOpacity>
    )
  }
}

export class SubHeader extends Component {
  render(){
    return(
      <TextFont bold={true} style={{fontSize: 22, marginLeft: 30, color:colors.textBlack[global.darkMode],}}>{this.props.children}</TextFont>
    )
  }
}

export class Header extends Component {
  render(){
    return(
      <TextFont bold={true} style={{fontSize: 40, marginHorizontal: 30, color:colors.textBlack[global.darkMode]}}>{this.props.children}</TextFont>
    )
  }
}

export class Paragraph extends Component {
  render(){
    return(
      <Text style={{marginTop: 6, fontSize: 16, marginLeft: 30, marginRight: 30, color:colors.textBlack[global.darkMode]}}>{this.props.children}</Text>
    )
  }
}