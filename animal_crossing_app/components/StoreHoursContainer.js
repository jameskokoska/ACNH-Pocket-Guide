import React, {Component} from 'react';
import {Image, StyleSheet, View, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'
import colors from "../Colors"
import {getCurrentDateObject} from "./DateFunctions"
import * as RootNavigation from '../RootNavigation.js';

class StoreHoursContainer extends Component {
  render(){
    var backgroundColor;
    var currentHour = getCurrentDateObject().getHours();
    if(currentHour+1===this.props.closeHour){
      backgroundColor = colors.closingSoonStore[global.darkMode]
    } else if(currentHour >= this.props.openHour && currentHour < this.props.closeHour){
      backgroundColor = colors.openStore[global.darkMode];
    } else {
      backgroundColor = colors.closedStore[global.darkMode];
    }
    if(this.props.backgroundColor!==undefined){
      backgroundColor=this.props.backgroundColor;
    }
    return(
      <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+(this.props.filter===undefined?"00":"AF"), false)}
        onPress={()=>{
          if(this.props.filter===undefined){
            return
          }
          RootNavigation.navigate('23', {propsPassed:"STORE HOURS:"+this.props.filter});
        }}
      >
        <View style={[styles.storeContainer,{backgroundColor:backgroundColor}]}>
          <Image style={styles.storeImage} source={this.props.image}/>
          <View style={styles.textContainer}>
            <TextFont bold={true} style={[styles.textContainerTop,{color:colors.textBlack[global.darkMode]}]}>{this.props.text}</TextFont>
            <TextFont style={[styles.textContainerBottom,{color:colors.textBlack[global.darkMode]}]}>{this.props.textBottom}</TextFont>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }
}
export default StoreHoursContainer;

export class StoreHoursContainerHarvey extends Component{
  render(){
    let backgroundColor = colors.closedStore[global.darkMode];
    let currentHour = getCurrentDateObject().getHours();
    if(currentHour+1===this.props.closeHour){
      backgroundColor = colors.closingSoonStore[global.darkMode]
    } else if(this.props.closeHour < this.props.openHour){
      if(currentHour >= this.props.openHour || currentHour < this.props.closeHour){
        backgroundColor = colors.openStore[global.darkMode];
      }
    } else {
      if(currentHour >= this.props.openHour && currentHour < this.props.closeHour){
        backgroundColor = colors.openStore[global.darkMode];
      }
    }
    return <TouchableNativeFeedback 
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+(this.props.filter===undefined?"00":"AF"), false)}
        onPress={()=>{
          if(this.props.filter===undefined){
            return
          }
          RootNavigation.navigate('23', {propsPassed:"STORE HOURS:"+this.props.filter});
        }}
      >
        <View style={{justifyContent:"center", alignItems:"center",backgroundColor:backgroundColor, borderRadius: 10, paddingHorizontal:15, paddingVertical: 18, marginHorizontal:5, marginVertical: 5}}>
          <Image style={{width:45, height:45,resizeMode:'contain',marginBottom:5}} source={this.props.image}/>
          <TextFont bold={true} style={{color:colors.textBlack[global.darkMode], fontSize: 17}}>{this.props.text}</TextFont>
          {this.props.textBottom?<TextFont style={{color:colors.textBlack[global.darkMode], fontSize: 14}}>{this.props.textBottom}</TextFont>:<View/>}
        </View>
    </TouchableNativeFeedback>
  }
}

const styles = StyleSheet.create({
  textContainerTop:{
    fontSize: 21,
  },
  textContainerBottom:{
    marginTop: 2,
    marginRight: 10,
    fontSize: 17,
  },
  textContainer:{
    marginLeft: 25,
    marginRight: 100,
  },
  storeImage: {
    width: 80,
    height: 80,
    resizeMode:'contain',
  },
  storeContainer: {
    padding: 10,
    paddingLeft: 30,
    margin: 8,
    flexDirection:"row",
    flex:1,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 14,
  },
});