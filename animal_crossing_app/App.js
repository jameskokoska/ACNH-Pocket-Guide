import React, {useRef, Component} from 'react';
import {Vibration, BackHandler, Button, Image, ScrollView, Dimensions, Text, View, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FAB from './components/FAB';
import SongsPage from './pages/SongsPage';
import CatalogPage from './pages/CatalogPage';
import EmoticonsPage from './pages/EmoticonsPage';
import ConstructionPage from './pages/ConstructionPage';
import MuseumPage from './pages/MuseumPage';
import VillagersPage from './pages/VillagersPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import ItemsPage from './pages/ItemsPage';
import AllItemsPage from './pages/AllItemsPage';
import MaterialsPage from './pages/MaterialsPage';
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
import CardsPage from './pages/CardsPage';
import {getStorage, getStorageData, getSettingsString, settings, loadGlobalData} from './LoadJsonData';
import Onboard from './pages/Onboard';
import colors from './Colors.js';
import ActiveTime from './components/ActiveTime.js';
import * as Font from 'expo-font';
import PopupRating from './components/PopupRating'
import { Appearance } from 'react-native-appearance';
import SideMenu from './components/SideMenu'

//expo build:android -t app-bundle
//expo build:android -t apk
global.version = require("./app.json")["expo"]["version"];
global.versionCode = require("./app.json")["expo"]["android"]["versionCode"];
global.changelog = [`
Improved the catalog import 
Access this with the Catalog Scanner page in the sidemenu

Can use back button to exit out of popups

Fixed app freezing

Added new data from the update

Small fixes with hemisphere selection
`]

class App extends Component {
  constructor() {
    super();
    this.openDrawer = this.openDrawer.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setFirstLogin = this.setFirstLogin.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.random = Math.random();
    this.numLogins;
    this.state = {
      loaded: false,
      currentPage: 0,
      open:false,
      fadeInTitle:true,
      openChangeLog: false,
    }
    this.lastPage = 0;
  }

  async loadSettings(){
    global.settingsCurrent = settings;
    for(var i = 0; i<settings.length; i++){
      if(global.settingsCurrent[i]["keyName"]!="breaker"){
        global.settingsCurrent[i]["currentValue"] = await getStorage(settings[i]["keyName"],settings[i]["defaultValue"]);
      }
      //console.log(global.settingsCurrent[i]["keyName"])
    }
  }

  async componentDidMount(){
    // await AsyncStorage.setItem("firstLogin", "true");

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton,
    );

    const firstLogin = await getStorage("firstLogin","true");
    const numLogins = parseInt(await getStorage("numLogins","0")) + 1;
    await AsyncStorage.setItem("numLogins", numLogins.toString());
    this.numLogins = numLogins;
    console.log(numLogins)
    global.collectionList = (await getStorage("collectedString","")).split("\n");
    console.log(global.collectionList)

    global.name = await getStorage("name","")
    global.islandName = await getStorage("islandName","")
    
    //Load Global Data
    await loadGlobalData();

    //Load Settings
    await this.loadSettings();

    global.customTime = new Date(await getStorage("customDate",new Date().toString()));

    this.updateDarkMode();

    //Load Fonts
    await Font.loadAsync({
      "ArialRounded": require('./assets/fonts/arialRound.ttf'),
    });
    await Font.loadAsync({
      "ArialRoundedBold": require('./assets/fonts/arialRoundBold.ttf'),
    });

    var openChangeLog = await getStorage("changeLog","");
    if(openChangeLog === "" || openChangeLog !== global.version){
      openChangeLog = true;
    } else {
      openChangeLog = false;
    }

    console.log("DONE Loading")
    this.timeoutHandle = setTimeout(()=>{
      this.setState({
        fadeInTitle: false,
        firstLogin: firstLogin,
      });
    }, 0);
    this.timeoutHandle = setTimeout(()=>{
      this.setState({
        loaded:true,
        openChangeLog: openChangeLog,
      });
    }, 10);
  }

  updateDarkMode(){
    if(getSettingsString("settingsAutoDarkMode")==="true"){
      global.darkMode = Appearance.getColorScheme()==="light" ? 0 : 1;
      global.darkModeReverse = Appearance.getColorScheme()==="light" ? 1 : 0;
    } else {
      if(getSettingsString("settingsDarkMode")==="true"){
        global.darkMode = 1;
        global.darkModeReverse = 0;
      }else {
        global.darkMode = 0;
        global.darkModeReverse = 1;
      }
    }
  }

  handleBackButton(){
    if(this.state.loaded && getSettingsString("settingsBackButtonChangePages")==="true"){
      this.setPage(this.lastPage);
    }else{
      this.openDrawer();
    }
    return true;
  }

  openDrawer() {
    if(this.state.loaded){
      this.sideMenu.openDrawer();
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(8) : "";
    }
    return true;
  }

  setPage(pageNum) {
    if(this.state.loaded){
      console.log(this.lastPage);
      if(this.state.currentPage!==pageNum){
        this.lastPage = this.state.currentPage;
        console.log(this.lastPage);
        this.setState({currentPage: pageNum});
      }
      this.sideMenu.closeDrawer();
    }
    return true;
  }

  setFirstLogin(firstLogin){
    this.setState({firstLogin: firstLogin});
    this.loadSettings();
  }
  render(){
    if(!this.state.loaded){
      var splashScreens = [require('./assets/airplane.json'),require('./assets/balloon.json')];
      var chosenSplashScreen = splashScreens[Math.floor(this.random * splashScreens.length)];
      return <>
      <View style={{position: "absolute", backgroundColor: colors.background[Appearance.getColorScheme()==="light" ? 0 : 1], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
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
      
      var currentPageView;
      if (this.state.currentPage===0){
        currentPageView = <FadeInOut fadeIn={true}><HomePage setPage={this.setPage}/></FadeInOut>
      } else if (this.state.currentPage===1){
        currentPageView = <AllItemsPage/>
      } else if(this.state.currentPage===2){
        currentPageView = <MuseumPage/>
      } else if (this.state.currentPage===3){
        currentPageView = <ItemsPage/>
      } else if (this.state.currentPage===4){
        currentPageView = <SongsPage/>
      } else if (this.state.currentPage===5){
        currentPageView = <EmoticonsPage/>
      } else if (this.state.currentPage===6){
        currentPageView = <CraftingPage/>
      } else if (this.state.currentPage===7){
        currentPageView = <MaterialsPage/>
      } else if (this.state.currentPage===8){
        currentPageView = <VillagersPage/>
      } else if (this.state.currentPage===9){
        currentPageView = <ConstructionPage/>
      } else if (this.state.currentPage===10){
        currentPageView = <FlowerPage/>
      } else if (this.state.currentPage===11){
        currentPageView = <CardsPage/>
      } else if (this.state.currentPage===12){
        currentPageView = <CatalogPage/>
      } else if (this.state.currentPage===13){
        currentPageView = <SettingsPage/>
      } else if (this.state.currentPage===14){
        currentPageView = <CreditsPage/>
      } else {
        currentPageView = <Text>Default</Text>
      }
      this.updateDarkMode();
      var fab;
      if(global.settingsCurrent!==undefined&&getSettingsString("settingsShowFAB")==="true"){
        fab = <FAB openDrawer={this.openDrawer}/>;
      } else {
        fab = <View/>;
      }
      return (
        <>  
          <SideMenu ref={(sideMenu) => this.sideMenu = sideMenu } setPage={this.setPage} currentPage={this.state.currentPage}>
            <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
            <PopupRating numLogins={this.numLogins}/>
            <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
            <StatusBar hidden={getSettingsString("settingsShowStatusBar")==="false"} backgroundColor="#1c1c1c" style="light" />
            {currentPageView}
            <Popup 
              button1={"OK"}
              button1Action={()=>{}}
              popupVisible={this.state.openChangeLog} 
              close={async () => {this.setState({openChangeLog:!this.state.openChangeLog}); await AsyncStorage.setItem("changeLog", global.version);}}
              text={"What's new?"}
              textLower={global.changelog}
            />
          </SideMenu>
          {fab}
        </>
      );
    }
  }
}
export default App;