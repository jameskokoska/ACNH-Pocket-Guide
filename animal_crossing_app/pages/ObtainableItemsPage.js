import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getCurrentVillagerNamesString, getSettingsString, attemptToTranslate} from "../LoadJsonData"
import {ClothingRouteClass} from "./ItemsPage"
import {InfoLineBeside, InfoLine} from '../components/BottomSheetComponents';
import AllItemsPage from "./AllItemsPage"

const width = { width: Dimensions.get('window').width };

const renderTabBar = props => (
  <TabBar
    scrollEnabled
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

const ObtainableDIYs = () => (
  <AllItemsPage
    tabs={true}
    smallerHeader={true}
    filterSearchable={false}
    title={"Obtainable DIYs"}
    subHeader={"You WILL get these from your favorite villagers." + " (" + getCurrentVillagerNamesString() + ")"}
    appBarColor = {colors.obtainableItemsAppBar[global.darkMode]}
    accentColor = {colors.obtainableItemsAccent[global.darkMode]}
  />
)

const UnobtainableDIYs = () => (
  <AllItemsPage
    tabs={true}
    smallerHeader={true}
    filterSearchable={false}
    title={"Unobtainable DIYs"}
    subHeader={"You will NOT get these from your favorite villagers." + "\n(" + getCurrentVillagerNamesString() + ")"}
    appBarColor = {colors.obtainableItemsAppBar[global.darkMode]}
    accentColor = {colors.obtainableItemsAccent[global.darkMode]}
  />
)

const ObtainableReactions = () => (
  <AllItemsPage
    tabs={true}
    smallerHeader={true}
    filterSearchable={false}
    title={"Obtainable Reactions"}
    subHeader={"You WILL get these from your favorite villagers." + "\n(" + getCurrentVillagerNamesString() + ")"}
    appBarColor = {colors.obtainableItemsAppBar[global.darkMode]}
    accentColor = {colors.obtainableItemsAccent[global.darkMode]}
  />
)

const UnobtainableReactions = () => (
  <AllItemsPage
    tabs={true}
    smallerHeader={true}
    filterSearchable={false}
    title={"Unobtainable Reactions"}
    subHeader={"You will NOT get these from your favorite villagers." + "\n(" + getCurrentVillagerNamesString() + ")"}
    appBarColor = {colors.obtainableItemsAppBar[global.darkMode]}
    accentColor = {colors.obtainableItemsAccent[global.darkMode]}
  />
)


class ObtainableItemsPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'UnobtainableDIYs', title: attemptToTranslate('Unobtainable DIYs') },
        { key: 'ObtainableDIYs', title: attemptToTranslate('Obtainable DIYs') },
        { key: 'UnobtainableReactions', title: attemptToTranslate('Unobtainable Reactions') },
        { key: 'ObtainableReactions', title: attemptToTranslate('Obtainable Reactions') },
      ],
    }
  }

  renderScene = SceneMap({
    UnobtainableDIYs: UnobtainableDIYs,
    ObtainableDIYs: ObtainableDIYs,
    UnobtainableReactions: UnobtainableReactions,
    ObtainableReactions: ObtainableReactions
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
export default ObtainableItemsPage;