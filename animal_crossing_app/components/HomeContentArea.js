import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import TextFont from './TextFont';
import colors from '../Colors'

class HomeContentArea extends Component {
  render(){
    return <View style={[styles.contentBackground,{backgroundColor:this.props.backgroundColor, borderColor:colors.shadow[global.darkMode]}]}>
      <View style={styles.topTitlePosition}> 
        {this.props.editOrder?<View style={{flexDirection:"row",right:-100, top:-5,position:'absolute',zIndex:100, elevation:10}}>
          <TouchableOpacity style={{padding:5}} 
            onPress={()=>{
              this.props.reorderItem(this.props.index, -1); 
          }}>
            <Image source={require("../assets/icons/upArrow.png")} style={{opacity:0.5,width:35, height:35, borderRadius:100}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:5}} 
            onPress={()=>{
              this.props.reorderItem(this.props.index, 1); 
          }}>
            <Image source={require("../assets/icons/downArrow.png")} style={{opacity:0.5,width:35, height:35, borderRadius:100}}/>
          </TouchableOpacity>
        </View>:<View/>}
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
    marginBottom: -40,
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
    fontSize:18,
    borderRadius: 100,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 7,
    paddingBottom: 7,
    elevation: 5,
  },
})