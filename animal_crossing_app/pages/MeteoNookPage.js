import React, {Component} from 'react';
import {Share, ActivityIndicator, BackHandler, Image, TouchableNativeFeedback, Vibration, View, Dimensions, Text} from 'react-native';
import TextFont from '../components/TextFont'
import colors from '../Colors'
import { WebView } from 'react-native-webview';
import {getSettingsString, getStorage, openURL} from "../LoadJsonData"
import Popup from "../components/Popup"
import FadeInOut from "../components/FadeInOut"
import AsyncStorage from '@react-native-async-storage/async-storage';

class GuidePage extends Component {
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
    var currentURL = "https://wuffs.org/acnh/weather/"
    this.redirectUrl = "";
    this.state = {
      canGoBack: false,
      canGoForward: false,
      currentURL: currentURL
    }
  }

  handleBackButton = () => {
    this.webView.goBack();
    if(this.state.canGoBack)
      return true;
  };

  async componentDidMount() {
    this.mounted = true;
    if(!global.language.includes("English")){
      let hide = await getStorage("hideMeteoNookLanguagePopup","false");
      if(hide==="false")
        this.popupLanguage?.setPopupVisible(true);
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    this.mounted = false;
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
 
  render(){
    return(<>
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <WebView
          forceDarkOn={global.darkMode===1}
          ref={(webView) => this.webView = webView}
          source={{ uri: this.state.currentURL }}
          style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height }}
          injectedJavaScript={"document.body.style.userSelect = 'none';" + "\
          document.getElementsByClassName('mb-2')[2].innerHTML = 'To support MeteoNook and its creator, please do so outside of ACNH Pocket Guide as it violates the TOS of Google Play.';"}
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
            if(navState.url.includes("paypal") || navState.url.includes("ko-fi") || navState.url.includes("monzo")){
              this.webView.goBack();
              this.popupSupportWarn?.setPopupVisible(true)
            }
            if(!navState.url.includes("wuffs.org") && !navState.url.includes("chibisnorlax.github.io") && !navState.url.includes("turnipprophet.io") && !navState.url.includes(".png")){
              this.webView.goBack();
              this.redirectUrl = navState.url;
              this.popupRedirectWarn?.setPopupVisible(true);
            }
          }}
        />
        {/* openMenu={()=>this.props.openMenu()}  */}
        <BottomBar 
          goBack={()=>this.webView.goBack()} 
          canGoBack={this.state.canGoBack}
          goForward={()=>this.webView.goForward()}
          canGoForward = {this.state.canGoForward}
          currentURL = {this.state.currentURL}
        />
        <Popup ref={(popup) => this.popup = popup} button1={"OK"} button1Action={()=>{return}} text={"Error"} textLower={"There was an error loading. Note that this feature needs an internet connection."}/>
        <Popup ref={(popupLanguage) => this.popupLanguage = popupLanguage} button1={"OK"} button1Action={()=>{return}} button2={"Hide"} button2Action={()=>{AsyncStorage.setItem("hideMeteoNookLanguagePopup", "true");}} text={"Language"} textLower={"You can change the language in the top right corner, by tapping Settings"}/>
        <Popup ref={(popupSupportWarn) => this.popupSupportWarn = popupSupportWarn} button1={"OK"} button1Action={()=>{return}} text={"Support External Tool"} textLower={"To support this external tool, please do so outside of ACNH Pocket Guide, as using it within the app would violate the terms of service of Google Play."}/>
        <Popup ref={(popupRedirectWarn) => this.popupRedirectWarn = popupRedirectWarn} button1={"OK"} button1Action={()=>{openURL(this.redirectUrl)}} button2={"Cancel"} button2Action={()=>{return}} text={"Leave MeteoNook?"} textLower={"You are about to leave MeteoNook."}/>
      </View>
      <View style={{zIndex:50, position:"absolute"}} pointerEvents="none">
      <FadeInOut fadeIn={true} delay={700} duration={300} startValue={1} endValue={0}>
        <View style={{alignItems:"center", justifyContent:"center", width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: colors.lightDarkAccent[global.darkMode]}}>
          <Image style={{width: "60%", height:"40%", resizeMode:"contain"}} source={require('../assets/icons/meteonookIcon.png')}/>
          <TextFont bold={true} style={{marginBottom: 10, fontSize:23, color:colors.textBlack[global.darkMode]}}>{"MeteoNook"}</TextFont>
          <TextFont bold={false} style={{marginBottom: 10, fontSize:15, color:colors.textBlack[global.darkMode]}}>{"By Ash Wolf @_Ninji"}</TextFont>
        </View>
      </FadeInOut>
      </View>
    </>)
  }
}
export default GuidePage;

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