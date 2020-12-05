import React, {Component, useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  Vibration,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextFont from './TextFont';
import Check from './Check';
import CachedImage from 'react-native-expo-cached-image';
import {updateDataGlobal, determineDataGlobal} from "../LoadJsonData"

const {width} = Dimensions.get('window');

class ListItem extends Component{
  constructor(props) {
    super(props);
    this.setCollected = this.setCollected.bind(this);
    this.state = {
      collected: props.item.collected,
    }
  }
  setCollected(collected){
    this.setState({collected: collected})
  }
  componentWillUnmount(){
    this.setState({unMounting:true})
  }
  render(){
    if(this.state.collected!==this.props.item.collected){
      this.setCollected(this.props.item.collected)
    }
    if(this.props.gridType==="smallGrid"){
      return (
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            longPress(this.props.item.checkListKey, this.state.collected, this.props.item.index, this.props.dataGlobalName); 
            this.setCollected(this.state.collected==="true" ? "false":"true");
          }}
            background={TouchableNativeFeedback.Ripple(this.props.accentColor, false)}
          >
            <View style={[styles.gridBox, {backgroundColor:this.props.boxColor}]}>
              <Check style={{position:'absolute', right: -9, top: -9, zIndex:10}} play={this.state.collected==="true"} width={53} height={53}/>
              <CachedImage
                style={styles.gridBoxImage}
                source={{
                  uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                }}
              />
              <View style={styles.gridBoxText}>
                <TextFont bold={false} style={{textAlign:'center', color:this.props.labelColor}}>{capitalize(this.props.item.[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    } else if (this.props.gridType==="largeGrid"){
      return( 
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            longPress(this.props.item.checkListKey, this.state.collected, this.props.item.index, this.props.dataGlobalName); 
            this.setCollected(this.state.collected==="true" ? "false":"true");
          }}
          background={TouchableNativeFeedback.Ripple(this.props.accentColor, false)}
          >
            <View style={[styles.gridBoxLarge, {backgroundColor:this.props.boxColor}]}>
              <Check style={{position:'absolute', right: -8, top: -10, zIndex:10}} play={this.state.collected==="true"} width={53} height={53}/>
              <CachedImage
                style={styles.gridBoxImageLarge}
                source={{
                  uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                }}
              />
              <View style={styles.gridBoxTextLarge}>
                <TextFont bold={false} style={{textAlign:'center', color:this.props.labelColor}}>{capitalize(this.props.item.[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    } else { //Row component
      return( 
        <View>
          <TouchableNativeFeedback onLongPress={() => {  
            console.log(this.props.item)
            longPress(this.props.item.checkListKey, this.state.collected, this.props.item.index, this.props.dataGlobalName); 
            this.setCollected(this.state.collected==="true" ? "false":"true");
          }}
          background={TouchableNativeFeedback.Ripple(this.props.accentColor, false)}
          >
            <View style={[styles.row,{backgroundColor:this.props.boxColor}]}>
              <View style={[styles.rowImageBackground,{backgroundColor:this.props.accentColor}]}>
                <CachedImage
                  style={styles.rowImage}
                  source={{
                    uri: this.props.item.[this.props.imageProperty[this.props.item.dataSet]],
                  }}
                />
              </View>
              <View style={styles.rowTextContainer}>
                <View style={styles.rowTextTop}>
                  <TextFont bold={true} style={{fontSize:20, color:this.props.labelColor}}>{capitalize(this.props.item.[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
                </View>
                <View style={styles.rowTextBottom}>
                  <TextFont bold={true} style={{fontSize:16, color:this.props.specialLabelColor}}>{capitalize(this.props.item.[this.props.textProperty2[this.props.item.dataSet]])}</TextFont>
                </View>
                <View style={styles.rowTextBottom}>
                  <TextFont bold={true} style={{fontSize:16, color:this.props.specialLabelColor}}>{capitalize(this.props.item.[this.props.textProperty3[this.props.item.dataSet]])}</TextFont>
                </View>
              </View>
              <TouchableOpacity style={{position:"absolute", right: -5}} 
                onPress={() => {  
                longPress(this.props.item.checkListKey, this.state.collected, this.props.item.index, this.props.dataGlobalName ); 
                this.setCollected(this.state.collected==="true" ? "false":"true");
              }}>
                <Check fadeOut={false} play={this.state.collected==="true"} width={90} height={90}/>
              </TouchableOpacity>
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    }
  }
};

export default ListItem;

const styles = StyleSheet.create({
  rowTextBottom:{
    width: "100%",
    paddingLeft: 4,
    paddingRight: 3,
    marginTop: 1,
  },
  rowTextTop:{
    width: "100%",
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 2
  },
  rowTextContainer:{
    margin:6,
    marginLeft: 10,
    marginRight: 125,
  },
  rowImageBackground:{
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  rowImage:{
    height: 70,
    width: 70,
    resizeMode:'contain',
  },
  row: {
    padding: 13,
    alignItems: 'center',
    flexDirection:"row",
    height: 88,
    width: "100%",
    borderRadius:10,
    elevation: 2,
    marginTop: 7,
  },
  gridBoxText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    paddingLeft: 3,
    paddingRight: 3
  },
  gridBoxTextLarge: {
    flex: 1,
    width: 130,
    marginTop: 5,
    paddingLeft: 3,
    paddingRight: 3
  },
  gridWrapper: {
    marginVertical: 3, 
    alignItems: 'center', 
    flex: 1,
  },
  gridBoxImage: {
    height: 90,
    width: 90,
    borderRadius:5,
    marginTop: 10,
    resizeMode:'contain',
  },
  gridBoxImageLarge: {
    height: 150,
    width: 150,
    borderRadius:5,
    marginTop: 15,
    resizeMode:'contain',
  },
  gridBox: {
    alignItems: "center",
    height: 150,
    width: 115,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 2,
  },
  gridBoxLarge: {
    alignItems: "center",
    height: 200,
    width: 180,
    borderRadius:10,
    elevation: 4,
    margin: 2,
  },
});


function capitalize(name) {
  return name.replace(/\b(\w)/g, s => s.toUpperCase());
}

function longPress(checkListKeyString, collected, index, dataGlobalName){
  if(collected==="false"){
    Vibration.vibrate([0,10,220,20]);
  } else {
    Vibration.vibrate(10);
  }
  AsyncStorage.setItem(checkListKeyString, collected==="false" ? "true":"false");
  updateDataGlobal(dataGlobalName, index, collected==="false" ? "true":"false")
  console.log(checkListKeyString);
  console.log(determineDataGlobal(dataGlobalName)[index])
  console.log(collected);
}