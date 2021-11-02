import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {capitalize, getSettingsString} from "../LoadJsonData"
import {RecipesRouteClass} from "./CraftingPage"
import {InfoLineBeside, InfoLine} from '../components/BottomSheetComponents';
import ErrorPage from "../pages/ErrorPage"

export default class CraftableItemsPage extends Component {
  constructor() {
    super();
  }
  render(){
    if(this.props.material!==undefined && this.props.material!==""){
      return(
        <RecipesRouteClass 
          title={capitalize(this.props.material["NameLanguage"])}
          tabs={false}
          showCraftableFromMaterial={this.props.material}
          subHeader={"Items you can craft with this"}
        />
      )
    } else {
      return(<ErrorPage/>)
    }
    
  }
}