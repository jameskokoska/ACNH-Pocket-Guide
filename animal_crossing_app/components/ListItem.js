import React, {PureComponent, useState, useEffect, Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  Vibration,
  Image,
} from 'react-native';
import TextFont from './TextFont';
import Check from './Check';
import FastImage from './FastImage';
import {checkOff, capitalize, commas, removeBrackets} from "../LoadJsonData"
import {getPhotoShadow} from "./GetPhoto"
import {getMonthShort} from "./DateFunctions"
import colors from "../Colors"
import {getCurrentDateObject, parseActiveTime} from "./DateFunctions"
import {determineDataGlobal, inMuseum, inWishlist, inChecklist, attemptToTranslateItem, getSettingsString, allVariationsChecked} from "../LoadJsonData"
import FadeInOut from "../components/FadeInOut";

const {width} = Dimensions.get('window');
const museumCategories = ["Fish","Insects","Sea Creatures","Fossils","Art"]

class ListItem extends React.Component{
  constructor(props) {
    super(props);
    this.setCollected = this.setCollected.bind(this);
    this.setWishlist = this.setWishlist.bind(this);
    this.setMuseum = this.setMuseum.bind(this);
    this.showMuseumButton = getSettingsString("settingsShowMuseumButton")==="true"
    this.state = {
      collected: inChecklist(this.props.item.checkListKey),
      wishlist: inWishlist(this.props.item.checkListKey),
      museum: inMuseum(this.props.item.checkListKey, this.checkMuseumButton()),
      variationsPercent: allVariationsChecked(this.props.item, this.props.item.index)
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps!==this.props){
      if(this.state.collected!==inChecklist(this.props.item.checkListKey)){
        this.setCollected(!this.state.collected)
      }
      if(this.state.wishlist!==inWishlist(this.props.item.checkListKey)){
        this.setWishlist(!this.state.wishlist)
      }
      let checkVariations = allVariationsChecked(this.props.item, this.props.item.index);
      if(this.state.variationsPercent!==checkVariations){
        this.setState({variationsPercent: checkVariations})
      }
      if(this.state.museum!==inMuseum(this.props.item.checkListKey, this.checkMuseumButton())){
        this.setMuseum(!this.state.museum)
      }
    }
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  
  setCollected(collected, updateVariations=false){
    if(this.mounted){
      if(updateVariations){
        this.setState({variationsPercent: this.allVariationsChecked()})
      } else {
        this.setState({collected: collected})
      }
    }
  }
  setWishlist(wishlist){
    if(this.mounted){
      this.setState({wishlist: wishlist})
    }
  }

  setMuseum(museum){
    if(this.mounted && this.checkMuseumButton()){
      this.setState({museum: museum})
    }
  }

  checkMuseumButton = () => {
    return museumCategories.includes(this.props.item["Data Category"]) || this.props.title==="Active Creatures"
  }

  render(){
    var settingsUse24HourClock = getSettingsString("settingsUse24HourClock")==="true";
    var missingVariationsIndicator = !this.state.variationsPercent?<View pointerEvents={"none"} style={{position:'absolute', right: -5, top: -5, backgroundColor:colors.missingVariations[global.darkMode], height:27, width:27, borderRadius:20}}></View>:<View/>

    var showBlankCheckMarks = getSettingsString("settingsShowBlankCheckMarks")==="true";

    var disablePopup;
    if(this.props.disablePopup===undefined){
      disablePopup=false;
    } else {
      disablePopup=this.props.disablePopup[this.props.item.dataSet];
    }

    var boxColor = colors.white[global.darkMode];
    if(getSettingsString("settingsHighlightNotCraftableVariations") === "true" && this.props.item["Body Customize"] !==undefined && this.props.item["Body Customize"] ==="No" && this.props.item["Variation"] !==undefined && this.props.item["Variation"] !=="NA"){
      boxColor = colors.highlightNonCustomizableItems[global.darkMode];
    } else if(this.props.boxColor===true && getSettingsString("settingsColorLists")==="true"){
      var opacity = "0A"
      if(global.darkMode){
        opacity = "10"
      }
      if(this.props.item["Bubble Color"]!==undefined){
        boxColor =this.props.item["Bubble Color"]+opacity;
      }else if(this.props.item["Color 1"]!==undefined){
        if (this.props.item["Color 2"]!==undefined && (this.props.item["Color 1"]==='Colorful')){
          boxColor = colors["itemBox"+this.props.item["Color 2"]][global.darkMode]+opacity
          if(this.props.item["Color 2"]==='Colorful'){
            boxColor = colors["itemBox"+this.props.item["Color 1"]][global.darkMode]+opacity
          }
        } else {
          boxColor = colors["itemBox"+this.props.item["Color 1"]][global.darkMode]+opacity
        }
      }
    }
    if(this.props.leaveWarning){
      var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH "
      var nextMonthShort = getMonthShort(getCurrentDateObject().getMonth()+1);
      var currentMonthShort = getMonthShort(getCurrentDateObject().getMonth());
      
      if(this.props.item[hemispherePre+nextMonthShort]==="NA" && this.props.item[hemispherePre+currentMonthShort]!=="NA"){
        boxColor = colors.creaturesLeavingBG[global.darkMode];
      }
    }

    var textProperty2Text;
    if(this.props.textProperty2!==undefined){
      textProperty2Text = this.props.textProperty2[this.props.item.dataSet];
    }
    var redTextProperty2 = false;
    if(this.props.textProperty2!==undefined && this.props.textProperty2[this.props.item.dataSet]==="creatureTime"){
      var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH "
      var currentMonthShort = getMonthShort(getCurrentDateObject().getMonth());
      textProperty2Text = this.props.item[hemispherePre+currentMonthShort];
      if(textProperty2Text==="NA"){
        textProperty2Text = this.props.item[hemispherePre+"time"];
        redTextProperty2 = true;
      }
      if(settingsUse24HourClock && textProperty2Text!=="NA" && textProperty2Text!=="All day"){
        var splitText = textProperty2Text.split("; ")
        textProperty2Text = "";
        for(var z = 0; z<splitText.length; z++){
          var splitString = splitText[z].replace(/[^\x00-\x7F]/g, "");
          splitString = splitString.replace("  ", " ");
          splitString = splitString.split(" ");
          textProperty2Text = textProperty2Text + (z>0?"; ":"") + parseActiveTime(splitString, 0).toString()+":00" + " - " + parseActiveTime(splitString, 2).toString()+ ":00"
        }
      }
    }

    var label = this.props.item[this.props.textProperty[this.props.item.dataSet]]

    if(this.props.gridType==="smallGrid"){
      var textProperty2Component = <View/>;
      if(this.props.textProperty2!==undefined && this.props.textProperty2[this.props.item.dataSet]!==""){
        if(this.props.textProperty2[this.props.item.dataSet]==="(DIY)")
          textProperty2Component = <TextFont suffix={")"} prefix={"("} bold={false} style={{textAlign:'center', color:this.props.labelColor, fontSize:12}}>DIY</TextFont>
        else 
          textProperty2Component = <TextFont bold={false} style={{textAlign:'center', color:this.props.labelColor, fontSize:12,}}>{capitalize(this.props.item[textProperty2Text])}</TextFont>
      }
      return (
        <View style={styles.gridWrapper}>
          
          <TouchableNativeFeedback onLongPress={() => {
            checkOff(this.props.item.checkListKey, this.state.wishlist, "wishlist"); //true to vibrate and wishlist
            this.setWishlist(this.state.wishlist===true ? false:true);
          }}
            background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
            onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item.checkListKey, this.state.collected); 
                this.setCollected(this.state.collected===true ? false:true);
              } else {
                this.props.openBottomSheet(this.setCollected);
              }
            }}
          >
            <View style={[styles.gridBox, {backgroundColor:boxColor}]}>
              {missingVariationsIndicator}
              <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: -18, top: -18, zIndex:10}}>
                <TouchableOpacity onPress={()=>{if(showBlankCheckMarks){checkOff(this.props.item.checkListKey, this.state.collected); this.setCollected(this.state.collected===true ? false:true);}}}>
                  <Check checkType={this.props.checkType} play={this.state.collected} width={53} height={53} disablePopup={disablePopup}/>
                </TouchableOpacity>
              </View>
              <CheckMuseum showMuseumButton={this.showMuseumButton} setCollected={this.setCollected} collected={this.state.collected} setMuseum={this.setMuseum} item={this.props.item} museum={this.state.museum} museumPage={this.checkMuseumButton()}/>
              {this.state.wishlist? <Image source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} style={{opacity:0.7, width:17, height:17, resizeMode:"contain",position:'absolute', left:7, top: 7, zIndex:10,}}/> : <View/>}
              <FastImage
                style={styles.gridBoxImage}
                source={{
                  uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
                }}
                cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
              />
              <View style={styles.gridBoxText}>
                <TextFont translate={false} numberOfLines={2} bold={true} style={{textAlign:'center', color:this.props.labelColor, fontSize:13}}>{capitalize(label)}</TextFont>
                {textProperty2Component}
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    } else if (this.props.gridType==="largeGrid"){
      return( 
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            checkOff(this.props.item.checkListKey, this.state.wishlist, "wishlist"); //true to vibrate and wishlist
            this.setWishlist(this.state.wishlist===true ? false:true);
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
          onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item.checkListKey, this.state.collected); 
                this.setCollected(this.state.collected===true ? false:true);
              } else {
                this.props.openBottomSheet(this.setCollected);
              }
            }}
          >
            <View style={[styles.gridBoxLarge, {backgroundColor:boxColor}]}>
              <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: -18, top: -18, zIndex:10}}>
                <TouchableOpacity onPress={()=>{if(showBlankCheckMarks){checkOff(this.props.item.checkListKey, this.state.collected); this.setCollected(this.state.collected===true ? false:true);}}}>
                  <Check checkType={this.props.checkType} play={this.state.collected} width={53} height={53} disablePopup={disablePopup}/>
                </TouchableOpacity>
              </View>
              <CheckMuseum showMuseumButton={this.showMuseumButton} setCollected={this.setCollected} collected={this.state.collected} setMuseum={this.setMuseum} item={this.props.item} museum={this.state.museum} museumPage={this.checkMuseumButton()}/>
              {this.state.wishlist ? <Image source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} style={{opacity:0.7, width:17, height:17, resizeMode:"contain",position:'absolute', left:7, top: 7, zIndex:10,}}/> : <View/>}
              <FastImage
                style={styles.gridBoxImageLarge}
                source={{
                  uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
                }}
                cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
              />
              <View style={styles.gridBoxTextLarge}>
                <TextFont translate={false} bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{capitalize(label)}</TextFont>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    } else if (this.props.gridType==="largeGridSmaller"){
      var priceComponent = <View/>
      if(this.props.textProperty2==="construction" && this.props.item["Buy"] !== undefined && this.props.item["Buy"] !== "5000" && this.props.item["Buy"] !== "NFS"){
        priceComponent = <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:15,height:15,resizeMode:'contain',  marginRight:3}} source={require("../assets/icons/bellBag.png")}/><TextFont translate={false} bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{commas(this.props.item["Buy"])}</TextFont></View>
      } else if(this.props.textProperty2==="construction" && this.props.item["Sell"] !== undefined){
        priceComponent = <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:15,height:15,resizeMode:'contain',  marginRight:3}} source={require("../assets/icons/coin.png")}/><TextFont translate={false} bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{commas(this.props.item["Sell"])}</TextFont></View>
      } else if(this.props.textProperty2==="cards"){
        if(this.props.item[getSettingsString("settingsNorthernHemisphere") === "true" ? "NH Start Date":"SH Start Date"] !== (undefined || "NA")){
          priceComponent = <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:15,height:15,resizeMode:'contain',  marginRight:3}} source={require("../assets/icons/clockIcon.png")}/><TextFont translate={false} bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{this.props.item[getSettingsString("settingsNorthernHemisphere") === "true" ? "NH Start Date":"SH Start Date"] + " - " + this.props.item[getSettingsString("settingsNorthernHemisphere") === "true" ? "NH End Date":"SH End Date"]}</TextFont></View>
        } else if (this.props.item["Buy"]==="NFS") {
          priceComponent = <TextFont translate={false} bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{"NFS"}</TextFont>
        }
      }
      return( 
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            checkOff(this.props.item.checkListKey, this.state.wishlist, "wishlist"); //true to vibrate and wishlist
            this.setWishlist(this.state.wishlist===true ? false:true);
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
          onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item.checkListKey, this.state.collected); 
                this.setCollected(this.state.collected===true ? false:true);
              } else {
                this.props.openBottomSheet(this.setCollected);
              }
            }}
          >
            <View style={[styles.gridBoxLarge, {backgroundColor:boxColor}]}>
              <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: -18, top: -18, zIndex:10}}>
                <TouchableOpacity onPress={()=>{if(showBlankCheckMarks){checkOff(this.props.item.checkListKey, this.state.collected); this.setCollected(this.state.collected===true ? false:true);}}}>
                  <Check checkType={this.props.checkType} play={this.state.collected} width={53} height={53} disablePopup={disablePopup}/>
                </TouchableOpacity>
              </View>
              <CheckMuseum showMuseumButton={this.showMuseumButton} setCollected={this.setCollected} collected={this.state.collected} setMuseum={this.setMuseum} item={this.props.item} museum={this.state.museum} museumPage={this.checkMuseumButton()}/>
              {this.state.wishlist===true ? <Image source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} style={{opacity:0.7, width:17, height:17, resizeMode:"contain",position:'absolute', left:7, top: 7, zIndex:10,}}/> : <View/>}
              <FastImage
                style={styles.gridBoxImageLargeSmaller}
                source={{
                  uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
                }}
                cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
              />
              <View style={styles.gridBoxTextLargeSmaller}>
                <TextFont translate={false} bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{capitalize(label)}</TextFont>
                {priceComponent}
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    } else { //Row component
      var fishShadow = <View/>
      if(this.props.popUpContainer!==undefined && this.props.popUpContainer.hasOwnProperty(this.props.item.dataSet) && this.props.popUpContainer[this.props.item.dataSet][0]==="FishPopup"){
        fishShadow = <View style={{position:"absolute", right: 75, bottom: 20,}}><Image style={{width:80,height:22,resizeMode:'contain',  marginRight:3}} source={getPhotoShadow(this.props.item,false)}/></View>
      }
      return( 
        <View>
          <TouchableNativeFeedback onLongPress={() => {  
            checkOff(this.props.item.checkListKey, this.state.wishlist, "wishlist"); //true to vibrate and wishlist
            this.setWishlist(this.state.wishlist===true ? false:true);
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
          onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item.checkListKey, this.state.collected); 
                this.setCollected(this.state.collected===true ? false:true);
              } else {
                this.props.openBottomSheet(this.setCollected);
              }
            }}
          >
            <View style={[styles.row,{backgroundColor:boxColor}]}>
              {this.state.wishlist ? <Image source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} style={{opacity:0.7, width:17, height:17, resizeMode:"contain",position:'absolute', right:7, top: 7, zIndex:10,}}/> : <View/>}
              <View style={[styles.rowImageBackground,{backgroundColor:this.props.accentColor}]}>
                <FastImage
                  style={styles.rowImage}
                  source={{
                    uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
                  }}
                  cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
                />
              </View>
              <View style={styles.rowTextContainer}>
                <View style={styles.rowTextTop}>
                  <TextFont translate={false} bold={true} numberOfLines={2} style={{fontSize:20, color:this.props.labelColor}}>{capitalize(label)}</TextFont>
                </View>
                <View style={styles.rowTextBottom}>
                  <TextFont bold={true} numberOfLines={2} style={{fontSize:16, color:redTextProperty2?colors.redText[global.darkMode]:this.props.specialLabelColor}}>{capitalize(removeBrackets(textProperty2Text))}</TextFont>
                </View>
                <View style={styles.rowTextBottom}>
                  <TextFont bold={true} numberOfLines={2} style={{fontSize:16, color:this.props.specialLabelColor}}>{capitalize(removeBrackets(this.props.item[this.props.textProperty3[this.props.item.dataSet]]))}</TextFont>
                </View>
              </View>
              {fishShadow}
              <TouchableOpacity style={{position:"absolute", right: -5, bottom: 0}} 
                activeOpacity={0.6}
                onPress={() => {  
                checkOff(this.props.item.checkListKey, this.state.collected); 
                this.setCollected(this.state.collected===true ? false:true);
              }}>
                <Check checkType={this.props.checkType} fadeOut={false} play={this.state.collected} width={90} height={90} disablePopup={disablePopup}/>
              </TouchableOpacity>
              <CheckMuseum showMuseumButton={this.showMuseumButton} setCollected={this.setCollected} collected={this.state.collected} setMuseum={this.setMuseum} item={this.props.item} museum={this.state.museum} museumPage={this.checkMuseumButton()}/>
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    }
  }
};

