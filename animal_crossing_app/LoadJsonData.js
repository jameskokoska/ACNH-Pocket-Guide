import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Vibration, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStorage(storageKey, defaultValue){
  const valueReturned = await AsyncStorage.getItem(storageKey);
  if(valueReturned === null) {
    await AsyncStorage.setItem(storageKey, defaultValue);
    return defaultValue;
  }
  return valueReturned;
}

export async function getStorageData(data, checkListKey, defaultValue){
  var checkListKeyString = "";
  var dataLoadingTotal = [];
  //Loop through all datasets
  for(var dataSet = 0; dataSet <data.length; dataSet++){
    var dataLoading = data[dataSet];
    var totalIndex = -1;
    //Loop through that specific dataset
    for(var i = 0; i < dataLoading.length; i++){
      totalIndex++;
      checkListKeyString = checkListKey[dataSet][0]
      //Loop through specific checklistKey property for that dataset
      for(var x = 1; x < checkListKey[dataSet].length; x++){
        checkListKeyString += dataLoading[i].[checkListKey[dataSet][x]];
      }
      //Get value from storage
      const value = await AsyncStorage.getItem(checkListKeyString);
      if(value === null) {
        await AsyncStorage.setItem(checkListKeyString, defaultValue);
        value = defaultValue;
      }
      dataLoading[i].collected=value;
      dataLoading[i].checkListKey=checkListKeyString;
    }
    dataLoadingTotal.push(dataLoading);
  }
  return dataLoadingTotal;
}

export function determineDataGlobal(datakeyName){
  if(datakeyName==="dataLoadedReactions")
    return global.dataLoadedReactions;
  else if(datakeyName==="dataLoadedArt")
    return global.dataLoadedArt;
  else if(datakeyName==="dataLoadedMusic")
    return global.dataLoadedMusic;
  else if(datakeyName==="dataLoadedConstruction")
    return global.dataLoadedConstruction;
  else if(datakeyName==="dataLoadedFish")
    return global.dataLoadedFish;
  else if(datakeyName==="dataLoadedBugs")
    return global.dataLoadedBugs;
  else if(datakeyName==="dataLoadedSea")
    return global.dataLoadedSea;
  else if(datakeyName==="dataLoadedFossils")
    return global.dataLoadedFossils;
  else if(datakeyName==="dataLoadedArt")
    return global.dataLoadedArt;
}

export function updateDataGlobal(datakeyName, index, collected, dataSet){
  if(datakeyName==="dataLoadedReactions")
    global.dataLoadedReactions[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedArt")
    global.dataLoadedArt[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedMusic")
    global.dataLoadedMusic[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedConstruction")
    global.dataLoadedConstruction[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedFish")
    global.dataLoadedFish[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedBugs")
    global.dataLoadedBugs[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedSea")
      global.dataLoadedSea[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedFossils")
      global.dataLoadedFossils[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedArt")
      global.dataLoadedArt[dataSet][index].collected=collected;
}

export function checkOff(item, collected, dataGlobalName){
  if(collected==="false"){
    Vibration.vibrate([0,10,220,20]);
  } else {
    Vibration.vibrate(10);
  }
  AsyncStorage.setItem(item.checkListKey, collected==="false" ? "true":"false");
  updateDataGlobal(dataGlobalName, item.index, collected==="false" ? "true":"false", item.dataSet)
  // console.log(item.checkListKey);
  // console.log(determineDataGlobal(dataGlobalName)[item.dataSet][item.index])
  // console.log(collected);
}

export function capitalize(name) {
  if(name!==undefined){
    return name.replace(/\b(\w)/g, s => s.toUpperCase());
  } else {
    return "null";
  }
}

export function commas(number) {
  if(number!==undefined){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } else {
    return "null"
  }
}

export function removeBrackets(string){
  if(string!==undefined){
    return string.replace(/ *\([^)]*\) */g, "");
  } else {
    return "null"
  }
}

export const settings = [
  {
    "keyName" : "settingsNorthernHemisphere",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/earth.png"),
    "displayName" : "Northern hemisphere",
    "description" : "Set your hemisphere, north or south. This will change the data displayed for creatures and events.",
  },
  {
    "keyName" : "settingsAlwaysShowCatchphrase",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/speechBubble.png"),
    "displayName" : "Always show catchphrase",
    "description" : "",
  },
  {
    "keyName" : "settingsListOnlyActiveCreatures",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/clockIcon.png"),
    "displayName" : "List only active creatures",
    "description" : "",
  },
  {
    "keyName" : "settingsShowVariation",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/dice.png"),
    "displayName" : "Show variations in lists",
    "description" : "",
  },
  {
    "keyName" : "settingsCreaturesLeavingWarning",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/alarmClock.png"),
    "displayName" : "Creatures leaving warning",
    "description" : "",
  },
  {
    "keyName" : "settingsShowFAB",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/buttonIcon.png"),
    "displayName" : "Show floating menu button",
    "description" : "",
  },
  {
    "keyName" : "settingsTabBarPosition",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/scroll.png"),
    "displayName" : "Category labels on bottom",
    "description" : "Show the category tabs on the bottom, or top of the screen",
  },
]