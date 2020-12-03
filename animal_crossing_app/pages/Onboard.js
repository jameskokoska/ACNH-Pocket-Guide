import React, {Component} from 'react';
import {View, Button, Image, ScrollView, Dimensions, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont';
import Onboarding from 'react-native-onboarding-swiper';

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
            backgroundColor: '#fff',
            image: <Image style={{height: 300, width: 300, resizeMode:'contain'}} source={require('../assets/icons/palmIcon.png')} />,
            title: <TextFont style={{fontSize: 30, width: "70%", textAlign:'center'}} bold={true}>Welcome to ACNH Pocket Guide</TextFont>,
            subtitle: <TextFont style={{fontSize: 20}} bold={true}>Awesome features... WOW!</TextFont>,
          },
          {
            backgroundColor: 'green',
            image: <Image style={{height: 300, width: 300, resizeMode:'contain'}} source={require('../assets/icons/palmIcon.png')} />,
            title: <TextFont style={{fontSize: 30, width: "70%", textAlign:'center'}} bold={true}>Welcome to ACNH Pocket Guide</TextFont>,
            subtitle: <TextFont style={{fontSize: 20}} bold={true}>Awesome features... WOW!</TextFont>,
          },
          {
            backgroundColor: 'grey',
            image: <LottieView 
              autoPlay
              loop={false}
              style={{
                width: 400,
                height: 400,
              }} 
              source={require('../assets/trackCollectionsAnimation.json')}
            />,
            title: <Button title="Get Started" onPress={() => {AsyncStorage.setItem("firstLogin", "false"); this.props.setFirstLogin(false);}} style={{height: 300, width: 300, resizeMode:'contain'}}/>,
            subtitle: <View/>,
          },
        ]}
      />
    )
  }
}
export default Onboard;