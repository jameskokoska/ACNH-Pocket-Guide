import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getSettingsString} from "../LoadJsonData"

const width = { width: Dimensions.get('window').width };


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{ backgroundColor: colors.white[global.darkMode]}}
    activeColor={colors.textBlack[global.darkMode]}
    inactiveColor={colors.textBlack[global.darkMode]}
    getLabelText={({ route }) => route.title}
  />
);

const FurnitureRoute = () => (
  <ListPage 
    filters = {["Tag", "Catalog", "Color 1","Color 2","Variation","Source", "DIY", "Size", "Season/Event", "Season/Event Exclusive", "HHA Concept 1", "HHA Concept 2", "HHA Series", "HHA Set", "HHA Category",]}
    filterSearchable = {true}
    showVariations={[
      getSettingsString("settingsShowVariation")==="true" ? true : false,
      getSettingsString("settingsShowVariation")==="true" ? true : false,
      getSettingsString("settingsShowVariation")==="true" ? true : false,
      getSettingsString("settingsShowVariation")==="true" ? true : false,
      getSettingsString("settingsShowVariation")==="true" ? true : false,
    ]}
    title="Furniture"
    imageProperty={[
      "Image",
      "Image",
      "Image",
      "Image",
      "Image",
    ]}
    textProperty={[
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
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
      ["Name",],
      ["Name",],
      ["Name",],
      ["Name",],
      ["Name",],
    ]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedFurniture"}
    appBarColor={colors.furnitureAppBar[global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={colors.white[global.darkMode]}
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
  <ListPage 
    filters={["Catalog", "Style 1","Style 2","Variation","Seasonality","Source", "DIY", "Size", "Season/Event", "Season/Event Exclusive", ]}
    filterSearchable = {true}
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
    ]}
    title="Clothing"
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
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
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
      ["Name",],
      ["Name",],
      ["Name",],
      ["Name",],
      ["Name",],
      ["Name",],
      ["Name",],
      ["Name",],
      ["Name",],
      ["Name",],
    ]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedClothing"}
    appBarColor={colors.clothingAppBar[global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={colors.white[global.darkMode]}
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

const FloorWallsRoute = () => (
  <ListPage 
    filters = {["Tag","Color 1","Color 2","Source","DIY","Size","Season/Event", "Season/Event Exclusive", "HHA Concept 1", "HHA Concept 2", "HHA Series",]}
    filterSearchable = {true}
    showVariations={[
      getSettingsString("settingsShowVariation")==="true" ? true : false,
      getSettingsString("settingsShowVariation")==="true" ? true : false,
      getSettingsString("settingsShowVariation")==="true" ? true : false,
    ]}
    title="Floor & Walls"
    imageProperty={[
      "Image",
      "Image",
      "Image",
    ]}
    textProperty={[
      "Name",
      "Name",
      "Name",
    ]}
    checkListKey={[
      ["floorWallsCheckList","Name"],
      ["floorWallsCheckList","Name"],
      ["floorWallsCheckList","Name"],
    ]}
    searchKey={[
      ["Name"],
      ["Name"],
      ["Name"],
    ]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedFloorWalls"}
    appBarColor={colors.floorWallsAppBar[global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={colors.white[global.darkMode]}
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
        { key: 'Furniture', title: 'Furniture' },
        { key: 'Clothing', title: 'Clothing' },
        { key: 'FloorWalls', title: 'Floor & Walls' },
      ],
    }
  }

  renderScene = SceneMap({
    Furniture: FurnitureRoute,
    Clothing: ClothingRoute,
    FloorWalls: FloorWallsRoute,
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