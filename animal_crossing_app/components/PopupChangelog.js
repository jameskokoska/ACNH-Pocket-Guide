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
import {getStorage, openURL} from "../LoadJsonData"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GiveSupport, MailLink} from "./Formattings";
import {changelog} from "../Changelog"
import { CatalogScannerApp, supportCatalogScanner } from "../pages/CatalogPage";
import { csvToObject } from "../pages/CreditsPage";

function formatAnnouncements(announcements) {
  let outputStrings = [];
  announcements.forEach((announcement) => {
    outputStrings.push(`${announcement.Announcement}`);
  });
  return outputStrings;
}

export default class PopupChangelog extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      supportAnnouncementData: [],
    }
  }
  async componentDidMount(){
    if(global.checkChangelog)
      setTimeout(async ()=>{
        this.openChangelog = await getStorage("changelog","");
        this.popupVisible = false;
        this.numLogins = parseInt(await getStorage("numLogins","0"))
        this.mounted = true;
        if((this.openChangelog === "" || this.openChangelog !== global.version) && this.numLogins>1){
          this.openChangelogPopup()
          return;
          //do not bother checking online changes if we know the app version changes
        }
        const sheetUrl = "https://docs.google.com/spreadsheets/d/15-J4TVEx1CRJuJJNHuMn64DbrUGbOd2yvnOzzpbstPk/edit#gid=237731685";
        const csvUrl = sheetUrl.replace('/edit#gid=', '/export?format=csv&gid=');
        let newSupporter = false
        try {
          const response = await fetch(csvUrl);
          const data = await response.text();
          const announcementData = csvToObject(data);
          const announcementStrings = formatAnnouncements(announcementData)
          lastSupporterChangelog = await getStorage("lastSupporterChangelog","");
          newSupporter = lastSupporterChangelog !== JSON.stringify(announcementStrings)
          await AsyncStorage.setItem("lastSupporterChangelog", JSON.stringify(announcementStrings));
          this.setState({supportAnnouncementData: announcementStrings})
        } catch (error) {
          console.log(error);
        }
        if((newSupporter) && this.numLogins>1){
          this.openChangelogPopup()
        }
      },0)
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  openChangelogPopup = async () => {
    this.timeoutHandle = setTimeout(()=>{
      this.popupVisible = true;
      this.setPopupVisible(true);
    }, 10);
    await AsyncStorage.setItem("changelog", global.version);
    global.checkChangelog = false
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
            {this.numLogins>3?<GiveSupport tapHere blueText style={{marginBottom:-20}} setPage={this.props.setPage}/>:<View/>}

            <View style={{height:30}}/>
            {supportCatalogScanner() ? <CatalogScannerApp/> : <View/>}
            {
              [...this.state.supportAnnouncementData, ...changelogText].map((point, index) => {
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