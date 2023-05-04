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
import PopupSeparator from './PopupSeparator';

class ClothingPopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <PopupSeparator>
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
      </PopupSeparator>
      <PopupSeparator>
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
          textProperty={["Source"]}
        />
        <ViewRecipeButton item={this.props.item}/>
        <InfoLine
          image={require("../assets/icons/notes.png")} 
          item={this.props.item}
          textProperty={["Source Notes"]}
        />
      </PopupSeparator>
      <PopupSeparator>
        <InfoLine
          image={require("../assets/icons/colorPalette.png")} 
          item={this.props.item}
          textProperty={["Color 1"]}
          textProperty2={["Color 2"]}
        />
        <InfoLineBeside
          image2={require("../assets/icons/sparkle.png")} 
          item2={this.props.item}
          textProperty2={["Style 1"]}
          textProperty22={["Style 2"]}
          image1={require("../assets/icons/pattern.png")} 
          item1={this.props.item}
          textProperty1={["Variation"]}
        />
        <InfoLine
          image={require("../assets/icons/label.png")} 
          item={this.props.item}
          textProperty={["Label Themes"]}
        />
        <InfoLine
          image={require("../assets/icons/scroll.png")} 
          item={this.props.item}
          textProperty={["Data Category"]}
        />
      </PopupSeparator>
      <VillagersGifts item={this.props.item}/>
    </View>
  }
}
export default ClothingPopup;