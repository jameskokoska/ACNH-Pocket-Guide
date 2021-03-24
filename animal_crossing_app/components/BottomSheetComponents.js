import React, { Component } from "react";
import {Dimensions, Vibration, Image, TouchableOpacity, Text, View, StyleSheet} from "react-native";
import colors from '../Colors.js';
import FastImage from './FastImage';
import Check from './Check';
import TextFont from './TextFont'
import {attemptToTranslateItem, commas, capitalize, checkOff, capitalizeFirst} from '../LoadJsonData'
import {getPhotoCorner, getMaterialImage} from "./GetPhoto"
import {getSettingsString, attemptToTranslate, attemptToTranslateSpecial} from "../LoadJsonData"
import {ScrollView} from 'react-native-gesture-handler'
import {PopupInfoCustom} from "./Popup"
import {getMonth, doWeSwapDate} from './DateFunctions'

export class CircularImage extends Component {
  render() {
    if(this.props.popUpCenterImage==="none"){
      return <View/>
    }
    return <View style={{width:"100%", alignItems: 'center'}}>
      <View style={[styles.rowImageBackground,{backgroundColor:this.props.accentColor, top: getSettingsString("settingsLargerItemPreviews")==="false" ? -130/2-20 : -210/2-60, height: getSettingsString("settingsLargerItemPreviews")==="false" ? 130 : 210, width: getSettingsString("settingsLargerItemPreviews")==="false" ? 130 : 210,}]}>
        <FastImage
          style={[styles.rowImage, {height: getSettingsString("settingsLargerItemPreviews")==="false" ? 95 : 180, width: getSettingsString("settingsLargerItemPreviews")==="false" ? 95 : 180,}]}
          source={{
            uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
          }}
          cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
        />
      </View>
    </View>
  }
}

export class LeftCornerImage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return <>
      <View style={[styles.cornerImageBackground,{backgroundColor:this.props.accentColor}]}>
        {getPhotoCorner(this.props.item[this.props.popUpCornerImageProperty[this.props.item.dataSet]])}
      </View>
      <TextFont style={[styles.cornerImageLabel,{color:colors.textLight[global.darkMode]}]}>{this.props.item[this.props.popUpCornerImageLabelProperty[this.props.item.dataSet]]}</TextFont>
    </>
  }
}

export class RightCornerCheck extends Component {
  constructor(props) {
    super(props);
    this.setCollected = this.setCollected.bind(this);
    this.state = {
      collected:props.collected
    };
  }
  //update component when new data is passed into the class, or when the check mark local value changes
  componentDidUpdate(prevProps) {
    if(this.state.collected!==this.props.collected && this.state.collected===prevProps.collected || this.props.item !== prevProps.item || this.state.collected!==prevProps.item.collected)
      this.setState({collected:this.props.collected});
  }
  setCollected(collected){
    this.setState({collected: collected});
    this.props.updateCheckChildFunction(this.state.collected==="true" ? "false":"true");
  }
  render() {
    return <TouchableOpacity style={[styles.checkMark]} 
              activeOpacity={0.6}
              onPress={() => {  
                checkOff(this.props.item, this.state.collected, this.props.dataGlobalName);
                this.setCollected(this.state.collected==="true" ? "false":"true");
            }}>
      <Check checkType={this.props.checkType} fadeOut={false} play={this.state.collected==="true"} width={135} height={135}/>
    </TouchableOpacity>
  }
}

export class Phrase extends Component {
  render() {
    if(this.props.popUpPhraseProperty[this.props.item.dataSet]===""){
      return <View/>
    }
    var text = this.props.item[this.props.popUpPhraseProperty[this.props.item.dataSet]];
    if(this.props.popUpPhraseProperty[this.props.item.dataSet]==="Catchphrase"){
      text = capitalizeFirst(attemptToTranslateSpecial(text, "catchphrase"));
    } else {
      text = capitalizeFirst(text);
    }

    var end = "";
    if(this.props.popUpPhraseProperty[this.props.item.dataSet]==="Uses"){
      end = " " + attemptToTranslate("durability");
      if(text==="NA"){
        text= "No ";
      }
    } else if(this.props.popUpPhraseProperty[this.props.item.dataSet]==="Stack Size"){
      end = " " + attemptToTranslate("stack size")
    }
    
    return <Text style={[styles.phrase,{fontStyle: 'italic', fontFamily:'serif',color:this.props.specialLabelColor}]}>{'"'+ text + end +'"'}</Text>
  }
}

