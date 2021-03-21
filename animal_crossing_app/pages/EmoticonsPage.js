import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';


class EmoticonsPage extends Component {
  render(){
    return(
        <ListPage 
          filters={["Source"]}
          disablePopup={[true]}
          showVariations={[false]}
          title="Emoticons"
          imageProperty={["Image"]}
          textProperty={["Name",]}
          textProperty2={["Source"]}
          checkListKey={[["emojiCheckList","Name"]]}
          searchKey={[["Name",]]}
          gridType="smallGrid" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedReactions"}
          appBarColor={colors.emojipediaAppBar[global.darkMode]}
          titleColor={colors.textBlack[global.darkMode]}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.lightDarkAccent[global.darkMode]}
          boxColor={false}
          labelColor={colors.textBlack[global.darkMode]}
          accentColor={colors.emojipediaAccent[global.darkMode]}
          specialLabelColor={colors.fishText[global.darkMode]}
        />
    )
  }
}
export default EmoticonsPage;