import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';


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
          leaveWarning = {global.settingsCurrent[4]["currentValue"]==="true" ? true : false}
          activeCreatures={true}
          gridType="smallGrid" //smallGrid, largeGrid, row
          appBarColor={colors.emojipediaAppBar[colors.mode]}
          titleColor={colors.textBlack[colors.mode]}
          searchBarColor={colors.searchbarBG[colors.mode]}
          backgroundColor={colors.lightDarkAccent[colors.mode]}
          boxColor={colors.white[colors.mode]}
          labelColor={colors.textBlack[colors.mode]}
          accentColor={colors.artAccent[colors.mode]}
          specialLabelColor={colors.fishText[colors.mode]}
          disablePopup={[
            false,
            false,
            false,
          ]}
          popUpContainer={[
            ["FishPopup",500],
            ["SeaPopup",500],
            ["BugPopup",500],
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