import React, {Component} from 'react';
import {Image, TouchableOpacity, View, ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import FlowerContainer from '../components/FlowerContainer'
import TextFont from '../components/TextFont'
import {capitalize, getFlowerChecklistKey, inChecklist} from "../LoadJsonData"
import {getSettingsString, attemptToTranslate} from "../LoadJsonData";
import {SubHeader, Paragraph} from "../components/Formattings"
import GuideRedirectButton from "../components/PopupGuideRedirectButton"

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{ backgroundColor: colors.white[global.darkMode]}}
    activeColor={colors.textBlack[global.darkMode]}
    inactiveColor={colors.textBlack[global.darkMode]}
    getLabelText={({ route }) => route.title}
    scrollEnabled
    tabStyle={{width:110}}
    renderLabel={({ route, focused, color }) => (
      <TextFont style={{ color, textAlign:"center", fontSize: 13}}>
        {route.title}
      </TextFont>
    )}
  />
);

class SpecificFlowerPage extends Component {

  constructor(props) {
    super(props);
    this.state={currentCheckedFlowers:[]}
    
  }

  componentDidMount(){
    this.setCurrentlyCheckedFlowers()
  }

  setCurrentlyCheckedFlowers = () => {
    let currentCheck = []
    for(let i = 0; i < this.props.loadedData[this.props.flowerGroup].length; i++){
      if(inChecklist(this.props.loadedData[this.props.flowerGroup][i].parent1CheckListKey)){
        currentCheck.push(this.props.loadedData[this.props.flowerGroup][i].parent1CheckListKey)
      }
      if(inChecklist(this.props.loadedData[this.props.flowerGroup][i].parent2CheckListKey)){
        currentCheck.push(this.props.loadedData[this.props.flowerGroup][i].parent2CheckListKey)
      }
      if(inChecklist(this.props.loadedData[this.props.flowerGroup][i].childCheckListKey)){
        currentCheck.push(this.props.loadedData[this.props.flowerGroup][i].childCheckListKey)
      }
    }
    this.setState({currentCheckedFlowers: currentCheck})
  }

  render(){
    var data = require("../assets/data/flowers.json");
    const extraInfo= {
      type:"guideRedirect",
      title:"Guide + FAQ",
      content:"You can read more details about flowers and breeding by visiting the guide page",
      linkText: "Tap here to read more about flowers and breeding",
      redirectPassBack: "flowersRedirect"
    }

    return(<ScrollView>
      <GuideRedirectButton icon={"i"} style={{position:"absolute", padding:15, right:0}} extraInfo={extraInfo} setPage={this.props.setPage}/>

      <View style={{marginTop: 100}}/>
      
      <TextFont suffix={" "+attemptToTranslate(capitalize(this.props.flowerGroup))} bold={true} style={{fontSize: 32, marginLeft: 30, color:colors.textBlack[global.darkMode], marginRight: 25}}>{"Hybrid"}</TextFont>
      <View style={{marginTop: 10}}/>
      {
        data[this.props.flowerGroup].map(flower=> (
          <FlowerContainer 
            childCheckListKey = {getFlowerChecklistKey(flower.child)}
            parent1CheckListKey = {getFlowerChecklistKey(flower.parent1)}
            parent2CheckListKey = {getFlowerChecklistKey(flower.parent2)}
            refresh={this.setCurrentlyCheckedFlowers} currentCheckedFlowers={this.state.currentCheckedFlowers} flowerInfo={flower} key={flower.parent1+flower.paren2+flower.child+flower.percentage+flower.parent1Special}/>
        ))
      }
      <View style={{marginTop: 100}}/>
      </ScrollView>
    )
  }
}


class FlowerPage extends Component {
  constructor() {
    super();
    this.loadedData = this.loadCheckListKey();
    this.state = {
      index: 0,
      routes: [
        { key: 'Roses', title: attemptToTranslate('Roses') },
        { key: 'Pansies', title: attemptToTranslate('Pansies') },
        { key: 'Windflowers', title: attemptToTranslate('Windflowers') },
        { key: 'Hyacinths', title: attemptToTranslate('Hyacinths') },
        { key: 'Lilies', title: attemptToTranslate('Lilies') },
        { key: 'Cosmos', title: attemptToTranslate('Cosmos') },
        { key: 'Mums', title: attemptToTranslate('Mums') },
        { key: 'Tulips', title: attemptToTranslate('Tulips') },
      ],
    }
  }

  loadCheckListKey = () => {
    let data = require("../assets/data/flowers.json");
    let currentData = {}
    let dataKeys = Object.keys(data)
    for(let i = 0; i < dataKeys.length; i++){
      let currentDataAtKey = []
      for(let j = 0; j < data[dataKeys[i]].length; j++){
        let currentObject = data[dataKeys[i]][j]
        currentObject["childCheckListKey"] = getFlowerChecklistKey(data[dataKeys[i]][j].child)
        currentObject["parent1CheckListKey"] = getFlowerChecklistKey(data[dataKeys[i]][j].parent1)
        currentObject["parent2CheckListKey"] = getFlowerChecklistKey(data[dataKeys[i]][j].parent2)
        currentDataAtKey.push(currentObject)
      }
      currentData[dataKeys[i]] = currentDataAtKey
    }
    return currentData
  }

  
  RosesRoute = () => (
    <SpecificFlowerPage loadedData={this.loadedData} flowerGroup={"roses"} setPage={this.props.setPage}/>
  )

  PansiesRoute = () => (
    <SpecificFlowerPage loadedData={this.loadedData} flowerGroup={"pansies"} setPage={this.props.setPage}/>
  )

  WindflowersRoute = () => (
    <SpecificFlowerPage loadedData={this.loadedData} flowerGroup={"windflowers"} setPage={this.props.setPage}/>
  )

  HyacinthsRoute = () => (
    <SpecificFlowerPage loadedData={this.loadedData} flowerGroup={"hyacinths"} setPage={this.props.setPage}/>
  )

  LiliesRoute = () => (
    <SpecificFlowerPage loadedData={this.loadedData} flowerGroup={"lilies"} setPage={this.props.setPage}/>
  )

  CosmosRoute = () => (
    <SpecificFlowerPage loadedData={this.loadedData} flowerGroup={"cosmos"} setPage={this.props.setPage}/>
  )

  MumsRoute = () => (
    <SpecificFlowerPage loadedData={this.loadedData} flowerGroup={"mums"} setPage={this.props.setPage}/>
  )

  TulipsRoute = () => (
    <SpecificFlowerPage loadedData={this.loadedData} flowerGroup={"tulips"} setPage={this.props.setPage}/>
  )

  renderScene = SceneMap({
    Roses: this.RosesRoute,
    Pansies: this.PansiesRoute,
    Hyacinths: this.HyacinthsRoute,
    Windflowers: this.WindflowersRoute,
    Lilies: this.LiliesRoute,
    Cosmos: this.CosmosRoute,
    Mums: this.MumsRoute,
    Tulips: this.TulipsRoute,
  });

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
export default FlowerPage;