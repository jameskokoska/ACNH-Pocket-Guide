import React, { Component } from "react";
import {Dimensions, Vibration, Image, TouchableOpacity, Text, View, StyleSheet, Touchable} from "react-native";
import colors from '../Colors.js';
import FastImage from './FastImage';
import Check from './Check';
import TextFont from './TextFont'
import {getCustomListsIcon, inWishlist, getEventName, inChecklist, attemptToTranslateItem, commas, capitalize, checkOff, capitalizeFirst} from '../LoadJsonData'
import {getSizeImage, getPhotoCorner, getMaterialImage, getPhoto} from "./GetPhoto"
import {getCurrentVillagerObjects, attemptToTranslateCreatureCatchPhrase, attemptToTranslateMuseumDescription, attemptToTranslateSourceNotes, getSettingsString, attemptToTranslate, attemptToTranslateSpecial} from "../LoadJsonData"
import {ScrollView} from 'react-native-gesture-handler'
import {PopupInfoCustom} from "./Popup"
import {getMonth, doWeSwapDate} from './DateFunctions'
import { BlueText } from "./Formattings.js";

export class CircularImage extends Component {
  render() {
    if(this.props.popUpCenterImage==="none"){
      return <View/>
    }
    //the width of the TouchableOpacity is used in PopupBottomCustom in Popup.js
    return <View style={{width:"100%", alignItems:'center', justifyContent:'center', position:"absolute"}}>
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {  
        this.props.showLargerPopupImage()
      }}
      onLongPress={() => {  
        this.props.showLargerPopupImage()
      }}
      style={[styles.rowImageBackground,{bottom:getSettingsString("settingsLargerItemPreviews")==="false" ? -130/2+3 : -210/2 + 45, width:"100%", zIndex:500,backgroundColor:this.props.accentColor, height: getSettingsString("settingsLargerItemPreviews")==="false" ? 140 : 210, width: getSettingsString("settingsLargerItemPreviews")==="false" ? 140 : 210,}]}
    >
      <FastImage
        style={[styles.rowImage, {height: getSettingsString("settingsLargerItemPreviews")==="false" ? 105 : 180, width: getSettingsString("settingsLargerItemPreviews")==="false" ? 105 : 180,}]}
        source={{
          uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
        }}
        cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
      />
    </TouchableOpacity>
    </View>
  }
}

export class LeftCornerImage extends Component {
  render() {
    let label = this.props.item[this.props.popUpCornerImageLabelProperty[this.props.item.dataSet]]
    if((label===undefined || label==="") && this.props.item["Data Category"]!=="Sea Creatures"){
      return <View/>
    }
    let photoSource = this.props.item[this.props.popUpCornerImageProperty[this.props.item.dataSet]]
    if(this.props.item["Data Category"]==="Sea Creatures"){
      label = "Underwater"
      photoSource = "Underwater"
    }
    let photo = getPhotoCorner(photoSource)
    return <View style={{ zIndex:50, position: "absolute", top:-15, left:-15,margin: 30,}}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {this.popupImageSource?.setPopupVisible(true, getPhoto(photoSource?.toLowerCase()),this.props.item, photoSource)}}
        style={{alignItems: 'center',}}
      >
        <View style={{backgroundColor:this.props.accentColor,width: 75, height: 75, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
          {photo}
        </View>
        {this.props.showLabel!==false?<TextFont numberOfLines={4} style={[styles.cornerImageLabel,{color:colors.textLight[global.darkMode]}]}>{label}</TextFont>:<View/>}
      </TouchableOpacity>
      <PopupImageSource ref={(popupImageSource) => this.popupImageSource = popupImageSource}/>
    </View>
  }
}

export class RightCornerCheck extends Component {
  constructor(props) {
    super(props);
    this.setCollected = this.setCollected.bind(this);
    this.state = {
      collected:inChecklist(this.props.item.checkListKeyParent)
    };
  }
  //update component when new data is passed into the class, or when the check mark local value changes
  componentDidUpdate(prevProps) {
    if(this.props!==prevProps){
      this.setState({collected:inChecklist(this.props.item.checkListKeyParent)});
    }
  }
  setCollected(collected){
    this.setState({collected: collected});
    this.props.updateCheckChildFunction(this.state.collected===true ? false:true);
  }
  updateRightCornerCheck(key,checked){
    if(this.props.item.checkListKeyParent === key){
      this.setState({collected:checked});
    }
  }
  render() {
    return <View style={{ zIndex:50, position: "absolute", top:-15, right:-15,}}>
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {  
        checkOff(this.props.item.checkListKeyParent, this.state.collected);
        this.setCollected(this.state.collected===true ? false:true);
        this.props.updateVariations(this.props.item.checkListKeyParent,this.state.collected);
    }}>
      <Check checkType={this.props.checkType} fadeOut={false} play={this.state.collected} width={135} height={135}/>
    </TouchableOpacity>
    {/* <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: -19}}>
      <TouchableOpacity style={{justifyContent:"center", alignItems:"center",padding:5, borderRadius:8, backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode]}} activeOpacity={0.6} 
        onPress={()=>{
          
        }}
      >
        <Image style={{width:16,height:16,resizeMode:'contain',}} source={global.darkMode ? require("../assets/icons/leftArrowWhite.png") : require("../assets/icons/leftArrow.png")} />
      </TouchableOpacity>
      <TextFont bold={true} style={[{fontSize: 22, marginHorizontal: 5, color:colors.textBlack[global.darkMode],},this.props.style]}>50</TextFont>
      <TouchableOpacity style={{justifyContent:"center", alignItems:"center",padding:5, borderRadius:8, backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode]}} activeOpacity={0.6} 
        onPress={()=>{
          
        }}
      >
        <Image style={{width:16,height:16,resizeMode:'contain',}} source={global.darkMode ? require("../assets/icons/rightArrowWhite.png") : require("../assets/icons/rightArrow.png")}/>
      </TouchableOpacity>
    </View> */}
  </View>
  }
}

