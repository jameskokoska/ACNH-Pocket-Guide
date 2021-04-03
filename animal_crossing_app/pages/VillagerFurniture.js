import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from '../Colors.js';
import {getSettingsString, pSBC} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"

export default class VillagerFurniture extends Component {
  constructor() {
    super();
  }
  render(){
    if(this.props.villager!==undefined){
      return(
        <AllItemsPage 
          disableFilters={true}
          title={this.props.villager["NameLanguage"]}
          itemIDs={[...this.props.villager["Furniture List"].split(";"),this.props.villager["Flooring"],this.props.villager["Wallpaper"],this.props.villager["Kitchen Equipment"].split(',')[0],this.props.villager["DIY Workbench"].split(',')[0],this.props.villager["Default Clothing"]]}
          subHeader="Villager's default house furniture and clothing"
          appBarColor = {colors.furnitureAppBar[global.darkMode]}
          accentColor = {colors.furnitureAccent[global.darkMode]}
        />
      )
    } else {
      return(<View/>)
    }
    
  }
}