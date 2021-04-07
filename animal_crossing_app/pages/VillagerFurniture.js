import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from '../Colors.js';
import {compareItemID, getSettingsString} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"
import ErrorPage from "../pages/ErrorPage"

export default class VillagerFurniture extends Component {
  constructor() {
    super();
  }
  render(){
    if(this.props.villager!==undefined  && this.props.villager!=="" && this.props.villager["Furniture List"]!==undefined){
      return(
        <AllItemsPage 
          disableFilters={true}
          title={this.props.villager["NameLanguage"]}
          itemIDs={[
            {
              list:[...this.props.villager["Furniture List"].split(";"), ...this.props.villager["Kitchen Equipment"].split(',')[0], ...this.props.villager["DIY Workbench"].split(',')[0],],
              key:"furnitureCheckList"
            },
            {
              list:[this.props.villager["Flooring"]],
              key:"floorWallsCheckList"
            },
            {
              list:[this.props.villager["Wallpaper"]],
              key:"floorWallsCheckList"
            },
            {
              list:[this.props.villager["Default Clothing"]],
              key:"clothingCheckList"
            },
          ]}
          subHeader="Villager's default house furniture and clothing"
          appBarColor = {colors.furnitureAppBar[global.darkMode]}
          accentColor = {colors.furnitureAccent[global.darkMode]}
        />
      )
    } else {
      return(<ErrorPage/>)
    }
    
  }
}