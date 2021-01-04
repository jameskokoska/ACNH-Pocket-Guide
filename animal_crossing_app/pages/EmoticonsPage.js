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
          textProperty={["Name"]}
          textProperty2={["Source"]}
          checkListKey={[["emojiCheckList","Name"]]}
          searchKey={[["Name","Source"]]}
          gridType="smallGrid" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedReactions"}
          appBarColor={colors.emojipediaAppBar[colors.mode]}
          titleColor={colors.textBlack[colors.mode]}
          searchBarColor={colors.searchbarBG[colors.mode]}
          backgroundColor={colors.lightDarkAccent[colors.mode]}
          boxColor={colors.white[colors.mode]}
          labelColor={colors.textBlack[colors.mode]}
          accentColor={colors.emojipediaAccent[colors.mode]}
          specialLabelColor={colors.fishText[colors.mode]}
        />
    )
  }
}
export default EmoticonsPage;