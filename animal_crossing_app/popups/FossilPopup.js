import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoDescription, InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title, SizeInfo} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"
import {attemptToTranslate} from "../LoadJsonData"
import PopupSeparator from './PopupSeparator';

class FossilPopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <PopupSeparator>
        <InfoLine
          image={require("../assets/icons/coin.png")} 
          item={this.props.item}
          textProperty={["Sell"]}
          ending={" " + attemptToTranslate("bells")}
          translateItem={false}
        />
      </PopupSeparator>
      <InfoDescription text={this.props.item["Description"]} type="Fossil" id={this.props.item["Internal ID"]}/>
      <PopupSeparator>
        <InfoLine
          image={require("../assets/icons/colorPalette.png")} 
          item={this.props.item}
          textProperty={["Color 1"]}
          textProperty2={["Color 2"]}
        />
        <View style={{alignItems: 'center',justifyContent: 'center',flexDirection:"row",flexWrap:"wrap"}}>
          <InfoLineTriple
            image={require("../assets/icons/house.png")} 
            item={this.props.item}
            textProperty1={"HHA Series"}
            textProperty2={"HHA Concept 1"}
            textProperty3={"HHA Concept 2"}
          />
          <SizeInfo size={this.props.item["Size"]}/>
        </View>
        <InfoLine
          image={require("../assets/icons/scroll.png")} 
          item={this.props.item}
          textProperty={["Data Category"]}
        />
        <InfoLine
          image={require("../assets/icons/tag.png")} 
          item={this.props.item}
          textProperty={["Tag"]}
        />
      </PopupSeparator>
    </View>
  }
}
export default FossilPopup;