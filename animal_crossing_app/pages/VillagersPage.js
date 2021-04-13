import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';


class VillagersPage extends Component {
  render(){
    return(
        <ListPage 
          setPage={this.props.setPage}
          tabs={false}
          extraInfo={
            {
              type:"guideRedirect",
              title:"Guide + FAQ",
              content:"You can read more details about villagers by visiting villagers guide page",
              linkText: "Tap here to read more about villagers",
              redirectPassBack: "villagersRedirect"
            }
          }
          filterSearchable = {true}
          disablePopup={[false]}
          title="Villagers"
          imageProperty={["Icon Image"]}
          textProperty={["NameLanguage",]}
          searchKey={[["NameLanguage",]]}
          gridType="smallGrid" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedVillagers"}
          appBarColor={colors.villagerAppBar[global.darkMode]}
          appBarImage={[require("../assets/icons/villagersBackground.png"),require("../assets/icons/villagersBackgroundDark.png")][global.darkMode]}
          titleColor={colors.textBlack[global.darkMode]}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.lightDarkAccent[global.darkMode]}
          boxColor={true}
          labelColor={colors.textBlack[global.darkMode]}
          accentColor={colors.villagerAccent[global.darkMode]}
          specialLabelColor={colors.fishText[global.darkMode]}
          checkType={"heart"}
          popUpContainer={[["VillagerPopup",450]]}
          popUpPhraseProperty={["Catchphrase"]}
        />
    )
  }
}
export default VillagersPage;