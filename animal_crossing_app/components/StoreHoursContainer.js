import React, {Component} from 'react';
import {Image, Vibration, StyleSheet, DrawerLayoutAndroid, View, Text,} from 'react-native';
import TextFont from './TextFont'
import colors from "../Colors"
import {getCurrentDateObject} from "./DateFunctions"

class StoreHoursContainer extends Component {
  render(){
    var backgroundColor;
    var currentHour = getCurrentDateObject().getHours();
    if(currentHour+1===this.props.closeHour){
      backgroundColor = colors.closingSoonStore[global.darkMode]
    } else if(currentHour >= this.props.openHour && currentHour < this.props.closeHour){
      backgroundColor = colors.openStore[global.darkMode];
    } else {
      backgroundColor = colors.closedStore[global.darkMode];
    }
    if(this.props.backgroundColor!==undefined){
      backgroundColor=this.props.backgroundColor;
    }
    return(
        <View style={[styles.storeContainer,{backgroundColor:backgroundColor}]}>
          <Image style={styles.storeImage} source={this.props.image}/>
          <View style={styles.textContainer}>
            <TextFont bold={true} style={[styles.textContainerTop,{color:colors.textBlack[global.darkMode]}]}>{this.props.text}</TextFont>
            <TextFont style={[styles.textContainerBottom,{color:colors.textBlack[global.darkMode]}]}>{this.props.textBottom}</TextFont>
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
    marginRight: 100,
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
    borderRadius: 14,
    height: 120
  },
});