export class Title extends Component {
  render() {
    var paddingLeft = 70;
    var paddingRight = 70;
    var paddingTop = 25;
    if(this.props.popUpPhraseProperty!==undefined){
      paddingLeft = 10;
      paddingRight = 10;
      paddingTop = 10;
    }
    if(this.props.item[this.props.textProperty[this.props.item.dataSet]]!==undefined){
      var label = attemptToTranslateItem(this.props.item[this.props.textProperty[this.props.item.dataSet]])
      return <View style={[styles.titleContainer,{paddingLeft: paddingLeft, paddingRight: paddingRight, paddingTop: paddingTop}]}>
        <TextFont style={[styles.title,{color:colors.textBlack[global.darkMode]}]} bold={true}>
          {capitalize(label)}
        </TextFont>
      </View>
    } else {
      return <View/>;
    }
  }
}

export class InfoLine extends Component {
  render() {
    var ending = "";
    if(this.props.ending!==undefined){
      ending=this.props.ending;
    }
    var starting = "";
    if(this.props.starting!==undefined){
      starting=this.props.starting;
    }
    var text1 = attemptToTranslateSpecial(this.props.item[this.props.textProperty], "variants");
    var text2 = attemptToTranslateSpecial(this.props.item[this.props.textProperty2], "variants");
    var text = capitalizeFirst(commas(text1));
    if(this.props.textProperty2 !== undefined && this.props.item[this.props.textProperty] !== this.props.item[this.props.textProperty2]){
      text+= ", " + capitalizeFirst(commas(text2))
    }
    if(text.toLowerCase()==="null" || text.toLowerCase()==="na"){
      return <View/>
    }
    if(text==="None"){
      return <View/>
    }
    var imageSource = <Image style={styles.infoLineImage} source={this.props.image}/>;
    if(this.props.item[this.props.ending]!== undefined && this.props.ending==="Exchange Currency" && text.toLowerCase()!=="nfs"){
      if(this.props.item[this.props.ending].toLowerCase().includes("miles")){
        ending= " miles"
        imageSource = <Image style={styles.infoLineImage} source={require("../assets/icons/miles.png")}/>;
      } else {
        ending = " bells";
      }
    } else if(text.toLowerCase()==="nfs"){
      ending="";
    } else if (this.props.ending==="Exchange Currency"){
      ending = " bells"
    }
    if(this.props.textProperty.includes("Material")){
      imageSource =  getMaterialImage(this.props.item[this.props.textProperty]);
      if(imageSource === ""){
        imageSource = <Image style={styles.infoLineImage} source={require("../assets/icons/leaf.png")}/>;
      } else {
        imageSource = <FastImage
          style={styles.infoLineImageItem}
          source={{
            uri: getMaterialImage(this.props.item[this.props.textProperty]),
          }}
          cacheKey={getMaterialImage(this.props.item[this.props.textProperty])}
        />
      }      
    }
    if(this.props.birthday){
      
      var textSplit = this.props.item[this.props.textProperty].split("/")
      text = doWeSwapDate()===true ? textSplit[1] + " " + attemptToTranslate(getMonth(textSplit[0]-1)) : attemptToTranslate(getMonth(textSplit[0]-1)) + " " + textSplit[1]
    }
    var colors1 = <View/>
    var colors2 = <View/>
    if(this.props.textProperty[0]==="Color 1"&&this.props.textProperty2[0]==="Color 2"){
      var color1 = this.props.item[this.props.textProperty[0]];
      var color2 = this.props.item[this.props.textProperty2[0]];
      if(color1!==color2){
        colors2 = <ColorContainer color={color2}/>
      }
      colors1 = <ColorContainer color={color1}/>
      
    }
    if(this.props.translateItem){
      text = attemptToTranslateItem(text.toLowerCase())
      text=capitalize(text)
    }
    return <View style={[styles.infoLineBox]}>
            {imageSource}
            <TextFont adjustsFontSizeToFit={true} bold={true} style={[styles.infoLineTitle,{color:colors.textBlack[global.darkMode]}]}>{starting + text + ending}</TextFont>
            {colors1}{colors2}
        </View>
  }
}

class ColorContainer extends Component {
  render() {
    if(this.props.color!==undefined && this.props.color!=="None" && this.props.color!=="Colorful"){
      var opacity = "AA"
      return(
        <View style={{borderWidth: 1.5, borderColor: colors.lightDarkAccentHeavy[global.darkMode], marginLeft: 8, backgroundColor: colors["itemBox"+this.props.color+"Display"][global.darkMode]+opacity, height:30, width:30, borderRadius:40, }}>
        </View>
      )
    } else {
      return (<View/>)
    }
  }
}

