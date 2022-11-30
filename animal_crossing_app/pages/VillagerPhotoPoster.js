import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from '../Colors.js';
import AllItemsPage from "./AllItemsPage"
import ErrorPage from "../pages/ErrorPage"
import * as RootNavigation from '../RootNavigation.js';
import { findPhotoAndPoster, getRecentItemObjectsList } from '../LoadJsonData.js';
import { AndroidBackHandler } from '../components/BackHandler.js';

export default class VillagerPhotoPoster extends Component {
  constructor() {
    super();
  }
  onBackButtonPressAndroid = () => {
    RootNavigation.popRoute(1)
    return true;
  };
  render(){
    if(this.props.villager!==undefined  && 
      this.props.villager!=="" && 
      this.props.villager["Name"]!==undefined
      ){
      let itemIds = findPhotoAndPoster(this.props.villager["Name"])
      console.log(itemIds)
      return(
        <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
          <AllItemsPage 
            disableFilters={true}
            title={this.props.villager["NameLanguage"]}
            itemIDs={[
              {
                list:itemIds,
              },
            ]}
            subHeader="Villager's photo and poster"
            appBarColor = {colors.villagerAppBar[global.darkMode]}
            accentColor = {colors.villagerAccent[global.darkMode]}
          />
        </AndroidBackHandler>
      )
    } else {
      return(<ErrorPage/>)
    }
  }
}