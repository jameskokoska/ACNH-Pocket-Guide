import React, {Component} from 'react';
import {View, Button, Image, ScrollView, Dimensions, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont';
import Onboarding from 'react-native-onboarding-swiper';
import ButtonComponent from '../components/ButtonComponent'
import colors from '../Colors'

class Onboard extends Component {
  render(){
    return(
      <Onboarding
        allowFontScaling={false}
        transitionAnimationDuration={400}
        showDone={false}
        skipLabel= {<TextFont style={{fontSize: 20, color:"gray"}}>Skip</TextFont>}
        imageContainerStyles = {{paddingBottom:30,}}
        nextLabel= {
          <View style={{transform: [{ rotate: '180deg'}]}}>
            <LottieView 
              autoPlay
              loop
              style={{
                width: 45,
                height: 45,
              }} 
              source={require('../assets/arrow.json')}
            />
          </View>
        }
        onDone={() => {AsyncStorage.setItem("firstLogin", "false"); this.props.setFirstLogin(false);}}
        onSkip={() => {AsyncStorage.setItem("firstLogin", "false"); this.props.setFirstLogin(false);}}
        pages={[
          {
            backgroundColor: colors.white[0],
            image: <Image style={{height: 250, width: 250, resizeMode:'contain', margin:0}} source={require('../assets/icons/palmIcon.png')} />,
            title: <TextFont style={{fontSize: 30, width: "70%", textAlign:'center'}} bold={true}>Welcome to ACNH Pocket Guide</TextFont>,
            subtitle: <TextFont style={{fontSize: 16, textAlign:"center", paddingTop: 20,}} bold={true}>This is version 2.0 of this application. Enjoy!</TextFont>,
          },
          {
            backgroundColor: colors.FAB[0],
            image: <Image style={{height: 250, width: 250, resizeMode:'contain'}} source={require('../assets/icons/emote.png')} />,
            title: <TextFont style={{fontSize: 24, width: "90%", color:colors.white[0]}} bold={true}>Track your creatures, collection, and game events</TextFont>,
            subtitle: <TextFont style={{fontSize: 16, width: "90%", paddingTop: 20, color:colors.white[0]}} bold={true}>With a user friendly and modern interface and experience.</TextFont>,
          },
          {
            backgroundColor: colors.background[global.darkMode],
            image: <LottieView 
              autoPlay
              loop={true}
              style={{
                width: 120,
                height: 120,
                transform: [
                  { scale: 1.25 },
                ],
              }} 
              source={require('../assets/balloon.json')}
            />,
            title: <TextFont style={{fontSize: 30, paddingTop: 20, width: "70%", textAlign:'center', color:colors.textBlack[global.darkMode]}} bold={true}>Let's go!</TextFont>,
            subtitle: <>
              <ButtonComponent vibrate={10} color={colors.okButton[global.darkMode]} text="Northern Hemisphere" onPress={() => {
                AsyncStorage.setItem("firstLogin", "false"); 
                AsyncStorage.setItem("settingsNorthernHemisphere", "true");
                global.settingsCurrent[0]["currentValue"] = "true";
                this.props.setFirstLogin(false);
              }} />
              <ButtonComponent vibrate={10} color={colors.okButton[global.darkMode]} text="Southern Hemisphere" onPress={() => {
                AsyncStorage.setItem("firstLogin", "false"); 
                AsyncStorage.setItem("settingsNorthernHemisphere", "false");
                global.settingsCurrent[0]["currentValue"] = "false";
                this.props.setFirstLogin(false);
              }} />
              <TextFont style={{fontSize: 12, paddingTop: 30, width: "70%", textAlign:'center', color:colors.textBlack[global.darkMode]}} bold={true}>You can import your exported data from the last version of the app in settings.</TextFont>
            </>,
          },
        ]}
      />
    )
  }
}
export default Onboard;