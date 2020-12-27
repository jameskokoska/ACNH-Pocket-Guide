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

export async function getStorageData(data, checkListKey, defaultValue, recipes=false){
  var dataLoadingTotal = [];
  //Loop through all datasets
  for(var dataSet = 0; dataSet <data.length; dataSet++){
    var dataLoading = data[dataSet];
    var totalIndex = -1;
    //Loop through that specific dataset
    for(var i = 0; i < dataLoading.length; i++){
      totalIndex++;
      var checkListKeyString = checkListKey[dataSet][0];
      //Loop through specific checklistKey property for that dataset
      for(var x = 1; x < checkListKey[dataSet].length; x++){
        checkListKeyString += dataLoading[i].[checkListKey[dataSet][x]];
      }
      //Get value from storage
      var value=defaultValue;
      if(global.collectionList.includes(checkListKeyString)){
        value="true";
      }
      dataLoading[i].collected=value;
      dataLoading[i].checkListKey=checkListKeyString;
    }
    dataLoadingTotal.push(dataLoading);
  }
  return dataLoadingTotal;
}

export function countCollection(checkListKeyStart){
  var count = 0;
  for(var i = 0; i<global.collectionList.length; i++){
    if(global.collectionList[i].includes(checkListKeyStart)){
      count++
    }
  }
  return count;
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
  else if(datakeyName==="dataLoadedVillagers")
    return global.dataLoadedVillagers;
  else if(datakeyName==="dataLoadedFurniture")
    return global.dataLoadedFurniture;
  else if(datakeyName==="dataLoadedClothing")
    return global.dataLoadedClothing;
  else if(datakeyName==="dataLoadedFloorWalls")
    return global.dataLoadedFloorWalls;
  else if(datakeyName==="dataLoadedRecipes")
    return global.dataLoadedRecipes;
  else if(datakeyName==="dataLoadedTools")
    return global.dataLoadedTools;
  else if(datakeyName==="dataLoadedAll")
    return global.dataLoadedAll;

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
  else if(datakeyName==="dataLoadedVillagers")
    global.dataLoadedVillagers[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedFurniture")
    global.dataLoadedFurniture[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedClothing")
    global.dataLoadedClothing[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedFloorWalls")
    global.dataLoadedFloorWalls[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedRecipes")
    global.dataLoadedRecipes[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedTools")
    global.dataLoadedTools[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedAll")
    global.dataLoadedAll[dataSet][index].collected=collected;
}

export function checkOff(item, collected, dataGlobalName){
  console.log(item.checkListKey);
  if(collected==="false"){
    Vibration.vibrate([0,10,220,20]);
    global.collectionList.push(item.checkListKey)
  } else {
    Vibration.vibrate(10);
    collectionListRemove(item.checkListKey)
  }
  collectionListSave();
  updateDataGlobal(dataGlobalName, item.index, collected==="false" ? "true":"false", item.dataSet)
  //console.log(global.collectionList)
}

function collectionListRemove(checkListKey){
  if(global.collectionList.includes(checkListKey)){
    global.collectionList = global.collectionList.filter(e => e !== checkListKey)
    global.collectionList = global.collectionList.filter(e => e !== "")
  }
}

export function collectionListSave(){
  var outputString = "";
  for(var i = 0; i<global.collectionList.length; i++){
    outputString += global.collectionList[i];
    outputString += "\n";
  }
  AsyncStorage.setItem("collectedString", outputString);
}

export function capitalize(name) {
  if(name!==undefined){
    return name.replace(/\b(\w)/g, s => s.toUpperCase());
  } else {
    return "null";
  }
}

export function capitalizeFirst(name) {
  if(name!==undefined){
    return name.charAt(0).toUpperCase() + name.slice(1);
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

export async function loadGlobalData(){
  global.dataLoadedReactions = await getStorageData([require("./assets/data/reactions.json")],[["emojiCheckList","Name"]],"false");
  global.dataLoadedMusic = await getStorageData([require("./assets/data/music.json")],[["songCheckList","Name"]],"false");
  global.dataLoadedConstruction = await getStorageData([require("./assets/data/construction.json"),require("./assets/data/fencing.json")],[["constructionCheckList","Name"],["fenceCheckList","Name"]],"false");
  global.dataLoadedFish = await getStorageData([require("./assets/data/fish.json")],[["fishCheckList","Name"]],"false");
  global.dataLoadedBugs = await getStorageData([require("./assets/data/insects.json")],[["bugCheckList","Name"]],"false");
  global.dataLoadedSea = await getStorageData([require("./assets/data/seacreatures.json")],[["seaCheckList","Name"]],"false");
  global.dataLoadedFossils = await getStorageData([require("./assets/data/fossils.json")],[["fossilCheckList","Name"]],"false");
  global.dataLoadedArt = await getStorageData([require("./assets/data/art.json")],[["artCheckList","Name"]],"false");
  global.dataLoadedVillagers = await getStorageData([require("./assets/data/villagers.json")],[["villagerCheckList","Name"]],"false");
  global.dataLoadedFurniture = await getStorageData([
    require("./assets/data/housewares.json"),
    require("./assets/data/miscellaneous.json"),
    require("./assets/data/wall-mounted.json"),
    require("./assets/data/photos.json"),
    require("./assets/data/posters.json")
  ],
  [
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name"],
  ],"false");
  global.dataLoadedClothing = await getStorageData([
    require("./assets/data/headwear.json"),
    require("./assets/data/accessories.json"),
    require("./assets/data/tops.json"),
    require("./assets/data/dress-up.json"),
    require("./assets/data/clothingother.json"),
    require("./assets/data/bottoms.json"),
    require("./assets/data/socks.json"),
    require("./assets/data/shoes.json"),
    require("./assets/data/bags.json"),
    require("./assets/data/umbrellas.json")
  ],
  [
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name"],
  ],"false");
  global.dataLoadedFloorWalls = await getStorageData(
  [
    require("./assets/data/floors.json"),
    require("./assets/data/rugs.json"),
    require("./assets/data/wallpaper.json")
  ],
  [
    ["floorWallsCheckList","Name"],
    ["floorWallsCheckList","Name"],
    ["floorWallsCheckList","Name"],
  ],"false");
  global.dataLoadedTools = await getStorageData([require("./assets/data/tools.json")],[["toolsCheckList","Name","Variation"]],"false");
  global.dataLoadedRecipes = await getStorageData([require("./assets/data/recipes.json")],[["recipesCheckList","Name"]],"false");
  global.dataLoadedAll = await getStorageData(
  [
    require("./assets/data/housewares.json"),
    require("./assets/data/miscellaneous.json"),
    require("./assets/data/wall-mounted.json"),
    require("./assets/data/photos.json"),
    require("./assets/data/posters.json"),
    require("./assets/data/headwear.json"),
    require("./assets/data/accessories.json"),
    require("./assets/data/tops.json"),
    require("./assets/data/dress-up.json"),
    require("./assets/data/clothingother.json"),
    require("./assets/data/bottoms.json"),
    require("./assets/data/socks.json"),
    require("./assets/data/shoes.json"),
    require("./assets/data/bags.json"),
    require("./assets/data/umbrellas.json"),
    require("./assets/data/recipes.json"),
    require("./assets/data/tools.json"),
    require("./assets/data/fish.json"),
    require("./assets/data/insects.json"),
    require("./assets/data/seacreatures.json"),
    require("./assets/data/fossils.json"),
    require("./assets/data/art.json"),
    require("./assets/data/villagers.json"),
    require("./assets/data/music.json"),
    require("./assets/data/reactions.json"),
    require("./assets/data/construction.json"),
    require("./assets/data/fencing.json"),
  ],
  [
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name","Variation","Pattern"],
    ["furnitureCheckList","Name"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name","Variation"],
    ["clothingCheckList","Name"],
    ["recipesCheckList","Name"],
    ["toolsCheckList","Name","Variation"],
    ["fishCheckList","Name"],
    ["bugCheckList","Name"],
    ["seaCheckList","Name"],
    ["fossilCheckList","Name"],
    ["artCheckList","Name"],
    ["villagerCheckList","Name"],
    ["songCheckList","Name"],
    ["emojiCheckList","Name"],
    ["constructionCheckList","Name"],
    ["fenceCheckList","Name"],
  ],"false");
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
    "keyName" : "settingsSkipSplashScreen",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/hourglass.png"),
    "displayName" : "Skip loading screen",
    "description" : "If enabled, the app will load more efficiently and therefore will skip most of the opening plane/balloon animation",
  },
  {
    "keyName" : "settingsListOnlyActiveCreatures",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/clockIcon.png"),
    "displayName" : "List only active creatures",
    "description" : "Only creatures that can be caught in the current month will be displayed.",
  },
  {
    "keyName" : "settingsShowVariation",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/dice.png"),
    "displayName" : "Show variations in lists",
    "description" : "Show the different colours/patterns of furniture and clothing items in the list.",
  },
  {
    "keyName" : "settingsCreaturesLeavingWarning",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/alarmClock.png"),
    "displayName" : "Creatures leaving warning",
    "description" : "Display a warning colour around creatures that won't be able to be caught in the next month.",
  },
  {
    "keyName" : "settingsShowFAB",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/buttonIcon.png"),
    "displayName" : "Show floating menu button",
    "description" : "Choose to display the menu button in the bottom right corner. The menu can be opened by dragging from the left of the screen.",
  },
  {
    "keyName" : "settingsTabBarPosition",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/scroll.png"),
    "displayName" : "Category labels on bottom",
    "description" : "Show the category tabs on the bottom, or top of the screen in list pages with multiple categories.",
  },
]