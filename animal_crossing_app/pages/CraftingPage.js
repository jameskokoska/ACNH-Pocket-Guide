import React, {Component} from 'react';
import {ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getSettingsString} from "../LoadJsonData";

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

const RecipesRoute = () => (
  <ListPage 
    filters={["Category", "Source","Season/Event","Season/Event Exclusive",]}
    filterSearchable = {true}
    showVariations={[false]}
    title="Recipes"
    imageProperty={["Image"]}
    textProperty={[global.language]}
    checkListKey={[["recipesCheckList","Name","Variation"]]}
    searchKey={[[global.language]]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedRecipes"}
    appBarColor={colors.toolsAppBar[global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={false}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.toolsAccent[global.darkMode]}
    specialLabelColor={colors.fishText[global.darkMode]}
    popUpCornerImageProperty={["Source"]}
    popUpCornerImageLabelProperty={["Source"]}
    popUpContainer={[["RecipesPopup",500]]}
  />
)

const ToolsRoute = () => (
  <ListPage 
    showVariations={[false]}
    title="Tools"
    imageProperty={["Image"]}
    textProperty={[global.language]}
    checkListKey={[["toolsCheckList","Name","Variation"]]}
    searchKey={[[global.language]]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedTools"}
    appBarColor={colors.toolsAppBar[global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={false}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.toolsAccent[global.darkMode]}
    specialLabelColor={colors.fishText[global.darkMode]}
    popUpCornerImageProperty={["Source"]}
    popUpCornerImageLabelProperty={["Source"]}
    popUpContainer={[["ToolsPopup",250]]}
    popUpPhraseProperty={["Uses"]}
  />
)


class CraftingPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'Recipes', title: 'Recipes' },
        { key: 'Tools', title: 'Tools' },
      ],
    }
  }

  renderScene = SceneMap({
    Recipes: RecipesRoute,
    Tools: ToolsRoute,
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
export default CraftingPage;