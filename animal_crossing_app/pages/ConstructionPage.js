import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';

class ConstructionPage extends Component {
  render(){
    return(
        <ListPage 
          disablePopup={[true]}
          showVariations={[false]}
          title="Construction"
          imageProperty={["Image","Image"]}
          textProperty={["Name","Name"]}
          textProperty2={"construction"}
          checkListKey={[["constructionCheckList","Name"],["fenceCheckList","Name"]]}
          searchKey={[["Name"],["Name"]]}
          gridType="largeGridSmaller" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedConstruction"}
          appBarColor={colors.constructionAppBar[colors.mode]}
          titleColor={colors.textBlack[colors.mode]}
          searchBarColor={colors.searchbarBG[colors.mode]}
          backgroundColor={colors.lightDarkAccent[colors.mode]}
          boxColor={colors.white[colors.mode]}
          labelColor={colors.textBlack[colors.mode]}
        />
    )
  }
}
export default ConstructionPage;