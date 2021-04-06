import React, {Component} from 'react';
import {Image, TouchableOpacity, View, ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import FlowerContainer from '../components/FlowerContainer'
import TextFont from '../components/TextFont'
import {capitalize} from "../LoadJsonData"
import {getSettingsString, attemptToTranslate} from "../LoadJsonData";
import {PopupInfoCustom} from "../components/Popup"
import {SubHeader, Paragraph} from "../components/Formattings"

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
      <Text style={{ color, margin: 2, textAlign:"center" }}>
        {route.title}
      </Text>
    )}
  />
);

class SpecificFlowerPage extends Component {
  render(){
    var data = require("../assets/data/flowers.json");
    
    return(<ScrollView>
      <PopupInfoCustom ref={(popupExtraInfo) => this.popupExtraInfo = popupExtraInfo} buttonText={"Close"}>
        <View style={{height:6}}/>
        <SubHeader>{"Guide + FAQ"}</SubHeader>
        <Paragraph styled={true}>{"You can read more details about flowers and breeding by visiting the events and guide page"}</Paragraph>
        <TouchableOpacity onPress={() => this.props.setPage(15, true, "flowersRedirect")}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center", padding:10, marginTop:10}}>{"Tap here to read more about flowers and breeding"}</TextFont>
        </TouchableOpacity>
      </PopupInfoCustom>
      <TouchableOpacity style={{position:"absolute", padding:15, right:0}} onPress={()=>{this.popupExtraInfo.setPopupVisible(true)}}><Image style={{width:25,height:25,opacity: 0.35, resizeMode:"contain"}} source={global.darkMode?require("../assets/icons/infoWhite.png"):require("../assets/icons/info.png")}/></TouchableOpacity>

      <View style={{marginTop: 100}}/>
      
      <TextFont suffix={" "+attemptToTranslate(capitalize(this.props.flowerGroup))} bold={true} style={{fontSize: 36, marginLeft: 30, color:colors.textBlack[global.darkMode]}}>{"Hybrid"}</TextFont>
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


class FlowerPage extends Component {
  constructor() {
    super();
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

  
  RosesRoute = () => (
    <SpecificFlowerPage flowerGroup={"roses"} setPage={this.props.setPage}/>
  )

  PansiesRoute = () => (
    <SpecificFlowerPage flowerGroup={"pansies"} setPage={this.props.setPage}/>
  )

  WindflowersRoute = () => (
    <SpecificFlowerPage flowerGroup={"windflowers"} setPage={this.props.setPage}/>
  )

  HyacinthsRoute = () => (
    <SpecificFlowerPage flowerGroup={"hyacinths"} setPage={this.props.setPage}/>
  )

  LiliesRoute = () => (
    <SpecificFlowerPage flowerGroup={"lilies"} setPage={this.props.setPage}/>
  )

  CosmosRoute = () => (
    <SpecificFlowerPage flowerGroup={"cosmos"} setPage={this.props.setPage}/>
  )

  MumsRoute = () => (
    <SpecificFlowerPage flowerGroup={"mums"} setPage={this.props.setPage}/>
  )
  TulipsRoute = () => (
    <SpecificFlowerPage flowerGroup={"tulips"} setPage={this.props.setPage}/>
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
        tabBarPosition={getSettingsString("settingsTabBarPosition") === "true" ? "bottom" : "top"}
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