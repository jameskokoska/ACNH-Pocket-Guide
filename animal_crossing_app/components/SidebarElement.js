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

class SidebarElement extends Component {
 
  render(){
    var backgroundColor;
    var elevation;
    if(this.props.currentPage===this.props.pageNum){
      backgroundColor=this.props.backgroundColor;
      elevation = 4;
    } else {
      backgroundColor=this.props.unselectedColor;
      elevation = 0;
    }
    return (
      <TouchableNativeFeedback onPress={() => {Vibration.vibrate(15); this.props.setPage(this.props.pageNum);}}>
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
  },
  sidebarBox: {
    alignItems: 'center',
    flexDirection:"row",
    height: 54,
    borderRadius:14,
    margin: 4,
    marginLeft: "7%",
    marginRight: "7%",
  },
});

export default SidebarElement;
