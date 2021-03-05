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
  Dimensions
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import DropDownPicker from 'react-native-dropdown-picker'
import {getPhoto} from "./GetPhoto"


class PopupAddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false
    };
  }

  setPopupVisible = (visible) => {
    this.setState({popupVisible:visible});
  }

  render(){
    const icons = [
      {label: "Leaf", value: "leaf.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("leaf.png")}/>,},
      {label: "Fish", value: "fish.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("fish.png")}/>,},
      {label: "Bugs", value: "bugs.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("bugs.png")}/>,},
      {label: "Music", value: "music.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("music.png")}/>,},
      {label: "Turnip", value: "turnip.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("turnip.png")}/>,},
      {label: "Cat", value: "cat.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("cat.png")}/>,},
      {label: "Dig Icon", value: "digIcon.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("digIcon.png")}/>,},
      {label: "Nook Miles", value: "miles.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("miles.png")}/>,},
      {label: "Able Sisters", value: "able.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("able.png")}/>,},
      {label: "Nook", value: "nook.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("nook.png")}/>,},
      {label: "Crafting", value: "crafting.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("crafting.png")}/>,},
      {label: "Balloon", value: "balloon.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("balloon.png")}/>,},
      {label: "Bell Bag", value: "bellBag.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("bellBag.png")}/>,},
      {label: "Ocean Icon", value: "oceanIcon.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("oceanIcon.png")}/>,},
      {label: "Bell", value: "bell.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("bell.png")}/>,},
      {label: "Saharah", value: "saharah.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("saharah.png")}/>,},
      {label: "Sparkle", value: "sparkle.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("sparkle.png")}/>,},
      {label: "Ship", value: "ship.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("ship.png")}/>,},
      {label: "Beaver", value: "beaver.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("beaver.png")}/>,},
      {label: "Flower", value: "flowerIcon.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("flowerIcon.png")}/>,},
      {label: "Rock", value: "rock.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("rock.png")}/>,},
      {label: "Popper", value: "popper.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("popper.png")}/>,},
      {label: "Heart", value: "heart.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("heart.png")}/>,},
      {label: "Snow", value: "snow.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("snow.png")}/>,},
      {label: "Fireworks", value: "fireworks.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("fireworks.png")}/>,},
      {label: "Full Moon", value: "fullmoon.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("fullmoon.png")}/>,},
      {label: "Pumpkin", value: "pumpkin.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("pumpkin.png")}/>,},
      {label: "Corn", value: "corn.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("corn.png")}/>,},
      {label: "Present", value: "present.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("present.png")}/>,},
      {label: "Popper", value: "popper.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("popper.png")}/>,},
      {label: "Bunny", value: "bunny.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("bunny.png")}/>,},
      {label: "Blossom", value: "blossom.png", icon: () => <Image style={{width:20, height:20, resizeMode:"contain"}} source={getPhoto("blossom.png")}/>,},
    ]
    
    var task = {title: "", picture:"", finished: false};
    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
          onRequestClose={()=>{this.setPopupVisible(false)}}
        >
        <View style={styles.centeredView}>
          <TouchableOpacity onPress={()=>{this.setPopupVisible(!this.state.popupVisible);}} style={{position:"absolute", width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: "black", opacity: 0.1}}/>
          <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
            <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Add Task</TextFont>
            <View style={{height:10}}/>
            <TextInput
              style={{fontSize: 20, width:"100%", color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 10, borderRadius: 5}}
              onChangeText={(text) => {task.title=text}}
              placeholder={"Task Name"}
              placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            />
            <View style={{height:10}}/>
            <DropDownPicker
              items={icons}
              placeholder={"Select photo..."}
              dropDownMaxHeight={200}
              containerStyle={{height: 45}}
              style={[{width: "100%", borderWidth: 0, backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], borderTopLeftRadius: 8, borderTopRightRadius: 8,borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              isVisible
              searchablePlaceholderTextColor={colors.filterSearch[global.darkMode]}
              labelStyle={{fontFamily: "ArialRoundedBold", fontSize: 15, marginLeft:10, color:colors.textBlack[global.darkMode]}}
              customTickIcon={()=><View/>}
              activeItemStyle={{borderRadius: 10, backgroundColor: colors.lightDarkAccent[global.darkMode]}}
              dropDownStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 0, backgroundColor: colors.lightDarkAccent[global.darkMode], opacity: 0.98, }}
              onChangeItem={item => {task.picture=item.value}}
            />
            <View style={{height:10}}/>
            <View style={{height:200}}/>
            <View style={{flexDirection:"row"}}>
              <ButtonComponent
                text={"Cancel"}
                color={colors.cancelButton[global.darkMode]}
                vibrate={8}
                onPress={() => {
                  this.setPopupVisible(false);
                }}
              /> 
              <ButtonComponent
                text={"Done"}
                color={colors.okButton[global.darkMode]}
                vibrate={15}
                onPress={() => {
                  this.props.addItem(task);
                  this.setPopupVisible(false);
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
export default PopupAddTask;

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