import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';

class ConstructionPage extends Component {
  render(){
    return(
        <ListPage 
          disablePopup={[true, true]}
          showVariations={[false]}
          title="Construction"
          imageProperty={["Image","Image"]}
          textProperty={[global.language,global.language]}
          textProperty2={"construction"}
          checkListKey={[["constructionCheckList","Name"],["fenceCheckList","Name"]]}
          searchKey={[[global.language],[global.language]]}
          gridType="largeGridSmaller" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedConstruction"}
          appBarColor={colors.constructionAppBar[global.darkMode]}
          titleColor={colors.textBlack[global.darkMode]}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.lightDarkAccent[global.darkMode]}
          boxColor={false}
          labelColor={colors.textBlack[global.darkMode]}
        />
    )
  }
}
export default ConstructionPage;