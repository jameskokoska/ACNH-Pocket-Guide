import React, {Component} from 'react';
import {Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import LottieView from 'lottie-react-native';

class FAB extends Component {
  componentDidMount() {
    
  }
  render(){
    return(
        <TouchableOpacity onPress={() => {this.animation.play(); this.props.openDrawer(); Vibration.vibrate(10);}} activeOpacity={0.7} style={[styles.FABShape,{backgroundColor: this.props.backgroundColor}]}>
            <LottieView 
              ref={animation => {
                this.animation = animation;
              }}
              loop={false}
              style={{
                width: 23,
                height: 23,
              }} 
              source={require('../assets/menu.json')}
            />
        </TouchableOpacity>
    )
  }
}
export default FAB;

const styles = StyleSheet.create({
    FABShape: {
        height: 70,
        width: 70,
        borderRadius: 1000,
        position: "absolute",
        right: 20,
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:5,
    }
});