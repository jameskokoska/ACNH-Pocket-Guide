import React, {Component} from 'react';
import {View} from 'react-native';
import {SizeInfo, InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import {determineCustomizationString, findObject} from "../LoadJsonData"
import ViewRecipeButton from './ViewRecipeComponent';
import colors from '../Colors';
import PopupSeparator from './PopupSeparator';

class FurniturePopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    var dummyItem = {"Customization String":determineCustomizationString(this.props.item)}
    var customizationStringComponent = <View/>
    if(dummyItem["Customization String"]!=="")
      customizationStringComponent = <InfoLine
        image={require("../assets/icons/bags.png")} 
        item={dummyItem}
        textProperty={["Customization String"]}
      />
    return <View style={{width: "100%", alignItems: "center"}}>
      <PopupSeparator>
        <InfoLineBeside
          image1={require("../assets/icons/bellBag.png")} 
          image2={require("../assets/icons/coin.png")} 
          item1={this.props.item}
          item2={this.props.item}
          textProperty1={["Buy"]}
          textProperty2={["Sell"]}
          ending1={"Exchange Currency"}
          ending2={"Exchange Currency"}
          translateItem={false}
        />
        <InfoLine
          image={require("../assets/icons/colorPalette.png")} 
          item={this.props.item}
          textProperty={["Exchange Currency"]}
          poki={true}
        />
      </PopupSeparator>
      <PopupSeparator>
        <InfoLine
          image={require("../assets/icons/popper.png")} 
          item={this.props.item}
          textProperty={["Season/Event"]}
        />
        <InfoLine
          image={require("../assets/icons/magnifyingGlass.png")} 
          item={this.props.item}
          textProperty={["Source"]}
        />
        <InfoLine
          image={require("../assets/icons/notes.png")} 
          item={this.props.item}
          textProperty={["Source Notes"]}
        />
        <ViewRecipeButton item={this.props.item}/>
      </PopupSeparator>
      <PopupSeparator>
        <InfoLine
          image={require("../assets/icons/colorPalette.png")} 
          item={this.props.item}
          textProperty={["Color 1"]}
          textProperty2={["Color 2"]}
        />
        <InfoLine
          image={require("../assets/icons/pattern.png")} 
          item={this.props.item}
          textProperty={["Variation"]}
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
      <PopupSeparator>
        <InfoLineBeside
          image1={require("../assets/icons/diyKit.png")} 
          item1={this.props.item}
          textProperty1={["Kit Cost"]}
          ending1={"x"}
          image2={require("../assets/icons/cyrus.png")} 
          item2={this.props.item}
          textProperty2={["Cyrus Customize Price"]}
          ending2={"Exchange Currency"}
        />
        {customizationStringComponent}
      </PopupSeparator>
    </View>
  }
}
export default FurniturePopup;