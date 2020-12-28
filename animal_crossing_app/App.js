import React, {useRef, Component} from 'react';
import {Vibration, BackHandler, Button, Image, ScrollView, Dimensions, Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import SidebarElement from './components/SidebarElement';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FAB from './components/FAB';
import TabsPage from './pages/TabsPage';
import SongsPage from './pages/SongsPage';
import EmoticonsPage from './pages/EmoticonsPage';
import ConstructionPage from './pages/ConstructionPage';
import MuseumPage from './pages/MuseumPage';
import VillagersPage from './pages/VillagersPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ItemsPage from './pages/ItemsPage';
import AllItemsPage from './pages/AllItemsPage';
import TestPage from './pages/TestPage';
import CraftingPage from './pages/CraftingPage';
import FadeInOut from './components/FadeInOut';
import Check from './components/Check';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextFont from './components/TextFont';
import LottieView from 'lottie-react-native';
import Popup from './components/Popup';
import CreditsPage from './pages/CreditsPage';
import FlowerPage from './pages/FlowerPage';
import {getStorage, getStorageData, settings, loadGlobalData} from './LoadJsonData';
import {ExportFile, LoadFile} from './components/LoadFile';
import Onboard from './pages/Onboard';
import colors from './Colors.js';
import ActiveTime from './components/ActiveTime.js';

function NavigationView(props) {
  return (
    <View style={{width: 290, height:"100%", backgroundColor:colors.textWhite[colors.mode]}}>
      <ScrollView>
        <View style={{backgroundColor: colors.topSidebar[colors.mode], marginBottom: 10}}>
          <TextFont bold={true} style={{marginLeft: 15, marginTop: 130, marginBottom: 10, fontSize: 34, color: colors.textBlack[colors.mode]}}>ACNH Pocket</TextFont>
        </View>
        <SidebarElement image={require("./assets/icons/house.png")} title="Home" pageNum={0} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectHome[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <SidebarElement image={require("./assets/icons/book.png")} title="All Items" pageNum={1} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectItems[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <SidebarElement image={require("./assets/icons/bugs.png")} title="Creatures and Museum" pageNum={2} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectCreatures[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <SidebarElement image={require("./assets/icons/leaf.png")} title="Items" pageNum={3} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectItems[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <SidebarElement image={require("./assets/icons/music.png")} title="Songs" pageNum={4} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectSongs[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <SidebarElement image={require("./assets/icons/emote.png")} title="Emoticons" pageNum={5} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectEmotes[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <SidebarElement image={require("./assets/icons/crafting.png")} title="Crafting + Tools" pageNum={6} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectCrafting[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <SidebarElement image={require("./assets/icons/cat.png")} title="Villagers" pageNum={7} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectVillagers[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <SidebarElement image={require("./assets/icons/construction.png")} title="Construction" pageNum={8} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectConstruction[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <SidebarElement image={require("./assets/icons/flower.png")} title="Flowers" pageNum={9} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectMisc[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <View style={{backgroundColor:colors.lightDarkAccent[colors.mode], height:3, marginLeft:14, marginRight: 14, marginTop: 10, marginBottom: 10}}/>
        <SidebarElement image={require("./assets/icons/settings.png")} title="Settings" pageNum={10} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectSettings[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <SidebarElement image={require("./assets/icons/magnifyingGlass.png")} title="About" pageNum={11} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectAbout[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
        <View style={{margin:15}}/>
      </ScrollView>
    </View>
  )
}


class App extends Component {
  constructor() {
    super();
    this.openDrawer = this.openDrawer.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setFirstLogin = this.setFirstLogin.bind(this);
    this.random = Math.random();
    this.state = {
      loaded: false,
      currentPage: 2,
      open:false,
      fadeInTitle:true,
    }
  }
  async componentDidMount(){
    //await AsyncStorage.setItem("firstLogin", "true");

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.openDrawer
    );

    const firstLogin = await getStorage("firstLogin","true");
    global.collectionList = (await getStorage("collectedString","")).split("\n");
    console.log(global.collectionList)
    
    //Load Global Data
    await loadGlobalData();

    //Load Settings
    global.settingsCurrent = settings;
    for(var i = 0; i<settings.length; i++){
      global.settingsCurrent[i]["currentValue"] = await getStorage(settings[i]["keyName"],settings[i]["defaultValue"]);
      //console.log(global.settingsCurrent[i]["keyName"])
    }
    
    
    console.log("DONE Loading")
    var splashScreenDelay = global.settingsCurrent[1].currentValue==="true" ? 0 : 500
    console.log(splashScreenDelay)
    this.timeoutHandle = setTimeout(()=>{
      this.setState({
        fadeInTitle: false,
        firstLogin: firstLogin,
      });
    }, 0+splashScreenDelay);
    this.timeoutHandle = setTimeout(()=>{
      this.setState({
        loaded:true,
      });
    }, 10+splashScreenDelay);
  }

  openDrawer() {
    this.drawer.openDrawer();
    Vibration.vibrate(8);
    return true;
  }

  setPage(pageNum) {
    console.log(pageNum)
    if(this.state.pageNum!==pageNum)
      this.setState({currentPage: pageNum})
    this.drawer.closeDrawer();
  }

  setFirstLogin(firstLogin){
    this.setState({firstLogin: firstLogin})
  }
  
  render(){
    var fab;
    if(global.settingsCurrent!==undefined&&global.settingsCurrent[5]["currentValue"]==="true"){
      fab = <FAB openDrawer={this.openDrawer}/>;
    } else {
      fab = <View/>;
    }
    
    var currentPageView;
    if (this.state.currentPage===0){
      currentPageView = <FadeInOut fadeIn={true}><HomePage/></FadeInOut>
    } else if (this.state.currentPage===1){
      currentPageView = <AllItemsPage/>
    } else if(this.state.currentPage===1){
      currentPageView = <TabsPage openDrawer={this.openDrawer}/>
    } else if(this.state.currentPage===2){
      currentPageView = <MuseumPage/>
    } else if (this.state.currentPage===2){
      currentPageView = 
      <>
        <Button title="button" onPress={() => this.setState({open:!this.state.open})}/>
        <Button title="button" onPress={() => this.setState({open:!this.state.open})}/>
        <Button title="button" onPress={() => this.setState({open:!this.state.open})}/>
        <Button title="button" onPress={() => this.setState({open:!this.state.open})}/>
        <Button title="button" onPress={() => this.setState({open:!this.state.open})}/>
        <Popup button1={"OK"} button1Action={()=>{console.log("OK")}} button2={"Cancel"} button2Action={()=>{console.log("Cancel")}} popupVisible={this.state.open} close={() => this.setState({open:!this.state.open})}/>
      </>
    } else if (this.state.currentPage===3){
      currentPageView = <ActiveTime item={require("./assets/data/fish.json")[4]}/>
    } else if (this.state.currentPage===4){
      currentPageView = <SongsPage/>
    } else if (this.state.currentPage===5){
      currentPageView = <EmoticonsPage/>
    } else if (this.state.currentPage===6){
      currentPageView = <CraftingPage/>
    } else if (this.state.currentPage===8){
      currentPageView = <ConstructionPage/>
    } else if (this.state.currentPage===8){
      currentPageView = <View><ExportFile/><LoadFile/></View>
    } else if (this.state.currentPage===7){
      currentPageView = <VillagersPage/>
    } else if (this.state.currentPage===9){
      currentPageView = <FlowerPage/>
    } else if (this.state.currentPage===9){
      currentPageView = <ActiveTime displayText={"helloo"} displayText2={"yo"}/>
    } else if (this.state.currentPage===10){
      currentPageView = <SettingsPage/>
    } else if (this.state.currentPage===11){
      currentPageView = <CreditsPage/>
    } else {
      currentPageView = <Text>Default</Text>
    }

    if(!this.state.loaded){
      var splashScreens = [require('./assets/airplane.json'),require('./assets/balloon.json')];
      var chosenSplashScreen = splashScreens[Math.floor(this.random * splashScreens.length)];
      return <>
      <View style={{position: "absolute", backgroundColor: colors.background[colors.mode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
      <FadeInOut fadeIn={this.state.fadeInTitle}>
        <LottieView 
          autoPlay
          loop
          style={{
            top: Dimensions.get('window').height/8,
            width: "100%",
            zIndex:1,
            transform: [
              { scale: 1.25 },
              { rotate: '0deg'},
            ],
          }}
          source={chosenSplashScreen}
        />
      </FadeInOut>
      </>
    } else if (this.state.firstLogin==="true"){
      return <Onboard setFirstLogin={this.setFirstLogin}/>
    } else {
      return (
        <>
        <View style={{position: "absolute", backgroundColor: colors.background[colors.mode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
        <DrawerLayoutAndroid style={{elevation: 0,}} 
          drawerBackgroundColor="rgba(0,0,0,0.01)" 
          ref={_drawer => (this.drawer = _drawer)} 
          drawerWidth={Dimensions.get('window').width} drawerPosition={"left"} 
          renderNavigationView={() => <NavigationView setPage={this.setPage} currentPage={this.state.currentPage}/>}>
            {currentPageView}
          {fab}
        </DrawerLayoutAndroid>
        </>
      );
    }
  }
}
export default App;
