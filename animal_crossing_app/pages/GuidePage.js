import React, {Component} from 'react';
import {ActivityIndicator, BackHandler, Image, TouchableNativeFeedback, Vibration, View, Dimensions, Text} from 'react-native';
import TextFont from '../components/TextFont'
import colors from '../Colors'
import { WebView } from 'react-native-webview';
import {getSettingsString} from "../LoadJsonData"
import Popup from "../components/Popup"
import FadeInOut from "../components/FadeInOut"
const music = require("../assets/data/music.json");
const {width} = Dimensions.get('window');

class GuidePage extends Component {
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.state = {
      canGoBack: false,
      canGoForward: false,
    }
  }

  handleBackButton = () => {
    this.webView.goBack();
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.openWebMenu();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  openWebMenu = ()=>{
    var run = `
        document.getElementById('site-nav').classList.add('nav-open');
      `;
    this.webView.injectJavaScript(run);
  }
 
  render(){
    return(<>
      <View style={{zIndex:50, position:"absolute"}} pointerEvents="none">
      <FadeInOut fadeIn={true} delay={700} duration={300} startValue={1} endValue={0}>
        <View style={{alignItems:"center", justifyContent:"center", width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: colors.lightDarkAccent[global.darkMode]}}>
          <Image style={{width: "60%", height:"40%", resizeMode:"contain"}} source={require('../assets/icons/acnhFAQIcon.png')}/>
          <TextFont bold={true} style={{marginBottom: 10, fontSize:23, color:colors.textBlack[global.darkMode]}}>{"ACNH Guide"}</TextFont>
          <TextFont bold={false} style={{marginBottom: 10, fontSize:15, color:colors.textBlack[global.darkMode]}}>{"By littlesnorlax and cestislife"}</TextFont>
        </View>
      </FadeInOut>
      </View>
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <WebView
          ref={(webView) => this.webView = webView}
          source={{ uri: "https://chibisnorlax.github.io/acnhfaq/" }}
          style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height }}
          injectedJavaScript={"document.body.style.userSelect = 'none';"}
          onError={() => {
            this.popup.setPopupVisible(true);
          }}
          onHttpError={() => {
            this.popup.setPopupVisible(true);
          }}
          startInLoadingState
          incognito
          renderLoading={() => (
            <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:1000, width:1000}}>
              <ActivityIndicator
                color='green'
                size='large'
              />
            </View>
          )}
          onNavigationStateChange={navState => {
            this.setState({
              canGoBack: navState.canGoBack,
              canGoForward: navState.canGoForward
            })
          }}
        />
        {/* openMenu={()=>this.props.openMenu()}  */}
        <BottomBar 
          openWebMenu={()=>this.openWebMenu()}
          goBack={()=>this.webView.goBack()} 
          canGoBack={this.state.canGoBack}
          goForward={()=>this.webView.goForward()}
          canGoForward = {this.state.canGoForward}
          openMenu = {()=>this.props.openMenu()}
        />
        <Popup ref={(popup) => this.popup = popup} button1={"OK"} button1Action={()=>{return}} text={"Error"} textLower={"There was an error loading. Note that this feature needs an internet connection."}/>
     </View>
     </>
    )
  }
}
export default GuidePage;

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.props.goBack;
    this.goForward = this.props.goForward;
    this.openMenu = this.props.openMenu;
    this.openWebMenu = this.props.openWebMenu;
  }
  
  render(){
    return <View style={{flexDirection: "row", elevation:5, backgroundColor:colors.lightDarkAccent[global.darkMode], width:Dimensions.get('window').width, height:45}}>
      <TouchableNativeFeedback onPress={()=>{this.goBack(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.lightDarkAccentHeavy[global.darkMode], false)}>
        <View style={{ width:Dimensions.get('window').width/4, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <FadeInOut duration={200} fadeIn={this.props.canGoBack ? true : false}>
            <Image
              style={{width:25,height:25,resizeMode:'contain',}}
              source={global.darkMode ? require("../assets/icons/leftArrowWhite.png") : require("../assets/icons/leftArrow.png")}
            />
          </FadeInOut>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{this.goForward(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.lightDarkAccentHeavy[global.darkMode], false)}>
        <View style={{width:Dimensions.get('window').width/4, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <FadeInOut duration={200} fadeIn={this.props.canGoForward ? true : false}>
            <Image
              style={{width:25,height:25,resizeMode:'contain',}}
              source={global.darkMode ? require("../assets/icons/rightArrowWhite.png") : require("../assets/icons/rightArrow.png")}
            />
          </FadeInOut>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{this.openMenu(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.lightDarkAccentHeavy[global.darkMode], false)}>
        <View style={{ width:Dimensions.get('window').width/4, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <Image
            style={{width:25,height:25,resizeMode:'contain',}}
            source={global.darkMode ? require("../assets/icons/homeWhite.png") : require("../assets/icons/home.png")}
          />
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{this.openWebMenu(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.lightDarkAccentHeavy[global.darkMode], false)}>
        <View style={{width:Dimensions.get('window').width/4, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <Image
            style={{width:22,height:22,resizeMode:'contain',}}
            source={global.darkMode ? require("../assets/icons/menuIconWhite.png") : require("../assets/icons/menuIcon.png")}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  }
}