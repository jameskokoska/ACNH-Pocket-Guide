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
  Animated,
  Easing
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import * as StoreReview from 'expo-store-review';
import LottieView from 'lottie-react-native';
import Popup from "./Popup";
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


class PopupRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: props.numLogins===5 ? true : false,
      open2:false,
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
          <View style={[styles.modalView,{backgroundColor: colors.white[colors.mode]}]}>
            <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[colors.mode]}}>Enjoying the app?</TextFont>
            <TextFont bold={false} style={{fontSize: 18, textAlign:"center", color: colors.textBlack[colors.mode]}}>Consider leaving a rating</TextFont>
            <View style={{height:10}}/>
            <LottieView 
              autoPlay
              loop
              style={{
                width: 180,
              }}
              source={require('../assets/stars.json')}
            />
            <View style={{height:10}}/>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:dapperappdeveloper@gmail.com') }>
              <TextFont bold={false} style={{color: colors.fishText[colors.mode], fontSize: 14, textAlign:"center"}}>{"Suggestions, bugs, or concerns? \nSend me an email!"}</TextFont>
              <TextFont bold={false} style={{color: colors.fishText[colors.mode], fontSize: 15, textAlign:"center"}}>dapperappdeveloper@gmail.com</TextFont>
            </TouchableOpacity>
            <View style={{height:10}}/>
            <View style={{flexDirection:"row"}}>
              <ButtonComponent
                text={"No thanks"}
                color={colors.cancelButton[colors.mode]}
                vibrate={10}
                onPress={() => {
                  this.setState({popupVisible:false})
                }}
              /> 
              <ButtonComponent
                text={"Sure!"}
                color={colors.okButton[colors.mode]}
                vibrate={5}
                onPress={() => {
                  this.setState({popupVisible:false, open2:true})
                  Linking.openURL(
                    "https://play.google.com/store/apps/details?id=com.acnh.pocket_guide&showAllReviews=true"
                  );
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Popup 
        button1={"OK"} 
        button1Action={()=>{}}
        text={"Thank you!"}
        textLower={"Your feedback is always appreciated!"}
        popupVisible={this.state.open2} 
        close={() => this.setState({open2:!this.state.open2})}
      />
      </>
    )
  }
}
export default PopupRating;

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