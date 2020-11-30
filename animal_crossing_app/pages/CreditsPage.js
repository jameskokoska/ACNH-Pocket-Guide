import React, {Component} from 'react';
import {ScrollView, View, Dimensions, Text} from 'react-native';
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
        <ScrollView>
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
          <View style={{height: 50}}/>
          <TextFont bold={true} style={{fontSize: 20, marginLeft: 30, color:"white", marginBottom: 10}}>Additional Information</TextFont>
          <Text style={{fontSize: 16, marginLeft: 30, marginRight: 30, color:"white"}}>This application was created using React Native, with the original App programmed in Flutter. This application and contents are NOT affiliated with Nintendo. All local artwork recreated/licensed. This application is not made for commercial use, and is provided at a price of 0$ (free) on the Google Play Store with no advertisements. All application source code is of property to respective owners/contributors listed on the Credits page and/or licenses associated within specific packages/libraries within this application.</Text>
          <Text style={{fontSize: 16, marginLeft: 30, marginRight: 30, color:"white"}}>Twemoji Icons Graphics licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/.</Text>
          <Text style={{fontSize: 16, marginLeft: 30, marginRight: 30, color:"white"}}>All game data sourced from https://tinyurl.com/acnh-sheet. Thank you everyone for all the hard work and for making the spreadsheet!</Text>
          <Text style={{fontSize: 16, marginLeft: 30, marginRight: 30, color:"white"}}>Seasons Data from capstone#3473.</Text>
          <Text style={{fontSize: 16, marginLeft: 30, marginRight: 30, color:"white"}}>And thank YOU for downloading this application and showing your support.</Text>
          <View style={{height: 100}}/>
        </ScrollView>
     </View>
    )
  }
}
export default CreditsPage;