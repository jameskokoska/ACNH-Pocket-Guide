import React, {Component} from 'react';
import {Dimensions,} from 'react-native';
import {View, TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {attemptToTranslate} from "../LoadJsonData"
import TextFont from '../components/TextFont';

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
      <TextFont style={{ color, textAlign:"center", fontSize: 13}}>
        {route.title}
      </TextFont>
    )}
  />
);

class FishRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        // filterSearchable = {true}
        title="Fish"
        showHemisphereSwitcherOption={true}
        // leaveWarning = {getSettingsString("settingsCreaturesLeavingWarning")==="true" ? true : false}
        leaveWarning = {true}
        imageProperty={["Icon Image"]}
        textProperty={["NameLanguage",]}
        textProperty2={["creatureTime"]}
        textProperty3={["Where/How"]}
        searchKey={[["NameLanguage",]]}
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
        extraInfo={
          [
            attemptToTranslate("Fish"),
            attemptToTranslate("The time is displayed in red if the creature cannot be caught in the current month."),
            attemptToTranslate("The background is red if this is the last month you are able to catch this creature before you need to wait again."),
          ]
        }
      />
    )
  }
}

class BugsRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        title="Bugs"
        showHemisphereSwitcherOption={true}
        // leaveWarning = {getSettingsString("settingsCreaturesLeavingWarning")==="true" ? true : false}
        leaveWarning = {true}
        imageProperty={["Icon Image"]}
        textProperty={["NameLanguage",]}
        textProperty2={["creatureTime"]}
        textProperty3={["Where/How"]}
        searchKey={[["NameLanguage",]]}
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
        extraInfo={
          [
            attemptToTranslate("Bugs"),
            attemptToTranslate("The time is displayed in red if the creature cannot be caught in the current month."),
            attemptToTranslate("The background is red if this is the last month you are able to catch this creature before you need to wait again."),
          ]
        }
      />
    )
  }
}

class SeaRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        title="Sea Creatures"
        showHemisphereSwitcherOption={true}
        // leaveWarning = {getSettingsString("settingsCreaturesLeavingWarning")==="true" ? true : false}
        leaveWarning = {true}
        imageProperty={["Icon Image"]}
        textProperty={["NameLanguage",]}
        textProperty2={["creatureTime"]}
        textProperty3={["Shadow"]}
        searchKey={[["NameLanguage",]]}
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
        popUpCornerImageProperty={["Where/How"]}
        popUpCornerImageLabelProperty={["Where/How"]}
        popUpPhraseProperty={["Catch phrase"]}
        popUpContainer={[["SeaPopup",550]]}
        extraInfo={
          [
            attemptToTranslate("Sea Creatures"),
            attemptToTranslate("The time is displayed in red if the creature cannot be caught in the current month."),
            attemptToTranslate("The background is red if this is the last month you are able to catch this creature before you need to wait again."),
          ]
        }
      />
    )
  }
}

class FossilsRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        title="Fossils"
        imageProperty={["Image"]}
        textProperty={["NameLanguage",]}
        searchKey={[["NameLanguage",]]}
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
  }
}

class ArtRouteClass extends React.PureComponent {
  render(){
    return(
      <ListPage 
        title="Art"
        imageProperty={["Image"]}
        textProperty={["NameLanguage",]}
        textProperty2={[""]}
        textProperty3={[""]}
        searchKey={[["NameLanguage",]]}
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
  }
}


class MuseumPage extends Component {
  constructor(props) {
    super();
    let selectedTab = 0
    if(props.selectedTab!==undefined && props.selectedTab!==""){
      selectedTab = props.selectedTab
    }
    this.state = {
      index: selectedTab,
      routes: [
        { key: 'Fish', title: attemptToTranslate('Fish') },
        { key: 'Bugs', title: attemptToTranslate('Bugs') },
        { key: 'Sea', title: attemptToTranslate('Sea') },
        { key: 'Fossils', title: attemptToTranslate('Fossils') },
        { key: 'Art', title: attemptToTranslate('Art') },
      ],
    }
  }

  // renderScene = SceneMap({
  //   Fish: FishRoute,
  //   Bugs: BugsRoute,
  //   Sea: SeaRoute,
  //   Fossils: FossilsRoute,
  //   Art: ArtRoute,
  // });

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'Fish':
        return <FishRouteClass/>;
      case 'Bugs':
        return <BugsRouteClass/>;
      case 'Sea':
        return <SeaRouteClass/>;
      case 'Fossils':
        return <FossilsRouteClass/>;
      case 'Art':
        return <ArtRouteClass/>;
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
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={renderTabBar}
      />
    )
  }
}
export default MuseumPage;