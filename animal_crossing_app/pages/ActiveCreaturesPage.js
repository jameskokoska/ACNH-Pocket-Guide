import React, {Component} from 'react';
import {View,} from 'react-native';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {attemptToTranslate} from "../LoadJsonData"

export default class ActiveCreaturesPage extends Component {
  render(){
    return(
      <ListPage 
        title="Active Creatures"
        // leaveWarning = {getSettingsString("settingsCreaturesLeavingWarning")==="true" ? true : false}
        subHeader = {"Creatures that can currently be caught"}
        extraInfo={
          [
            attemptToTranslate("Active Creatures"),
            attemptToTranslate("The background is red if this is the last month you are able to catch this creature before you need to wait again."),
          ]
        }
        tabs={false}
        leaveWarning = {true}
        activeCreatures={true}
        activeCreaturesPahe={true}
        gridType="smallGrid" //smallGrid, largeGrid, row
        appBarColor={colors.artAppBar[global.darkMode]}
        titleColor={colors.textWhiteOnly[global.darkMode]}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={false}
        labelColor={colors.textBlack[global.darkMode]}
        accentColor={colors.artAccent[global.darkMode]}
        specialLabelColor={colors.fishText[global.darkMode]}
        popUpPhraseProperty={["Catch phrase","Catch phrase","Catch phrase"]}
        disablePopup={[
          false,
          false,
          false,
        ]}
        popUpContainer={[
          ["FishPopup",600],
          ["SeaPopup",600],
          ["BugPopup",600],
        ]}
        popUpCornerImageProperty={[
          "Where/How",
          "Where/How",
          "Where/How",
        ]}
        popUpCornerImageLabelProperty={[
          "Where/How",
          "Where/How",
          "Where/How",
        ]}
        imageProperty={[
          "Icon Image",
          "Icon Image",
          "Icon Image",
        ]}
        textProperty={[
          ["NameLanguage",],
          ["NameLanguage",],
          ["NameLanguage",],
        ]}
        checkListKey={[
          ["fishCheckList","Name"],
          ["seaCheckList","Name"],
          ["bugCheckList","Name"],
        ]}
        searchKey={[
          ["NameLanguage",],
          ["NameLanguage",],
          ["NameLanguage",],
        ]}
        dataGlobalName={"dataLoadedCreatures"}
      />
    )
  }
}
