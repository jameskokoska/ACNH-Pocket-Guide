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
  }
  render(){
    return(
      <AllItemsPage 
        setPage={this.props.setPage}
        disableFilters={true}
        title="New Items"
        subHeader="Items that have been added from the most recent update"
        newItems={true}
        appBarColor = {colors.newItemsAppBar[global.darkMode]}
        accentColor = {colors.newItemsAccent[global.darkMode]}
        extraInfo={
          {
            type:"guideRedirect",
            title:"Guide + FAQ",
            content:"You can read more about the new game update by visiting the events and guide page",
            linkText: "Tap here to read about the new update",
            redirectPassBack: "updateRedirect"
          }
        }
      />
    )
  }
}