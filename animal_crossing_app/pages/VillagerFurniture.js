import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from '../Colors.js';
import AllItemsPage from "./AllItemsPage"
import ErrorPage from "../pages/ErrorPage"

export default class VillagerFurniture extends Component {
  constructor() {
    super();
  }
  render(){
    if(this.props.villager!==undefined  && 
      this.props.villager!=="" && 
      this.props.villager["NameLanguage"]!==undefined &&
      this.props.villager["Furniture List"]!==undefined && 
      this.props.villager["Kitchen Equipment"]!==undefined && 
      this.props.villager["DIY Workbench"]!==undefined && 
      this.props.villager["Flooring"]!==undefined && 
      this.props.villager["Wallpaper"]!==undefined && 
      this.props.villager["Default Clothing"]!==undefined && 
      this.props.villager["Default Umbrella"]!==undefined){
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
            {
              list:[this.props.villager["Default Umbrella"]],
              key:"clothingCheckList"
            },
            {
              list:[this.props.villager["Favorite Song"]],
              key:"songCheckList"
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

export class VillagerFurnitureParadisePlanning extends Component {
  constructor() {
    super();
  }
  render(){
    if(this.props.request!==undefined  && 
      this.props.request!=="" && 
      this.props.request["Furniture List"]!==undefined,
      this.props.request["Song"]!==undefined,
      this.props.request["Request"]!==undefined) {
      return(
        <AllItemsPage
          disableFilters={true}
          title={this.props.request["Request"]}
          smallerHeader={true}
          itemIDs={[
            {
              list:[...this.props.request["Furniture List"].split(";")],
              key:"furnitureCheckList"
            },
            {
              list:[this.props.request["Song"]],
              key:"songCheckList"
            },
          ]}
          appBarColor = {colors.furnitureAppBar[global.darkMode]}
          accentColor = {colors.furnitureAccent[global.darkMode]}
        />
      )
    } else {
      return(<ErrorPage/>)
    }
  }
}