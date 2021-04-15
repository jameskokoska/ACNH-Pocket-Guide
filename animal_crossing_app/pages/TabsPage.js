import React, {Component} from 'react';
import {ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getSettingsString} from "../LoadJsonData"


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{ backgroundColor: colors.white[global.darkMode]}}
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

const FirstRoute = () => (
  <ListPage 
    title="Reactions"
    imageProperty={["Image"]}
    textProperty={["Name"]}
    textProperty2={["Icon Filename"]}
    textProperty3={["Source"]}
    searchKey={[["Name"]]}
    gridType="row" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedReactions"}
    appBarColor={colors.bugAppBar[global.darkMode]}
    appBarImage={require("../assets/icons/bugTitleDark.png")}
    titleColor={colors.textBlack[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={false}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.fishAccent[global.darkMode]}
    specialLabelColor={colors.fishText[global.darkMode]}
    popUpCornerImageProperty={["Image"]}
    popUpCornerImageLabelProperty={["Name"]}
    popUpPhraseProperty={["Name"]}
  />
)

const SecondRoute = () => (
  <ListPage 
    title="Art"
    imageProperty={["Image","Image","Image"]}
    textProperty={["Name","Name","Name"]}
    searchKey={[["Name","Genuine"],["Name"],["Name"]]}
    gridType="smallGrid"
    dataGlobalName={"dataLoadedArt"}
    appBarColor={colors.bugAppBar[global.darkMode]}
    appBarImage={require("../assets/icons/bugTitleDark.png")}
    titleColor={colors.textBlack[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={true}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.fishAccent[global.darkMode]}
    specialLabelColor={colors.fishText[global.darkMode]}
  />
)

class TabsPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Reactions' },
        { key: 'second', title: 'Art' },
      ],
    }
  }

  renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
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
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={renderTabBar}
      />
    )
  }
}
export default TabsPage;