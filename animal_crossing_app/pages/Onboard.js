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
        showDone={false}
        skipLabel= {<TextFont style={{fontSize: 20, color:"gray"}}>Skip</TextFont>}
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
            image: <Image style={{height: 300, width: 300, resizeMode:'contain'}} source={require('../assets/icons/palmIcon.png')} />,
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
            backgroundColor: colors.background[colors.mode],
            image: <LottieView 
              autoPlay
              loop={true}
              style={{
                width: 150,
                height: 150,
              }} 
              source={require('../assets/balloon.json')}
            />,
            title: <TextFont style={{fontSize: 30, width: "70%", textAlign:'center', color:colors.textBlack[colors.mode]}} bold={true}>Let's go!</TextFont>,
            subtitle: <>
              <ButtonComponent vibrate={10} color={colors.okButton[colors.mode]} text="Northern Hemisphere" onPress={() => {
                AsyncStorage.setItem("firstLogin", "false"); 
                AsyncStorage.setItem("settingsNorthernHemisphere", "true");
                global.settingsCurrent[0]["currentValue"] = "true";
                this.props.setFirstLogin(false);
              }} />
              <ButtonComponent vibrate={10} color={colors.okButton[colors.mode]} text="Southern Hemisphere" onPress={() => {
                AsyncStorage.setItem("firstLogin", "false"); 
                AsyncStorage.setItem("settingsNorthernHemisphere", "false");
                global.settingsCurrent[0]["currentValue"] = "false";
                this.props.setFirstLogin(false);
              }} />
            </>,
          },
        ]}
      />
    )
  }
}
export default Onboard;