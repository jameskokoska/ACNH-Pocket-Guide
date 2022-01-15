import React, {Component} from 'react';
import {Vibration, BackHandler, Dimensions, Text, View, StatusBar, ToastAndroid, Linking} from 'react-native';
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
import {getDefaultLanguage, getStorage,getSettingsString, settings, loadGlobalData, attemptToTranslate, indexCollectionList} from './LoadJsonData';
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
import Popup, { PopupInfoCustom, PopupRaw, PopupRawLoading } from './components/Popup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './RootNavigation';
import * as RootNavigation from './RootNavigation.js';
import CraftableItemsPage from './pages/CraftableItemsPage';
import XLSX from 'xlsx';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system'
import {dataVersion} from "./Changelog"
import ParadisePlanningPage from './pages/ParadisePlanningPage';
import { DownloadDatabase } from './components/DownloadDatabase';
import BrowserPage from './pages/BrowserPage';
import Toast from "react-native-toast-notifications";
import TextFont from './components/TextFont';
import { DefaultTheme, Provider } from 'react-native-paper';
import GlobalSearchPage from './pages/GlobalSearchPage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

//expo build:android -t app-bundle
//expo build:android -t apk

//expo build:android has been superseded by eas build. Learn more: https://blog.expo.dev/turtle-goes-out-to-sea-d334db2a6b60
// Run the following:
// › npm install -g eas-cli
// › eas build -p android https://docs.expo.dev/build/setup/
// expo build:android will be discontinued on January 4, 2023 (385 days left).
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
      currentPage:0,
      open:false,
      propsPassed:""
    }
    this.lastPage = [0];
    this.lastPropsPassed = [];
    this.generateJSONLinks = {
      //https://drive.google.com/uc?export=download&id=1VoGYele5FbcmOWNHbGUe4KeaIeH1Gva_
      "Housewares":"https://raw.githubusercontent.com/jameskokoska/AnimalCrossingNH-App-React/main/animal_crossing_app/assets/data/DataCreated/Housewares.json",
      "Miscellaneous":"https://raw.githubusercontent.com/jameskokoska/AnimalCrossingNH-App-React/main/animal_crossing_app/assets/data/DataCreated/Miscellaneous.json",
      "Photos":"https://raw.githubusercontent.com/jameskokoska/AnimalCrossingNH-App-React/main/animal_crossing_app/assets/data/DataCreated/Photos.json",
      "Tops":"https://raw.githubusercontent.com/jameskokoska/AnimalCrossingNH-App-React/main/animal_crossing_app/assets/data/DataCreated/Tops.json",
      "Dress-Up":"https://raw.githubusercontent.com/jameskokoska/AnimalCrossingNH-App-React/main/animal_crossing_app/assets/data/DataCreated/Dress-Up.json",
      "Headwear":"https://raw.githubusercontent.com/jameskokoska/AnimalCrossingNH-App-React/main/animal_crossing_app/assets/data/DataCreated/Headwear.json",
    }
    this.generateJSON = Object.keys(this.generateJSONLinks)

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
    global.name = await getStorage("name"+global.profile,"");
    global.islandName = await getStorage("islandName"+global.profile,"");
    global.dreamAddress = await getStorage("dreamAddress"+global.profile,"");
    global.friendCode = await getStorage("friendCode"+global.profile,"");
    global.creatorCode = await getStorage("creatorCode"+global.profile,"");
    global.selectedFruit = await getStorage("selectedFruit"+global.profile,"");
    global.customTimeOffset = await getStorage("customDateOffset"+global.profile,"0");
    global.ordinance = await getStorage("ordinance"+global.profile,"");
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
      
      let generated = 0
      for(let generateJSONIndex = 0; generateJSONIndex < this.generateJSON.length; generateJSONIndex++){
        if((await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)).includes(this.generateJSON[generateJSONIndex]+".json")){
          console.log("Loaded from memory")
          generated = generated + 1
          // let fileURI = `${FileSystem.documentDirectory}${this.generateJSON[generateJSONIndex]+".json"}`;
          // console.log(JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Housewares.json")))
        }
      }
      if(dataVersionLoaded === "" || dataVersionLoaded !== dataVersion){
        console.log("New data version")
      }

      //Load Settings
      await this.loadSettings();
      this.updateDarkMode();

      if(generated < this.generateJSON.length || dataVersionLoaded === "" || dataVersionLoaded !== dataVersion){
        let dataVersionLoadedAttempted = await getStorage("dataVersionAttempted","loaded");

        if(dataVersionLoadedAttempted==="not loaded"){
          this.popupGenerateMenu?.setPopupVisible(true)
        }else{
          await AsyncStorage.setItem("dataVersionAttempted", "not loaded");
          await this.continueMountingGenerate(true)
        }
      }else{
        this.popupLoading?.setPopupVisible(true)
        await this.continueMountingGenerate(false)
      }
    }, 10);
  }

  continueMountingGenerate = async(generate) => {
    if(generate===true){
      this.popupGeneratingData?.setPopupVisible(true)
      console.log("Generating into memory")
      const [{ localUri }] = await Asset.loadAsync(require("./assets/data/dataGenerate.zip"));
      console.log(localUri)

      let b64 = await FileSystem.readAsStringAsync(localUri, {encoding: FileSystem.EncodingType.Base64})
      this.popupGeneratingData?.setPopupText(attemptToTranslate("Almost done!"))
      let excel = await XLSX.read(b64, {type: "base64"})
      this.popupGeneratingData?.setPopupText(attemptToTranslate("A few more seconds!"))
      for(let generateJSONIndex = 0; generateJSONIndex < this.generateJSON.length; generateJSONIndex++){
        let parsed =  JSON.stringify(await XLSX.utils.sheet_to_json(excel.Sheets[this.generateJSON[generateJSONIndex]]))
        
        let fileURI = `${FileSystem.documentDirectory}${this.generateJSON[generateJSONIndex]+".json"}`;
        await FileSystem.writeAsStringAsync(fileURI, parsed)
      }
      this.popupGeneratingData?.setPopupText(attemptToTranslate("Loading app..."))
      await this.continueMountingFinish()
    } else if(generate==="online") {
      this.popupDownload?.startDownload()
    } else {
      await this.continueMountingFinish()
    }
  // console.log(await FileSystem.readDirectoryAsync(FileSystem.documentDirectory))
  }

  continueMountingFinish = async() => {
    await AsyncStorage.setItem("dataVersion", dataVersion);
    await AsyncStorage.setItem("dataVersionAttempted", "loaded");

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
    toast.show(result[0], {type:result[1]===false?"success":"danger", 
      renderType:{
        success: (toast) => (
          <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 20, marginVertical: 12, marginRight: needsPadding?100:20, borderRadius: 5, backgroundColor: colors.popupSuccess[global.darkMode], alignItems:"center", justifyContent:"center"}}>
            <TextFont translate={false} style={{color:"white", fontSize: 15}}>{toast.message}</TextFont>
          </View>
        ),
        danger: (toast) => (
          <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 20, marginVertical: 12, marginRight: needsPadding?100:20, borderRadius: 5, backgroundColor: colors.popupDanger[global.darkMode], alignItems:"center", justifyContent:"center"}}>
            <TextFont translate={false} style={{color:"white", fontSize: 15}}>{toast.message}</TextFont>
          </View>
        )
      }
    })
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
        <PopupRaw ref={(popupGeneratingData) => this.popupGeneratingData = popupGeneratingData} text={attemptToTranslate("Generating Data...")} textLower={attemptToTranslate("This may take a few minutes and is only done once.")} textLower2={attemptToTranslate("If this takes longer than a minute restart the app and select Download data.")}/>
        <Popup
          ref={(popupGenerateMenu) => this.popupGenerateMenu = popupGenerateMenu}
          button1={"Download"}
          button1Action={async ()=>{
            await this.continueMountingGenerate("online");
          }}
          button2={"Generate"}
          button2Action={async ()=>{
            await this.continueMountingGenerate(true);
          }}
          text={"Generate Data"}
          textLower={"It seems generating data may have had some issues. If generating data fails or takes too long, select [Download]."}
          mailLink
          noDismiss
        />
        <DownloadDatabase ref={(popupDownload) => this.popupDownload = popupDownload} generateJSONLinks={this.generateJSONLinks} continueMountingFinish={async () => {await this.continueMountingFinish()}}/>
        <PopupRawLoading ref={(popupLoading) => this.popupLoading = popupLoading}/>
      </>
    } else if (this.state.firstLogin==="true"){
      return <GestureHandlerRootView style={{flex:1,backgroundColor: "#000000"}}>
        <Onboard setFirstLogin={this.setFirstLogin}/>
      </GestureHandlerRootView>
    } else {
      var currentPageView;
      if (this.state.currentPage===0){
        currentPageView = <FadeInOut fadeIn={true}><HomePage sections={this.sections} sectionsOrder={this.sectionsOrder} eventSections={this.eventSections} setPage={this.setPage}/></FadeInOut>
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
      } else if (this.state.currentPage===34){
        currentPageView = <CraftableItemsPage material={this.state.propsPassed}/>
      } else if (this.state.currentPage===35){
        currentPageView = <ParadisePlanningPage/>
      } else if (this.state.currentPage===36){
        currentPageView = <VillagerFurnitureParadisePlanning request={this.state.propsPassed}/>
      } else {
        currentPageView = <Text>Default</Text>
      }

      let otherComponents = <>
        <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
        <View style={{zIndex:-5, position: "absolute", backgroundColor: colors.background[global.darkMode], width:Dimensions.get('window').width, height:Dimensions.get('window').height}}/>
        <StatusBar translucent={false} hidden={getSettingsString("settingsShowStatusBar")==="false"} backgroundColor={colors.background[global.darkMode]} barStyle={global.darkMode===1?"light-content":"dark-content"}/>
      </>

      const NavigatorHomePage = ()=><>{otherComponents}{currentPageView}</>
      const NavigatorVillagerPresentsPage = ({route, navigation})=>{return <VillagerPresentsPage setPage={this.setPage} villager={route.params.propsPassed}/>}
      const NavigatorCustomFiltersPage = ({route, navigation})=>{return <CustomFiltersPage currentFiltersSearchFor={route.params.propsPassed} titlePassed={route.params.propsPassed} setPage={this.setPage}/>}
      const NavigatorVillagerFurniture = ({route, navigation})=>{return <VillagerFurniture villager={route.params.propsPassed}/>}
      const NavigatorCraftableItemsPage = ({route, navigation})=>{return <CraftableItemsPage material={route.params.propsPassed}/>}
      const NavigatorVillagerFurnitureParadisePlanning = ({route, navigation})=>{return <VillagerFurnitureParadisePlanning request={route.params.propsPassed}/>}
      const NavigatorBrowserPage = ({route, navigation})=>{return <BrowserPage page={route.params.propsPassed} languageMessage={"You can change the language at the bottom of the page, by tapping Language"} splashImage={require('./assets/icons/turnip.png')} splashText={"Turnip Prophet"} splashCredits={"By mikebryant"}/>}
      const NavigatorGlobalSearchPage = ({route, navigation})=>{return <GlobalSearchPage currentSearch={route.params.propsPassed} setPage={this.setPage}/>}

      console.log(global.darkMode)
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
        }
      }
      return (
        <GestureHandlerRootView style={{flex:1,backgroundColor: "#000000"}}>
          <Toast ref={(ref) => global['toast'] = ref} />
          <SideMenu ref={(sideMenu) => this.sideMenu = sideMenu} setPage={this.setPage} currentPage={this.state.currentPage} sideMenuSections={this.sideMenuSections} sideMenuSectionsDisabled={this.sideMenuSectionsDisabled}>
            <Provider theme={theme}>
              <NavigationContainer ref={navigationRef} theme={{colors: {background: colors.background[global.darkMode],},}}>
                <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                  <Stack.Screen name="Home" component={NavigatorHomePage} />
                  <Stack.Screen name="20" component={NavigatorVillagerPresentsPage}/>
                  <Stack.Screen name="22" component={NavigatorVillagerFurniture}/>
                  <Stack.Screen name="23" component={NavigatorCustomFiltersPage}/>
                  <Stack.Screen name="34" component={NavigatorCraftableItemsPage}/>
                  <Stack.Screen name="36" component={NavigatorVillagerFurnitureParadisePlanning}/>
                  <Stack.Screen name="BrowserPage" component={NavigatorBrowserPage}/>
                  <Stack.Screen name="GlobalSearchPage" component={NavigatorGlobalSearchPage}/>
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
            <PopupInfos setPage={this.setPage}/>
          </SideMenu>
          <FABWrapper ref={(fab) => this.fab = fab} openDrawer={this.openDrawer}/>
        </GestureHandlerRootView>
      );
    }
  }
}