export class Phrase extends Component {
  render() {
    if(this.props.popUpPhraseProperty[this.props.item.dataSet]===""){
      return <View/>
    }
    var text = this.props.item[this.props.popUpPhraseProperty[this.props.item.dataSet]];
    if(this.props.popUpPhraseProperty[this.props.item.dataSet]==="Catchphrase"){
      //villager catch phrase
      text =attemptToTranslateSpecial(text, "catchphrase");
    } else if(this.props.popUpPhraseProperty[this.props.item.dataSet]==="Catch phrase"){
      //creature catch phrase
      text = attemptToTranslateCreatureCatchPhrase(text)
    }

    text = capitalizeFirst(text);

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
    if(this.props.item[this.props.textProperty[this.props.item.dataSet]]!==undefined){
      let title = this.props.item[this.props.textProperty[this.props.item.dataSet]]
      const numberOfLettersForTop = 11
      let topTitleComponent = <View style={{height:20}}/>
      let bottomTitleComponent = <View/>
      if(title.length < numberOfLettersForTop || this.props.onlyOneLine === true){
        topTitleComponent = <TextFont style={[styles.title,{color: colors.textBlack[global.darkMode]}]} bold={true}>
            {capitalize(title)}
          </TextFont>
      } else {
        let splitString = " "
        if(!(title.split(splitString)[0]!==undefined && title.split(" ")[0].length < numberOfLettersForTop)){
          splitString = "-"
        }

        if(title.split(splitString)[0]!==undefined && title.split(splitString)[0].length < numberOfLettersForTop){
          topTitleComponent = <TextFont style={[styles.title,{color: colors.textBlack[global.darkMode]}]} bold={true}>
              {capitalize(title.split(splitString)[0]) + (splitString===" " ? "" : splitString)}
            </TextFont>
        }
        if(title.split(splitString)[0]!==undefined && title.split(splitString)[0].length < numberOfLettersForTop){
          bottomTitleComponent = <TextFont style={[styles.title,{color: colors.textBlack[global.darkMode]}]} bold={true}>
              {capitalize(title.split(splitString).slice(1).join(splitString))}
            </TextFont>
        } else {
          topTitleComponent = <View style={{height:20}}/>
          bottomTitleComponent = <TextFont style={[styles.title,{color: colors.textBlack[global.darkMode]}]} bold={true}>
              {capitalize(title)}
            </TextFont>
        }
      }

      

      return <View style={[styles.titleContainer,{marginHorizontal: this.props.marginHorizontal!==undefined?this.props.marginHorizontal:50}]}>
        {topTitleComponent}
        {bottomTitleComponent}
      </View>
    } else {
      return <View/>;
    }
  }
}

export class InfoLinePlain extends Component{
  render(){
    return(
      <TextFont adjustsFontSizeToFit={true} bold={true} style={[styles.infoLineTitle,{color:colors.textBlack[global.darkMode], textAlign:"center", marginVertical:9}]}>{this.props.item[this.props.textProperty]}</TextFont>
    )
  }
}

