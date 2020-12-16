import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont';
import Popup from './Popup';

class SettingsContainer extends Component {
  constructor(){
    super();
    this.state = {
      open:false,
    }
  }
  render(){
    return(
      <TouchableOpacity onPress={() => this.setState({open:!this.state.open})}>
        <View style={[styles.settingsContainer,{backgroundColor:this.props.backgroundColor}]}>
          <Image style={styles.settingsImage} source={this.props.image}/>
          <View style={styles.textContainer}>
            <TextFont bold={true} style={[styles.textContainerTop,{color:this.props.textColor}]}>{this.props.text}</TextFont>
          </View>
          <Popup text={this.props.text} textLower={this.props.description} button1={"OK"} button1Action={()=>{console.log("OK")}} popupVisible={this.state.open} close={() => this.setState({open:!this.state.open})}/>
        </View>
      </TouchableOpacity>
    )
  }
}
export default SettingsContainer;

const styles = StyleSheet.create({
  textContainerTop:{
    fontSize: 18,
  },
  textContainerBottom:{
    marginTop: 2,
    fontSize: 16,
  },
  textContainer:{
    marginLeft: 10,
  },
  settingsImage: {
    width: 30,
    height: 30,
    resizeMode:'contain',
  },
  settingsContainer: {
    padding: 10,
    paddingLeft: 15,
    margin: 8,
    flexDirection:"row",
    flex:1,
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    height: 70
  },
});