import React, {useState, useRef, useEffect} from 'react';
import {Text, View, Animated, SafeAreaView, StatusBar, StyleSheet, TextInput} from 'react-native';
import Header from './Header';
import ListItem from './ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {diffClamp} = Animated;
const headerHeight = 130 * 2;

export default (props) =>{
  const ref = useRef(null);

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight/1.5);

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

  const [loading, setLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(null);
  const [search, setSearch] = useState("Search");

  function updateSearch(search){
    setSearch(search);
  }

  useEffect(() => {
    var checkListKeyString = "";
    var dataLoadingTotal = [];
    async function getData() {
      setLoading(true);
      //Loop through all datasets
      for(var dataSet = 0; dataSet < props.data.length; dataSet++){
        var dataLoading = props.data[dataSet];
        //Loop through that specific dataset
        for(var i = 0; i < dataLoading.length; i++){
          checkListKeyString = props.checkListKey[dataSet][0]
          //Loop through specific checklistKey property for that dataset
          for(var x = 1; x < props.checkListKey[dataSet].length; x++){
            checkListKeyString += dataLoading[i].[props.checkListKey[dataSet][x]];
          }
          //Get value from storage
          const value = await AsyncStorage.getItem(checkListKeyString);
          if(value === null) {
            await AsyncStorage.setItem(checkListKeyString, "false");
            value = "false";
          }
          dataLoading[i].dataSet=dataSet;
          dataLoading[i].collected=value;
          dataLoading[i].checkListKey=checkListKeyString;
        }
        dataLoadingTotal = dataLoadingTotal.concat(dataLoading);
      }
      setDataLoaded(dataLoadingTotal);
      setLoading(false);
    }
    getData();
  }, []);

  if(loading){
    return <Header title={props.title} headerHeight={headerHeight} />
  } else {
    var dataUpdated = [];
    var previousVariation = "";
    var item;
    for(var i = 0; i < dataLoaded.length; i++){
      item = dataLoaded[i];
      //Loop through the specific search criteria specified for this dataset
      for(var x = 0; x < props.searchKey[item.dataSet].length; x++){
        if(search==="Search" || search==="" || item.[props.searchKey[item.dataSet][x]].toLowerCase().includes(search.toLowerCase())){
          //Search result found...
          if(props.showVariations===false && item.[props.textProperty[item.dataSet]]===previousVariation){
            previousVariation = item.[props.textProperty[item.dataSet]];
          } else {
            dataUpdated = [...dataUpdated, item];
            previousVariation = item.[props.textProperty[item.dataSet]];
          }
        }
      }
    }
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1c1c1c" style="light" />
        <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
          <Header title={props.title} headerHeight={headerHeight} updateSearch={updateSearch}/>
        </Animated.View>
        <Animated.FlatList
          scrollEventThrottle={16}
          contentContainerStyle={{paddingTop: headerHeight*1.19}}
          onScroll={handleScroll}
          ref={ref}
          data={dataUpdated}
          renderItem={({ item }) =>
            <ListItem 
              item={item}
              showVariations={props.showVariations}
              imageProperty={props.imageProperty} 
              textProperty={props.textProperty}
            />}
          keyExtractor={(item, index) => `list-item-${index}-${item.color}`}
          numColumns={3}
          columnWrapperStyle={{justifyContent:'center'}}
        />
      </SafeAreaView>
    );
  }
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
