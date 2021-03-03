import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration
} from "react-native";
import TextFont from "../components/TextFont";
import ButtonComponent from "../components/ButtonComponent";
import colors from "../Colors";
import VillagerPopup from "./VillagerPopup"

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


class VillagerPopupPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      item:""
    };   
  }

  setPopupVisible = (visible, item) => {
    this.setState({popupVisible:visible, item:item});
  }

  render(){
    var villagerPopup = <View/>
    if(this.state.item!==undefined && this.state.item!==""){
      villagerPopup = <VillagerPopup item={this.state.item}/>
    }
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
          onRequestClose={()=>{this.setPopupVisible(false, this.state.item);}}
        >
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
            <TextFont bold={true} style={{fontSize: 30, marginTop: 0, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{this.state.item.["Name"]}</TextFont>
            {villagerPopup}
            <ButtonComponent
              text={"Close"}
              color={colors.okButton[global.darkMode]}
              vibrate={5}
              onPress={() => {
                this.setPopupVisible(false, this.state.item);
              }}
            />
          </View>
        </View>
      </Modal>
    )
  }
}
export default VillagerPopupPopup;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
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