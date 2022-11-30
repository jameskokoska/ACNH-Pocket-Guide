import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {capitalize, findIngredients, getSettingsString} from "../LoadJsonData"
import CraftingPage from "./CraftingPage"
import {InfoLineBeside, InfoLine} from '../components/BottomSheetComponents';
import ErrorPage from "../pages/ErrorPage"
import * as RootNavigation from '../RootNavigation.js';
import AllItemsPage from './AllItemsPage';
import { AndroidBackHandler } from '../components/BackHandler';

export default class IngredientsPage extends Component {
  constructor() {
    super();
  }
  onBackButtonPressAndroid = () => {
    RootNavigation.popRoute(1)
    return true;
  };
  render(){
    if(this.props.baseItem!==undefined){
      let itemIds = findIngredients(this.props.baseItem)
      console.log(itemIds)
      return(
        <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
          <AllItemsPage
            disableFilters={true}
            title={capitalize(this.props.baseItem["NameLanguage"])}
            itemIDs={[
              {
                list:itemIds,
              },
            ]}
            subHeader="Ingredients to craft this item"
            appBarColor = {colors.villagerAppBar[global.darkMode]}
            accentColor = {colors.villagerAccent[global.darkMode]}
            tabs={false}
            smallerHeader
          />
        </AndroidBackHandler>
      )
    } else {
      return(<ErrorPage/>)
    }
    
  }
}