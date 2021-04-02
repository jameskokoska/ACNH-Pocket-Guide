import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  Image,
  Vibration,
} from 'react-native';
import TextFont from './TextFont'
import {getSettingsString} from "../LoadJsonData"

class SidebarElement extends Component {
 
  render(){
    var backgroundColor;
    var elevation;
    if(this.props.currentPage===this.props.pageName){
      backgroundColor=this.props.backgroundColor;
      elevation = 4;
    } else {
      backgroundColor=this.props.unselectedColor;
      elevation = 0;
    }
    return (
      <TouchableNativeFeedback onPress={() => {getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(15) : ""; this.props.setPage(this.props.pageName);}}>
        <View style={[styles.sidebarBox, {backgroundColor: backgroundColor,elevation: elevation}]}>
          <Image style={styles.sidebarImage} source={this.props.image}/>
          <TextFont bold={true} style={[styles.sidebarTitle,{color:this.props.textColor}]}>{this.props.title}</TextFont>
        </View>
      </TouchableNativeFeedback>
    );
  }
};

const styles = StyleSheet.create({
  sidebarImage:{
    width: 26,
    height: 26,
    marginLeft: 20,
    resizeMode:'contain',
  },
  sidebarTitle:{
    fontSize: 14,
    marginLeft: 20,
    marginRight: 20,
  },
  sidebarBox: {
    alignItems: 'center',
    flexDirection:"row",
    height: 54,
    borderRadius:14,
    margin: 4,
    marginLeft: "7%",
    marginRight: "9%",
    paddingRight: 50,
  },
});

export default SidebarElement;
