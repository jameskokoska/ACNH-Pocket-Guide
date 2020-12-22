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

const FishRoute = () => (
  <ListPage 
    showVariations={[false]}
    title="Fish"
    imageProperty={["Icon Image"]}
    textProperty={["Name"]}
    textProperty2={["NH Jan"]}
    textProperty3={["Where/How"]}
    checkListKey={[["fishCheckList","Name"]]}
    searchKey={[["Name","Where/How"]]}
    gridType="row" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedFish"}
    appBarColor={colors.fishAppBar[colors.mode]}
    appBarImage={[require("../assets/icons/fishTitle.png"),require("../assets/icons/fishTitleDark.png")][colors.mode]}
    titleColor={colors.textWhiteOnly[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.fishAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
    popUpCornerImageProperty={["Icon Image"]}
    popUpCornerImageLabelProperty={["Where/How"]}
    popUpPhraseProperty={["Catch phrase"]}
  />
)

const BugsRoute = () => (
  <ListPage 
    showVariations={[false]}
    title="Bugs"
    imageProperty={["Icon Image"]}
    textProperty={["Name"]}
    textProperty2={["NH Jan"]}
    textProperty3={["Where/How"]}
    checkListKey={[["bugCheckList","Name"]]}
    searchKey={[["Name","Where/How"]]}
    gridType="row" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedBugs"}
    appBarColor={colors.bugAppBar[colors.mode]}
    appBarImage={[require("../assets/icons/bugTitle.png"),require("../assets/icons/bugTitleDark.png")][colors.mode]}
    titleColor={colors.textWhiteOnly[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.bugAccent[colors.mode]}
    specialLabelColor={colors.bugText[colors.mode]}
    popUpCornerImageProperty={["Icon Image"]}
    popUpCornerImageLabelProperty={["Where/How"]}
    popUpPhraseProperty={["Catch phrase"]}
  />
)

const SeaRoute = () => (
  <ListPage 
    showVariations={[false]}
    title="Sea Creatures"
    imageProperty={["Icon Image"]}
    textProperty={["Name"]}
    textProperty2={["NH Jan"]}
    textProperty3={["Shadow"]}
    checkListKey={[["seaCheckList","Name"]]}
    searchKey={[["Name","Where/How"]]}
    gridType="row" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedSea"}
    appBarColor={colors.fishAppBar[colors.mode]}
    appBarImage={[require("../assets/icons/fishTitle.png"),require("../assets/icons/fishTitleDark.png")][colors.mode]}
    titleColor={colors.textWhiteOnly[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.fishAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
    popUpCornerImageProperty={["Icon Image"]}
    popUpCornerImageLabelProperty={["Where/How"]}
    popUpPhraseProperty={["Catch phrase"]}
  />
)

const FossilsRoute = () => (
  <ListPage 
    showVariations={[false]}
    title="Fossils"
    imageProperty={["Image"]}
    textProperty={["Name"]}
    checkListKey={[["fossilCheckList","Name"]]}
    searchKey={[["Name"]]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedFossils"}
    appBarColor={colors.fossilAppBar[colors.mode]}
    appBarImage={[require("../assets/icons/fossilTitle.png"),require("../assets/icons/fossilTitleDark.png")][colors.mode]}
    titleColor={colors.textWhiteOnly[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.fossilAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
    popUpCornerImageProperty={["Icon Image"]}
    popUpCornerImageLabelProperty={["Name"]}
    popUpPhraseProperty={["Name"]}
  />
)

const ArtRoute = () => (
  <ListPage 
    showVariations={[false]}
    title="Art"
    imageProperty={["Image"]}
    textProperty={["Name"]}
    textProperty2={[""]}
    textProperty3={[""]}
    checkListKey={[["artCheckList","Name"]]}
    searchKey={[["Name"]]}
    gridType="largeGridSmaller" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedArt"}
    appBarColor={colors.artAppBar[colors.mode]}
    titleColor={colors.textWhiteOnly[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.fishAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
    popUpCornerImageProperty={["Icon Image"]}
    popUpCornerImageLabelProperty={["Name"]}
    popUpPhraseProperty={["Artist"]}
  />
)


class MuseumPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'Fish', title: 'Fish' },
        { key: 'Bugs', title: 'Bugs' },
        { key: 'Sea', title: 'Sea' },
        { key: 'Fossils', title: 'Fossils' },
        { key: 'Art', title: 'Art' },
      ],
    }
  }

  renderScene = SceneMap({
    Fish: FishRoute,
    Bugs: BugsRoute,
    Sea: SeaRoute,
    Fossils: FossilsRoute,
    Art: ArtRoute,
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
export default MuseumPage;