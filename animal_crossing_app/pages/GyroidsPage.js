import React, {Component} from 'react';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';

export default class GyroidsPage extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <ListPage 
        title="Gyroids"
        comingSoon={true}
        imageProperty={["Icon Image"]}
        textProperty={["NameLanguage",]}
        textProperty2={["creatureTime"]}
        textProperty3={["Where/How"]}
        searchKey={[["NameLanguage",]]}
        gridType="smallGrid" //smallGrid, largeGrid, row
        dataGlobalName={"dataLoadedFish"}
        appBarColor={colors.gyroidAppBar[global.darkMode]}
        titleColor={colors.textWhiteOnly[global.darkMode]}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={false}
        labelColor={colors.textBlack[global.darkMode]}
        accentColor={colors.fishAccent[global.darkMode]}
        specialLabelColor={colors.fishText[global.darkMode]}
        popUpCornerImageProperty={["Where/How"]}
        popUpCornerImageLabelProperty={["Where/How"]}
        popUpPhraseProperty={["Catch phrase"]}
        popUpContainer={[["FishPopup",550]]} //name of the popup class and height
      />
    )
  }
}