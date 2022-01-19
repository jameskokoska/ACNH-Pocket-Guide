import React, {Component} from 'react';
import colors from '../Colors.js';
import {getEventName, capitalize, getSettingsString,getSpecificFilters} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"
import ErrorPage from "../pages/ErrorPage"
import * as RootNavigation from '../RootNavigation.js';
import { AndroidBackHandler } from "react-navigation-backhandler";

export default class GlobalSearchPage extends Component {
  constructor() {
    super();
  }
  onBackButtonPressAndroid = () => {
    RootNavigation.popRoute(1)
    return true;
  };
  render(){
    return(
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <AllItemsPage 
          currentSearch={this.props.currentSearch}
          title={"Search Items"}
          appBarColor = {colors.customFiltersAppBar[global.darkMode]}
          accentColor = {colors.customFiltersAccent[global.darkMode]}
          setPage = {this.props.setPage}
        />
      </AndroidBackHandler>
    )
  }
}