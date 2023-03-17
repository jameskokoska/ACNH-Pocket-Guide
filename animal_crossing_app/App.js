import React, {Component} from 'react';
import {Vibration, BackHandler, Dimensions, Text, View, StatusBar, Linking, LogBox, AccessibilityInfo } from 'react-native';
import FAB, { FABWrapper } from './components/FAB';
import CalendarPage, { AllEventsList, CalendarView } from './pages/CalendarPage';
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
import ProfilesPage from './pages/ProfilesPage';
import CraftingPage from './pages/CraftingPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import CreditsPage from './pages/CreditsPage';
import FlowerPage from './pages/FlowerPage';
import CardsPage from './pages/CardsPage';
import {getDefaultLanguage, getStorage,getSettingsString, settings, loadGlobalData, attemptToTranslate, indexCollectionList, setSettingsString, openURL, deleteGeneratedData} from './LoadJsonData';
import Onboard from './pages/Onboard';
import colors from './Colors.js';
import * as Font from 'expo-font';
import PopupRating from './components/PopupRating'
import { Appearance } from 'react-native';
import SideMenu, { sideSections } from './components/SideMenu'
import GuidePage from './pages/GuidePage';
import MeteoNookPage from './pages/MeteoNookPage';
import ActiveCreaturesPage from './pages/ActiveCreaturesPage';
import NewItemsPage from "./pages/NewItemsPage"
import WishlistPage from "./pages/WishlistPage"
import AchievementsPage from "./pages/AchievementsPage"
import VillagerPresentsPage from "./pages/VillagerPresentsPage"
import VillagerFurniture, { VillagerFurnitureParadisePlanning } from "./pages/VillagerFurniture"
import ObtainableItemsPage from "./pages/ObtainableItemsPage"
import CustomFiltersPage from "./pages/CustomFiltersPage"
import VillagersCompatibilityPage from "./pages/VillagersCompatibilityPage"
import ProfileCurrentPage from "./pages/ProfileCurrentPage"
import AmiiboPage from "./pages/AmiiboPage"
import BackupPage from "./pages/BackupPage"
import TVGuidePage from './pages/TVGuidePage';
import OrdinancePage from './pages/OrdinancePage';
import GyroidsPage from './pages/GyroidsPage';
import { autoBackup } from './components/FirebaseBackup';
import Popup, { PopupRawLoading } from './components/Popup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RootNavigation';
import * as RootNavigation from './RootNavigation.js';
import CraftableItemsPage from './pages/CraftableItemsPage';
import {dataVersion} from "./Changelog"
import ParadisePlanningPage from './pages/ParadisePlanningPage';
// import { DownloadDatabase } from './components/DownloadDatabase';
import BrowserPage from './pages/BrowserPage';
import Toast from "react-native-toast-notifications";
import TextFont from './components/TextFont';
import { DefaultTheme, Provider } from 'react-native-paper';
import GlobalSearchPage from './pages/GlobalSearchPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Sentry from 'sentry-expo';
import {sentryConfig} from './sentryConfig'
import * as Device from 'expo-device';
import VillagerPhotoPoster from './pages/VillagerPhotoPoster';
import TodoReorderPage from './pages/TodoReorderPage';
import DonatePage from './pages/DonatePage';
import 'expo-dev-client';
import * as InAppPurchases from 'expo-in-app-purchases';
import Animated, { FadeIn } from "react-native-reanimated";
import IngredientsPage from './pages/IngredientsPage';
import PhotosPostersPage from './pages/PhotosPostersPage';

const backup = console.warn;

console.warn = function filterWarnings(log) {
  const warningsToIgnore = ["ViewPropTypes"];

  if (!warningsToIgnore.some(msg => log.includes(msg))) {
    backup.apply(console, arguments);
  }
};

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])

// Production build
// eas build --platform android

// Development build with native code:
// Read more: https://docs.expo.dev/development/getting-started/
// eas build --profile development --platform android
// install build and run:
// npx expo start --dev-client --tunnel
// or
// expo start --dev-client