class PopupInfos extends Component {
  async componentDidMount(){
    const numLogins = parseInt(await getStorage("numLogins","0"))+1;
    // let backupPopupDismissed = await getStorage("backupPopupDismissed","false");
    let backupPopupDismissed = await getStorage("backupPopupDismissed","false");
    if(backupPopupDismissed==="false" && numLogins >= 9){
      AsyncStorage.setItem("backupPopupDismissed", "true");
      this.popupBackup?.setPopupVisible(true)
    }
    // let supportPopupDismissed = await getStorage("supportPopupDismissed","false");
    // if(supportPopupDismissed==="false" && numLogins >= 6){
    //   AsyncStorage.setItem("supportPopupDismissed", "true");
    //   this.popupSupport?.setPopupVisible(true)
    // }
    // let supportPopupDismissed2 = await getStorage("supportPopupDismissed2","false");
    // if(supportPopupDismissed2==="false" && numLogins >= 5){
    //   AsyncStorage.setItem("supportPopupDismissed2", "true");
    //   this.popupSupport2?.setPopupVisible(true)
    // }
    let supportPopupDismissed3 = await getStorage("supportPopupDismissed3","false");
    if(supportPopupDismissed3==="false" && numLogins >= 5){
      AsyncStorage.setItem("supportPopupDismissed3", "true");
      this.popupSupport3?.setPopupVisible(true)
    }
    // let supportPopupDismissed4 = await getStorage("supportPopupDismissed4","false");
    // if(supportPopupDismissed4==="false" && numLogins >= 5){
    //   AsyncStorage.setItem("supportPopupDismissed4", "true");
    //   this.popupSupport4?.setPopupVisible(true)
    // }
    // let updatePopupDismissed = await getStorage("updatePopupDismissed","false");
    // if(updatePopupDismissed==="false" && numLogins >= 1){
    //   AsyncStorage.setItem("updatePopupDismissed", "true");
    //   this.popupUpdate?.setPopupVisible(true)
    // }
    if(numLogins===4){
      this.popupRating?.setPopupVisible(true)
    }
    // console.log("numlogins:"+numLogins)
    await AsyncStorage.setItem("numLogins", numLogins.toString());
    this.numLogins = numLogins;
  }
  render(){
    return <>
      <PopupRating ref={(popupRating) => this.popupRating = popupRating}/>
      <Popup mailLink={true} ref={(popupBackup) => this.popupBackup = popupBackup} text="Data Backup" textLower="You can now backup your data to the cloud and enable auto backups in the settings." button1={"Go to page"} button1Action={()=>{this.props.setPage(30)}} button2={"Cancel"} button2Action={()=>{}}/>
      <Popup support={true} noDismiss ref={(popupSupport) => this.popupSupport = popupSupport} text="Leave a Tip" button1={"Sure!"} button1Action={()=>{Linking.openURL('https://ko-fi.com/dapperappdeveloper')}} button2={"No Thanks"} button2Action={()=>{}}/>
      {/* <Popup margin support2={true} noDismiss ref={(popupSupport2) => this.popupSupport2 = popupSupport2} text="Support the App" textLower={attemptToTranslate("Consider leaving a tip to keep the app ad free for all") + " 😄"} button1={"Sure!"} button1Action={()=>{Linking.openURL('https://ko-fi.com/dapperappdeveloper')}} button2={"No Thanks"} button2Action={()=>{}}/> */}
      {/* <Popup margin support2={true} noDismiss ref={(popupSupport3) => this.popupSupport3 = popupSupport3} text="Happy Holidays!" textLower={attemptToTranslate("Support the app to keep it ad free for all") + " 😄"} button1={"Sure!"} button1Action={()=>{Linking.openURL('https://ko-fi.com/dapperappdeveloper')}} button2={"No Thanks"} button2Action={()=>{}}/>*/}
      <Popup margin support2={true} noDismiss ref={(popupSupport3) => this.popupSupport3 = popupSupport3} text="Support the App" textLower={attemptToTranslate("Support the app to keep it ad free for all") + " 😄"} button1={"Sure!"} button1Action={()=>{Linking.openURL('https://ko-fi.com/dapperappdeveloper')}} button2={"No Thanks"} button2Action={()=>{}}/>
      {/* <Popup margin support2={true} noDismiss ref={(popupSupport4) => this.popupSupport4 = popupSupport4} text="Happy New Year!" textLower={attemptToTranslate("Consider supporting this ad free app") + " 🙂"} button1={"Sure!"} button1Action={()=>{Linking.openURL('https://ko-fi.com/dapperappdeveloper')}} button2={"No Thanks"} button2Action={()=>{}}/>  */}
    </>
  }
}

export default App;