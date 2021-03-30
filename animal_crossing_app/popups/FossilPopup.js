import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoDescription, InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import {attemptToTranslate} from "../LoadJsonData"

class FossilPopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return <>
      <View style={{width: "100%", alignItems: "center"}}>
        <InfoLine
          image={require("../assets/icons/coin.png")} 
          item={this.props.item}
          textProperty={["Sell"]}
          ending={" " + attemptToTranslate("bells")}
          translateItem={false}
        />
      </View>
      <View style={{height:15}}/>
      <InfoDescription text={this.props.item["Description"]}/>
    </>
  }
}
export default FossilPopup;