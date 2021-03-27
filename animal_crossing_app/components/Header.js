import React, {useState} from 'react';
import {Image, TouchableOpacity, ImageBackground, StyleSheet, View, TextInput, Text, Vibration} from 'react-native';
import TextFont from './TextFont'
import FadeInOut from "./FadeInOut"
import LottieView from 'lottie-react-native';
import DelayInput from "react-native-debounce-input";
import colors from "../Colors"
import {getSettingsString, attemptToTranslate} from "../LoadJsonData"

const Header = (props) => {
  var filterImage;
  if(props.disableFilters){
    filterImage=<View/>
  } else if(props.searchFilters.constructor===Array && props.searchFilters.length>=1){
    filterImage = <>
      <LottieView 
          autoPlay
          loop={false}
          style={{
            position:"absolute",
            top: -11,
            left: -11,
          }}
          source={require("../assets/emphasis.json")}
        />
      <Image style={{width:25,height:25, margin: 10, marginTop: 12, opacity: 0.7, marginRight: 30, resizeMode:"contain"}} source={require("../assets/icons/filterApplied.png")}/>
    </>
  } else {
    filterImage = <Image style={{width:25,height:25, margin: 10, marginTop: 12, opacity: 0.35, marginRight: 30, resizeMode:"contain"}} source={require("../assets/icons/filterSearch.png")}/>
  }
  
  return (
    <>
      <ImageBackground source={props.appBarImage} style={{width:"100%", backgroundColor: props.appBarColor}}>
        <View style={[styles.topSpace, {height: props.headerHeight / 1.5 + 10,}]}>
        </View>
        <View style={{height: props.headerHeight / 2}}>
          <View style={styles.subHeader}>
            <FadeInOut fadeIn={true}>
              <TextFont style={[styles.title, {fontSize: props.smallerHeader?30:41, color: props.titleColor}]} bold={true}>{props.title}</TextFont>
            </FadeInOut>
            {props.customHeader}
            {props.subHeader!==undefined&&props.subHeader!=="" ? <TextFont numberOfLines={4} style={[styles.title, {paddingBottom:5, marginTop: -5, fontSize: 13, color: props.titleColor}]}>{props.subHeader}</TextFont> : <View/>}
            {!props.disableSearch ? <View style={{flexDirection: 'row'}}>
              <View style={[styles.searchBox, {backgroundColor:props.searchBarColor}]}>
                <DelayInput
                  allowFontScaling={false}
                  placeholder={attemptToTranslate("Search")}
                  style={styles.searchText}
                  onChangeText={function(text){props.updateSearch(text);}} 
                  onFocus={() => {Vibration.vibrate(15);}}
                  minLength={2}
                  delayTimeout={400}
                />
              </View>
              <TouchableOpacity onPress={()=>{props.openPopupFilter(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
                {filterImage}
              </TouchableOpacity>
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
      <LottieView 
        autoPlay
        loop
        style={{
          width: "25%",
          zIndex:1,
          transform: [
            { scale: 1.25 },
            { rotate: '0deg'},
          ],
        }}
        source={require('../assets/loading.json')}
      />
      </View>
    </FadeInOut>
  );
};

export const HeaderActive = (props) => {
  var filterImage;
  if(props.searchFilters.constructor===Array && props.searchFilters.length>=1){
    filterImage = <>
      <LottieView 
          autoPlay
          loop={false}
          style={{
            position:"absolute",
            top: -11,
            left: -11,
          }}
          source={require("../assets/emphasis.json")}
        />
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
              onFocus={() => {Vibration.vibrate(15);}}
              minLength={2}
              delayTimeout={400}
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
    color: '#515151',
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
    width:'100%',
    paddingRight: 25,
    height: 30,
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
