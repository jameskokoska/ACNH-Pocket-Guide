import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {capitalize, getSettingsString} from "../LoadJsonData"
import CraftingPage from "./CraftingPage"
import {InfoLineBeside, InfoLine} from '../components/BottomSheetComponents';
import ErrorPage from "../pages/ErrorPage"
import * as RootNavigation from '../RootNavigation.js';
import { AndroidBackHandler } from '../components/BackHandler';

export default class CraftableItemsPage extends Component {
  constructor() {
    super();
  }
  onBackButtonPressAndroid = () => {
    RootNavigation.popRoute(1)
    return true;
  };
  render(){
    if(this.props.material!==undefined && this.props.material!==""){
      return(
        <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
          <CraftingPage 
            title={capitalize(this.props.material["NameLanguage"])}
            tabs={false}
            smallerHeader
            showCraftableFromMaterial={this.props.material}
            subHeader={"Items you can craft with this"}
          />
        </AndroidBackHandler>
      )
    } else {
      return(<ErrorPage/>)
    }
    
  }
}