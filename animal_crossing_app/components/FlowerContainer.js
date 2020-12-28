import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'
import colors from "../Colors"
import {getMaterialImage} from "./GetPhoto"

class FlowerContainer extends Component {
  render(){
    var imagePathSpecial1 = getMaterialImage(this.props.flowerInfo.parent1+"bag", true, true);
    if(this.props.flowerInfo.parent1Special==="island") {
      imagePathSpecial1 = <Image style={styles.flowerImageCorner} source={require("../assets/icons/palmTree.png")}/>
    } else if(this.props.flowerInfo.parent1Special===true) {
      imagePathSpecial1 = <Image style={styles.flowerImageCorner} source={require("../assets/icons/star.png")}/>
    } else if(imagePathSpecial1 !== ""){
      imagePathSpecial1 = <Image style={styles.flowerImageCorner} source={{uri:imagePathSpecial1}}/>
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
    
    return(<View style={styles.container}>
          <View>
            <Image style={styles.flowerImage} source={{uri:getMaterialImage(this.props.flowerInfo.parent1)}}/>
            {imagePathSpecial1}
          </View>
          <TextFont bold={true} style={{fontSize: 25, color:colors.textBlack[colors.mode]}}>+</TextFont>
            <View>
            <Image style={styles.flowerImage} source={{uri:getMaterialImage(this.props.flowerInfo.parent2)}}/>
            {imagePathSpecial2}
            </View>
          <View>
          <TextFont bold={true} style={{paddingTop: 20, textAlign:"center",fontSize: 25, color:colors.textBlack[colors.mode]}}>=</TextFont>
          <TextFont bold={true} style={{textAlign:"center",fontSize: 16, color:colors.textBlack[colors.mode]}}>{this.props.flowerInfo.percentage+"%"}</TextFont>
          </View>
            <View>
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
    backgroundColor: colors.white[colors.mode], 
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