import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import TextFont from './TextFont';
import Check from './Check';
import FastImage from './FastImage';
import {checkOff, capitalize, commas, removeBrackets, inCustomLists, getCustomListsAmount, getCustomListsIcon, attemptToTranslate, getCustomListsFirstAmount, getCustomListsFirstAmountQuick, getCustomListsIconQuick, getCustomListsFirst} from "../LoadJsonData"
import {getPhoto, getPhotoShadow, getSizeImage} from "./GetPhoto"
import {getMonthShort, swapDateCards} from "./DateFunctions"
import colors from "../Colors"
import {getCurrentDateObject, parseActiveTime} from "./DateFunctions"
import {inMuseum, inVillager, inVillagerPhoto, inWishlist, inChecklist,getSettingsString, variationsCheckedPercent} from "../LoadJsonData"
import FadeInOut from "../components/FadeInOut";
import { SubHeader } from './Formattings';
import { getHourlySongTitle, MusicButtonComponent } from '../pages/SongsPage';
import { GestureDetector, PanGestureHandler } from 'react-native-gesture-handler';

const museumCategories = ["Fish","Insects","Sea Creatures","Fossils","Art"]
const villagerCategories = ["Villagers"]
const villagerPhotoCategories = ["Villagers"]

class ListItem extends React.Component{
  constructor(props) {
    super(props);
    this.setCollected = this.setCollected.bind(this);
    this.setWishlist = this.setWishlist.bind(this);
    this.setMuseum = this.setMuseum.bind(this);
    this.setVillager = this.setVillager.bind(this);
    this.setVillagerPhoto = this.setVillagerPhoto.bind(this);
    // this.showMuseumButton = getSettingsString("settingsShowMuseumButton")==="true"
    this.showMuseumButton = true
    this.showVillagerButton = true
    this.showVillagerPhotoButton = true
    let currentCustomListName = getCustomListsFirst(this.props.item.checkListKey)
    let amount = 0
    if(this.props.currentCustomList!==undefined && this.props.currentCustomList!==""){
      amount = getCustomListsAmount(this.props.item.checkListKey, this.props.currentCustomList)
      currentCustomListName = this.props.currentCustomList
    } else {
      amount = getCustomListsFirstAmountQuick(this.props.item.checkListKey, currentCustomListName)
    }
    const inWishlistVal = inWishlist(this.props.item.checkListKey)
    let customListsIconValue = inWishlistVal? "" : getCustomListsIconQuick(currentCustomListName)
    if(currentCustomListName===undefined || currentCustomListName===""){
      amount = 0
      customListsIconValue = inWishlistVal? "" : undefined
    } else {
      customListsIconValue = inWishlistVal? "" : getCustomListsIconQuick(currentCustomListName)
    }

    this.state = {
      collected: inChecklist(this.props.item.checkListKeyParent),
      wishlist: inWishlistVal,
      museum: inMuseum(this.props.item.checkListKey, this.checkMuseumButton()),
      villager: inVillager(this.props.item.checkListKey, this.checkVillagerButton()),
      villagerPhoto: inVillagerPhoto(this.props.item.checkListKey, this.checkVillagerPhotoButton()),
      variationsPercent: variationsCheckedPercent(this.props.item, this.props.item.index),
      amount:amount,
      customListsIcon: customListsIconValue,
      currentCustomList: currentCustomListName
    }
  }

  // componentDidUpdate(prevProps){
  //   if(prevProps!==this.props){
  //     if(this.state.collected!==inChecklist(this.props.item.checkListKey)){
  //       this.setCollected(!this.state.collected)
  //     }
  //     if(this.state.wishlist!==inWishlist(this.props.item.checkListKey)){
  //       this.setWishlist(!this.state.wishlist)
  //     }
  //     let checkVariations = variationsCheckedPercent(this.props.item, this.props.item.index);
  //     if(this.state.variationsPercent!==checkVariations){
  //       this.setState({variationsPercent: checkVariations})
  //     }
  //     if(this.state.museum!==inMuseum(this.props.item.checkListKey, this.checkMuseumButton())){
  //       this.setMuseum(!this.state.museum)
  //     }
  //     if(this.state.villager!==inVillager(this.props.item.checkListKey, this.checkVillagerButton())){
  //       this.setVillager(!this.state.villager)
  //     }
  //     if(this.state.villagerPhoto!==inVillagerPhoto(this.props.item.checkListKey, this.checkVillagerPhotoButton())){
  //       this.setVillagerPhoto(!this.state.villagerPhoto)
  //     }
  //   }
  // }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  
  setCollected(collected, updateVariations=false){
    if(this.mounted){
      //always update variation
      if(true){
        this.setState({variationsPercent: variationsCheckedPercent(this.props.item, this.props.item.index),collected: collected})
      } 
    }
  }
  setWishlist(wishlist){
    if(this.mounted){
      const currentCustomListName = getCustomListsFirst(this.props.item.checkListKey)
      this.setState({
        wishlist: wishlist,
        customListsIcon: wishlist? "" : getCustomListsIconQuick(currentCustomListName),
        currentCustomList: currentCustomListName,
      })
      this.setAmount(this.props.item.checkListKey, currentCustomListName)
    }
  }

