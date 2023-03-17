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


export class ConstructionRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        disablePopup={[true, true, true]}
        title="Construction"
        imageProperty={["Image","Image","Image"]}
        textProperty={["NameLanguage","NameLanguage","NameLanguage"]}
        textProperty2={"construction"}
        searchKey={[["NameLanguage"],["NameLanguage"],["NameLanguage"]]}
        gridType="largeGridSmaller" //smallGrid, largeGrid, row
        dataGlobalName={"dataLoadedConstruction"}
        appBarColor={colors.constructionAppBar[global.darkMode]}
        titleColor={colors.textBlack[global.darkMode]}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={false}
        labelColor={colors.textBlack[global.darkMode]}
      />
    )
  }
} 

class ToolsRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        tabs={true}
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


class ConstructionPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'Construction', title: attemptToTranslate('Construction') },
        { key: 'Tools', title: attemptToTranslate('Tools') },
      ],
    }
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'Construction':
        return <ConstructionRouteClass/>;
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
        animationEnabled={global.reducedMotion!=true}
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
export default ConstructionPage;