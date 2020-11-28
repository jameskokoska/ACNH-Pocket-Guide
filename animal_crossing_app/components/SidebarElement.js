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
    return (
      <TouchableNativeFeedback onPress={() => {Vibration.vibrate(20); this.props.setPage(this.props.pageNum);}}>
        <View style={styles.sidebarBox}>
            <Image style={styles.sidebarImage} source={this.props.image}/>
            <TextFont bold={true} style={styles.sidebarTitle}>{this.props.title}</TextFont>
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
    backgroundColor: "#DDDDDD",
    height: 58,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 5,
    marginLeft: "7%",
    marginRight: "7%",
  },
});

export default SidebarElement;
