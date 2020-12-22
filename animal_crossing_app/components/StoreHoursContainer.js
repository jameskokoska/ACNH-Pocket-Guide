import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'
import colors from "../Colors"

class StoreHoursContainer extends Component {
  render(){
    var backgroundColor;
    var currentHour = new Date().getHours();
    if(currentHour+1===this.props.closeHour){
      backgroundColor = colors.closingSoonStore[colors.mode]
    } else if(currentHour >= this.props.openHour && currentHour < this.props.closeHour){
      backgroundColor = colors.openStore[colors.mode];
    } else {
      backgroundColor = colors.closedStore[colors.mode];
    }
    return(
        <View style={[styles.storeContainer,{backgroundColor:backgroundColor}]}>
          <Image style={styles.storeImage} source={this.props.image}/>
          <View style={styles.textContainer}>
            <TextFont bold={true} style={[styles.textContainerTop,{color:colors.textBlack[colors.mode]}]}>{this.props.text}</TextFont>
            <TextFont style={[styles.textContainerBottom,{color:colors.textBlack[colors.mode]}]}>{this.props.textBottom}</TextFont>
          </View>
        </View>
    )
  }
}
export default StoreHoursContainer;

const styles = StyleSheet.create({
  textContainerTop:{
    fontSize: 25,
  },
  textContainerBottom:{
    marginTop: 2,
    fontSize: 20,
  },
  textContainer:{
    marginLeft: 30,
  },
  storeImage: {
    width: 100,
    height: 80,
    resizeMode:'contain',
  },
  storeContainer: {
    padding: 20,
    paddingLeft: 30,
    margin: 8,
    flexDirection:"row",
    flex:1,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    height: 120
  },
});