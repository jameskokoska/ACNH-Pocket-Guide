import React, {Component} from 'react';
import {View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import {capitalize, findObject} from "../LoadJsonData"
import colors from "../Colors"
import { PopupInfoCustom } from '../components/Popup';
import RecipesPopup from './RecipesPopup';
import { SubHeader } from '../components/Formattings';

export default class ViewRecipeButton extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return <>
      {this.props.item["Source"]!==undefined && (this.props.item["Source"].includes("Crafting") || this.props.item["Source"].includes("Cooking")) ? <ButtonComponent
        text={"View Recipe"}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={() => {
          this.popupRecipe?.setPopupVisible(true)
        }}/> : <View/>}
      <PopupInfoCustom ref={(popupRecipe) => this.popupRecipe = popupRecipe} buttonText={"Close"}>
        <View style={{alignItems:"center"}}>
          <SubHeader style={{fontSize:27, marginBottom: 6, textAlign:"center"}}>{capitalize(this.props.item["NameLanguage"])}</SubHeader>
          <RecipesPopup recipeOnly item={findObject(this.props.item["Name"],"Name","Recipes")}/>
        </View>
      </PopupInfoCustom>
    </>
  }
}