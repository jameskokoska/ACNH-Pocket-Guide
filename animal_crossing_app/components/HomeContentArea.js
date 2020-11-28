import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import TextFont from './TextFont';


class HomeContentArea extends Component {
  render(){
    var date="May 23";
    return <View style={[styles.contentBackground,{backgroundColor:this.props.backgroundColor}]}>
      <View style={styles.topTitlePosition}> 
        <TextFont style={[styles.topTitle,{backgroundColor:this.props.accentColor}]} bold={true}>{this.props.title}</TextFont>
      </View>
      {this.props.children}
    </View>
  }
}
export default HomeContentArea;

const styles = StyleSheet.create({
  contentBackground:{
    borderRadius: 25,
    paddingTop: 20,
    marginTop: 30,
    marginBottom: -70,
    paddingBottom: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 6,
  },
  topTitlePosition:{
    position: "absolute",
    top: -17,
    left: 20
  },
  topTitle:{
    fontSize:20,
    borderRadius: 100,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 7,
    paddingBottom: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 5,
  },
})