  setAmount(checkListKeyString, currentCustomListName=this.state.currentCustomList){
    if(this.mounted && currentCustomListName!==undefined && currentCustomListName!==""){
      if(this.props.currentCustomList!==undefined && this.props.currentCustomList!==""){
        const amountLocal = getCustomListsAmount(checkListKeyString, this.props.currentCustomList)
        this.setState({amount:amountLocal})
      } else {
        const amountLocal = getCustomListsAmount(checkListKeyString, currentCustomListName)
        this.setState({amount:amountLocal})
      }
    }
  }

  setMuseum(museum){
    if(this.mounted && this.checkMuseumButton()){
      this.setState({museum: museum})
    }
  }

  setVillager(villager){
    if(this.mounted && this.checkVillagerButton()){
      this.setState({villager: villager})
    }
  }

  setVillagerPhoto(villagerPhoto){
    if(this.mounted && this.checkVillagerPhotoButton()){
      this.setState({villagerPhoto: villagerPhoto})
    }
  }

  checkMuseumButton = () => {
    return museumCategories.includes(this.props.item["Data Category"])
  }

  checkVillagerButton = () => {
    return villagerCategories.includes(this.props.item["Data Category"])
  }

  checkVillagerPhotoButton = () => {
    return villagerPhotoCategories.includes(this.props.item["Data Category"])
  }

