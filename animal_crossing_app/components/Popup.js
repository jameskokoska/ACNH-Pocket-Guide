import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  Vibration,
  ScrollView,
  Dimensions
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";

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
    this.setPopupVisible(this.props.popupVisible);
    
    if(this.props.button1!==undefined){
      this.Button1 = <ButtonComponent
        text={this.props.button1}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={() => {
          this.setPopupVisible(!this.state.popupVisible);
          this.props.close();
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
          this.props.close();
          this.props.button2Action();
        }}
      /> 
    }
  }
  componentDidUpdate(){
    if(this.props.popupVisible===true&&this.state.popupVisible===false)
      this.setPopupVisible(this.props.popupVisible);
  }

  setPopupVisible = (visible) => {
    this.setState({popupVisible:visible});
  }

  render(){
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
          onRequestClose={()=>{this.setPopupVisible(false); this.props.close();}}
        >
        <View style={styles.centeredView}>
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