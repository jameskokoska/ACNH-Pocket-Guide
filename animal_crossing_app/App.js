import React, {useRef, Component} from 'react';
import {Button, Image, ScrollView, Dimensions, Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import SidebarElement from './components/SidebarElement';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FAB from './components/FAB';
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

const {width} = Dimensions.get('window');


function NavigationView(props) {
  return (
    <View style={{marginRight: "30%", height:"100%", backgroundColor:"white"}}>
      <ScrollView>
      <Text style={{margin: 100}}>ACNH Pocket</Text>
      <SidebarElement image={require("./assets/icons/house.png")} title="Home" pageNum={0} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/book.png")} title="All Items" pageNum={1} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/bugs.png")} title="Creatures and Museum" pageNum={2} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/leaf.png")} title="Items" pageNum={3} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/music.png")} title="Songs" pageNum={4} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/emote.png")} title="Emoticons" pageNum={5} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/crafting.png")} title="Crafting + Tools" pageNum={6} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/cat.png")} title="Villagers" pageNum={7} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/construction.png")} title="Construction" pageNum={8} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/season.png")} title="Misc. Timetables" pageNum={9} setPage={props.setPage}/>
      <View style={{backgroundColor:"grey", width:"87%", height:3, margin:20}}/>
      <SidebarElement image={require("./assets/icons/settings.png")} title="Settings" pageNum={10} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/magnifyingGlass.png")} title="About" pageNum={11} setPage={props.setPage}/>
      <View style={{margin:15}}/>

    </ScrollView>
    </View>
  )
}


// TODO
// Search bar functionality
// Custom fonts
// Add components for home screen
// Home screen clock
// Animations (background) and checkmark animations
// Popup pages and respective components
// Row boxes (for row lists)



class App extends Component {
  constructor() {
    super();
    this.openDrawer = this.openDrawer.bind(this);
    this.setPage = this.setPage.bind(this);
    this.state = {
      loaded: false,
      currentPage: 0,
      open:false,
    }
  }
  async componentDidMount(){
    const firstLogin = await AsyncStorage.getItem("firstLogin");
    if(firstLogin === null) {
      await AsyncStorage.setItem("firstLogin", "true");
      firstLogin = "true";
    }

    this.setState({
      loaded:true,
      firstLogin: firstLogin
    });
  }

  openDrawer() {
    this.drawer.openDrawer();
  }
  setPage(pageNum) {
    console.log(pageNum)
    this.setState({currentPage: pageNum})
    this.drawer.closeDrawer();
  }
  
  render(){
    var currentPageView;
    if (this.state.currentPage===0){
      currentPageView = <HomePage/>
    } else if(this.state.currentPage===1){
      currentPageView = <TabsPage/>
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
    } else {
      currentPageView = <Text>Default</Text>
    }

    if(!this.state.loaded){
      return <View/>
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
        <DrawerLayoutAndroid style={{elevation: 0,}} 
          drawerBackgroundColor="rgba(0,0,0,0.01)" 
          ref={_drawer => (this.drawer = _drawer)} 
          drawerWidth={width} drawerPosition={"left"} 
          renderNavigationView={() => <NavigationView setPage={this.setPage}/>}>
          {currentPageView}
          <FAB backgroundColor='red' openDrawer={this.openDrawer}/>
        </DrawerLayoutAndroid>
      );
    }
  }
}
export default App;