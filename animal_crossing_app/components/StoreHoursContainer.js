import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'


class StoreHoursContainer extends Component {
  componentDidMount() {
    
  }
  render(){
    return(
        <View style={[styles.storeContainer,{backgroundColor:this.props.backgroundColor}]}>
          <Image style={styles.storeImage} source={this.props.image}/>
          <View style={styles.textContainer}>
            <TextFont bold={true} style={[styles.textContainerTop,{color:this.props.textColor}]}>{this.props.text}</TextFont>
            <TextFont style={[styles.textContainerBottom,{color:this.props.textColor}]}>{this.props.textBottom}</TextFont>
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