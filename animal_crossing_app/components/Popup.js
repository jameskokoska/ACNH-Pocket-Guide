import React, { Component, PureComponent } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  Vibration,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  BackHandler
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import FadeInOut from "./FadeInOut"
import { HeaderNote, MailLink, SubHeader } from "./Formattings";
import * as RootNavigation from '../RootNavigation.js';
import { Appearance } from 'react-native';
import LottieView from 'lottie-react-native';
import { attemptToTranslate, getSettingsString } from "../LoadJsonData";
import { AnimatedPopupWrapper } from "./PopupAnimatedWrapper";

// <Popup 
//  button1={"OK"} 
//  button1Action={()=>{console.log("OK")}}
//  button2={"Cancel"} 
//  text={"Title"}
//  textLower={"Description"}
//  button2Action={()=>{ }}
//  popupVisible={this.state.open} 
//  close={() => this.setState({open:!this.state.open})}
// />


class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false
    };   
    
  }
  componentDidMount() { 
    this.mounted=true;
    if(this.props.popupVisible){
      this.setPopupVisible(true)
    }
    if(this.props.button1!==undefined){
      this.Button1 = <ButtonComponent
        checkFont={this.props.checkFont}
        text={this.props.button1}
        color={colors.okButton[global.darkMode]??colors.okButton3[0]}
        vibrate={5}
        onPress={async () => {
          this.setPopupVisible(!this.state.popupVisible);
          this.props.button1Action();
        }}
      />
    }
    if(this.props.button2!==undefined){
      this.Button2 = <ButtonComponent
        checkFont={this.props.checkFont}
        text={this.props.button2}
        color={this.props.accentCancel===true ? colors.okButton3[global.darkMode] : (colors.cancelButton[global.darkMode]??colors.okButton[0])}
        vibrate={10}
        onPress={() => {
          this.setPopupVisible(!this.state.popupVisible);
          this.props.button2Action();
        }}
      /> 
    }
  }

  componentWillUnmount() {
    this.mounted=false
  }
  // componentDidUpdate(){
  //   if(this.props.popupVisible===true&&this.state.popupVisible===false)
  //     this.setPopupVisible(this.props.popupVisible);
  // }

  setPopupVisible = (visible, text="", textLower="") => {
    if(this.mounted){
      this.setState({popupVisible:visible, text:text, textLower:textLower});
    }
  }

  render(){
    let darkMode = this.props.darkMode ? this.props.darkMode : global.darkMode
    const backgroundStyle = {position:"absolute", left:-100, top:-100, width: Dimensions.get('window').width+200, height: Dimensions.get('window').height+200, backgroundColor: "black", opacity: 0.6}
    

    let text = <View/>
    if(this.state.text!==undefined && this.state.text!==""){
      text = <TextFont checkFont={this.props.checkFont} bold={true} style={{fontSize: 25, textAlign:"center", color: colors.textBlack[darkMode]}}>{this.state.text}</TextFont>
    } else if(this.props.text!==undefined){
      text = <TextFont checkFont={this.props.checkFont} bold={true} style={{fontSize: 25, textAlign:"center", color: colors.textBlack[darkMode]}}>{this.props.text}</TextFont>
    }
    let textLower = <View/>
    if(this.state.textLower!==undefined && this.state.textLower!==""){
      textLower = <TextFont checkFont={this.props.checkFont} bold={false} style={{fontSize: 17, textAlign:"center", color: colors.textBlack[darkMode]}}>{this.state.textLower}</TextFont>
    } else if(this.props.textLower!==undefined){
      textLower = <TextFont checkFont={this.props.checkFont} bold={false} style={{fontSize: 17, textAlign:"center", color: colors.textBlack[darkMode]}}>{this.props.textLower}</TextFont>
    }
    
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.popupVisible}
        statusBarTranslucent
        onRequestClose={()=>{(this.props.button1===undefined && this.props.button2===undefined) || this.props.noDismiss===true ? 0 : this.setPopupVisible(false);}}
      >
        <AnimatedPopupWrapper style={[styles.centeredView,{padding:this.props.centerPadding}]} disableAnimations={getSettingsString("settingsLowEndDevice")==="true"}>
          {(this.props.button1===undefined && this.props.button2===undefined) || this.props.noDismiss===true ? <View style={backgroundStyle}/> : <TouchableOpacity onPress={()=>{this.setPopupVisible(!this.state.popupVisible);}} activeOpacity={0.55} style={backgroundStyle}/>}
          <View style={[styles.modalView,{backgroundColor: colors.white[darkMode], justifyContent:"center", alignItems:"center"}]}>
            {text}
            <ScrollView style={{maxHeight:Dimensions.get('window').height*0.75, marginTop:this.props.margin?10:0}}>
              {textLower}
              {this.props.loading?<LottieView autoPlay loop
                style={{marginBottom:-10, width: 80, zIndex:1,marginTop:4}}
                source={require('../assets/loading.json')}
              />:<View/>}
            </ScrollView>
            {this.props.mailLink?<View style={{marginVertical:10}}><MailLink/></View>:<View/>}
            {this.props.support2?<View style={{marginVertical:10}}><HeaderNote style={{textAlign:'center'}}>If you already supported, thank you!!</HeaderNote></View>:<View/>}
            <View style={{flexDirection:"row", justifyContent:"center"}}>
              {this.Button2}
              {this.Button1}
            </View>
          </View>
        </AnimatedPopupWrapper>
      </Modal>
    )
  }
}
export default Popup;


