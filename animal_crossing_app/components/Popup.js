import React, { Component } from "react";
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
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import BottomSheet from 'reanimated-bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import FadeInOut from "./FadeInOut"

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
    if(this.props.button1!==undefined){
      this.Button1 = <ButtonComponent
        text={this.props.button1}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={() => {
          this.setPopupVisible(!this.state.popupVisible);
          this.props.button1Action();
        }}
      />
    }
    if(this.props.button2!==undefined){
      this.Button2 = <ButtonComponent
        text={this.props.button2}
        color={colors.cancelButton[global.darkMode]}
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

  setPopupVisible = (visible) => {
    if(this.mounted){
      this.setState({popupVisible:visible});

    }
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
        <View style={styles.centeredView}>
          {this.props.button1===undefined && this.props.button2===undefined ? <View/> : <TouchableOpacity onPress={()=>{this.setPopupVisible(!this.state.popupVisible);}} style={{position:"absolute", width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: "black", opacity: 0.1}}/>}
          <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
            <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{this.props.text}</TextFont>
            <ScrollView style={{maxHeight:Dimensions.get('window').height*0.75}}>
              <TextFont bold={false} style={{fontSize: 18, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{this.props.textLower}</TextFont>
            </ScrollView>
            <View style={{flexDirection:"row", justifyContent:"center"}}>
              {this.Button2}
              {this.Button1}
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
export default Popup;


/* 
this.popup.setPopupVisible(true);
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
  }

  render(){
    var header = <View onLayout={(event) => {var {x, y, width, height} = event.nativeEvent.layout;if(this.mounted){this.setState({headerHeight:height});}}}>{this.props.header}</View>
    var buttons = <View onLayout={(event) => {var {x, y, width, height} = event.nativeEvent.layout;if(this.mounted){this.setState({buttonHeight:height});}}}>{this.props.buttons}</View>
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
          onRequestClose={()=>{this.setPopupVisible(false);}}
        >
        <View style={styles.centeredView}>
          <TouchableOpacity onPress={()=>{this.setPopupVisible(!this.state.popupVisible);}} style={{position:"absolute", width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: "black", opacity: 0.1}}/>
          <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
            {this.props.header===undefined ? <View/> : header}
            <ScrollView style={{maxHeight:Dimensions.get('window').height*0.75-this.state.headerHeight-this.state.buttonHeight}}>
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
        </View>
      </Modal>
    )
  }
}


// <PopupBottomCustom ref={(popup) => this.popup = popup} onClose={()=>this.props.onClose()}>
// </Popup>
export class PopupBottomCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightOffset:0,
      openStart:false,
    }
  }

  componentDidMount() {
    this.mounted=true;
  }

  componentWillUnmount() {
    this.mounted=false
  }

  setPopupVisible = (visible) => {
    if(this.mounted){
      visible ? this.sheetRef.snapTo(0) : this.sheetRef.snapTo(1)
    }
  }
  
  renderContent = () => {
    return(
      <>
      <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-this.state.heightOffset}}/>
      <View
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: this.props.invisible===undefined?colors.white[global.darkMode]:"#0000000",
          padding:this.props.padding===undefined?16:this.props.padding,
          paddingTop: 12,
          marginTop: this.props.restrictSize===false ? 0 : this.state.heightOffset+Dimensions.get('window').height*0.03+140>Dimensions.get('window').height ? Dimensions.get('window').height*0.03+140 : 0
        }}
        onLayout={(event) => {
            var {x, y, width, height} = event.nativeEvent.layout;
            if(this.mounted){
              this.setState({heightOffset:height});
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

  bottomSheetCallback = new Animated.Value(1);

  render(){
    const springConfig = {
        damping: 20,
        mass: 1,
        stiffness: 135,
        overshootClamping: true,
        restSpeedThreshold: 0.01,
        restDisplacementThreshold: 0.001,
    };
    return (
      <>
      <BottomSheet
        callbackNode={this.bottomSheetCallback}
        ref={(sheetRef) => this.sheetRef = sheetRef}
        snapPoints={[Dimensions.get('window').height, 0]}
        initialSnap={1}
        renderContent={this.renderContent}
        springConfig={springConfig}
        enabledContentTapInteraction={false}
        onCloseStart={()=>{if(this.mounted){this.setState({openStart:false})}}}
        onCloseEnd={()=>{if(this.mounted){this.setState({openStart:false});} this.props.onClose===undefined ? 0 : this.props.onClose();}}
        onOpenStart={()=>{if(this.mounted){this.setState({openStart:true})}}}
        onOpenEnd={()=>{if(this.mounted){this.setState({openStart:true})}}}
      />
      <Animated.View style={{zIndex:99, backgroundColor: "black", opacity: Animated.multiply(-0.8,Animated.add(-0.7,Animated.multiply(this.bottomSheetCallback,1))), width: Dimensions.get('window').width, height: Dimensions.get('window').height, position:"absolute"}} pointerEvents="none"/>
      </>
    )
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: "10%",
    backgroundColor:"rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 10,
    borderRadius: 10,
    padding: 20,
    elevation: 5
  },
});