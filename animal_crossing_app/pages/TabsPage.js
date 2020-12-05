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

const FirstRoute = () => (
  <ListPage 
    showVariations={false}
    title="Reactions"
    imageProperty={["Image"]}
    textProperty={["Name"]}
    textProperty2={["Icon Filename"]}
    textProperty3={["Source"]}
    checkListKey={[["emojiCheckList","Name"]]}
    searchKey={[["Name"]]}
    gridType="row" //smallGrid, largeGrid, row
    dataGlobalName={"dataLoadedReactions"}
    appBarColor={colors.bugAppBar[colors.mode]}
    appBarImage={require("../assets/icons/bugTitleDark.png")}
    titleColor={colors.textBlack[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.fishAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
  />
)

const SecondRoute = () => (
  <ListPage 
    showVariations={false}
    title="Art"
    imageProperty={["Image","Image","Image"]}
    textProperty={["Name","Name","Name"]}
    checkListKey={[["artCheckList","Name","Genuine"],["fenceCheckList","Name"],["fenceCheckList","Name"]]}
    searchKey={[["Name","Genuine"],["Name"],["Name"]]}
    gridType="smallGrid"
    dataGlobalName={"dataLoadedArt"}
    appBarColor={colors.bugAppBar[colors.mode]}
    appBarImage={require("../assets/icons/bugTitleDark.png")}
    titleColor={colors.textBlack[colors.mode]}
    searchBarColor={colors.searchbarBG[colors.mode]}
    backgroundColor={colors.lightDarkAccent[colors.mode]}
    boxColor={colors.white[colors.mode]}
    labelColor={colors.textBlack[colors.mode]}
    accentColor={colors.fishAccent[colors.mode]}
    specialLabelColor={colors.fishText[colors.mode]}
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
        tabBarPosition={"top"}
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
export default TabsPage;