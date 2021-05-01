import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Vibration,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import {getPhoto, getMaterialImage} from "./GetPhoto"
import {PopupInfoCustom} from "./Popup"
import ToggleSwitch from 'toggle-switch-react-native'
import {getSettingsString,attemptToTranslate} from "../LoadJsonData"
import FastImage from "./FastImage"
import {SelectionImage} from "./Selections"

export default class PopupAddLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
    };
    this.loan = {title: "", total:0, current:0};
  }

  setPopupVisible = (visible) => {
    this.popup?.setPopupVisible(true);
    this.loan = {title: "", total:0, current:0};
  }

  render(){
    var buttons = <>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <ButtonComponent
          text={"Cancel"}
          color={colors.cancelButton[global.darkMode]}
          vibrate={8}
          onPress={() => {
            this.popup?.setPopupVisible(false);
          }}
        /> 
        <ButtonComponent
          text={"Done"}
          color={colors.okButton[global.darkMode]}
          vibrate={15}
          onPress={() => {
            this.loan.total = parseInt(this.loan.total.toString().replace(/[^0-9]/g, ''));
            this.props.addItem(this.loan);
            this.popup?.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    var header = <>
      <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Add Loan</TextFont>      
      <View style={{height:10}}/>
    </>
    return (
      <>
        <PopupInfoCustom ref={(popup) => this.popup = popup} buttonDisabled={true} buttons={buttons} header={header}>
          <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
            <View style={{flex:1, justifyContent:"center", marginHorizontal:5,}}>
              <TextInput
                maxLength={30}
                allowFontScaling={false}
                style={{fontSize: 20, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 10, borderRadius: 5}}
                onChangeText={(text) => {this.loan.title=text}}
                placeholder={attemptToTranslate("Loan Name")}
                placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
              />
              <View style={{height:10}}/>
              <TextInput
                maxLength={12}
                keyboardType={"numeric"}
                allowFontScaling={false}
                style={{fontSize: 20, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 10, borderRadius: 5}}
                onChangeText={(text) => {this.loan.total=text}}
                placeholder={attemptToTranslate("Total Cost")}
                placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
              />
            </View>
          </View>
        </PopupInfoCustom>
      </>
    )
  }
}

export class PopupAmountEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
    };
    this.amount = 0
  }

  setPopupVisible = (visible) => {
    this.popup?.setPopupVisible(true);
    this.amount = 0
  }

  render(){
    var buttons = <>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <ButtonComponent
          text={"Cancel"}
          color={colors.cancelButton[global.darkMode]}
          vibrate={8}
          onPress={() => {
            this.popup?.setPopupVisible(false);
          }}
        /> 
        <ButtonComponent
          text={"Done"}
          color={colors.okButton[global.darkMode]}
          vibrate={15}
          onPress={() => {
            this.amount = parseInt(this.amount.toString().replace(/[^0-9]/g, ''));
            this.props.editItem(this.amount);
            this.popup?.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    var header = <>
      <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{this.props.title}</TextFont>      
      <View style={{height:10}}/>
    </>
    return (
      <>
        <PopupInfoCustom ref={(popup) => this.popup = popup} buttonDisabled={true} buttons={buttons} header={header}>
          <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
            <View style={{flex:1, justifyContent:"center", marginHorizontal:5,}}>
              <TextInput
                maxLength={12}
                keyboardType={"numeric"}
                allowFontScaling={false}
                style={{fontSize: 20, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 10, borderRadius: 5}}
                onChangeText={(text) => {this.amount=text}}
                placeholder={attemptToTranslate("Amount")}
                placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
              />
            </View>
          </View>
        </PopupInfoCustom>
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
    alignItems: "center",
    elevation: 5
  },
});