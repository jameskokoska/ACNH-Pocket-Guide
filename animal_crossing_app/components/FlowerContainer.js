import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'
import colors from "../Colors"
import {getMaterialImage, getToolPhoto} from "./GetPhoto"
import { checkOff, getFlowerChecklistKey, inChecklist } from '../LoadJsonData';
import Check from './Check';

class FlowerContainer extends Component {
  render(){
    var imagePathSpecial1 = getMaterialImage(this.props.flowerInfo.parent1+"bag", true, true);
    if(this.props.flowerInfo.parent1Special==="island") {
      imagePathSpecial1 = <Image style={styles.flowerImageCorner} source={require("../assets/icons/palmTree.png")}/>
    } else if(this.props.flowerInfo.parent1Special===true) {
      imagePathSpecial1 = <Image style={styles.flowerImageCorner} source={require("../assets/icons/star.png")}/>
    } else if(imagePathSpecial1 !== ""){
      imagePathSpecial1 = <Image style={styles.flowerImageCorner} source={{uri:imagePathSpecial1}}/>
    } else if(this.props.flowerInfo.parent1Special === "golden watering can"){
      imagePathSpecial1 = <Image style={[styles.flowerImageCorner, {transform: [{ scale: 1.2 },],}]} source={require("../assets/icons/goldenCan.png")}/>
    } else {
      imagePathSpecial1 = <View/>
    }
    var imagePathSpecial2 = getMaterialImage(this.props.flowerInfo.parent2+"bag", true, true);
    if(this.props.flowerInfo.parent2Special==="island") {
      imagePathSpecial2 = <Image style={styles.flowerImageCorner} source={require("../assets/icons/palmTree.png")}/>
    } else if(this.props.flowerInfo.parent2Special===true) {
      imagePathSpecial2 = <Image style={styles.flowerImageCorner} source={require("../assets/icons/star.png")}/>
    } else if(imagePathSpecial2 !== ""){
      imagePathSpecial2 = <Image style={styles.flowerImageCorner} source={{uri:imagePathSpecial2}}/>
    } else if(this.props.flowerInfo.parent2Special === "golden watering can"){
      imagePathSpecial2 = <Image style={[styles.flowerImageCorner, {transform: [{ scale: 1.2 },],}]} source={require("../assets/icons/goldenCan.png")}/>
    } else {
      imagePathSpecial2 = <View/>
    }
    var imagePathSpecial3 = getMaterialImage(this.props.flowerInfo.child+"bag", true, true);
    if(this.props.flowerInfo.childSpecial==="island") {
      imagePathSpecial3 = <Image style={styles.flowerImageCorner} source={require("../assets/icons/palmTree.png")}/>
    } else if(this.props.flowerInfo.childSpecial===true) {
      imagePathSpecial3 = <Image style={styles.flowerImageCorner} source={require("../assets/icons/star.png")}/>
    } else if(imagePathSpecial3 !== ""){
      imagePathSpecial3 = <Image style={styles.flowerImageCorner} source={{uri:imagePathSpecial3}}/>
    } else {
      imagePathSpecial3 = <View/>
    }
    return(<View style={[styles.container,{backgroundColor:colors.white[global.darkMode]}]}>
          <View>
            <TouchableOpacity style={{position:"absolute", zIndex:5, top:-5, left:-5}} onPress={()=>{checkOff(this.props.parent1CheckListKey, inChecklist(this.props.parent1CheckListKey)); this.props.refresh();}}>
              <Check play={this.props.currentCheckedFlowers.includes(this.props.parent1CheckListKey)} width={45} height={45}/>
            </TouchableOpacity>
            <Image style={styles.flowerImage} source={{uri:getMaterialImage(this.props.flowerInfo.parent1)}}/>
            {imagePathSpecial1}
          </View>
          <TextFont bold={true} style={{fontSize: 25, color:colors.textBlack[global.darkMode]}}>+</TextFont>
            <View>
              <TouchableOpacity style={{position:"absolute", zIndex:5, top:-5, left:-5}} onPress={()=>{checkOff(this.props.parent2CheckListKey, inChecklist(this.props.parent2CheckListKey)); this.props.refresh();}}>
                <Check play={this.props.currentCheckedFlowers.includes(this.props.parent2CheckListKey)} width={45} height={45}/>
              </TouchableOpacity>
              <Image style={styles.flowerImage} source={{uri:getMaterialImage(this.props.flowerInfo.parent2)}}/>
              {imagePathSpecial2}
            </View>
          <View style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <TextFont bold={true} style={{paddingTop: 20, textAlign:"center",fontSize: 25, color:colors.textBlack[global.darkMode]}}>=</TextFont>
            {this.props.flowerInfo?.percentage == undefined ? <></> : <TextFont style={{paddingTop: 0, textAlign:"center",fontSize: 14, color:colors.textLight[global.darkMode], marginLeft:8}}>{this.props.flowerInfo?.percentage + "%"}</TextFont>}
          </View>
          <View>
            <TouchableOpacity style={{position:"absolute", zIndex:5, top:-5, left:-5}} onPress={()=>{checkOff(this.props.childCheckListKey, inChecklist(this.props.childCheckListKey)); this.props.refresh();}}>
              <Check play={this.props.currentCheckedFlowers.includes(this.props.childCheckListKey)} width={45} height={45}/>
            </TouchableOpacity>
            <Image style={styles.flowerImage} source={{uri:getMaterialImage(this.props.flowerInfo.child)}}/>
            {imagePathSpecial3}
          </View>
        </View>
    )
  }
}
export default FlowerContainer;

const styles = StyleSheet.create({
  container:{
    flexDirection:"row", 
    alignItems:"center", 
    justifyContent:"center", 
    marginLeft: "10%",
    marginRight: "10%",
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  flowerImage: {
    width: 55,
    height: 55,
    margin: 10,
    resizeMode:'contain',
  },
  flowerImageCorner: {
    width: 25,
    height: 25,
    margin: 10,
    bottom: -3,
    right: -3,
    resizeMode:'contain',
    position:"absolute"
  },
});