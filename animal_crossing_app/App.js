import React, {Component} from 'react';
import {Vibration, BackHandler, Dimensions, Text, View, StatusBar, ToastAndroid} from 'react-native';
import FAB, { FABWrapper } from './components/FAB';
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
import ProfilesPage from './pages/ProfilesPage';
import CraftingPage from './pages/CraftingPage';
import FadeInOut from './components/FadeInOut';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import CreditsPage from './pages/CreditsPage';
import FlowerPage from './pages/FlowerPage';
import CardsPage from './pages/CardsPage';
import {getDefaultLanguage, getStorage,getSettingsString, settings, loadGlobalData} from './LoadJsonData';
import Onboard from './pages/Onboard';
import colors from './Colors.js';
import * as Font from 'expo-font';
import PopupRating from './components/PopupRating'
import { Appearance } from 'react-native-appearance';
import SideMenu, { sideSections } from './components/SideMenu'
import GuidePage from './pages/GuidePage';
import MeteoNookPage from './pages/MeteoNookPage';
import ActiveCreaturesPage from './pages/ActiveCreaturesPage';
import NewItemsPage from "./pages/NewItemsPage"
import WishlistPage from "./pages/WishlistPage"
import AchievementsPage from "./pages/AchievementsPage"
import VillagerPresentsPage from "./pages/VillagerPresentsPage"
import VillagerFurniture from "./pages/VillagerFurniture"
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
import Popup from './components/Popup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RootNavigation';
import * as RootNavigation from './RootNavigation.js';

