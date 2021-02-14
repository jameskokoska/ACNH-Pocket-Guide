import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import AccordionContainer from "../components/AccordionContainer"

const sections = [
  {
    title: 'View house',
    image: "House Image",
    height: 300,
    widthSubtraction: 0.1,
    marginTop: 0,
    marginBottom: 20,
  },
  {
    title: 'View photo',
    image: "Photo Image",
    height: 250,
    widthSubtraction: 0.1,
    marginTop: 20,
    marginBottom: 20,
  },
];
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
      <View style={{height:20}}/>
      <AccordionContainer
        sections={sections}
        item={this.props.item}
      />
    </View>
  }
}
export default VillagerPopup;