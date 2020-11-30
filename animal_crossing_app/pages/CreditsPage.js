import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont'
import StoreHoursContainer from '../components/StoreHoursContainer';

const music = require("../assets/data/music.json");
const {width} = Dimensions.get('window');


class CreditsPage extends Component {
  render(){
    return(
      <View style={{backgroundColor:"black", height:"100%"}}>
        <View style={{marginTop: 100}}/>
        <LottieView 
          autoPlay
          loop
          style={{
            width: width,
          }} 
          source={require('../assets/credits.json')}
        />
        <View style={{marginTop: 40}}/>
        <TextFont bold={true} style={{fontSize: 40, marginLeft: 30, color:"white"}}>Credits</TextFont>
        <View style={{marginTop: 20}}/>
        <View style={{height: 300}}>
          <StoreHoursContainer backgroundColor="gray" textColor="white" image={require("../assets/icons/James.png")} text="James" textBottom="Lead Programmer"/>
          <StoreHoursContainer backgroundColor="gray" textColor="white" image={require("../assets/icons/Ryan.png")} text="Ryan" textBottom="Lead Graphics"/>
        </View>
     </View>
    )
  }
}
export default CreditsPage;