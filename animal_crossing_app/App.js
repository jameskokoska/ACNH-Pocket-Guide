import React, {useRef, Component} from 'react';
import {Vibration, BackHandler, Button, Image, ScrollView, Dimensions, Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import SidebarElement from './components/SidebarElement';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FAB from './components/FAB';
import TabsPage from './pages/TabsPage';
import SongsPage from './pages/SongsPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import FadeInOut from './components/FadeInOut';
import Check from './components/Check';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextFont from './components/TextFont';
import LottieView from 'lottie-react-native';
import Popup from './components/Popup';
import CreditsPage from './pages/CreditsPage';
import {getStorage, getStorageData} from './LoadJsonData';
import {ExportFile, LoadFile} from './components/LoadFile';
import Onboard from './pages/Onboard';
import colors from './Colors.js';

const {width} = Dimensions.get('window');


function NavigationView(props) {
  return (
    <View style={{marginRight: "30%", height:"100%", backgroundColor:colors.textWhite[colors.mode]}}>
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
        <SidebarElement image={require("./assets/icons/season.png")} title="Misc. Timetables" pageNum={9} setPage={props.setPage} currentPage={props.currentPage} backgroundColor={colors.selectMisc[colors.mode]} textColor={colors.textBlack[colors.mode]} unselectedColor={colors.textWhite[colors.mode]}/>
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
    this.state = {
      loaded: false,
      currentPage: 0,
      open:false,
      fadeInTitle:true,
    }
  }
  async componentDidMount(){
    // await AsyncStorage.setItem("firstLogin", "true");
    // await AsyncStorage.setItem("skipSplash", "0");  //set to 0 to skip, 600 to play splash airplane
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.openDrawer
    );

    const firstLogin = await getStorage("firstLogin","true");
    const skipSplash = await getStorage("skipSplash","0");
    global.dataLoadedReactions = await getStorageData([require("./assets/data/reactions.json")],[["emojiCheckList","Name"]],"false")
    global.dataLoadedArt = await getStorageData([require("./assets/data/art.json"),require("./assets/data/fencing.json")],[["artCheckList","Name","Genuine"],["fenceCheckList","Name"],["fenceCheckList","Name"]],"false")
    global.dataLoadedMusic = await getStorageData([require("./assets/data/music.json")],[["emojiCheckList","Name"]],"false")
    console.log("DONE Loading")
    this.timeoutHandle = setTimeout(()=>{
      this.setState({
        fadeInTitle: false,
        firstLogin: firstLogin,
      });
    }, parseInt(skipSplash));
    this.timeoutHandle = setTimeout(()=>{
      this.setState({
        loaded:true,
      });
    }, parseInt(skipSplash)+10);
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
    var currentPageView;
    if (this.state.currentPage===0){
      currentPageView = <FadeInOut fadeIn={true}><HomePage/></FadeInOut>
    } else if(this.state.currentPage===1){
      currentPageView = <TabsPage openDrawer={this.openDrawer}/>
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
    } else if (this.state.currentPage===4){
      currentPageView = <SongsPage/>
    } else if (this.state.currentPage===3){
      currentPageView = <CreditsPage/>
    } else if (this.state.currentPage===5){
      currentPageView = <View><ExportFile/><LoadFile/></View>
    } else if (this.state.currentPage===6){
      currentPageView = <SettingsPage/>
    } else {
      currentPageView = <Text>Default</Text>
    }

    if(!this.state.loaded){
      return <FadeInOut fadeIn={this.state.fadeInTitle}>
        <LottieView 
          autoPlay
          loop
          style={{
            top: "50%",
            width: "100%",
            zIndex:1,
            transform: [
              { scale: 1.25 },
              { rotate: '0deg'},
            ],
          }} 
          source={require('./assets/airplane.json')}
        />
      </FadeInOut>
    } else if (this.state.firstLogin==="true"){
      return <Onboard setFirstLogin={this.setFirstLogin}/>
    } else {
      return (
        <DrawerLayoutAndroid style={{elevation: 0,}} 
          drawerBackgroundColor="rgba(0,0,0,0.01)" 
          ref={_drawer => (this.drawer = _drawer)} 
          drawerWidth={width} drawerPosition={"left"} 
          renderNavigationView={() => <NavigationView setPage={this.setPage} currentPage={this.state.currentPage}/>}>
            {currentPageView}
          <FAB openDrawer={this.openDrawer}/>
        </DrawerLayoutAndroid>
      );
    }
  }
}
export default App;
