import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import ActiveTime from "../components/ActiveTime";
import AccordionContainer from "../components/AccordionContainer"

const sections = [
  {
    title: 'View critterpedia',
    image: "Critterpedia Image",
    widthSubtraction: 0.4,
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },
  {
    title: 'View furniture',
    image: "Furniture Image",
    widthSubtraction: 0.1,
    height: 150,
    marginTop: 20,
  },
];

class BugPopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <InfoLine
        image={require("../assets/icons/coin.png")} 
        item={this.props.item}
        textProperty={["Sell"]}
        ending={" bells"}
      />
      <InfoLine
        image={require("../assets/icons/weather.png")} 
        item={this.props.item}
        textProperty={["Weather"]}
      />
      <ActiveTime item={this.props.item}/>
      <AccordionContainer
        sections={sections}
        item={this.props.item}
      />
    </View>
  }
}
export default BugPopup;