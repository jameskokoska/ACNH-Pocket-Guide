import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Vibration,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import DropDownPicker from 'react-native-dropdown-picker'
import {getPhoto} from "./GetPhoto"
import {PopupBottomCustom} from "./Popup"


class PopupChangelog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false
    };
  }

  componentDidUpdate(){
    if(this.props.popupVisible===true&&this.state.popupVisible===false)
      this.setPopupVisible(this.props.popupVisible);
  }

  setPopupVisible = (visible) => {
    this.popup.setPopupVisible(visible)
  }

  render(){
    var changelogText = this.props.textLower.toString();
    changelogText = changelogText.split("\n-");
    return (
      <>
        <PopupBottomCustom ref={(popup) => this.popup = popup} onClose={()=>this.props.onClose()}>
          <TextFont bold={true} style={{fontSize: 28, textAlign:"center",color: colors.textBlack[global.darkMode],}}>{this.props.text}</TextFont>
          {
            changelogText.map((point, index) => (
                <TextFont key={index} bold={false} style={{marginBottom:4, fontSize: 18, color: colors.textBlack[global.darkMode]}}>{point}</TextFont>
            ))
          }
        </PopupBottomCustom>
      </>
    )
  }
}
export default PopupChangelog;

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