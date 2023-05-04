import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text, TouchableNativeFeedback} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import {findItemIDName} from "../LoadJsonData"
import * as RootNavigation from '../RootNavigation.js';
import ButtonComponent from '../components/ButtonComponent';

class RecipesPopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    //will be false if View Recipe can't find the item
    if(this.props.item===false || this.props.item===undefined){
      return <View/>
    }
    return <View style={{width: "100%", alignItems: "center"}}>
      {this.props.recipeOnly?<View/>:<InfoLineBeside
        image1={require("../assets/icons/bellBag.png")} 
        image2={require("../assets/icons/coin.png")} 
        item1={this.props.item}
        item2={findItemIDName(this.props.item["Crafted Item Internal ID"],this.props.item["Name"])}
        textProperty1={["Buy"]}
        textProperty2={["Sell"]}
        ending1={"Exchange Currency"}
        ending2={"Exchange Currency"}
      />}
      {this.props.recipeOnly?<View/>:<InfoLine
        image={require("../assets/icons/popper.png")} 
        item={this.props.item}
        textProperty={["Season/Event"]}
      />}
      <TouchableNativeFeedback onPress={()=>{RootNavigation.navigate('40', {propsPassed:this.props.item});}}>
        <View style={{backgroundColor: colors.lightDarkAccentTextBG[global.darkMode], padding:10, paddingHorizontal: 15, marginHorizontal: 5, marginVertical: 10, borderRadius: 8}}>
          <InfoLine
            translateItem={true}
            image={require("../assets/icons/leaf.png")} 
            item={this.props.item}
            textProperty={"Material 1"}
            starting={this.props.item["#1"]+ "x "}
          />
          <InfoLine
            translateItem={true}
            image={require("../assets/icons/leaf.png")} 
            item={this.props.item}
            textProperty={"Material 2"}
            starting={this.props.item["#2"]+ "x "}
          />
          <InfoLine
            translateItem={true}
            image={require("../assets/icons/leaf.png")} 
            item={this.props.item}
            textProperty={"Material 3"}
            starting={this.props.item["#3"]+ "x "}
          />
          <InfoLine
            translateItem={true}
            image={require("../assets/icons/leaf.png")} 
            item={this.props.item}
            textProperty={"Material 4"}
            starting={this.props.item["#4"]+ "x "}
          />
          <InfoLine
            translateItem={true}
            image={require("../assets/icons/leaf.png")} 
            item={this.props.item}
            textProperty={"Material 5"}
            starting={this.props.item["#5"]+ "x "}
          />
          <InfoLine
            translateItem={true}
            image={require("../assets/icons/leaf.png")} 
            item={this.props.item}
            textProperty={"Material 6"}
            starting={this.props.item["#6"]+ "x "}
          />
          <InfoLine
            translateItem={true}
            image={require("../assets/icons/leaf.png")} 
            item={this.props.item}
            textProperty={"Material 7"}
            starting={this.props.item["#7"]+ "x "}
          />
          <InfoLine
            translateItem={true}
            image={require("../assets/icons/leaf.png")} 
            item={this.props.item}
            textProperty={"Material 8"}
            starting={this.props.item["#8"]+ "x "}
          />
          <InfoLine
            translateItem={true}
            image={require("../assets/icons/leaf.png")} 
            item={this.props.item}
            textProperty={"Material 9"}
            starting={this.props.item["#9"]+ "x "}
          />
          <InfoLine
            translateItem={true}
            image={require("../assets/icons/leaf.png")} 
            item={this.props.item}
            textProperty={"Material 10"}
            starting={this.props.item["#10"]+ "x "}
          />
        </View>
      </TouchableNativeFeedback>
      <ButtonComponent
        text={"View Ingredient Items"}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={() => {
          RootNavigation.navigate('40', {propsPassed:this.props.item});
      }}/>
      <View style={{height:10}}/>
      <InfoLine
        image={require("../assets/icons/magnifyingGlass.png")} 
        item={this.props.item}
        textProperty={["Source"]}
      />
      <InfoLine
        image={require("../assets/icons/notes.png")} 
        item={this.props.item}
        textProperty={["Source Notes"]}
      />
    </View>
  }
}
export default RecipesPopup;