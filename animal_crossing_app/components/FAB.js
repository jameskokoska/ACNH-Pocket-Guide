import React, {Component} from 'react';
import {Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../Colors'
import {getSettingsString} from "../LoadJsonData"

export class FABWrapper extends Component {
  constructor(props){
    super(props)
    this.state = {currentPage:0}
  }

  updateFAB = (currentPage) => {
    this.setState({currentPage:currentPage})
  }

  render(){
    let fab = <View/>;
    if(global.settingsCurrent!==undefined&&getSettingsString("settingsShowFAB")==="true"){
      if(this.state.currentPage===16){
        fab = <FAB openDrawer={this.props.openDrawer} offset={38}/>;
      }else if(this.state.currentPage===15){
        fab = <View/>;
      }else {
        fab = <FAB openDrawer={this.props.openDrawer}/>;
      } 
    }
    return <>{fab}</>
  }
}

class FAB extends Component {
  componentDidMount() {
  }
  render(){
    var offset = 0;
    if(this.props.offset!==undefined){
      offset = this.props.offset
    }
    return(<TouchableNativeFeedback 
      background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], true, 32)}
      onPress={() => {this.animation.play(); this.props.openDrawer(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}
      >
        <View style={[styles.FABShape,{backgroundColor: colors.FAB[global.darkMode], bottom:20+offset}]}>
            <LottieView 
              ref={animation => {
                this.animation = animation;
              }}
              loop={false}
              style={{
                width: 20,
                height: 20,
              }} 
              source={require('../assets/menu.json')}
            />
        </View>
      </TouchableNativeFeedback>
    )
  }
}
export default FAB;

const styles = StyleSheet.create({
    FABShape: {
        opacity: 0.7,
        height: 64,
        width: 64,
        borderRadius: 1000,
        position: "absolute",
        right: 20,
        bottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:5,
    }
});