export default ListItem;

class CheckMuseum extends Component {
  render(){
    if(this.props.showMuseumButton!==true){
      return <View/>
    }
    return(
      <>
      {this.props.museumPage?<TouchableOpacity style={{zIndex:10, position:"absolute", left: -10, top: -10, padding:15}} 
        activeOpacity={0.6}
        onPress={() => {  
        checkOff(this.props.item.checkListKey, this.props.museum, "museum");
        this.props.setMuseum(this.props.museum===true ? false:true);
        //check off if donated to museum
        if(!this.props.collected && !this.props.museum){
          checkOff(this.props.item.checkListKey, this.props.collected); 
          this.props.setCollected(this.props.collected===true ? false:true);
        }
      }}>
        {this.props.museum?
          <FadeInOut duration={200} startValue={0} endValue={1} fadeIn={true} fadeInOut={true} scaleInOut={true} maxFade={0.8} minScale={0.2}>
            <View style={{width: 35,height: 35,borderRadius: 100,justifyContent: "center",alignItems: "center", opacity: 0.9, borderWidth: 1.3, borderColor: colors.checkGreen[global.darkMode], backgroundColor:colors.checkGreen2[global.darkMode]}}>
              <Image style={{resizeMode:'contain',width:22, height:22}} source={require("../assets/icons/owl.png")}/>
            </View>
          </FadeInOut>
          :
          <View style={{width: 35,height: 35,borderRadius: 100,justifyContent: "center",alignItems: "center",  opacity: 0.4, borderWidth: 1.3, borderColor: colors.lightDarkAccentHeavy[global.darkMode], backgroundColor:colors.lightDarkAccent2[global.darkMode]}}>
            <Image style={{resizeMode:'contain',width:22, height:22}} source={require("../assets/icons/owl.png")}/>
          </View>
        }
      </TouchableOpacity>:<View/>}
      </>
    )
  }
}



