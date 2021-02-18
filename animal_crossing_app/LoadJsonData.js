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
  else if(datakeyName==="dataLoadedCreatures")
    return global.dataLoadedCreatures;
  else if(datakeyName==="dataLoadedCards")
    return global.dataLoadedCards;
  else if(datakeyName==="dataLoadedMaterials")
    return global.dataLoadedMaterials;

}

export function updateDataGlobal(datakeyName, index, collected, dataSet){
  if(index===undefined||collected===undefined||dataSet===undefined){
    return;
  }
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
  else if(datakeyName==="dataLoadedCreatures")
    global.dataLoadedCreatures[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedCards")
    global.dataLoadedCards[dataSet][index].collected=collected;
  else if(datakeyName==="dataLoadedMaterials")
    global.dataLoadedMaterials[dataSet][index].collected=collected;
}

export function resetFilters(){
  var filterKeys = ["FishFilters","BugsFilters","Sea CreaturesFilters","FossilsFilters","ArtFilters","FurnitureFilters","ClothingFilters","Floor & WallsFilters","MusicFilters","EmoticonsFilters","RecipesFilters","ToolsFilters","VillagersFilters","ConstructionFilters","EverythingFilters"]
  for(var i =0; i < filterKeys.length; i++){
    AsyncStorage.setItem(filterKeys[i], "");
  }
}

export function checkOff(item, collected, dataGlobalName){
  console.log(item.checkListKey);
  if(item!==undefined){
     if(collected==="false"){
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10,220,20]) : "";
      global.collectionList.push(item.checkListKey)
    } else {
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
      collectionListRemove(item.checkListKey)
    }
    collectionListSave();
    updateDataGlobal(dataGlobalName, item.index, collected==="false" ? "true":"false", item.dataSet)
    //console.log(global.collectionList)
  }
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
    return name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
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
  global.dataLoadedCreatures = await getStorageData([
    require("./assets/data/fish.json"),
    require("./assets/data/seacreatures.json"),
    require("./assets/data/insects.json"),
  ],[
    ["fishCheckList","Name"],
    ["seaCheckList","Name"],
    ["bugCheckList","Name"]
  ],"false");
  global.dataLoadedFossils = await getStorageData([require("./assets/data/fossils.json")],[["fossilCheckList","Name"]],"false");
  global.dataLoadedArt = await getStorageData([require("./assets/data/art.json")],[["artCheckList","Name","Genuine"]],"false");
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
  global.dataLoadedCards = await getStorageData([require("./assets/data/messagecards.json")],[["cardsCheckList","Name"]],"false");
  global.dataLoadedMaterials = await getStorageData([require("./assets/data/other.json")],[["materialsCheckList","Name"]],"false");
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
    require("./assets/data/floors.json"),
    require("./assets/data/rugs.json"),
    require("./assets/data/wallpaper.json"),
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
    require("./assets/data/other.json")
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
    ["floorWallsCheckList","Name"],
    ["floorWallsCheckList","Name"],
    ["floorWallsCheckList","Name"],
    ["recipesCheckList","Name"],
    ["toolsCheckList","Name","Variation"],
    ["fishCheckList","Name"],
    ["bugCheckList","Name"],
    ["seaCheckList","Name"],
    ["fossilCheckList","Name"],
    ["artCheckList","Name","Genuine"],
    ["villagerCheckList","Name"],
    ["songCheckList","Name"],
    ["emojiCheckList","Name"],
    ["constructionCheckList","Name"],
    ["fenceCheckList","Name"],
    ["materialsCheckList","Name"]
  ],"false");
}