export class InfoLine extends Component {
  render() {
    if(this.props.customText!==undefined){
      var imageSource = <Image style={styles.infoLineImage} source={this.props.image}/>;
      return <View style={[styles.infoLineBox,{justifyContent:this.props.center===false?"flex-start":"center", marginVertical:this.props.condensed===true?-5:0}]}>
        {imageSource}
        <TextFont adjustsFontSizeToFit={true} bold={true} style={[styles.infoLineTitle,{color:this.props.customColor!==undefined ? this.props.customColor : colors.textBlack[global.darkMode] }]}>{this.props.customText}</TextFont>
      </View>
    }
    var ending = "";
    if(this.props.ending!==undefined){
      ending=this.props.ending;
    }
    var starting = "";
    if(this.props.starting!==undefined){
      starting=this.props.starting;
    }
    if(this.props.item===undefined){
      return <View/>
    }
    if(this.props.item.hasOwnProperty(this.props.textProperty[0])){
      if(this.props.item[this.props.textProperty]==="None"){
        return <View/>
      }
    }
    var text1 = attemptToTranslateSpecial(this.props.item[this.props.textProperty], "variants");
    var text2 = attemptToTranslateSpecial(this.props.item[this.props.textProperty2], "variants");
    if(this.props.textProperty[0]==="Season/Event"){
      text1 = getEventName(text1);
      if(text1===""){
        return <View/>
      }
    }
    if(this.props.textProperty[0]==="Source Notes"){
      text1 = attemptToTranslateSourceNotes(text1);
      if(text1===""){
        return <View/>
      }
    }
    // if(this.props.textProperty[0]==="Favorite Song"){
    //   text1 = ""
    // }
    var text = capitalizeFirst(commas(text1));
    if(this.props.textProperty2 !== undefined && this.props.item[this.props.textProperty] !== this.props.item[this.props.textProperty2]){
      text+= ", " + capitalizeFirst(commas(text2))
    }
    if(text1===undefined){
      return <View/>
    } else if (text1.toString().toLowerCase()==="null" || text1.toString().toLowerCase()==="na"){
      return <View/>
    }
    
    var imageSource = <Image style={styles.infoLineImage} source={this.props.image}/>;
    var extraImageSource = <View/>
    var currencyBells = false;
    if(this.props.textProperty!==undefined && this.props.textProperty[0]==="Cyrus Customize Price"){
      extraImageSource = <Image style={styles.infoLineImage} source={require("../assets/icons/diyKit.png")}/>
    }
    if(this.props.item[this.props.ending]!== undefined && this.props.ending==="Exchange Currency" && this.props.textProperty[0]=== "Buy"){
      if(text==="NFS" && this.props.item["Exchange Price"] !==undefined && this.props.item["Exchange Price"] !=="NA"){
        text = commas(this.props.item["Exchange Price"]);
      }
      if(this.props.item[this.props.ending].toString().toLowerCase().includes("miles")){
        ending= " " + attemptToTranslate("miles");
        imageSource = <Image style={styles.infoLineImage} source={require("../assets/icons/miles.png")}/>;
      } else if(this.props.item[this.props.ending].toString().toLowerCase().includes("nook points")){
        ending= " " + attemptToTranslate("Nook points");
        imageSource = <Image style={styles.infoLineImage} source={require("../assets/icons/nookLinkCoin.png")}/>;
      } else if(this.props.item[this.props.ending].toString().toLowerCase().includes("heart crystals")){
        ending= " " + attemptToTranslate("heart crystals");
        imageSource = <Image style={styles.infoLineImage} source={require("../assets/icons/crystal.png")}/>;
      } else if( text!=="NFS" ){
        ending = " " + attemptToTranslate("bells");
        currencyBells = true
      } else {
        ending = "";
      }
    } else if(text.toString().toLowerCase()==="nfs"){
      ending="";
    } else if (this.props.ending==="Exchange Currency"){
      ending = " " + attemptToTranslate("bells");
      currencyBells = true
    }

    if(currencyBells && global.ordinance === "Bell Boom" && this.props.item[this.props.textProperty]!==undefined){
      // console.log("bell boom")
      text = commas(parseInt(parseInt(this.props.item[this.props.textProperty])*1.2))
    }
    
    if(this.props.special!==undefined && this.props.special==="C.J."){
      extraImageSource = <Image style={[styles.infoLineImage,{marginRight:2}]} source={require("../assets/icons/coin.png")}/>
      text = commas(parseInt(parseInt(this.props.item[this.props.textProperty])*1.5))
    } else if(this.props.special!==undefined && this.props.special==="Flick"){
      extraImageSource = <Image style={[styles.infoLineImage,{marginRight:2}]} source={require("../assets/icons/coin.png")}/>
      text = commas(parseInt(parseInt(this.props.item[this.props.textProperty])*1.5))
    }

    //handle poki
    if(this.props.poki===true && this.props.textProperty[0]!==undefined && this.props.textProperty[0]==="Exchange Currency" && this.props.item[this.props.textProperty[0]]==="Poki"){
      if(this.props.item["Exchange Price"]!==undefined){
        imageSource = <Image style={styles.infoLineImage} source={require("../assets/icons/pokiBag.png")}/>;
        text = commas(this.props.item["Exchange Price"])
        ending= " " + attemptToTranslate("poki");
      }
    } else if (this.props.poki===true){
      return <View/>
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

    if(this.props.textProperty[0]==="Kit Cost" && this.props.item["Kit Type"]!==undefined && this.props.item["Kit Type"]!=="NA" && this.props.item["Kit Type"]!=="Normal" && this.props.item["Kit Type"]!=="None"){
      ending = ending + " ("+attemptToTranslate(this.props.item["Kit Type"])+")"
      let materialImage = getMaterialImage(this.props.item["Kit Type"], true)
      console.log(materialImage)
      if(materialImage===""){
        extraImageSource = <Image style={[styles.infoLineImage,{marginRight:2}]} source={getPhoto(this.props.item["Kit Type"].toLowerCase())}/>
      }else {
        extraImageSource = <FastImage style={[styles.infoLineImage,{width: 30, height:30}]} source={{uri: materialImage}} cacheKey={materialImage}/>
      }
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
      text = attemptToTranslateItem(text.toString().toLowerCase())
      text=capitalize(text)
    }
    return <View style={[styles.infoLineBox,{justifyContent:this.props.center===false?"flex-start":"center", marginVertical:this.props.condensed===true?-5:0}]}>
      {extraImageSource}
      {imageSource}
      <TextFont adjustsFontSizeToFit={true} bold={true} style={[styles.infoLineTitle,{color:this.props.customColor!==undefined ? this.props.customColor : colors.textBlack[global.darkMode]}]}>{starting + text + ending}</TextFont>
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

export class InfoDescription extends Component {
  render(){
    return(
      <View style={{backgroundColor: colors.lightDarkAccentTextBG[global.darkMode], padding:15, paddingHorizontal: 25, marginHorizontal: 10, marginVertical: 5, borderRadius: 8}}>
        <TextFont translate={false} style={{lineHeight: 20, fontSize: 16, textAlign:"left", color:colors.textBlack[global.darkMode]}}>{attemptToTranslateMuseumDescription(this.props.text)}</TextFont>
      </View>
    )
  }
}

export class SizeInfo extends Component {
  render(){
    if(this.props.size===undefined || this.props.size===""){
      return <View/>
    } else {
      return(<View style={[styles.infoLineBox,{justifyContent:this.props.center===false?"flex-start":"center"}]}>
        <Image style={styles.infoLineImage} source={getSizeImage(this.props.size)}/>
        <TextFont adjustsFontSizeToFit={true} bold={true} style={[styles.infoLineTitle,{color:colors.textBlack[global.darkMode]}]}>{this.props.size}</TextFont>
        </View>
      )
    }
    
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
    } else if(textLines.length===1 && textLines[0]===undefined){
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
  constructor(props) {
    super(props);
    this.state = {
      updateChecked:"",
      updateKey:"",
      wishlistItems:this.getWishlistItems(getVariations(this.props.item["Name"],this.props.globalDatabase,this.props.item["checkListKey"], this.props.item.indexOriginal ? this.props.item.indexOriginal : this.props.item.index)),
      variations:getVariations(this.props.item["Name"],this.props.globalDatabase,this.props.item["checkListKey"], this.props.item.indexOriginal ? this.props.item.indexOriginal : this.props.item.index)
    }
  }
  updateVariations(key,checked){
    this.setState({updateChecked:checked, updateKey:key});
  }
  componentDidUpdate(prevProps) {
    if(this.props!==prevProps){
      this.setState({wishlistItems:this.getWishlistItems(getVariations(this.props.item["Name"],this.props.globalDatabase,this.props.item["checkListKey"], this.props.item.indexOriginal ? this.props.item.indexOriginal : this.props.item.index)), updateChecked:!inChecklist(this.props.item.checkListKey), updateKey:this.props.item.checkListKey, variations:getVariations(this.props.item["Name"],this.props.globalDatabase,this.props.item["checkListKey"], this.props.item.indexOriginal ? this.props.item.indexOriginal : this.props.item.index)});
    }
  }
  getWishlistItems = (variations) => {
    let variationsTotal = []
    for(let i = 0; i < variations.length; i++){
      if(inWishlist(variations[i].checkListKey)){
        variationsTotal.push(variations[i].checkListKey)
      }
    }
    return variationsTotal
  }
  updateWishlist = () => {
    this.setState({wishlistItems:this.getWishlistItems(this.state.variations)})
  }
  showPopupImage = (visible) => {
    this.popup?.setPopupVisible(visible, this.props.item[this.props.imageProperty[this.props.item.dataSet]], this.props.item);
  }
  render(){
    if(this.props.item!=""||this.props.item!=undefined){
      if(this.state.variations.length<=1){
        return <PopupImage ref={(popup) => this.popup = popup} updateWishlist={this.updateWishlist} selectCustomList={this.props.selectCustomList}/>
      }
      var imageProperty = this.props.imageProperty;
      var dataSet = this.props.item.dataSet;
      var originalCheckListKey = this.props.item.checkListKey
      if(getSettingsString("settingsCompressVariations")==="true"){
        return(
          <>
          <ScrollView horizontal={true} style={{marginHorizontal:10}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}>
          <View style={{marginHorizontal: 4, flexDirection: 'row', justifyContent:'center'}}>
            {this.state.variations.map( (item, index)=>
              <VariationItem customListsIcon={getCustomListsIcon(item.checkListKey)} wishlist={this.state.wishlistItems.includes(item.checkListKey)} variations={this.state.variations} updateRightCornerCheck={this.props.updateRightCornerCheck} updateKey={this.state.updateKey} updateChecked={this.state.updateChecked} originalCheckListKey={originalCheckListKey} updateCheckChildFunction={this.props.updateCheckChildFunction} index={index} key={item[this.props.imageProperty[dataSet]]} globalDatabase={this.props.globalDatabase} item={item} setPopupVisible={(state, image, item)=>this.popup?.setPopupVisible(state, image, item)} dataSet={dataSet} imageProperty={imageProperty}/>
            )}
          </View>
          </ScrollView>
          <PopupImage ref={(popup) => this.popup = popup} updateWishlist={this.updateWishlist} selectCustomList={this.props.selectCustomList}/>
          </>
        )
      } else {
        return(
          <>
          <View style={{flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
            {this.state.variations.map( (item, index)=>
              <VariationItem customListsIcon={getCustomListsIcon(item.checkListKey)} wishlist={this.state.wishlistItems.includes(item.checkListKey)} variations={this.state.variations} updateRightCornerCheck={this.props.updateRightCornerCheck} updateKey={this.state.updateKey} updateChecked={this.state.updateChecked} originalCheckListKey={originalCheckListKey} updateCheckChildFunction={this.props.updateCheckChildFunction} index={index} key={item["Unique Entry ID"]!==undefined?item["Unique Entry ID"]:item[this.props.imageProperty[dataSet]]} globalDatabase={this.props.globalDatabase} item={item} setPopupVisible={(state, image, item)=>this.popup?.setPopupVisible(state, image, item)} dataSet={dataSet} imageProperty={imageProperty}/>
            )}
          </View>
          <PopupImage ref={(popup) => this.popup = popup} updateWishlist={this.updateWishlist} selectCustomList={this.props.selectCustomList}/>
          </>
        )
      }
    } else {
      return <View/>
    }
    
  }
}

export function howManyVariationsChecked(allVariations){
  var totalChecked = 0;
  for(var i=0; i<allVariations.length; i++){
    var extraIndex = i===0 || allVariations[i]["checkListKeyParent"]===allVariations[i]["checkListKey"] ? "0":"";
    if(global.collectionListIndexed[allVariations[i]["checkListKey"]+extraIndex]===true || global.collectionListIndexed[allVariations[i]["checkListKey"]+"0"]===true){
      totalChecked++
    }
  }
  return totalChecked;
}

export class VariationItem extends Component{
  constructor(props) {
    super(props);
    this.extraIndex = this.props.index===0 ? "0":"";
    this.state = {
      checked: global.collectionListIndexed[this.props.item["checkListKey"]+this.extraIndex]===true,
      wishlist:this.props.wishlist,
      customListsIcon: this.props.customListsIcon,
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps!==this.props){
      if(this.props.item.checkListKey+this.extraIndex === this.props.updateKey){
        this.setState({
          checked: !this.props.updateChecked,
        })
      }
      this.setState({
        wishlist:this.props.wishlist,
        customListsIcon: this.props.customListsIcon,
      })
    }
  }
  render(){
    var item=this.props.item;
    var dataSet=this.props.dataSet;
    return(
      <TouchableOpacity 
        onLongPress={()=>{this.props.setPopupVisible(true, item[this.props.imageProperty[dataSet]], item); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : ""}}
        onPress={()=>{ 
          // if(item.checkListKey+this.extraIndex === this.props.originalCheckListKey)
          //   this.props.updateCheckChildFunction(this.state.checked===true ? false:true);
          checkOff(item.checkListKey, this.state.checked, "", this.extraIndex); 
          // this.props.updateRightCornerCheck(item.checkListKey+this.extraIndex,!this.state.checked)
          this.setState({checked: !this.state.checked})
          
          if(howManyVariationsChecked(this.props.variations) === this.props.variations.length){
            this.props.updateCheckChildFunction(true);
            this.props.updateRightCornerCheck(item.checkListKeyParent,true)
            checkOff(item.checkListKeyParent, !true); 
          }
        }}>
        { this.state.wishlist ?
          <Image 
            source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} 
            style={{opacity:0.7, width:13, height:13, resizeMode:"contain",position:'absolute', left:9, top: 9, zIndex:10,}}
          /> : 
        (this.state.customListsIcon==="" || this.state.customListsIcon===undefined) ? 
          <View/> :
        (this.state.customListsIcon.constructor === String && this.state.customListsIcon.startsWith("http")) ?
          <FastImage
          style={{opacity:0.7, width:15, height:15, resizeMode:"contain",position:'absolute', left:9, top: 9, zIndex:10,}}
            source={{uri:this.state.customListsIcon}}
            cacheKey={this.state.customListsIcon}
          /> :
        this.state.customListsIcon ?
          <Image
            style={{opacity:0.7, width:13, height:13, resizeMode:"contain",position:'absolute', left:9, top: 9, zIndex:10,}}
            source={getPhoto(this.state.customListsIcon)}
          /> :
        <View/>
        }
        {/* {this.state.wishlist? <Image source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} style={{opacity:0.7, width:13, height:13, resizeMode:"contain",position:'absolute', left:9, top: 9, zIndex:10,}}/> : <View/>} */}
        <View style={[{borderWidth: 2, borderColor: this.state.checked ? colors.checkGreen[global.darkMode] : colors.eventBackground[global.darkMode], marginHorizontal:3, marginVertical: 2, padding: 5, borderRadius: 100,justifyContent: "center",alignItems: "center",backgroundColor:colors.lightDarkAccent[global.darkMode]}]}>
          {item[this.props.imageProperty[dataSet]]!==undefined&&item[this.props.imageProperty[dataSet]].startsWith("http")?
          <FastImage
            style={{height: getSettingsString("settingsLargerItemPreviews")==="false"?53:70, width: getSettingsString("settingsLargerItemPreviews")==="false"?53:70, resizeMode:'contain',}}
            source={{
              uri: item[this.props.imageProperty[dataSet]],
            }}
            cacheKey={item[this.props.imageProperty[dataSet]]}
          />:<Image
            style={{height: getSettingsString("settingsLargerItemPreviews")==="false"?53:70, width: getSettingsString("settingsLargerItemPreviews")==="false"?53:70, resizeMode:'contain',}}
            source={getPhoto(item[this.props.imageProperty[dataSet]]!==undefined?item[this.props.imageProperty[dataSet]].toString().toLowerCase():"")}
          />}
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
      customListsIcon: "",
    }; 
  }

  setPopupVisible = (visible, image, item) => {
    this.setState({image:image, item:item, wishlist: inWishlist(item?.checkListKey), customListsIcon:getCustomListsIcon(item?.checkListKey)});
    this.popup?.setPopupVisible(true);
  }

  addToWishlist = () => {
    // checkOff(this.state.item.checkListKey, this.state.wishlist, "wishlist"); //true to vibrate and wishlist
    this.props.selectCustomList(
      this.state.item, 
      (list)=>{
        //run when wishlist list selected
        this.setState({wishlist: inWishlist(this.state.item.checkListKey), customListsIcon:getCustomListsIcon(this.state.item.checkListKey)});
        this.props.updateWishlist();
      }, 
      ()=>{
        //run when tapped
        // this.popup?.setPopupVisible(false);
      },
      //dont popup using bottom sheet
      false,
      this.state.image
    );
  }
  render(){
    let maxWidth = 200
    if(Dimensions.get('window').width*0.6 > 200 || Dimensions.get('window').height*0.6 > 200){
      maxWidth = 200
    } else {
      if(Dimensions.get('window').width > Dimensions.get('window').height)
        maxWidth = Dimensions.get('window').height*0.6
      else
        maxWidth = Dimensions.get('window').width*0.6
    }
    return(
      <PopupInfoCustom ref={(popup) => this.popup = popup} buttonText={"Close"}>
        <View style={{alignItems:"center"}}>
          <TouchableOpacity 
            style={{position:"absolute", right:10, top:10}} 
            onPress={() => {this.addToWishlist()}}>
            { this.state.wishlist ?
                <View style={{width:50, height:50, opacity: 1,justifyContent:"center", alignItems:"center"}}>
                  <Image 
                    source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} 
                    style={{width:35, height:35, resizeMode:"contain",}}
                  />
                </View> : 
              (this.state.customListsIcon.constructor === String && this.state.customListsIcon.startsWith("http")) ?
                <View style={{width:50, height:50, opacity: 1,justifyContent:"center", alignItems:"center"}}>
                  <FastImage
                    style={{width:40, height:40, resizeMode:"contain",}}
                    source={{uri:this.state.customListsIcon}}
                    cacheKey={this.state.customListsIcon}
                  />
                </View> :
              this.state.customListsIcon ?
                <View style={{width:50, height:50, opacity: 1,justifyContent:"center", alignItems:"center"}}>
                  <Image
                    style={{width:35, height:35, resizeMode:"contain",}}
                    source={getPhoto(this.state.customListsIcon)}
                  />
                </View> :
                <View style={{width:50, height:50, opacity: 0.2,justifyContent:"center", alignItems:"center"}}>
                  <Image source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} style={{width:35, height:35, resizeMode:"contain",}}/>
                </View>
            }
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {this.addToWishlist()}} onLongPress={() => {this.addToWishlist()}}>
            <FastImage
              style={{width:maxWidth,height:maxWidth,resizeMode:'contain',}}
              source={{
                uri: this.state.image,
              }}
              cacheKey={this.state.image}
            />
          </TouchableOpacity>
          
          <InfoLine
            image={require("../assets/icons/colorPalette.png")} 
            item={this.state.item}
            textProperty={["Color 1"]}
            textProperty2={["Color 2"]}
          />
          <InfoLine
            image={require("../assets/icons/pattern.png")} 
            item={this.state.item}
            textProperty={["Pattern"]}
            textProperty2={["Pattern Title"]}
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
          {this.state.item["checkListKey"]!==undefined && this.state.item["checkListKey"]?.includes("clothing")?<VillagersGifts compact item={this.state.item}/>:<View/>}
        </View>
      </PopupInfoCustom>
    )
  }
}

class PopupImageSource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item:"",
    }; 
  }

  setPopupVisible = (visible, image, item, label) => {
    this.setState({image:image, item:item, label: label});
    this.popup?.setPopupVisible(true);
  }

  render(){
    let maxWidth = 140
    if(Dimensions.get('window').width*0.6 > 140 || Dimensions.get('window').height*0.6 > 140){
      maxWidth = 140
    } else {
      if(Dimensions.get('window').width > Dimensions.get('window').height)
        maxWidth = Dimensions.get('window').height*0.6
      else
        maxWidth = Dimensions.get('window').width*0.6
    }
    let imageComp = <Image
      style={{height: maxWidth,width: maxWidth,resizeMode:'contain',borderRadius:5}}
      source={this.state.image}
    />
    return(
      <PopupInfoCustom ref={(popup) => this.popup = popup} buttonText={"Close"}>
        <View style={{alignItems:"center"}}>
          {imageComp}
          <TextFont bold style={{color:colors.textBlack[global.darkMode], fontSize:18, textAlign:"center", marginTop: 10}}>{this.state.label}</TextFont>
          {this.state.label===this.state.item["Source"] || this.state.item["Source"]===undefined ? <></> : <TextFont style={{color:colors.textBlack[global.darkMode], fontSize:16, textAlign:"center", marginTop: 10}}>{this.state.item["Source"]}</TextFont>}
          {this.state.item["Source Notes"]===undefined || this.state.item["Source Notes"]==="NA" ? <></> : <TextFont style={{color:colors.textBlack[global.darkMode], fontSize:16, textAlign:"center", marginTop: 10}}>{this.state.item["Source Notes"]}</TextFont>}
          <View style={{height:15}}/>
        </View>
      </PopupInfoCustom>
    )
  }
}

