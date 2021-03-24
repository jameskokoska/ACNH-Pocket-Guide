import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';
import {getSettingsString} from "../LoadJsonData"

class AllItemsPage extends Component {
  render(){
    var title = "Everything";
    if(this.props.title!==undefined){
      title = this.props.title;
    }
    var newItems = false;
    if(this.props.newItems!==undefined){
      newItems = this.props.newItems
    }
    var wishlistItems = false;
    if(this.props.wishlistItems!==undefined){
      wishlistItems = this.props.wishlistItems
    }
    var appBarColor = colors.emojipediaAppBar[global.darkMode];
    if(this.props.appBarColor !==undefined){
      appBarColor = this.props.appBarColor;
    }
    var accentColor = colors.emojipediaAccent[global.darkMode];
    if(this.props.accentColor !==undefined){
      accentColor = this.props.accentColor;
    }
    var subHeader = "";
    if(this.props.subHeader !==undefined){
      subHeader = this.props.subHeader;
    }
    var disableSearch = false;
    if(this.props.disableSearch !==undefined){
      disableSearch = this.props.disableSearch;
    }
    return(
        <ListPage 
          disableSearch={disableSearch}
          setPage={this.props.setPage}
          tabs={false}
          filters={["Source","Tag", "DIY", "Catalog", "Where/How","Weather","Shadow","Movement Speed", "Season/Event","Category", "Season/Event Exclusive", "Seasonality", "Personality","Species","Hobby","Style 1","Style 2","Color 1","Color 2","Variation","Style 1","Style 2","Size", "HHA Concept 1", "HHA Concept 2", "HHA Series", "HHA Set", "HHA Category"]}
          filterSearchable = {true}
          title={title}
          subHeader={subHeader}
          newItems={newItems}
          wishlistItems={wishlistItems}
          gridType="smallGrid" //smallGrid, largeGrid, row
          appBarColor={appBarColor}
          titleColor={colors.textBlack[global.darkMode]}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.lightDarkAccent[global.darkMode]}
          boxColor={true}
          labelColor={colors.textBlack[global.darkMode]}
          accentColor={accentColor}
          specialLabelColor={colors.fishText[global.darkMode]}
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
            false,
            false,
            false,
            true,
            true,
            true,
            true,
            false,
          ]}
          popUpPhraseProperty={[
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
            "",
            "",
            "",
            "",
            "Uses",
            "Catch phrase",
            "Catch phrase",
            "Catch phrase",
            "",
            "Artist",
            "Catchphrase",
            "",
            "",
            "",
            "",
            "Stack Size",
          ]}
          popUpContainer={[
            ["FurniturePopup",440],
            ["FurniturePopup",440],
            ["FurniturePopup",440],
            ["FurniturePopup",440],
            ["FurniturePopup",440],
            ["ClothingPopup",450],
            ["ClothingPopup",450],
            ["ClothingPopup",450],
            ["ClothingPopup",450],
            ["ClothingPopup",450],
            ["ClothingPopup",450],
            ["ClothingPopup",450],
            ["ClothingPopup",450],
            ["ClothingPopup",450],
            ["ClothingPopup",450],
            ["FloorWallsPopup",400],
            ["FloorWallsPopup",400],
            ["FloorWallsPopup",400],
            ["RecipesPopup",500],
            ["ToolsPopup",200],
            ["FishPopup",500],
            ["BugPopup",460],
            ["SeaPopup",480],
            ["FossilPopup",200],
            ["ArtPopup",1050],
            ["VillagerPopup",450],
            ["MusicPopup",500], //none
            ["EmojipediaPopup",500], //none
            ["ConstructionPopup",500], //none
            ["ConstructionPopup",500], //none
            ["MaterialsPopup",500], //none
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
            "Image",
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
            "Inventory Image"
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
            ["floorWallsCheckList","Name"],
            ["floorWallsCheckList","Name"],
            ["floorWallsCheckList","Name"],
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
            ["materialsCheckList","Name"],
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
            ["Name"],
            ["Name"],
            ["Name"],
            ["Name"],
          ]}
          showVariations={[
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
            getSettingsString("settingsShowVariation")==="true" ? true : false,
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
          ]}
          dataGlobalName={"dataLoadedAll"}
        />
    )
  }
}
export default AllItemsPage;