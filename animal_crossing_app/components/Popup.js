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
import TextFont from "./TextFont"
import ButtonComponent from "./ButtonComponent"

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
        color={"#2196F3"}
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
        text={"Cancel"}
        color={"red"}
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
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextFont bold={true} style={{fontSize: 28, textAlign:"center"}}>{this.props.text}</TextFont>
            <TextFont bold={false} style={{fontSize: 18, textAlign:"center"}}>{this.props.textLower}</TextFont>
            <View style={{flexDirection:"row"}}>
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
    marginTop: "10%",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});