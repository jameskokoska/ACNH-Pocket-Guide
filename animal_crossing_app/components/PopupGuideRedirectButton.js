import React, { Component } from "react";
import {
  Text,
  View,
  Vibration,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import FadeInOut from "./FadeInOut"
import {PopupInfoCustom} from "./Popup"
import {SubHeader, Paragraph} from "./Formattings"
import { openURL } from "../LoadJsonData";

//  <GuideRedirectButton style={{position:"absolute", padding:15, right:0}} extraInfo={extraInfo} setPage={this.props.setPage}/>
// icon={"i"}

// extraInfo={
//   [
//     attemptToTranslate("Obtainable DIYs"),
//     attemptToTranslate("Specific villager personalities will give you different items."),
//     attemptToTranslate("It is recommended that you have all personality types to be able to get all DIYs and Reactions."),
//     attemptToTranslate("These DIYs WILL be given to you by your villagers:"),
//     getCurrentVillagerNamesString(),
//     getInverseVillagerFilters(true)===""? attemptToTranslate("You can get everything since you have all personality types!") : attemptToTranslate("Missing personalities:") + " " + getInverseVillagerFilters(true),        
//   ]
// }


// extraInfo={
//   {
//     type:"guideRedirect",
//     title:"Guide + FAQ",
//     content:"You can read more details about gifts by visiting the guide page",
//     linkText: "Tap here to read more about gifting",
//     redirectPassBack: "giftsRedirect"
//   }
// }


export default class GuideRedirectButton extends Component {
  render(){
    if(this.props.extraInfo===undefined){
      return <View/>
    }
    var icon;
    if(this.props.icon==="i"){
      icon = global.darkMode?require("../assets/icons/infoWhite.png"):require("../assets/icons/info.png");
    } else {
      icon = global.darkMode?require("../assets/icons/aboutWhite.png"):require("../assets/icons/about.png");
    }
    if(this.props.extraInfo && this.props.setPage){
      return (
        <>
          <TouchableOpacity style={[this.props.style,{zIndex:5}]} onPress={()=>{this.popupExtraInfo?.setPopupVisible(true)}}>
            <Image style={{width:25,height:25,opacity: 0.35, resizeMode:"contain"}} source={icon}/>
          </TouchableOpacity>
          <PopupInfoCustom ref={(popupExtraInfo) => this.popupExtraInfo = popupExtraInfo} buttonText={"Close"}>
            <View style={{height:6}}/>
            <SubHeader>{this.props.extraInfo.title}</SubHeader>
            <Paragraph styled={true}>{this.props.extraInfo.content}</Paragraph>
            {this.props.extraInfo.content2!==undefined?<Paragraph styled={true}>{this.props.extraInfo.content2}</Paragraph>:<View/>}
            {this.props.extraInfo.content3!==undefined?<Paragraph styled={true}>{this.props.extraInfo.content3}</Paragraph>:<View/>}
            {this.props.extraInfo.type==="externalRedirect"?<TouchableOpacity onPress={() => openURL(this.props.extraInfo.redirectPassBack)}>
              <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center", padding:10, marginTop:10}}>{this.props.extraInfo.linkText}</TextFont>
            </TouchableOpacity>:<TouchableOpacity onPress={() => this.props.setPage(15, true, this.props.extraInfo.redirectPassBack)}>
              <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center", padding:10, marginTop:10}}>{this.props.extraInfo.linkText}</TextFont>
            </TouchableOpacity>}
          </PopupInfoCustom>
        </>
      )
    } else if (!this.props.extraInfo.hasOwnProperty("type") && this.props.extraInfo!=="" && this.props.extraInfo.constructor!==String){
      return(
        <>
          <TouchableOpacity style={[this.props.style,{zIndex:5}]} onPress={()=>{this.popupExtraInfo?.setPopupVisible(true)}}>
            <Image style={{width:25,height:25,opacity: 0.35, resizeMode:"contain"}} source={icon}/>
          </TouchableOpacity>
          <PopupInfoCustom ref={(popupExtraInfo) => this.popupExtraInfo = popupExtraInfo} buttonText={"Close"}>
            <View style={{height:6}}/>
            <SubHeader>{this.props.extraInfo[0]}</SubHeader>
            {this.props.extraInfo.slice(1,this.props.extraInfo.length).map( (info, index)=>{
              return(
                <Paragraph key={info} styled={true}>{info}</Paragraph>
              )
            })}
          </PopupInfoCustom>
        </>
      )
    } else {
      return <View/>
    }
  }
}