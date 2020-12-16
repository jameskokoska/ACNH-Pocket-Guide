import React, {useState, useRef, useEffect} from 'react';
import {TouchableWithoutFeedback, Text, View, Animated, SafeAreaView, StatusBar, StyleSheet, TextInput} from 'react-native';
import Header from './Header';
import ListItem from './ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {determineDataGlobal} from "../LoadJsonData"
import BottomSheet from 'reanimated-bottom-sheet';
import {Dimensions } from "react-native";

const {diffClamp} = Animated;
const headerHeight = 130 * 2;

export default (props) =>{
  const renderItem = (({ item }) =>
    <ListItem
      item={item}
      showVariations={props.showVariations}
      imageProperty={props.imageProperty} 
      textProperty={props.textProperty}
      textProperty2={props.textProperty2}
      textProperty3={props.textProperty3}
      gridType={props.gridType}
      key={item.checkListKeyString}
      dataGlobalName={props.dataGlobalName}
      openBottomSheet={()=>{sheetRef.current.snapTo(0); openInvisibleClose()}}
      boxColor={props.boxColor}
      labelColor={props.labelColor}
      accentColor={props.accentColor}
      specialLabelColor={props.specialLabelColor}
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


  const [showInvisibleClose, setShowInvisibleClose] = useState(false);
  function openInvisibleClose(){
    console.log("open");
    setShowInvisibleClose(true)
  }

  function closedSheet(){
    console.log("CLOSE");
    setShowInvisibleClose(false)
  }

  const [search, setSearch] = useState("Search");

  function updateSearch(search){
    setSearch(search);
  }

  var dataUpdated = [];
  var previousVariation = "";
  var item;
  var dataLoaded = determineDataGlobal(props.dataGlobalName);
  for(var i = 0; i < dataLoaded.length; i++){
    item = dataLoaded[i];
    //Loop through the specific search criteria specified for this dataset
    for(var x = 0; x < props.searchKey[item.dataSet].length; x++){
      if(search==="Search" || search==="" || item.[props.searchKey[item.dataSet][x]].toLowerCase().includes(search.toLowerCase())){
        //Search result found...
        if(props.showVariations===false){
          if(item.[props.textProperty[item.dataSet]]===previousVariation){
            previousVariation = item.[props.textProperty[item.dataSet]];
          } else {
            dataUpdated = [...dataUpdated, item];
            previousVariation = item.[props.textProperty[item.dataSet]];
          }
        } else {
          dataUpdated = [...dataUpdated, item];
          break;
        }
      }
    }
  }
  var numColumns=3;
  if(props.gridType==="smallGrid"){
    numColumns=3;
  } else if (props.gridType==="largeGrid"){
    numColumns=2;
  } else if (props.gridType==="row"||props.gridType===undefined){
    numColumns=1;
  }
  
  const sheetRef = React.useRef(null);
  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor:props.backgroundColor}]}>
      <TouchableWithoutFeedback onPress={()=>{sheetRef.current.snapTo(2);}}>
        <View style={{zIndex:10, opacity: 0.5, backgroundColor:"black", position:"absolute", height: showInvisibleClose===true ? "100%":"0%", width: showInvisibleClose===true ? "100%":"0%"}}>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar backgroundColor="#1c1c1c" style="light" />
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        <Header title={props.title} headerHeight={headerHeight} updateSearch={updateSearch} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
      </Animated.View>
      <Animated.FlatList
        initialNumToRender={9}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: headerHeight*1.19, paddingLeft: 15, paddingRight: 15}}
        onScroll={handleScroll}
        ref={ref}
        data={dataUpdated}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list-item-${index}-${item.checkListKeyString}`}
        numColumns={numColumns}
      />
      
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={40}
        initialSnap={2}
        renderContent={renderContent}
        onCloseEnd={closedSheet}
      />
    </SafeAreaView>
  );
};

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
