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
          scrollViewRef={this.props.scrollViewRef}
          gridType="smallGrid" //smallGrid, largeGrid, row
          appBarColor={colors.emojipediaAppBar[global.darkMode]}
          titleColor={colors.textBlack[global.darkMode]}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.lightDarkAccent[global.darkMode]}
          boxColor={colors.white[global.darkMode]}
          labelColor={colors.textBlack[global.darkMode]}
          accentColor={colors.artAccent[global.darkMode]}
          specialLabelColor={colors.fishText[global.darkMode]}
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