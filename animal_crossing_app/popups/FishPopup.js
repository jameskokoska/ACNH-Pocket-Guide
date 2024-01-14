import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoDescription, InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title, SizeInfo} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import ActiveTime from "../components/ActiveTime";
import FastImage from '../components/FastImage';
import {anythingCraftable, attemptToTranslate} from "../LoadJsonData"
import {BlueText} from "../components/Formattings"
import ButtonComponent from '../components/ButtonComponent';
import * as RootNavigation from '../RootNavigation.js';
import PopupSeparator from './PopupSeparator';

//   200
//     image: "Critterpedia Image",
// 150
//     image: "Furniture Image",

class FishPopup extends Component {
  render(){
    var dummyItem = {"Spawn Rates String":attemptToTranslate("Spawn rates:") + " " + this.props.item["Spawn Rates"]}
    return <View style={{width: "100%", alignItems: "center"}}>
      <PopupSeparator>
        <InfoLine
          image={require("../assets/icons/coin.png")} 
          item={this.props.item}
          textProperty={["Sell"]}
          ending={" " + attemptToTranslate("bells")}
        />
        <InfoLine
          image={require("../assets/icons/cj.png")} 
          item={this.props.item}
          textProperty={["Sell"]}
          ending={" " + attemptToTranslate("bells")}
          special="C.J."
        />
      </PopupSeparator>
      <View style={{height:16}}/>
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 0, paddingTop: 15, paddingBottom: 15, borderRadius: 15, margin: 0}}><Image style={{width:150,height:35,resizeMode:'contain'}} source={getPhotoShadow(this.props.item,true)}/></View>
      <PopupSeparator>
        <InfoLineBeside
          image2={require("../assets/icons/location.png")} 
          item2={this.props.item}
          textProperty2={["Where/How"]}
          image1={require("../assets/icons/ruler.png")} 
          item1={this.props.item}
          textProperty1={["Shadow"]}
        />
      </PopupSeparator>
      <View style={{height:16}}/>
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
      <InfoDescription text={this.props.item["Description"]} type="Fish" id={this.props.item["Internal ID"]}/>
      <PopupSeparator>
        <InfoLine
          image={require("../assets/icons/hatching.png")} 
          item={dummyItem}
          textProperty={["Spawn Rates String"]}
        />
        <BlueText>Common creatures have higher spawn rates</BlueText>
      </PopupSeparator>
      <PopupSeparator>
        <InfoLine
          image={require("../assets/icons/colorPalette.png")} 
          item={this.props.item}
          textProperty={["Color 1"]}
          textProperty2={["Color 2"]}
        />
        <View style={{alignItems: 'center',justifyContent: 'center',flexDirection:"row",flexWrap:"wrap"}}>
          <InfoLineTriple
            image={require("../assets/icons/house.png")} 
            item={this.props.item}
            textProperty1={"HHA Series"}
            textProperty2={"HHA Concept 1"}
            textProperty3={"HHA Concept 2"}
          />
          <SizeInfo size={this.props.item["Size"]}/>
        </View>
        <InfoLine
          image={require("../assets/icons/scroll.png")} 
          item={this.props.item}
          textProperty={["Data Category"]}
        />
        <InfoLine
          image={require("../assets/icons/tag.png")} 
          item={this.props.item}
          textProperty={["Tag"]}
        />
      </PopupSeparator>
      {anythingCraftable(this.props.item["Name"])?<ButtonComponent
        text={"View Craftable Items"}
        color={colors.okButton3[global.darkMode]}
        vibrate={5}
        onPress={() => {
          // this.props.setPage(22, true, this.props.item)
          RootNavigation.navigate('34', {propsPassed:this.props.item});
      }}/>:<View/>}
    </View>
  }
}
export default FishPopup;