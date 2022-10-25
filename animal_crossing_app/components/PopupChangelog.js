import React, { Component } from "react";
import {
  Modal,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  BackHandler
} from "react-native";
import TextFont from "./TextFont";
import colors from "../Colors";
import {PopupBottomCustom} from "./Popup"
import {getStorage} from "../LoadJsonData"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MailLink,GiveSupport} from "./Formattings";
import {changelog} from "../Changelog"

export default class PopupChangelog extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
    }
  }
  async componentDidMount(){
    setTimeout(async ()=>{
      this.mounted = true;
      this.openChangelog = await getStorage("changelog","");
      this.popupVisible = false;
      this.numLogins = parseInt(await getStorage("numLogins","0"))
      if((this.openChangelog === "" || this.openChangelog !== global.version) && this.numLogins>0){
        this.timeoutHandle = setTimeout(()=>{
          this.popupVisible = true;
          this.setPopupVisible(true);
        }, 10);
      } else {
        await AsyncStorage.setItem("changelog", global.version);
      }
    },0)
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    this.mounted=false;
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    if(this.popupVisible){
      this.setPopupVisible(false);
      this.popupVisible = false;
    }
  };

  setPopupVisible = async (visible) => {
    if(this.mounted && this.popupVisible){
      this.setState({show:true})
      this.popup?.setPopupVisible(visible);
      await AsyncStorage.setItem("changelog", global.version);
    }
  }

  render(){
    if(this.state.show){
      var changelogText = changelog.toString();
      const index = changelogText.indexOf("Past changes:");
      if(index>0)
        changelogText = changelogText.substring(0, index);
      changelogText = changelogText.split("\n-");
      return(
        <>
          <PopupBottomCustom ref={(popup) => this.popup = popup} onClose={async () => {await AsyncStorage.setItem("changelog", global.version)}}>
            <TextFont bold={true} style={{fontSize: 28, textAlign:"center",color: colors.textBlack[global.darkMode],}}>{"What's New?"}</TextFont>
            {/* Support */}
            {/* {this.numLogins>5?<GiveSupport tapHere blueText style={{marginBottom:-20}}/>:<View/>} */}
            {
              changelogText.map((point, index) => {
                return(<TextFont key={index} bold={false} style={{marginBottom:4, fontSize: 18, color: colors.textBlack[global.darkMode]}}>{point}</TextFont>)
              })
            }
            <TextFont bold={false} style={{marginBottom:4, fontSize: 18, color: colors.textBlack[global.darkMode]}}>You can reread the changelog in the [About] page</TextFont>
            <TextFont bold={false} style={{marginBottom:4, fontSize: 18, color: colors.textBlack[global.darkMode]}}>If you would like to help translate this app, feel free to reach out on email!</TextFont>
            <View style={{height:25}}/>
            <MailLink/>
            <View style={{height:15}}/>
            <View style={{height:10}}/>
          </PopupBottomCustom>
        </>
      )
    } else {
      return <View/>
    }
  }
}