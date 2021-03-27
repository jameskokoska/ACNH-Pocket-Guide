import React, {Component, useState, useRef, useEffect} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, Text, View, Animated, SafeAreaView, StatusBar, StyleSheet, TextInput} from 'react-native';
import Header, {HeaderLoading, HeaderActive} from './Header';
import ListItem from './ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getInverseVillagerFilters, getCurrentVillagerFilters, determineDataGlobal, removeBrackets} from "../LoadJsonData"
import BottomSheet from 'reanimated-bottom-sheet';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import {Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {Variations, InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from './BottomSheetComponents';
import colors from "../Colors.js"
import {getCurrentDateObject, getMonthShort, isActive2} from "./DateFunctions"
import FishPopup from "../popups/FishPopup"
import SeaPopup from "../popups/SeaPopup"
import FossilPopup from "../popups/FossilPopup"
import BugPopup from "../popups/BugPopup"
import ArtPopup from "../popups/ArtPopup"
import VillagerPopup from "../popups/VillagerPopup"
import ClothingPopup from "../popups/ClothingPopup"
import FurniturePopup from "../popups/FurniturePopup"
import FloorWallsPopup from "../popups/FloorWallsPopup"
import ToolsPopup from "../popups/ToolsPopup"
import RecipesPopup from "../popups/RecipesPopup"
import MaterialsPopup from "../popups/MaterialsPopup"
import PopupFilter from './PopupFilter'
import TextFont from "./TextFont"
import {inChecklist, attemptToTranslateItem, getSettingsString, attemptToTranslate} from "../LoadJsonData"
import {PopupBottomCustom} from "./Popup"
const filterDefinitions = require("../assets/data/Generated/filterDefinitions.json");

//use tabs={false} if the page doesn't have  the tab bar

Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

const {diffClamp} = Animated;
const headerHeight = Dimensions.get('window').height*0.3;


export default (props) =>{
  const renderItem = (({ item }) =>
    <ListItem
      item={item}
      disablePopup={props.disablePopup}
      imageProperty={props.imageProperty} 
      textProperty={props.textProperty}
      textProperty2={props.textProperty2}
      textProperty3={props.textProperty3}
      gridType={props.gridType}
      key={item.checkListKeyString}
      dataGlobalName={props.dataGlobalName}
      openBottomSheet={(updateCheckChild)=>{
        if(props.currentVillagers){
          props.openPopup(item)
        } else {
          sheetRef.current.setPopupVisible(true); 
          if(props.activeCreatures){
            props.scrollViewRef.current.scrollToEnd()
          }
        }
        //pass in the check mark update function of that current element
        bottomSheetRenderRef.current.update(item, updateCheckChild)}}
      boxColor={props.boxColor}
      labelColor={props.labelColor}
      accentColor={props.accentColor}
      specialLabelColor={props.specialLabelColor}
      popUpCornerImageProperty={props.popUpCornerImageProperty}
      popUpCornerImageLabelProperty={props.popUpCornerImageLabelProperty}
      popUpPhraseProperty={props.popUpPhraseProperty}
      popUpContainer={props.popUpContainer}
      checkType={props.checkType}
      leaveWarning={props.leaveWarning}
    />
  )
  const ref = useRef(null);

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight/0.8); //or 1.5

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -(headerHeight)],
  });

  // const translateYNumber = useRef();

  // translateY.addListener(({value}) => {
  //   translateYNumber.current = value;
  // });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollY.current},
        },
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const [search, setSearch] = useState("");
  function updateSearch(search){
    // console.log(search)
    setSearch(search);
  }

  const [searchFilters, setSearchFilters] = useState([]);
  function updateSearchFilters(searchFilters){
    // console.log(search)
    setSearchFilters(searchFilters);
  }

  const [data, setData] = useState("empty")
  const [possibleFiltersState, setPossibleFilters] = useState("empty")
  const popupFilter = React.useRef(null);

  const componentIsMounted = useRef(true);
  useEffect(() => {
    return () => {
      componentIsMounted.current = false
    }
  }, [])

  useEffect(()=>{
    var dataUpdated = [];
    var previousVariation = "";
    var item;
    var dataLoaded2D = determineDataGlobal(props.dataGlobalName);

    var currentVillagerFilters;
    var currentVillagerFiltersInverse;
    if(props.title==="Obtainable DIYs" || props.title==="Obtainable Reactions" || props.title==="Unobtainable DIYs" || props.title==="Unobtainable Reactions"){
      currentVillagerFilters = getCurrentVillagerFilters();
      currentVillagerFiltersInverse = getInverseVillagerFilters();
    }

    if(possibleFiltersState==="empty"){
      var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH ";

      var possibleFilters = [{label:attemptToTranslate("Collected"), value:"Collected"},{label:attemptToTranslate("Not Collected"), value:"Not Collected"}];
      var notCraftVariationsFilters = [{label:attemptToTranslate("Show uncraftable item variations"), value:"Show uncraftable item variations"}]
      var activeFilters = [
        {label:"January can catch",value:hemispherePre+"Jan Active:true"},
        {label:"February can catch",value:hemispherePre+"Feb Active:true"},
        {label:"March can catch",value:hemispherePre+"Mar Active:true"},
        {label:"April can catch",value:hemispherePre+"Apr Active:true"},
        {label:"May can catch",value:hemispherePre+"May Active:true"},
        {label:"June can catch",value:hemispherePre+"Jun Active:true"},
        {label:"July can catch",value:hemispherePre+"Jul Active:true"},
        {label:"August can catch",value:hemispherePre+"Aug Active:true"},
        {label:"September can catch",value:hemispherePre+"Sep Active:true"},
        {label:"October can catch",value:hemispherePre+"Oct Active:true"},
        {label:"November can catch",value:hemispherePre+"Nov Active:true"},
        {label:"December can catch",value:hemispherePre+"Dec Active:true"},
      ]
      if(props.title==="Fish"){
        possibleFilters = [...possibleFilters, ...activeFilters, ...filterDefinitions["Fish"]];
      } else if(props.title==="Bugs"){
        possibleFilters = [...possibleFilters, ...activeFilters, ...filterDefinitions["Bugs"]];
      } else if(props.title==="Sea Creatures"){
        possibleFilters = [...possibleFilters, ...activeFilters, ...filterDefinitions["Sea Creatures"]];
      } else if(props.title==="Furniture"){
        possibleFilters = [...possibleFilters, ...notCraftVariationsFilters, ...filterDefinitions["Furniture"]];
      } else if(props.title==="Clothing"){
        possibleFilters = [...possibleFilters, ...notCraftVariationsFilters, ...filterDefinitions["Clothing"]];
      } else if(props.title==="Floor & Walls"){
        possibleFilters = [...possibleFilters, ...filterDefinitions["Floor & Walls"]];
      } else if(props.title==="Emoticons"){
        possibleFilters = [...possibleFilters, ...filterDefinitions["Reactions"]];
      } else if(props.title==="Recipes"){
        possibleFilters = [...possibleFilters, ...filterDefinitions["Recipes"]];
      } else if(props.title==="Villagers"){
        possibleFilters = [...possibleFilters, ...filterDefinitions["Villagers"]];
      } else if(props.title==="Everything"){
        possibleFilters = [...possibleFilters, ...notCraftVariationsFilters, ...activeFilters, ...filterDefinitions["All Items"]];
      } else if(props.title==="Construction"){
        possibleFilters = [...possibleFilters,{"label":"Bridge","value":"Category:Bridge"},{"label":"Incline","value":"Category:Incline"},{"label":"Doors","value":"Category:Door"},{"label":"Roofing","value":"Category:Roofing"},{"label":"Siding","value":"Category:Siding"},{"label":"Mailbox","value":"Category:Mailbox"}]
      } else if(props.title==="Music"){
        possibleFilters = [...possibleFilters, ...filterDefinitions["Music"]]
      } else if(props.villagerGifts===true){
        possibleFilters = [{"label":"Villager can wear","value":"Villager Equippable:Yes"},{"label":"Villager cannot wear","value":"Villager Equippable:No"}]
      }
      if (componentIsMounted.current) {
        setPossibleFilters(possibleFilters);
      }
    } else if (getSettingsString("settingsUseFilters")==="false") {
      if (componentIsMounted.current) {
        setPossibleFilters([{label:"Filters turned off - Enable them in the settings", value:""}]);
      }
    }
    
    
    console.log(search)
    for(var j = 0; j < dataLoaded2D.length; j++){
      var dataLoaded = dataLoaded2D[j];
      
      if(getSettingsString("settingsSortAlphabetically")==="true"){
        var dataLoadedCopy = dataLoaded.slice(0);
        dataLoadedCopy.sort(function(a, b) {
          var textA = a.NameLanguage.toUpperCase();
          var textB = b.NameLanguage.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        dataLoaded = dataLoadedCopy
      }

      for(var i = 0; i < dataLoaded.length; i++){
        item = dataLoaded[i];
        //Loop through the specific search criteria specified for this dataset
        for(var x = 0; x < props.searchKey[j].length; x++){
          var searchFound = false;
          var filterFound = false;
          var searchActual = searchFilters;
          if(props.filterCollectedOnly){
            searchActual = ["Collected"];
          } else if (props.newItems){
            searchActual = ["New version"];
          } else if (props.wishlistItems){
            searchActual = ["Wishlist"];
          } else if (props.villagerGifts) {
            searchActual = [...props.villagerGiftsFilters,...searchActual];
          } else if (props.title==="Obtainable DIYs" || props.title==="Obtainable Reactions") {
            searchActual = [...currentVillagerFilters,...searchActual];
          } else if (props.title==="Unobtainable DIYs" || props.title==="Unobtainable Reactions") {
            searchActual = [...currentVillagerFiltersInverse,...searchActual];
          } 
          for(var z = 0; z < searchActual.length; z++){
            if(searchActual.includes("New version") && props.newItems && item["Version Added"] !==undefined && item["Version Added"] !=="NA" && item["Version Added"]===global.gameVersion){
              filterFound = true;
              break;
            } else if (searchActual.includes("New version") && props.newItems){
              filterFound = false;
              break;
            } else if(searchActual.includes("Wishlist") && props.wishlistItems && global.collectionList.includes("wishlist"+item.["checkListKey"])){
              filterFound = true;
            } else if (searchActual.includes("Wishlist") && props.wishlistItems){
              filterFound = false;
              break;
            } else if((props.villagerGifts===true && item.["Color 1"]!==undefined && item.["Color 2"]!==undefined && item.["Style 1"]!==undefined && item.["Style 2"]!==undefined) &&
              (item.["Color 1"].includes(searchActual[0])  || 
              item.["Color 2"].includes(searchActual[1])  || 
              item.["Color 2"].includes(searchActual[0])  || 
              item.["Color 1"].includes(searchActual[1])   ) && (
              item.["Style 1"].includes(searchActual[2])  || 
              item.["Style 2"].includes(searchActual[3])  || 
              item.["Style 2"].includes(searchActual[2])  || 
              item.["Style 1"].includes(searchActual[3])  ) && ((searchActual.length===4)||((item.["Villager Equippable"]==="Yes" && searchActual.includes("Villager Equippable:Yes")) || (item.["Villager Equippable"]==="No" && searchActual.includes("Villager Equippable:No"))))
            ){
              filterFound = true;
              break;
            } else if(props.villagerGifts===true){
              filterFound = false;
              break;
            }
            //If the property is in search, not needed
            // if(props.searchKey[j].includes(search[z].split("-")[0])){
            //If property is Collected
            var searchCollected = true;
            if(searchActual.includes("Collected") || props.filterCollectedOnly){
              searchCollected = false;
              if(global.collectionList.includes(item.["checkListKey"])){
                searchCollected = true;
                if(searchActual.length===1 || props.filterCollectedOnly){
                  filterFound = true;
                  //Only check collected filter
                  if(searchCollected && props.filterCollectedOnly){
                    filterFound = true;
                    break;
                  }
                  break;
                }
              }
            } else if(searchActual.includes("Not Collected")){
              searchCollected = false;
              if(!global.collectionList.includes(item.["checkListKey"])){
                searchCollected = true;
                if(searchActual.length===1){
                  filterFound = true;
                  break;
                }
              }
            }
            if(searchActual.includes("Collected")&&searchActual.includes("Not Collected")){
              searchCollected=true;
            }
            if(searchCollected && searchActual.includes("Show uncraftable item variations")&&item["Kit Cost"] !==undefined && item["Variation"] !==undefined && item["Variant ID"] !==undefined && item["Kit Cost"] ==="NA" && (item["Variation"]!=="NA"||item["Variant ID"] !== "NA")){
              filterFound = true;
            }
            //special case for categories
            if(props.title==="Obtainable DIYs" || props.title==="Obtainable Reactions" || props.title==="Unobtainable DIYs" || props.title==="Unobtainable Reactions"){
              if(searchCollected && item.[searchActual[z].split(":")[0]]!==undefined && item.[searchActual[z].split(":")[0]].toLowerCase()===searchActual[z].split(":")[1].toLowerCase()){
                if((props.title==="Obtainable DIYs" || props.title==="Unobtainable DIYs") && item.checkListKey.includes("recipesCheckList")){
                  filterFound = true;
                  break;
                } else if((props.title==="Obtainable Reactions" || props.title==="Unobtainable Reactions") && item.checkListKey.includes("emojiCheckList")){
                  filterFound = true;
                  break;
                } else {
                  filterFound = false;
                  continue;
                }
              } else {
                filterFound = false;
                continue;
              }
            }
            //Only check the property selected
            else if((searchCollected) && item.[searchActual[z].split(":")[0]]!==undefined && item.[searchActual[z].split(":")[0]].toLowerCase()===searchActual[z].split(":")[1].toLowerCase()){
              filterFound = true;
              break;
            }
            // }
          }

          if(item.[props.searchKey[j][x]]!==undefined){
            //Translate search attribute from database
            //Search translations done here
            // searchFound = attemptToTranslateItem(item.[props.searchKey[j][x]]).toLowerCase().includes(search.toLowerCase())
            searchFound = item.[props.searchKey[j][x]].toLowerCase().includes(search.toLowerCase())
          }
          //&&((!props.wishlistItems&&!props.filterCollectedOnly&&!props.newItems)||searchFound)
          if((search==="" || searchFound) && (filterFound || searchActual.length === 0)){
            //Search result found...
              //If recipes item page, and its not DIY, remove
              if(props.recipes){
                if(item["DIY"]!=="Yes"){
                  continue;
                }
              }
              //If current active creatures, don't add it if not active
              if(props.activeCreatures){
                var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH "
                var currentMonthShort = getMonthShort(getCurrentDateObject().getMonth());
                if(!isActive2(item[hemispherePre+currentMonthShort],getCurrentDateObject().getHours())){
                  continue;
                }
              }
              //If list only active creatures for the month, don't add it if === NA
              //This is now done through filtering
              // if(props.activeCreaturesMonth && getSettingsString("settingsListOnlyActiveCreatures") === "true"){
              //   var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH "
              //   var currentMonthShort = getMonthShort(getCurrentDateObject().getMonth());
              //   if(item[hemispherePre+currentMonthShort]==="NA"){
              //     continue;
              //   }
              // }
              // if(item.[props.textProperty[j]]===previousVariation){
              //   previousVariation = item.[props.textProperty[j]];
              if(item["Name"]===previousVariation){
                previousVariation = item["Name"];
              } else {
                item.dataSet = j;
                item.index = i;
                dataUpdated = [...dataUpdated, item];
                // previousVariation = item.[props.textProperty[j]];
                previousVariation = item["Name"];
              }
            // } else {
            //   item.dataSet = j;
            //   item.index = i;
            //   dataUpdated = [...dataUpdated, item];
            //   break;
            // }
          }
        }
      }
    }
    if (componentIsMounted.current) {
      setData(dataUpdated)
    }
  }, [props, search, searchFilters])
  
  var numColumns=3;
  if(props.gridType==="smallGrid"){
    numColumns=3;
  } else if (props.gridType==="largeGrid" || props.gridType==="largeGridSmaller"){
    numColumns=2;
  } else if (props.gridType==="row"||props.gridType===undefined){
    numColumns=1;
  }
  
  const sheetRef = React.useRef(null);
  const bottomSheetRenderRef = React.useRef(null);

  // //if bottom sheet is really large, allow scrolling
  var bottomSheetTopPadding = 0;
  
  // if(props.popUpContainer!=undefined && props.popUpContainer[0][1]>=1000 && getSettingsValue("settingsTabBarPosition")==="false"){
  //   bottomSheetTopPadding = 70;
  // }

  const springConfig = {
      damping: 20,
      mass: 1,
      stiffness: 135,
      overshootClamping: true,
      restSpeedThreshold: 0.01,
      restDisplacementThreshold: 0.001
  };
  var header = (<>
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        {/* <Animated.View style={{zIndex:99, 
          transform: [
              { scale: Animated.multiply(1/headerHeight,scrollY.current) },
              { rotate: '0deg'},
            ],
          width: Dimensions.get('window').width, 
          height: Dimensions.get('window').height, position:"absolute"}} 
        pointerEvents="none"> */}
        <Header smallerHeader={props.smallerHeader} disableFilters={props.disableFilters} customHeader={props.customHeader} disableSearch={props.disableSearch} subHeader={props.subHeader} searchFilters={searchFilters} openPopupFilter={() => {popupFilter.current.setPopupVisible(true)}} title={props.title} headerHeight={headerHeight} updateSearch={updateSearch} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
        {/* </Animated.View> */}
      </Animated.View>

    </>);
  var paddingTop = headerHeight*1.18;
  var paddingBottom = Dimensions.get('window').height;
  if (props.title==="" && !props.activeCreatures){
    header = <View/>;
    paddingTop = 20;
    paddingBottom = 20;
  } else if (props.activeCreatures){
    paddingTop = 0;
    paddingBottom = 0;
    header = (<>
        <HeaderActive searchFilters={searchFilters} openPopupFilter={() => {popupFilter.current.setPopupVisible(true)}} title={props.title} headerHeight={headerHeight} updateSearch={updateSearch} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
    </>);
  }
  var style= {height: Dimensions.get('window').height, paddingBottom: paddingBottom,marginTop: -10}
  var paddingBottomContent = 150;
  if(props.currentVillagers){
    style={paddingBottom: paddingBottom,marginTop: -10}
    paddingBottomContent = 10;
  }
  if(data==="empty" && (props.title==="Active Creatures"||props.title==="")){
    return(
      <View/>
    )
  }else if(data==="empty"){
    return(<>
        <HeaderLoading disableSearch={props.disableSearch} title={props.title} headerHeight={headerHeight} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
      </>
    )
  } else if (data.length===0 && props.filterCollectedOnly && props.currentVillagers){
    return(<>
      <View style={{height:10}}/>
      <TouchableOpacity onPress={() => props.setPage(8)}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"You have no villagers added"}</TextFont>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>Tap here and go add some</TextFont>
      </TouchableOpacity>
      <View style={{height:30}}/>
    </>)
  } else if (data.length===0 && props.wishlistItems && search===""){
    return(<>
      <View style={{height:10}}/>
      {header}
      <View style={{height:Dimensions.get('window').height/2}}/>
      <TouchableOpacity onPress={() => props.setPage(1)}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"You have no wishlist items."}</TextFont>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"Long press items to add them to your wishlist."}</TextFont>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>Tap here and go add some</TextFont>
      </TouchableOpacity>
      <View style={{height:30}}/>
    </>)
  } else {
    return (
    <View style={{backgroundColor:props.backgroundColor}} >
      {header}
      <PopupFilter title={props.title} ref={popupFilter} possibleFilters={possibleFiltersState} filterSearchable={props.filterSearchable} updateSearchFilters={updateSearchFilters}/> 
      {/* setFilterPopupState(false) */}
      <Animated.FlatList
        nestedScrollEnabled
        initialNumToRender={8}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: paddingTop+10, paddingLeft: 15, paddingRight: 15, paddingBottom: paddingBottomContent}}
        onScroll={handleScroll}
        ref={ref}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list-item-${index}-${item.checkListKeyString}`}
        numColumns={numColumns}
        style={style}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={500}
        windowSize={10}
      />
      
      <PopupBottomCustom
        ref={sheetRef}
        padding={0}
        invisible={true}
        restrictSize={false}
      >
        <BottomSheetRender 
          setVillagerGift={props.setVillagerGift}
          activeCreatures={props.activeCreatures}
          ref={bottomSheetRenderRef}
          imageProperty={props.imageProperty} 
          textProperty={props.textProperty}
          textProperty2={props.textProperty2}
          textProperty3={props.textProperty3}
          dataGlobalName={props.dataGlobalName}
          boxColor={props.boxColor}
          labelColor={props.labelColor}
          accentColor={props.accentColor}
          specialLabelColor={props.specialLabelColor}
          popUpCornerImageProperty={props.popUpCornerImageProperty}
          popUpCornerImageLabelProperty={props.popUpCornerImageLabelProperty}
          popUpPhraseProperty={props.popUpPhraseProperty}
          popUpContainer={props.popUpContainer}
          checkType={props.checkType}
          tabs={props.tabs}
        />
      </PopupBottomCustom>
    </View>
  );
  }
  
};

class BottomSheetRender extends Component{
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      item:"item",
    }
    this.updateCheckChildFunction="";
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  update(item, updateCheckChildFunction){
    if(this.mounted){
      this.forceUpdate();
      this.setState({
        item:item,
      })
      console.log("item available to popup:")
      console.log(item)
      if(item!==undefined){
        this.updateCheckChildFunction=updateCheckChildFunction;
      }
    }
  }
  updateVariations = (key,checked)=>{
    this.variations.updateVariations(key,checked);
  }
  updateRightCornerCheck= (key,checked)=>{
    this.rightCornerCheck.updateRightCornerCheck(key,checked);
  }
  render(){
    var leftCornerImage;
    if(this.props.popUpCornerImageProperty!==undefined && this.props.popUpCornerImageLabelProperty!==undefined && this.state.item.dataSet!==undefined && this.props.popUpCornerImageProperty[this.state.item.dataSet]!==""){
      leftCornerImage = <LeftCornerImage
        item={this.state.item}
        accentColor={this.props.accentColor}
        popUpCornerImageProperty={this.props.popUpCornerImageProperty}
        popUpCornerImageLabelProperty={this.props.popUpCornerImageLabelProperty}
      />
    }else{
      leftCornerImage = <View/>
    }

    var phrase;
    if(this.props.popUpPhraseProperty!==undefined){
      phrase = <Phrase
        item={this.state.item}
        popUpPhraseProperty={this.props.popUpPhraseProperty}
        specialLabelColor={this.props.specialLabelColor}
      />
    } else {
      phrase = <View/>
    }

    
    //Add popup classes here
    var popUpContainer = <View/>
    if(this.props.popUpContainer!==undefined && this.state.item.dataSet!==undefined){
      if(this.props.popUpContainer[this.state.item.dataSet][0]==="FishPopup"){
        popUpContainer = <FishPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="SeaPopup"){
        popUpContainer = <SeaPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="FossilPopup"){
        popUpContainer = <FossilPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="BugPopup"){
        popUpContainer = <BugPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="ArtPopup"){
        popUpContainer = <ArtPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="VillagerPopup"){
        popUpContainer = <VillagerPopup item={this.state.item} setVillagerGift={this.props.setVillagerGift}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="ClothingPopup"){
        popUpContainer = <ClothingPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="FurniturePopup"){
        popUpContainer = <FurniturePopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="FloorWallsPopup"){
        popUpContainer = <FloorWallsPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="ToolsPopup"){
        popUpContainer = <ToolsPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="RecipesPopup"){
        popUpContainer = <RecipesPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="MaterialsPopup"){
        popUpContainer = <MaterialsPopup item={this.state.item}/>
      }
    } else {
      return <View/>
    }
    
    var rightCornerCheck = <View/>
    if(this.state.item!==undefined && this.updateCheckChildFunction!==""){
      rightCornerCheck = <RightCornerCheck
        item={this.state.item}
        updateCheckChildFunction={this.updateCheckChildFunction}
        checkType={this.props.checkType}
        updateVariations={this.updateVariations}
        ref={(rightCornerCheck) => this.rightCornerCheck = rightCornerCheck}
      />
    }
    return <View>
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: colors.white[global.darkMode],
          padding: 16,
          marginTop: getSettingsString("settingsLargerItemPreviews")==="false" ? 100 : 200,
        }}
      >
          <CircularImage 
            item={this.state.item}
            imageProperty={this.props.imageProperty}
            accentColor={this.props.accentColor}
          />
          {leftCornerImage}
          {rightCornerCheck}
          <View style={{height: 60}}/>
          {phrase}
          <Title
            item={this.state.item}
            textProperty={this.props.textProperty}
            popUpPhraseProperty={this.props.popUpPhraseProperty}
          />
          <Variations 
            updateRightCornerCheck={this.updateRightCornerCheck}
            ref={(variations) => this.variations = variations}
            item={this.state.item}
            updateCheckChildFunction={this.updateCheckChildFunction}
            imageProperty={this.props.imageProperty} 
            globalDatabase={dataLoadedAll} 
          />
          {popUpContainer}
          {this.props.activeCreatures===true ? <View style={{height:50}}/> : <View/>}
          {this.props.tabs===false ? <View style={{height:50}}/> : <View style={{height:100}}/>}
      </View>
    </View>
  }
}

const styles = StyleSheet.create({
  text:{
      color:"white"
  },
  header: {
    position: 'absolute',
    backgroundColor: '#1c1c1c',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
  subHeader: {
    height: headerHeight / 2,
    width: '100%',
    paddingHorizontal: 10,
  },
});