export class PopupRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      text: ""
    };
  }
  
  setPopupVisible = (visible) => {
    this.setState({popupVisible:visible});
  }

  setPopupText = (text) => {
    this.setState({text:text});
  }

  render(){
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
          onRequestClose={()=>{this.props.button1===undefined && this.props.button2===undefined ? 0 : this.setPopupVisible(false);}}
        >
        <AnimatedPopupWrapper style={[{position:"absolute",bottom:0, width: Dimensions.get('window').width}]} disableAnimations={true}>
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <View style={[styles.modalView,{backgroundColor: colors.white[Appearance.getColorScheme()==="light" ? 0 : 1]}]}>
              <TextFont bold={true} style={{fontSize: this.props.textFontSize===undefined?24:this.props.textFontSize, textAlign:"center", color: colors.textBlack[Appearance.getColorScheme()==="light" ? 0 : 1]}}>{this.props.text}</TextFont>
              <ScrollView style={{maxHeight:Dimensions.get('window').height*0.75}}>
                {this.props.textLower!==undefined?<TextFont bold={false} style={{fontSize: 16, textAlign:"center", color: colors.textBlack[Appearance.getColorScheme()==="light" ? 0 : 1]}}>{this.props.textLower}</TextFont>:<View/>}
                {this.props.textLower2!==undefined?<TextFont bold={false} style={{fontSize: 16, textAlign:"center", color: colors.textBlack[Appearance.getColorScheme()==="light" ? 0 : 1]}}>{this.props.textLower2}</TextFont>:<View/>}
                {this.state.text!==undefined?<TextFont bold={false} style={{fontSize: 16, textAlign:"center", color: colors.textBlack[Appearance.getColorScheme()==="light" ? 0 : 1]}}>{this.state.text}</TextFont>:<View/>}
                <View style={{justifyContent:"center", alignItems:"center"}}>
                  <LottieView autoPlay loop
                    style={{width: this.props.loadingWidth===undefined?90:this.props.loadingWidth, zIndex:1, transform: [{ scale: this.props.loadingScale===undefined?1.1:this.props.loadingScale },{ rotate: '0deg'},],}}
                    source={require('../assets/loading.json')}
                  />
                </View>
              </ScrollView>          
            </View>
          </View>
        </AnimatedPopupWrapper>
      </Modal>
    )
  }
}

export class PopupOnlyLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
    };
  }

  setPopupVisible = (visible) => {
    this.setState({popupVisible:visible});
  }

  render(){
    const backgroundStyle = {position:"absolute", left:-100, top:-100, width: Dimensions.get('window').width+200, height: Dimensions.get('window').height+200, backgroundColor: "black", opacity: 0.6}
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.popupVisible}
        statusBarTranslucent
        onRequestClose={()=>{this.props.button1===undefined && this.props.button2===undefined ? 0 : this.setPopupVisible(false);}}
      >
        <View style={backgroundStyle}/>
        <AnimatedPopupWrapper style={[styles.centeredView, {width: Dimensions.get('window').width}]} disableAnimations={getSettingsString("settingsLowEndDevice")==="true"}>
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
              <TextFont translate={false} bold={true} style={{paddingHorizontal: 20, fontSize: 20, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{attemptToTranslate("Please wait")+"..."}</TextFont>
              <View style={{justifyContent:"center", alignItems:"center"}}>
                <LottieView autoPlay loop
                  style={{marginBottom: -25, width: 90, zIndex:1, transform: [{ scale: 1 },{ rotate: '0deg'},],}}
                  source={require('../assets/loading.json')}
                />
              </View>   
            </View>
          </View>
        </AnimatedPopupWrapper>
      </Modal>
    )
  }
}

