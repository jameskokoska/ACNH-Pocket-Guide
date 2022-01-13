import React, {Component} from 'react';
import colors from '../Colors.js';
import {getEventName, capitalize, getSettingsString,getSpecificFilters} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"
import ErrorPage from "../pages/ErrorPage"

export default class GlobalSearchPage extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <AllItemsPage 
        currentSearch={this.props.currentSearch}
        title={"Search Items"}
        appBarColor = {colors.customFiltersAppBar[global.darkMode]}
        accentColor = {colors.customFiltersAccent[global.darkMode]}
        setPage = {this.props.setPage}
      />
    )
  }
}