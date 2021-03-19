import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';


class CurrentVillagers extends Component {
  constructor() {
    super();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }
  render(){
    return(
      <ListPage 
          setPage={this.props.setPage}
          title=""
          checkType={"heart"}
          filterCollectedOnly={true}
          currentVillagers={true}
          openPopup={this.props.openPopup}
          gridType="smallGrid" //smallGrid, largeGrid, row
          appBarColor={colors.emojipediaAppBar[global.darkMode]}
          titleColor={colors.textBlack[global.darkMode]}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.sectionBackground2[global.darkMode]}
          boxColor={false}
          labelColor={colors.textBlack[global.darkMode]}
          accentColor={colors.villagerAccent[global.darkMode]}
          specialLabelColor={colors.fishText[global.darkMode]}
          disablePopup={[
            false,
          ]}
          popUpCornerImageProperty={[
            "",
          ]}
          popUpCornerImageLabelProperty={[
            "",
          ]}
          imageProperty={[
            "Icon Image",
          ]}
          textProperty={[
            [global.language],
          ]}
          checkListKey={[["villagerCheckList","Name"]]}
          searchKey={[
            [global.language],
          ]}
          showVariations={[
            false,
          ]}
          dataGlobalName={"dataLoadedVillagers"}
        />
    )
  }
}
export default CurrentVillagers;