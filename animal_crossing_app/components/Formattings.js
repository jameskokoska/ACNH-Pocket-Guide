import React, {Component} from 'react';
import {Linking, TouchableOpacity,View, Text,} from 'react-native';
import colors from '../Colors'
import TextFont from './TextFont'
import {attemptToTranslate, openURL} from "../LoadJsonData"

export class ExternalLink extends Component {
  render(){
    return(
      <TouchableOpacity onPress={() => openURL(this.props.link) }>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 16, marginLeft: 30, marginRight: 30, }}>{this.props.link}</TextFont>
      </TouchableOpacity>
    )
  }
}

export class HeaderNote extends Component {
  render(){
    return (
      <TextFont style={[{fontSize: 13, marginHorizontal: 33, color:colors.textBlack[global.darkMode]},this.props.style]}>{this.props.children}</TextFont>
    )
  }
}

export class MailLink extends Component {
  render(){
    return(
        <TouchableOpacity onPress={() => openURL('mailto:dapperappdeveloper@gmail.com') }>
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
      <TextFont translate={this.props.translate===true || this.props.translate===undefined} numberOfLines={this.props.numberOfLines!==undefined?this.props.numberOfLines:2000} bold={this.props.bold===undefined || this.props.bold===true?true:false} style={[{fontSize: 20, marginHorizontal: this.props.margin!==false?30:0, color:colors.textBlack[global.darkMode],},this.props.style]}>{this.props.children}</TextFont>
    )
  }
}

export class Header extends Component {
  render(){
    return(
      <TextFont translate={this.props.translate===true || this.props.translate===undefined} bold={this.props.bold===false?false:true} style={[{fontSize: 38, marginHorizontal: 30, color:colors.textBlack[global.darkMode]},this.props.style]}>{this.props.children}</TextFont>
    )
  }
}


{/* <Paragraph styled={true} margin={false}> */}
export class Paragraph extends Component {
  render(){
    if(!this.props.styled){
      return(
        <Text style={[{marginTop: 6, fontSize: 16, marginHorizontal: this.props.margin!==false?30:0, color:colors.textBlack[global.darkMode]}, this.props.style]}>{attemptToTranslate(this.props.children)}</Text>
      )
    } else {
      return(
        <TextFont translate={this.props.translate===false?false:true} bold={false} style={[{marginTop:10, fontSize: 17, marginHorizontal: this.props.margin!==false?30:0, color: colors.textBlack[global.darkMode]}, this.props.style]}>{this.props.children}</TextFont>
      )
    }
  }
}

export class BlueText extends Component {
  render(){
    return(
      <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center", marginVertical: 10}}>{attemptToTranslate(this.props.children)}</TextFont>
    )
  }
}