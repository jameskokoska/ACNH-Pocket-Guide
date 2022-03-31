import React, {useState, Component} from 'react';
import {Share, Image, TouchableOpacity, ImageBackground, StyleSheet, View, TextInput, Text, Vibration, Platform} from 'react-native';
import TextFont from './TextFont'
import FadeInOut from "./FadeInOut"
import LottieView from 'lottie-react-native';
import DelayInput from "react-native-debounce-input";
import {capitalize, getSettingsString, attemptToTranslate, findItemCheckListKey, commas} from "../LoadJsonData"
import GuideRedirectButton from "./PopupGuideRedirectButton"
import { DropdownMenu } from './Dropdown';
import Popup from './Popup';

const Header = (props) => {
  var filterImage;
  const [emptySearch, setEmptySearch] = useState(props.currentSearch==="" || props.currentSearch===undefined)
  if(props.disableFilters){
    filterImage=<View/>
  } else if(props.searchFilters.constructor===Array && props.searchFilters.length>=1){
    filterImage = <>
      {Platform.OS != 'web' ?
        <LottieView 
            autoPlay
            loop={false}
            style={{
              position:"absolute",
              top: 0,
              left: 0,
              transform: [{ scale: 1.2 },],
            }}
            source={require("../assets/emphasis.json")}
          /> : null }
      <Image style={{width:25,height:25, margin: 10, marginTop: 12, opacity: 0.7, resizeMode:"contain"}} source={require("../assets/icons/filterApplied.png")}/>
    </>
  } else {
    filterImage = <Image style={{width:25,height:25, margin: 10, marginTop: 12, opacity: 0.35, resizeMode:"contain"}} source={require("../assets/icons/filterSearch.png")}/>
  }
  let clearImage = <Image style={{width:25,height:25, margin: 10, marginTop: 12, opacity: 0.35, resizeMode:"contain",}} source={require("../assets/icons/exit.png")}/>
  const textInput = React.useRef(null);
  const popupCheckAllRef = React.useRef(null);
  const popupUncheckAllRef = React.useRef(null);
  const popupInvertCheckRef = React.useRef(null);
  const popupMuseumCheckRef = React.useRef(null);
  const popupMuseumUncheckRef = React.useRef(null);
  let moreMenu = <></>
  let museumOptions = []
  if(props.showMuseumCheckOptions){
    museumOptions = [
      {label:"Add all to museum", value:"Museum check", highlighted: false},
      {label:"Remove all from museum", value:"Museum uncheck", highlighted: false},
    ]
  }
  if(props.checkAllItemsListed!==undefined && props.unCheckAllItemsListed!==undefined && props.invertCheckItemsListed!==undefined){
    moreMenu = <>
      <View style={{position:"absolute", padding:0, top:2, right:-2, zIndex: 100}}>
        <DropdownMenu
          style={{padding:15, paddingHorizontal: 5}}
          width={120}
          items={[
            {label:"Check all", value:"Check all", highlighted: false},
            {label:"Uncheck all", value:"Uncheck all", highlighted: false},
            {label:"Invert check marks", value:"Invert check", highlighted: false},
            ...museumOptions
          ]}
          defaultValue={""}
          onChangeItem={
            (item)=>{
              console.log(item.value)
              if(item.value==="Check all"){
                popupCheckAllRef.current.setPopupVisible(true)
              }else if(item.value==="Uncheck all"){
                popupUncheckAllRef.current.setPopupVisible(true)
              }else if(item.value==="Invert check"){
                popupInvertCheckRef.current.setPopupVisible(true)
              }else if(item.value==="Museum check"){
                popupMuseumCheckRef.current.setPopupVisible(true)
              }else if(item.value==="Museum uncheck"){
                popupMuseumUncheckRef.current.setPopupVisible(true)
              }
            }
          }
        >
          <Image style={{opacity: 0.5, width:21,height:21,resizeMode:'contain',}} source={global.darkMode ? require("../assets/icons/menuDotsWhite.png") : require("../assets/icons/menuDots.png")} />
        </DropdownMenu>
      </View>
      <Popup ref={popupCheckAllRef} accentCancel={true} text="Check All?" textLower={attemptToTranslate("Check all the items currently listed?") + "\n" + attemptToTranslate("This action cannot be undone.")} button1={"Cancel"} button1Action={()=>{}} button2={"Check All"} button2Action={props.checkAllItemsListed}/>
      <Popup ref={popupUncheckAllRef} accentCancel={true} text="Uncheck All?" textLower={attemptToTranslate("Uncheck all the items currently listed?") + "\n" + attemptToTranslate("This action cannot be undone.")} button1={"Cancel"} button1Action={()=>{}} button2={"Uncheck All"} button2Action={props.unCheckAllItemsListed}/>
      <Popup ref={popupInvertCheckRef} accentCancel={true} text="Invert Check Marks?" textLower={attemptToTranslate("Invert the check mark of all the items currently listed?") + "\n" + attemptToTranslate("This action cannot be undone.")} button1={"Cancel"} button1Action={()=>{}} button2={"Invert Checks"} button2Action={props.invertCheckItemsListed}/>
      <Popup ref={popupMuseumCheckRef} accentCancel={true} text="Add All to Museum?" textLower={attemptToTranslate("Add all items currently listed to the museum?") + "\n" + attemptToTranslate("This action cannot be undone.")} button1={"Cancel"} button1Action={()=>{}} button2={"Add All"} button2Action={props.checkAllMuseum!==undefined ? props.checkAllMuseum : ()=>{}}/>
      <Popup ref={popupMuseumUncheckRef} accentCancel={true} text="Remove All From Museum?" textLower={attemptToTranslate("Remove all items currently listed from the museum?") + "\n" + attemptToTranslate("This action cannot be undone.")} button1={"Cancel"} button1Action={()=>{}} button2={"Remove All"} button2Action={props.unCheckAllMuseum!==undefined ? props.unCheckAllMuseum : ()=>{}}/>
    </>
  }
  return (
    <>
      <GuideRedirectButton style={{position:"absolute", padding:15, right:10}} extraInfo={props.extraInfo} setPage={props.setPage}/>
      {props.title==="Wishlist"?<WishListShareButton style={{position:"absolute", padding:15, right:10, top: 2.5}}/>:<View/>}
      {moreMenu}
      <ImageBackground source={props.appBarImage} style={{width:"100%", backgroundColor: props.appBarColor}}>
        <View style={[styles.topSpace, {height: props.headerHeight / 1.5 + 10,}]}>
        </View>
        <View style={{height: props.headerHeight / 2}}>
          <View style={styles.subHeader}>
            <FadeInOut fadeIn={true}>
              <TextFont style={[styles.title, {fontSize: props.smallerHeader?28:38, color: props.titleColor}]} bold={true}>{props.title}</TextFont>
              {props.customHeader}
              {props.subHeader!==undefined&&props.subHeader!=="" ? <TextFont numberOfLines={4} style={[styles.title, {paddingBottom:5, marginTop: -5, fontSize: 13, color: props.titleColor}]}>{props.subHeader}</TextFont> : <View/>}
              {props.subHeader2!==undefined&&props.subHeader2!=="" ? <TextFont numberOfLines={4} style={[styles.title, {paddingBottom:5, marginTop: -10, fontSize: 13, color: props.titleColor}]}>{props.subHeader2}</TextFont> : <View/>}
              {getSettingsString("settingsHideImages")==="true"?<TextFont numberOfLines={4} style={[styles.title, {paddingBottom:3, marginTop: -7, fontSize: 8, color: props.titleColor}]}>{"Note: You have images hidden to avoid spoilers. Disable this in the Settings page to view all images."}</TextFont>:<View/>}
            </FadeInOut>
            {!props.disableSearch ? <View style={{flexDirection: 'row'}}>
              <View style={[styles.searchBox, {backgroundColor:props.searchBarColor}]}>
                <DelayInput
                  allowFontScaling={false}
                  placeholder={attemptToTranslate("Search")}
                  style={styles.searchText}
                  onChangeText={function(text){if(textInput.current.isFocused() || !emptySearch) props.updateSearch(text); if(text===""){setEmptySearch(true)} else {if(textInput.current.isFocused()) setEmptySearch(false)}}} 
                  onFocus={() => {getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(15) : "";}}
                  minLength={1}
                  delayTimeout={400}
                  onSubmitEditing={function(event){props.updateSearch(event.nativeEvent.text); if(event.nativeEvent.text===""){setEmptySearch(true)} else {if(textInput.current.isFocused()) setEmptySearch(false)}}}
                  inputRef={textInput}
                  value={props.currentSearch}
                />
                <TouchableOpacity style={{position:"absolute", right:props.disableFilters&&props.customButton===undefined?5:35}} onPress={()=>{textInput.current.clear(); setEmptySearch(true); props.updateSearch(""); textInput.current.focus(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
                  <FadeInOut fadeIn={!emptySearch} duration={200}>
                    {clearImage}
                  </FadeInOut>
                </TouchableOpacity>
                <TouchableOpacity style={{position:"absolute", right:5}} onPress={()=>{props.openPopupFilter(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
                  {filterImage}
                </TouchableOpacity>
              </View>
              {props.customButton?props.customButton:<View/>}
              
            </View> : <View style={{height:15}}/>}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export const HeaderLoading = (props) => {
  var dropDownPickerOpacity = 0
  if(props.possibleFilters!== undefined && props.possibleFilters.length!==0){
    dropDownPickerOpacity = 0.7
  }
  return (
    <FadeInOut fadeIn={true}>
      <ImageBackground source={props.appBarImage} style={{width:"100%", backgroundColor: props.appBarColor}}>
        <View style={[styles.topSpace, {height: props.headerHeight / 1.5 + 10,}]}>
        </View>
        <View style={{height: props.headerHeight / 2}}>
          {!props.disableSearch ? <View style={styles.subHeader}>
            <View style={[styles.searchBox, {backgroundColor:props.searchBarColor}]}>
              <TextInput allowFontScaling={false} style={styles.searchText} value={""}/>
            </View>
          </View> : <View/>}
        </View> 
      </ImageBackground>
      <View style={{alignItems:"center", justifyContent:"center", width:"100%", height:"50%"}}>
      {Platform.OS != 'web' ?
        <LottieView 
          autoPlay
          loop
          style={{
            width: 85,
            zIndex:1,
            transform: [
              { scale: 1.25 },
              { rotate: '0deg'},
            ],
          }}
          source={require('../assets/loading.json')}
        /> : null }
      </View>
    </FadeInOut>
  );
};


//deprecated
export const HeaderActive = (props) => {
  var filterImage;
  if(props.searchFilters.constructor===Array && props.searchFilters.length>=1){
    filterImage = <>
      {Platform.OS != 'web' ?
        <LottieView 
            autoPlay
            loop={false}
            style={{
              position:"absolute",
              top: -11,
              left: -11,
            }}
            source={require("../assets/emphasis.json")}
          /> :null }
      <Image style={{width:25,height:25, margin: 10, marginTop: 12, opacity: 0.7, marginRight: 30, resizeMode:"contain"}} source={require("../assets/icons/filterApplied.png")}/>
    </>
  } else {
    filterImage = <Image style={{width:25,height:25, margin: 10, marginTop: 12, opacity: 0.35, marginRight: 30, resizeMode:"contain"}} source={require("../assets/icons/filterSearch.png")}/>
  }
  return (
    <>
      <View style={{width:"100%",paddingHorizontal: 20, marginTop: 10}}>
        <TextFont style={[styles.title, {fontSize: 15, color: props.titleColor}]} bold={true}>Creatures that can currently be caught</TextFont>
        <View style={{flexDirection: 'row'}}>
          <View style={[styles.searchBox, {backgroundColor:props.searchBarColor}]}>
            <DelayInput
              allowFontScaling={false}
              placeholder={attemptToTranslate("Search")}
              style={styles.searchText}
              onChangeText={function(text){props.updateSearch(text);}} 
              onFocus={() => {getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(15) : "";}}
              minLength={1}
              delayTimeout={400}
              onSubmitEditing={function(event){props.updateSearch(event.nativeEvent.text)}}
            />
          </View>
          <TouchableOpacity onPress={()=>{props.openPopupFilter(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
            {filterImage}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export class WishListShareButton extends Component{
  shareWishlist = async () => {
    var list = [];
    for(var i = 0; i<global.collectionList.length; i++){
      if(global.collectionList[i].includes("wishlist")){
        list.push(findItemCheckListKey(global.collectionList[i].replace("wishlist","")))
      }
    }
    var listString = "";
    for(var i = 0; i<list.length; i++){
      if(list[i].hasOwnProperty("NameLanguage")){
        listString = listString+list[i]["NameLanguage"];
        if(list[i].hasOwnProperty("Variation") && list[i]["Variation"]!=="NA"){
          listString = listString + " - " + list[i]["Variation"];
        }
        if(list[i].hasOwnProperty("Buy") && list[i]["Buy"]!=="NA" && list[i]["Buy"]!=="NFS" && list[i].hasOwnProperty("Exchange Currency") && list[i]["Exchange Currency"]==="NA"){
          listString = listString + " - " + commas(list[i]["Buy"]) + " " + attemptToTranslate("bells");
        }
        listString = listString + "\n"
      }
    }
    listString = capitalize(listString)
    await Share.share({
      message: listString,
    });
  }
  render(){
    return <View>
      <TouchableOpacity style={[this.props.style,{zIndex:5}]} onPress={()=>{this.shareWishlist()}}>
        <Image style={{width:20,height:20,opacity: 0.35, resizeMode:"contain"}} source={global.darkMode?require("../assets/icons/shareIconWhite.png"):require("../assets/icons/shareIcon.png")}/>
      </TouchableOpacity>
    </View>
  }
}

const styles = StyleSheet.create({
  topSpace: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  subHeader: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'column',
    position: 'absolute',
    bottom:0,
  },
  title: {
    marginBottom: 5,
  },
  searchText: {
    color: '#292929',
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
    width:'100%',
    paddingRight: 25,
    paddingRight: 73
  },
  searchBox: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: -50,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 18,
    opacity: 0.7
  },
});
export default Header;
