import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import FastImage from '../components/FastImage';

class VillagerPopup extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <InfoLine
        image={require("../assets/icons/birthdayCake.png")} 
        item={this.props.item}
        textProperty={["Birthday"]}
      />
      <InfoLineBeside
        image1={require("../assets/icons/cat.png")} 
        item1={this.props.item}
        textProperty1={["Species"]}
        image2={require("../assets/icons/dice.png")} 
        item2={this.props.item}
        textProperty2={["Hobby"]}
      />
      <InfoLineBeside
        image1={require("../assets/icons/personalityEmoji.png")} 
        image2={require("../assets/icons/styleEmoji.png")} 
        item1={this.props.item}
        item2={this.props.item}
        textProperty1={["Personality"]}
        textProperty2={["Style 1"]}
        textProperty22={["Style 2"]}
      />
      <InfoLine
        image={require("../assets/icons/colorPalette.png")} 
        item={this.props.item}
        textProperty={["Color 1"]}
        textProperty2={["Color 2"]}
      />
      <InfoLine
        image={require("../assets/icons/music.png")} 
        item={this.props.item}
        textProperty={["Favorite Song"]}
      />
      <InfoLine
        image={require("../assets/icons/speechBubble.png")} 
        item={this.props.item}
        textProperty={["Favorite Saying"]}
      />
      <View style={{height:10}}/>
      <View style={{alignItems: 'center', width: Dimensions.get('window').width, justifyContent:"center"}}>
        <FastImage
          style={{width: Dimensions.get('window').width*0.8,height:Dimensions.get('window').width*0.8, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item["House Image"],
          }}
          cacheKey={this.props.item["House Image"]}
        />
      </View>
      <View style={{height:20}}/>
      <View style={{alignItems: 'center', width: Dimensions.get('window').width, justifyContent:"center"}}>
        <FastImage
          style={{width: Dimensions.get('window').width*0.6,height:Dimensions.get('window').width*0.6, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item["Photo Image"],
          }}
          cacheKey={this.props.item["Photo Image"]}
        />
      </View>
    </View>
  }
}
export default VillagerPopup;