export class PopupRawLoading extends Component {
  intervalID = 0;

  constructor(props) {
    super(props);
    this.allLoadingTexts = [
      "Loading", 
      "Building Museum", 
      "Ordering Coffee", 
      "Talking to Villagers",
      "Talking to Brewster",
      "Flying with Orville",
      "Landing on the sea",
      "Picking up seashells",
      "Shaking trees",
      "Popping balloons",
      "Crafting DIYs",
      "Selling turnips",
      "Time travelling",
      "Listening to K.K.",
      "Upgrading house",
      "Selling items",
      "Making bells",
      "Watering flowers",
      "Smashing rocks",
      "Waking up Gulliver",
      "Buying art from Redd",
      "Collecting Nook Miles",
      "Digging fossils",
      "Finding message bottle",
      "Checking turnip prices",
      "Dressing up in the Able Sisters",
      "Visiting Harv",
      "Finding Gyroids",
      "Catching butterflies",
      "Visiting Isabelle",
      "Looking for Flick to sell your critters",
      "Looking for CJ to sell your fish",
      "Looking for Celeste to get a magical DIY",
      "Looking for Sahara to buy mystery wallpapers",
      "Looking for Daisy Mae to buy Turnips",
      "Planting pitfalls",
      "Watch out for pitfalls"
    ]
    let loadingText = this.allLoadingTexts[Math.floor(Math.random()*this.allLoadingTexts.length)]
    this.state = {
      popupVisible: false,
      loadingText: loadingText
    };
  }

  componentDidMount(){
    this.intervalID = setInterval(()=>{
      this.setState({loadingText:this.allLoadingTexts[Math.floor(Math.random()*this.allLoadingTexts.length)]})
    }, 4000);
  }
  
  setPopupVisible = (visible) => {
    this.setState({popupVisible:visible});
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render(){
    let NPCNames = ["Flick", "CJ", "Celeste", "Sahara", "Daisy Mae", "Isabelle", "Brewster", "Orville", "Gulliver", "Redd", "Harv", "Harvey"]
    let loadingText = attemptToTranslate(this.state.loadingText, true)
    for(let name of NPCNames){
      loadingText = loadingText.replace(" " + name + " ", " " + attemptToTranslate(name, true) + " ").replace("  ", " ")
      loadingText = loadingText.replace(name + " ", attemptToTranslate(name, true) + " ").replace("  ", " ")
      loadingText = loadingText.replace(" " + name, " " + attemptToTranslate(name, true) + " ").replace("  ", " ")
    }
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.popupVisible}
        statusBarTranslucent
        onRequestClose={()=>{this.props.button1===undefined && this.props.button2===undefined ? 0 : this.setPopupVisible(false);}}
      >
        <AnimatedPopupWrapper style={[{position:"absolute",bottom:0, width: Dimensions.get('window').width}]}>
          <View style={{alignItems:"center", justifyContent:"center"}}>
            <View style={[styles.modalView,{backgroundColor: colors.white[Appearance.getColorScheme()==="light" ? 0 : 1]}]}>
              <TextFont translate={false} bold={true} style={{paddingHorizontal: 20, fontSize: 20, textAlign:"center", color: colors.textBlack[Appearance.getColorScheme()==="light" ? 0 : 1]}}>{loadingText+"..."}</TextFont>
              <View style={{justifyContent:"center", alignItems:"center"}}>
                <LottieView autoPlay loop
                  style={{marginBottom: -25, width: 90, zIndex:1, transform: [{ scale: 1 },{ rotate: '0deg'},],}}
                  source={require('../assets/loading.json')}
                />
              </View>   
            </View>
          </View>
        </AnimatedPopupWrapper>
      </Modal>
    )
  }
}

/* 
this.popup?.setPopupVisible(true);
<PopupInfoCustom ref={(popup) => this.popup = popup} buttonText={"Close"}>
</PopupInfoCustom> 
*/