  render(){
    var settingsUse24HourClock = getSettingsString("settingsUse24HourClock")==="true";
    var missingVariationsIndicator = this.state.variationsPercent>0?<View pointerEvents={"none"} style={{position:'absolute', right: -5, top: -5, backgroundColor:this.state.variationsPercent===1?colors.allVariations[global.darkMode]:colors.missingVariations[global.darkMode], height:27, width:27, borderRadius:20}}></View>:<View/>

    // var showBlankCheckMarks = getSettingsString("settingsShowBlankCheckMarks")==="true";
    var showBlankCheckMarks = true;

    var disablePopup;
    if(this.props.disablePopup===undefined){
      disablePopup=false;
    } else {
      disablePopup=this.props.disablePopup[this.props.item.dataSet];
    }

    var boxColor = colors.white[global.darkMode];
    if(getSettingsString("settingsHighlightNotCraftableVariations") === "true" && this.props.item["Body Customize"] !==undefined && this.props.item["Body Customize"] ==="No" && this.props.item["Variation"] !==undefined && this.props.item["Variation"] !=="NA"){
      boxColor = colors.highlightNonCustomizableItems[global.darkMode];
    // } else if(this.props.boxColor===true && getSettingsString("settingsColorLists")==="true"){
    } else if(this.props.boxColor===true){
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
    // let imageSrc = this.props.item[this.props.imageProperty[this.props.item.dataSet]];

    if(this.props.gridType==="smallGrid"){
      var textProperty2Component = <View/>;
      let DIYImage = ""
      if(this.props.textProperty2!==undefined && this.props.item[textProperty2Text]!==undefined && this.props.textProperty2[this.props.item.dataSet]!==undefined && this.props.textProperty2[this.props.item.dataSet]!==""){
        textProperty2Component = <TextFont bold={false} style={{textAlign:'center', color:this.props.labelColor, fontSize:12,}}>{capitalize(this.props.item[textProperty2Text])}</TextFont>
      } else if(this.props.textProperty2!==undefined && this.props.textProperty2[this.props.item.dataSet]!==undefined && this.props.textProperty2[this.props.item.dataSet]==="(DIY)"){
        if(this.props.item["Image"]!==undefined && this.props.item["Image"].includes("Cooking")){
          DIYImage = "cookingRecipe.png"
        } else {
          DIYImage = "recipe.png"
        }
      }
      //image workaround
      // if(this.props.item["Data Category"]==="Recipes"){
      //   imageSrc = getFoodPhoto(this.props.item["Name"],imageSrc)
      // }
      let lowerWishlistIcon = false;
      if(this.props.textProperty2!==undefined && this.props.textProperty2[this.props.item.dataSet]!=="" && (this.props.textProperty2[this.props.item.dataSet]==="(DIY)")){
        lowerWishlistIcon = true
      } else if (this.checkMuseumButton() || this.checkVillagerPhotoButton()){
        lowerWishlistIcon = true
      }

      let labelsAndImages = {
        "Sell" : require("../assets/icons/coin.png"),
        "Buy" : require("../assets/icons/bellBag.png"),
        "Miles" : require("../assets/icons/miles.png"),
        "Nook Points": require("../assets/icons/nookLinkCoin.png"),
        "Heart Crystals":require("../assets/icons/crystal.png"),
        "Color 1" : require("../assets/icons/colorPalette.png"),
        "Color 2" : require("../assets/icons/colorPalette.png"),
        "Tag":require("../assets/icons/tag.png"),
        "Size":this.props.item["Size"]!==undefined ? getSizeImage(this.props.item["Size"]) : require("../assets/icons/leaf.png"),    
        "Variation" : require("../assets/icons/pattern.png"),
      }

      let extraText = capitalize(commas(this.props.item[global.extraItemInfo]));
      let ending = "";
      let imageSource = global.extraItemInfo;
      if(global.extraItemInfo==="Buy"){
        let currencyBells = false;
        if(this.props.item["Exchange Currency"]!==undefined && this.props.item["Exchange Currency"].toString().toLowerCase().includes("miles")){
          ending= " " + attemptToTranslate("miles");
          imageSource = "Miles"
        } else if(this.props.item["Exchange Currency"]!==undefined && this.props.item["Exchange Currency"].toString().toLowerCase().includes("nook points")){
          ending= " " + attemptToTranslate("Nook points");
          imageSource = "Nook Points";
        } else if(this.props.item["Exchange Currency"]!==undefined && this.props.item["Exchange Currency"].toString().toLowerCase().includes("heart crystals")){
          ending= " " + attemptToTranslate("heart crystals");
          imageSource = "Heart Crystals";
        } else if( this.props.item["Buy"]!=="NFS" ){
          ending = " " + attemptToTranslate("bells");
          imageSource = "Buy"
          currencyBells = true;
        } else {
          ending = "";
        }
        if(this.props.item["Buy"]!==undefined && this.props.item["Buy"]==="NFS" && this.props.item["Exchange Price"] !==undefined && this.props.item["Exchange Price"] !=="NA"){
          if(currencyBells && global.ordinance === "Bell Boom" && this.props.item["Buy"]!==undefined){
            extraText = commas(parseInt(this.props.item["Buy"])*1.2) + ending
          } else if(currencyBells && this.props.item["Buy"]!==undefined){
            extraText = commas(parseInt(this.props.item["Buy"])) + ending
          } else {
            extraText = commas(this.props.item["Exchange Price"]) + ending;
          }
        }
      }

      return (
        <View style={styles.gridWrapper}>
          
          <TouchableNativeFeedback onLongPress={() => {
            this.props.setUpdateAmountChildFunction((amount)=>{this.setAmount(amount)})

            if(global.customLists.length > 0){
              this.props.selectCustomList(this.props.item, this.setWishlist, ()=>{}, true, this.props.item[this.props.imageProperty[this.props.item.dataSet]])
            }else{
              checkOff(this.props.item.checkListKey, this.state.wishlist, "wishlist"); //true to vibrate and wishlist
              this.setWishlist(this.state.wishlist===true ? false:true);
            }
          }}
            background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
            onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item.checkListKeyParent, this.state.collected); 
                this.setCollected(this.state.collected===true ? false:true);
              } else {
                this.props.openBottomSheet(this.setCollected, this.setWishlist);
              }
            }}
          >
            <View style={[styles.gridBox, {backgroundColor:boxColor, height:(global.extraInfo !== "" && global.extraInfo !== undefined ? 160 : 150)}]}>
              {missingVariationsIndicator}
              <PanGestureHandler activeOffsetY={100} activeOffsetX={20}>
                <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: -33, top: -33, zIndex:10}}>
                  <TouchableOpacity onPress={()=>{if(showBlankCheckMarks){checkOff(this.props.item.checkListKeyParent, this.state.collected); this.setCollected(this.state.collected===true ? false:true);}}}>
                    <View style={{padding:15}}>
                      <Check checkType={this.props.checkType} play={this.state.collected} width={53} height={53} disablePopup={disablePopup}/>
                    </View>
                  </TouchableOpacity>
                </View>
              </PanGestureHandler>
              {this.state.amount>1 && this.state.currentCustomList !== undefined && this.state.currentCustomList !== "" ? 
                <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: 5, bottom: 5, zIndex:10}}>
                  <TextFont translate={false} numberOfLines={2} bold={true} style={{textAlign:'center', color:this.props.labelColor, fontSize:14}}>{commas(this.state.amount)+"x"}</TextFont>
                </View>
                :
                <View/>
              }
              {(this.props.textProperty2!==undefined && this.props.textProperty2[this.props.item.dataSet]!=="" && this.props.textProperty2[this.props.item.dataSet]==="(DIY)")?<View style={{zIndex:1, position:"absolute", left: -8, top: -6, padding:15, opacity: 0.5, }}>
                <Image style={{resizeMode:'contain',width:25, height:25}} source={getPhoto(DIYImage)}/>
              </View>
              :<View/>}
              <CheckMuseum showMuseumButton={this.showMuseumButton} setCollected={this.setCollected} collected={this.state.collected} setMuseum={this.setMuseum} item={this.props.item} museum={this.state.museum} museumPage={this.checkMuseumButton()}/>
              <CheckVillager showVillagerButton={this.showVillagerButton} setCollected={this.setCollected} collected={this.state.collected} setVillager={this.setVillager} item={this.props.item} villager={this.state.villager} villagerPage={this.checkVillagerButton()}/>
              <CheckVillagerPhoto showVillagerPhotoButton={this.showVillagerPhotoButton} setCollected={this.setCollected} collected={this.state.collected} setVillagerPhoto={this.setVillagerPhoto} item={this.props.item} villager={this.state.villagerPhoto} villagerPage={this.checkVillagerPhotoButton()}/>
              { this.state.wishlist ?
                  <Image 
                    source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} 
                    style={{left:7 + (lowerWishlistIcon?2:0), top: 7 + (lowerWishlistIcon?33:0), opacity:0.7, width:17, height:17, resizeMode:"contain",position:'absolute', zIndex:10,}}
                  /> : 
                (this.state.customListsIcon==="" || this.state.customListsIcon===undefined) ? 
                  <View/> :
                (this.state.customListsIcon.constructor === String && this.state.customListsIcon.startsWith("http")) ?
                  <FastImage
                    style={{left:7 + (lowerWishlistIcon?2:0), top: 7 + (lowerWishlistIcon?33:0), opacity:0.7, width:22, height:22, resizeMode:"contain",position:'absolute', zIndex:10,}}
                    source={{uri:this.state.customListsIcon}}
                    cacheKey={this.state.customListsIcon}
                  /> :
                this.state.customListsIcon ?
                  <Image
                    style={{left:7 + (lowerWishlistIcon?2:0), top: 7 + (lowerWishlistIcon?33:0), opacity:0.7, width:20, height:20, resizeMode:"contain",position:'absolute', zIndex:10,}}
                    source={getPhoto(this.state.customListsIcon)}
                  /> :
                <View/>
              }
              { ((!this.props.avoidSpoilers||this.state.variationsPercent>0||this.state.collected||this.state.villager||this.state.villagerPhoto) && this.props.item[this.props.imageProperty[this.props.item.dataSet]]!==undefined)?(this.props.item[this.props.imageProperty[this.props.item.dataSet]].toString().startsWith("http") ? 
                <FastImage
                  style={styles.gridBoxImage}
                  source={{
                    uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
                  }}
                  cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
                />:
                <Image style={styles.gridBoxImage} source={getPhoto(this.props.item[this.props.imageProperty[this.props.item.dataSet]].toString().toLowerCase())}/>):
                <View style={{height:7}}/>
              }
              <View style={styles.gridBoxText}>
                <TextFont translate={false} numberOfLines={2} bold={true} style={{textAlign:'center', color:this.props.labelColor, fontSize:12}}>{capitalize(label)}</TextFont>
                {textProperty2Component}
                {this.props.item[global.extraItemInfo]!==undefined && this.props.item[global.extraItemInfo]!=="NA" && this.props.item[global.extraItemInfo]!=="" ? <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", marginBottom:-5, flexWrap:"wrap", marginHorizontal:10}}>
                  {labelsAndImages[global.extraItemInfo]!==undefined ? <Image
                      style={{width:14, height:14, resizeMode:"contain", marginRight: 4, marginTop:3}}
                      source={labelsAndImages[imageSource]}
                    /> : <View/>
                  }
                  <TextFont translate={false} numberOfLines={2} bold={true} style={{textAlign:'left', color:this.props.labelColor, fontSize:11, marginTop: 3}}>{extraText}</TextFont>
                </View> : <></>}
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
      );
    } else if (this.props.gridType==="songGrid"){
      let showImage = ((!this.props.avoidSpoilers||this.state.variationsPercent>0||this.state.collected||this.state.villager||this.state.villagerPhoto) && this.props.item[this.props.imageProperty[this.props.item.dataSet]]!==undefined)
      if(showImage==false){
        showImage = this.props.item.special==="hourly"
      }
      return( 
        <View style={{marginVertical: 2, alignItems: 'center', flex: 1,}}>
          <TouchableNativeFeedback onLongPress={() => {  
              this.props.setUpdateAmountChildFunction((amount)=>{this.setAmount(amount)})

              if(this.props.item.special !== "hourly"){
                //only can add if not hourly music
                if(global.customLists.length > 0){
                  this.props.selectCustomList(this.props.item, this.setWishlist, ()=>{}, true, this.props.item[this.props.imageProperty[this.props.item.dataSet]])
                }else{
                  checkOff(this.props.item.checkListKey, this.state.wishlist, "wishlist"); //true to vibrate and wishlist
                  this.setWishlist(this.state.wishlist===true ? false:true);
                }
              }
            }}
            background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
          >
            <View style={{alignItems: "center", justifyContent:"center", paddingVertical: 15, paddingHorizontal: 5, width: "95%", borderRadius:10,elevation: 0,marginVertical: 2, backgroundColor: boxColor}}>
              { showImage?(this.props.item[this.props.imageProperty[this.props.item.dataSet]].toString().startsWith("http") ? 
                <FastImage
                  style={{marginTop:0, padding:0, height:140, width:140, borderRadius: 10, resizeMode:"contain"}}
                  source={{uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]]}}
                  cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
                />:
                <Image style={{marginTop:0, padding:0, height:140, width:140, resizeMode:"contain", transform:[{scale:0.7}]}} source={
                  getPhoto((this.props.item.special==="hourly" && this.props.item.special!==undefined) ? this.props.item.weather : this.props.item[this.props.imageProperty[this.props.item.dataSet]].toString().toLowerCase())
                }/>):
                <View style={{height:176.8, width:140,alignItems: "center", justifyContent:"center",}}>
                  <TextFont translate={false} bold={true} style={{textAlign:'center', color:this.props.labelColor, marginVertical:10}}>{this.props.item.special==="hourly" ? getHourlySongTitle(this.props.item): capitalize(label)}</TextFont>
                </View>
              }
              <View style={{flexDirection:"column",marginBottom: -5, justifyContent:"center", alignItems:"center"}}>
                {!showImage ? <View/> : <TextFont translate={false} bold={true} style={{textAlign:'center', color:this.props.labelColor, marginVertical:10}}>{this.props.item.special==="hourly" ? getHourlySongTitle(this.props.item): capitalize(label)}</TextFont>}
                <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", flexWrap:"wrap"}}>
                {this.props.item.special==="hourly" ?  <MusicButtonComponent color={colors.okButton4[global.darkMode]} text={"Play"} onPress={()=>{this.props.customTapFunction(this.props.item,false)}}/> : <>
                    <MusicButtonComponent color={colors.okButton3[global.darkMode]} text={"Aircheck"} onPress={()=>{this.props.customTapFunction(this.props.item,false)}}/>
                    <MusicButtonComponent color={colors.okButton3[global.darkMode]} text={"Live"} onPress={()=>{this.props.customTapFunction(this.props.item,true)}}/>
                    <MusicButtonComponent color={colors.okButton3[global.darkMode]} text={"Music Box"} onPress={()=>{this.props.customTapFunction(this.props.item,"Music Box")}}/>
                  </>
                }
                </View>
              </View>
              {this.props.item.special==="hourly" ? <View/> : 
                <PanGestureHandler activeOffsetY={100} activeOffsetX={20}>
                  <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: -33, top: -33, zIndex:10}}>
                    <TouchableOpacity onPress={()=>{if(showBlankCheckMarks){checkOff(this.props.item.checkListKeyParent, this.state.collected); this.setCollected(this.state.collected===true ? false:true);}}}>
                      <View style={{padding:15}}>
                        <Check checkType={this.props.checkType} play={this.state.collected} width={53} height={53} disablePopup={disablePopup}/>
                      </View>
                    </TouchableOpacity>
                  </View>
                </PanGestureHandler>
              }
              {this.state.amount>1 && this.state.currentCustomList !== undefined && this.state.currentCustomList !== "" ? 
                <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: 5, bottom: 5, zIndex:10}}>
                  <TextFont translate={false} numberOfLines={2} bold={true} style={{textAlign:'center', color:this.props.labelColor, fontSize:14}}>{commas(this.state.amount)+"x"}</TextFont>
                </View>
                :
                <View/>
              }
              { this.state.wishlist ?
                  <Image 
                    source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} 
                    style={{left:7 , top: 7, opacity:0.7, width:17, height:17, resizeMode:"contain",position:'absolute', zIndex:10,}}
                  /> : 
                (this.state.customListsIcon==="" || this.state.customListsIcon===undefined) ? 
                  <View/> :
                (this.state.customListsIcon.constructor === String && this.state.customListsIcon.startsWith("http")) ?
                  <FastImage
                    style={{left:7, top: 7, opacity:0.7, width:22, height:22, resizeMode:"contain",position:'absolute', zIndex:10,}}
                    source={{uri:this.state.customListsIcon}}
                    cacheKey={this.state.customListsIcon}
                  /> :
                this.state.customListsIcon ?
                  <Image
                    style={{left:7, top: 7, opacity:0.7, width:20, height:20, resizeMode:"contain",position:'absolute', zIndex:10,}}
                    source={getPhoto(this.state.customListsIcon)}
                  /> :
                <View/>
              }
            </View>
          </TouchableNativeFeedback>
        </View>
      )
    } else if (this.props.gridType==="largeGrid"){
      return( 
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            this.props.setUpdateAmountChildFunction((amount)=>{this.setAmount(amount)})

            if(global.customLists.length > 0){
              this.props.selectCustomList(this.props.item, this.setWishlist, ()=>{}, true, this.props.item[this.props.imageProperty[this.props.item.dataSet]])
            }else{
              checkOff(this.props.item.checkListKey, this.state.wishlist, "wishlist"); //true to vibrate and wishlist
              this.setWishlist(this.state.wishlist===true ? false:true);
            }
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
          onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item.checkListKeyParent, this.state.collected); 
                this.setCollected(this.state.collected===true ? false:true);
              } else {
                this.props.openBottomSheet(this.setCollected, this.setWishlist);
              }
            }}
          >
            <View style={[styles.gridBoxLarge, {backgroundColor:boxColor}]}>
              <PanGestureHandler activeOffsetY={100} activeOffsetX={20}>
                <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: -33, top: -33, zIndex:10}}>
                  <TouchableOpacity onPress={()=>{if(showBlankCheckMarks){checkOff(this.props.item.checkListKeyParent, this.state.collected); this.setCollected(this.state.collected===true ? false:true);}}}>
                    <View style={{padding:105}}>
                      <Check checkType={this.props.checkType} play={this.state.collected} width={53} height={53} disablePopup={disablePopup}/>
                    </View>
                  </TouchableOpacity>
                </View>
              </PanGestureHandler>
              <CheckMuseum showMuseumButton={this.showMuseumButton} setCollected={this.setCollected} collected={this.state.collected} setMuseum={this.setMuseum} item={this.props.item} museum={this.state.museum} museumPage={this.checkMuseumButton()}/>
              <CheckVillager showVillagerButton={this.showVillagerButton} setCollected={this.setCollected} collected={this.state.collected} setVillager={this.setVillager} item={this.props.item} villager={this.state.villager} villagerPage={this.checkVillagerButton()}/>
              {this.state.amount>1 && this.state.currentCustomList !== undefined && this.state.currentCustomList !== "" ? 
                <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: 5, bottom: 5, zIndex:10}}>
                  <TextFont translate={false} numberOfLines={2} bold={true} style={{textAlign:'center', color:this.props.labelColor, fontSize:14}}>{commas(this.state.amount)+"x"}</TextFont>
                </View>
                :
                <View/>
              }
              { this.state.wishlist ?
                  <Image 
                    source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} 
                    style={{left:7, top: 7, opacity:0.7, width:17, height:17, resizeMode:"contain",position:'absolute', zIndex:10,}}
                  /> : 
                (this.state.customListsIcon==="" || this.state.customListsIcon===undefined) ? 
                  <View/> :
                (this.state.customListsIcon.constructor === String && this.state.customListsIcon.startsWith("http")) ?
                  <FastImage
                    style={{left:7, top: 7, opacity:0.7, width:22, height:22, resizeMode:"contain",position:'absolute', zIndex:10,}}
                    source={{uri:this.state.customListsIcon}}
                    cacheKey={this.state.customListsIcon}
                  /> :
                this.state.customListsIcon ?
                  <Image
                    style={{left:7, top: 7, opacity:0.7, width:20, height:20, resizeMode:"contain",position:'absolute', zIndex:10,}}
                    source={getPhoto(this.state.customListsIcon)}
                  /> :
                <View/>
              }
              { ((!this.props.avoidSpoilers||this.state.variationsPercent>0||this.state.collected||this.state.villager||this.state.villagerPhoto) && this.props.item[this.props.imageProperty[this.props.item.dataSet]]!==undefined)?(this.props.item[this.props.imageProperty[this.props.item.dataSet]].toString().startsWith("http") ? 
                <FastImage
                  style={styles.gridBoxImageLarge}
                  source={{
                    uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
                  }}
                  cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
                />:
                <Image style={styles.gridBoxImageLarge} source={getPhoto(this.props.item[this.props.imageProperty[this.props.item.dataSet]].toString().toLowerCase())}/>):
                <View style={{height:7}}/>
              }
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
          priceComponent = <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop: 3}}><Image style={{width:15,height:15,resizeMode:'contain',  marginRight:3}} source={require("../assets/icons/clockIcon.png")}/><TextFont translate={false} bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{swapDateCards(this.props.item[getSettingsString("settingsNorthernHemisphere") === "true" ? "NH Start Date":"SH Start Date"]) + " - " + swapDateCards(this.props.item[getSettingsString("settingsNorthernHemisphere") === "true" ? "NH End Date":"SH End Date"])}</TextFont></View>
        } else if (this.props.item["Buy"]==="NFS") {
          priceComponent = <TextFont translate={false} bold={true} style={{textAlign:'center', color:this.props.labelColor}}>{"NFS"}</TextFont>
        }
      }
      return( 
        <View style={styles.gridWrapper}>
          <TouchableNativeFeedback onLongPress={() => {  
            this.props.setUpdateAmountChildFunction((amount)=>{this.setAmount(amount)})

            if(global.customLists.length > 0){
              this.props.selectCustomList(this.props.item, this.setWishlist, ()=>{}, true, this.props.item[this.props.imageProperty[this.props.item.dataSet]])
            }else{
              checkOff(this.props.item.checkListKey, this.state.wishlist, "wishlist"); //true to vibrate and wishlist
              this.setWishlist(this.state.wishlist===true ? false:true);
            }
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
          onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item.checkListKeyParent, this.state.collected); 
                this.setCollected(this.state.collected===true ? false:true);
              } else {
                this.props.openBottomSheet(this.setCollected, this.setWishlist);
              }
            }}
          >
            <View style={[styles.gridBoxLarge, {backgroundColor:boxColor}]}>
              <PanGestureHandler activeOffsetY={100} activeOffsetX={20}>
                <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: -33, top: -33, zIndex:10}}>
                  <TouchableOpacity onPress={()=>{if(showBlankCheckMarks){checkOff(this.props.item.checkListKeyParent, this.state.collected); this.setCollected(this.state.collected===true ? false:true);}}}>
                    <View style={{padding:15}}>
                      <Check checkType={this.props.checkType} play={this.state.collected} width={53} height={53} disablePopup={disablePopup}/>
                    </View>
                  </TouchableOpacity>
                </View>
              </PanGestureHandler>
              <CheckMuseum showMuseumButton={this.showMuseumButton} setCollected={this.setCollected} collected={this.state.collected} setMuseum={this.setMuseum} item={this.props.item} museum={this.state.museum} museumPage={this.checkMuseumButton()}/>
              <CheckVillager showVillagerButton={this.showVillagerButton} setCollected={this.setCollected} collected={this.state.collected} setVillager={this.setVillager} item={this.props.item} villager={this.state.villager} villagerPage={this.checkVillagerButton()}/>
              {this.state.amount>1 && this.state.currentCustomList !== undefined && this.state.currentCustomList !== "" ? 
                <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: 5, bottom: 5, zIndex:10}}>
                  <TextFont translate={false} numberOfLines={2} bold={true} style={{textAlign:'center', color:this.props.labelColor, fontSize:14}}>{commas(this.state.amount)+"x"}</TextFont>
                </View>
                :
                <View/>
              }
              { this.state.wishlist ?
                  <Image 
                    source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} 
                    style={{left:7, top: 7, opacity:0.7, width:17, height:17, resizeMode:"contain",position:'absolute', zIndex:10,}}
                  /> : 
                (this.state.customListsIcon==="" || this.state.customListsIcon===undefined) ? 
                  <View/> :
                (this.state.customListsIcon.constructor === String && this.state.customListsIcon.startsWith("http")) ?
                  <FastImage
                    style={{left:7, top: 7, opacity:0.7, width:22, height:22, resizeMode:"contain",position:'absolute', zIndex:10,}}
                    source={{uri:this.state.customListsIcon}}
                    cacheKey={this.state.customListsIcon}
                  /> :
                this.state.customListsIcon ?
                  <Image
                    style={{left:7, top: 7, opacity:0.7, width:20, height:20, resizeMode:"contain",position:'absolute', zIndex:10,}}
                    source={getPhoto(this.state.customListsIcon)}
                  /> :
                <View/>
              }
              { ((!this.props.avoidSpoilers||this.state.variationsPercent>0||this.state.collected||this.state.villager||this.state.villagerPhoto) && this.props.item[this.props.imageProperty[this.props.item.dataSet]]!==undefined)?(this.props.item[this.props.imageProperty[this.props.item.dataSet]].toString().startsWith("http") ? 
                <FastImage
                  style={styles.gridBoxImageLargeSmaller}
                  source={{
                    uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
                  }}
                  cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
                />:
                <Image style={styles.gridBoxImageLargeSmaller} source={getPhoto(this.props.item[this.props.imageProperty[this.props.item.dataSet]].toString().toLowerCase())}/>):
                <View style={{height:7}}/>
              }
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
            this.props.setUpdateAmountChildFunction((amount)=>{this.setAmount(amount)})

            if(global.customLists.length > 0){
              this.props.selectCustomList(this.props.item, this.setWishlist, ()=>{}, true, this.props.item[this.props.imageProperty[this.props.item.dataSet]])
            }else{
              checkOff(this.props.item.checkListKey, this.state.wishlist, "wishlist"); //true to vibrate and wishlist
              this.setWishlist(this.state.wishlist===true ? false:true);
            }
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"2A", false)}
          onPress={()=>{
              if(disablePopup){
                checkOff(this.props.item.checkListKeyParent, this.state.collected); 
                this.setCollected(this.state.collected===true ? false:true);
              } else {
                this.props.openBottomSheet(this.setCollected, this.setWishlist);
              }
            }}
          >
            <View style={[styles.row,{backgroundColor:boxColor}]}>
              {this.state.amount>1 && this.state.currentCustomList !== undefined && this.state.currentCustomList !== "" ? 
                <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: 5, bottom: 5, zIndex:10}}>
                  <TextFont translate={false} numberOfLines={2} bold={true} style={{textAlign:'center', color:this.props.labelColor, fontSize:14}}>{commas(this.state.amount)+"x"}</TextFont>
                </View>
                :
                <View/>
              }
              { this.state.wishlist ?
                  <Image 
                    source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} 
                    style={{right:7, top: 7, opacity:0.7, width:17, height:17, resizeMode:"contain",position:'absolute', zIndex:10,}}
                  /> : 
                (this.state.customListsIcon==="" || this.state.customListsIcon===undefined) ? 
                  <View/> :
                (this.state.customListsIcon.constructor === String && this.state.customListsIcon.startsWith("http")) ?
                  <FastImage
                    style={{right:7, top: 7, opacity:0.7, width:22, height:22, resizeMode:"contain",position:'absolute', zIndex:10,}}
                    source={{uri:this.state.customListsIcon}}
                    cacheKey={this.state.customListsIcon}
                  /> :
                this.state.customListsIcon ?
                  <Image
                    style={{right:7, top: 7, opacity:0.7, width:20, height:20, resizeMode:"contain",position:'absolute', zIndex:10,}}
                    source={getPhoto(this.state.customListsIcon)}
                  /> :
                <View/>
              }
              <View style={[styles.rowImageBackground,{backgroundColor:this.props.accentColor}]}>
                { ((!this.props.avoidSpoilers||this.state.variationsPercent>0||this.state.collected||this.state.villager||this.state.villagerPhoto) && this.props.item[this.props.imageProperty[this.props.item.dataSet]]!==undefined)?(this.props.item[this.props.imageProperty[this.props.item.dataSet]].toString().startsWith("http") ? 
                  <FastImage
                    style={styles.rowImage}
                    source={{
                      uri: this.props.item[this.props.imageProperty[this.props.item.dataSet]],
                    }}
                    cacheKey={this.props.item[this.props.imageProperty[this.props.item.dataSet]]}
                  />:
                  <Image style={styles.rowImage} source={getPhoto(this.props.item[this.props.imageProperty[this.props.item.dataSet]].toString().toLowerCase())}/>):
                  <View style={{height:7}}/>
                }
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
              <PanGestureHandler activeOffsetY={100} activeOffsetX={20}>
                <TouchableOpacity style={{position:"absolute", right: -5, bottom: 0}} 
                  activeOpacity={0.6}
                  onPress={() => {  
                  checkOff(this.props.item.checkListKeyParent, this.state.collected); 
                  this.setCollected(this.state.collected===true ? false:true);
                }}>
                  <Check checkType={this.props.checkType} fadeOut={false} play={this.state.collected} width={90} height={90} disablePopup={disablePopup}/>
                </TouchableOpacity>
              </PanGestureHandler>
              <CheckMuseum larger showMuseumButton={this.showMuseumButton} setCollected={this.setCollected} collected={this.state.collected} setMuseum={this.setMuseum} item={this.props.item} museum={this.state.museum} museumPage={this.checkMuseumButton()}/>
              <CheckVillager showVillagerButton={this.showVillagerButton} setCollected={this.setCollected} collected={this.state.collected} setVillager={this.setVillager} item={this.props.item} villager={this.state.villager} villagerPage={this.checkVillagerButton()}/>
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
      {this.props.museumPage?<TouchableOpacity style={{zIndex:10, position:"absolute", left: this.props.larger?-8:-10, top: this.props.larger?-8:-10, padding:15}} 
        activeOpacity={0.6}
        onPress={() => {  
        checkOff(this.props.item.checkListKey, this.props.museum, "museum");
        this.props.setMuseum(this.props.museum===true ? false:true);
        //check off if donated to museum
        if(!this.props.collected && !this.props.museum && getSettingsString("settingsAutoCheckMuseum")==="true"){
          checkOff(this.props.item.checkListKeyParent, this.props.collected); 
          this.props.setCollected(this.props.collected===true ? false:true);
        }
      }}>
        {this.props.museum?
          <FadeInOut duration={200} startValue={0} endValue={1} fadeIn={true} fadeInOut={true} scaleInOut={true} maxFade={0.8} minScale={0.2}>
            <View style={{width: this.props.larger?35:30,height: this.props.larger?35:30,borderRadius: 100,justifyContent: "center",alignItems: "center", opacity: 0.9, borderWidth: 1.3, borderColor: colors.checkGreen[global.darkMode], backgroundColor:colors.checkGreen2[global.darkMode]}}>
              <Image style={{resizeMode:'contain',width:this.props.larger?22:20, height:this.props.larger?22:20}} source={require("../assets/icons/owl.png")}/>
            </View>
          </FadeInOut>
          :
          <View style={{width: this.props.larger?35:30,height: this.props.larger?35:30,borderRadius: 100,justifyContent: "center",alignItems: "center",  opacity: 0.4, borderWidth: 1.3, borderColor: colors.lightDarkAccentHeavy[global.darkMode], backgroundColor:colors.lightDarkAccent2[global.darkMode]}}>
            <Image style={{resizeMode:'contain',width:this.props.larger?22:20, height:this.props.larger?22:20}} source={require("../assets/icons/owl.png")}/>
          </View>
        }
      </TouchableOpacity>:<View/>}
      </>
    )
  }
}


