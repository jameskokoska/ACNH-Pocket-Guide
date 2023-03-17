import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getSettingsString, attemptToTranslate} from "../LoadJsonData"
import TextFont from '../components/TextFont';


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{backgroundColor: colors.white[global.darkMode]}}
    activeColor={colors.textBlack[global.darkMode]}
    inactiveColor={colors.textBlack[global.darkMode]}
    getLabelText={({ route }) => route.title}
    renderLabel={({ route, focused, color }) => (
      <TextFont style={{ color, textAlign:"center", fontSize: 13}}>
        {route.title}
      </TextFont>
    )}
  />
);

class MaterialsRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage
        tabs={true}
        title="Materials"
        imageProperty={["Inventory Image"]}
        textProperty={["NameLanguage",]}
        searchKey={[["NameLanguage",]]}
        gridType="smallGrid" //smallGrid, largeGrid, row
        dataGlobalName={"dataLoadedMaterials"}
        appBarColor={colors.materialsAppBar[global.darkMode]}
        titleColor={colors.textWhite[0]}
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
  }
}

class FoodRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        tabs={true}
        title="Food"
        imageProperty={["Image"]}
        textProperty={["NameLanguage",]}
        searchKey={[["NameLanguage",]]}
        gridType="smallGrid" //smallGrid, largeGrid, row
        subHeader="To view recipes, go to the Recipes + Tools page"
        dataGlobalName={"dataLoadedFood"}
        appBarColor={colors.foodAppBar[global.darkMode]}
        titleColor={colors.textWhite[0]}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={true}
        labelColor={colors.textBlack[global.darkMode]}
        accentColor={colors.foodAccent[global.darkMode]}
        popUpCornerImageProperty={["Source"]}
        popUpCornerImageLabelProperty={["Source"]}
        popUpContainer={[["FoodPopup",500]]}
        specialLabelColor={colors.fishText[global.darkMode]}
      />
    )
  }
}

class FurnitureRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        tabs={true}
        filterSearchable = {true}
        title="Furniture"
        imageProperty={[
          "Image",
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
          "NameLanguage",
        ]}
        searchKey={[
          ["NameLanguage",],
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
          "Source",
        ]}
        popUpCornerImageLabelProperty={[
          "Source",
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
          ["FurniturePopup",460],
        ]}
      />
    )
  }
}

export class ClothingRouteClass extends React.PureComponent{
  render(){
    var title = this.props.title;
    var villagerGifts = false;
    var villagerGiftsFilters = [];
    var subHeader = "";
    var customHeader;
    var filterSearchable = true;
    var appBarColor = colors.clothingAppBar[global.darkMode];
    var titleColor = colors.textWhiteOnly[global.darkMode];
    var extraInfo = this.props.extraInfo===undefined?"":this.props.extraInfo;
    var tabs = this.props.tabs===undefined?true:this.props.tabs;
    if(title!==undefined){
      villagerGifts = true;
      villagerGiftsFilters = this.props.villagerGiftsFilters;
      subHeader = this.props.subHeader;
      customHeader = this.props.customHeader;
      filterSearchable = false;
      appBarColor = colors.giftsAppBar[global.darkMode];
      titleColor = colors.textBlack[global.darkMode]
    } else {
      title="Clothing";
      villagerGifts = false;
    }
    return (
      <ListPage 
        tabs={tabs}
        extraInfo={extraInfo}
        setPage={this.props.setPage}
        customHeader={customHeader}
        filterSearchable={filterSearchable}
        subHeader={subHeader}
        villagerGifts={villagerGifts}
        villagerGiftsFilters={villagerGiftsFilters}
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
          "Storage Image",
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

class FloorsWallsRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        tabs={true}
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
  }
}


class ItemsPage extends Component {
  constructor(props) {
    super();
    let selectedTab = 0
    if(props.selectedTab!==undefined && props.selectedTab!==""){
      selectedTab = props.selectedTab
    }
    this.state = {
      index: selectedTab,
      routes: [
        { key: 'Furniture', title: attemptToTranslate('Furniture') },
        { key: 'Clothing', title: attemptToTranslate('Clothing') },
        { key: 'FloorWalls', title: attemptToTranslate('Floor & Walls') },
        { key: 'Food', title: attemptToTranslate('Food') },
        { key: 'Materials', title: attemptToTranslate('Misc. Materials') },
      ],
    }
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'Furniture':
        return <FurnitureRouteClass/>;
      case 'Clothing':
        return <ClothingRouteClass/>;
      case 'Food':
        return <FoodRouteClass/>;
      case 'FloorWalls':
        return <FloorsWallsRouteClass/>;
      case 'Materials':
        return <MaterialsRouteClass/>;
      default:
        return <View/>;
    }
  };

  handleIndexChange = index => this.setState({index});

  render(){
    return(
      <TabView
        animationEnabled={global.reducedMotion!=true}
        lazy
        // tabBarPosition={getSettingsString("settingsTabBarPosition") === "true" ? "bottom" : "top"}
        gestureHandlerProps={{ failOffsetX: this.state.index === 0 ? 1 : 100}}
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={(this.handleIndexChange)}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={renderTabBar}
      />
    )
  }
}
export default ItemsPage;