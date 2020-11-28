import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import Clock from '../components/Clock';
import HomeContentArea from '../components/HomeContentArea';

class HomePage extends Component {
  render(){
      return <>
        <ScrollView>
          <View style={{height:50}}/>
          <Clock/>
          <HomeContentArea backgroundColor="gray" accentColor="green" title="Section">
            <Text>Hello</Text>
            <Clock/>
          </HomeContentArea>
          <HomeContentArea backgroundColor="black" accentColor="black"  title="SectionYeet">
            <Clock/>
            <Text>Hello</Text>
          </HomeContentArea>
          <HomeContentArea backgroundColor="orange" accentColor="green"title="Collected">
            <Text>Hello</Text>
            <Clock/>
          </HomeContentArea>
          <View style={{height:1000}}/>
        </ScrollView>
        <View style={{position:"absolute", width: "100%", height:"100%", zIndex:-5}}>
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
    height: "30%",
    width: "100%",
    backgroundColor: "#4298f5",
  },
  homeScreenBackgroundBottom: {
    height: "70%",
    width: "100%",
    backgroundColor: "#79d66f",
  },
});