export class InfoLineDouble extends Component {
  render() {
    return <View style={[styles.infoLineBox,{marginLeft: 40, marginRight: 40,}]}>
            <Image style={styles.infoLineImage} source={this.props.image}/>
            <View>
              <TextFont bold={true} style={[styles.infoLineTitleDouble,{color:colors.textBlack[global.darkMode]}]}>{capitalizeFirst(this.props.item[this.props.textProperty1])}</TextFont>
              <TextFont bold={true} style={[styles.infoLineTitleDouble,{color:colors.textBlack[global.darkMode]}]}>{capitalizeFirst(this.props.item[this.props.textProperty2])}</TextFont>
            </View>
        </View>
  }
}

export class InfoLineTriple extends Component {
  render() {
    var textLines = [];
    if(this.props.item[this.props.textProperty1]!=="None" && this.props.item[this.props.textProperty2]!==undefined){
      textLines.push(attemptToTranslateSpecial(this.props.item[this.props.textProperty1], "variants"));
    }
    if (this.props.item[this.props.textProperty2]!=="None" && this.props.item[this.props.textProperty2]!==undefined){
      textLines.push(attemptToTranslateSpecial(this.props.item[this.props.textProperty2], "variants"));
    }
    if (this.props.item[this.props.textProperty3]!=="None" && this.props.item[this.props.textProperty2]!==undefined){
      textLines.push(attemptToTranslateSpecial(this.props.item[this.props.textProperty3], "variants"));
    }
    if(textLines.length===0){
      return <View/>
    } else if(textLines.length===3){
      return <View style={[styles.infoLineBox]}>
            <Image style={styles.infoLineImage} source={this.props.image}/>
            <View>
              <TextFont bold={true} style={[styles.infoLineTitleTriple,{color:colors.textBlack[global.darkMode]}]}>{capitalizeFirst(textLines[0])}</TextFont>
              <TextFont bold={true} style={[styles.infoLineTitleTriple,{color:colors.textBlack[global.darkMode]}]}>{capitalizeFirst(textLines[1])}</TextFont>
              <TextFont bold={true} style={[styles.infoLineTitleTriple,{color:colors.textBlack[global.darkMode]}]}>{capitalizeFirst(textLines[2])}</TextFont>
            </View>
        </View>
    } else if (textLines.length===2){
      return <View style={[styles.infoLineBox]}>
            <Image style={styles.infoLineImage} source={this.props.image}/>
            <View>
              <TextFont bold={true} style={[styles.infoLineTitleDouble,{color:colors.textBlack[global.darkMode]}]}>{capitalizeFirst(textLines[0])}</TextFont>
              <TextFont bold={true} style={[styles.infoLineTitleDouble,{color:colors.textBlack[global.darkMode]}]}>{capitalizeFirst(textLines[1])}</TextFont>
            </View>
        </View>
    } else {
      return <View style={[styles.infoLineBox]}>
            <Image style={styles.infoLineImage} source={this.props.image}/>
              <TextFont adjustsFontSizeToFit={true} numberOfLines={2} bold={true} style={[styles.infoLineTitle,{color:colors.textBlack[global.darkMode]}]}>{capitalizeFirst(textLines[0])}</TextFont>
        </View>

    }
    
  }
}

export class Variations extends Component {
  
  render(){
    if(this.props.item!=""||this.props.item!=undefined){
      var variations = getVariations(this.props.item["Name"],this.props.globalDatabase,this.props.item["checkListKey"]);
      if(variations.length<=1){
        return <View/>
      }
      var imageProperty = this.props.imageProperty;
      var dataSet = this.props.item.dataSet;
      return(
        <>
        <ScrollView horizontal={true} style={{marginHorizontal:10}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}>
        <View style={{marginHorizontal: 4, flexDirection: 'row', justifyContent:'center'}}>
          {variations.map( (item, index)=>
            <VariationItem index={index} key={item[this.props.imageProperty[dataSet]]} globalDatabase={this.props.globalDatabase} item={item} setPopupVisible={(state, image, item)=>this.popup.setPopupVisible(state, image, item)} dataSet={dataSet} imageProperty={imageProperty}/>
          )}
        </View>
        </ScrollView>
        <PopupImage ref={(popup) => this.popup = popup}/>
        </>
      )
    } else {
      return <View/>
    }
    
  }
}

