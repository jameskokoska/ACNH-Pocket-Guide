import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';

class SongsPage extends Component {
  render(){
    return(
      <>
      <View pointerEvents="none"  
        style={{
          width: Dimensions.get('window').width,
          position:'absolute',
          top:-5,
          zIndex:5,
          transform: [
            { scale: 1.1 },
            { rotate: '0deg'},
          ],
          opacity: colors.musicWavesTransparency[colors.mode],
        }} 
      >
        <LottieView 
          autoPlay
          loop
          style={{
            width: Dimensions.get('window').width,
          }} 
          source={require('../assets/waveAnimation.json')}
        />
      </View>
      <View pointerEvents="none" 
        style={{
          width: Dimensions.get('window').width,
          position:'absolute',
          bottom:-20,
          zIndex:5,
          transform: [
            { scale: 1.1 },
            { rotate: '180deg'},
          ],
          opacity: colors.musicWavesTransparency[colors.mode],
        }} 
      >
      <LottieView 
        autoPlay
        loop
        style={{
          width: Dimensions.get('window').width,
        }} 
        source={require('../assets/waveAnimation.json')}
      />
      </View>
        <ListPage 
          disablePopup={[true]}
          showVariations={[false]}
          title="Music"
          imageProperty={["Album Image"]}
          textProperty={["Name"]}
          checkListKey={[["songCheckList","Name"]]}
          searchKey={[["Name"]]}
          gridType="largeGrid" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedMusic"}
          appBarColor={colors.musicAppBar[colors.mode]}
          titleColor={colors.textWhite[0]}
          searchBarColor={colors.searchbarBG[colors.mode]}
          backgroundColor={colors.lightDarkAccent[colors.mode]}
          boxColor={colors.white[colors.mode]}
          labelColor={colors.textBlack[colors.mode]}
          accentColor={colors.musicAccent[colors.mode]}
        />
      </>
    )
  }
}
export default SongsPage;