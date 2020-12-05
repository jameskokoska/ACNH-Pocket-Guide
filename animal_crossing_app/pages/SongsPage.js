import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';

const music = require("../assets/data/music.json");
const {width} = Dimensions.get('window');


class SongsPage extends Component {
  render(){
      console.log(colors.mode)

    return(
      <>
      <View pointerEvents="none"  
        style={{
          width: width,
          position:'absolute',
          top:-5,
          zIndex:5,
          transform: [
            { scale: 1.1 },
            { rotate: '0deg'},
          ],
        }} 
      >
        <LottieView 
          autoPlay
          loop
          style={{
            width: width,
          }} 
          source={require('../assets/waveAnimation.json')}
        />
      </View>
      <View pointerEvents="none" 
        style={{
          width: width,
          position:'absolute',
          bottom:-20,
          zIndex:5,
          transform: [
            { scale: 1.1 },
            { rotate: '180deg'},
          ],
        }} 
      >
      <LottieView 
        autoPlay
        loop
        style={{
          width: width,
        }} 
        source={require('../assets/waveAnimation.json')}
      />
      </View>
        <ListPage 
          showVariations={false}
          title="Music"
          imageProperty={["Album Image"]}
          textProperty={["Name"]}
          checkListKey={[["songCheckList","Name"]]}
          searchKey={[["Name"]]}
          gridType="largeGrid" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedMusic"}
          appBarColor={colors.bugAppBar[colors.mode]}
          appBarImage={require("../assets/icons/bugTitleDark.png")}
          titleColor={colors.textBlack[colors.mode]}
          searchBarColor={colors.searchbarBG[colors.mode]}
          backgroundColor={colors.lightDarkAccent[colors.mode]}
          boxColor={colors.white[colors.mode]}
          labelColor={colors.textBlack[colors.mode]}
          accentColor={colors.fishAccent[colors.mode]}
          specialLabelColor={colors.fishText[colors.mode]}
        />
      </>
    )
  }
}
export default SongsPage;