// Develop internal preview build
// eas build --profile preview --platform android 


Sentry.init({
  dsn: sentryConfig["dsn"],
  // enableInExpoDevelopment: true,
  // debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

// Sentry.Native.*

// Sentry.Browser.*

const appInfo = require("./app.json");
global.version = appInfo["expo"]["version"];
global.versionCode = appInfo["expo"]["android"]["versionCode"];
const Stack = createNativeStackNavigator();
global.randomGlobal = 0

class App extends Component {
  constructor() {
    super();
    this.openDrawer = this.openDrawer.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setFirstLogin = this.setFirstLogin.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.random = Math.random();
    global.randomGlobal = Math.random();
    this.state = {
      loaded: false,
      currentPage:0,
      open:false,
      propsPassed:""
    }
    this.lastPage = [0];
    this.lastPropsPassed = [];

    Dimensions.addEventListener('change', () => {
      this.forceUpdate()
    });
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

  loadProfileData = async(selectedProfile) => {
    //empty string is default profile
    global.profile = selectedProfile
    global.collectionList = (await getStorage("collectedString"+global.profile,"")).split("\n");
    global.collectionListIndexed = indexCollectionList(global.collectionList)
    global.collectionListIndexedAmount = JSON.parse(await getStorage("collectionListIndexedAmount"+global.profile,"{}"));
    global.name = await getStorage("name"+global.profile,"");
    global.islandName = await getStorage("islandName"+global.profile,"");
    global.dreamAddress = await getStorage("dreamAddress"+global.profile,"");
    global.friendCode = await getStorage("friendCode"+global.profile,"");
    global.creatorCode = await getStorage("creatorCode"+global.profile,"");
    global.HHPCode = await getStorage("HHPCode"+global.profile,"");
    global.selectedFruit = await getStorage("selectedFruit"+global.profile,"");
    global.customTimeOffset = await getStorage("customDateOffset"+global.profile,"0");
    global.ordinance = await getStorage("ordinance"+global.profile,"");
    global.extraItemInfo = await getStorage("extraItemInfo"+global.profile,"");
    global.customLists = JSON.parse(await getStorage("customLists"+global.profile,"[]"));
    global.defaultSelectedList = await getStorage("defaultSelectedList"+global.profile,"");
    console.log(global.defaultSelectedList)
    let lastSelectedListPage = await getStorage("lastSelectedListPage"+global.profile,"");
    if(lastSelectedListPage!=="" && customLists!==undefined && customLists.includes(lastSelectedListPage)){
      global.lastSelectedListPage = lastSelectedListPage
    } else {
      global.lastSelectedListPage = ""
    }
    global.customListsImagesIndexed = JSON.parse(await getStorage("customListsImagesIndexed"+global.profile,"{}"));
    global.paradisePlanningListIndexed = undefined
    global.loadNewHHPList = false
    global.reducedMotion = await AccessibilityInfo.isReduceMotionEnabled()
    // console.log(global.collectionList)
  }

  loadSections = async(key, defaultSections) => {
    var sections = JSON.parse(await getStorage(key,JSON.stringify(defaultSections)));
    const aKeys = Object.keys(sections);
    const bKeys = Object.keys(defaultSections);
    //Update sections if any new ones added
    if(JSON.stringify(aKeys) !== JSON.stringify(bKeys)){
      var newSections = defaultSections;
      for(var i=0; i<bKeys.length; i++){
        if(sections[bKeys[i]]!==undefined){
          newSections[bKeys[i]]=sections[bKeys[i]];
        }
      }
      await AsyncStorage.setItem(key, JSON.stringify(newSections));
      sections = newSections;
    }
    return sections;
  }

  //Compare a list of objects and an attribute, return the default if not comparable 
  loadList = async(key, defaultList, attributeToCheck) => {
    let list = JSON.parse(await getStorage(key,JSON.stringify(defaultList)));
    let storedAttributes = []
    for(let index=0; index<list.length; index++){
      storedAttributes.push(list[index][attributeToCheck])
    }

    let defaultAttributes = []
    for(let index=0; index<defaultList.length; index++){
      defaultAttributes.push(defaultList[index][attributeToCheck])
    }

    if(storedAttributes.sort().join(',')===defaultAttributes.sort().join(',')){
      return list
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(defaultList));
      return defaultList
    }
  }

  async componentDidMount(){
    this.mounted = true;

    StatusBar.setHidden(true);
    
    setTimeout(async () => {
      let defaultLanguage = getDefaultLanguage();
      global.language = await getStorage("Language",defaultLanguage);

      //Load Fonts
      await Font.loadAsync({
        "ArialRounded": require('./assets/fonts/arialRound.ttf'),
      });
      await Font.loadAsync({
        "ArialRoundedBold": require('./assets/fonts/arialRoundBold.ttf'),
      });

      let dataVersionLoaded = await getStorage("dataVersion","");
      
      //Load Settings
      await this.loadSettings();
      this.updateDarkMode();

      this.popupLoading?.setPopupVisible(true)
      await this.continueMountingGenerate(false)

      if(dataVersionLoaded !== "" && dataVersionLoaded !== dataVersion){
        await deleteGeneratedData()
      }

    }, 10);
  }

  continueMountingGenerate = async(generate) => {
    await this.continueMountingFinish()
    }

  continueMountingFinish = async() => {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton,
    );
    const firstLogin = await getStorage("firstLogin","true");

    global.profile = await getStorage("selectedProfile","");
    await this.loadProfileData(global.profile);
    
    //Load Global Data
    await loadGlobalData();

    this.updateSettings();

    //load home screen sections
    const defaultSections = {
      "Time Travel" : false,
      "Events" : true,   
      "To-Do" : true,
      "Turnip Log" : true,
      "Visitors" : true,
      "Collection" : false,
      "Profile" : false,
      "Loan Tracking" : true,
      "Tool Durability" : false,
      "Star Counter" : false,
      "Store Hours" : true,
    }
    this.sections = await this.loadSections("Sections", defaultSections);
    const defaultSectionsOrder = [
      {"name":"Time Travel"},
      {"name":"Events"},
      {"name":"To-Do"},
      {"name":"Turnip Log"},
      {"name":"Visitors"},
      {"name":"Collection"},
      {"name":"Profile"},
      {"name":"Loan Tracking"},
      {"name":"Tool Durability"},
      {"name":"Star Counter"},
      {"name":"Store Hours"},
    ]
    this.sectionsOrder = await this.loadList("SectionsOrder",defaultSectionsOrder,"name")

    //load home screen events
    const defaultEventSections = {
      "Info1" : "Notifications are created based on the categories you select. They are only loaded one week into the future and are set according to your phone time.",
      "App notifications" : false,
      "Set Notification Time" : "",
      "Favorite Villager's Birthdays" : true,
      "Old Resident Villager's Birthdays" : true,
      "All Villager's Birthdays" : false,
      "K.K. Slider" : true,
      "Daisy Mae" : true,
      "Crafting Seasons" : true,
      "Event Ready Days" : false,
      "Nook Shopping Events" : false,
      "Shopping Seasons" : false,
      "Calendar Seasons" : false,
      "Blooming Seasons" : false,
      "Zodiac Seasons" : false,
      "Break2" : true,
      "Show End Day of Events" : true,
      "Show All Events Happening Today" : false,
    }
    this.eventSections = await this.loadSections("EventSections", defaultEventSections);
    
    this.sideMenuSections = await this.loadList("SideMenuSections", sideSections, "displayName")
    this.sideMenuSectionsDisabled = JSON.parse(await getStorage("SideMenuSectionsDisabled","[]"))

    this.setState({
      firstLogin: firstLogin,
      loaded:true,
    });
    if(getSettingsString("settingsAutoBackup")==="true"){
      this.startAutoBackup();
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
    this.fab?.updateFAB(this.state.currentPage)
  }

  handleBackButton(){
    if(!this.state.loaded){
      return true
    }else if(this.state.firstLogin==="true"){
      return true;
    } else if(getSettingsString("settingsBackButtonChangePages")==="true"){
      this.setPage(this.lastPage[this.lastPage.length-1], false, this.lastPropsPassed[this.lastPropsPassed.length-1]);
      if(this.lastPage.length>1){
        this.lastPage.pop();
        this.lastPropsPassed.pop();
      }
    } else {
      this.openDrawer(false);
    }
    return true;
  }

  startAutoBackup = async () => {
    let result = await autoBackup();
    // console.log(result)
    // ToastAndroid.show(result, ToastAndroid.LONG);
    let needsPadding = false
    if(global.settingsCurrent!==undefined&&getSettingsString("settingsShowFAB")==="true"){
      needsPadding = true;
    }
    if(toast){
      toast.show(result[0], {type:result[1]===false?"success":"danger", 
        placement:'top',
        duration: result[1]===false?2000:5000, 
        renderType:{
          success: (toast) => (
            <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, marginRight: 20, borderRadius: 5, backgroundColor: colors.popupSuccess[global.darkMode], alignItems:"center", justifyContent:"center"}}>
              <TextFont translate={false} style={{color:"white", fontSize: 15}}>{toast.message}</TextFont>
            </View>
          ),
          danger: (toast) => (
            <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, marginRight: 20, borderRadius: 5, backgroundColor: colors.popupDanger[global.darkMode], alignItems:"center", justifyContent:"center"}}>
              <TextFont translate={false} style={{color:"white", fontSize: 15}}>{toast.message}</TextFont>
            </View>
          )
        }
      })
    }
  }

  openDrawer(vibrate=true) {
    if(this.state.loaded){
      this.sideMenu?.openDrawer();
      getSettingsString("settingsEnableVibrations")==="true"&&vibrate ? Vibration.vibrate(8) : "";
    }
    return true;
  }

  setPage(pageNum, previousAdd=true, propsPassed="") {
    if(propsPassed==="force refresh"){
      if(previousAdd){
        this.lastPage.push(this.state.currentPage);
        this.lastPropsPassed.push(this.state.propsPassed);
      }
      if(this.lastPage.length>1){
        this.setState({currentPage: pageNum, propsPassed: propsPassed});
      }
    }
    if(propsPassed==="from wishlist page" && this.wishlistPopupInfo){
      this.wishlistPopupInfo?.setPopupVisible(true)
    }
    // console.log(this.lastPropsPassed)
    if(this.state.loaded){
      if(this.state.currentPage!==pageNum){
        if(previousAdd){
          this.lastPage.push(this.state.currentPage);
          this.lastPropsPassed.push(this.state.propsPassed);
        }
        if(this.lastPage.length>1){
          this.setState({currentPage: pageNum, propsPassed: propsPassed});
        }
      }
      setTimeout(()=>{
        this.sideMenu?.closeDrawer();
      },2)
      this.fab?.updateFAB(pageNum)
    }
    RootNavigation.navigate("Home");
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
      let maxWidth = 10
      if(Dimensions.get('window').width > Dimensions.get('window').height)
        maxWidth = Dimensions.get('window').height*0.9
      else
        maxWidth = Dimensions.get('window').width*0.9
      return <>
        <View style={{position: "absolute", backgroundColor: colors.background[Appearance.getColorScheme()==="light" ? 0 : 1], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
        <View style={{alignItems:"center", justifyContent:"center",backgroundColor: colors.background[Appearance.getColorScheme()==="light" ? 0 : 1], width:Dimensions.get('window').width, height:Dimensions.get('window').height*0.85}}>
          <Animated.View entering={FadeIn.duration(400)}>
            <LottieView autoPlay loop style={{width: maxWidth,zIndex:1,transform: [{ scale: 1.3 },],}} source={chosenSplashScreen}/>
          </Animated.View>
        </View>
        <PopupRawLoading ref={(popupLoading) => this.popupLoading = popupLoading}/>
      </>
    } else if (this.state.firstLogin==="true"){
      return <GestureHandlerRootView style={{flex:1,backgroundColor: "#000000"}}>
        <Onboard setFirstLogin={this.setFirstLogin}/>
      </GestureHandlerRootView>
    } else {
      var currentPageView;
      if (this.state.currentPage===0){
        currentPageView = <Animated.View entering={FadeIn.duration(400)}><HomePage propsPassed={this.state.propsPassed} sections={this.sections} sectionsOrder={this.sectionsOrder} eventSections={this.eventSections} setPage={this.setPage}/></Animated.View>
      } else if (this.state.currentPage===1){
        currentPageView = <AllItemsPage setPage={this.setPage}/>
      } else if(this.state.currentPage===2){
        currentPageView = <MuseumPage selectedTab={this.state.propsPassed}/>
      } else if (this.state.currentPage===3){
        currentPageView = <ItemsPage selectedTab={this.state.propsPassed}/>
      } else if (this.state.currentPage===4){
        currentPageView = <SongsPage/>
      } else if (this.state.currentPage===5){
        currentPageView = <EmoticonsPage/>
      } else if (this.state.currentPage===6){
        currentPageView = <CraftingPage/>
      } else if (this.state.currentPage===7){
        currentPageView = <MysteryIslandsPage/>
      } else if (this.state.currentPage===8){
        currentPageView = <VillagersPage setPage={this.setPage} propsPassed={this.state.propsPassed}/>
      } else if (this.state.currentPage===9){
        currentPageView = <ConstructionPage/>
      } else if (this.state.currentPage===10){
        currentPageView = <FlowerPage setPage={this.setPage}/>
      } else if (this.state.currentPage===11){
        currentPageView = <CardsPage/>
      } else if (this.state.currentPage===12){
        currentPageView = <CatalogPage setPage={this.setPage}/>
      } else if (this.state.currentPage===13){
        currentPageView = <SettingsPage updateSettings={this.updateSettings} setPage={this.setPage}/>
      } else if (this.state.currentPage===14){
        currentPageView = <CreditsPage/>
      } else if (this.state.currentPage===15){
        currentPageView = <GuidePage openMenu={this.openDrawer} propsPassed={this.state.propsPassed}/>
      } else if (this.state.currentPage===16){
        currentPageView = <CalendarPage setPage={this.setPage}/>
      } else if (this.state.currentPage===17){
        currentPageView = <NewItemsPage setPage={this.setPage}/>
      } else if (this.state.currentPage===18){
        currentPageView = <WishlistPage setPage={this.setPage}/>
      } else if (this.state.currentPage===19){
        currentPageView = <AchievementsPage/>
      } else if (this.state.currentPage===20){
        currentPageView = <VillagerPresentsPage setPage={this.setPage} villager={this.state.propsPassed}/>
      } else if (this.state.currentPage===21){
        currentPageView = <ObtainableItemsPage setPage={this.setPage}/>
      } else if (this.state.currentPage===22){
        currentPageView = <VillagerFurniture villager={this.state.propsPassed}/>
      } else if (this.state.currentPage===23){
        currentPageView = <CustomFiltersPage currentFiltersSearchFor={this.state.propsPassed} titlePassed={this.state.propsPassed} setPage={this.setPage}/>
      } else if (this.state.currentPage===24){
        currentPageView = <VillagersCompatibilityPage setPage={this.setPage}/>
      } else if (this.state.currentPage===25){
        currentPageView = <ProfilesPage setPage={this.setPage} loadProfileData={this.loadProfileData}/>
      } else if (this.state.currentPage===26){
        currentPageView = <ProfileCurrentPage setPage={this.setPage}/>
      } else if (this.state.currentPage===27){
        currentPageView = <AmiiboPage setPage={this.setPage}/>
      } else if (this.state.currentPage===28){
        currentPageView = <MeteoNookPage setPage={this.setPage}/>
      } else if (this.state.currentPage===29){
        currentPageView = <ActiveCreaturesPage/>
      } else if (this.state.currentPage===30){
        currentPageView = <BackupPage/>
      } else if (this.state.currentPage===31){
        currentPageView = <TVGuidePage/>
      } else if (this.state.currentPage===32){
        currentPageView = <OrdinancePage/>
      } else if (this.state.currentPage===33){
        currentPageView = <GyroidsPage/>
      } else if (this.state.currentPage===34){
        currentPageView = <CraftableItemsPage material={this.state.propsPassed}/>
      } else if (this.state.currentPage===35){
        currentPageView = <ParadisePlanningPage setPage={this.setPage}/>
      } else if (this.state.currentPage===36){
        currentPageView = <VillagerFurnitureParadisePlanning request={this.state.propsPassed}/>
      } else if (this.state.currentPage===37){
        currentPageView = <VillagerPhotoPoster villager={this.state.propsPassed}/>
      } else if (this.state.currentPage===38){
        currentPageView = <TodoReorderPage todos={this.state.propsPassed}/>
      } else if (this.state.currentPage===39){
        currentPageView = <DonatePage />
      } else if (this.state.currentPage===40){
        currentPageView = <IngredientsPage baseItem={this.state.propsPassed}/>
      }  else if (this.state.currentPage===41){
        currentPageView = <PhotosPostersPage setPage={this.setPage}/>
      } else {
        currentPageView = <Text>Default</Text>
      }

      let otherComponents = <>
        <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
        <StatusBar translucent={false} hidden={getSettingsString("settingsShowStatusBar")==="false"} backgroundColor={colors.background[global.darkMode]} barStyle={global.darkMode===1?"light-content":"dark-content"}/>
      </>

      const NavigatorHomePage = ()=><>{otherComponents}{currentPageView}</>
      const NavigatorVillagerPresentsPage = ({route, navigation})=>{return <VillagerPresentsPage setPage={this.setPage} villager={route.params.propsPassed}/>}
      const NavigatorCustomFiltersPage = ({route, navigation})=>{return <CustomFiltersPage currentFiltersSearchFor={route.params.propsPassed} titlePassed={route.params.propsPassed} setPage={this.setPage}/>}
      const NavigatorVillagerFurniture = ({route, navigation})=>{return <VillagerFurniture villager={route.params.propsPassed}/>}
      const NavigatorVillagerPhotoPoster = ({route, navigation})=>{return <VillagerPhotoPoster villager={route.params.propsPassed}/>}
      const NavigatorCraftableItemsPage = ({route, navigation})=>{return <CraftableItemsPage material={route.params.propsPassed}/>}
      const NavigatorVillagerFurnitureParadisePlanning = ({route, navigation})=>{return <VillagerFurnitureParadisePlanning request={route.params.propsPassed}/>}
      const NavigatorBrowserPage = ({route, navigation})=>{return <BrowserPage page={route.params.propsPassed} languageMessage={"You can change the language at the bottom of the page, by tapping Language"} splashImage={require('./assets/icons/turnip.png')} splashText={"Turnip Prophet"} splashCredits={"By mikebryant"}/>}
      const NavigatorGlobalSearchPage = ({route, navigation})=>{return <GlobalSearchPage currentSearch={route.params.propsPassed} setPage={this.setPage}/>}
      const NavigatorTodoReorderPage = ({route, navigation})=>{return <TodoReorderPage todos={route.params.propsPassed}/>}
      const NavigatorIngredientsPage = ({route, navigation})=>{return <IngredientsPage baseItem={route.params.propsPassed}/>}
      const NavigatorCalendarPage = ({route, navigation})=>{return <CalendarPage setPage={this.setPage} {...route.params}/>}
      const NavigatorCalendarView = ({route, navigation})=>{return <CalendarView setPage={this.setPage} {...route.params}/>}
      const NavigatorAllEventsList = ({route, navigation})=>{return <AllEventsList setPage={this.setPage} {...route.params}/>}

      console.log("Current page: " + this.state.currentPage)

      let theme = {
        ...DefaultTheme,
        mode:"exact",
        colors:{
          background:"#00000000",
          accent:"#00000000",
          primary:"#00000000",
          surface:"#00000000",
          backdrop:"#00000000",
          onSurface:"#00000000",
        },
        animation: {scale: global.reducedMotion ? 0 : 1},
      }
      return (
        <GestureHandlerRootView style={{flex:1,backgroundColor: "#000000"}}>
          <SideMenu ref={(sideMenu) => this.sideMenu = sideMenu} setPage={this.setPage} currentPage={this.state.currentPage} sideMenuSections={this.sideMenuSections} sideMenuSectionsDisabled={this.sideMenuSectionsDisabled}>
            <Provider theme={theme}>
              <NavigationContainer ref={navigationRef} theme={{colors: {background: colors.background[global.darkMode],},}}>
                <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false, headerTransparent: true, animation: global.reducedMotion==true ? 'fade' : 'default'}}>
                  <Stack.Screen name="Home" component={NavigatorHomePage} />
                  <Stack.Screen name="20" component={NavigatorVillagerPresentsPage}/>
                  <Stack.Screen name="22" component={NavigatorVillagerFurniture}/>
                  <Stack.Screen name="37" component={NavigatorVillagerPhotoPoster}/>
                  <Stack.Screen name="23" component={NavigatorCustomFiltersPage}/>
                  <Stack.Screen name="34" component={NavigatorCraftableItemsPage}/>
                  <Stack.Screen name="36" component={NavigatorVillagerFurnitureParadisePlanning}/>
                  <Stack.Screen name="38" component={NavigatorTodoReorderPage}/>
                  <Stack.Screen name="40" component={NavigatorIngredientsPage}/>
                  <Stack.Screen name="BrowserPage" component={NavigatorBrowserPage}/>
                  <Stack.Screen name="GlobalSearchPage" component={NavigatorGlobalSearchPage}/>
                  <Stack.Screen name="CalendarPage" component={NavigatorCalendarPage}/>
                  <Stack.Screen name="CalendarView" component={NavigatorCalendarView}/>
                  <Stack.Screen name="AllEventsList" component={NavigatorAllEventsList}/>
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
            <PopupInfos setPage={this.setPage}/>
            <Popup
              ref={(wishlistPopupInfo) => this.wishlistPopupInfo = wishlistPopupInfo}
              button1={"OK"}
              button1Action={()=>{}}
              textLower={"Long press items to add them to your wishlist."}
            />
          </SideMenu>
          <FABWrapper ref={(fab) => this.fab = fab} openDrawer={this.openDrawer}/>
          <Toast ref={(ref) => global['toast'] = ref} animationDuration={global.reducedMotion ? 0 : 250}/>
        </GestureHandlerRootView>
      );
    }
  }
}