export function getVariations(name, globalDatabase, checkListKey, startingIndex = 0){
  var totalVariations1 = [];
  var totalVariations2 = [];
  var failCount = 0;
  //Check backwards and forwards from given index to find all variations (for e.g. what if a furniture is passed that is a variation in the middle?)
  for(var i=0; i<globalDatabase.length; i++){
    if(globalDatabase[i].length > startingIndex-1){
      failCount = 0;
      for(var j=startingIndex-1; j>=0; j--){
        if(globalDatabase[i][j]["checkListKey"]===undefined){
          console.log("ERROR!!!")
          console.log(globalDatabase[i][j]["Name"])
          break;
        } else if(globalDatabase[i][j]["checkListKey"].split("CheckList")[0]!==checkListKey.split("CheckList")[0]){
          break;
        }
        if(globalDatabase[i][j]["Name"].toString().toLowerCase()===name.toString().toLowerCase()){
          totalVariations1.push(globalDatabase[i][j]);
          globalDatabase[i][j].variationIndex = j
        } else {
          failCount++
        }
        if(failCount>1){
          break;
        }
      }
      totalVariations1.reverse()
    }
    if(globalDatabase[i].length > startingIndex){
      failCount = 0;
      for(var j=startingIndex; j<globalDatabase[i].length; j++){
        if(globalDatabase[i][j]["checkListKey"].split("CheckList")[0]!==checkListKey.split("CheckList")[0]){
          break;
        }
        if(globalDatabase[i][j]["Name"].toString().toLowerCase()===name.toString().toLowerCase()){
          totalVariations2.push(globalDatabase[i][j]);
          globalDatabase[i][j].variationIndex = j
        } else {
          failCount++
        }
        if(failCount>1){
          break;
        }
      }
    }
    
  }
  let allVariations =  [...totalVariations1, ...totalVariations2];
  allVariations.sort(function(a,b) {return (a.variationIndex > b.variationIndex) ? 1 : ((b.variationIndex > a.variationIndex) ? -1 : 0);} );
  return allVariations
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
                translateItem={this.props.translateItem}
              />
              <InfoLine
                image={this.props.image2} 
                item={this.props.item2}
                textProperty={this.props.textProperty2}
                textProperty2={this.props.textProperty22}
                ending={this.props.ending2}
                translateItem={this.props.translateItem}
              />
        </View>
  }
}