export class PopupInfoCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      headerHeight: 0,
      buttonHeight:0,
    };   
    
  }

  componentDidMount() {
    this.mounted=true;
  }

  componentWillUnmount() {
    this.mounted=false
  }

  setPopupVisible = (visible) => {
    if(this.mounted){
      this.setState({popupVisible:visible});
    }
    if(this.props.onClose!==undefined && !visible){
      this.props.onClose();
    }
  }

  render(){
    var header = <View onLayout={(event) => {var {x, y, width, height} = event.nativeEvent.layout;if(this.mounted){this.setState({headerHeight:height});}}}>{this.props.header}</View>
    var buttons = <View onLayout={(event) => {var {x, y, width, height} = event.nativeEvent.layout;if(this.mounted){this.setState({buttonHeight:height});}}}>{this.props.buttons}</View>
    const backgroundStyle = {position:"absolute", left:-100, top:-100, width: Dimensions.get('window').width+200, height: Dimensions.get('window').height+200, backgroundColor: "black", opacity: 0.6}
    const maxHeight = Dimensions.get('window').height*0.7-this.state.headerHeight-this.state.buttonHeight
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
          onRequestClose={()=>{this.props.noDismiss===true ? 0 : this.setPopupVisible(false);}}
        >
        <AnimatedPopupWrapper style={styles.centeredView} disableAnimations={getSettingsString("settingsLowEndDevice")==="true"}>
          {this.props.noDismiss===true ? <View style={backgroundStyle}/> : <TouchableOpacity onPress={()=>{this.setPopupVisible(!this.state.popupVisible);}} activeOpacity={0.55} style={backgroundStyle}/>}
          <View style={[styles.modalView,this.props.style,{backgroundColor: colors.white[global.darkMode]}]}>
            {this.props.header===undefined ? <View/> : header}
            <ScrollView style={this.props.alwaysMaxHeight===true ? {maxHeight:maxHeight, height: maxHeight} : {maxHeight:maxHeight}}>
              {this.props.children}
            </ScrollView>
            <View style={{flexDirection:"row", justifyContent:"center"}}>
              {!this.props.buttonDisabled ? <ButtonComponent
                text={this.props.buttonText}
                color={colors.okButton[global.darkMode]}
                vibrate={5}
                onPress={() => {
                  this.setPopupVisible(!this.state.popupVisible);
                }}
              /> : this.props.buttons===undefined ? <View/> : buttons}
            </View>
          </View>
        </AnimatedPopupWrapper>
      </Modal>
    )
  }
}


