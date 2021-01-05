import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';


class VillagersPage extends Component {
  render(){
    return(
        <ListPage 
          filters={["Personality","Species","Hobby","Style 1","Style 2","Color 1","Color 2"]}
          filterSearchable = {true}
          disablePopup={[false]}
          showVariations={[false]}
          title="Villagers"
          imageProperty={["Icon Image"]}
          textProperty={["Name"]}
          checkListKey={[["villagerCheckList","Name"]]}
          searchKey={[["Name"]]}
          gridType="smallGrid" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedVillagers"}
          appBarColor={colors.villagerAppBar[colors.mode]}
          appBarImage={[require("../assets/icons/villagersBackground.png"),require("../assets/icons/villagersBackgroundDark.png")][colors.mode]}
          titleColor={colors.textBlack[colors.mode]}
          searchBarColor={colors.searchbarBG[colors.mode]}
          backgroundColor={colors.lightDarkAccent[colors.mode]}
          boxColor={colors.white[colors.mode]}
          labelColor={colors.textBlack[colors.mode]}
          accentColor={colors.villagerAccent[colors.mode]}
          specialLabelColor={colors.fishText[colors.mode]}
          checkType={"heart"}
          popUpContainer={[["VillagerPopup",450]]}
          popUpPhraseProperty={["Catchphrase"]}
        />
    )
  }
}
export default VillagersPage;