//expo build:android -t app-bundle
//expo build:android -t apk
const appInfo = require("./app.json");
global.version = appInfo["expo"]["version"];
global.versionCode = appInfo["expo"]["android"]["versionCode"];
const Stack = createNativeStackNavigator();

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
    global.name = await getStorage("name"+global.profile,"");
    global.islandName = await getStorage("islandName"+global.profile,"");
    global.dreamAddress = await getStorage("dreamAddress"+global.profile,"");
    global.friendCode = await getStorage("friendCode"+global.profile,"");
    global.creatorCode = await getStorage("creatorCode"+global.profile,"");
    global.selectedFruit = await getStorage("selectedFruit"+global.profile,"");
    global.customTimeOffset = await getStorage("customDateOffset"+global.profile,"0");
    console.log(global.collectionList)
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
    setTimeout(async () => {
    this.mounted = true;
    // await AsyncStorage.setItem("firstLogin", "true");

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButton,
    );

    const firstLogin = await getStorage("firstLogin","true");
    global.profile = await getStorage("selectedProfile","");
    await this.loadProfileData(global.profile);
    var defaultLanguage = getDefaultLanguage();
    global.language = await getStorage("Language",defaultLanguage);
    
    //Load Global Data
    await loadGlobalData();

    //Load Settings
    await this.loadSettings();

    this.updateSettings();

    //Load Fonts
    await Font.loadAsync({
      "ArialRounded": require('./assets/fonts/arialRound.ttf'),
    });
    await Font.loadAsync({
      "ArialRoundedBold": require('./assets/fonts/arialRoundBold.ttf'),
    });

    //load home screen sections
    const defaultSections = {
      "Events" : true,   
      "To-Do" : true,
      "Turnip Log" : true,
      "Visitors" : true,
      "Collection" : false,
      "Profile" : false,
      "Loan Tracking" : true,
      "Store Hours" : true,
      // "Active Creatures" : true,
    }
    this.sections = await this.loadSections("Sections", defaultSections);
    const defaultSectionsOrder = [
      {"name":"Events"},
      {"name":"To-Do"},
      {"name":"Turnip Log"},
      {"name":"Visitors"},
      {"name":"Collection"},
      {"name":"Profile"},
      {"name":"Loan Tracking"},
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
      "Nook Shopping Events" : false,
      "Shopping Seasons" : false,
      "Event Ready Days" : false,
      "Zodiac Seasons" : false,
      "Break2" : true,
      "Show End Day of Events" : true,
      "Show All Events Happening Today" : false,
    }
    this.eventSections = await this.loadSections("EventSections", defaultEventSections);
    
    this.sideMenuSections = await this.loadList("SideMenuSections", sideSections, "displayName")
    this.sideMenuSectionsDisabled = JSON.parse(await getStorage("SideMenuSectionsDisabled","[]"))

    if(this.mounted){
      this.setState({
        firstLogin: firstLogin,
        loaded:true,
      });
    }
    if(getSettingsString("settingsAutoBackup")==="true"){
      this.startAutoBackup();
    }
    }, 10);
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
    //For Guide page
    if(!this.state.loaded){
      return true
    }else if(this.state.firstLogin==="true"){
      return true;
    } else if(this.state.currentPage===15){
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
    console.log(result)
    ToastAndroid.show(result, ToastAndroid.LONG);
  }

  openDrawer(vibrate=true) {
    if(this.state.loaded){
      this.sideMenu?.openDrawer();
      getSettingsString("settingsEnableVibrations")==="true"&&vibrate ? Vibration.vibrate(8) : "";
    }
    return true;
  }

  setPage(pageNum, previousAdd=true, propsPassed="") {
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
      this.sideMenu?.closeDrawer();
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
      return <>
      <View style={{position: "absolute", backgroundColor: colors.background[Appearance.getColorScheme()==="light" ? 0 : 1], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
      <View style={{alignItems:"center", justifyContent:"center",backgroundColor: colors.background[Appearance.getColorScheme()==="light" ? 0 : 1], width:Dimensions.get('window').width, height:Dimensions.get('window').height*0.85}}>
        <FadeInOut fadeIn={true}>
          <LottieView autoPlay loop style={{width: "95%",zIndex:1,transform: [{ scale: 1.25 },],}} source={chosenSplashScreen}/>
        </FadeInOut>
      </View>
      </>
    } else if (this.state.firstLogin==="true"){
      return <Onboard setFirstLogin={this.setFirstLogin}/>
    } else {
      var currentPageView;
      if (this.state.currentPage===0){
        currentPageView = <FadeInOut fadeIn={true}><HomePage sections={this.sections} sectionsOrder={this.sectionsOrder} eventSections={this.eventSections} setPage={this.setPage}/></FadeInOut>
      } else if (this.state.currentPage===1){
        currentPageView = <AllItemsPage setPage={this.setPage}/>
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
        currentPageView = <VillagersPage setPage={this.setPage}/>
      } else if (this.state.currentPage===9){
        currentPageView = <ConstructionPage/>
      } else if (this.state.currentPage===10){
        currentPageView = <FlowerPage setPage={this.setPage}/>
      } else if (this.state.currentPage===11){
        currentPageView = <CardsPage/>
      } else if (this.state.currentPage===12){
        currentPageView = <CatalogPage/>
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
      } else {
        currentPageView = <Text>Default</Text>
      }

      let otherComponents = <>
        <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
        <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
        <StatusBar hidden={getSettingsString("settingsShowStatusBar")==="false"} backgroundColor={colors.background[global.darkMode]} barStyle={global.darkMode===1?"light-content":"dark-content"}/>
      </>

      const NavigatorHomePage = ()=><>{otherComponents}{currentPageView}</>
      const NavigatorVillagerPresentsPage = ({route, navigation})=>{return <VillagerPresentsPage setPage={this.setPage} villager={route.params.propsPassed}/>}
      const NavigatorCustomFiltersPage = ({route, navigation})=>{return <CustomFiltersPage currentFiltersSearchFor={route.params.propsPassed} titlePassed={route.params.propsPassed} setPage={this.setPage}/>}
      const NavigatorVillagerFurniture = ({route, navigation})=>{return <VillagerFurniture villager={route.params.propsPassed}/>}

      return (
        <View style={{flex:1,backgroundColor: "#000000"}}>
        <SideMenu ref={(sideMenu) => this.sideMenu = sideMenu} setPage={this.setPage} currentPage={this.state.currentPage} sideMenuSections={this.sideMenuSections} sideMenuSectionsDisabled={this.sideMenuSectionsDisabled}>
          <NavigationContainer ref={navigationRef} theme={{colors: {background: colors.background[global.darkMode],},}}>
          <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={NavigatorHomePage} />
            <Stack.Screen name="20" component={NavigatorVillagerPresentsPage}/>
            <Stack.Screen name="22" component={NavigatorVillagerFurniture}/>
            <Stack.Screen name="23" component={NavigatorCustomFiltersPage}/>
          </Stack.Navigator>
          </NavigationContainer>
        <PopupInfos/>
        <FABWrapper ref={(fab) => this.fab = fab} openDrawer={this.openDrawer}/>
        </SideMenu>
        </View>
      );
    }
  }
}

class PopupInfos extends Component {
  async componentDidMount(){
    const numLogins = parseInt(await getStorage("numLogins","0"))+1;
    // this.tipDismissed = await getStorage("tipDismissed","false");
    let backupPopupDismissed = await getStorage("backupPopupDismissed","false");
    if(backupPopupDismissed==="false" && numLogins >= 12){
      AsyncStorage.setItem("backupPopupDismissed", "true");
      this.popupBackup?.setPopupVisible(true)
    }
    if(numLogins===5){
      this.popupRating?.setPopupVisible(true)
    }
    console.log("numlogins:"+numLogins)
    await AsyncStorage.setItem("numLogins", numLogins.toString());
    this.numLogins = numLogins;
  }
  render(){
    return <>
      <PopupRating ref={(popupRating) => this.popupRating = popupRating}/>
      <Popup mailLink={true} ref={(popupBackup) => this.popupBackup = popupBackup} text="Data Backup" textLower="You can now backup your data to the cloud and enable auto backups in the settings." button1={"Go to page"} button1Action={()=>{this.setPage(30)}} button2={"Cancel"} button2Action={()=>{}}/>
      {/* <PopupTip numLogins={this.numLogins} tipDismissed={this.tipDismissed}/> */}
    </>
  }
}

export default App;