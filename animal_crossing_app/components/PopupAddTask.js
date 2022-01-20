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
import {getSettingsString,attemptToTranslate} from "../LoadJsonData"
import FastImage from "./FastImage"
import {SelectionImage} from "./Selections"

export const taskImages = [
      "leaf.png",
      "fish.png",
      "bugs.png",
      "music.png",
      "turnip.png",
      "cat.png",
      "digIcon.png",
      "crack.png",
      "glowingHole.png",
      "able.png",
      "nook.png",
      "crafting.png",
      "rock.png",
      "miles.png",
      "bellBag.png",
      "coin.png",
      "nookLinkCoin",
      "mario",
      "flower.png",
      "diyKit.png",
      "saharah.png",
      "whisp.png",
      "flick.png",
      "cj.png",
      "pascal.png",
      "harvey.png",
      "kapp.png",
      "cyrus.png",
      "niko.png",
      "wardell.png",
      "tortimer.png",
      "redd.png",
      "leif.png",
      "kicks.png",
      "harriet.png",
      "katrina.png",
      "daisymae.png",
      "lottie.png",
      "brewster.png",
      "coffee.png",
      "loid.png",
      "nookShopping.png",
      "gyroid.png",
      getMaterialImage("gyroid fragment",true),
      getMaterialImage("apple",true),
      getMaterialImage("apple tree",true),
      getMaterialImage("money tree",true),
      getMaterialImage("tree branch",true),
      getMaterialImage("sapling",true),
      getMaterialImage("wood",true),
      getMaterialImage("clay",true),
      getMaterialImage("acorn",true),
      getMaterialImage("pine cone", true),
      getMaterialImage("skinny mushroom", true),
      getMaterialImage("stone", true),
      getMaterialImage("conch", true),
      getMaterialImage("coral", true),
      getMaterialImage("cowrie", true),
      getMaterialImage("giant clam", true),
      getMaterialImage("star fragment", true),
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
      "recipe.png",
      "cookingRecipe.png",
      "recipes.png",
      getMaterialImage("rusted part",true),
      getMaterialImage("pitfall seed",true),
      getMaterialImage("present",true),
      getMaterialImage("rainbow feather",true),
      getMaterialImage("tomato",true),
      getMaterialImage("potato",true),
      getMaterialImage("carrot",true),
      "cooking.png",
      "suitcase.png",
      "treasureMap.png",
      "tool-box.png",
      "clothing-shop.png",
      "clothes-rack.png",
      "school.png",
      "cage.png",
      "restaurant.png",
      "cafe.png",
      "hospital-building.png",
      "airplane.png",
      "balloon.png",
      "sparkle.png",
      "heart.png", 
      "snow.png", 
      "fireworks.png",
      "fullmoon.png",
      "pumpkin.png",
      "corn.png",
      "present.png",
      "popper.png",
      "bunny.png",
      "blossom.png",
      "bell.png",
      "bamboo",
      "shamrock",
      "shells",
      "acorns",
      "toy",
      "big game",
      "maple leaves",
      "nature",
      "wedding",
      "museum",
      "bulb.png",
      "octopus.png",
      "hourglass.png",
      "weather.png",
      "recycle.png",
      "dice.png",
    ];

class PopupAddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      smallToggle:false,
      selectedImage: "leaf.png",
      title: "",
    };
    this.task = {title: "", picture:"", finished: false, small:this.state.smallToggle};
    this.images = taskImages;
    this.edit=false;
  }

  setPopupVisible = (visible, item=false, index=-1) => {
    this.popup?.setPopupVisible(true);
    if(item===false){
      this.setState({title:"",selectedImage: "leaf.png", popupTitle:"Add Task"})
      this.task = {title: "", picture:this.state.selectedImage, finished: false, small:this.state.smallToggle};
      this.edit = false;
    } else {
      this.setState({title:item.title,selectedImage: item.picture, popupTitle:"Edit Task", smallToggle: item.small})
      this.task = {title: item.title, picture:item.picture, finished: item.finished, small:item.small};
      this.edit = index;
    }
  }

  render(){
    var buttons = <>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <ButtonComponent
          text={"Cancel"}
          color={colors.cancelButton[global.darkMode]}
          vibrate={8}
          onPress={() => {
            this.popup?.setPopupVisible(false);
          }}
        /> 
        <ButtonComponent
          text={"Done"}
          color={colors.okButton[global.darkMode]}
          vibrate={15}
          onPress={() => {
            if(this.edit===false || this.edit===-1){
              this.props.addItem(this.task);
            } else {
              this.props.addItem(this.task, this.edit);
            }
            
            this.popup?.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    var header = <>
      <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{this.state.popupTitle}</TextFont>
      <View style={{height:10}}/>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1, justifyContent:"center", marginHorizontal:5,}}>
          <TextInput
            allowFontScaling={false}
            style={{fontSize: 18, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 10, borderRadius: 5}}
            onChangeText={(text) => {this.task.title=text; this.setState({title:text})}}
            placeholder={attemptToTranslate("Task Name")}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            value={this.state.title}
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
                // console.log(!this.state.smallToggle)
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
            <SelectionImage 
              selectedImage={this.state.selectedImage} 
              images={this.images}
              onSelected={(image)=>{this.setState({selectedImage:image}); this.task.picture=image;}}
              canDeselect={false}
              sizeImage={[35,35]}
              sizeImageOnline={[45,45]}
              sizeContainer={[60,60]}
            />
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