import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getSettingsString} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"

export default class Wishlist extends Component {
  constructor() {
    super();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }
  render(){
    return(
      <AllItemsPage 
        disableSearch={true}
        title="Wishlist"
        wishlistItems={true}
        setPage={this.props.setPage}
        subHeader="Long press items to add/remove from your wishlist"
        appBarColor = {colors.wishlistAppBar[global.darkMode]}
        accentColor = {colors.wishlistAccent[global.darkMode]}
      />
    )
  }
}