import React, {useRef, Component} from 'react';
import {Vibration, BackHandler, Button, Image, ScrollView, Dimensions, Text, View, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FAB from './components/FAB';
import CalendarPage from './pages/CalendarPage';
import SongsPage from './pages/SongsPage';
import CatalogPage from './pages/CatalogPage';
import EmoticonsPage from './pages/EmoticonsPage';
import ConstructionPage from './pages/ConstructionPage';
import MuseumPage from './pages/MuseumPage';
import VillagersPage from './pages/VillagersPage';
import MysteryIslandsPage from './pages/MysteryIslandsPage';
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
import PopupChangelog from './components/PopupChangelog';
import CreditsPage from './pages/CreditsPage';
import FlowerPage from './pages/FlowerPage';
import CardsPage from './pages/CardsPage';
import {getDefaultLanguage, getStorage, getStorageData, getSettingsString, settings, loadGlobalData} from './LoadJsonData';
import Onboard from './pages/Onboard';
import colors from './Colors.js';
import ActiveTime from './components/ActiveTime.js';
import * as Font from 'expo-font';
import PopupRating from './components/PopupRating'
import { Appearance } from 'react-native-appearance';
import SideMenu from './components/SideMenu'
import GuidePage from './pages/GuidePage';
import NewItemsPage from "./pages/NewItemsPage"
import WishlistPage from "./pages/WishlistPage"

//expo build:android -t app-bundle
//expo build:android -t apk
const appInfo = require("./app.json");
global.version = appInfo["expo"]["version"];
global.versionCode = appInfo["expo"]["android"]["versionCode"];

global.gameVersion = "1.9.0";
global.changelog = `
-Added wishlist. Long press any item to add it to the wishlist!
-Variations are now checked off within an item
-Long press a variation for a larger image view
-Removed confusing variation settings
-Fixed and added translations
-Added NPC translations
-Fixed wishlist bugs
-
-Added [New Items] page. Go here to see all the new items that were recently added in the new update
-Fixed crafting materials translations
-Fixed current villagers on home screen
-Fixed 24 hour times not displayed correctly
-Filter translation support
-
-Added setting to hide item variations that can be obtained easily through customization (Useful to see what needs to be purchased from Nooks!)
-Can set language in settings
-French language translation supported, thanks Christophe!
-Note: translations only apply to items, apart from supported translated languages
-Images are now downloaded, can be used offline (can be disabled in settings)
-
-
-Planned Features:
- Visitors tracking
- Edit home screen sections
-
-Any feedback feel free to send me an email! dapperappdeveloper@gmail.com
-You can reread this changelog in the [About] page
`

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
    this.mounted = true;
    // await AsyncStorage.setItem("firstLogin", "true");

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton,
    );

    const firstLogin = await getStorage("firstLogin","true");
    const numLogins = parseInt(await getStorage("numLogins","0")) + 1;
    await AsyncStorage.setItem("numLogins", numLogins.toString());
    this.numLogins = numLogins;
    // console.log(numLogins)
    global.collectionList = (await getStorage("collectedString","")).split("\n");
    console.log(global.collectionList)

    global.name = await getStorage("name","")
    global.islandName = await getStorage("islandName","")
    var defaultLanguage = getDefaultLanguage();
    global.language = await getStorage("Language",defaultLanguage);
    
    //Load Global Data
    await loadGlobalData();

    //Load Settings
    await this.loadSettings();

    global.customTime = new Date(await getStorage("customDate",new Date().toString()));

    this.updateSettings();

    //Load Fonts
    await Font.loadAsync({
      "ArialRounded": require('./assets/fonts/arialRound.ttf'),
    });
    await Font.loadAsync({
      "ArialRoundedBold": require('./assets/fonts/arialRoundBold.ttf'),
    });
    
    if(this.mounted){
      this.setState({
        fadeInTitle: false,
        firstLogin: firstLogin,
        loaded:true,
      });
    }
  }

  componentWillUnmount() {
    this.mounted=false;
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
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

  updateSettings = () =>{
    this.updateDarkMode();
    var fab;
    if(this.state.currentPage!==15&&global.settingsCurrent!==undefined&&getSettingsString("settingsShowFAB")==="true"){
      fab = <FAB openDrawer={this.openDrawer}/>;
    } else {
      fab = <View/>;
    }
    this.setState({fab:fab})
  }

  handleBackButton(){
    //For Guide page
    if(this.state.currentPage===15){
      return true;
    }else if(this.state.loaded && getSettingsString("settingsBackButtonChangePages")==="true"){
      this.setPage(this.lastPage);
    }else{
      this.openDrawer(false);
    }
    return true;
  }

  openDrawer(vibrate=true) {
    if(this.state.loaded){
      this.sideMenu.openDrawer();
      getSettingsString("settingsEnableVibrations")==="true"&&vibrate ? Vibration.vibrate(8) : "";
    }
    return true;
  }

  setPage(pageNum) {
    if(this.state.loaded){
      if(this.state.currentPage!==pageNum){
        this.lastPage = this.state.currentPage;
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
    var fab = this.state.fab;
    if(this.state.currentPage===15){
      fab = <View/>;
    } else if(this.state.currentPage===16){
      fab = <FAB openDrawer={this.openDrawer} offset={30}/>;
    }

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
        currentPageView = <MysteryIslandsPage/>
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
        currentPageView = <SettingsPage updateSettings={this.updateSettings}/>
      } else if (this.state.currentPage===14){
        currentPageView = <CreditsPage/>
      } else if (this.state.currentPage===15){
        currentPageView = <GuidePage openMenu={this.openDrawer}/>
      } else if (this.state.currentPage===16){
        currentPageView = <CalendarPage/>
      } else if (this.state.currentPage===17){
        currentPageView = <NewItemsPage/>
      } else if (this.state.currentPage===18){
        currentPageView = <WishlistPage setPage={this.setPage}/>
      } else {
        currentPageView = <Text>Default</Text>
      }
      
      return (
        <>  
          <SideMenu ref={(sideMenu) => this.sideMenu = sideMenu} setPage={this.setPage} currentPage={this.state.currentPage}>
            <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
            <PopupRating numLogins={this.numLogins}/>
            <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
            <StatusBar hidden={getSettingsString("settingsShowStatusBar")==="false"} backgroundColor="#1c1c1c" style="light" />
            {currentPageView}
            <PopupChangelog/>
          </SideMenu>
          {fab}
        </>
      );
    }
  }
}
export default App;