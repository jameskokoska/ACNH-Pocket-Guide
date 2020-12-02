import React, {useState, useRef, useEffect} from 'react';
import {Text, View, Animated, SafeAreaView, StatusBar, StyleSheet, TextInput} from 'react-native';
import Header from './Header';
import ListItem from './ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {determineDataGlobal} from "../LoadJsonData"

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
  var dataLoaded = determineDataGlobal(props.dataGlobalName);
  console.log(determineDataGlobal(props.dataGlobalName)[1])
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
  console.log(props.gridType)
  if(props.gridType==="smallGrid"){
    numColumns=3;
  } else if (props.gridType==="largeGrid"){
    numColumns=2;
  } else if (props.gridType==="row"||props.gridType===undefined){
    numColumns=1;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1c1c1c" style="light" />
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        <Header title={props.title} headerHeight={headerHeight} updateSearch={updateSearch}/>
      </Animated.View>
      <Animated.FlatList
        initialNumToRender={9}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: headerHeight*1.22, paddingLeft: 15, paddingRight: 15}}
        onScroll={handleScroll}
        ref={ref}
        data={dataUpdated}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list-item-${index}-${item.checkListKeyString}`}
        numColumns={numColumns}
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
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
