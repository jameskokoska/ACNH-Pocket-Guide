import React, {Component} from 'react';
import {Linking, TouchableOpacity,View, Text,} from 'react-native';
import colors from '../Colors'
import TextFont from './TextFont'
import {attemptToTranslate} from "../LoadJsonData"

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


export class GiveSupport extends Component {
  render(){
    return(
      <TouchableOpacity style={[this.props.style,{marginHorizontal:15, padding: 15}]} onPress={() => Linking.openURL('https://ko-fi.com/dapperappdeveloper')}>
        <TextFont bold={false} style={{color: this.props.blueText===true?colors.fishText[global.darkMode]:colors.textBlack[global.darkMode], fontSize: 18, textAlign:"center"}}>If you enjoy this free app, consider supporting the developer :)</TextFont>
        {this.props.tapHere?<TextFont bold={false} style={{color: this.props.blueText===true?colors.fishText[global.darkMode]:colors.textBlack[global.darkMode], fontSize: 18, textAlign:"center", marginTop: 5}}>{"Tap here!"}</TextFont>:<View/>}
        <TextFont bold={false} style={{marginTop:10, color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>Thank you!</TextFont>
      </TouchableOpacity>
    )
  }
}

export class SubHeader extends Component {
  render(){
    return(
      <TextFont numberOfLines={this.props.numberOfLines!==undefined?this.props.numberOfLines:2000} bold={true} style={[{fontSize: 20, marginHorizontal: this.props.margin!==false?30:0, color:colors.textBlack[global.darkMode],},this.props.style]}>{this.props.children}</TextFont>
    )
  }
}

export class Header extends Component {
  render(){
    return(
      <TextFont bold={this.props.bold===false?false:true} style={[{fontSize: 38, marginHorizontal: 30, color:colors.textBlack[global.darkMode]},this.props.style]}>{this.props.children}</TextFont>
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