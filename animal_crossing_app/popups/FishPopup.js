import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import ActiveTime from "../components/ActiveTime";


class FishPopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <View style={{backgroundColor:colors.lightDarkAccent[colors.mode], padding: 10, paddingTop: 20, paddingBottom: 20, borderRadius: 15, margin: 20}}><Image style={{width:150,height:35,resizeMode:'contain'}} source={getPhotoShadow(this.props.item,true)}/></View>
      <InfoLineBeside
        image1={require("../assets/icons/magnifyingGlass.png")} 
        item1={this.props.item}
        textProperty1={["Shadow"]}
        image2={require("../assets/icons/coin.png")} 
        item2={this.props.item}
        textProperty2={["Sell"]}
        ending2={" bells"}
      />
      <ActiveTime item={this.props.item}/>
    </View>
  }
}
export default FishPopup;