import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';

class SongsPage extends Component {
  render(){
    var animationWidth = 380
    console.log(-1/(animationWidth/Dimensions.get('window').width)*100+100)
    return(
      <>
      <View pointerEvents="none" 
        style={{
          overflow:"hidden",
          zIndex:5,
          position:"absolute",
          bottom:-1/(animationWidth/Dimensions.get('window').width)*50+50,
          transform: [
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
            zIndex:5,
            transform: [
              { scaleX: 1/(animationWidth/Dimensions.get('window').width)},
            ],
          }} 
          source={require('../assets/waveAnimation.json')}
        />
      </View>
      <View pointerEvents="none" 
        style={{
          overflow:"hidden",
          zIndex:5,
          position:"absolute",
          top:-1/(animationWidth/Dimensions.get('window').width)*50+50,
          transform: [
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
            zIndex:5,
            transform: [
              { scaleX: 1/(animationWidth/Dimensions.get('window').width)},
            ],
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