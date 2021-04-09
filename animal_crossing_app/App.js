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
import VillagerFurniture from "./pages/VillagerFurniture"
import ObtainableItemsPage from "./pages/ObtainableItemsPage"
import CustomFiltersPage from "./pages/CustomFiltersPage"

//expo build:android -t app-bundle
//expo build:android -t apk
const appInfo = require("./app.json");
global.version = appInfo["expo"]["version"];
global.versionCode = appInfo["expo"]["android"]["versionCode"];

global.gameVersion = "1.9.0";
global.changelog = `
-Fixed timezone issue with events
-Fixed issue with special events and hemisphere (specifically the Bug-off)
-
-Added more Spanish translations
-Fixed dream address in French
-Fixed alphabetical sorting for accented words
-
-Empty check marks are now shown so you can check off items faster, disable this to slightly improve loading times
-You can tap a villagers birthday event to see details about that villager
-Added redirect/info popup to read more about gifts from gifts page and What are villager gifts popup
-Backup data now backups achievements and profile information too
-Fixed color displaying even though there is 'None' in different languages
-Fixed check mark sync on variations
-Filters don't attempt to load if the page does not have any filters
-Fixed K.K. slider event time
-Added Spanish translations, more coming soon
- Thanks Vicente and adrisniper7!
-Updated French translations
- Thanks Christophe!
-
-You can now view what items you can get from events by tapping them!
-Reworked how back button works - enable Back button to previous page
-Added Season/Event info in item popups
-Fixed crash to see villagers furniture that doesn't yet exist in the database
-Added not found error screen
-Added more redirects and info to ACNH Guide + FAQ page
-Fixed event highlighting on calendar page
-Reworked how the sidebar is loaded internally
-Fixed villagers furniture sometimes having wrong entries
-Fixed DIYs sometime displaying wrong selling price for the crafted item
-Updated translations
-Fixed villager name translation on home page
-
-Past changes:
-Color fixes for events
-Your villagers birthdays are now highlighted in the Events section
-24 hour time fixes
-Updated translations and changed how translations are handles for events
-Reordered which events are shown first of each day (in this order: Birthdays, Special events (special), Game events, Repeat events)
-
-Added event notifications!
-Added Visitors section - this will help you predict and keep track of who will visit next
-Added Visitors history
-Re-created the Events section
-Day of the week is now used instead of month
-More events displayed!
-Villager furniture - view what furniture is the default for a villagers house
-Customize which events are shown and which notifications to get, go to [Edit Events] in the [Events] section of the home page
-Changed DIY price to item price in DIY popup
-Notification bar now colours to theme (when enabled in settings)
-Fixed obtainable items crash
-Possibly fixed custom time setting?
-Custom time is now an offset, it will progress relative to real time but be offset by the selected date
-Can sort/unsort tasks
-Haptic feedback for visitor page fix
-Sorry for the bugs recently, I didn't notice I was pushing updates over the air
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

    global.customTimeOffset = await getStorage("customDateOffset","0");
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
      "To-Do - Turnip Log" : true,
      "Visitors" : true,
      "Collection" : true,
      "Profile" : true,
      "Profile - Dream Address" : true,
      "Profile - Friend Code" : true,
      "Store Hours" : true,
      "Active Creatures" : true,
    }
    this.sections = await this.loadSections("Sections", defaultSections);

    //load home screen events
    const defaultEventSections = {
      "Info1" : "Notifications are created based on the categories you select. They are only loaded one week into the future and are set according to your phone time.",
      "App notifications" : false,
      "Set Notification Time" : "",
      "Favorite Villager's Birthdays" : true,
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
    }
    this.eventSections = await this.loadSections("EventSections", defaultEventSections);
    
    if(this.mounted){
      this.setState({
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

  openDrawer(vibrate=true) {
    if(this.state.loaded){
      this.sideMenu.openDrawer();
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
        currentPageView = <FadeInOut fadeIn={true}><HomePage sections={this.sections} eventSections={this.eventSections} setPage={this.setPage}/></FadeInOut>
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
      } else {
        currentPageView = <Text>Default</Text>
      }
      
      return (
        <>  
          <SideMenu ref={(sideMenu) => this.sideMenu = sideMenu} setPage={this.setPage} currentPage={this.state.currentPage}>
            <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
            <PopupRating numLogins={this.numLogins}/>
            <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
            <StatusBar hidden={getSettingsString("settingsShowStatusBar")==="false"} backgroundColor={colors.background[global.darkMode]} barStyle={global.darkMode===1?"light-content":"dark-content"}/>
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