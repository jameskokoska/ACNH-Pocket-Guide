import React, {Component} from 'react';
import {View} from 'react-native';
import {SizeInfo, InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import ButtonComponent from '../components/ButtonComponent';
import { anythingCraftable } from '../LoadJsonData';
import ViewRecipeButton from './ViewRecipeComponent';
import colors from "../Colors"
import * as RootNavigation from '../RootNavigation.js';
import PopupSeparator from './PopupSeparator';

class FoodPopup extends Component {
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
        <InfoLine
          image={require("../assets/icons/colorPalette.png")} 
          item={this.props.item}
          textProperty={["Exchange Currency"]}
          poki={true}
        />
      </PopupSeparator>
      <PopupSeparator>
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
          image1={require("../assets/icons/pattern.png")} 
          item1={this.props.item}
          textProperty1={["Variation"]}
          image2={require("../assets/icons/diyKit.png")} 
          item2={this.props.item}
          textProperty2={["Kit Cost"]}
          ending2={"x"}
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
export default FoodPopup;