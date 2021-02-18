import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';

class MaterialsPage extends Component {
  render(){
    return(
        <ListPage 
          tabs={false}
          showVariations={[false]}
          title="Materials"
          imageProperty={["Inventory Image"]}
          textProperty={["Name"]}
          checkListKey={[["materialsCheckList","Name"]]}
          searchKey={[["Name"]]}
          gridType="smallGrid" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedMaterials"}
          appBarColor={colors.materialsAppBar[global.darkMode]}
          titleColor={colors.textBlack[global.darkMode]}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.lightDarkAccent[global.darkMode]}
          boxColor={colors.white[global.darkMode]}
          labelColor={colors.textBlack[global.darkMode]}
          accentColor={colors.materialsAccent[global.darkMode]}
          popUpCornerImageProperty={["Source"]}
          popUpCornerImageLabelProperty={["Source"]}
          popUpContainer={[["MaterialsPopup",500]]}
          specialLabelColor={colors.fishText[global.darkMode]}
          popUpPhraseProperty={["Stack Size"]}
        />
    )
  }
}
export default MaterialsPage;