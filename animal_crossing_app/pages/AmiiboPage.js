import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';

export default class AmiiboPage extends Component {
  render(){
    console.log(global.dataLoadedAmiibo)
    return(
      <ListPage 
        disablePopup={[true, true, true, true, true, true, true]}
        title="Amiibo"
        imageProperty={["image","image","image","image","image","image","image"]}
        textProperty={["NameLanguage","NameLanguage","NameLanguage","NameLanguage","NameLanguage","NameLanguage","NameLanguage"]}
        searchKey={[["NameLanguage"],["NameLanguage"],["NameLanguage"],["NameLanguage"],["NameLanguage"],["NameLanguage"],["NameLanguage"],]}
        gridType="smallGrid" //smallGrid, largeGrid, row
        dataGlobalName={"dataLoadedAmiibo"}
        appBarColor={colors.constructionAppBar[global.darkMode]}
        titleColor={colors.textBlack[global.darkMode]}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={false}
        labelColor={colors.textBlack[global.darkMode]}
      />
    )
  }
}
