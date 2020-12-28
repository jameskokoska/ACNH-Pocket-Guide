import React, {Component, useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextFont from './TextFont';
import Check from './Check';
import CachedImage from 'react-native-expo-cached-image';
import {checkOff, capitalize, commas, removeBrackets} from "../LoadJsonData"
import {getPhotoShadow} from "./GetPhoto"
import {getMonthShort} from "./DateFunctions"
import colors from "../Colors"

const {width} = Dimensions.get('window');

class ListItem extends Component{
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
  componentWillUnmount(){
    this.setState({unMounting:true})
  }
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

    var boxColor = this.props.boxColor;
    if(this.props.leaveWarning){
      var hemispherePre = global.settingsCurrent[0]["currentValue"] === "true" ? "NH " : "SH "
      var nextMonthShort = getMonthShort(new Date().getMonth()+1);
      var currentMonthShort = getMonthShort(new Date().getMonth());
      
      if(this.props.item[hemispherePre+nextMonthShort]==="NA" && this.props.item[hemispherePre+currentMonthShort]!=="NA"){
        boxColor = colors.creaturesLeavingBG[colors.mode];
      }
    }

    var textProperty2Text;
    if(this.props.textProperty2!==undefined){
      textProperty2Text = this.props.textProperty2[this.props.item.dataSet];
    }
    if(this.props.textProperty2!==undefined && this.props.textProperty2[this.props.item.dataSet]==="creatureTime"){
      var hemispherePre = global.settingsCurrent[0]["currentValue"] === "true" ? "NH " : "SH "
      var currentMonthShort = getMonthShort(new Date().getMonth());
      textProperty2Text = this.props.item[hemispherePre+currentMonthShort];
    }

    if(this.props.gridType==="smallGrid"){
      var textProperty2Component = <View/>;
      if(this.props.textProperty2!==undefined && this.props.textProperty2[this.props.item.dataSet]!==""){
        if(this.props.textProperty2[this.props.item.dataSet]==="(DIY)")
          textProperty2Component = <TextFont bold={false} style={{textAlign:'center', color:this.props.labelColor, fontSize:12}}>(DIY)</TextFont>
        else 
          textProperty2Component = <TextFont bold={false} style={{textAlign:'center', color:this.props.labelColor, fontSize:12}}>{capitalize(textProperty2Text)}</TextFont>
      }
      return (
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
            this.setCollected(this.state.collected==="true" ? "false":"true");
          }}
            background={TouchableNativeFeedback.Ripple(this.props.accentColor, false)}
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
              <CachedImage
                style={styles.gridBoxImage}
                source={{
                  uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                }}
              />
              <View style={styles.gridBoxText}>
                <TextFont bold={true} style={{textAlign:'center', color:this.props.labelColor, fontSize:13}}>{capitalize(this.props.item.[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
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
          background={TouchableNativeFeedback.Ripple(this.props.accentColor, false)}
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
              <CachedImage
                style={styles.gridBoxImageLarge}
                source={{
                  uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                }}
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
      }
      return( 
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            checkOff(this.props.item, this.state.collected, this.props.dataGlobalName); 
            this.setCollected(this.state.collected==="true" ? "false":"true");
          }}
          background={TouchableNativeFeedback.Ripple(this.props.accentColor, false)}
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
              <CachedImage
                style={styles.gridBoxImageLargeSmaller}
                source={{
                  uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                }}
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
          background={TouchableNativeFeedback.Ripple(this.props.accentColor, false)}
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
                <CachedImage
                  style={styles.rowImage}
                  source={{
                    uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                  }}
                />
              </View>
              <View style={styles.rowTextContainer}>
                <View style={styles.rowTextTop}>
                  <TextFont bold={true} style={{fontSize:20, color:this.props.labelColor}}>{capitalize(this.props.item.[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
                </View>
                <View style={styles.rowTextBottom}>
                  <TextFont bold={true} style={{fontSize:16, color:this.props.specialLabelColor}}>{capitalize(removeBrackets(textProperty2Text))}</TextFont>
                </View>
                <View style={styles.rowTextBottom}>
                  <TextFont bold={true} style={{fontSize:16, color:this.props.specialLabelColor}}>{capitalize(removeBrackets(this.props.item.[this.props.textProperty3[this.props.item.dataSet]]))}</TextFont>
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
    height: 60,
    width: 60,
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
    height: 150,
    width: 150,
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
    width: 115,
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
    width: 180,
    borderRadius:10,
    elevation: 0,
    margin: 2,
  },
});