export class VillagersGifts extends Component {
  render(){
    var currentVillagers = getCurrentVillagerObjects();
    if(currentVillagers.length===0)
      return <View/>
    var chosenVillagers = []
    for(var i = 0; i < currentVillagers.length; i++){
      var villager = currentVillagers[i]
      var likedStyles = [villager["Color 1"],villager["Color 2"],villager["Style 1"],villager["Style 2"]]
      if (( (this.props.item["Color 1"] !== undefined && this.props.item["Color 1"].includes(likedStyles[0]))  || 
      (this.props.item["Color 2"] !== undefined && this.props.item["Color 2"].includes(likedStyles[1]))  || 
      (this.props.item["Color 2"] !== undefined && this.props.item["Color 2"].includes(likedStyles[0]))  || 
      (this.props.item["Color 1"] !== undefined && this.props.item["Color 1"].includes(likedStyles[1]))   ) && (
      (this.props.item["Style 1"] !== undefined && this.props.item["Style 1"].includes(likedStyles[2]))  || 
      (this.props.item["Style 2"] !== undefined && this.props.item["Style 2"].includes(likedStyles[3]))  || 
      (this.props.item["Style 2"] !== undefined && this.props.item["Style 2"].includes(likedStyles[2]))  || 
      (this.props.item["Style 1"] !== undefined && this.props.item["Style 1"].includes(likedStyles[3])) )){
        chosenVillagers.push(villager)
      }
    }
    if(chosenVillagers.length===0)
      return <View/>
    else
      return <View>
        <View style={{height:15}}/>
        <View style={{flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
          {chosenVillagers.map( (villager, index)=>{
              return(
                <View key={villager["Name"]+index+this.props.item["Name"]} style={{margin:this.props.compact===true?2:5}}>
                  <View style={{width: 60,height: 60,borderRadius: 100,justifyContent: "center",alignItems: "center",backgroundColor:colors.lightDarkAccent[global.darkMode]}}>
                    <FastImage
                      style={{height: 45,width: 45,resizeMode:'contain',}}
                      source={{uri:villager["Icon Image"]}}
                      cacheKey={villager["Icon Image"]}
                    />
                  </View>
                </View>
              )
            }
          )}
        </View>
        <BlueText>Favorite villagers who like this item as a gift</BlueText>
      </View>
  }
}

const styles = StyleSheet.create({
  infoLineImage:{
    width: 25,
    height: 25,
    resizeMode:'contain',
  },
  infoLineImageItem:{
    width: 40,
    height: 40,
    margin: -5,
    resizeMode:'contain',
  },
  infoLineTitle:{
    fontSize: 18.5,
    marginLeft: 7,
    maxWidth: "85%",
  },
  infoLineTitleDouble:{
    fontSize: 15.5,
    marginLeft: 7,
  },
  infoLineTitleTriple:{
    fontSize: 13,
    marginLeft: 7,
  },
  infoLineBoxBeside: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
    flexWrap:"wrap"
  },
  infoLineBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
    paddingTop: 7,
    paddingBottom: 7,
    marginLeft: 10,
    marginRight: 10,
  },
  phrase:{
    fontSize: 16,
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5,
    padding: 0,
    paddingBottom: 8
  },
  titleContainer:{
    paddingBottom: 10,
    alignItems: "center",
  },
  title:{
    fontSize: 28,
    textAlign: "center",
  },
  rowImageBackground:{
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:50,
    elevation: 5,
  },
  rowImage:{
    resizeMode:'contain',
  },
  cornerImageLabel:{
    width: 90,
    textAlign:"center",
    paddingLeft: 5,
    paddingRight: 5,
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
})