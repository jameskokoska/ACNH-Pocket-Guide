import React, {Component} from 'react';
import {ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getMonthShort} from "../components/DateFunctions"
import {getSettingsString, attemptToTranslate} from "../LoadJsonData"

const width = { width: Dimensions.get('window').width };

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{ backgroundColor: colors.white[global.darkMode]}}
    activeColor={colors.textBlack[global.darkMode]}
    inactiveColor={colors.textBlack[global.darkMode]}
    getLabelText={({ route }) => route.title}
    labelStyle={{padding:0, margin:0}}
    renderLabel={({ route, focused, color }) => (
      <Text style={{ color, margin: 2, textAlign:"center" }}>
        {route.title}
      </Text>
    )}
  />
);

const FishRoute = () => (
  <ListPage 
    filters = {["Where/How","Shadow"]}
    // filterSearchable = {true}
    showVariations={[false]}
    title="Fish"
    activeCreaturesMonth={true}
    leaveWarning = {getSettingsString("settingsCreaturesLeavingWarning")==="true" ? true : false}
    imageProperty={["Icon Image"]}
    textProperty={["Name",]}
    textProperty2={["creatureTime"]}
    textProperty3={["Where/How"]}
    checkListKey={[["fishCheckList","Name"]]}
    searchKey={[["Name",]]}
    gridType="row" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedFish"}
    appBarColor={colors.fishAppBar[global.darkMode]}
    appBarImage={[require("../assets/icons/fishTitle.png"),require("../assets/icons/fishTitleDark.png")][global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={false}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.fishAccent[global.darkMode]}
    specialLabelColor={colors.fishText[global.darkMode]}
    popUpCornerImageProperty={["Where/How"]}
    popUpCornerImageLabelProperty={["Where/How"]}
    popUpPhraseProperty={["Catch phrase"]}
    popUpContainer={[["FishPopup",550]]} //name of the popup class and height
  />
)

const BugsRoute = () => (
  <ListPage 
    filters = {["Weather","Where/How"]}
    showVariations={[false]}
    title="Bugs"
    activeCreaturesMonth={true}
    leaveWarning = {getSettingsString("settingsCreaturesLeavingWarning")==="true" ? true : false}
    imageProperty={["Icon Image"]}
    textProperty={["Name",]}
    textProperty2={["creatureTime"]}
    textProperty3={["Where/How"]}
    checkListKey={[["bugCheckList","Name"]]}
    searchKey={[["Name",]]}
    gridType="row" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedBugs"}
    appBarColor={colors.bugAppBar[global.darkMode]}
    appBarImage={[require("../assets/icons/bugTitle.png"),require("../assets/icons/bugTitleDark.png")][global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={false}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.bugAccent[global.darkMode]}
    specialLabelColor={colors.bugText[global.darkMode]}
    popUpCornerImageProperty={["Where/How"]}
    popUpCornerImageLabelProperty={["Where/How"]}
    popUpPhraseProperty={["Catch phrase"]}
    popUpContainer={[["BugPopup",520]]}
  />
)

const SeaRoute = () => (
  <ListPage 
    filters = {["Shadow","Movement Speed"]}
    showVariations={[false]}
    title="Sea Creatures"
    activeCreaturesMonth={true}
    leaveWarning = {getSettingsString("settingsCreaturesLeavingWarning")==="true" ? true : false}
    imageProperty={["Icon Image"]}
    textProperty={["Name",]}
    textProperty2={["creatureTime"]}
    textProperty3={["Shadow"]}
    checkListKey={[["seaCheckList","Name"]]}
    searchKey={[["Name",]]}
    gridType="row" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedSea"}
    appBarColor={colors.fishAppBar[global.darkMode]}
    appBarImage={[require("../assets/icons/fishTitle.png"),require("../assets/icons/fishTitleDark.png")][global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={false}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.fishAccent[global.darkMode]}
    specialLabelColor={colors.fishText[global.darkMode]}
    popUpPhraseProperty={["Catch phrase"]}
    popUpContainer={[["SeaPopup",550]]}
  />
)

const FossilsRoute = () => (
  <ListPage 
    showVariations={[false]}
    title="Fossils"
    imageProperty={["Image"]}
    textProperty={["Name",]}
    checkListKey={[["fossilCheckList","Name"]]}
    searchKey={[["Name",]]}
    gridType="smallGrid" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedFossils"}
    appBarColor={colors.fossilAppBar[global.darkMode]}
    appBarImage={[require("../assets/icons/fossilTitle.png"),require("../assets/icons/fossilTitleDark.png")][global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={false}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.fossilAccent[global.darkMode]}
    specialLabelColor={colors.fishText[global.darkMode]}
    popUpCornerImageProperty={["Source"]}
    popUpCornerImageLabelProperty={["Source"]}
    popUpContainer={[["FossilPopup",250]]}
  />
)

const ArtRoute = () => (
  <ListPage 
    showVariations={[false]}
    title="Art"
    imageProperty={["Image"]}
    textProperty={["Name",]}
    textProperty2={[""]}
    textProperty3={[""]}
    checkListKey={[["artCheckList","Name","Genuine"]]}
    searchKey={[["Name",]]}
    gridType="largeGridSmaller" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedArt"}
    appBarColor={colors.artAppBar[global.darkMode]}
    titleColor={colors.textWhiteOnly[global.darkMode]}
    searchBarColor={colors.searchbarBG[global.darkMode]}
    backgroundColor={colors.lightDarkAccent[global.darkMode]}
    boxColor={false}
    labelColor={colors.textBlack[global.darkMode]}
    accentColor={colors.artAccent[global.darkMode]}
    specialLabelColor={colors.fishText[global.darkMode]}
    popUpCornerImageProperty={["Source"]}
    popUpCornerImageLabelProperty={["Source"]}
    popUpPhraseProperty={["Artist"]}
    popUpContainer={[["ArtPopup",1000]]}
  />
)


class MuseumPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'Fish', title: attemptToTranslate('Fish') },
        { key: 'Bugs', title: attemptToTranslate('Bugs') },
        { key: 'Sea', title: attemptToTranslate('Sea') },
        { key: 'Fossils', title: attemptToTranslate('Fossils') },
        { key: 'Art', title: attemptToTranslate('Art') },
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
export default MuseumPage;