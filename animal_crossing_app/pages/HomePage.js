import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Clock from '../components/Clock';
import HomeContentArea from '../components/HomeContentArea';
import EventContainer from '../components/EventContainer';
import StoreHoursContainer from '../components/StoreHoursContainer';
import LottieView from 'lottie-react-native';

class HomePage extends Component {
  render(){
      return <>
        
        <ScrollView>
          <View style={{height:45}}/>
          <Clock/>
          <View style={{height:115}}/>
          <HomeContentArea backgroundColor="gray" accentColor="green" title="Section">
            <Text>Hello</Text>
            <EventContainer backgroundColor="black" textColor="white" image={require("../assets/icons/music.png")} text="K.K. Slider" textBottom="8 - 12 PM" month="Nov" day="31"/>
            <EventContainer backgroundColor="black" textColor="white" image={require("../assets/icons/music.png")} text="K.K. Slider" textBottom="8 - 12 PM" month="Nov" day="31"/>

          </HomeContentArea>
          <HomeContentArea backgroundColor="black" accentColor="black"  title="SectionYeet">
            <Clock/>
            <Text>Hello</Text>
          </HomeContentArea>
          <HomeContentArea backgroundColor="orange" accentColor="green"title="Collected">
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
              height: 219,
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
          <View style={styles.homeScreenBackgroundTop}>
          </View>
          <View style={styles.homeScreenBackgroundBottom}>
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
    height: 285,
    width: "100%",
    backgroundColor: "#4298f5",
  },
  homeScreenBackgroundBottom: {
    height: "70%",
    width: "100%",
    backgroundColor: "#79d66f",
    zIndex: 6,
  },
});