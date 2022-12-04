import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';

export default class PhotosPostersPage extends Component {
  render(){
    return(
      <ListPage 
        tabs={false}
        disablePopup={[false, false]}
        title="Photos + Posters"
        imageProperty={["Image","Image"]}
        textProperty={["NameLanguage","NameLanguage"]}
        searchKey={[["NameLanguage"],["NameLanguage"]]}
        gridType="smallGrid" //smallGrid, largeGrid, row
        dataGlobalName={"dataLoadedPhotosPosters"}
        appBarColor={colors.photosAppBar[global.darkMode]}
        titleColor={colors.textBlack[global.darkMode]}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={false}
        labelColor={colors.textBlack[global.darkMode]}
        extraInfo={
          {
            type:"guideRedirect",
            title:"Guide + FAQ",
            content:"You can read more about villager photos by visiting the guide page",
            linkText: "Tap here to read about villager photos",
            redirectPassBack: "photosRedirect"
          }
        }
        setPage={this.props.setPage}
        popUpContainer={[
          ["FurniturePopup",460],
          ["FurniturePopup",460],
        ]}
        accentColor={colors.photosAccent[global.darkMode]}
      />
    )
  }
}
