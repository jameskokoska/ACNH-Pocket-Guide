import React, {Component, useState, useRef, useEffect} from 'react';
import { View, Image } from 'react-native';
import colors from '../Colors';
import { attemptToTranslate, commas, getCustomListsAmount, inChecklist } from '../LoadJsonData';
import TextFont from './TextFont';

export default class TotalBuySellPrice extends Component{
  constructor(props) {
    super(props);
    let currentBuy = 0;
    let currentBuyMiles = 0;
    let currentBuyNookPoints = 0;
    let currentBuyHeartCrystals = 0;
    let currentBuyPoki = 0;
    let currentSell = 0;
    let totalCollected = 0;
    if(this.props.data!==undefined){
      for(let item of this.props.data){
        let itemAmount = getCustomListsAmount(item["checkListKey"], this.props.currentCustomList)
        if(itemAmount===0){
          itemAmount = 1
        }
        if(item["checkListKey"]!==undefined){
          if(inChecklist(item["checkListKey"])===true){
            totalCollected=totalCollected+1
          }
        }
        if(item["Buy"]!==undefined){
          let currencyBells = false
          if(item["Exchange Currency"]!==undefined && item["Exchange Currency"].toString().toLowerCase().includes("miles") && item["Exchange Price"]!==undefined){
            currentBuyMiles = currentBuyMiles + parseInt(item["Exchange Price"])*itemAmount
          } else if(item["Exchange Currency"]!==undefined && item["Exchange Currency"].toString().toLowerCase().includes("nook points") && item["Exchange Price"]!==undefined){
            currentBuyNookPoints = currentBuyNookPoints + parseInt(item["Exchange Price"])*itemAmount
          } else if(item["Exchange Currency"]!==undefined && item["Exchange Currency"].toString().toLowerCase().includes("heart crystals") && item["Exchange Price"]!==undefined){
            currentBuyHeartCrystals = currentBuyHeartCrystals + parseInt(item["Exchange Price"])*itemAmount
          } else if( item["Buy"]!=="NFS" ){
            currencyBells = true;
          }
          if(item["Exchange Currency"]!==undefined && item["Exchange Currency"].toString().toLowerCase().includes("poki") && item["Exchange Price"]!==undefined){
            currentBuyPoki = currentBuyPoki + parseInt(item["Exchange Price"])*itemAmount
          } 
          if(global.ordinance === "Bell Boom" && currencyBells==true){
            currentBuy = currentBuy + parseInt(item["Buy"]*1.2*itemAmount)
          } else if (currencyBells==true) {
            currentBuy = currentBuy + parseInt(item["Buy"]*itemAmount)
          }
        }
        if(item["Sell"]!==undefined && isNaN(item["Sell"])===false){
          if(global.ordinance === "Bell Boom"){
            currentSell = currentSell + parseInt(item["Sell"]*1.2*itemAmount)
          } else {
            currentSell = currentSell + parseInt(item["Sell"]*itemAmount)
          }
        }
      }
    }
    this.state = {
      totalSell:currentSell,
      totalBuy:currentBuy,
      totalBuyMiles: currentBuyMiles,
      totalBuyNookPoints: currentBuyNookPoints,
      totalBuyHeartCrystals: currentBuyHeartCrystals,
      totalBuyPoki: currentBuyPoki,
      totalCollected: totalCollected,
    }
  }
  render(){
    if(this.props.data==undefined) return <></>
    return <View>
      {this.props.includeCollected===true ? <View style={{marginHorizontal: 6, marginVertical:5, flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3, marginBottom: 10}}><TextFont bold={true} translate={false} style={{textAlign:'center', color:colors.textBlack[global.darkMode], fontSize: this.props.fontSize ? this.props.fontSize + 4 : 13}}>{commas(this.state.totalCollected) + " / " + commas(this.props.data.length) + " " + attemptToTranslate("collected")}</TextFont></View> : <View/>}
      <View style={{display:"flex", flexWrap:"wrap",opacity:this.props.opacity ? this.props.opacity : 1, flexDirection:"row", justifyContent:"center", alignItems:"center", marginHorizontal:40}}>
        {this.state.totalBuy===0?<View/> : <View style={{marginHorizontal: 6, marginVertical:5, flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:15,height:15,resizeMode:'contain',  marginRight:4, marginTop: 2}} source={require("../assets/icons/bellBag.png")}/><TextFont translate={false} style={{textAlign:'center', color:colors.textBlack[global.darkMode], fontSize: this.props.fontSize ? this.props.fontSize : 13}}>{commas(this.state.totalBuy)}</TextFont></View>}
        {this.state.totalBuyPoki===0?<View/> : <View style={{marginHorizontal: 6, marginVertical:5, flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:15,height:15,resizeMode:'contain',  marginRight:4, marginTop: 2}} source={require("../assets/icons/pokiBag.png")}/><TextFont translate={false} style={{textAlign:'center', color:colors.textBlack[global.darkMode], fontSize: this.props.fontSize ? this.props.fontSize : 13}}>{commas(this.state.totalBuyPoki)}</TextFont></View>}
        {this.state.totalBuyMiles===0?<View/> : <View style={{marginHorizontal: 6, marginVertical:5,flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:17,height:17,resizeMode:'contain',  marginRight:4, marginTop: 4}} source={require("../assets/icons/miles.png")}/><TextFont translate={false} style={{textAlign:'center', color:colors.textBlack[global.darkMode], fontSize: this.props.fontSize ? this.props.fontSize : 13}}>{commas(this.state.totalBuyMiles)}</TextFont></View>}
        {this.state.totalBuyNookPoints===0?<View/> : <View style={{marginHorizontal: 6, marginVertical:5,flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:17,height:17,resizeMode:'contain',  marginRight:4, marginTop: 3}} source={require("../assets/icons/nookLinkCoin.png")}/><TextFont translate={false} style={{textAlign:'center', color:colors.textBlack[global.darkMode], fontSize: this.props.fontSize ? this.props.fontSize : 13}}>{commas(this.state.totalBuyNookPoints)}</TextFont></View>}
        {this.state.totalBuyHeartCrystals===0?<View/> : <View style={{marginHorizontal: 6, marginVertical:5,flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:16,height:16,resizeMode:'contain',  marginRight:4, marginTop: 2}} source={require("../assets/icons/crystal.png")}/><TextFont translate={false} style={{textAlign:'center', color:colors.textBlack[global.darkMode], fontSize: this.props.fontSize ? this.props.fontSize : 13}}>{commas(this.state.totalBuyHeartCrystals)}</TextFont></View>}
        {this.state.totalSell===0?<View/> : <View style={{marginHorizontal: 6, marginVertical:5,flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:16,height:16,resizeMode:'contain',  marginRight:4, marginTop: 4}} source={require("../assets/icons/coin.png")}/><TextFont translate={false} style={{textAlign:'center', color:colors.textBlack[global.darkMode], fontSize: this.props.fontSize ? this.props.fontSize : 13}}>{commas(this.state.totalSell)}</TextFont></View>}
      </View>
    </View>
  }
}