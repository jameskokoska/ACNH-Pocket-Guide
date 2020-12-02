import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Text} from 'react-native';
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
  var totalIndex = -1;
  for(var dataSet = 0; dataSet <data.length; dataSet++){
    var dataLoading = data[dataSet];
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
      dataLoading[i].dataSet=dataSet;
      dataLoading[i].collected=value;
      dataLoading[i].checkListKey=checkListKeyString;
      dataLoading[i].index=totalIndex;
    }
    dataLoadingTotal = dataLoadingTotal.concat(dataLoading);
  }
  return dataLoadingTotal;
}

export function determineDataGlobal(dataGlobalName){
  if(dataGlobalName==="dataLoadedReactions")
    return global.dataLoadedReactions;
  else if(dataGlobalName==="dataLoadedArt")
    return global.dataLoadedArt;
  else if(dataGlobalName==="dataLoadedMusic"){
    return global.dataLoadedMusic;
  }
}

export function updateDataGlobal(dataGlobalName, index, collected){
  if(dataGlobalName==="dataLoadedReactions")
    global.dataLoadedReactions[index].collected=collected;
  else if(dataGlobalName==="dataLoadedArt")
    global.dataLoadedArt[index].collected=collected;
  else if(dataGlobalName==="dataLoadedMusic")
    global.dataLoadedMusic[index].collected=collected;
}