class CheckVillager extends Component {
  render(){
    if(this.props.showVillagerButton!==true){
      return <View/>
    }
    return(
      <>
      {this.props.villagerPage?<TouchableOpacity style={{zIndex:10, position:"absolute", left: -10, bottom: -10, padding:15}} 
        activeOpacity={0.6}
        onPress={() => {  
        checkOff(this.props.item.checkListKey, this.props.villager, "oldResident");
        this.props.setVillager(this.props.villager===true ? false:true);
      }}>
        {this.props.villager?
          <FadeInOut duration={200} startValue={0} endValue={1} fadeIn={true} fadeInOut={true} scaleInOut={true} maxFade={0.8} minScale={0.2}>
            <View style={{width: 28,height: 28,borderRadius: 100,justifyContent: "center",alignItems: "center", opacity: 0.9, borderWidth: 1.3, borderColor: colors.checkPurple[global.darkMode], backgroundColor:colors.checkPurple2[global.darkMode]}}>
              <Image style={{resizeMode:'contain',width:21, height:21}} source={require("../assets/icons/trolley.png")}/>
            </View>
          </FadeInOut>
          :
          <View style={{width: 28,height: 28,borderRadius: 100,justifyContent: "center",alignItems: "center",  opacity: 0.4, borderWidth: 1.3, borderColor: colors.lightDarkAccentHeavy[global.darkMode], backgroundColor:colors.lightDarkAccent2[global.darkMode]}}>
            <Image style={{resizeMode:'contain',width:21, height:21}} source={require("../assets/icons/trolley.png")}/>
          </View>
        }
      </TouchableOpacity>:<View/>}
      </>
    )
  }
}


