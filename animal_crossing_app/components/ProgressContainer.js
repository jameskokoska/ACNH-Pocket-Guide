import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'
import colors from "../Colors"

class ProgressContainer extends Component {
  render(){
    var percentage = 10;
    return(<TouchableNativeFeedback onPress={()=>{this.props.setPage(this.props.page, true, this.props.tab)}} background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}>
      <View style={[styles.progressContainer,{backgroundColor:this.props.backgroundColor}]}>
        <View style={[styles.progressBar,{width:this.props.percentage+"%",backgroundColor:this.props.color}]}>
        </View>
        <View style={{width:"100%",height:"100%",flexDirection:"row",position:"absolute", alignItems:"center", justifyContent:"center"}}>
          <Image style={styles.image} source={this.props.image}/>
          <TextFont style={{fontSize: 18, marginLeft: 10, color:this.props.textColor}}>{this.props.text}</TextFont>
        </View>
      </View>
    </TouchableNativeFeedback>
    )
  }
}
export default ProgressContainer;

const styles = StyleSheet.create({
  progressContainer:{
    marginLeft:30,
    marginRight:30,
    marginTop: 8,
    marginBottom: 8,
    height: 40,
    borderRadius: 10,
  },
  progressBar:{
    height: 40,
    borderRadius: 10,
    opacity: 0.7,
  },
  image: {
    width: 35,
    height: 25,
    resizeMode:'contain',
  },
});