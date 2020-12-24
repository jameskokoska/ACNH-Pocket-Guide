import React, { Component } from "react";
import {Image, TouchableOpacity, Text, View, StyleSheet} from "react-native";
import colors from '../Colors.js';
import CachedImage from 'react-native-expo-cached-image';
import Check from './Check';
import TextFont from './TextFont'
import {commas, capitalize, checkOff, capitalizeFirst} from '../LoadJsonData'
import {getPhotoCorner} from "./GetPhoto"

export class CircularImage extends Component {
  render() {
    return <View style={{width:"100%", alignItems: 'center'}}>
      <View style={[styles.rowImageBackground,{backgroundColor:this.props.accentColor}]}>
        <CachedImage
          style={styles.rowImage}
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
      <TextFont style={[styles.cornerImageLabel,{color:colors.textLight[colors.mode]}]}>{this.props.item[this.props.popUpCornerImageLabelProperty[this.props.item.dataSet]]}</TextFont>
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
    return <Text style={[styles.phrase,{fontStyle: 'italic', fontFamily:'serif',color:this.props.specialLabelColor}]}>{'"'+ capitalizeFirst(this.props.item[this.props.popUpPhraseProperty[this.props.item.dataSet]]) + '"'}</Text>
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
        <TextFont style={[styles.title,{color:colors.textBlack[colors.mode]}]} bold={true}>
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
    var text=capitalizeFirst(commas(this.props.item[this.props.textProperty[this.props.item.dataSet]]));
    if(this.props.textProperty2 !== undefined && this.props.item[this.props.textProperty[this.props.item.dataSet]] !== this.props.item[this.props.textProperty2[this.props.item.dataSet]]){
      text+= ", " + capitalizeFirst(commas(this.props.item[this.props.textProperty2[this.props.item.dataSet]]))
    }
    var marginLeft = 40;
    var marginRight = 40;
    if(this.props.beside===true){
      marginLeft=0;
      marginRight=0;
    }
    return <View style={[styles.infoLineBox,{marginLeft: marginLeft, marginRight: marginRight,}]}>
            <Image style={styles.infoLineImage} source={this.props.image}/>
            <TextFont bold={true} style={[styles.infoLineTitle,{color:colors.textBlack[colors.mode]}]}>{text + ending}</TextFont>
        </View>
  }
}

export class InfoLineDouble extends Component {
  render() {
    return <View style={[styles.infoLineBox,{marginLeft: 40, marginRight: 40,}]}>
            <Image style={styles.infoLineImage} source={this.props.image}/>
            <View>
              <TextFont bold={true} style={[styles.infoLineTitleDouble,{color:colors.textBlack[colors.mode]}]}>{capitalizeFirst(this.props.item[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
              <TextFont bold={true} style={[styles.infoLineTitleDouble,{color:colors.textBlack[colors.mode]}]}>{capitalizeFirst(this.props.item[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
            </View>
        </View>
  }
}

export class InfoLineTriple extends Component {
  render() {
    return <View style={[styles.infoLineBox,{marginLeft: 40, marginRight: 40,}]}>
            <Image style={styles.infoLineImage} source={this.props.image}/>
            <View>
              <TextFont bold={true} style={[styles.infoLineTitleTriple,{color:colors.textBlack[colors.mode]}]}>{capitalizeFirst(this.props.item[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
              <TextFont bold={true} style={[styles.infoLineTitleTriple,{color:colors.textBlack[colors.mode]}]}>{capitalizeFirst(this.props.item[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
              <TextFont bold={true} style={[styles.infoLineTitleTriple,{color:colors.textBlack[colors.mode]}]}>{capitalizeFirst(this.props.item[this.props.textProperty[this.props.item.dataSet]])}</TextFont>
            </View>
        </View>
  }
}

export class InfoLineBeside extends Component {
  render() {
    return <View style={[styles.infoLineBox]}>
            <View style={{paddingRight:10}}>
              <InfoLine 
                image={this.props.image1} 
                item={this.props.item1}
                textProperty={this.props.textProperty1}
                textProperty2={this.props.textProperty12}
                ending={this.props.ending1}
                beside={true}
              />
            </View>
            <View style={{paddingLeft:10}}>
              <InfoLine
                image={this.props.image2} 
                item={this.props.item2}
                textProperty={this.props.textProperty2}
                textProperty2={this.props.textProperty22}
                ending={this.props.ending2}
                beside={true}
              />
            </View>
        </View>
  }
}

const styles = StyleSheet.create({
  infoLineImage:{
    width: 30,
    height: 30,
    resizeMode:'contain',
  },
  infoLineTitle:{
    fontSize: 20,
    marginLeft: 8,
  },
  infoLineTitleDouble:{
    fontSize: 17,
    marginLeft: 8,
  },
  infoLineTitleTriple:{
    fontSize: 14,
    marginLeft: 8,
  },
  infoLineBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
    height: 54,
    borderRadius:14,
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
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:50,
    elevation: 5,
    position:"absolute",
    top: -130/2-20,
    height: 130,
    width: 130,
  },
  rowImage:{
    height: 95,
    width: 95,
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