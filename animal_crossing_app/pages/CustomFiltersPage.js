import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getEventName, capitalize, getSettingsString,getSpecificFilters} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"
import ErrorPage from "../pages/ErrorPage"

export default class CustomFiltersPage extends Component {
  constructor() {
    super();
  }
  render(){
    if(this.props.currentFiltersSearchFor!==undefined && this.props.currentFiltersSearchFor!==""){
      var eventName = getEventName(this.props.titlePassed)
      console.log(this.props.currentFiltersSearchFor)
      return(
        <AllItemsPage 
          noStackFilters={true} //dangerous because only collected filters will stack...
          smallerHeader={this.props.titlePassed!==undefined&&this.props.titlePassed.length>15?true:false}
          // disableFilters={true}
          title={capitalize(eventName)}
          currentSetFilters={getSpecificFilters(this.props.currentFiltersSearchFor)}
          subHeader="You can get these items from this event"
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
      )
    } else {
      return(<ErrorPage/>)
    }
    
  }
}