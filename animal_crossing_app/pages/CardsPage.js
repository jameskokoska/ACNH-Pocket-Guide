import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';

class CardsPage extends Component {
  render(){
    return(
        <ListPage 
          disablePopup={[true]}
          title="Letters"
          imageProperty={["Image"]}
          textProperty={["NameLanguage"]}
          textProperty2={"cards"}
          checkListKey={[["cardsCheckList","Name"]]}
          searchKey={[["NameLanguage"]]}
          gridType="largeGridSmaller" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedCards"}
          appBarColor={colors.cardsAppBar[global.darkMode]}
          titleColor={colors.textBlack[global.darkMode]}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.lightDarkAccent[global.darkMode]}
          boxColor={false}
          labelColor={colors.textBlack[global.darkMode]}
          accentColor={colors.cardsAccent[global.darkMode]}
        />
    )
  }
}
export default CardsPage;