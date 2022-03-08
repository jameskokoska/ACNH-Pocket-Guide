import React, {Component} from 'react';
import {Share, ActivityIndicator, BackHandler, Image, TouchableNativeFeedback, Vibration, View, Dimensions, Text} from 'react-native';
import TextFont from '../components/TextFont'
import colors from '../Colors'
import { WebView } from 'react-native-webview';
import {getSettingsString} from "../LoadJsonData"
import Popup from "../components/Popup"
import FadeInOut from "../components/FadeInOut"
import * as RootNavigation from '../RootNavigation.js';
import { AndroidBackHandler } from "react-navigation-backhandler";

export default class BrowserPage extends Component {
  constructor(props) {
    super(props);
    let currentURL = this.props.page
    this.state = {
      canGoBack: false,
      canGoForward: false,
      currentURL: currentURL
    }
  }

  onBackButtonPressAndroid = () => {
    if(this.state.canGoBack){
      this.webView.goBack();
      return true;
    }
    RootNavigation.popRoute(1)
    return true;
  };

  componentDidMount() {
    this.mounted = true;
    if(!global.language.includes("English")){
      this.popupLanguage?.setPopupVisible(true);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }
 
  render(){
    return(<>
      <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
        <View style={{zIndex:50, position:"absolute"}} pointerEvents="none">
        <FadeInOut fadeIn={true} delay={700} duration={300} startValue={1} endValue={0}>
          <View style={{alignItems:"center", justifyContent:"center", width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: colors.lightDarkAccent[global.darkMode]}}>
            <Image style={{width: "60%", height:"40%", resizeMode:"contain"}} source={this.props.splashImage}/>
            <TextFont bold={true} style={{marginBottom: 10, fontSize:23, color:colors.textBlack[global.darkMode]}}>{this.props.splashText}</TextFont>
            <TextFont bold={false} style={{marginBottom: 10, fontSize:15, color:colors.textBlack[global.darkMode]}}>{this.props.splashCredits}</TextFont>
          </View>
        </FadeInOut>
        </View>
        <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
          <WebView
            forceDarkOn
            ref={(webView) => this.webView = webView}
            source={{ uri: this.state.currentURL }}
            style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height }}
            injectedJavaScript={"document.body.style.userSelect = 'none';"}
            onError={() => {
              this.popup?.setPopupVisible(true);
            }}
            onHttpError={() => {
              this.popup?.setPopupVisible(true);
            }}
            startInLoadingState
            renderLoading={() => (
              <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:1000, width:1000}}>
                <ActivityIndicator
                  color='green'
                  size='large'
                />
              </View>
            )}
            onNavigationStateChange={navState => {
              if(this.mounted){
                this.setState({
                  canGoBack: navState.canGoBack,
                  canGoForward: navState.canGoForward,
                  currentURL: navState.url
                })
              }
            }}
          />
          <BottomBar 
            goBack={()=>this.webView.goBack()} 
            canGoBack={this.state.canGoBack}
            goForward={()=>this.webView.goForward()}
            canGoForward = {this.state.canGoForward}
            currentURL = {this.state.currentURL}
          />
          <Popup ref={(popup) => this.popup = popup} button1={"OK"} button1Action={()=>{return}} text={"Error"} textLower={"There was an error loading. Note that this feature needs an internet connection."}/>
          <Popup ref={(popupLanguage) => this.popupLanguage = popupLanguage} button1={"OK"} button1Action={()=>{return}} text={"Language"} textLower={this.props.languageMessage}/>
        </View>
      </AndroidBackHandler>
      </>
    )
  }
}

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.props.goBack;
    this.goForward = this.props.goForward;
  }
  
  render(){
    return <View style={{flexDirection: "row", elevation:5, backgroundColor:colors.lightDarkAccent[global.darkMode], width:Dimensions.get('window').width, height:45}}>
      <TouchableNativeFeedback onPress={()=>{this.goBack(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}>
        <View style={{ width:Dimensions.get('window').width/4, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <FadeInOut duration={200} fadeIn={this.props.canGoBack ? true : false}>
            <Image
              style={{width:18,height:18,resizeMode:'contain',}}
              source={global.darkMode ? require("../assets/icons/leftArrowWhite.png") : require("../assets/icons/leftArrow.png")}
            />
          </FadeInOut>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{this.goForward(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}>
        <View style={{width:Dimensions.get('window').width/4, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <FadeInOut duration={200} fadeIn={this.props.canGoForward ? true : false}>
            <Image
              style={{width:18,height:18,resizeMode:'contain',}}
              source={global.darkMode ? require("../assets/icons/rightArrowWhite.png") : require("../assets/icons/rightArrow.png")}
            />
          </FadeInOut>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{shareMessage(this.props.currentURL); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}>
        <View style={{width:Dimensions.get('window').width/4, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <Image
            style={{width:18,height:18,resizeMode:'contain',}}
            source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  }
}

async function shareMessage(message) {
  const result = await Share.share({
    message: message,
  });
}