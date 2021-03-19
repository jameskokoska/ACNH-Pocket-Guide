import React, {Component, useState, useRef, useEffect} from 'react';
import {TouchableOpacity, TouchableWithoutFeedback, Text, View, Animated, SafeAreaView, StatusBar, StyleSheet, TextInput} from 'react-native';
import Header, {HeaderLoading, HeaderActive} from './Header';
import ListItem from './ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {determineDataGlobal, removeBrackets} from "../LoadJsonData"
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
import * as exports from "./FilterDefinitions"
import PopupFilter from './PopupFilter'
import TextFont from "./TextFont"
import {getSettingsString} from "../LoadJsonData"
import {PopupBottomCustom} from "./Popup"
//Note: popup height is not needed anymore
//use tabs={false} if the page doesn't have  the tab bar

Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

const {diffClamp} = Animated;
const headerHeight = Dimensions.get('window').height*0.3;

async function exportFilters(data, title){
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    var fileUri = FileSystem.documentDirectory + "ACNHPocketGuideDataFilterDefinition"+title+".txt";
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), { encoding: FileSystem.EncodingType.UTF8 });
    const asset = await MediaLibrary.createAssetAsync(fileUri)
    await MediaLibrary.createAlbumAsync("Download", asset, false)
  }
}

export default (props) =>{
  const renderItem = (({ item }) =>
    <ListItem
      item={item}
      disablePopup={props.disablePopup}
      showVariations={props.showVariations}
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

  const [search, setSearch] = useState("Search");
  function updateSearch(search){
    // console.log(search)
    setSearch(search);
  }

  const [data, setData] = useState("empty")
  const [possibleFiltersState, setPossibleFilters] = useState("empty")
  const popupFilter = React.useRef(null);

  useEffect(()=>{
    var dataUpdated = [];
    var previousVariation = "";
    var item;
    var dataLoaded2D = determineDataGlobal(props.dataGlobalName);
    if(possibleFiltersState==="empty"){
      var possibleFilters = [];
      if(getSettingsString("settingsLogFilterDefinitions")==="true"){
        var currentFilter;
        if(props.filters!==undefined){
          for(var x = 0; x < props.filters.length; x++){
            for(var j = 0; j < dataLoaded2D.length; j++){
              var dataLoaded = dataLoaded2D[j];
              for(var i = 0; i < dataLoaded.length; i++){
                item = dataLoaded[i];
                currentFilter = {label:"", value:""};
                var found = false;
                for(var y = 0; y < possibleFilters.length; y++){
                  if(possibleFilters[y].value===props.filters[x] + ":" +removeBrackets(item[props.filters[x]])){
                    found = true;
                  }
                }
                if(!found && item[props.filters[x]]!==undefined){
                  currentFilter.label = props.filters[x] + " - " +removeBrackets(item[props.filters[x]]);
                  currentFilter.value = props.filters[x] + ":" +removeBrackets(item[props.filters[x]]);
                  possibleFilters.push(currentFilter)
                }
              }
            }
          }
        }
        setPossibleFilters(possibleFilters)
        exportFilters(possibleFilters, props.title)
      } else {
        var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH ";

        var possibleFilters = [{label:"Collected", value:"Collected"},{label:"Not Collected", value:"Not Collected"}];
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
          possibleFilters = [...possibleFilters, ...activeFilters, ...fishFilter];
        } else if(props.title==="Bugs"){
          possibleFilters = [...possibleFilters, ...activeFilters, ...bugsFilter];
        } else if(props.title==="Sea Creatures"){
          possibleFilters = [...possibleFilters, ...activeFilters, ...seaCreaturesFilter];
        } else if(props.title==="Furniture"){
          possibleFilters = [...possibleFilters, ...furnitureFilter];
        } else if(props.title==="Clothing"){
          possibleFilters = [...possibleFilters, ...clothingFilter];
        } else if(props.title==="Floor & Walls"){
          possibleFilters = [...possibleFilters, ...floorWallsFilter];
        } else if(props.title==="Emoticons"){
          possibleFilters = [...possibleFilters, ...emoticonsFilter];
        } else if(props.title==="Recipes"){
          possibleFilters = [...possibleFilters, ...recipesFilter];
        } else if(props.title==="Villagers"){
          possibleFilters = [...possibleFilters, ...villagersFilter];
        } else if(props.title==="Everything"){
          possibleFilters = [...possibleFilters, ...activeFilters, ...everythingFilter];
        } else if(props.title==="Construction"){
          possibleFilters = [...possibleFilters,{"label":"Bridge","value":"Category:Bridge"},{"label":"Incline","value":"Category:Incline"},{"label":"Doors","value":"Category:Door"},{"label":"Roofing","value":"Category:Roofing"},{"label":"Siding","value":"Category:Siding"},{"label":"Mailbox","value":"Category:Mailbox"}]
        }
        setPossibleFilters(possibleFilters);
      }
    } else if (getSettingsString("settingsUseFilters")==="false") {
      setPossibleFilters([{label:"Filters turned off - Enable them in the settings", value:""}]);
    }
    
    
    for(var j = 0; j < dataLoaded2D.length; j++){
      var dataLoaded = dataLoaded2D[j];
      for(var i = 0; i < dataLoaded.length; i++){
        item = dataLoaded[i];
        //Loop through the specific search criteria specified for this dataset
        for(var x = 0; x < props.searchKey[j].length; x++){
          var searchFound = false;
          if((search.constructor===Array && search.length !== 0) || props.filterCollectedOnly){
            for(var z = 0; z < search.length; z++){
              //If the property is in search, not needed
              // if(props.searchKey[j].includes(search[z].split("-")[0])){
                //If property is Collected
                var searchCollected = true;
                if(search.includes("Collected") || props.filterCollectedOnly){
                  searchCollected = false;
                  if(global.collectionList.includes(item.["checkListKey"])){
                    searchCollected = true;
                    if(search.length===1 || props.filterCollectedOnly){
                      searchFound = true;
                      //Only check collected filter
                      if(searchCollected && props.filterCollectedOnly){
                        searchFound = true;
                        break;
                      }
                      break;
                    }
                  }
                } else if(search.includes("Not Collected")){
                  searchCollected = false;
                  if(!global.collectionList.includes(item.["checkListKey"])){
                    searchCollected = true;
                    if(search.length===1){
                      searchFound = true;
                      break;
                    }
                  }
                }
                if(search.includes("Collected")&&search.includes("Not Collected")){
                  searchCollected=true;
                }
                //Only check the property selected
                if(searchCollected && item.[search[z].split(":")[0]]!==undefined && item.[search[z].split(":")[0]].toLowerCase().includes(search[z].split(":")[1].toLowerCase())){
                  searchFound = true;
                  break;
                }
              // }
            }
          } else if (search.constructor===Array && search.length === 0){
            searchFound = true;
          } else {
            if(item.[props.searchKey[j][x]]!==undefined){
              searchFound = item.[props.searchKey[j][x]].toLowerCase().includes(search.toLowerCase())
            }
          }
          if((search==="Search" || search==="" || searchFound)&&(!props.filterCollectedOnly||searchFound)){
            //Search result found...
            if(props.showVariations[j]===false){
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
              if(props.activeCreaturesMonth && getSettingsString("settingsListOnlyActiveCreatures") === "true"){
                var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH "
                var currentMonthShort = getMonthShort(getCurrentDateObject().getMonth());
                if(item[hemispherePre+currentMonthShort]==="NA"){
                  continue;
                }
              }
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
            } else {
              item.dataSet = j;
              item.index = i;
              dataUpdated = [...dataUpdated, item];
              break;
            }
          }
        }
      }
    }
    
    setData(dataUpdated)
  }, [props, search])
  
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
        <Header search={search} openPopupFilter={() => {popupFilter.current.setPopupVisible(true)}} title={props.title} headerHeight={headerHeight} updateSearch={updateSearch} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
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
        <HeaderActive search={search} openPopupFilter={() => {popupFilter.current.setPopupVisible(true)}} title={props.title} headerHeight={headerHeight} updateSearch={updateSearch} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
    </>);
  }
  var style= {height: Dimensions.get('window').height, paddingBottom: paddingBottom,marginTop: -10}
  var paddingBottomContent = 150;
  if(props.currentVillagers){
    style={paddingBottom: paddingBottom,marginTop: -10}
    paddingBottomContent = 10;
  }
  if(data==="empty"){
    return(<>
        <HeaderLoading title={props.title} headerHeight={headerHeight} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
      </>
    )
  } else if (data.length===0 && props.filterCollectedOnly){
    return(<>
      <View style={{height:10}}/>
      <TouchableOpacity onPress={() => props.setPage(8)}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"You have no villagers added"}</TextFont>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>Tap here and go add some</TextFont>
      </TouchableOpacity>
      <View style={{height:30}}/>
    </>)
  } else {
    return (
    <View style={{backgroundColor:props.backgroundColor}} >
      {header}
      <PopupFilter title={props.title} ref={popupFilter} possibleFilters={possibleFiltersState} filterSearchable={props.filterSearchable} updateSearch={updateSearch}/> 
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
  update(item, updateCheckChildFunction){
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
        popUpContainer = <VillagerPopup item={this.state.item}/>
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
        collected={this.state.item.collected}
        dataGlobalName={this.props.dataGlobalName}
        updateCheckChildFunction={this.updateCheckChildFunction}
        checkType={this.props.checkType}
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
            item={this.state.item}
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
