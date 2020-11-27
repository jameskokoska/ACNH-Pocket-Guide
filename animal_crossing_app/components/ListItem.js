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

const {width} = Dimensions.get('window');

const ListItem = (props) => {
  const [collected, setCollected] = useState(props.item.collected);
  return (
    <View style={styles.gridWrapper}>
      <TouchableNativeFeedback onLongPress={() => {longPress(props.item.checkListKey, collected); setCollected(collected==="true" ? "false":"true");}}>
        <View style={styles.gridBox}>
          <View style={[styles.gridCheckMark,{opacity: collected==="true" ? 1:0}]}>
          </View>
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
};

const styles = StyleSheet.create({
  gridCheckMark:{
    position:'absolute',
    right: -4,
    top: -7,
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
  gridWrapper: {
    marginVertical: 3, 
    alignItems: 'center', 
    padding: 3
  },
  gridBoxImage: {
    height: 90,
    width: 90,
    borderRadius:5,
    marginTop: 10,
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
});

export default ListItem;

function capitalize(name) {
  return name.replace(/\b(\w)/g, s => s.toUpperCase());
}

function longPress(checkListKeyString, collected){
  Vibration.vibrate(15);
  AsyncStorage.setItem(checkListKeyString, collected==="false" ? "true":"false")
  console.log(checkListKeyString)
}