// <PopupBottomCustom ref={(popup) => this.popup = popup} onClose={()=>this.props.onClose()}>
// </Popup>
export class PopupBottomCustom extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      heightOffset:0,
      openStart:false,
    }
    this.bottomSheetCallback = new Animated.Value(1);
    this.showOnceCalculated = false
    this.height = Dimensions.get('window').height
    this.oldKey = ""
  }

  componentDidMount() {
    this.mounted=true;
    this.visible=false;
    this.backHandler = BackHandler.addEventListener(
      "1hardwareBackPressPopup",
      this.handleBackButton,
    );
  }

  componentWillUnmount() {
    this.mounted=false
    BackHandler.removeEventListener("1hardwareBackPressPopup", this.handleBackButton);
  }

  handleBackButton = () => {
    if(this.visible===true){
      this.setPopupVisible(false)
      return true
    } else {
      // RootNavigation.popRoute(1)
      // if(RootNavigation.getCurrentRoute()==="Home"){
      //   return true;
      // }
      return false
    }
  }

  setPopupVisible = (visible, showOnceCalculated=false, oldKey="") => {
    this.showOnceCalculated = showOnceCalculated
    if(this.mounted){
      this.setState({heightOffset:0})
      if(showOnceCalculated===false || getSettingsString("settingsLowEndDevice")==="true"){
        visible ? this.sheetRef?.snapTo(0) : this.sheetRef?.snapTo(1)
        this.visible = visible
      } else {
        this.timeOutPopup = setTimeout(()=>{
          //if it cant calculate the new height in 100ms, force show
          if(this.showOnceCalculated === true){
            this.showOnceCalculated = false
            this.sheetRef?.snapTo(0)
            this.visible = true
            // console.log("POP2")
          }
        },100)
      }
      this.oldKey = oldKey
    }
  }
  
  renderContent = () => {
    let overHeight = this.state.heightOffset+Dimensions.get('window').height*0.03+140>Dimensions.get('window').height
    let offsetTop = Dimensions.get('window').height*0.03+140
    let itemPopupCompensation = (this.props.itemPopup?(getSettingsString("settingsLargerItemPreviews")==="false"?170:250):0)
    let touchableDismiss = <TouchableOpacity activeOpacity={1} style={{top:0,bottom:this.state.heightOffset-itemPopupCompensation,zIndex:5,position:"absolute", width:Dimensions.get('window').width}} onPress={()=>{this.setPopupVisible(false);}}/>
    let touchableDismiss2 = <View/>
    let touchableDismiss3 = <View/>
    //make a custom cutout for image (image can be tapped for larger preview)
    //image is 130 by 130
    //if larger its 210 by 210
    if(this.props.itemPopup){
      let imageWidth = getSettingsString("settingsLargerItemPreviews")==="false"?150:210
      let middleHeightOffset = getSettingsString("settingsLargerItemPreviews")==="false"?70:150
      touchableDismiss = <TouchableOpacity activeOpacity={1} style={{left:0, right: Dimensions.get('window').width/2 + imageWidth/2, top:0,bottom:this.state.heightOffset-itemPopupCompensation,zIndex:5,position:"absolute"}} onPress={()=>{this.setPopupVisible(false);}}/>
      touchableDismiss2 = <TouchableOpacity activeOpacity={1} style={{right:0, left: Dimensions.get('window').width/2 + imageWidth/2, top:0,bottom:this.state.heightOffset-itemPopupCompensation,zIndex:5,position:"absolute"}} onPress={()=>{this.setPopupVisible(false);}}/>
      touchableDismiss3 = <TouchableOpacity activeOpacity={1} style={{left:Dimensions.get('window').width/2 - imageWidth/2, right: Dimensions.get('window').width/2 - imageWidth/2, top:0,bottom:this.state.heightOffset-itemPopupCompensation+middleHeightOffset,zIndex:5,position:"absolute"}} onPress={()=>{this.setPopupVisible(false);}}/>
    }
    return(
      <>
      {touchableDismiss}
      {touchableDismiss2}
      {touchableDismiss3}
      <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-this.state.heightOffset}} onPress={()=>{this.setPopupVisible(false);}}/>
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: this.props.invisible===undefined?(this.props.backgroundColor===undefined?colors.white[global.darkMode]:this.props.backgroundColor):"#0000000",
          padding:this.props.padding===undefined?16:this.props.padding,
          paddingTop: 12,
          marginTop: this.props.restrictSize===false ? 0 : overHeight ? offsetTop : 0
        }}
        onLayout={(event) => {
            var {x, y, width, height} = event.nativeEvent.layout;
            if(this.mounted){
              this.setState({heightOffset:height});
              if(this.showOnceCalculated){
                clearTimeout(this.timeOutPopup)
                // console.log("POP1")
                this.sheetRef?.snapTo(0)
                this.visible = true
                this.showOnceCalculated = false
              }
            }
          }} 
      >
        <FadeInOut fadeIn={this.state.openStart} scaleInOut={true} duration={200} maxFade={0.4} minScale={0.7}>
          <View style={{width:"100%", alignItems:"center"}}>
            <View style={{opacity: this.props.invisible===undefined?1:0,backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode], height:5, width: 45, borderRadius:50}}/>
          </View>
        </FadeInOut>
        <View style={{height:20}}/>
        {this.props.children}
        {this.props.invisible===true ? <View/> : <View style={{height:85}}/>}
      </View>
      </>

    )
  }


  render(){
    const springConfig = {
        damping: 20,
        mass: 1,
        stiffness: global.reducedMotion ? 100000000 : 135,
        overshootClamping: true,
        restSpeedThreshold: 0.01,
        restDisplacementThreshold: 0.001,
    };
    return (
      <>
      {this.bottomSheetCallback?<Animated.View style={{zIndex:50, backgroundColor: "black", opacity: Animated.multiply(-0.8,Animated.add(-0.7,Animated.multiply(this.bottomSheetCallback,1))), width: Dimensions.get('window').width, height: Dimensions.get('window').height, position:"absolute"}} pointerEvents="none"/>:<View/>}
      <BottomSheet
        callbackNode={this.bottomSheetCallback}
        ref={(sheetRef) => this.sheetRef = sheetRef}
        snapPoints={[this.height, 0, ]}
        initialSnap={1}
        renderContent={this.renderContent}
        springConfig={springConfig}
        enabledContentTapInteraction={false}
        onCloseStart={()=>{if(this.mounted){this.setState({openStart:false})}}}
        onCloseEnd={()=>{if(this.mounted){this.visible=false; this.setState({openStart:false}); this.state.heightOffset = 0} this.props.onClose===undefined ? 0 : this.props.onClose();}}
        onOpenStart={()=>{if(this.mounted){this.setState({openStart:true})}}}
        onOpenEnd={()=>{if(this.mounted){this.setState({openStart:true})}}}
      />
      </>
    )
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    paddingTop: "10%",
  },
  modalView: {
    margin: 30,
    borderRadius: 15,
    padding: 20,
    elevation: 5
  },
});