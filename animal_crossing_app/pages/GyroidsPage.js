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
        // comingSoon={true}
        imageProperty={["Image"]}
        textProperty={["NameLanguage",]}
        searchKey={[["NameLanguage",]]}
        gridType="smallGrid" //smallGrid, largeGrid, row
        dataGlobalName={"dataLoadedGyroids"}
        appBarColor={colors.gyroidAppBar[global.darkMode]}
        titleColor={colors.textWhiteOnly[global.darkMode]}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={false}
        labelColor={colors.textBlack[global.darkMode]}
        accentColor={colors.fishAccent[global.darkMode]}
        specialLabelColor={colors.fishText[global.darkMode]}
        popUpContainer={[["GyroidPopup",550]]}
      />
    )
  }
}