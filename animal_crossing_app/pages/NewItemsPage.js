import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getSettingsString} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"

export default class NewItemsPage extends Component {
  constructor() {
    super();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }
  render(){
    return(
      <AllItemsPage 
        title="New Items"
        newItems={true}
        appBarColor = {colors.newItemsAppBar[global.darkMode]}
        accentColor = {colors.newItemsAccent[global.darkMode]}
      />
    )
  }
}