class PopupInfos extends Component {
  getPurchases = async () => {
    const { responseCode, results } = await InAppPurchases.getPurchaseHistoryAsync()
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      const output = []
      for(let result of results){
        output.push(result["productId"])
      }
      return output
    } else {
      return []
    }
  }

  async componentDidMount(){
    try {
      await InAppPurchases.connectAsync();
    } catch (e) {
      console.log(e.toString())
    }
  
    setTimeout(async ()=>{
      const numLogins = parseInt(await getStorage("numLogins","0"))+1;
      const numLoginsOffset = JSON.parse(await getStorage("numLoginsOffset",JSON.stringify([global.version,1])));
      if(numLoginsOffset[0]===global.version){
        if(numLoginsOffset[1]>=1){
          console.log("num logins:"+numLogins.toString())
          
          setTimeout(async ()=>{
            const purchases = await this.getPurchases()
          
            if((numLogins+1) % 15 === 0 && purchases.length <= 0){
              if(Math.floor(global.randomGlobal * 3)===0){
                this.popupSupport1?.setPopupVisible(true)
              } else if (Math.floor(global.randomGlobal * 3)===1){
                this.popupSupport2?.setPopupVisible(true)
              } else if (Math.floor(global.randomGlobal * 3)===2){
                this.popupSupport3?.setPopupVisible(true)
              }
            } else {
              let ratingDismissed = await getStorage("ratingDismissed","false");
              let backupPopupDismissed2 = await getStorage("backupPopupDismissed2","false");
              if(ratingDismissed==="false" && numLogins >= 28){
                AsyncStorage.setItem("ratingDismissed", "true");
                this.popupRating?.setPopupVisible(true)
              } else if(backupPopupDismissed2==="false" && numLogins >= 14){
                AsyncStorage.setItem("backupPopupDismissed2", "true");
                this.popupBackup2?.setPopupVisible(true)
              }
            }
          }, 2)
          
        }
        AsyncStorage.setItem("numLoginsOffset", JSON.stringify([global.version,numLoginsOffset[1]+1]));
      } else {
        AsyncStorage.setItem("numLoginsOffset", JSON.stringify([global.version,1]));
      }
      
      // let backupPopupDismissed = await getStorage("backupPopupDismissed","false");
      let backupPopupDismissed = await getStorage("backupPopupDismissed","false");
      if(backupPopupDismissed==="false" && numLogins >= 7){
        AsyncStorage.setItem("backupPopupDismissed", "true");
        this.popupBackup?.setPopupVisible(true)
      }
      if(numLogins===4){
        this.popupRating?.setPopupVisible(true)
      }
      // console.log("numlogins:"+numLogins)
      await AsyncStorage.setItem("numLogins", numLogins.toString());

      if(Device.deviceYearClass!==undefined && Device.deviceYearClass!==null && Device.deviceYearClass<=2014 && (await getStorage("improvePerformancePopupDismissed","false"))==="false" && getSettingsString("settingsLowEndDevice")==="false" && numLogins>1){
        AsyncStorage.setItem("improvePerformancePopupDismissed", "true");
        this.popupImprovePerformance?.setPopupVisible(true)
      }
    },0)
  }

  render(){
    return <>
      <PopupRating ref={(popupRating) => this.popupRating = popupRating}/>
      <Popup ref={(popupImprovePerformance) => this.popupImprovePerformance = popupImprovePerformance} text="Improve Performance" textLower="To increase app performance, consider enabling the [Battery saver / Increase performance] setting." button1={"Enable"} button1Action={()=>{setSettingsString("settingsLowEndDevice","true");}} button2={"Not now"} button2Action={()=>{}}/>
      <Popup mailLink={true} ref={(popupBackup) => this.popupBackup = popupBackup} text="Data Backup" textLower="You can now backup your data to the cloud and enable auto backups in the settings." button1={"Go to page"} button1Action={()=>{this.props.setPage(30)}} button2={"Cancel"} button2Action={()=>{}}/>
      <Popup mailLink={true} ref={(popupBackup2) => this.popupBackup2 = popupBackup2} text="Data Backup" textLower="Don't forget to keep periodic backups of your data!" button1={"Go to page"} button1Action={()=>{this.props.setPage(30)}} button2={"Cancel"} button2Action={()=>{}}/>
      <Popup margin support2={true} noDismiss ref={(popupSupport1) => this.popupSupport1 = popupSupport1} text="Buy me a Coffee" textLower={attemptToTranslate("If you enjoy this free app, buy the developer a coffee!") + " ☕"} button1={"Sure!"} button1Action={()=>{this.props.setPage(39)}} button2={"No Thanks"} button2Action={()=>{}}/>
      <Popup margin support2={true} noDismiss ref={(popupSupport2) => this.popupSupport2 = popupSupport2} text="Leave a Tip" textLower={attemptToTranslate("Support the app to keep it ad free for all") + " 😄"} button1={"Sure!"} button1Action={()=>{this.props.setPage(39)}} button2={"No Thanks"} button2Action={()=>{}}/>
      <Popup margin support2={true} noDismiss ref={(popupSupport3) => this.popupSupport3 = popupSupport3} text="Support the Developer" textLower={attemptToTranslate("Support the app and the developer's post secondary education tuition") + " 🎓😄"} button1={"Sure!"} button1Action={()=>{this.props.setPage(39)}} button2={"No Thanks"} button2Action={()=>{}}/>
    </>
  }
}

export default App;