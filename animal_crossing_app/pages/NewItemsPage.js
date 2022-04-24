import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {attemptToTranslate, getRecentItemObjectsList, getSettingsString, getStorage} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"
import TextFont from '../components/TextFont';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

class NewItems extends React.PureComponent {
  render(){
    return(
      <AllItemsPage 
        setPage={this.props.setPage}
        // disableFilters={true}
        title="New Items"
        subHeader="Items that have been added from the most recent update"
        newItems={true}
        appBarColor = {colors.newItemsAppBar[global.darkMode]}
        accentColor = {colors.newItemsAccent[global.darkMode]}
        extraInfo={
          {
            type:"guideRedirect",
            title:"Guide + FAQ",
            content:"You can read more about the new game update by visiting the guide page",
            linkText: "Tap here to read about the new update",
            redirectPassBack: "updateRedirect"
          }
        }
      />
    )
  }
}


class RecentItems extends React.PureComponent {
  render(){
    let itemIds = getRecentItemObjectsList()
    return(
      <AllItemsPage 
        setPage={this.props.setPage}
        // disableFilters={true}
        title="Recent Items"
        subHeader="Items that you most recently added to your collection"
        appBarColor = {colors.newItemsAppBar[global.darkMode]}
        accentColor = {colors.newItemsAccent[global.darkMode]}
        disableFilters={true}
        itemIDs={[
          {
            list:itemIds,
          },
        ]}
        sortItemsBasedOnIDOrder={itemIds}
      />
    )
  }
}

export default class NewItemsPage extends Component{
  constructor(){
    super()
    this.state = {loaded:false}
  }
  async componentDidMount(){
    this.setState({loaded:false})
    let lastTabForNewItemsPage = await getStorage("lastTabForNewItemsPage","0");
    let initialIndex = 0
    if(lastTabForNewItemsPage === "0"){
      initialIndex = 0
    } else {
      initialIndex = 1
    }
    this.setState({loaded:true, initialIndex: initialIndex})
  }
  render(){
    if(this.state.loaded===false){
      return <View/>
    } else {
      return <NewItemsPage2 selectedTab={this.state.initialIndex}/>
    }
  }
}

class NewItemsPage2 extends Component {
  constructor(props) {
    super();
    let selectedTab = 0
    if(props.selectedTab!==undefined && props.selectedTab!==""){
      selectedTab = props.selectedTab
    }
    this.state = {
      index: selectedTab,
      routes: [
        { key: 'New Items', title: attemptToTranslate('New Items') },
        { key: 'Recent Items', title: attemptToTranslate('Recent Items') },
      ],
    }
  }

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'New Items':
        return <NewItems setPage={this.props.setPage}/>;
      case 'Recent Items':
        return <RecentItems setPage={this.props.setPage}/>;
      default:
        return <View/>;
    }
  };

  handleIndexChange = index => {
    this.setState({index})
    AsyncStorage.setItem("lastTabForNewItemsPage", index.toString());
  };


  render(){
    return(
      <TabView
        lazy
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
