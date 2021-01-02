import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';

const width = { width: Dimensions.get('window').width };


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.lightDarkAccentHeavy[colors.mode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{ backgroundColor: colors.white[colors.mode]}}
    activeColor={colors.textBlack[colors.mode]}
    inactiveColor={colors.textBlack[colors.mode]}
    getLabelText={({ route }) => route.title}
  />
);

const FurnitureRoute = () => (
  <ListPage 
    showVariations={[
      global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
      global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
      global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
      global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
      global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
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
      ["Name"],
      ["Name"],
      ["Name"],
      ["Name"],
      ["Name"],
    ]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedFurniture"}
    appBarColor={colors.furnitureAppBar[colors.mode]}
    titleColor={colors.textWhiteOnly[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.furnitureAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
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
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedClothing"}
    appBarColor={colors.clothingAppBar[colors.mode]}
    titleColor={colors.textWhiteOnly[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.clothingAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
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
    showVariations={[
      global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
      global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
      global.settingsCurrent[3]["currentValue"]==="true" ? true : false,
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
    appBarColor={colors.floorWallsAppBar[colors.mode]}
    titleColor={colors.textWhiteOnly[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.floorWallsAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
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
        tabBarPosition={global.settingsCurrent[6]["currentValue"] === "true" ? "bottom" : "top"}
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