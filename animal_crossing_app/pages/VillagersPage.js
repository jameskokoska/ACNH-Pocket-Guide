import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';
import { getStorage } from '../LoadJsonData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Popup from '../components/Popup';


class VillagersPage extends Component {
  async componentDidMount(){
    setTimeout(async ()=>{
      let response = await getStorage("villagersPageAddPopup","")
      if(response === ""){
        this.addVillagersPopup?.setPopupVisible(true)
        await AsyncStorage.setItem("villagersPageAddPopup", "true");
      }
    },0)
  }
  render(){
    return(<>
      <Popup
        ref={(addVillagersPopup) => this.addVillagersPopup = addVillagersPopup}
        button1={"OK"}
        button1Action={()=>{}}
        textLower={"Tap the Heart to add villagers currently in your town."}
      />
      <ListPage 
        setPage={this.props.setPage}
        tabs={false}
        subHeader="Tap the Heart to add villagers currently in your town."
        subHeader2="Tap the [?] in the top right corner for more information."
        extraInfo={
          {
            type:"guideRedirect",
            title:"Guide + FAQ",
            content:"Mark which villagers you have photos of by tapping the photo icon.",
            content2:"Mark which villagers have once been in your town by tapping the moving boxes icon.",
            content3:"You can read more details about villagers by visiting villagers guide page",
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
        popUpCornerImageProperty={["Gender"]}
        popUpCornerImageLabelProperty={["Gender"]}
      />
    </>)
  }
}
export default VillagersPage;