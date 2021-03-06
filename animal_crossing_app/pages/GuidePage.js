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
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  render(){
    return(
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <WebView
          ref={(webView) => this.webView = webView}
          source={{ uri: 'https://chibisnorlax.github.io/acnhfaq/' }}
          style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height }}
          injectedJavaScript={"document.body.style.userSelect = 'none'"}
          onError={(syntheticEvent) => {
            this.popup.setPopupVisible(true);
          }}
          incognito
          renderLoading={() => (
            <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
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
        <BottomBar 
          openMenu={()=>this.props.openMenu()} 
          goBack={()=>this.webView.goBack()} 
          canGoBack={this.state.canGoBack}
          goForward={()=>this.webView.goForward()}
          canGoForward = {this.state.canGoForward}
        />
        <Popup ref={(popup) => this.popup = popup} button1={"OK"} button1Action={()=>{return}} text={"Error"} textLower={"There was an error loading. Note that this feature needs an internet connection."}/>
     </View>
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
  }
  
  render(){
    return <View style={{flexDirection: "row", elevation:5, backgroundColor:colors.lightDarkAccent[global.darkMode], width:Dimensions.get('window').width, height:45}}>
      <TouchableNativeFeedback onPress={()=>{this.goBack(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.lightDarkAccentHeavy[global.darkMode], false)}>
        <View style={{ width:Dimensions.get('window').width/3, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <FadeInOut duration={200} fadeIn={this.props.canGoBack ? true : false}>
            <Image
              style={{width:25,height:25,resizeMode:'contain',}}
              source={global.darkMode ? require("../assets/icons/leftArrowWhite.png") : require("../assets/icons/leftArrow.png")}
            />
          </FadeInOut>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{this.goForward(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.lightDarkAccentHeavy[global.darkMode], false)}>
        <View style={{width:Dimensions.get('window').width/3, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <FadeInOut duration={200} fadeIn={this.props.canGoForward ? true : false}>
            <Image
              style={{width:25,height:25,resizeMode:'contain',}}
              source={global.darkMode ? require("../assets/icons/rightArrowWhite.png") : require("../assets/icons/rightArrow.png")}
            />
          </FadeInOut>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={()=>{this.openMenu(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}} background={TouchableNativeFeedback.Ripple(colors.lightDarkAccentHeavy[global.darkMode], false)}>
        <View style={{width:Dimensions.get('window').width/3, backgroundColor:colors.lightDarkAccent[global.darkMode], height:45, justifyContent:"center", alignItems:"center"}}>
          <Image
            style={{width:22,height:22,resizeMode:'contain',}}
            source={global.darkMode ? require("../assets/icons/menuIconWhite.png") : require("../assets/icons/menuIcon.png")}
          />
        </View>
      </TouchableNativeFeedback>
    </View>
  }
}