const styles = StyleSheet.create({
  rowTextBottom:{
    width: "100%",
    paddingLeft: 4,
    paddingRight: 3,
    marginTop: 1,
  },
  rowTextTop:{
    width: "100%",
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 2
  },
  rowTextContainer:{
    margin:6,
    marginLeft: 10,
    marginRight: 125,
  },
  rowImageBackground:{
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  rowImage:{
    height: 55,
    width: 55,
    resizeMode:'contain',
  },
  row: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection:"row",
    width: "100%",
    borderRadius:10,
    elevation: 0,
    marginTop: 7,
  },
  gridBoxText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingLeft: 3,
    paddingRight: 3,
    marginBottom: 13,
    marginHorizontal: 8,
  },
  gridBoxTextLarge: {
    flex: 1,
    marginTop: 5,
    paddingLeft: 3,
    paddingRight: 3,
    marginHorizontal: 15,
  },
  gridBoxTextLargeSmaller: {
    flex: 1,
    justifyContent: "center",
    height: 25,
    marginHorizontal: 15,
  },
  gridWrapper: {
    marginVertical: 3, 
    alignItems: 'center', 
    flex: 1,
  },
  gridBoxImage: {
    height: 90,
    width: 90,
    borderRadius:2,
    marginTop: 10,
    resizeMode:'contain',
  },
  gridBoxImageLarge: {
    height: "75%",
    width: "80%",
    borderRadius:5,
    marginTop: 15,
    resizeMode:'contain',
  },
  gridBoxImageLargeSmaller: {
    height: 120,
    width: 120,
    borderRadius:5,
    marginTop: 15,
    resizeMode:'contain',
  },
  gridBox: {
    alignItems: "center",
    height: 150,
    width: "92%",
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 0,
    margin: 2,
  },
  gridBoxLarge: {
    alignItems: "center",
    height: 200,
    width: "94%",
    borderRadius:10,
    elevation: 0,
    margin: 2,
  },
});