export function getSettingsString(key){
  if(settings!==undefined||global.settingsCurrent!==undefined){
    for(var i = 0; i<settings.length; i++){
      if(global.settingsCurrent[i]["keyName"]===key){
        return global.settingsCurrent[i]["currentValue"];
      }
    }
  }
  return 0;
}
// import {getSettingsString} from "../LoadJsonData"
// getSettingsString("settingsEnableVibrations")
export const settings = [
  {
    "keyName" : "breaker",
    "text" : "General",
  },
  {
    "keyName" : "settingsNorthernHemisphere",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/earth.png"),
    "displayName" : "Northern hemisphere",
    "description" : "Set your hemisphere, north or south. This will change the data displayed for creatures and events.",
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
    "keyName" : "breaker",
    "text" : "Creatures",
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
    "keyName" : "settingsCreaturesLeavingWarning",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/alarmClock.png"),
    "displayName" : "Creatures leaving warning",
    "description" : "Display a red warning background colour around creatures that won't be able to be caught in the next month.",
  },

  {
    "keyName" : "breaker",
    "text" : "User interface",
  },
  {
    "keyName" : "settingsAutoDarkMode",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/bulb.png"),
    "displayName" : "Dark mode - follow system",
    "description" : "Dark mode will follow system default, if your Android version does not support system dark mode, disable this and use the setting below.",
  },
  {
    "keyName" : "settingsDarkMode",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/autoMode.png"),
    "displayName" : "Dark mode",
    "description" : "Toggle dark mode, ensure auto dark mode is off to use this",
  },
  {
    "keyName" : "settingsLargerItemPreviews",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/magnifyingGlass.png"),
    "displayName" : "Use larger images in popup",
    "description" : "Use a larger image when previewing items in their popup",
  },
  {
    "keyName" : "settingsShowImageAccordion",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/photo.png"),
    "displayName" : "Show view more images in popups",
    "description" : "In creature and villager popups have the option to view Critterpedia, Furniture, Villager houses etc. images as a drop down",
  },

  {
    "keyName" : "breaker",
    "text" : "System",
  },
  {
    "keyName" : "settingsBackButtonChangePages",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/backButton.png"),
    "displayName" : "Back button to previous page",
    "description" : "Use the back button to switch pages quickly. If this is off, the back button will just open the side panel.",
  },
  {
    "keyName" : "settingsShowStatusBar",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/bell.png"),
    "displayName" : "Show notification status bar",
    "description" : "A restart may be required to see changes.",
  },
  {
    "keyName" : "settingsUse24HourClock",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/fancyClock.png"),
    "displayName" : "Use 24 hour clock",
    "description" : "Enable a 24 hour clock instead of the standard 12 hour format.",
  },
  {
    "keyName" : "settingsEnableVibrations",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/vibration.png"),
    "displayName" : "Enable haptic feedback",
    "description" : "Enable/Disable the vibrations with certain actions.",
  },
  // { //1
  //   "keyName" : "settingsSkipSplashScreen",
  //   "defaultValue" : "true",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/hourglass.png"),
  //   "displayName" : "Skip loading screen",
  //   "description" : "If enabled, the app will load more efficiently and therefore will skip most of the opening plane/balloon animation",
  // },
  {
    "keyName" : "breaker",
    "text" : "Interface layout",
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
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/scroll.png"),
    "displayName" : "Category labels on bottom",
    "description" : "Show the category tabs on the bottom, or top of the screen in list pages with multiple categories.",
  },
  // {
  //   "keyName" : "settingsUseFilters",
  //   "defaultValue" : "true",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/filter.png"),
  //   "displayName" : "Enable filters in lists",
  //   "description" : "Turning this off can increase performance of loading, for basic needs",
  // },
  // {
  //   "keyName" : "settingsLogFilterDefinitions",
  //   "defaultValue" : "false",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/filter.png"),
  //   "displayName" : "DEBUG: LOG FILTER DEFINITIONS AFTER DATABASE UPDATE",
  //   "description" : "Will output a file of the filter definitions after accessing each page",
  // },
  {
    "keyName" : "breaker",
    "text" : "Custom dates",
  },
  {
    "keyName" : "settingsUseCustomDate",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/customTime.png"),
    "displayName" : "Use a custom date",
    "description" : "Use the custom date selected when loading time-specific data.",
  },
]