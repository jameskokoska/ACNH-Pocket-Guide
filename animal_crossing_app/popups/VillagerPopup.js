import * as Font from 'expo-font';
import React, {Component} from 'react';
import {TouchableOpacity, Dimensions, Image, View, Text, Vibration} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import FastImage from '../components/FastImage';
import ButtonComponent from "../components/ButtonComponent"
import TextFont from "../components/TextFont"
import {PopupInfoCustom} from "../components/Popup"
import {SubHeader, Paragraph, Header} from "../components/Formattings"
import * as RootNavigation from '../RootNavigation.js';
import { attemptToTranslateItem, findVillagersParadisePlanning, getSettingsString, getStorage } from '../LoadJsonData';
import { Request } from '../pages/ParadisePlanningPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class VillagerPopup extends Component {
  constructor(props){
    super(props);
    this.state = {
      request: findVillagersParadisePlanning(this.props.item["Name"]),
      paradiseChecklist: [],
      loaded:false,
      update:false,
    }
    this.loadList()
  }

  componentDidUpdate(prevProps){
    if(prevProps!==this.props){
      this.setState({request: findVillagersParadisePlanning(this.props.item["Name"]), update:true})
    }
  }

  loadList = async() => {
    var storageData = JSON.parse(await getStorage("ParadisePlanning"+global.profile,JSON.stringify([])));
    if(storageData.constructor!==Array || storageData === undefined){
      storageData=[];
    }
    this.setState({paradiseChecklist: storageData, loaded:true})
  }

  checkOffItem = (id) => {
    if(this.state.loaded){
      try {
        var oldList = this.state.paradiseChecklist;
        if(oldList.includes(id)){
          oldList = oldList.filter(item => item !== id)
          this.saveList(oldList);
          getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
          this.setState({paradiseChecklist: oldList})
        } else {
          oldList.push(id);
          this.saveList(oldList);
          getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,20,220,20]) : "";
          this.setState({paradiseChecklist: oldList})
        }
      } catch (e){
        toast.show("Please report this error to dapperappdeveloper@gmail.com : \n" + e.toString(), {type:"danger"})
      }
    }
  }

  saveList = async(checklist) => {
    await AsyncStorage.setItem("ParadisePlanning"+global.profile, JSON.stringify(checklist));
  }

  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <InfoLine
        birthday={true}
        image={require("../assets/icons/birthdayCake.png")} 
        item={this.props.item}
        textProperty={["Birthday"]}
      />
      <InfoLineBeside
        image1={require("../assets/icons/cat.png")} 
        item1={this.props.item}
        textProperty1={["Species"]}
        image2={require("../assets/icons/dice.png")} 
        item2={this.props.item}
        textProperty2={["Hobby"]}
      />
      <InfoLineBeside
        image1={require("../assets/icons/personalityEmoji.png")} 
        image2={require("../assets/icons/styleEmoji.png")} 
        item1={this.props.item}
        item2={this.props.item}
        textProperty1={["Personality"]}
        textProperty2={["Style 1"]}
        textProperty22={["Style 2"]}
      />
      <InfoLine
        image={require("../assets/icons/colorPalette.png")} 
        item={this.props.item}
        textProperty={["Color 1"]}
        textProperty2={["Color 2"]}
      />
      <InfoLine
        image={require("../assets/icons/music.png")}
        customText={attemptToTranslateItem(this.props.item["Favorite Song"])}
      />
      <InfoLine
        image={require("../assets/icons/speechBubble.png")} 
        item={this.props.item}
        textProperty={["Favorite Saying"]}
      />
      <ButtonComponent
        text={"View Photo and Poster"}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={() => {
          // this.props.setPage(37, true, this.props.item)
          RootNavigation.navigate('37', {propsPassed:this.props.item});
      }}/>
      <View style={{height:5}}/>
      <ButtonComponent
        text={"View Gifts"}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={() => {
          // this.props.setPage(20, true, this.props.item);
          RootNavigation.navigate('20', {propsPassed:this.props.item});
        }}/>
      <TouchableOpacity style={{paddingTop:0}} onPress={()=>{this.popup?.setPopupVisible(true);}}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 16, padding:8}}>{"What are villager gifts?"}</TextFont>
      </TouchableOpacity>
      {this.props.item["Furniture List"]?<ButtonComponent
        text={"View Furniture"}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={() => {
          // this.props.setPage(22, true, this.props.item)
          RootNavigation.navigate('22', {propsPassed:this.props.item});
      }}/>:<View/>}
      <View style={{height:20}}/>
      <View style={{marginHorizontal: -17, marginBottom: -15}}>
        <Request darkerBackground lessMargin update={this.state.update} request={this.state.request} villagerObject={this.props.item} checkOffItem={this.checkOffItem} paradiseChecklist={this.state.paradiseChecklist}/>
      </View>
      <View style={{alignItems: 'center', width: Dimensions.get('window').width, justifyContent:"center"}}>
        <FastImage
          style={{width: Dimensions.get('window').width*0.8,height:Dimensions.get('window').width*0.8, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item["House Image"],
          }}
          cacheKey={this.props.item["House Image"]}
        />
      </View>
      <View style={{height:20}}/>
      <View style={{alignItems: 'center', width: Dimensions.get('window').width, justifyContent:"center"}}>
        <FastImage
          style={{width: Dimensions.get('window').width*0.6,height:Dimensions.get('window').width*0.6, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item["Photo Image"],
          }}
          cacheKey={this.props.item["Photo Image"]}
        />
      </View>
      <PopupInfoCustom ref={(popup) => this.popup = popup} buttonText={"Close"}>
        <View style={{height:6}}/>
        <SubHeader>What are ideal gifts for villagers?</SubHeader>
        <Paragraph styled={true}>Villagers prefer flowers, favorite music, umbrellas (for non-frog villagers), or clothing of their preferred color or style.</Paragraph>
        <Paragraph styled={true}>[View Gifts] will show you all clothing of their preferred color and style.</Paragraph>
        <Paragraph styled={true}>Additionally, you can choose to filter out if the villager will wear this item or not when gifted.</Paragraph>
        <Paragraph styled={true}>You can read more details about gifts by visiting the guide page</Paragraph>
        <TouchableOpacity onPress={() => this.props.setPage!==undefined ? this.props.setPage(15, true, "giftsRedirect") : ""}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center", padding:10, marginTop:10}}>{"Tap here to read more about gifting"}</TextFont>
        </TouchableOpacity>
      </PopupInfoCustom> 
    </View>
  }
}
export default VillagerPopup;