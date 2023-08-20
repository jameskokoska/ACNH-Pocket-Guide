import React, { Component, PureComponent, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  BackHandler,
  Button
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import Animated from 'react-native-reanimated';
import FadeInOut from "./FadeInOut"
import { HeaderNote, MailLink, SubHeader } from "./Formattings";
import * as RootNavigation from '../RootNavigation.js';
import { Appearance } from 'react-native';
import LottieView from 'lottie-react-native';
import { attemptToTranslate, getSettingsString } from "../LoadJsonData";
import { AnimatedPopupWrapper } from "./PopupAnimatedWrapper";
import BottomSheet from 'react-native-scrollable-bottom-sheet';
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
      popupVisible: false,
    }
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
    if(this.state.popupVisible===true){
      this.setPopupVisible(false)
      return true
    } else {
      return false
    }
  }

  setPopupVisible = (visible, showOnceCalculated=false, oldKey="") => {
    this.setState({popupVisible:visible})
    setTimeout(()=>{
      this.setState({popupVisible:visible})
    }, 0)
  }

  render(){
    let imageWidth = getSettingsString("settingsLargerItemPreviews")==="false"?140:200
    let imageHeight = getSettingsString("settingsLargerItemPreviews")==="false"?80:160
    let middleHeightOffset = getSettingsString("settingsLargerItemPreviews")==="false"?100:90
    return (
      <>
        <BottomSheet 
          fullScreenPaddingTop={
            this.props.fullscreen===true ? reachabilityCalculation(0) : this.props.itemPopup===true ? reachabilityCalculation(0.15) : reachabilityCalculation(0.35)
          } 
          visible={this.state.popupVisible} 
          onVisibilityChange={(value)=>{
            this.setState({popupVisible: value}); 
            if(value===false && this.props.onClose!==undefined)this.props.onClose()
          }}
          hideSheetBackgroundContainer={true}
          hideHandle={true}
          customSheetMass={global.reducedMotion ? 0.00001 : 0.4}
          swipeDownThreshold={Dimensions.get('window').height * 0.05}
        >
          <View
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: this.props.invisible===undefined?(this.props.backgroundColor===undefined?colors.white[global.darkMode]:this.props.backgroundColor):"#0000000",
              padding:this.props.padding===undefined?16:this.props.padding,
              paddingTop: 1,
            }}
          >
            <View style={{width:"100%", alignItems:"center", paddingTop: this.props.invisible ? 0 : 10}}>
              <View style={{opacity: this.props.invisible===undefined?1:0,backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode], height:5, width: 45, borderRadius:50}}/>
            </View>
            <View style={{height:20}}/>
            {this.props.children}
            {this.props.invisible===true ? <View/> : <View style={{height:85}}/>}
          </View>
          {this.props.itemPopup?<TouchableOpacity onPress={()=>{this.setPopupVisible(false)}} style={{position:"absolute", backgroundColor:"transparent", height:middleHeightOffset, top:0, width:Dimensions.get('window').width}}/>:<View/>}
          {this.props.itemPopup?<TouchableOpacity onPress={()=>{this.setPopupVisible(false)}} style={{position:"absolute", backgroundColor:"transparent", height:imageHeight, left: 0, top:middleHeightOffset, width:(Dimensions.get('window').width - imageWidth) / 2 }}/>:<View/>}
          {this.props.itemPopup?<TouchableOpacity onPress={()=>{this.setPopupVisible(false)}} style={{position:"absolute", backgroundColor:"transparent", height:imageHeight, right: 0, top:middleHeightOffset, width:(Dimensions.get('window').width - imageWidth) / 2 }}/>:<View/>}
        </BottomSheet>
      </>
    )
  }
}

const reachabilityCalculation = (percent) => {
  const height = Dimensions.get('window').height;
  return (((height * percent) > 250 ? 250 : (height * percent)) - 30)
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

// export const DynamicSnapPoint = (props) => {
//   const [maxHeight, setMaxHeight] = useState("100%");
//   const bottomSheetRef = useRef(null);
//   const [children, setChildren] = useState(<></>)

//   useEffect(() => {
//     console.log(props.visible);
//     bottomSheetRef.current?.expand();
//   }, [props.visible]);

//   useEffect(() => {
//     setChildren(props.children)
//   }, [props.children]);

//   const {
//     animatedHandleHeight,
//     animatedSnapPoints,
//     animatedContentHeight,
//     handleContentLayout,
//     innerScrollViewAnimatedStyles,
//   } = useMaxHeightScrollableBottomSheet(maxHeight);

//   const handleExpandPress = useCallback(() => {
//     bottomSheetRef.current?.expand();
//   }, []);
//   const handleClosePress = useCallback(() => {
//     bottomSheetRef.current?.close();
//   }, []);
//   const handleSheetChange = useCallback((index) => {
//     console.log("handleSheetChange", index);
//   }, []);


//   return (
//       <BottomSheet
//         onChange={handleSheetChange}
//         handleIndicatorStyle={{ display: "none" }}
//         ref={bottomSheetRef}
//         snapPoints={animatedSnapPoints}
//         handleHeight={animatedHandleHeight}
//         contentHeight={animatedContentHeight}
//         enablePanDownToClose={true}
//         animateOnMount={false}
//         onClose={()=>{console.log("close")}}
//         backgroundStyle={{backgroundColor:"transparent"}}
//         backdropComponent={(props) => <BottomSheetBackdrop
//           { ... props}
//           disappearsOnIndex={-1}
//           appearsOnIndex={0} opacity={0.5} enableTouchThrough/>
//         }
//       >
//         <BottomSheetScrollView
//           style={innerScrollViewAnimatedStyles}
//           onLayout={handleContentLayout}
//           scrollEnabled={true}
//         >
//           <Text>Test</Text>
//           {children}
//         </BottomSheetScrollView>
//       </BottomSheet>
//   );
// };

// const styles2 = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//   },
//   contentContainerStyle: {
//     paddingTop: 12,
//     paddingBottom: 6,
//     paddingHorizontal: 24,
//     backgroundColor: "transparent",
//   },
//   item: {
//     alignContent: 'center',
//     height: 50,
//     width: '100%',
//   },
//   itemText: {
//     fontSize: 16,
//     width: '100%',
//     textAlign: 'center',
//   },
//   button: {
//     flex: 1,
//     flexShrink: 1,
//   },
//   buttonGroup: {
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   gap: {
//     width: 12,
//     height: '100%',
//   },
//   actionsContainer: {
//     padding: 12,
//   },
// });