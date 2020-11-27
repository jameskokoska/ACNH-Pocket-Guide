import React, {Component} from 'react';
import {Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';

class FAB extends Component {
  render(){
    return(
        <TouchableOpacity onPress={() => {this.props.openDrawer(); Vibration.vibrate(15);}} activeOpacity={0.7} style={[styles.FABShape,{backgroundColor: this.props.backgroundColor}]}>
            <Text>Menu</Text>
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
    }
});