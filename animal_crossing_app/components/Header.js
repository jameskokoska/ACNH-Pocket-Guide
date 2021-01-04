import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View, TextInput, Text, Vibration} from 'react-native';
import TextFont from './TextFont'
import FadeInOut from "./FadeInOut"
import LottieView from 'lottie-react-native';
import DelayInput from "react-native-debounce-input";
import DropDownPicker from 'react-native-dropdown-picker'
import colors from "../Colors"

const Header = (props) => {
  var dropDownPickerOpacity = 0
  if(props.possibleFilters!== undefined && props.possibleFilters.length!==0){
    dropDownPickerOpacity = 0.7
  }
  return (
    <>
      <ImageBackground source={props.appBarImage} style={{width:"100%", backgroundColor: props.appBarColor}}>
        <View style={{height: 10,}}/>
        <DropDownPicker
            items={props.possibleFilters}
            placeholder={"Select filter..."}
            defaultValue={[]}
            multipleText="%d filters(s) applied"
            dropDownMaxHeight={props.headerHeight-20}
            containerStyle={{height: 45, marginLeft: 15, marginRight: 15}}
            style={[{borderWidth: 0, backgroundColor: props.searchBarColor, opacity: dropDownPickerOpacity,borderTopLeftRadius: 8, borderTopRightRadius: 8,borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}
            searchable={props.filterSearchable}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            multiple
            searchablePlaceholderTextColor={colors.searchbarBG[colors.mode]}
            labelStyle={{marginLeft:10, color:colors.textBlack[colors.mode]}}
            customTickIcon={()=><View/>}
            activeItemStyle={{borderRadius: 10, backgroundColor: colors.lightDarkAccent[colors.mode]}}
            dropDownStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 0, backgroundColor: colors.filterBG[colors.mode], opacity: 0.98, }}
            onChangeItem={item => props.updateSearch(item)}
        />
        <View style={[styles.topSpace, {height: props.headerHeight / 1.5 - 53,}]}>
        </View>
        <View style={{height: props.headerHeight / 2}}>
          <View style={styles.subHeader}>
            <FadeInOut fadeIn={true}>
              <TextFont style={[styles.title, {color: props.titleColor}]} bold={true}>{props.title}</TextFont>
            </FadeInOut>
            <View style={[styles.searchBox, {backgroundColor:props.searchBarColor}]}>
              <DelayInput
                allowFontScaling={false}
                placeholder={"Search"}
                style={styles.searchText}
                onChangeText={function(text){props.updateSearch(text);}} 
                onFocus={() => {Vibration.vibrate(15);}}
                minLength={2}
                delayTimeout={400}
              />
            </View>
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
        <View style={{height: 55,}}/>
        <View style={[styles.topSpace, {height: props.headerHeight / 1.5 - 53,}]}>
        </View>
        <View style={{height: props.headerHeight / 2}}>
          <View style={styles.subHeader}>
            <View style={[styles.searchBox, {backgroundColor:props.searchBarColor}]}>
              <TextInput allowFontScaling={false} style={styles.searchText} value={""}/>
            </View>
          </View>
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
    fontSize: 41, 
    marginBottom: 5,
  },
  searchText: {
    color: '#515151',
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
    width:'100%',
    paddingRight: 25,
  },
  searchBox: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 18,
    opacity: 0.7
  },
});
export default Header;
