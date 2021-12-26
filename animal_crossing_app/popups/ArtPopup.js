import * as Font from 'expo-font';
import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, View, Text} from 'react-native';
import {InfoLinePlain, InfoDescription, InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from '../components/BottomSheetComponents';
import colors from "../Colors"
import {getPaintingPhotoFake} from "../components/GetPhoto"
import {commas, capitalize} from '../LoadJsonData'
import FastImage from '../components/FastImage';
import TextFont from '../components/TextFont'
import {attemptToTranslate, getArtIdentification} from "../LoadJsonData"
import {PopupInfoCustom} from "../components/Popup"
import ImageZoom from 'react-native-image-pan-zoom';

class ArtPopup extends Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render(){
    var paintingComparisonReal = <FastImage
      style={styles.comparisonImage}
      source={{uri: this.props.item["Image"],}}
      cacheKey={this.props.item["Image"]}
    />
    if(this.props.item["High-Res Texture"]!=="NA"){
      paintingComparisonReal = <FastImage
        style={styles.comparisonImage}
        source={{uri: this.props.item["High-Res Texture"],}}
        cacheKey={this.props.item["High-Res Texture"]}
      />
    }
    var paintingComparisonRealLabel = <TextFont style={{paddingBottom: 20, fontSize:20, color: colors.textBlack[global.darkMode]}}>^ Real ^</TextFont>
    var paintingComparisonFake = <View/>
    var paintingComparisonFakeLabel = <TextFont style={{paddingBottom: 20, fontSize:20, color: colors.textBlack[global.darkMode]}}>There is no fake version</TextFont>
    
    var paintingFake = getPaintingPhotoFake(this.props.item["Name"]);
    if(paintingFake!=="none" ){
      paintingComparisonFake = <FastImage
        style={styles.comparisonImage}
        source={{uri: paintingFake}}
        cacheKey={paintingFake}
      />
      paintingComparisonFakeLabel = <TextFont style={{paddingBottom: 20, fontSize:20, color: colors.textBlack[global.darkMode]}}>^ Fake ^</TextFont>
    }
    
    return <>
      <View style={{width: "100%", alignItems: "center"}}>
        <InfoLinePlain
          item={this.props.item}
          textProperty={["Real Artwork Title"]}
        />
        <InfoLine
          image={require("../assets/icons/coin.png")} 
          item={this.props.item}
          textProperty={["Sell"]}
          ending={" " + attemptToTranslate("bells")}
        />
        <InfoLine
          image={require("../assets/icons/bellBag.png")} 
          item={this.props.item}
          textProperty={["Buy"]}
          ending={" " + attemptToTranslate("bells")}
        />
        <InfoLine
          image={require("../assets/icons/colorPalette.png")} 
          item={this.props.item}
          textProperty={["Color 1"]}
          textProperty2={["Color 2"]}
        />
        <View style={{height: 20}}/>
        
        <TouchableOpacity activeOpacity={0.5} style={{width:"100%"}} onPress={()=>{this.popupReal.setPopupVisible(true)}}>
          {paintingComparisonReal}
        </TouchableOpacity>        
        {paintingComparisonRealLabel}
        <TouchableOpacity activeOpacity={0.5} style={{width:"100%"}} onPress={()=>{this.popupFake.setPopupVisible(true)}}>
          {paintingComparisonFake}
        </TouchableOpacity>  
        {paintingComparisonFakeLabel}
        <TextFont style={{fontSize: 18, textAlign:"center", marginHorizontal: 20, color:colors.textBlack[global.darkMode]}}>{getArtIdentification(this.props.item["Name"])}</TextFont>
        <View style={{height: 20}}/>
        <InfoDescription text={this.props.item["Description"]}/>
      </View>
      <PopupInfoCustom style={{padding:0, margin:0, paddingVertical:20}} ref={(popupReal) => this.popupReal = popupReal} buttonText={"Close"}>
          <View style={{backgroundColor:"white", padding:8, borderRadius:50, position:"absolute", backgroundColor:"white",top:0,right:10,}}>
            <Image source={require("../assets/icons/zoomInPinch.png")} style={{width:30,height:30, resizeMode:"contain"}}/>
          </View>
          <ImageZoom cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height/2+Dimensions.get('window').height*0.1}
          >
            {paintingComparisonReal}
          </ImageZoom>
      </PopupInfoCustom>
      <PopupInfoCustom style={{padding:0, margin:0, paddingVertical:20}} ref={(popupFake) => this.popupFake = popupFake} buttonText={"Close"}>
          <View style={{backgroundColor:"white", padding:8, borderRadius:50, position:"absolute", backgroundColor:"white",top:0,right:10,}}>
            <Image source={require("../assets/icons/zoomInPinch.png")} style={{width:30,height:30, resizeMode:"contain"}}/>
          </View>
          <ImageZoom cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height/2+Dimensions.get('window').height*0.1}
          >
            {paintingComparisonFake}
          </ImageZoom>
      </PopupInfoCustom>
      </>
  }
}
export default ArtPopup;

const styles = StyleSheet.create({
  comparisonImage:{
    width: "100%",
    height:300,
    resizeMode: "contain"
  }
})