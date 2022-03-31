import React, {Component} from 'react';
import {Image, StyleSheet, View, Text,  Animated, Dimensions, TouchableOpacity, BackHandler} from 'react-native';
import TextFont from './TextFont'
import colors from "../Colors"
import { getSettingsString } from '../LoadJsonData';
import { render } from 'react-dom';
import LottieView from 'lottie-react-native';
import { TouchableNativeFeedback2 } from './TouchableNativeFeedback';

export default class ProgressContainerToggle extends Component{
  constructor(props) {
    super();
    this.state = {
      editMode: false,
      enabled:false,
    }
  }
  componentDidMount(){
    this.mounted=true;
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPressLoanList",
      this.handleBackButton,
    );
    this.setState({
      editMode: this.props.editMode,
      enabled: this.props.enabled,
    })
  }
  componentWillUnmount(){
    this.mounted=false;
    BackHandler.removeEventListener("hardwareBackPressLoanList", this.handleBackButton);
  }
  handleBackButton = () => {
    if(this.state.editMode===true){
      this.props.toggleEditMode(false)
      return true
    } else {
      return false
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps!==this.props){
      this.setState({
        editMode: this.props.editMode,
        enabled: this.props.enabled,
        loaded:true,
      })
    }
  }
  toggleShown = () => {
    this.setState({enabled:!this.state.enabled})
    this.props.saveList(this.props.keyName)
  }
  render(){
    if(this.state.enabled===undefined?this.props.enabled:(this.state.enabled||this.props.editMode)){
      let progressContainer = <ProgressContainer 
        delay={this.props.delay} 
        setPage={this.props.setPage} 
        page={this.props.page} 
        tab={this.props.tab}
        color={this.props.color}
        backgroundColor={this.props.backgroundColor}
        textColor={this.props.textColor}
        percentage={this.props.percentage}
        image={this.props.image}
        text={this.props.text}
        tapAction={()=>{this.state.editMode?this.toggleShown():this.props.setPage(this.props.page, true, this.props.tab)}}
      />
      let removeButton=<View style={{marginHorizontal:30, left:-10, top:-5,position:'absolute',zIndex:10, }}>
        <TouchableOpacity style={{padding:9}} 
          onPress={()=>{
            this.toggleShown()
        }}>
          <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.8,width:15, height:15, borderRadius:100,}}/>
        </TouchableOpacity>
      </View>
      let addButton=<View style={{marginHorizontal:30,left:-10, top:-5,position:'absolute',zIndex:10, }}>
      <TouchableOpacity style={{padding:9}} 
        onPress={()=>{
          this.toggleShown()
      }}>
        <Image source={require("../assets/icons/addIcon.png")} style={{opacity:0.8,width:15, height:15, borderRadius:100,}}/>
      </TouchableOpacity>
    </View>
      return <View style={{opacity:this.state.enabled?1:0.5}}>
        {this.state.editMode?(this.state.enabled?removeButton:addButton):<View/>}
        {progressContainer}
      </View>
    } else {
      return <View/>
    }
  }

}

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
      setTimeout(()=>{this.animation()},0)
    }
  }
  componentDidMount(){
    setTimeout(()=>{this.animation()},0)
  }
  animation=()=>{
    var percent = this.props.percentage/100
    if(this.props.percentage===undefined){
      percent = 0
    }
    let animateToValue = 0
    animateToValue = (Dimensions.get('window').width-60) - percent*(Dimensions.get('window').width-60)
    if(getSettingsString("settingsLowEndDevice")==="true"){

    } else {
      Animated.timing(this.state.animationValue, {
        toValue: animateToValue*-1,
        useNativeDriver: true,
        duration: 1000,
        delay: this.props.delay!==undefined?this.props.delay*100:0,
      }).start();
    }
  }
  render(){
    return(
    <View style={{marginHorizontal:30}}>
      <TouchableNativeFeedback2 onPress={()=>{this.props.tapAction()}} background={(colors.inkWell[global.darkMode]+"2A", false)}>
        <View style={[styles.progressContainer,{backgroundColor:this.props.backgroundColor, overflow:"hidden"}]}>
          {getSettingsString("settingsLowEndDevice")==="true"?
          <View style={[styles.progressBar,{width:this.props.percentage.toString()+"%", backgroundColor:this.props.color}]}/>:
          <Animated.View style={[styles.progressBar,{width:"100%", backgroundColor:this.props.color, transform: [{ translateX: this.state.animationValue }]}]}/>}
          <View style={{width:"100%",height:"100%",flexDirection:"row",position:"absolute", alignItems:"center", justifyContent:"center"}}>
            <Image style={styles.image} source={this.props.image}/>
            <TextFont style={{fontSize: 18, marginLeft: 10, color:this.props.textColor}}>{this.props.text}</TextFont>
          </View>
        </View>
      </TouchableNativeFeedback2>
    </View>
    )
  }
}

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