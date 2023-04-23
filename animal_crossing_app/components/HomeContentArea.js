import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Touchable, Vibration} from 'react-native';
import TextFont from './TextFont';
import colors from '../Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSettingsString } from '../LoadJsonData';

class HomeContentArea extends Component {
  toggleVisibility = () => {
    if(!this.props.editOrder && global.collapsedHomePageSections){
      if(!global.collapsedHomePageSections.includes(this.props.title)){
        getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([4,4,4,4,4,4,4]) : "";
        global.collapsedHomePageSections.push(this.props.title)
        AsyncStorage.setItem("collapsedHomePageSections"+global.profile, JSON.stringify(global.collapsedHomePageSections));
      } else {
        getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10]) : "";
        global.collapsedHomePageSections = global.collapsedHomePageSections.filter(e => e !== this.props.title);
        AsyncStorage.setItem("collapsedHomePageSections"+global.profile, JSON.stringify(global.collapsedHomePageSections));
      }
      console.log(global.collapsedHomePageSections)
      this.setState({})
    }
  }
  render(){
    const body = <View style={[styles.contentBackground,{backgroundColor:this.props.backgroundColor, borderColor:colors.shadow[global.darkMode]}]}>
        <View style={styles.topTitlePosition}> 
          {this.props.editOrder?<View style={{flexDirection:"row",right:-100, top:-5,position:'absolute',zIndex:100, elevation:10}}>
            <TouchableOpacity style={{padding:5}} 
              onPress={()=>{
                this.props.reorderItem(this.props.index, -1); 
            }}>
              <Image source={require("../assets/icons/upArrow.png")} style={{opacity:0.5,width:35, height:35, borderRadius:100}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:5}} 
              onPress={()=>{
                this.props.reorderItem(this.props.index, 1); 
            }}>
              <Image source={require("../assets/icons/downArrow.png")} style={{opacity:0.5,width:35, height:35, borderRadius:100}}/>
            </TouchableOpacity>
          </View>:<View/>}
          <TouchableOpacity activeOpacity={0.7} onPress={()=>{
            this.toggleVisibility()
          }} onLongPress={()=>{this.toggleVisibility()}}>
            <TextFont style={[styles.topTitle,{backgroundColor:this.props.accentColor, color:this.props.titleColor}]} bold={true}>{this.props.title}</TextFont>
          </TouchableOpacity>
        </View>
        {
          this.props.editOrder || global.collapsedHomePageSections === undefined || !global.collapsedHomePageSections.includes(this.props.title) ? 
          <></> : 
          <View style={{flexDirection:"row",right:0, top:4,position:'absolute',zIndex:100, elevation:10,}}>
            <TouchableOpacity style={{padding:8}} 
              onPress={()=>{
                this.toggleVisibility()
            }}>
              <Image source={require("../assets/icons/downArrow.png")} style={{opacity:0.5,width:30, height:30, borderRadius:100}}/>
            </TouchableOpacity>
          </View>
        }
        {this.props.editOrder || global.collapsedHomePageSections === undefined || !global.collapsedHomePageSections.includes(this.props.title) ? 
          this.props.children 
          :
          <View style={{height:20}}></View>
        }
      </View>
    if(this.props.editOrder || global.collapsedHomePageSections === undefined || !global.collapsedHomePageSections.includes(this.props.title))
      return body
    else
      return <TouchableOpacity activeOpacity={0.9}
        onPress={()=>{
          if(this.props.editOrder || global.collapsedHomePageSections === undefined || !global.collapsedHomePageSections.includes(this.props.title)) return
          this.toggleVisibility()
        }}
      >
        {body}
      </TouchableOpacity>
  }
}
export default HomeContentArea;

const styles = StyleSheet.create({
  contentBackground:{
    borderRadius: 25,
    paddingTop: 20,
    marginBottom: -40,
    paddingBottom: 60,
    elevation: 6,
    borderWidth: 1.1,
  },
  topTitlePosition:{
    position: "absolute",
    top: -17,
    left: 20
  },
  topTitle:{
    fontSize:18,
    borderRadius: 100,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 7,
    paddingBottom: 7,
    elevation: 5,
  },
})