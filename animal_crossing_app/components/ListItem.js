import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  Image,
  Vibration,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextFont from './TextFont';
import FadeInOut from './FadeInOut';
import Check from './Check';

const {width} = Dimensions.get('window');

const ListItem = (props) => {
  //props.item.dataSet=0
  const [collected, setCollected] = useState(props.item.collected);
  if(props.gridType==="smallGrid"){
    return (
      <View style={styles.gridWrapper}>
        <TouchableNativeFeedback onLongPress={() => {  
          console.log(props.item);
          longPress(props.item.checkListKey, collected); 
          setCollected(collected==="true" ? "false":"true");
        }}>
          <View style={styles.gridBox}>
            <FadeInOut style={{position:'absolute', right: -4, top: -7}} fadeIn={collected==="true"} fadeInOut={false} scaleInOut={false}>
              <Check style={{position:'absolute', right: -6, top: -7}} play={collected==="true"} width={53} height={53}/>
            </FadeInOut>
            <Image
              style={styles.gridBoxImage}
              source={{
                uri: props.item.[props.imageProperty[props.item.dataSet]],
              }}
            />
            <View style={styles.gridBoxText}>
              <TextFont bold={false} style={{textAlign:'center'}}>{capitalize(props.item.[props.textProperty[props.item.dataSet]])}</TextFont>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  } else if (props.gridType==="largeGrid"){
    return( 
      <View style={styles.gridWrapper}>
        <TouchableNativeFeedback onLongPress={() => {  
          console.log(props.item);
          longPress(props.item.checkListKey, collected); 
          setCollected(collected==="true" ? "false":"true");
        }}>
          <View style={styles.gridBoxLarge}>
            <FadeInOut style={{position:'absolute', right: -4, top: -7}} fadeIn={collected==="true"} fadeInOut={false} scaleInOut={false}>
              <Check style={{position:'absolute', right: -6, top: -7}} play={collected==="true"} width={53} height={53}/>
            </FadeInOut>
            <Image
              style={styles.gridBoxImageLarge}
              source={{
                uri: props.item.[props.imageProperty[props.item.dataSet]],
              }}
            />
            <View style={styles.gridBoxTextLarge}>
              <TextFont bold={false} style={{textAlign:'center'}}>{capitalize(props.item.[props.textProperty[props.item.dataSet]])}</TextFont>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  } else { //Row component
    return( 
      <View>
        <TouchableNativeFeedback onLongPress={() => {  
          console.log(props.item);
          longPress(props.item.checkListKey, collected); 
          setCollected(collected==="true" ? "false":"true");
        }}>
          <View style={styles.row}>
            <View style={styles.rowImageBackground}>
              <Image
                style={styles.rowImage}
                source={{
                  uri: props.item.[props.imageProperty[props.item.dataSet]],
                }}
              />
            </View>
            <View style={styles.rowTextContainer}>
              <View style={styles.rowTextTop}>
                <TextFont bold={true} style={{fontSize:21}}>{capitalize(props.item.[props.textProperty[props.item.dataSet]])}</TextFont>
              </View>
              <View style={styles.rowTextBottom}>
                <TextFont bold={false} style={{fontSize:16}}>{capitalize(props.item.[props.textProperty2[props.item.dataSet]])}</TextFont>
              </View>
            </View>
            <TouchableOpacity style={{position:"absolute", right: -10}} 
              onPress={() => {  
              console.log(props.item);
              longPress(props.item.checkListKey, collected); 
              setCollected(collected==="true" ? "false":"true");
            }}>
              <Check play={collected==="true"} width={100} height={100}/>
            </TouchableOpacity>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
  
};

export default ListItem;

const styles = StyleSheet.create({

  rowTextBottom:{
    width: "100%",
    paddingLeft: 4,
    paddingRight: 3,
  },
  rowTextTop:{
    width: "100%",
    paddingLeft: 3,
    paddingRight: 3,
  },
  rowTextContainer:{
    margin:6,
    marginLeft: 10,
    marginRight: 130,
  },
  rowImageBackground:{
    width: 70,
    height: 70,
    backgroundColor: 'blue',
    borderRadius: 100,
  },
  rowImage:{
    height: 70,
    width: 70,
    resizeMode:'contain',
  },
  row: {
    padding: 13,
    alignItems: 'center',
    flexDirection:"row",
    backgroundColor: "white",
    height: 88,
    width: "100%",
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginTop: 7,
  },
  checkMark:{
    backgroundColor: "#38b548",
    borderRadius: 25,
    height: 28,
    width: 28,
    zIndex: 5,
    shadowColor: "green",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gridBoxText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    paddingLeft: 3,
    paddingRight: 3
  },
  gridBoxTextLarge: {
    flex: 1,
    width: 130,
    marginTop: 5,
    paddingLeft: 3,
    paddingRight: 3
  },
  gridWrapper: {
    marginVertical: 3, 
    alignItems: 'center', 
    flex: 1,
  },
  gridBoxImage: {
    height: 90,
    width: 90,
    borderRadius:5,
    marginTop: 10,
    resizeMode:'contain',
  },
  gridBoxImageLarge: {
    height: 150,
    width: 150,
    borderRadius:5,
    marginTop: 15,
    resizeMode:'contain',
  },
  gridBox: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    height: 150,
    width: 115,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 2,
  },
  gridBoxLarge: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    height: 200,
    width: 180,
    borderRadius:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 2,
  },
});


function capitalize(name) {
  return name.replace(/\b(\w)/g, s => s.toUpperCase());
}

function longPress(checkListKeyString, collected){
  if(collected==="false"){
    Vibration.vibrate([10,10,260,25]);
  } else {
    Vibration.vibrate(10);
  }
  AsyncStorage.setItem(checkListKeyString, collected==="false" ? "true":"false")
  console.log(checkListKeyString)
}