class CheckVillagerPhoto extends Component {
  render(){
    if(this.props.showVillagerPhotoButton!==true){
      return <View/>
    }
    return(
      <>
      {this.props.villagerPage?<TouchableOpacity style={{zIndex:10, position:"absolute", left: -10, top: -10, padding:15}} 
        activeOpacity={0.6}
        onPress={() => {  
        checkOff(this.props.item.checkListKey, this.props.villager, "havePhoto");
        this.props.setVillagerPhoto(this.props.villager===true ? false:true);
      }}>
        {this.props.villager?
          <FadeInOut duration={200} startValue={0} endValue={1} fadeIn={true} fadeInOut={true} scaleInOut={true} maxFade={0.8} minScale={0.2}>
            <View style={{width: 30,height: 30,borderRadius: 100,justifyContent: "center",alignItems: "center", opacity: 0.9, borderWidth: 1.3, borderColor: colors.checkBlue[global.darkMode], backgroundColor:colors.checkBlue2[global.darkMode]}}>
              <Image style={{resizeMode:'contain',width:20, height:20}} source={require("../assets/icons/portrait.png")}/>
            </View>
          </FadeInOut>
          :
          <View style={{width: 30,height: 30,borderRadius: 100,justifyContent: "center",alignItems: "center",  opacity: 0.4, borderWidth: 1.3, borderColor: colors.lightDarkAccentHeavy[global.darkMode], backgroundColor:colors.lightDarkAccent2[global.darkMode]}}>
            <Image style={{resizeMode:'contain',width:20, height:20}} source={require("../assets/icons/portrait.png")}/>
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
    justifyContent: 'center',
    alignItems: 'center',
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
