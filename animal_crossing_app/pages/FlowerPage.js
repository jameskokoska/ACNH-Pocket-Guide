import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import FlowerContainer from '../components/FlowerContainer'
import TextFont from '../components/TextFont'
import {capitalize} from "../LoadJsonData"

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{ backgroundColor: colors.white[global.darkMode]}}
    activeColor={colors.textBlack[global.darkMode]}
    inactiveColor={colors.textBlack[global.darkMode]}
    getLabelText={({ route }) => route.title}
    scrollEnabled
    tabStyle={{width:120}}
  />
);

class SpecificFlowerPage extends Component {
  render(){
    var data = require("../assets/data/flowers.json");
    
    return(<ScrollView>
      <View style={{marginTop: 100}}/>
      <TextFont bold={true} style={{fontSize: 36, marginLeft: 30, color:colors.textBlack[global.darkMode]}}>{"Hybrid " + capitalize(this.props.flowerGroup) }</TextFont>
      <View style={{marginTop: 10}}/>
      {
        data[this.props.flowerGroup].map(flower=> (
          <FlowerContainer flowerInfo={flower} key={flower.parent1+flower.paren2+flower.child+flower.percentage+flower.parent1Special}/>
        ))
      }
      <View style={{marginTop: 100}}/>
      </ScrollView>
    )
  }
}

const RosesRoute = () => (
  <SpecificFlowerPage flowerGroup={"roses"}/>
)

const PansiesRoute = () => (
  <SpecificFlowerPage flowerGroup={"pansies"}/>
)

const WindflowersRoute = () => (
  <SpecificFlowerPage flowerGroup={"windflowers"}/>
)

const HyacinthsRoute = () => (
  <SpecificFlowerPage flowerGroup={"hyacinths"}/>
)

const LiliesRoute = () => (
  <SpecificFlowerPage flowerGroup={"lilies"}/>
)

const CosmosRoute = () => (
  <SpecificFlowerPage flowerGroup={"cosmos"}/>
)

const MumsRoute = () => (
  <SpecificFlowerPage flowerGroup={"mums"}/>
)
const TulipsRoute = () => (
  <SpecificFlowerPage flowerGroup={"tulips"}/>
)

class FlowerPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'Roses', title: 'Roses' },
        { key: 'Pansies', title: 'Pansies' },
        { key: 'Windflowers', title: 'Windflowers' },
        { key: 'Hyacinths', title: 'Hyacinths' },
        { key: 'Lilies', title: 'Lilies' },
        { key: 'Cosmos', title: 'Cosmos' },
        { key: 'Mums', title: 'Mums' },
        { key: 'Tulips', title: 'Tulips' },
      ],
    }
  }

  renderScene = SceneMap({
    Roses: RosesRoute,
    Pansies: PansiesRoute,
    Hyacinths: HyacinthsRoute,
    Windflowers: WindflowersRoute,
    Lilies: LiliesRoute,
    Cosmos: CosmosRoute,
    Mums: MumsRoute,
    Tulips: TulipsRoute,
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
        initialLayout={Dimensions.get('window').width}
        renderTabBar={renderTabBar}
      />
    )
  }
}
export default FlowerPage;