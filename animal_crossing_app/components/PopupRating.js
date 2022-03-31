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
  Easing, Dimensions, Platform
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import LottieView from 'lottie-react-native';
import Popup from "./Popup";
import {MailLink} from "./Formattings";
import { getSettingsString } from "../LoadJsonData";
import { AnimatedPopupWrapper } from "./PopupAnimatedWrapper";

class PopupRating extends Component {
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
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
        >
        <AnimatedPopupWrapper style={styles.centeredView} disableAnimations={getSettingsString("settingsLowEndDevice")==="true"}>
          <View style={backgroundStyle}/>
          <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
            <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Enjoying the app?</TextFont>
            <TextFont bold={false} style={{fontSize: 18, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Consider leaving a rating</TextFont>
            <View style={{height:10}}/>
            {Platform.OS != 'web' ? <LottieView 
              autoPlay
              loop
              style={{
                width: 180,
              }}
              source={require('../assets/stars.json')}
            /> : null }
            <View style={{height:10}}/>
            <MailLink/>
            <View style={{height:10}}/>
            <View style={{flexDirection:"row"}}>
              <ButtonComponent
                text={"No thanks"}
                color={colors.cancelButton[global.darkMode]}
                vibrate={10}
                onPress={() => {
                  this.setState({popupVisible:false})
                }}
              /> 
              <ButtonComponent
                text={"Sure!"}
                color={colors.okButton[global.darkMode]}
                vibrate={5}
                onPress={() => {
                  this.setState({popupVisible:false})
                  Linking.openURL(
                    "https://play.google.com/store/apps/details?id=com.acnh.pocket_guide&showAllReviews=true"
                  );
                }}
              />
            </View>
          </View>
        </AnimatedPopupWrapper>
      </Modal>
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
  },
  modalView: {
    margin: 10,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5
  },
});