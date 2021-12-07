import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {VillagersGifts, InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import { PopupInfoCustom } from '../components/Popup';
import { SubHeader } from '../components/Formattings';
import RecipesPopup from './RecipesPopup';
import { capitalize, findObject } from '../LoadJsonData';
import ButtonComponent from '../components/ButtonComponent';
import ViewRecipeButton from './ViewRecipeComponent';

class ClothingPopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <InfoLineBeside
        image1={require("../assets/icons/bellBag.png")} 
        image2={require("../assets/icons/coin.png")} 
        item1={this.props.item}
        item2={this.props.item}
        textProperty1={["Buy"]}
        textProperty2={["Sell"]}
        ending1={"Exchange Currency"}
        ending2={"Exchange Currency"}
        translateItem={false}
      />
      <InfoLine
        image={require("../assets/icons/colorPalette.png")} 
        item={this.props.item}
        textProperty={["Color 1"]}
        textProperty2={["Color 2"]}
      />
      <InfoLine
        image={require("../assets/icons/sparkle.png")} 
        item={this.props.item}
        textProperty={["Style 1"]}
        textProperty2={["Style 2"]}
      />
      <InfoLine
        image={require("../assets/icons/pattern.png")} 
        item={this.props.item}
        textProperty={["Variation"]}
      />
      <InfoLine
        image={require("../assets/icons/label.png")} 
        item={this.props.item}
        textProperty={["Label Themes"]}
      />
      <InfoLine
        image={require("../assets/icons/season.png")} 
        item={this.props.item}
        textProperty={["Seasonal Availability"]}
      />
      <InfoLine
        image={require("../assets/icons/popper.png")} 
        item={this.props.item}
        textProperty={["Season/Event"]}
      />
      <InfoLine
        image={require("../assets/icons/magnifyingGlass.png")} 
        item={this.props.item}
        textProperty={["Source Notes"]}
      />
      <InfoLine
        image={require("../assets/icons/scroll.png")} 
        item={this.props.item}
        textProperty={["Data Category"]}
      />
      <VillagersGifts item={this.props.item}/>
      <ViewRecipeButton item={this.props.item}/>
    </View>
  }
}
export default ClothingPopup;