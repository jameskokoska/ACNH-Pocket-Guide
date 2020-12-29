import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View, TextInput, Text, Vibration} from 'react-native';
import TextFont from './TextFont'
import FadeInOut from "./FadeInOut"
import LottieView from 'lottie-react-native';

const Header = (props) => {
  return (
    <>
      <ImageBackground source={props.appBarImage} style={{width:"100%", backgroundColor: props.appBarColor}}>
        <View style={[styles.topSpace, {height: props.headerHeight / 1.5,}]}>
        </View>
        <View style={{height: props.headerHeight / 2}}>
          <View style={styles.subHeader}>
            <FadeInOut fadeIn={true}>
              <TextFont style={[styles.title, {color: props.titleColor}]} bold={true}>{props.title}</TextFont>
            </FadeInOut>
            <View style={[styles.searchBox, {backgroundColor:props.searchBarColor}]}>
              <TextInput placeholder={"Search"} allowFontScaling={false} style={styles.searchText} onChangeText={function(text){props.updateSearch(text);}} onFocus={() => {Vibration.vibrate(15);}}/>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export const HeaderLoading = (props) => {
  const [search, setSearch] = useState('Search')
  return (
    <FadeInOut fadeIn={true}>
      <ImageBackground source={props.appBarImage} style={{width:"100%", backgroundColor: props.appBarColor}}>
        <View style={[styles.topSpace, {height: props.headerHeight / 1.5,}]}>
        </View>
        <View style={{height: props.headerHeight / 2}}>
          <View style={styles.subHeader}>
            <View style={[styles.searchBox, {backgroundColor:props.searchBarColor}]}>
              <TextInput allowFontScaling={false} style={styles.searchText} value={""} onChangeText={function(text){setSearch(text); props.updateSearch(text);}} onFocus={() => {setSearch(""); Vibration.vibrate(15);}} onBlur={function(){if(search===""){setSearch("Search"); props.updateSearch("Search");}else{setSearch(search);}}}/>
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
