import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getSettingsString} from "../LoadJsonData"

class ActiveCreatures extends Component {
  constructor() {
    super();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }
  render(){
    return(
      <View style={{height: Dimensions.get('window').height}}>
      <ListPage 
          title=""
          leaveWarning = {getSettingsString("settingsCreaturesLeavingWarning")==="true" ? true : false}
          activeCreatures={true}
          scrollViewRef={this.props.scrollViewRef}
          gridType="smallGrid" //smallGrid, largeGrid, row
          appBarColor={colors.emojipediaAppBar[global.darkMode]}
          titleColor={colors.lightDarkAccentHeavy[global.darkMode]}
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
            "",
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
            ["Name"],
            ["Name"],
            ["Name"],
          ]}
          checkListKey={[
            ["fishCheckList","Name"],
            ["seaCheckList","Name"],
            ["bugCheckList","Name"],
          ]}
          searchKey={[
            ["Name"],
            ["Name"],
            ["Name"],
          ]}
          showVariations={[
            false,
            false,
            false
          ]}
          dataGlobalName={"dataLoadedCreatures"}
        />
        </View>
    )
  }
}
export default ActiveCreatures;