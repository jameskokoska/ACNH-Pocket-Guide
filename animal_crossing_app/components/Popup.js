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

class Popup extends Component {
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
    const {popupVisible} = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={popupVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextFont bold={true} style={{fontSize: 28}}>Hello World!</TextFont>
            <TextFont bold={false} style={{fontSize: 18}}>This is some text...</TextFont>

            <View style={{flexDirection:"row"}}>
              <TouchableOpacity
                style={{marginLeft: 10, marginRight: 10, marginTop: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 7, backgroundColor: "red" }}
                activeOpacity={0.5}
                onPress={() => {
                  this.setPopupVisible(!popupVisible);
                  this.props.close();
                  Vibration.vibrate(15);
                }}
              >
                <TextFont style={{fontSize: 16, color: "white"}}>Cancel</TextFont>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 10, marginRight: 10, marginTop: 20, paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10, borderRadius: 7, backgroundColor: "#2196F3" }}
                activeOpacity={0.5}
                onPress={() => {
                  this.setPopupVisible(!popupVisible);
                  this.props.close();
                  Vibration.vibrate(5);
                }}
              >
                <TextFont style={{fontSize: 16, color: "white"}}>OK</TextFont>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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