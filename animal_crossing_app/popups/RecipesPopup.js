import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPhotoShadow} from "../components/GetPhoto"


class RecipesPopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <InfoLineBeside
        image1={require("../assets/icons/bellBag.png")} 
        image2={require("../assets/icons/coin.png")} 
        item1={this.props.item}
        item2={this.props.item}
        textProperty1={["Buy"]}
        textProperty2={["Sell"]}
        ending1={"Exchange Currency"}
        ending2={"Exchange Currency"}
      />
      <InfoLine
        image={require("../assets/icons/popper.png")} 
        item={this.props.item}
        textProperty={["Season/Event"]}
      />
      <InfoLine
        image={require("../assets/icons/leaf.png")} 
        item={this.props.item}
        textProperty={"Material 1"}
        starting={this.props.item["#1"]+ "x "}
      />
      <InfoLine
        image={require("../assets/icons/leaf.png")} 
        item={this.props.item}
        textProperty={"Material 2"}
        starting={this.props.item["#2"]+ "x "}
      />
      <InfoLine
        image={require("../assets/icons/leaf.png")} 
        item={this.props.item}
        textProperty={"Material 3"}
        starting={this.props.item["#3"]+ "x "}
      />
      <InfoLine
        image={require("../assets/icons/leaf.png")} 
        item={this.props.item}
        textProperty={"Material 4"}
        starting={this.props.item["#4"]+ "x "}
      />
      <InfoLine
        image={require("../assets/icons/leaf.png")} 
        item={this.props.item}
        textProperty={"Material 5"}
        starting={this.props.item["#5"]+ "x "}
      />
      <InfoLine
        image={require("../assets/icons/leaf.png")} 
        item={this.props.item}
        textProperty={"Material 6"}
        starting={this.props.item["#6"]+ "x "}
      />
      <InfoLine
        image={require("../assets/icons/leaf.png")} 
        item={this.props.item}
        textProperty={"Material 7"}
        starting={this.props.item["#7"]+ "x "}
      />
      <InfoLine
        image={require("../assets/icons/leaf.png")} 
        item={this.props.item}
        textProperty={"Material 8"}
        starting={this.props.item["#8"]+ "x "}
      />
      <InfoLine
        image={require("../assets/icons/leaf.png")} 
        item={this.props.item}
        textProperty={"Material 9"}
        starting={this.props.item["#9"]+ "x "}
      />
      <InfoLine
        image={require("../assets/icons/leaf.png")} 
        item={this.props.item}
        textProperty={"Material 10"}
        starting={this.props.item["#10"]+ "x "}
      />
    </View>
  }
}
export default RecipesPopup;