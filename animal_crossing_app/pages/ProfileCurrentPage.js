import React, {Component} from 'react';
import {Image, TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import TextFont from '../components/TextFont'
import colors from '../Colors'
import ButtonComponent from "../components/ButtonComponent"
import HomeContentArea from '../components/HomeContentArea';
import {MailLink, ExternalLink, SubHeader, Header, Paragraph} from "../components/Formattings"
import {attemptToTranslate, getStorage} from "../LoadJsonData"
import {Profile, VillagerPopupPopup, CollectionProgress} from "./HomePage"
import CurrentVillagers from "../components/CurrentVillagers"
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PopupInfoCustom} from "../components/Popup"
import {SelectionImage} from "../components/Selections"
import {taskImages} from "../components/PopupAddTask"
import FastImage from "../components/FastImage"
import {getPhoto} from "../components/GetPhoto"

export default class CreditsPage extends Component {
  constructor(props) {
    super(props);
  }
  openVillagerPopup = (item) => {
    this.villagerPopupPopup?.setPopupVisible(true, item);
  }
  render(){
    return(
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <ScrollView>
          <View style={{height: 100}}/>
          <View style={{flexDirection:"row", alignItems:"center", marginHorizontal:20}}>
            <ProfileIcon profile={global.profile}/>
            <Header style={{fontSize: 35, marginHorizontal:15}}>Profile</Header>
          </View>
          <View style={{height: 50}}/>
          <HomeContentArea backgroundColor={colors.sectionBackground1[global.darkMode]} accentColor={colors.profileColor[global.darkMode]} title="Islander Info" titleColor={colors.profileColor[global.darkModeReverse]}>
            <View style={{height: 37}}/>
            <Profile setPage={this.props.setPage}/>
            <CurrentVillagers openVillagerPopup={this.openVillagerPopup} setPage={this.props.setPage}/>
            <View style={{height: 20}}/>
          </HomeContentArea>
          <HomeContentArea backgroundColor={colors.sectionBackground2[global.darkMode]} accentColor={colors.collectionColor[global.darkMode]} title="Collection" titleColor={colors.collectionColor[global.darkModeReverse]}>
            <CollectionProgress setPage={this.props.setPage}/>
          </HomeContentArea>
          <View style={{height: 50}}/>
        </ScrollView>
        <VillagerPopupPopup ref={(villagerPopupPopup) => this.villagerPopupPopup = villagerPopupPopup} setPage={this.props.setPage}/>
     </View>
    )
  }
}

//<ProfileIcon style={{}} profile={global.profile} onPress={()=>{console.log("test")}}/>
//Leaving onPress blank will default to selection behaviour
export class ProfileIcon extends Component{
  constructor(props) {
    super(props);
    this.state={profileIcon:"villager.png"}
  }
  async componentDidMount(){
    await this.loadProfileIcon()
  }
  loadProfileIcon = async () => {
    const profileIcon = await getStorage("profileIcon"+this.props.profile,"villager.png")
    const customProfileIcon = await getStorage("customProfileIcon"+this.props.profile,"false")
    this.setState({profileIcon: profileIcon, customProfileIcon:customProfileIcon==="true"})
  }
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.cancelled) {
      this.setState({profileIcon: result.uri, customProfileIcon:true});
      await AsyncStorage.setItem("profileIcon"+this.props.profile, result.uri);
      await AsyncStorage.setItem("customProfileIcon"+this.props.profile, "true");
      this.popup?.setPopupVisible(false);
    }
  }
  async componentDidUpdate(prevProps){
    if(prevProps!==this.props){
      await this.loadProfileIcon()
    }
  }
  render(){
    var profileIcon=<View/>
    if(this.state.customProfileIcon){
      profileIcon = <Image source={{uri:this.state.profileIcon}} style={{ width: 65, height: 65, borderRadius:100 }} />
    }else if(this.state.profileIcon.startsWith("http")){
      profileIcon = <FastImage
        style={{height: 50,width: 50,resizeMode:'contain',}}
        source={{uri:this.state.profileIcon}}
        cacheKey={this.state.profileIcon}
      />
    } else if (this.state.profileIcon.includes("villager")){
      var width = 42;
      if(this.state.profileIcon === "villager.png"){
        width = 42;
      } else if(this.state.profileIcon === "villager2.png"){
        width = 47;
      } else if(this.state.profileIcon === "villager4.png"){
        width = 52;
      } else if(this.state.profileIcon === "villager5.png"){
        width = 48;
      } else if(this.state.profileIcon === "villager8.png"){
        width = 45;
      }
      profileIcon = <Image
        style={{height: width,width: width,resizeMode:'contain',}}
        source={getPhoto(this.state.profileIcon)}
      />
    } else {
      profileIcon = <Image
        style={{height: 40,width: 40,resizeMode:'contain',}}
        source={getPhoto(this.state.profileIcon)}
      />
    }
    var buttons = <>
      <ButtonComponent
        text={"Custom Image"}
        color={colors.dateButton[global.darkMode]}
        vibrate={8}
        onPress={() => {
          this.pickImage()
        }}
      /> 
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
            this.popup?.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    var header = <>
      <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Select Icon</TextFont>
      <View style={{height:10}}/>
    </>
    return (
      <>
      <TouchableOpacity onPress={()=>{this.props.onPress!==undefined?this.props.onPress():this.popup?.setPopupVisible(true)}} style={[{elevation:2, height:65, width:65, borderRadius:100, backgroundColor:colors.white2[global.darkMode], alignItems:"center", justifyContent:"center"},this.props.style]}>
        {profileIcon}
      </TouchableOpacity>
      <PopupInfoCustom ref={(popup) => this.popup = popup} buttonDisabled={true} buttons={buttons} header={header}>
          <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
            <SelectionImage 
              selectedImage={this.state.profileIcon} 
              images={["villager.png", "villager2.png", "villager3.png", "villager4.png", "villager5.png", "villager6.png", "villager7.png", "villager8.png",...taskImages]}
              onSelected={async (image)=>{this.setState({profileIcon:image, customProfileIcon:false}); await AsyncStorage.setItem("profileIcon"+this.props.profile, image); await AsyncStorage.setItem("customProfileIcon"+this.props.profile, "false");}}
              canDeselect={false}
              sizeImage={[38,38]}
              sizeImageOnline={[45,45]}
              sizeContainer={[60,60]}
            />
          </View>
        </PopupInfoCustom>
      </>
    )
  }
}