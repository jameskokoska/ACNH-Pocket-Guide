import React, {Component} from 'react';
import {Image, StyleSheet, View, Text, TouchableNativeFeedback, Animated, Dimensions} from 'react-native';
import TextFont from './TextFont'
import colors from "../Colors"

class ProgressContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      animationValue: new Animated.Value(-Dimensions.get('window').width),
      width:0,
    }
  }
  componentDidUpdate(prevProps){
    if(this.props!==prevProps){
      setTimeout(()=>{this.animation(this.state.width)},100)
    }
  }
  animation=(width=0)=>{
    var percent = this.props.percentage/100
    if(this.props.percentage===undefined){
      percent = 0
    }
    let animateToValue = 0
    if(width!==0){
      animateToValue = width - percent*width
    } else {
      animateToValue = this.state.width - percent*this.state.width
    }
    Animated.timing(this.state.animationValue, {
      toValue: animateToValue*-1,
      useNativeDriver: true,
      duration: 1000,
      delay: this.props.delay!==undefined?this.props.delay*100:0,
    }).start();
  }
  render(){
    return(
    <View onLayout={(event) => {
        let width = event?.nativeEvent?.layout?.width;
        this.setState({width:width})
      }}
    >
      <TouchableNativeFeedback onPress={()=>{this.props.setPage(this.props.page, true, this.props.tab)}} background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}>
        <View style={[styles.progressContainer,{backgroundColor:this.props.backgroundColor, overflow:"hidden"}]}>
          <Animated.View style={[styles.progressBar,{width:"100%", backgroundColor:this.props.color, transform: [{ translateX: this.state.animationValue }]}]}/>
          <View style={{width:"100%",height:"100%",flexDirection:"row",position:"absolute", alignItems:"center", justifyContent:"center"}}>
            <Image style={styles.image} source={this.props.image}/>
            <TextFont style={{fontSize: 18, marginLeft: 10, color:this.props.textColor}}>{this.props.text}</TextFont>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
    )
  }
}
export default ProgressContainer;

const styles = StyleSheet.create({
  progressContainer:{
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