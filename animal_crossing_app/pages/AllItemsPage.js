import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';
import {getSettingsString} from "../LoadJsonData"

//Use this as template for all pages
//preload checklist keys on load
//pass in data structure
//Category constants.json in /assets/data/categoryConstants.json
//Major obstacle: List Page loads data using a 2D representation, not lists indexed by categories
//[
//  {
//   category:"Housewares"
//   disablePopup: false,
//   imageProperty: "Image",
//   textProperty: "NameLanguage",
//   textProperty2: "",
//   textProperty3: "",
//   popUpCornerImageLabelProperty: "Source",
//   popUpCornerImageProperty: "Source",
//   popUpPhraseProperty: "",
//   searchKey: ["NameLanguage"],
//  }
// ]
//always pull from same database
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
    var appBarColor = colors.allItemsAppBar[global.darkMode];
    if(this.props.appBarColor !==undefined){
      appBarColor = this.props.appBarColor;
    }
    var accentColor = colors.allItemsAccent[global.darkMode];
    if(this.props.accentColor !==undefined){
      accentColor = this.props.accentColor;
    }
    var subHeader = "";
    if(this.props.subHeader !==undefined){
      subHeader = this.props.subHeader;
    }
    var disableFilters = false;
    if(this.props.disableFilters !==undefined){
      disableFilters = this.props.disableFilters;
    }
    var tabs = false;
    if(this.props.tabs !==undefined){
      tabs = this.props.tabs;
    }
    var filterSearchable = true;
    if(this.props.filterSearchable !==undefined){
      filterSearchable = this.props.filterSearchable;
    }
    var smallerHeader = false;
    if(this.props.smallerHeader !==undefined){
      smallerHeader = this.props.smallerHeader;
    }
    var itemIDs = "";
    if(this.props.itemIDs !==undefined){
      itemIDs = this.props.itemIDs;
    }
    var currentSetFilters = "";
    if(this.props.currentSetFilters !==undefined){
      currentSetFilters = this.props.currentSetFilters;
    }
    var extraInfo = "";
    if(this.props.extraInfo !==undefined){
      extraInfo = this.props.extraInfo;
    }
    var noStackFilters = false;
    if(this.props.noStackFilters !==undefined){
      noStackFilters = this.props.noStackFilters;
    }
    return(
        <ListPage 
        noStackFilters={noStackFilters}
          extraInfo={extraInfo}
          currentSetFilters={currentSetFilters}
          smallerHeader={smallerHeader}
          itemIDs={itemIDs}
          disableFilters={disableFilters}
          setPage={this.props.setPage}
          tabs={tabs}
          filterSearchable = {filterSearchable}
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
            false,
            false,
            true,
            true,
            true,
            true,
            false,
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
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
            "",
          ]}
          popUpContainer={[
            ["FurniturePopup",440],
            ["FurniturePopup",440],
            ["FurniturePopup",440],
            ["FurniturePopup",440],
            ["FurniturePopup",440],
            ["FurniturePopup",440],
            ["FoodPopup",440],
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
            ["GyroidPopup",500], //none
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
            "Source",
            "Where/How",
            "Where/How",
            "Where/How",
            "Source",
            "Source",
            "Gender",
            "Source",
            "Source",
            "Source",
            "Source",
            "Source",
            "",
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
            "Source",
            "Where/How",
            "Where/How",
            "Where/How",
            "Source",
            "Source",
            "Gender",
            "Source",
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
            "Source",
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
            "Inventory Image",
            "Image",
            "image",
            "image",
            "image",
            "image",
            "image",
            "image",
            "image",
            "image"
          ]}
          textProperty={[
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
          ]}
          checkListKey={[
            ["furnitureCheckList","Name","Variation","Pattern"],
            ["furnitureCheckList","Name","Variation","Pattern"],
            ["furnitureCheckList","Name","Variation","Pattern"],
            ["furnitureCheckList","Name","Variation","Pattern"],
            ["furnitureCheckList","Name"],
            ["furnitureCheckList","Name","Variation","Pattern"],
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
            ["gyroidCheckList","Name","Variation","Pattern"],
            ["amiiboCheckListSeries1","Name"],
            ["amiiboCheckListSeries2","Name"],
            ["amiiboCheckListSeries3","Name"],
            ["amiiboCheckListSeries4","Name"],
            ["amiiboCheckListSeries5","Name"],
            ["amiiboCheckListPromos","Name"],
            ["amiiboCheckListSeriesWelcomeamiiboseries","Name"],
            ["amiiboCheckListSeriesSanrioseries","Name"],
          ]}
          searchKey={[
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
            ["NameLanguage"],
          ]}
          dataGlobalName={"dataLoadedAll"}
        />
    )
  }
}
export default AllItemsPage;