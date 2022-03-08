import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getEventName, capitalize, getSettingsString,getSpecificFilters} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"
import ErrorPage from "../pages/ErrorPage"
import * as RootNavigation from '../RootNavigation.js';
import { AndroidBackHandler } from "react-navigation-backhandler";

export default class CustomFiltersPage extends Component {
  constructor() {
    super();
  }
  onBackButtonPressAndroid = () => {
    RootNavigation.popRoute(1)
    return true;
  };
  render(){
    //the props are the same (for some reason?)
    if(this.props.currentFiltersSearchFor!==undefined && this.props.currentFiltersSearchFor!==""){
      var eventName = getEventName(this.props.titlePassed)
      console.log(this.props.currentFiltersSearchFor)
      let filteredFilter = this.props.currentFiltersSearchFor;
      if(filteredFilter.startsWith("STORE HOURS:")){
        filteredFilter = filteredFilter.replace("STORE HOURS:","")
      }
      return(
        <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
          <AllItemsPage 
            noStackFilters={true} //dangerous because only collected filters will stack...
            smallerHeader={this.props.titlePassed!==undefined&&filteredFilter.length>15?true:false}
            // disableFilters={true}
            title={this.props.currentFiltersSearchFor.startsWith("STORE HOURS:")?capitalize(filteredFilter):capitalize(eventName)}
            currentSetFilters={getSpecificFilters(filteredFilter)}
            subHeader={this.props.currentFiltersSearchFor.startsWith("STORE HOURS:")?"":"You can get these items from this event"}
            appBarColor = {colors.customFiltersAppBar[global.darkMode]}
            accentColor = {colors.customFiltersAccent[global.darkMode]}
            setPage = {this.props.setPage}
            extraInfo={
              {
                type:"guideRedirect",
                title:"Guide + FAQ",
                content:"You can read more about specific events and details by visiting the guide page",
                linkText: "Tap here to read about events",
                redirectPassBack: "eventsRedirect"
              }
            }
          />
        </AndroidBackHandler>
      )
    } else {
      return(<ErrorPage/>)
    }
    
  }
}