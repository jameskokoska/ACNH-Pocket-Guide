import React, { Component } from "react";
import {Image, TouchableOpacity, Text, View, StyleSheet} from "react-native";
import colors from '../Colors.js';
import CachedImage from 'react-native-expo-cached-image';
import Check from './Check';
import TextFont from './TextFont'
import {commas, capitalize, checkOff, capitalizeFirst} from '../LoadJsonData'
import {getPhotoCorner, getMaterialImage} from "./GetPhoto"

export class CircularImage extends Component {
  render() {
    if(this.props.popUpCenterImage==="none"){
      return <View/>
    }
    return <View style={{width:"100%", alignItems: 'center'}}>
      <View style={[styles.rowImageBackground,{backgroundColor:this.props.accentColor, top: global.settingsCurrent[10].currentValue==="false" ? -130/2-20 : -210/2-60, height: global.settingsCurrent[10].currentValue==="false" ? 130 : 210, width: global.settingsCurrent[10].currentValue==="false" ? 130 : 210,}]}>
        <CachedImage
          style={[styles.rowImage, {height: global.settingsCurrent[10].currentValue==="false" ? 95 : 180, width: global.settingsCurrent[10].currentValue==="false" ? 95 : 180,}]}
          source={{
            uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
          }}
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
    var end = "";
    if(this.props.popUpPhraseProperty[0]==="Uses"){
      end = " durability"
    }
    return <Text style={[styles.phrase,{fontStyle: 'italic', fontFamily:'serif',color:this.props.specialLabelColor}]}>{'"'+ capitalizeFirst(this.props.item[this.props.popUpPhraseProperty[this.props.item.dataSet]]) + end +'"'}</Text>
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
      return <View style={[styles.titleContainer,{paddingLeft: paddingLeft, paddingRight: paddingRight, paddingTop: paddingTop}]}>
        <TextFont style={[styles.title,{color:colors.textBlack[global.darkMode]}]} bold={true}>
          {capitalize(this.props.item[this.props.textProperty[this.props.item.dataSet]])}
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
    var text=capitalizeFirst(commas(this.props.item[this.props.textProperty]));
    if(this.props.textProperty2 !== undefined && this.props.item[this.props.textProperty] !== this.props.item[this.props.textProperty2]){
      text+= ", " + capitalizeFirst(commas(this.props.item[this.props.textProperty2]))
    }
    if(text.toLowerCase()==="null" || text.toLowerCase()==="na"){
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
        imageSource = <CachedImage
          style={styles.infoLineImageItem}
          source={{
            uri: getMaterialImage(this.props.item[this.props.textProperty]),
          }}
        />
      }      
    }
    return <View style={[styles.infoLineBox]}>
            {imageSource}
            <TextFont adjustsFontSizeToFit={true} numberOfLines={2} bold={true} style={[styles.infoLineTitle,{color:colors.textBlack[global.darkMode]}]}>{starting + text + ending}</TextFont>
        </View>
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
      textLines.push(this.props.item[this.props.textProperty1]);
    }
    if (this.props.item[this.props.textProperty2]!=="None" && this.props.item[this.props.textProperty2]!==undefined){
      textLines.push(this.props.item[this.props.textProperty2]);
    }
    if (this.props.item[this.props.textProperty3]!=="None" && this.props.item[this.props.textProperty2]!==undefined){
      textLines.push(this.props.item[this.props.textProperty3]);
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