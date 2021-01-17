import React, {useRef, Component} from 'react';
import {Vibration, BackHandler, Button, Image, ScrollView, Dimensions, Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import SidebarElement from './components/SidebarElement';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FAB from './components/FAB';
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
import Onboard from './pages/Onboard';
import colors from './Colors.js';
import ActiveTime from './components/ActiveTime.js';
import * as Font from 'expo-font';
import PopupRating from './components/PopupRating'
import { Appearance } from 'react-native-appearance';

//expo build:android -t app-bundle
//expo build:android -t apk

function NavigationView(props) {
  return (
    <View style={{width: 290, height:"100%", backgroundColor:colors.textWhite[global.darkMode]}}>
      <ScrollView>
        <View style={{backgroundColor: colors.topSidebar[global.darkMode], marginBottom: 10}}>
          <TextFont bold={true} style={{marginLeft: 15, marginTop: 130, marginBottom: 10, fontSize: 34, color: colors.textBlack[global.darkMode]}}>ACNH Pocket</TextFont>
        </View>
        <SidebarElement image={require("./assets/icons/house.png")} title="Home" pageNum={0} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectHome[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <SidebarElement image={require("./assets/icons/book.png")} title="Everything" pageNum={1} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectItems[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <SidebarElement image={require("./assets/icons/bugs.png")} title="Creatures + Museum" pageNum={2} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectCreatures[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <SidebarElement image={require("./assets/icons/leaf.png")} title="Items" pageNum={3} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectItems[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <SidebarElement image={require("./assets/icons/music.png")} title="Songs" pageNum={4} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectSongs[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <SidebarElement image={require("./assets/icons/emote.png")} title="Emoticons" pageNum={5} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectEmotes[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <SidebarElement image={require("./assets/icons/crafting.png")} title="Crafting + Tools" pageNum={6} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectCrafting[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <SidebarElement image={require("./assets/icons/cat.png")} title="Villagers" pageNum={7} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectVillagers[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <SidebarElement image={require("./assets/icons/construction.png")} title="Construction" pageNum={8} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectConstruction[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <SidebarElement image={require("./assets/icons/flower.png")} title="Flowers" pageNum={9} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectMisc[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:3, marginLeft:14, marginRight: 14, marginTop: 10, marginBottom: 10}}/>
        <SidebarElement image={require("./assets/icons/settings.png")} title="Settings" pageNum={10} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectSettings[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
        <SidebarElement image={require("./assets/icons/magnifyingGlass.png")} title="About" pageNum={11} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectAbout[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
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
    this.numLogins;
    this.state = {
      loaded: false,
      currentPage: 0,
      open:false,
      fadeInTitle:true,
    }
  }
  async componentDidMount(){
    // await AsyncStorage.setItem("firstLogin", "true");

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.openDrawer
    );

    const firstLogin = await getStorage("firstLogin","true");
    const numLogins = parseInt(await getStorage("numLogins","0")) + 1;
    await AsyncStorage.setItem("numLogins", numLogins.toString());
    this.numLogins = numLogins;
    console.log(numLogins)
    global.collectionList = (await getStorage("collectedString","")).split("\n");
    console.log(global.collectionList)

    global.name = await getStorage("name","Name (tap to change)")
    global.islandName = await getStorage("islandName","Island Name (tap)")
    
    //Load Global Data
    await loadGlobalData();

    //Load Settings
    global.settingsCurrent = settings;
    for(var i = 0; i<settings.length; i++){
      global.settingsCurrent[i]["currentValue"] = await getStorage(settings[i]["keyName"],settings[i]["defaultValue"]);
      //console.log(global.settingsCurrent[i]["keyName"])
    }
    global.customTime = new Date(await getStorage("customDate",new Date().toString()));

    this.updateDarkMode();

    //Load Fonts
    await Font.loadAsync({
      "ArialRounded": require('./assets/fonts/arialRound.ttf'),
    });
    await Font.loadAsync({
      "ArialRoundedBold": require('./assets/fonts/arialRoundBold.ttf'),
    });

    console.log("DONE Loading")
    var splashScreenDelay = global.settingsCurrent[1].currentValue==="true" ? 0 : 500
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

  updateDarkMode(){
    if(global.settingsCurrent[12]["currentValue"]==="true"){
      global.darkMode = Appearance.getColorScheme()==="light" ? 0 : 1;
      global.darkModeReverse = Appearance.getColorScheme()==="light" ? 1 : 0;
    } else {
      if(global.settingsCurrent[13]["currentValue"]==="true"){
        global.darkMode = 1;
        global.darkModeReverse = 0;
      }else {
        global.darkMode = 0;
        global.darkModeReverse = 1;
      }
    }
  }

  openDrawer() {
    if(this.state.loaded){
      this.drawer.openDrawer();
      global.settingsCurrent[9].currentValue==="true" ? Vibration.vibrate(8) : "";
    }
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
      currentPageView = <VillagersPage/>
    } else if (this.state.currentPage===8){
      currentPageView = <ConstructionPage/>
    }else if (this.state.currentPage===9){
      currentPageView = <FlowerPage/>
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
      this.updateDarkMode();
      return (
        <>
        <PopupRating numLogins={this.numLogins}/>
        <View style={{position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
        <DrawerLayoutAndroid style={{elevation: 0,}} 
          drawerBackgroundColor="rgba(0,0,0,0.01)" 
          ref={_drawer => (this.drawer = _drawer)} 
          drawerWidth={Dimensions.get('window').width} drawerPosition={"left"} 
          renderNavigationView={() => <NavigationView setPage={this.setPage} currentPage={this.state.currentPage}/>}>
            <StatusBar hidden={global.settingsCurrent[7]["currentValue"]==="false"} backgroundColor="#1c1c1c" style="light" />
            {currentPageView}
          {fab}
        </DrawerLayoutAndroid>
        </>
      );
    }
  }
}
export default App;
