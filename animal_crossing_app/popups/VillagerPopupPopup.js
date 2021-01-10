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
      popupVisible: false
    };   
    
  }
  componentDidMount() {
    this.setPopupVisible(this.props.popupVisible);
  }

  componentDidUpdate(){
    if(this.props.popupVisible===true&&this.state.popupVisible===false)
      this.setPopupVisible(this.props.popupVisible);
  }

  setPopupVisible = (visible) => {
    this.setState({popupVisible:visible});
  }

  render(){
    var villagerPopup = <View/>
    if(this.props.item!==undefined){
      villagerPopup = <VillagerPopup item={this.props.item}/>
    }
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
        >
        <View style={styles.centeredView}>
          <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
            <TextFont bold={true} style={{fontSize: 30, marginTop: 0, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{this.props.item.["Name"]}</TextFont>
            {villagerPopup}
            <ButtonComponent
              text={"Close"}
              color={colors.okButton[global.darkMode]}
              vibrate={5}
              onPress={() => {
                this.setPopupVisible(!this.state.popupVisible);
                this.props.close();
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