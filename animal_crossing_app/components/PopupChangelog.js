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
import {getStorage} from "../LoadJsonData"
import AsyncStorage from '@react-native-async-storage/async-storage';

class PopupChangelog extends Component {
  async componentDidMount(){
    this.openChangelog = await getStorage("changelog","");
    if(this.openChangelog === "" || this.openChangelog !== global.version){
      this.timeoutHandle = setTimeout(()=>{
        this.setPopupVisible(true);
      }, 50);
    }
  }

  setPopupVisible = (visible) => {
    this.popup.setPopupVisible(visible)
  }

  render(){
    var changelogText = global.changelog.toString();
    changelogText = changelogText.split("\n-");
    return(
      <>
        <PopupBottomCustom ref={(popup) => this.popup = popup} onClose={async () => {await AsyncStorage.setItem("changelog", global.version)}}>
          <TextFont bold={true} style={{fontSize: 28, textAlign:"center",color: colors.textBlack[global.darkMode],}}>{"What's New?"}</TextFont>
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