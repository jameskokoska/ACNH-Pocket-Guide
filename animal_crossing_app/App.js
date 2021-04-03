import React, {useRef, Component} from 'react';
import {Vibration, BackHandler, Button, Image, ScrollView, Dimensions, Text, View, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
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
import AchievementsPage from "./pages/AchievementsPage"
import VillagerPresentsPage from "./pages/VillagerPresentsPage"
import ObtainableItemsPage from "./pages/ObtainableItemsPage"
import { NavigationContainer, DrawerActions, CommonActions, DefaultTheme} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';

//expo build:android -t app-bundle
//expo build:android -t apk
const appInfo = require("./app.json");
global.version = appInfo["expo"]["version"];
global.versionCode = appInfo["expo"]["android"]["versionCode"];

global.gameVersion = "1.9.0";
global.changelog = `
-Big update this time!
-Added event notifications!
-Added Visitors section - this will help you predict and keep track of who will visit next
-Added Visitors history
-Re-created the Events section
-Day of the week is now used instead of month
-More events displayed!
-Customize which events are shown and which notifications to get, go to [Edit Events] in the [Events] section of the home page
-Navigating between pages is considerably faster!
-Back button navigation is better
-Increased loading times significantly!
-
-Added recipes collection progress
-Can zoom in on artwork - tap the artwork in the popup and pinch to zoom
-
-Cleaner villagers section in profile
-Pushed all information in a popup in obtainable items page
-Color fixes
-Long press a to-do item to remove it
-
-Thanks for 5K downloads... that's incredible!
-Big update this time!
-Added way to see what DIYs and Reactions you can get from your current villagers
-Added way to see what DIYs and Reactions you cannot get from your villagers
-Added new [Obtainable Items] page
-Added information about this under the profile section on the home screen
-Added museum descriptions to museum items popup
-Added furniture size icons to items popup
-Updated game data
-Improved loading times of lists
-Accented characters are ignored in search
-Show/Hide turnip log moved to [Edit sections]
-Can set Dream Address and Friend Code in profile
-These sections can be hidden in [Edit Sections]
-Can set your island fruit in profile
-Delete saved/downloaded images button in settings (to reclaim storage space)
-Added more translations
-Changed design of buttons
-Fix back button crash on launch
-Added haptic feedback to [Edit Sections]
-Fixes to [Edit Sections]
-More color fixes
-Removed useless code to reduce file size
-Bug fixes to home screen
-Fixed searching DIYs in Everything page
-Added NookLink exchange prices and icons
-Fixed purchasing and selling prices mixup in popups
-Main changelog is shorter, moved longer one to About page 
-
-Past changes:
-
-Color fixes
-Better headers for Achievements and Events page
-Customizable home screen sections
-Added more translations
-Updated calendar data to align with new data parameters
-Removed list only active creatures setting, this can now be done through filters
-Homepage has a better fade transition
-
-Added villager gift guide!
-Open a villagers popup and click [View Gifts] to see a list
-Can now search wishlist
-Can now search new items page
-Updated filters
-Filters and searching now apply together
-Performance improvements for filters
-Filters should not overlap buttons anymore
-Updated translations
-Made it easier for me to keep the app updated with new data and new filters
-Added subtle achievements stamp animation
-Fixed achievements stamp loading
-Added missing modifiers in addition to nouns in achievements page
-Settings popup descriptions are improved
-Check marks now properly sync with variations
-Added ability to filter what villagers can wear in gift guide
-Fixed crashes associated to villager gift guide
-A restart is required when you change languages, rewrote the way translations are applied - for efficiency
-
-Added achievements page!
-Fixed translations, critical text bug
-Fixed mystery islands visited not properly saving
-Added [Highlight furniture with non-craftable variations] setting and filter. Useful for completing your catalog!
-
-You can sort things alphabetically, option in settings
-Reworked how items are checked off/saved to wishlist
-Loading should now be faster
-Added more translations
-Fixes to progress bar and wishlist
-Formatting fixes
-
-Added wishlist. Long press any item to add it to the wishlist!
-Variations are now checked off within an item
-Long press a variation for a larger image view
-Removed confusing variation settings
-Added NPC translations
-Fixed wishlist bugs
-
-Added [New Items] page. Go here to see all the new items that were recently added in the new update
-Fixed crafting materials translations
-Fixed current villagers on home screen
-Fixed 24 hour times not displayed correctly
-Filter translation support
-
-Can set language in settings
-French language translation supported, thanks Christophe!
-Note: translations only apply to items, apart from supported translated languages
-Images are now downloaded, can be used offline (can be disabled in settings)
`

enableScreens();
const Drawer = createDrawerNavigator();
global.settingsUpdated = false;

class App extends Component {
  constructor() {
    super();
    this.numLogins;
    this.state = {
      loaded: false,
      drawerEdgeWidth:0
    }
    this.previousPage = "";
    this.edgeWidth = 100;
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

  handleBackButton = ()=>{
    this.openDrawer(false);
    return true;
  }

  async componentDidMount(){
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    this.navigationRef.addListener(
      'state',
      payload => {
        if(this.getCurrentPage()!==this.previousPage && global.settingsUpdated){
          if(this.navigationRef){
            this.navigationRef?.resetRoot({
              index: 0,
              routes: [{ name: this.getCurrentPage() }],
            });
          }
          global.settingsUpdated=false;
        } 

        if(this.getCurrentPage()!==this.previousPage){
          if(this.getCurrentPage()==="GuidePage"){
            this.setState({fab:<View/>})
          } else if(this.getCurrentPage()==="CalendarPage"){
            this.setState({fab:<FAB openDrawer={this.openDrawer} offset={30}/>})
          } else {
            this.setState({fab:<FAB openDrawer={this.openDrawer}/>})
          }
        }

        if(this.previousPage==="Onboard"){
          this.setState({
            drawerEdgeWidth:this.edgeWidth,
            firstLogin:"false"
          });
        }

        this.previousPage = this.getCurrentPage();
      }
    );

    this.mounted = true;
    // await AsyncStorage.setItem("firstLogin", "true");

    const firstLogin = await getStorage("firstLogin","true");
    const numLogins = parseInt(await getStorage("numLogins","0")) + 1;
    await AsyncStorage.setItem("numLogins", numLogins.toString());
    this.numLogins = numLogins;
    // console.log(numLogins)
    global.collectionList = (await getStorage("collectedString","")).split("\n");
    console.log(global.collectionList)

    global.name = await getStorage("name","");
    global.islandName = await getStorage("islandName","");
    global.dreamAddress = await getStorage("dreamAddress","");
    global.friendCode = await getStorage("friendCode","");
    global.selectedFruit = await getStorage("selectedFruit","");
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
        loaded:true,
        drawerEdgeWidth:firstLogin==="true"?0:this.edgeWidth,
        firstLogin:firstLogin,
      });
    }
    if(firstLogin==="true"){
      this.setPage("Onboard")
    } else {
      if(this.navigationRef){
        this.navigationRef?.resetRoot({
          index: 0,
          routes: [{ name: "HomePage" }],
        });
      }
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

  getCurrentPage = () => {
    return this.navigationRef?this.navigationRef.getCurrentRoute().name:"HomePage";
  }

  updateSettings = () =>{
    this.updateDarkMode();
    var fab;
    if(global.settingsCurrent!==undefined&&getSettingsString("settingsShowFAB")==="true"){
      fab = <FAB openDrawer={this.openDrawer}/>;
    } else {
      fab = <View/>;
    }
    this.setState({fab:fab})
  }

  openDrawer = (vibrate=true)=>{
    if(this.state.loaded){
      this.navigationRef.dispatch(DrawerActions.openDrawer());
      getSettingsString("settingsEnableVibrations")==="true"&&vibrate ? Vibration.vibrate(8) : "";
    }
    return true;
  }

  setPage = (pageName) => {
    console.log(pageName)
    if(this.state.loaded){
      this.navigationRef?.resetRoot({
        index: 0,
        routes: [{ name: pageName }],
      });
    }
    return true;
  }

  render(){
    const theme = {
      colors: {
        background: colors.background[global.darkMode],
      },
    };
    return (
      <> 
        <View style={{position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
        <NavigationContainer theme={theme} ref={(navigationRef) => this.navigationRef = navigationRef}>
          <Drawer.Navigator options={{headerShown:false}} drawerContent={(props)=>this.state.loaded?<SideMenu ref={(sideMenu) => this.sideMenu = sideMenu} setPage={this.setPage} currentPage={this.navigationRef?this.navigationRef.getCurrentRoute().name:"HomePage"}/>:<View/> } initialRouteName="Loading" edgeWidth={this.state.drawerEdgeWidth} drawerType={'slide'}>
            <Drawer.Screen name="Loading" component={PageLoading} />
            <Drawer.Screen name="Onboard" component={PageOnboard} />
            <Drawer.Screen name="HomePage" component={PageHomePage} />
            <Drawer.Screen name="AllItemsPage" component={PageAllItemsPage} />
            <Drawer.Screen name="MuseumPage" component={PageMuseumPage} />
            <Drawer.Screen name="ItemsPage" component={PageItemsPage} />
            <Drawer.Screen name="SongsPage" component={PageSongsPage} />
            <Drawer.Screen name="EmoticonsPage" component={PageEmoticonsPage} />
            <Drawer.Screen name="CraftingPage" component={PageCraftingPage} />
            <Drawer.Screen name="MysteryIslandsPage" component={PageMysteryIslandsPage} />
            <Drawer.Screen name="VillagersPage" component={PageVillagersPage} />
            <Drawer.Screen name="ConstructionPage" component={PageConstructionPage} />
            <Drawer.Screen name="FlowersPage" component={PageFlowersPage} />
            <Drawer.Screen name="CardsPage" component={PageCardsPage} />
            <Drawer.Screen name="CatalogPage" component={PageCatalogPage} />
            <Drawer.Screen name="SettingsPage" component={this.PageSettingsPage} />
            <Drawer.Screen name="CreditsPage" component={PageCreditsPage} />
            <Drawer.Screen name="GuidePage" component={PageGuidePage} />
            <Drawer.Screen name="CalendarPage" component={PageCalendarPage} />
            <Drawer.Screen name="NewItemsPage" component={PageNewItemsPage} />
            <Drawer.Screen name="WishlistPage" component={PageWishlistPage} />
            <Drawer.Screen name="AchievementsPage" component={PageAchievementsPage} />
            <Drawer.Screen name="VillagerPresentsPage" component={PageVillagerPresentsPage} />
            <Drawer.Screen name="ObtainableItemsPage" component={PageObtainableItemsPage} />
          </Drawer.Navigator>
        </NavigationContainer>
        {this.state.loaded?<StatusBar hidden={getSettingsString("settingsShowStatusBar")==="false"} backgroundColor="#1c1c1c" style="light" />:<View/>}
        {this.state.loaded&&this.state.firstLogin!=="true"?<>
          <PopupChangelog/>
          <PopupRating numLogins={this.numLogins}/>
          {this.state.fab}
        </>:<View/>}
      </>
    );
  }

  PageSettingsPage = ({route, navigation}) => {
    return(
      <SettingsPage navigation={navigation} saveSettingsPosition={this.saveSettingsPosition} updateSettings={this.updateSettings} setPage={(pageName)=>navigation.navigate(pageName)}/>
    )
  }
}
export default App;

function PageLoading(){
  var splashScreens = [require('./assets/airplane.json'),require('./assets/balloon.json')];
  var chosenSplashScreen = splashScreens[Math.floor(Math.random() * splashScreens.length)];
  return (
    
      <View style={{alignItems:"center", justifyContent:"center",backgroundColor: "#00000000", width:Dimensions.get('window').width, height:Dimensions.get('window').height*0.9}}>
        <FadeInOut fadeIn={true}>
          <LottieView autoPlay loop style={{width: "95%",zIndex:1,transform: [{ scale: 1.25 },],}} source={chosenSplashScreen}/>
        </FadeInOut>
      </View>
  )
}

function PageOnboard({route, navigation}){
  return (
    <>
      <Onboard navigation={navigation} setPage={(pageName)=>navigation.navigate(pageName)}/>
    </>
  )
}

function PageHomePage({route, navigation}) {
  return(
    <FadeInOut fadeIn={true}><HomePage navigation={navigation} setVillagerGift={(villager)=>navigation.navigate("VillagerPresentsPage",{villager:villager})} setPage={(pageName)=>navigation.navigate(pageName)}/></FadeInOut>
  )
}

function PageAllItemsPage({route, navigation}) {
  return(
    <AllItemsPage setVillagerGift={(villager)=>navigation.navigate("VillagerPresentsPage",{villager:villager})}/>
  )
}

function PageMuseumPage() {
  return(
    <MuseumPage/>
  )
}

function PageItemsPage() {
  return(
    <ItemsPage/>
  )
}

function PageSongsPage() {
  return(
    <SongsPage/>
  )
}

function PageEmoticonsPage() {
  return(
    <EmoticonsPage/>
  )
}

function PageCraftingPage() {
  return(
    <CraftingPage/>
  )
}

function PageMysteryIslandsPage() {
  return(
    <MysteryIslandsPage/>
  )
}

function PageVillagersPage({route, navigation}) {
  return(
    <VillagersPage setVillagerGift={(villager)=>navigation.navigate("VillagerPresentsPage",{villager:villager})}/>
  )
}

function PageConstructionPage() {
  return(
    <ConstructionPage/>
  )
}

function PageFlowersPage() {
  return(
    <FlowerPage/>
  )
}

function PageCardsPage() {
  return(
    <CardsPage/>
  )
}

function PageCatalogPage() {
  return(
    <CatalogPage/>
  )
}

function PageCreditsPage() {
  return(
    <CreditsPage/>
  )
}

function PageGuidePage({route, navigation}) {
  return(
    <GuidePage navigation={navigation} openMenu={()=>{navigation.openDrawer()}}/>
  )
}

function PageCalendarPage() {
  return(
    <CalendarPage/>
  )
}

function PageNewItemsPage({route, navigation}) {
  return(
    <NewItemsPage setVillagerGift={(villager)=>navigation.navigate("VillagerPresentsPage",{villager:villager})}/>
  )
}

function PageWishlistPage({route, navigation}) {
  return(
    <WishlistPage setVillagerGift={(villager)=>navigation.navigate("VillagerPresentsPage",{villager:villager})} setPage={(pageName)=>navigation.navigate(pageName)}/>
  )
}

function PageAchievementsPage() {
  return(
    <AchievementsPage/>
  )
}

function PageVillagerPresentsPage({ route, navigation }) {
  return(
    <VillagerPresentsPage villager={route.params.villager}/>
  )
}

function PageObtainableItemsPage({route, navigation}) {
  return(
    <ObtainableItemsPage setPage={(pageName)=>navigation.navigate(pageName)}/>
  )
}
