import React, {Component} from 'react';
import {ScrollView, Dimensions, Text} from 'react-native';
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

const RecipesRoute = () => (
  <ListPage 
    showVariations={[false]}
    title="Recipes"
    imageProperty={["Image"]}
    textProperty={["Name"]}
    checkListKey={[["recipesCheckList","Name","Variation"]]}
    searchKey={[["Name"]]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedRecipes"}
    appBarColor={colors.toolsAppBar[colors.mode]}
    titleColor={colors.textWhiteOnly[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.toolsAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
    popUpCornerImageProperty={["Source"]}
    popUpCornerImageLabelProperty={["Source"]}
    popUpContainer={[["RecipesPopup",550]]}
  />
)

const ToolsRoute = () => (
  <ListPage 
    showVariations={[false]}
    title="Tools"
    imageProperty={["Image"]}
    textProperty={["Name"]}
    checkListKey={[["toolsCheckList","Name","Variation"]]}
    searchKey={[["Name"]]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedTools"}
    appBarColor={colors.toolsAppBar[colors.mode]}
    titleColor={colors.textWhiteOnly[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.toolsAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
    popUpCornerImageProperty={["Source"]}
    popUpCornerImageLabelProperty={["Source"]}
    popUpContainer={[["ToolsPopup",300]]}
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
export default CraftingPage;