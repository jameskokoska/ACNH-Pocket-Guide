import React, {Component} from 'react';
import {ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getSettingsString,attemptToTranslate} from "../LoadJsonData";
import TextFont from "../components/TextFont"

const width = { width: Dimensions.get('window').width };


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{ backgroundColor: colors.white[global.darkMode]}}
    activeColor={colors.textBlack[global.darkMode]}
    inactiveColor={colors.textBlack[global.darkMode]}
    getLabelText={({ route }) => route.title}
    renderLabel={({ route, focused, color }) => (
      <TextFont style={{ color, textAlign:"center", fontSize: 14}}>
        {route.title}
      </TextFont>
    )}
  />
);


export class RecipesRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        title={this.props.title===undefined?"Recipes":this.props.title}
        extraInfo={this.props.extraInfo===undefined?"":this.props.extraInfo}
        appBarColor={this.props.appBarColor===undefined?colors.toolsAppBar[global.darkMode]:this.props.appBarColor}
        accentColor={this.props.accentColor===undefined?colors.toolsAccent[global.darkMode]:this.props.accentColor}
        subHeader={this.props.subHeader===undefined?"":this.props.subHeader}
        tabs={this.props.tabs===undefined?true:this.props.tabs}
        smallerHeader={this.props.smallerHeader===undefined?false:this.props.smallerHeader}
        filterSearchable={this.props.filterSearchable===undefined?true:this.props.filterSearchable}
        titleColor={this.props.titleColor===undefined?colors.textWhite[0]:this.props.titleColor}
        imageProperty={["Image"]}
        textProperty={["NameLanguage"]}
        searchKey={[["NameLanguage"]]}
        gridType="smallGrid" //smallGrid, largeGrid, row
        dataGlobalName={"dataLoadedRecipes"}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={false}
        labelColor={colors.textBlack[global.darkMode]}
        specialLabelColor={colors.fishText[global.darkMode]}
        popUpCornerImageProperty={["Source"]}
        popUpCornerImageLabelProperty={["Source"]}
        popUpContainer={[["RecipesPopup",500]]}
      />
    )
  }
} 

class ToolsRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        title="Tools"
        imageProperty={["Image"]}
        textProperty={["NameLanguage"]}
        searchKey={[["NameLanguage"]]}
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
  }
}


class CraftingPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'Recipes', title: attemptToTranslate('Recipes') },
        { key: 'Tools', title: attemptToTranslate('Tools') },
      ],
    }
  }

  // renderScene = SceneMap({
  //   Recipes: RecipesRoute,
  //   Tools: ToolsRoute,
  // });

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'Recipes':
        return <RecipesRouteClass/>;
      case 'Tools':
        return <ToolsRouteClass/>;
      default:
        return <View/>;
    }
  };

  handleIndexChange = index => this.setState({index});


  render(){
    return(
      <TabView
        lazy
        // tabBarPosition={getSettingsString("settingsTabBarPosition") === "true" ? "bottom" : "top"}
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