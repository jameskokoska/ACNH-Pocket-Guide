import React, {Component} from 'react';
import {Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';

const music = require("../assets/data/music.json");
const {width} = Dimensions.get('window');


class SongsPage extends Component {
  render(){
    return(
      <>
      <LottieView 
        autoPlay
        loop
        style={{
          width: width,
          position:'absolute',
          top:-5,
          zIndex:5,
          transform: [
            { scale: 1.1 },
            { rotate: '0deg'},
          ],
        }} 
        source={require('../assets/waveAnimation.json')}
      />
      <LottieView 
        autoPlay
        loop
        style={{
          width: width,
          position:'absolute',
          bottom:-20,
          zIndex:5,
          transform: [
            { scale: 1.1 },
            { rotate: '90deg'},
          ],
        }} 
        source={require('../assets/waveAnimation.json')}
      />
        <ListPage 
          data={[music]}
          showVariations={false}
          title="Music"
          imageProperty={["Album Image"]}
          textProperty={["Name"]}
          checkListKey={[["songCheckList","Name"]]}
          searchKey={[["Name"]]}
          gridType="largeGrid" //smallGrid, largeGrid, row
        />
      </>
    )
  }
}
export default SongsPage;