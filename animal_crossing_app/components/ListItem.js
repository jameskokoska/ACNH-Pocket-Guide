import React, {PureComponent, useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  Vibration,
  Image,
} from 'react-native';
import TextFont from './TextFont';
import Check from './Check';
import FastImage from './FastImage';
import {checkOff, capitalize, commas, removeBrackets} from "../LoadJsonData"
import {getPhotoShadow} from "./GetPhoto"
import {getMonthShort} from "./DateFunctions"
import colors from "../Colors"
import {getCurrentDateObject, parseActiveTime} from "./DateFunctions"
import {getSettingsString} from "../LoadJsonData"

const {width} = Dimensions.get('window');

class ListItem extends PureComponent{
  constructor(props) {
    super(props);
    this.setCollected = this.setCollected.bind(this);
    this.state = {
      collected: props.item.collected,
    }
  }
  setCollected(collected){
    this.setState({collected: collected})
  }
  // componentWillUnmount(){
  //   console.log("unmount")
  //   this.setState({unMounting:true})
  // }
  render(){
    if(this.state.collected!==this.props.item.collected){
      this.setCollected(this.props.item.collected)
    }
    var disablePopup;
    if(this.props.disablePopup===undefined){
      disablePopup=false;
    } else {
      disablePopup=this.props.disablePopup[this.props.item.dataSet];
    }

    var boxColor = colors.white[global.darkMode];
    if(this.props.boxColor===true && getSettingsString("settingsColorLists")==="true"){
      if(this.props.item.["Color 1"]!==undefined){
        var opacity = "0A"
        if(global.darkMode){
          opacity = "10"
        }
        if(this.props.item.["Color 2"]!==undefined && global.darkMode===0 && ( this.props.item.["Color 1"]==='Yellow' || this.props.item.["Color 1"]==='White')){
          boxColor = colors["itemBox"+this.props.item.["Color 2"]][global.darkMode]+opacity
          if(this.props.item.["Color 2"]==='Colorful'){
            boxColor = colors["itemBox"+this.props.item.["Color 1"]][global.darkMode]+opacity
          }
        } else if(this.props.item.["Color 2"]!==undefined && global.darkMode===1 && (this.props.item.["Color 1"]==='Black' || this.props.item.["Color 1"]==='Gray')){
          boxColor = colors["itemBox"+this.props.item.["Color 2"]][global.darkMode]+opacity
          
        } else if (this.props.item.["Color 2"]!==undefined && (this.props.item.["Color 1"]==='Colorful')){
          boxColor = colors["itemBox"+this.props.item.["Color 2"]][global.darkMode]+opacity
          if(this.props.item.["Color 2"]==='Colorful'){
            boxColor = colors["itemBox"+this.props.item.["Color 1"]][global.darkMode]+opacity
          }
        } else {
          boxColor = colors["itemBox"+this.props.item.["Color 1"]][global.darkMode]+opacity
        }
      }
    }
    if(this.props.leaveWarning){
      var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH "
      var nextMonthShort = getMonthShort(getCurrentDateObject().getMonth()+1);
      var currentMonthShort = getMonthShort(getCurrentDateObject().getMonth());
      
      if(this.props.item[hemispherePre+nextMonthShort]==="NA" && this.props.item[hemispherePre+currentMonthShort]!=="NA"){
        boxColor = colors.creaturesLeavingBG[global.darkMode];
      }
    }

    var textProperty2Text;
    if(this.props.textProperty2!==undefined){
      textProperty2Text = this.props.textProperty2[this.props.item.dataSet];
    }
    if(this.props.textProperty2!==undefined && this.props.textProperty2[this.props.item.dataSet]==="creatureTime"){
      var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH "
      var currentMonthShort = getMonthShort(getCurrentDateObject().getMonth());
      textProperty2Text = this.props.item[hemispherePre+currentMonthShort];
      if(getSettingsString("settingsUse24HourClock")==="true" && textProperty2Text!=="NA" && textProperty2Text!=="All day"){
        var splitString = textProperty2Text.replace(/[^\x00-\x7F]/g, "");
        splitString = splitString.replace("  ", " ");
        splitString = splitString.split(" ");
        textProperty2Text = parseActiveTime(splitString, 0).toString()+":00" + " - " + parseActiveTime(splitString, 2).toString()+ ":00"
      }
    }

    if(this.props.gridType==="smallGrid"){
      var textProperty2Component = <View/>;
      if(this.props.textProperty2!==undefined && this.props.textProperty2[this.props.item.dataSet]!==""){
        if(this.props.textProperty2[this.props.item.dataSet]==="(DIY)")
          textProperty2Component = <TextFont bold={false} style={{textAlign:'center', color:this.props.labelColor, fontSize:12}}>(DIY)</TextFont>
        else 
          textProperty2Component = <TextFont bold={false} style={{textAlign:'center', color:this.props.labelColor, fontSize:12}}>{capitalize(this.props.item[textProperty2Text])}</TextFont>
      }
      return (
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
            this.setCollected(this.state.collected==="true" ? "false":"true");
          }}
            background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
            onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
                this.setCollected(this.state.collected==="true" ? "false":"true");
              } else {
                this.props.openBottomSheet(this.setCollected);
              }
            }}
          >
            <View style={[styles.gridBox, {backgroundColor:boxColor}]}>
              <Check checkType={this.props.checkType} style={{position:'absolute', right: -9, top: -9, zIndex:10}} play={this.state.collected==="true"} width={53} height={53} disablePopup={disablePopup}/>
              <FastImage
                style={styles.gridBoxImage}
                source={{
                  uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                }}
                cacheKey={this.props.item.[this.props.imageProperty[this.props.item.dataSet]]}
              />
              <View style={styles.gridBoxText}>
                <TextFont numberOfLines={2} bold={true} style={{textAlign:'center', color:this.props.labelColor, fontSize:13}}>{capitalize(this.props.item.[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
                {textProperty2Component}
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    } else if (this.props.gridType==="largeGrid"){
      return( 
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
            this.setCollected(this.state.collected==="true" ? "false":"true");
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
          onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
                this.setCollected(this.state.collected==="true" ? "false":"true");
              } else {
                this.props.openBottomSheet(this.setCollected);
              }
            }}
          >
            <View style={[styles.gridBoxLarge, {backgroundColor:boxColor}]}>
              <Check checkType={this.props.checkType} style={{position:'absolute', right: -8, top: -10, zIndex:10}} play={this.state.collected==="true"} width={53} height={53} disablePopup={disablePopup}/>
              <FastImage
                style={styles.gridBoxImageLarge}
                source={{
                  uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                }}
                cacheKey={this.props.item.[this.props.imageProperty[this.props.item.dataSet]]}
              />
              <View style={styles.gridBoxTextLarge}>
                <TextFont bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{capitalize(this.props.item.[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    } else if (this.props.gridType==="largeGridSmaller"){
      var priceComponent = <View/>
      if(this.props.textProperty2==="construction" && this.props.item["Buy"] !== undefined && this.props.item["Buy"] !== "5000" && this.props.item["Buy"] !== "NFS"){
        priceComponent = <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:15,height:15,resizeMode:'contain',  marginRight:3}} source={require("../assets/icons/bellBag.png")}/><TextFont bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{commas(this.props.item["Buy"])}</TextFont></View>
      } else if(this.props.textProperty2==="construction" && this.props.item["Sell"] !== undefined){
        priceComponent = <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:15,height:15,resizeMode:'contain',  marginRight:3}} source={require("../assets/icons/coin.png")}/><TextFont bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{commas(this.props.item["Sell"])}</TextFont></View>
      } else if(this.props.textProperty2==="cards"){
        if(this.props.item[getSettingsString("settingsNorthernHemisphere") === "true" ? "NH Start Date":"SH Start Date"] !== (undefined || "NA")){
          priceComponent = <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:15,height:15,resizeMode:'contain',  marginRight:3}} source={require("../assets/icons/clockIcon.png")}/><TextFont bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{this.props.item[getSettingsString("settingsNorthernHemisphere") === "true" ? "NH Start Date":"SH Start Date"] + " - " + this.props.item[getSettingsString("settingsNorthernHemisphere") === "true" ? "NH End Date":"SH End Date"]}</TextFont></View>
        } else if (this.props.item["Buy"]==="NFS") {
          priceComponent = <TextFont bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{"NFS"}</TextFont>
        }
      }
      return( 
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
            this.setCollected(this.state.collected==="true" ? "false":"true");
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
          onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
                this.setCollected(this.state.collected==="true" ? "false":"true");
              } else {
                this.props.openBottomSheet(this.setCollected);
              }
            }}
          >
            <View style={[styles.gridBoxLarge, {backgroundColor:boxColor}]}>
              <Check checkType={this.props.checkType} style={{position:'absolute', right: -8, top: -10, zIndex:10}} play={this.state.collected==="true"} width={53} height={53} disablePopup={disablePopup}/>
              <FastImage
                style={styles.gridBoxImageLargeSmaller}
                source={{
                  uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                }}
                cacheKey={this.props.item.[this.props.imageProperty[this.props.item.dataSet]]}
              />
              <View style={styles.gridBoxTextLargeSmaller}>
                <TextFont bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{capitalize(this.props.item.[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
                {priceComponent}
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    } else { //Row component
      var fishShadow = <View/>
      if(this.props.popUpContainer!==undefined && this.props.popUpContainer[this.props.item.dataSet][0]==="FishPopup"){
        fishShadow = <View style={{position:"absolute", right: 75, bottom: 20,}}><Image style={{width:80,height:22,resizeMode:'contain',  marginRight:3}} source={getPhotoShadow(this.props.item,false)}/></View>
      }
      return( 
        <View>
          <TouchableNativeFeedback onLongPress={() => {  
            checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
            this.setCollected(this.state.collected==="true" ? "false":"true");
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
          onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
                this.setCollected(this.state.collected==="true" ? "false":"true");
              } else {
                this.props.openBottomSheet(this.setCollected);
              }
            }}
          >
            <View style={[styles.row,{backgroundColor:boxColor}]}>
              <View style={[styles.rowImageBackground,{backgroundColor:this.props.accentColor}]}>
                <FastImage
                  style={styles.rowImage}
                  source={{
                    uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                  }}
                  cacheKey={this.props.item.[this.props.imageProperty[this.props.item.dataSet]]}
                />
              </View>
              <View style={styles.rowTextContainer}>
                <View style={styles.rowTextTop}>
                  <TextFont bold={true} numberOfLines={2} style={{fontSize:20, color:this.props.labelColor}}>{capitalize(this.props.item.[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
                </View>
                <View style={styles.rowTextBottom}>
                  <TextFont bold={true} numberOfLines={2} style={{fontSize:16, color:this.props.specialLabelColor}}>{capitalize(removeBrackets(textProperty2Text))}</TextFont>
                </View>
                <View style={styles.rowTextBottom}>
                  <TextFont bold={true} numberOfLines={2} style={{fontSize:16, color:this.props.specialLabelColor}}>{capitalize(removeBrackets(this.props.item.[this.props.textProperty3[this.props.item.dataSet]]))}</TextFont>
                </View>
              </View>
              {fishShadow}
              <TouchableOpacity style={{position:"absolute", right: -5}} 
                activeOpacity={0.6}
                onPress={() => {  
                checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
                this.setCollected(this.state.collected==="true" ? "false":"true");
              }}>
                <Check checkType={this.props.checkType} fadeOut={false} play={this.state.collected==="true"} width={90} height={90} disablePopup={disablePopup}/>
              </TouchableOpacity>
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    }
  }
};

export default ListItem;

const styles = StyleSheet.create({
  rowTextBottom:{
    width: "100%",
    paddingLeft: 4,
    paddingRight: 3,
    marginTop: 1,
  },
  rowTextTop:{
    width: "100%",
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 2
  },
  rowTextContainer:{
    margin:6,
    marginLeft: 10,
    marginRight: 125,
  },
  rowImageBackground:{
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  rowImage:{
    height: 55,
    width: 55,
    resizeMode:'contain',
  },
  row: {
    padding: 13,
    alignItems: 'center',
    flexDirection:"row",
    height: 88,
    width: "100%",
    borderRadius:10,
    elevation: 0,
    marginTop: 7,
  },
  gridBoxText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 13
  },
  gridBoxTextLarge: {
    flex: 1,
    width: 130,
    marginTop: 5,
    paddingLeft: 3,
    paddingRight: 3
  },
  gridBoxTextLargeSmaller: {
    flex: 1,
    width: 130,
    justifyContent: "center",
    height: 25,
    marginTop: 0,
    paddingLeft: 3,
    paddingRight: 3
  },
  gridWrapper: {
    marginVertical: 3, 
    alignItems: 'center', 
    flex: 1,
  },
  gridBoxImage: {
    height: 90,
    width: 90,
    borderRadius:5,
    marginTop: 10,
    resizeMode:'contain',
  },
  gridBoxImageLarge: {
    height: "75%",
    width: "80%",
    borderRadius:5,
    marginTop: 15,
    resizeMode:'contain',
  },
  gridBoxImageLargeSmaller: {
    height: 120,
    width: 120,
    borderRadius:5,
    marginTop: 15,
    resizeMode:'contain',
  },
  gridBox: {
    alignItems: "center",
    height: 150,
    width: "92%",
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 0,
    margin: 2,
  },
  gridBoxLarge: {
    alignItems: "center",
    height: 200,
    width: "94%",
    borderRadius:10,
    elevation: 0,
    margin: 2,
  },
});
