import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import TextFont from './TextFont';
import colors from '../Colors'

class HomeContentArea extends Component {
  render(){
    var date="May 23";
    return <View style={[styles.contentBackground,{backgroundColor:this.props.backgroundColor, borderColor:colors.shadow[colors.mode]}]}>
      <View style={styles.topTitlePosition}> 
        <TextFont style={[styles.topTitle,{backgroundColor:this.props.accentColor, color:this.props.titleColor}]} bold={true}>{this.props.title}</TextFont>
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
    elevation: 6,
    borderWidth: 1.1,
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
    elevation: 5,
  },
})