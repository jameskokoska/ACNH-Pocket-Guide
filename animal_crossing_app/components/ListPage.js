import React, {useState, useRef, useEffect} from 'react';
import {Text, View, Animated, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
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
  useEffect(() => {
    var checkListKeyString = "";
    var checkListKey = props.checkListKey.split(",");
    async function getData() {
      setLoading(true);
      var dataLoading = props.data;
      for(var i = 0; i < dataLoading.length; i++){
        checkListKeyString = checkListKey[0]
        for(var x = 1; x < checkListKey.length; x++){
          checkListKeyString += dataLoading[i].[checkListKey[x]];
        }
        const value = await AsyncStorage.getItem(checkListKeyString)
        if(value === null) {
          await AsyncStorage.setItem(checkListKeyString, "false")
        }
        dataLoading[i].collected=value;
        dataLoading[i].checkListKey=checkListKeyString;
        
      }
      setDataLoaded(props.data);
      setLoading(false);
    }
    getData();
  }, []);

  if(loading){
    return <Header title={props.title} headerHeight={headerHeight} />
  } else {
    var dataUpdated = dataLoaded;
    var previousVariation = "";
    var item;
    for(var i = 0; i < dataLoaded.length; i++){
      item = dataLoaded[i];
      if(props.showVariations===false && item.[props.textProperty]===previousVariation){
        previousVariation = item.[props.textProperty];
        dataUpdated.splice(i,1);
      } else {
        previousVariation = item.[props.textProperty];
      }
    }
    var one = dataLoaded[0].collected;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1c1c1c" style="light" />
        <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
          <Header title={props.title} headerHeight={headerHeight} />
        </Animated.View>
        <Animated.FlatList
          scrollEventThrottle={16}
          contentContainerStyle={{paddingTop: headerHeight*1.19}}
          onScroll={handleScroll}
          ref={ref}
          data={dataLoaded}
          renderItem={({ item }) =>
            <ListItem 
              item={item}
              showVariations={props.showVariations}
              imageProperty={props.imageProperty} 
              textProperty={props.textProperty}
              variationProperty="Genuine"
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
