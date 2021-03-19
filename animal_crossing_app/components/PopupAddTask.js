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
  Dimensions,
  TouchableNativeFeedback,
  ScrollView
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import {getPhoto, getMaterialImage} from "./GetPhoto"
import {PopupInfoCustom} from "./Popup"
import ToggleSwitch from 'toggle-switch-react-native'
import {getSettingsString} from "../LoadJsonData"
import FastImage from "./FastImage"

class PopupAddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      smallToggle:false,
      selectedImage: "leaf.png"
    };
    this.task = {title: "", picture:"", finished: false, small:this.state.smallToggle};
    this.images = ["leaf.png","fish.png","bugs.png","music.png","turnip.png","cat.png","digIcon.png","able.png","nook.png","crafting.png","rock.png","miles.png","bellBag.png","coin.png","mario",
    "flower.png",
    "diyKit.png",
    "saharah.png",
    getMaterialImage("apple",true),
    getMaterialImage("apple tree",true),
    getMaterialImage("money tree",true),
    getMaterialImage("tree branch",true),
    getMaterialImage("sapling",true),
    getMaterialImage("wood",true),
    getMaterialImage("clay",true),
    getMaterialImage("acorn",true),
    getMaterialImage("stone", true),
    getMaterialImage("aquarius fragment", true),
    getMaterialImage("bamboo piece",true),
    getMaterialImage("wasp nest",true),
    getMaterialImage("hardwood tree",true),
    getMaterialImage("nook miles ticket",true),
    getMaterialImage("birthday cupcake",true),
    getMaterialImage("candy",true),
    getMaterialImage("customization kit",true),
    getMaterialImage("fossil",true),
    getMaterialImage("gold nugget",true),
    getMaterialImage("message bottle",true),
    getMaterialImage("rusted part",true),
    getMaterialImage("pitfall seed",true),
    getMaterialImage("present",true),
    getMaterialImage("rainbow feather",true),
    "balloon.png","sparkle.png","heart.png", "snow.png", "fireworks.png","fullmoon.png","pumpkin.png","corn.png","present.png","popper.png","bunny.png","blossom.png","bell.png","bamboo","shamrock","shells","acorns","toy","big game","maple leaves","nature","wedding","museum","beaver.png","bulb.png","octopus.png","hourglass.png","weather.png"];
  }

  setPopupVisible = (visible) => {
    this.popup.setPopupVisible(true);
    this.task = {title: "", picture:this.state.selectedImage, finished: false, small:this.state.smallToggle};
  }

  render(){
    var buttons = <>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <ButtonComponent
          text={"Cancel"}
          color={colors.cancelButton[global.darkMode]}
          vibrate={8}
          onPress={() => {
            this.popup.setPopupVisible(false);
          }}
        /> 
        <ButtonComponent
          text={"Done"}
          color={colors.okButton[global.darkMode]}
          vibrate={15}
          onPress={() => {
            this.props.addItem(this.task);
            this.popup.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    var header = <>
      <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Add Task</TextFont>
      <View style={{height:10}}/>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1, justifyContent:"center", marginHorizontal:5,}}>
          <TextInput
            allowFontScaling={false}
            style={{fontSize: 20, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 10, borderRadius: 5}}
            onChangeText={(text) => {this.task.title=text}}
            placeholder={"Task Name"}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          />
        </View>
        <View style={{justifyContent:"center", alignItems:"center", marginHorizontal:5}}>
          <TextFont bold={false} style={{fontSize: 15, textAlign:"center", color: colors.fishText[global.darkMode]}}>Small Task</TextFont>
          <View style={{transform: [{ scale: 0.7 }]}}>
            <ToggleSwitch
              isOn={this.state.smallToggle}
              onColor="#57b849"
              offColor="#DFDFDF"
              size="large"
              onToggle={() => {
                console.log(!this.state.smallToggle)
                this.task.small=!this.state.smallToggle;
                this.setState({smallToggle:!this.state.smallToggle});
                getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
              }}
            />
          </View>
        </View>
      </View>
      <View style={{height:10}}/>
    </>
    return (
      <>
        <PopupInfoCustom ref={(popup) => this.popup = popup} buttonDisabled={true} buttons={buttons} header={header}>
          <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
          {this.images.map( (image, index)=>{
            var imageComp = <View/>
            if(image.startsWith("http")){
              imageComp = <FastImage
                style={{height: 45,width: 45,resizeMode:'contain',}}
                source={{uri:image}}
                cacheKey={image}
              />
            } else {
              imageComp = <Image
                style={{height: 35,width: 35,resizeMode:'contain',}}
                source={getPhoto(image)}
              />
            }
            return(
              <View key={image+index} style={{width: 60,height: 60, margin:5}}>
                <TouchableOpacity 
                  background={TouchableNativeFeedback.Ripple(colors.todoColorAccent[global.darkMode]+"2A", false)}
                  onPress={()=>{
                    this.setState({selectedImage:image});
                    this.task.picture=image;
                    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10]) : "";
                  }}
                >
                  <View style={{width: 60,height: 60,borderRadius: 100,justifyContent: "center",alignItems: "center",borderWidth: 2, borderColor: image===this.state.selectedImage ? colors.checkGreen[global.darkMode] : colors.eventBackground[global.darkMode], backgroundColor:colors.eventBackground[global.darkMode]}}>
                    {imageComp}
                  </View>
                </TouchableOpacity>
              </View>
          )})}
          </View>
        </PopupInfoCustom>
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