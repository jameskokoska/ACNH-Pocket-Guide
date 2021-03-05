import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  Vibration,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import CachedImage from 'react-native-expo-cached-image';


class PopupImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false
    };   
    
  }

  setPopupVisible = (visible, image) => {
    this.setState({popupVisible:visible, image:image});
  }

  render(){
    return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
          onRequestClose={()=>{this.setPopupVisible(false);}}
        >
        <View style={styles.centeredView}>
          <TouchableOpacity onPress={()=>{this.setPopupVisible(!this.state.popupVisible);}} style={{position:"absolute", width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: "black", opacity: 0.1}}/>
          <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
            <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{this.props.text}</TextFont>
            <ScrollView style={{maxHeight:Dimensions.get('window').height*0.75}}>
              <CachedImage
                style={{width:Dimensions.get('window').width*0.5,height:Dimensions.get('window').width*0.5,resizeMode:'contain',}}
                source={{
                  uri: this.state.image,
                }}
              />
            </ScrollView>
            <View style={{flexDirection:"row", justifyContent:"center"}}>
              <ButtonComponent
                text={"Close"}
                color={colors.okButton[global.darkMode]}
                vibrate={5}
                onPress={() => {
                  this.setPopupVisible(!this.state.popupVisible);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
export default PopupImage;

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