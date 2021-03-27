import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getSettingsString, attemptToTranslate} from "../LoadJsonData"

const width = { width: Dimensions.get('window').width };


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{backgroundColor: colors.white[global.darkMode]}}
    activeColor={colors.textBlack[global.darkMode]}
    inactiveColor={colors.textBlack[global.darkMode]}
    getLabelText={({ route }) => route.title}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color, margin: 2, textAlign:"center" }}>
        {route.title}
      </Text>
    )}
  />
);

const MaterialsRoute = () => (
  <ListPage 
    tabs={true}
    title="Materials"
    imageProperty={["Inventory Image"]}
    textProperty={["NameLanguage",]}
    checkListKey={[["materialsCheckList","Name"]]}
    searchKey={[["NameLanguage",]]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedMaterials"}
    appBarColor={colors.materialsAppBar[global.darkMode]}
    titleColor={colors.textBlack[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={true}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.materialsAccent[global.darkMode]}
    popUpCornerImageProperty={["Source"]}
    popUpCornerImageLabelProperty={["Source"]}
    popUpContainer={[["MaterialsPopup",500]]}
    specialLabelColor={colors.fishText[global.darkMode]}
    popUpPhraseProperty={["Stack Size"]}
  />
)

const FurnitureRoute = () => (
  <ListPage 
    filterSearchable = {true}
    title="Furniture"
    imageProperty={[
      "Image",
      "Image",
      "Image",
      "Image",
      "Image",
    ]}
    textProperty={[
      "NameLanguage",
      "NameLanguage",
      "NameLanguage",
      "NameLanguage",
      "NameLanguage",
    ]}
    checkListKey={[
      ["furnitureCheckList","Name","Variation","Pattern"],
      ["furnitureCheckList","Name","Variation","Pattern"],
      ["furnitureCheckList","Name","Variation","Pattern"],
      ["furnitureCheckList","Name","Variation","Pattern"],
      ["furnitureCheckList","Name","Variation","Pattern"],
      ["furnitureCheckList","Name"],
    ]}
    searchKey={[
      ["NameLanguage",],
      ["NameLanguage",],
      ["NameLanguage",],
      ["NameLanguage",],
      ["NameLanguage",],
    ]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedFurniture"}
    appBarColor={colors.furnitureAppBar[global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={true}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.furnitureAccent[global.darkMode]}
    specialLabelColor={colors.fishText[global.darkMode]}
    popUpCornerImageProperty={[
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
    ]}
    popUpContainer={[
      ["FurniturePopup",460],
      ["FurniturePopup",460],
      ["FurniturePopup",460],
      ["FurniturePopup",460],
      ["FurniturePopup",460],
    ]}
  />
)

const ClothingRoute = () => (
  <ClothingRouteClass/>
)

export class ClothingRouteClass extends Component{
  render(){
    var title = this.props.title;
    var villagerGifts = false;
    var villagerGiftsFilters = [];
    var subHeader = "";
    var customHeader;
    var filterSearchable = true;
    var appBarColor = colors.clothingAppBar[global.darkMode];
    var titleColor = colors.textWhiteOnly[global.darkMode];
    if(title!==undefined){
      villagerGifts = true;
      villagerGiftsFilters = this.props.villagerGiftsFilters;
      subHeader = this.props.subHeader;
      customHeader = this.props.customHeader;
      filterSearchable = true;
      appBarColor = colors.giftsAppBar[global.darkMode];
      titleColor = colors.textBlack[global.darkMode]
    } else {
      title="Clothing";
      villagerGifts = false;
    }
    return (
      <ListPage 
        customHeader={customHeader}
        filterSearchable={filterSearchable}
        subHeader={subHeader}
        villagerGifts={villagerGifts}
        villagerGiftsFilters={villagerGiftsFilters}
        filterSearchable = {true}
        title={title}
        imageProperty={[
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
        ]}
        textProperty={[
          "NameLanguage",
          "NameLanguage",
          "NameLanguage",
          "NameLanguage",
          "NameLanguage",
          "NameLanguage",
          "NameLanguage",
          "NameLanguage",
          "NameLanguage",
          "NameLanguage",
        ]}
        checkListKey={[
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
        ]}
        searchKey={[
          ["NameLanguage",],
          ["NameLanguage",],
          ["NameLanguage",],
          ["NameLanguage",],
          ["NameLanguage",],
          ["NameLanguage",],
          ["NameLanguage",],
          ["NameLanguage",],
          ["NameLanguage",],
          ["NameLanguage",],
        ]}
        gridType="smallGrid" //smallGrid, largeGrid, row
        dataGlobalName={"dataLoadedClothing"}
        appBarColor={appBarColor}
        titleColor={titleColor}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={true}
        labelColor={colors.textBlack[global.darkMode]}
        accentColor={colors.clothingAccent[global.darkMode]}
        specialLabelColor={colors.fishText[global.darkMode]}
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
        ]}
        popUpContainer={[
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
        ]}
      />
    )
  }
}

const FloorWallsRoute = () => (
  <ListPage 
    filterSearchable = {true}
    title="Floor & Walls"
    imageProperty={[
      "Image",
      "Image",
      "Image",
    ]}
    textProperty={[
      "NameLanguage",
      "NameLanguage",
      "NameLanguage",
    ]}
    checkListKey={[
      ["floorWallsCheckList","Name"],
      ["floorWallsCheckList","Name"],
      ["floorWallsCheckList","Name"],
    ]}
    searchKey={[
      ["NameLanguage",],
      ["NameLanguage",],
      ["NameLanguage",],
    ]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedFloorWalls"}
    appBarColor={colors.floorWallsAppBar[global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={true}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.floorWallsAccent[global.darkMode]}
    specialLabelColor={colors.fishText[global.darkMode]}
    popUpCornerImageProperty={[
      "Source",
      "Source",
      "Source",
    ]}
    popUpCornerImageLabelProperty={[
      "Source",
      "Source",
      "Source",
    ]}
    popUpContainer={[
      ["FloorWallsPopup",400],
      ["FloorWallsPopup",400],
      ["FloorWallsPopup",400],
    ]}
  />
)


class ItemsPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'Furniture', title: attemptToTranslate('Furniture') },
        { key: 'Clothing', title: attemptToTranslate('Clothing') },
        { key: 'FloorWalls', title: attemptToTranslate('Floor & Walls') },
        { key: 'Materials', title: attemptToTranslate('Misc. Materials') },
      ],
    }
  }

  renderScene = SceneMap({
    Furniture: FurnitureRoute,
    Clothing: ClothingRoute,
    FloorWalls: FloorWallsRoute,
    Materials: MaterialsRoute
  });

  handleIndexChange = index => this.setState({index});

  render(){
    return(
      <TabView
        lazy
        tabBarPosition={getSettingsString("settingsTabBarPosition") === "true" ? "bottom" : "top"}
        gestureHandlerProps={{ failOffsetX: this.state.index === 0 ? 1 : 100}}
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={(this.handleIndexChange)}
        initialLayout={width}
        renderTabBar={renderTabBar}
      />
    )
  }
}
export default ItemsPage;