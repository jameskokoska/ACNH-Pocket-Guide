import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Clock from '../components/Clock';
import HomeContentArea from '../components/HomeContentArea';
import EventContainer from '../components/EventContainer';
import StoreHoursContainer from '../components/StoreHoursContainer';
import LottieView from 'lottie-react-native';
import colors from '../Colors'
import Androw from 'react-native-androw';

class HomePage extends Component {
  render(){
      return <>
        
        <ScrollView>
          <View style={{height:45}}/>
          <Clock/>
          <View style={{height:125}}/>
          <HomeContentArea backgroundColor={colors.sectionBackground1[colors.mode]} accentColor={colors.eventsColor[colors.mode]} title="Section" titleColor={colors.eventsColor[colors.modeReverse]}>
            <Text>Hello</Text>
            <EventContainer backgroundColor="black" textColor="white" image={require("../assets/icons/music.png")} text="K.K. Slider" textBottom="8 - 12 PM" month="Nov" day="31"/>
            <EventContainer backgroundColor="black" textColor="white" image={require("../assets/icons/music.png")} text="K.K. Slider" textBottom="8 - 12 PM" month="Nov" day="31"/>
          </HomeContentArea>
          <HomeContentArea backgroundColor={colors.sectionBackground2[colors.mode]} accentColor={colors.storeHoursColor[colors.mode]} title="SectionYeet" titleColor={colors.storeHoursColor[colors.modeReverse]}>
            <Clock/>
            <Text>Hello</Text>
          </HomeContentArea>
          <HomeContentArea backgroundColor={colors.sectionBackground1[colors.mode]} accentColor={colors.activeCreaturesColor[colors.mode]} title="Collected" titleColor={colors.activeCreaturesColor[colors.modeReverse]}>
            <Text>Hello</Text>
            <StoreHoursContainer backgroundColor="green" textColor="white" image={require("../assets/icons/able.png")} text="Able Sisters" textBottom="8 - 12 PM"/>
            <StoreHoursContainer backgroundColor="green" textColor="white" image={require("../assets/icons/able.png")} text="Able Sisters" textBottom="8 - 12 PM"/>
          </HomeContentArea>
          <View style={{height:1000}}/>
        </ScrollView>
        <View style={{position:"absolute", width: "100%", height:"100%", zIndex:-5}}>
          <LottieView 
            autoPlay
            loop
            style={{
              width: 425,
              height: 232,
              position:'absolute',
              top:30,
              zIndex:1,
              transform: [
                { scale: 1.25 },
                { rotate: '0deg'},
              ],
            }} 
            source={require('../assets/homeSnow.json')}
          />
          <View style={[styles.homeScreenBackgroundTop,{backgroundColor:colors.skyColor[colors.mode]}]}>
          </View>
          <View style={[styles.homeScreenBackgroundBottom,{backgroundColor:colors.grassColor[colors.mode]}]}>
          </View>
        </View>
      </>
  }
}
export default HomePage;

const styles = StyleSheet.create({
  homeScreenList: {
    alignItems: 'center',
    width: "100%"
  },
  homeScreenBackgroundTop: {
    height: 295,
    width: "100%",
    backgroundColor: "#4298f5",
  },
  homeScreenBackgroundBottom: {
    height: "70%",
    width: "100%",
    zIndex: 6,
  },
});