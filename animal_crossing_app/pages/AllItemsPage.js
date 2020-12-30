import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';


class AllItemsPage extends Component {
  render(){
    return(
        <ListPage 
          title="Everything"
          gridType="smallGrid" //smallGrid, largeGrid, row
          appBarColor={colors.emojipediaAppBar[colors.mode]}
          titleColor={colors.textBlack[colors.mode]}
          searchBarColor={colors.searchbarBG[colors.mode]}
          backgroundColor={colors.lightDarkAccent[colors.mode]}
          boxColor={colors.white[colors.mode]}
          labelColor={colors.textBlack[colors.mode]}
          accentColor={colors.emojipediaAccent[colors.mode]}
          specialLabelColor={colors.fishText[colors.mode]}
          disablePopup={[
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            true,
            true,
            true,
          ]}
          popUpContainer={[
            ["FurniturePopup",500],
            ["FurniturePopup",500],
            ["FurniturePopup",500],
            ["FurniturePopup",500],
            ["FurniturePopup",500],
            ["ClothingPopup",500],
            ["ClothingPopup",500],
            ["ClothingPopup",500],
            ["ClothingPopup",500],
            ["ClothingPopup",500],
            ["ClothingPopup",500],
            ["ClothingPopup",500],
            ["ClothingPopup",500],
            ["ClothingPopup",500],
            ["ClothingPopup",500],
            ["RecipesPopup",500],
            ["ToolsPopup",500],
            ["FishPopup",500],
            ["BugPopup",500],
            ["SeaPopup",500],
            ["FossilPopup",500],
            ["ArtPopup",1000],
            ["VillagerPopup",500],
            ["MusicPopup",500], //none
            ["EmojipediaPopup",500], //none
            ["ConstructionPopup",500], //none
            ["ConstructionPopup",500], //none
          ]}
          popUpCornerImageProperty={[
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Where/How",
            "Where/How",
            "",
            "Source",
            "Source",
            "",
            "Source",
            "Source",
            "Source",
            "Source",
          ]}
          popUpCornerImageLabelProperty={[
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "Where/How",
            "Where/How",
            "",
            "Source",
            "Source",
            "",
            "Source",
            "Source",
            "Source",
            "Source",
          ]}
          textProperty2={[
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "(DIY)",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ]}
          imageProperty={[
            "Image",
            "Image",
            "Image",
            "Image",
            "Image",
            "Closet Image",
            "Closet Image",
            "Closet Image",
            "Closet Image",
            "Closet Image",
            "Closet Image",
            "Closet Image",
            "Closet Image",
            "Closet Image",
            "Storage Image",
            "Image",
            "Image",
            "Icon Image",
            "Icon Image",
            "Icon Image",
            "Image",
            "Image",
            "Icon Image",
            "Framed Image",
            "Image",
            "Image",
            "Image",
          ]}
          textProperty={[
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
          ]}
          checkListKey={[
            ["furnitureCheckList","Name","Variation","Pattern"],
            ["furnitureCheckList","Name","Variation","Pattern"],
            ["furnitureCheckList","Name","Variation","Pattern"],
            ["furnitureCheckList","Name","Variation","Pattern"],
            ["furnitureCheckList","Name"],
            ["clothingCheckList","Name","Variation"],
            ["clothingCheckList","Name","Variation"],
            ["clothingCheckList","Name","Variation"],
            ["clothingCheckList","Name","Variation"],
            ["clothingCheckList","Name","Variation"],
            ["clothingCheckList","Name","Variation"],
            ["clothingCheckList","Name","Variation"],
            ["clothingCheckList","Name","Variation"],
            ["clothingCheckList","Name","Variation"],
            ["clothingCheckList","Name"],
            ["recipesCheckList","Name"],
            ["toolsCheckList","Name","Variation"],
            ["fishCheckList","Name"],
            ["bugCheckList","Name"],
            ["seaCheckList","Name"],
            ["fossilCheckList","Name"],
            ["artCheckList","Name","Genuine"],
            ["villagerCheckList","Name"],
            ["songCheckList","Name"],
            ["emojiCheckList","Name"],
            ["constructionCheckList","Name"],
            ["fenceCheckList","Name"],
          ]}
          searchKey={[
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
          ]}
          showVariations={[
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
          ]}
          dataGlobalName={"dataLoadedAll"}
        />
    )
  }
}
export default AllItemsPage;