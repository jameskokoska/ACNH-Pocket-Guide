import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  Image,
  Vibration,
} from 'react-native';
import TextFont from './TextFont'
import {attemptToTranslate, capitalizeFirst, getSettingsString} from "../LoadJsonData"
import colors from '../Colors.js';
import LottieView from 'lottie-react-native';

class SidebarElement extends Component {
 
  render(){
    var backgroundColor;
    var elevation;
    if(this.props.currentPage===this.props.pageNum){
      backgroundColor=this.props.backgroundColor;
      elevation = 4;
    } else {
      backgroundColor=this.props.unselectedColor;
      elevation = 0;
    }
    var removeButton = <View/>
    if(this.props.editMode){
      removeButton=<View style={{left:-10, top:-10,position:'absolute',zIndex:10, }}>
        <TouchableOpacity style={{padding:9}} 
          onPress={()=>{
            this.props.editSections(this.props.title); 
        }}>
          <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.8,width:15, height:15, borderRadius:100,}}/>
        </TouchableOpacity>
      </View>
    }
    var addButton = <View/>
    if(this.props.editMode){
      addButton=<View style={{left:-10, top:-10,position:'absolute',zIndex:10, }}>
        <TouchableOpacity style={{padding:9}} 
          onPress={()=>{
            this.props.editSections(this.props.title); 
        }}>
          <Image source={require("../assets/icons/addIcon.png")} style={{opacity:0.8,width:15, height:15, borderRadius:100,}}/>
        </TouchableOpacity>
      </View>
    }
    var changeOrderButtons = <View/>
    if(this.props.editMode){
      changeOrderButtons=<View style={{flexDirection:"row",right:-5, top:-10,position:'absolute',zIndex:10, }}>
        <TouchableOpacity style={{paddingVertical:9, paddingHorizontal:5}} 
          onPress={()=>{
            this.props.reorderSections(this.props.index, -1); 
            this.setState({showRemove:false})
        }}>
          <Image source={require("../assets/icons/upArrow.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingVertical:9, paddingHorizontal:5}} 
          onPress={()=>{
            this.props.reorderSections(this.props.index, 1); 
            this.setState({showRemove:false})
        }}>
          <Image source={require("../assets/icons/downArrow.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
        </TouchableOpacity>
      </View>
    }
    if(this.props.cannotDisable){
      addButton = <View/>
      removeButton = <View/>
    }
    if(this.props.editMode || !this.props.disabled){
      return (
        <>
          <TouchableNativeFeedback 
            background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}
            onPress={() => {
              if(this.props.editMode && !this.props.cannotDisable){
                this.props.editSections(this.props.title); 
              } else {
                getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(15) : ""; this.props.setPage(this.props.pageNum);
              }
          }}>
              <View style={[styles.sidebarBox, {opacity:this.props.disabled?0.7:1,backgroundColor: backgroundColor,elevation: elevation}]}>
                {!this.props.disabled?removeButton:addButton}
                {changeOrderButtons}
                <Image style={styles.sidebarImage} source={this.props.image}/>
                <TextFont translate={false} bold={true} style={[styles.sidebarTitle,{color:this.props.textColor}]}>{this.props.displayName==="Emoticons"?"Reactions":capitalizeFirst(attemptToTranslate(this.props.displayName))}</TextFont>
                {this.props.title!=="Buy Me a Coffee" ? <></> :
                  <View style={{position:"absolute"}}>
                    <LottieView
                      autoPlay={getSettingsString("settingsLowEndDevice")==="true"?false:true}
                      loop
                      style={{
                        height: 60,
                        left: -5,
                        zIndex:10,
                        top: -7,
                      }} 
                      source={require('../assets/starsAnimation1.json')}
                      speed={1}
                    />
                    <LottieView
                      speed={0.96}
                      autoPlay={getSettingsString("settingsLowEndDevice")==="true"?false:true}
                      loop
                      style={{
                        position:"absolute",
                        height: 60,
                        left: this.props.containerWidth - 180,
                        zIndex:10,
                        top: 0,
                      }} 
                      source={require('../assets/starsAnimation2.json')}
                    />
                  </View>
                }
              </View>
          </TouchableNativeFeedback>
        </>
      );
    } else if (this.props.disabled){
      return <View/>
    } else {
      return <View/>
    }
  }
};

const styles = StyleSheet.create({
  sidebarImage:{
    width: 26,
    height: 26,
    marginLeft: 20,
    resizeMode:'contain',
  },
  sidebarTitle:{
    fontSize: 13.5,
    marginLeft: 15,
    marginRight: 15,
  },
  sidebarBox: {
    alignItems: 'center',
    flexDirection:"row",
    height: 54,
    borderRadius:14,
    margin: 4,
    marginLeft: "7%",
    marginRight: "9%",
    paddingRight: 50,
  },
});

export default SidebarElement;
