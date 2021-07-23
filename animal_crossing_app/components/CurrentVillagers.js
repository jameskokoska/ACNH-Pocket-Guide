import React, {Component} from 'react';
import {TouchableOpacity, View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from '../Colors.js';
import TextFont from "./TextFont"
import {getCurrentVillagerObjects} from "../LoadJsonData"
import FastImage from "./FastImage"

export default class CurrentVillagers extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    var currentVillagers
    if(this.props.villagersToShow===undefined)
      currentVillagers = getCurrentVillagerObjects();
    else
      currentVillagers = this.props.villagersToShow
    
    if(currentVillagers.length===0){
      return(<>
        <View style={{height:10}}/>
          <TouchableOpacity onPress={() => this.props.setPage(8)}>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"You have no villagers added"}</TextFont>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>Tap here and go add some</TextFont>
          </TouchableOpacity>
          <View style={{height:30}}/>
        </>
      )
    } else {
      return(<>
      <View style={{height:15}}/>
      <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
        {currentVillagers.map( (villager, index)=>{
          return(
            <View key={villager["Name"]+index} style={{margin:5}}>
              <TouchableOpacity 
                onPress={()=>{
                  this.props.openVillagerPopup(villager)
                }}
              >
                <View style={{width: 60,height: 60,borderRadius: 100,justifyContent: "center",alignItems: "center",backgroundColor:colors.eventBackground[global.darkMode]}}>
                  <FastImage
                    style={{height: 50,width: 50,resizeMode:'contain',}}
                    source={{uri:villager["Icon Image"]}}
                    cacheKey={villager["Icon Image"]}
                  />
                </View>
              </TouchableOpacity>
            </View>
        )})}
      </View><View style={{height:15}}/></>)
    }
    
  }
    
}