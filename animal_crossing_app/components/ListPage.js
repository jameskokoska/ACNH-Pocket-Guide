import React, {Component, useState, useRef, useEffect} from 'react';
import {TouchableWithoutFeedback, Text, View, Animated, SafeAreaView, StatusBar, StyleSheet, TextInput} from 'react-native';
import Header from './Header';
import ListItem from './ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {determineDataGlobal} from "../LoadJsonData"
import BottomSheet from 'reanimated-bottom-sheet';
import {Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {InfoLineBeside, InfoLineTriple, InfoLineDouble, InfoLine, Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from './BottomSheetComponents';
import colors from "../Colors.js"
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


const {diffClamp} = Animated;
const headerHeight = 130 * 2;

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
        console.log(updateCheckChild)
        sheetRef.current.snapTo(0); 
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
    />
  )
  const ref = useRef(null);

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight/0.85); //or 1.5

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
    setSearch(search);
  }

  var dataUpdated = [];
  var previousVariation = "";
  var item;
  var dataLoaded2D = determineDataGlobal(props.dataGlobalName);
  for(var j = 0; j < dataLoaded2D.length; j++){
    var dataLoaded = dataLoaded2D[j];
    for(var i = 0; i < dataLoaded.length; i++){
      item = dataLoaded[i];
      //Loop through the specific search criteria specified for this dataset
      for(var x = 0; x < props.searchKey[j].length; x++){
        if(search==="Search" || search==="" || item.[props.searchKey[j][x]].toLowerCase().includes(search.toLowerCase())){
          //Search result found...
          if(props.showVariations[j]===false){
            //If recipes item page, and its not DIY, remove
            if(props.recipes){
              if(item["DIY"]!=="Yes"){
                continue;
              }
            }
            if(item.[props.textProperty[j]]===previousVariation){
              previousVariation = item.[props.textProperty[j]];
            } else {
              item.dataSet = j;
              item.index = i;
              dataUpdated = [...dataUpdated, item];
              previousVariation = item.[props.textProperty[j]];
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
  function renderContent() {
    return <BottomSheetRender 
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
    />;
  }

  // //if bottom sheet is really large, allow scrolling
  var bottomSheetTopPadding = 0;
  
  // if(props.popUpContainer!=undefined && props.popUpContainer[0][1]>=1000 && global.settingsCurrent[6]["currentValue"]==="false"){
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
  return (
    <SafeAreaView style={[styles.container, {backgroundColor:props.backgroundColor}]}>
      <StatusBar backgroundColor="#1c1c1c" style="light" />
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        <Header title={props.title} headerHeight={headerHeight} updateSearch={updateSearch} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
      </Animated.View>
      <Animated.FlatList
        initialNumToRender={9}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: headerHeight*1.18, paddingLeft: 15, paddingRight: 15, paddingBottom: 120}}
        onScroll={handleScroll}
        ref={ref}
        data={dataUpdated}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list-item-${index}-${item.checkListKeyString}`}
        numColumns={numColumns}
        style={{paddingBottom: Dimensions.get('window').height}}
      />
      
      <BottomSheet
        ref={sheetRef}
        snapPoints={[Dimensions.get('window').height-bottomSheetTopPadding, 0]}
        initialSnap={1}
        renderContent={renderContent}
        springConfig={springConfig}
        enabledContentTapInteraction={false}
      />
    </SafeAreaView>
  );
};

class BottomSheetRender extends Component{
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      item:"item",
    }
    this.updateCheckChildFunction;
  }
  update(item, updateCheckChildFunction){
    this.forceUpdate();
    this.setState({
      item:item,
    })
    console.log("item available to popup:")
    console.log(item)
    this.updateCheckChildFunction=updateCheckChildFunction;
  }
  render(){
    var offSetTop = 200;
    var leftCornerImage;
    if(this.props.popUpCornerImageProperty!==undefined && this.props.popUpCornerImageLabelProperty!==undefined){
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
      }
    }
    

    var popUpHeight = 400;
    if(this.props.popUpContainer!==undefined && this.state.item.dataSet!==undefined){
      popUpHeight = this.props.popUpContainer[this.state.item.dataSet][1];
    }


    //disable circular image, if really big bottom sheet
    var circularImage = <CircularImage 
      item={this.state.item}
      imageProperty={this.props.imageProperty}
      accentColor={this.props.accentColor}
    />
    if(popUpHeight >= 1000){
      circularImage = <View/>
    }
    return <View>
      <LinearGradient
        colors={['transparent','rgba(0,0,0,0.3)','rgba(0,0,0,0.3)' ]}
        style={{position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,}}
      />
      <View
        style={{
          height: Dimensions.get('window').height-popUpHeight,
        }}
      />
      <View
        style={{
          borderRadius: 50,
          backgroundColor: colors.white[colors.mode],
          padding: 16,
          height: popUpHeight,
        }}
      >
          {circularImage}
          {leftCornerImage}
          <RightCornerCheck
            item={this.state.item}
            collected={this.state.item.collected}
            dataGlobalName={this.props.dataGlobalName}
            updateCheckChildFunction={this.updateCheckChildFunction}
            checkType={this.props.checkType}
          />
          <View style={{height: 60}}/>
          {phrase}
          <Title
            item={this.state.item}
            textProperty={this.props.textProperty}
            popUpPhraseProperty={this.props.popUpPhraseProperty}
          />
          {popUpContainer}
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