class VariationItem extends Component{
  constructor(props) {
    super(props);
    this.extraIndex = this.props.index===0 ? "0":"";
    this.state = {
      checked: global.collectionList.includes(this.props.item["checkListKey"]+this.extraIndex),
    }
  }
  render(){
    
    var item=this.props.item;
    var dataSet=this.props.dataSet;
    return(
      <TouchableOpacity 
        onLongPress={()=>{this.props.setPopupVisible(true, item[this.props.imageProperty[dataSet]], item); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : ""}}
        onPress={()=>{checkOff(item, this.state.checked, this.props.globalDatabase, getSettingsString("settingsEnableVibrations")==="true", false, this.extraIndex); this.setState({checked: !this.state.checked})}}
      >
        <View style={[{borderWidth: 2, borderColor: this.state.checked ? colors.checkGreen[global.darkMode] : colors.eventBackground[global.darkMode], marginHorizontal:4, marginVertical: 3, width: 60,height: 60,borderRadius: 100,justifyContent: "center",alignItems: "center",backgroundColor:colors.lightDarkAccent[global.darkMode]}]}>
          <FastImage
            style={{height: 47, width: 47, resizeMode:'contain',}}
            source={{
              uri: item[this.props.imageProperty[dataSet]],
            }}
            cacheKey={item[this.props.imageProperty[dataSet]]}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

class PopupImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item:"",
    }; 
  }

  setPopupVisible = (visible, image, item) => {
    this.setState({image:image, item:item});
    this.popup.setPopupVisible(true);
  }

  render(){
    return(
      <PopupInfoCustom ref={(popup) => this.popup = popup} buttonText={"Close"}>
        <View style={{alignItems:"center"}}>
          <FastImage
            style={{width:Dimensions.get('window').width*0.5,height:Dimensions.get('window').width*0.5,resizeMode:'contain',}}
            source={{
              uri: this.state.image,
            }}
            cacheKey={this.state.image}
          />
          <InfoLine
            image={require("../assets/icons/colorPalette.png")} 
            item={this.state.item}
            textProperty={["Color 1"]}
            textProperty2={["Color 2"]}
          />
          <InfoLineBeside
            image1={require("../assets/icons/pattern.png")} 
            item1={this.state.item}
            textProperty1={["Variation"]}
            image2={require("../assets/icons/diyKit.png")} 
            item2={this.state.item}
            textProperty2={["Kit Cost"]}
            ending2={"x"}
          />
        </View>
      </PopupInfoCustom>
    )
  }
}

export function getVariations(name, globalDatabase, checkListKey){
  var totalVariations = [];
  for(var i=0; i<globalDatabase.length; i++){
    for(var j=0; j<globalDatabase[i].length; j++){
      if(globalDatabase[i][j]["checkListKey"].split("CheckList")[0]!==checkListKey.split("CheckList")[0]){
        break;
      }
      if(globalDatabase[i][j]["Name"].toLowerCase()===name.toLowerCase()){
        totalVariations.push(globalDatabase[i][j]);
      }
    }
  }
  return totalVariations;
}

export class InfoLineBeside extends Component {
  render() {
    return <View style={[styles.infoLineBoxBeside]}>
              <InfoLine 
                image={this.props.image1} 
                item={this.props.item1}
                textProperty={this.props.textProperty1}
                textProperty2={this.props.textProperty12}
                ending={this.props.ending1}
              />
              <InfoLine
                image={this.props.image2} 
                item={this.props.item2}
                textProperty={this.props.textProperty2}
                textProperty2={this.props.textProperty22}
                ending={this.props.ending2}
              />
        </View>
  }
}

const styles = StyleSheet.create({
  infoLineImage:{
    width: 30,
    height: 30,
    resizeMode:'contain',
  },
  infoLineImageItem:{
    width: 40,
    height: 40,
    margin: -5,
    resizeMode:'contain',
  },
  infoLineTitle:{
    fontSize: 20,
    marginLeft: 8,
    maxWidth: "85%",
  },
  infoLineTitleDouble:{
    fontSize: 17,
    marginLeft: 8,
  },
  infoLineTitleTriple:{
    fontSize: 14,
    marginLeft: 8,
  },
  infoLineBoxBeside: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
  },
  infoLineBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  phrase:{
    fontSize: 16,
    textAlign: "center",
    paddingLeft: 85,
    paddingRight: 85,
    padding: 5,
  },
  titleContainer:{
    width:"100%",
    padding: 5,
    paddingBottom: 10,
    alignItems: "center",
  },
  title:{
    fontSize: 30,
    textAlign: "center",
  },
  rowImageBackground:{
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:50,
    elevation: 5,
    position:"absolute",
  },
  rowImage:{
    resizeMode:'contain',
  },
  cornerImageLabel:{
    position: "absolute",
    top: 90,
    width: 101,
    textAlign:"center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  cornerImageBackground:{
    width: 75,
    height: 75,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -130/2,
    zIndex:50,
    margin: 30,
    position: "absolute",
    top:-15,
    left:-15,
  },
  checkMark:{
    zIndex:50,
    position: "absolute",
    top:-15,
    right:-15,
  }
})