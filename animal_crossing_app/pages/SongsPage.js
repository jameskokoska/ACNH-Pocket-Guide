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
          opacity: colors.musicWavesTransparency[global.darkMode],
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
          opacity: colors.musicWavesTransparency[global.darkMode],
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
          title="Music"
          imageProperty={["Album Image"]}
          textProperty={["NameLanguage",]}
          searchKey={[["NameLanguage",]]}
          gridType="largeGrid" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedMusic"}
          appBarColor={colors.musicAppBar[global.darkMode]}
          titleColor={colors.textWhite[0]}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.lightDarkAccent[global.darkMode]}
          boxColor={false}
          labelColor={colors.textBlack[global.darkMode]}
          accentColor={colors.musicAccent[global.darkMode]}
        />
      </>
    )
  }
}
export default SongsPage;