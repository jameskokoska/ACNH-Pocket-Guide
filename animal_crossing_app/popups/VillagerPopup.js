import * as Font from 'expo-font';
import React, {Component} from 'react';
import {TouchableOpacity, Dimensions, Image, View, Text} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import FastImage from '../components/FastImage';
import ButtonComponent from "../components/ButtonComponent"
import TextFont from "../components/TextFont"
import {PopupInfoCustom} from "../components/Popup"
import {SubHeader, Paragraph} from "../components/Formattings"

class VillagerPopup extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <InfoLine
        birthday={true}
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
      <ButtonComponent
        text={"View Gifts"}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={() => {
          this.props.setVillagerGift(this.props.item, "gift")
      }}/>
      <TouchableOpacity style={{paddingTop:5}} onPress={()=>{this.popup.setPopupVisible(true);}}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 16, padding:8}}>{"What are villager gifts?"}</TextFont>
      </TouchableOpacity>
      <ButtonComponent
        text={"View Furniture"}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={() => {
          this.props.setVillagerGift(this.props.item, "furniture")
      }}/>
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
      <PopupInfoCustom ref={(popup) => this.popup = popup} buttonText={"Close"}>
        <View style={{height:6}}/>
        <SubHeader>What are ideal gifts for villagers?</SubHeader>
        <Paragraph styled={true}>Villagers prefer flowers, favorite music, umbrellas (for non-frog villagers), or clothing of their preferred color or style.</Paragraph>
        <Paragraph styled={true}>[View Gifts] will show you all clothing of their preferred color and style.</Paragraph>
        <Paragraph styled={true}>Additionally, you can choose to filter out if the villager will wear this item or not when gifted.</Paragraph>
      </PopupInfoCustom> 
    </View>
  }
}
export default VillagerPopup;