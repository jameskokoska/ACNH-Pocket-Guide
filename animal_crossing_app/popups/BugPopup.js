import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoDescription, InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import ActiveTime from "../components/ActiveTime";
import FastImage from '../components/FastImage';
import {anythingCraftable, attemptToTranslate} from "../LoadJsonData"
import {BlueText} from "../components/Formattings"
import ButtonComponent from '../components/ButtonComponent';
import * as RootNavigation from '../RootNavigation.js';

class BugPopup extends Component {
  render(){
    var dummyItem = {"Spawn Rates String":attemptToTranslate("Spawn rates:") + " " + this.props.item["Spawn Rates"]}
    return <View style={{width: "100%", alignItems: "center"}}>
      <InfoLine
        image={require("../assets/icons/coin.png")} 
        item={this.props.item}
        textProperty={["Sell"]}
        ending={" " + attemptToTranslate("bells")}
      />
      <InfoLine
        image={require("../assets/icons/flick.png")} 
        item={this.props.item}
        textProperty={["Sell"]}
        ending={" " + attemptToTranslate("bells")}
        special="Flick"
      />
      <InfoLineBeside
        image2={require("../assets/icons/location.png")} 
        item2={this.props.item}
        textProperty2={["Where/How"]}
        image1={require("../assets/icons/weather.png")} 
        item1={this.props.item}
        textProperty1={["Weather"]}
      />
      <ActiveTime item={this.props.item}/>
      <View style={{marginTop: 30, flexDirection:"row", justifyContent:"space-around",width: Dimensions.get('window').width}}>
        <FastImage
          style={{width: Dimensions.get('window').width*0.35,height:Dimensions.get('window').width*0.35, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item["Critterpedia Image"],
          }}
          cacheKey={this.props.item["Critterpedia Image"]}
        />
        <FastImage
          style={{width: Dimensions.get('window').width*0.35,height:Dimensions.get('window').width*0.35, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item["Furniture Image"],
          }}
          cacheKey={this.props.item["Furniture Image"]}
        />
      </View>
      <View style={{height:15}}/>
      <InfoDescription text={this.props.item["Description"]}/>
      <View style={{height:15}}/>
      <InfoLine
        image={require("../assets/icons/hatching.png")} 
        item={dummyItem}
        textProperty={["Spawn Rates String"]}
      />
      <BlueText>Common creatures have higher spawn rates</BlueText>
      {anythingCraftable(this.props.item["Name"])?<ButtonComponent
        text={"View Craftable Items"}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={() => {
          // this.props.setPage(22, true, this.props.item)
          RootNavigation.navigate('34', {propsPassed:this.props.item});
      }}/>:<View/>}
    </View>
  }
}
export default BugPopup;