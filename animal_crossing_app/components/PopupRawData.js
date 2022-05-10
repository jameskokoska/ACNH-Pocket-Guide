import React, { Component } from "react";
import {
  View, Image
} from "react-native";
import TextFont from "./TextFont";
import colors from "../Colors";
import { PopupInfoCustom } from "./Popup";
import { attemptToTranslate, capitalize } from "../LoadJsonData";
import FastImage from "./FastImage";
import { getMaterialImage, getPhoto, getPhotoCorner, getSizeImage } from "./GetPhoto";


export default class PopupRawData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
    };
  }

  setPopupVisible = (visible, item) => {
    this.popup?.setPopupVisible(true);
    this.setState({item:item})
  }

  render(){

    const labelsAndImages = {
      "Sell" : require("../assets/icons/coin.png"),
      "Buy" : require("../assets/icons/bellBag.png"),
      "Color 1" : require("../assets/icons/colorPalette.png"),
      "Color 2" : require("../assets/icons/colorPalette.png"),
      "Weather" : require("../assets/icons/weather.png"),
      "Spawn Rates" : require("../assets/icons/hatching.png"),
      "Style 1" : require("../assets/icons/sparkle.png"),
      "Style 2" : require("../assets/icons/sparkle.png"),
      "Variation" : require("../assets/icons/pattern.png"),
      "Label Themes" : require("../assets/icons/label.png"),
      "Seasonal Availability" : require("../assets/icons/season.png"),
      "Season/Event" : require("../assets/icons/popper.png"),
      "Source Notes": require("../assets/icons/magnifyingGlass.png"),
      "Data Category" : require("../assets/icons/scroll.png"),
      "Shadow": require("../assets/icons/magnifyingGlass.png"),
      "Kit Cost":require("../assets/icons/diyKit.png"),
      "Tag":require("../assets/icons/tag.png"),
      "HHA Series":require("../assets/icons/house.png"),
      "HHA Concept 1":require("../assets/icons/house.png"),
      "HHA Concept 2":require("../assets/icons/house.png"),
      "Size":this.state.item["Size"]!==undefined ? getSizeImage(this.state.item["Size"]) : require("../assets/icons/leaf.png"),
      "Cyrus Customize Price":require("../assets/icons/cyrus.png"),
      "Sound Type":require("../assets/icons/instrument.png"),
      "Material 1":this.state.item["Material 1"]!==undefined ? getMaterialImage(this.state.item["Material 1"]) : require("../assets/icons/leaf.png"),
      "Material 2":this.state.item["Material 2"]!==undefined ? getMaterialImage(this.state.item["Material 2"]) : require("../assets/icons/leaf.png"),
      "Material 3":this.state.item["Material 3"]!==undefined ? getMaterialImage(this.state.item["Material 3"]) : require("../assets/icons/leaf.png"),
      "Material 4":this.state.item["Material 4"]!==undefined ? getMaterialImage(this.state.item["Material 4"]) : require("../assets/icons/leaf.png"),
      "Material 5":this.state.item["Material 5"]!==undefined ? getMaterialImage(this.state.item["Material 5"]) : require("../assets/icons/leaf.png"),
      "Material 6":this.state.item["Material 6"]!==undefined ? getMaterialImage(this.state.item["Material 6"]) : require("../assets/icons/leaf.png"),
      "Material 7":this.state.item["Material 7"]!==undefined ? getMaterialImage(this.state.item["Material 7"]) : require("../assets/icons/leaf.png"),
      "Material 8":this.state.item["Material 8"]!==undefined ? getMaterialImage(this.state.item["Material 8"]) : require("../assets/icons/leaf.png"),
      "Material 9":this.state.item["Material 9"]!==undefined ? getMaterialImage(this.state.item["Material 9"]) : require("../assets/icons/leaf.png"),
      "Material 10":this.state.item["Material 10"]!==undefined ? getMaterialImage(this.state.item["Material 10"]) : require("../assets/icons/leaf.png"),
      "NH Jan":require("../assets/icons/alarmClock.png"),
      "NH Feb":require("../assets/icons/alarmClock.png"),
      "NH Jan":require("../assets/icons/alarmClock.png"),
      "NH Feb":require("../assets/icons/alarmClock.png"),
      "NH Mar":require("../assets/icons/alarmClock.png"),
      "NH Apr":require("../assets/icons/alarmClock.png"),
      "NH May":require("../assets/icons/alarmClock.png"),
      "NH Jun":require("../assets/icons/alarmClock.png"),
      "NH Jul":require("../assets/icons/alarmClock.png"),
      "NH Aug":require("../assets/icons/alarmClock.png"),
      "NH Sep":require("../assets/icons/alarmClock.png"),
      "NH Oct":require("../assets/icons/alarmClock.png"),
      "NH Nov":require("../assets/icons/alarmClock.png"),
      "NH Dec":require("../assets/icons/alarmClock.png"),
      "SH Jan":require("../assets/icons/alarmClock.png"),
      "SH Feb":require("../assets/icons/alarmClock.png"),
      "SH Mar":require("../assets/icons/alarmClock.png"),
      "SH Apr":require("../assets/icons/alarmClock.png"),
      "SH May":require("../assets/icons/alarmClock.png"),
      "SH Jun":require("../assets/icons/alarmClock.png"),
      "SH Jul":require("../assets/icons/alarmClock.png"),
      "SH Aug":require("../assets/icons/alarmClock.png"),
      "SH Sep":require("../assets/icons/alarmClock.png"),
      "SH Oct":require("../assets/icons/alarmClock.png"),
      "SH Nov":require("../assets/icons/alarmClock.png"),
      "SH Dec":require("../assets/icons/alarmClock.png"),
      "NH Jan Active":require("../assets/icons/calendar.png"),
      "NH Feb Active":require("../assets/icons/calendar.png"),
      "NH Jan Active":require("../assets/icons/calendar.png"),
      "NH Feb Active":require("../assets/icons/calendar.png"),
      "NH Mar Active":require("../assets/icons/calendar.png"),
      "NH Apr Active":require("../assets/icons/calendar.png"),
      "NH May Active":require("../assets/icons/calendar.png"),
      "NH Jun Active":require("../assets/icons/calendar.png"),
      "NH Jul Active":require("../assets/icons/calendar.png"),
      "NH Aug Active":require("../assets/icons/calendar.png"),
      "NH Sep Active":require("../assets/icons/calendar.png"),
      "NH Oct Active":require("../assets/icons/calendar.png"),
      "NH Nov Active":require("../assets/icons/calendar.png"),
      "NH Dec Active":require("../assets/icons/calendar.png"),
      "SH Jan Active":require("../assets/icons/calendar.png"),
      "SH Feb Active":require("../assets/icons/calendar.png"),
      "SH Mar Active":require("../assets/icons/calendar.png"),
      "SH Apr Active":require("../assets/icons/calendar.png"),
      "SH May Active":require("../assets/icons/calendar.png"),
      "SH Jun Active":require("../assets/icons/calendar.png"),
      "SH Jul Active":require("../assets/icons/calendar.png"),
      "SH Aug Active":require("../assets/icons/calendar.png"),
      "SH Sep Active":require("../assets/icons/calendar.png"),
      "SH Oct Active":require("../assets/icons/calendar.png"),
      "SH Nov Active":require("../assets/icons/calendar.png"),
      "SH Dec Active":require("../assets/icons/calendar.png"),
    }

    let header = <View/>
    let content = <View/>
    if(this.state.item!==""){
      header = <>
        <TextFont bold={true} style={{fontSize: 24, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{capitalize(this.state.item["NameLanguage"])}</TextFont>      
        <View style={{height:10}}/>
      </>
      content = <>
        {Object.keys(this.state.item).map((key)=>{
          return <View key={key} style={{flexDirection:"row", flexWrap:"wrap", alignItems:"center", marginBottom:3}}>
            {labelsAndImages[key]!==undefined && !labelsAndImages[key].toString().startsWith("https:") ? <Image
                style={{width:17, height:17, resizeMode:"contain", marginRight: 4}}
                source={labelsAndImages[key]}
              /> : <View/>
            }
            {labelsAndImages[key]!==undefined && labelsAndImages[key].toString().startsWith("https:") ? <FastImage
                style={{width:25, height:25, resizeMode:"contain", marginRight: 4}}
                source={{uri:labelsAndImages[key].toString()}}
                cacheKey={labelsAndImages[key].toString()}
              /> : <View/>
            }
            <TextFont translate={false} suffix={": "} bold style={{fontSize: 15, color: colors.textBlack[global.darkMode]}}>{attemptToTranslate(key)}</TextFont>
            {this.state.item[key].toString().startsWith("https:") ? <View style={{width:"100%"}}><FastImage
              style={{width:150, height:150, resizeMode:"contain",}}
              source={{uri:this.state.item[key]}}
              cacheKey={this.state.item[key]}
            /></View> : <View/>}
            <TextFont translate={false} style={{paddingBottom:2, fontSize: 15, color: colors.textBlack[global.darkMode]}}>{attemptToTranslate(this.state.item[key], true)}</TextFont>
          </View>
        })}
      </>
    }
    return (
      <PopupInfoCustom ref={(popup) => this.popup = popup} buttonDisabled={true} header={header}>
        {content}
      </PopupInfoCustom>
    )
  }
}
