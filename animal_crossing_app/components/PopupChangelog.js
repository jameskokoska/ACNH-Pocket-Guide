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
    this.setState({popupVisible:visible});
  }

  render(){
    var changelogText = this.props.textLower.toString();
    changelogText = changelogText.split("\n-");
    return (
      <>
        <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.popupVisible}
            statusBarTranslucent
            onRequestClose={()=>{this.setPopupVisible(false);this.props.onClose();}}
          >
          <View style={styles.centeredView}>
            <TouchableOpacity onPress={()=>{this.setPopupVisible(false);this.props.onClose();}} style={{position:"absolute", width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: "black", opacity: 0.1}}/>
            <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
              <TextFont bold={true} style={{fontSize: 28, textAlign:"center",color: colors.textBlack[global.darkMode],}}>{this.props.text}</TextFont>
              <ScrollView style={{maxHeight:Dimensions.get('window').height*0.75}}>
                {
                  changelogText.map((point, index) => (
                      <TextFont key={index} bold={false} style={{marginBottom:4, fontSize: 18, color: colors.textBlack[global.darkMode]}}>{point}</TextFont>
                  ))
                }
              </ScrollView>
              <View style={{flexDirection:"row", justifyContent:"center"}}>
                <ButtonComponent
                  text={"OK"}
                  color={colors.okButton[global.darkMode]}
                  vibrate={15}
                  onPress={() => {
                    this.setPopupVisible(false);
                    this.props.onClose();
                  }}
                /> 
              </View>
            </View>
          </View>
        </Modal>
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