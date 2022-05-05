import React, { Component } from "react";
import {
  Linking,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  Easing
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import LottieView from 'lottie-react-native';
import Popup from "./Popup";
import {MailLink, GiveSupport} from "./Formattings";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openURL } from "../LoadJsonData";

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


class PopupTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: props.numLogins>=10 && props.tipDismissed==="false" ? true : false,
    };   
  }


  render(){
    if(this.props.show===true && this.state.popupVisible===false){
      this.setState({popupVisible:true})
      this.props.noShow();
    }
    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
        >
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
            <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Leave a tip?</TextFont>
            <View style={{height:10}}/>
            <GiveSupport/>
            <View style={{flexDirection:"row"}}>
              <ButtonComponent
                text={"No thanks"}
                color={colors.cancelButton[global.darkMode]}
                vibrate={10}
                onPress={() => {
                  this.setState({popupVisible:false})
                  AsyncStorage.setItem("tipDismissed", "true");
                }}
              /> 
              <ButtonComponent
                text={"Sure!"}
                color={colors.okButton[global.darkMode]}
                vibrate={5}
                onPress={() => {
                  this.setState({popupVisible:false, open2:true})
                  openURL(
                    "https://ko-fi.com/dapperappdeveloper"
                  );
                  AsyncStorage.setItem("tipDismissed", "true");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      </>
    )
  }
}
export default PopupTip;

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
    alignItems: "center",
    elevation: 5
  },
});