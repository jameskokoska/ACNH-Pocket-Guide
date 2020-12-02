import React, {useRef, Component} from 'react';
import {Button, Image, ScrollView, Dimensions, Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import TabsPage from './pages/TabsPage';
import SongsPage from './pages/SongsPage';
import HomePage from './pages/HomePage';
import FadeInOut from './components/FadeInOut';
import Check from './components/Check';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextFont from './components/TextFont';
import LottieView from 'lottie-react-native';
import Popup from './components/Popup';
import CreditsPage from './pages/CreditsPage';
import {getStorage, getStorageData} from './LoadJsonData';
import {ExportFile, LoadFile} from './components/LoadFile';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class App extends Component {
  constructor() {
    super();
    this.openDrawer = this.openDrawer.bind(this);
    this.setPage = this.setPage.bind(this);
    this.state = {
      loaded: false,
      currentPage: 0,
      open:false,
      fadeInTitle:true,
    }
  }
  async componentDidMount(){
    // await AsyncStorage.setItem("firstLogin", "true");
    await AsyncStorage.setItem("skipSplash", "0");  //set to 0 to skip, 600 to play splash airplane

    const firstLogin = await getStorage("firstLogin","true");
    const skipSplash = await getStorage("skipSplash","0");
    global.dataLoadedReactions = await getStorageData([require("./assets/data/reactions.json")],[["emojiCheckList","Name"]],"false")
    global.dataLoadedArt = await getStorageData([require("./assets/data/art.json"),require("./assets/data/fencing.json")],[["artCheckList","Name","Genuine"],["fenceCheckList","Name"],["fenceCheckList","Name"]],"false")
    global.dataLoadedMusic = await getStorageData([require("./assets/data/music.json")],[["emojiCheckList","Name"]],"false")
    console.log("DONE")
    this.timeoutHandle = setTimeout(()=>{
      this.setState({
        fadeInTitle: false,
      });
    }, parseInt(skipSplash));
    this.timeoutHandle = setTimeout(()=>{
      this.setState({
        loaded:true,
        firstLogin: firstLogin,
      });
    }, parseInt(skipSplash)+10);
  }

  openDrawer() {
    this.drawer.openDrawer();
  }
  setPage(pageNum) {
    console.log(pageNum)
    if(this.state.pageNum!==pageNum)
      this.setState({currentPage: pageNum})
    this.drawer.closeDrawer();
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
      return <Onboarding
        showDone={false}
        skipLabel= {<TextFont style={{fontSize: 20, color:"gray"}}>Skip</TextFont>}
        nextLabel= {
          <View style={{transform: [{ rotate: '180deg'}]}}>
            <LottieView 
              autoPlay
              loop
              style={{
                width: 45,
                height: 45,
              }} 
              source={require('./assets/arrow.json')}
            />
          </View>
        }
        onDone={() => {AsyncStorage.setItem("firstLogin", "false"); this.setState({firstLogin:false})}}
        onSkip={() => {AsyncStorage.setItem("firstLogin", "false"); this.setState({firstLogin:false})}}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image style={{height: 300, width: 300, resizeMode:'contain'}} source={require('./assets/icons/palmIcon.png')} />,
            title: <TextFont style={{fontSize: 30, width: "70%", textAlign:'center'}} bold={true}>Welcome to ACNH Pocket Guide</TextFont>,
            subtitle: <TextFont style={{fontSize: 20}} bold={true}>Awesome features... WOW!</TextFont>,
          },
          {
            backgroundColor: 'green',
            image: <Image style={{height: 300, width: 300, resizeMode:'contain'}} source={require('./assets/icons/palmIcon.png')} />,
            title: <TextFont style={{fontSize: 30, width: "70%", textAlign:'center'}} bold={true}>Welcome to ACNH Pocket Guide</TextFont>,
            subtitle: <TextFont style={{fontSize: 20}} bold={true}>Awesome features... WOW!</TextFont>,
          },
          {
            backgroundColor: 'grey',
            image: <LottieView 
              autoPlay
              loop={false}
              style={{
                width: 400,
                height: 400,
              }} 
              source={require('./assets/trackCollectionsAnimation.json')}
            />,
            title: <Button title="Get Started" onPress={() => {AsyncStorage.setItem("firstLogin", "false"); this.setState({firstLogin:false})}} style={{height: 300, width: 300, resizeMode:'contain'}}/>,
            subtitle: <View/>,
          },
        ]}
      />
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomePage}/>
            <Stack.Screen name="All Items" component={TabsPage}/>

          </Stack.Navigator>
        </NavigationContainer>

      );
    }
  }
}
export default App;
