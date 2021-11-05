import {Vibration,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doWeSwapDate,} from "./components/DateFunctions";
import {howManyVariationsChecked, getVariations} from "./components/BottomSheetComponents"
import * as Localization from 'expo-localization';
import * as FileSystem from 'expo-file-system'

export async function getStorage(storageKey, defaultValue){
  const valueReturned = await AsyncStorage.getItem(storageKey);
  if(valueReturned === null || valueReturned === undefined) {
    await AsyncStorage.setItem(storageKey, defaultValue);
    return defaultValue;
  }
  return valueReturned;
}

export function inWishlist(checkListKeyString){
  if(global.collectionList.includes("wishlist"+checkListKeyString)){
    return true;
  } else {
    return false
  }
}

export function inChecklist(checkListKeyString){
  if(global.collectionList.includes(checkListKeyString)){
    return true;
  } else {
    return false
  }
}

export function inMuseum(checkListKeyString, shouldCheck){
  if(shouldCheck && global.collectionList.includes("museum"+checkListKeyString)){
    return true;
  } else {
    return false
  }
}

export function inVillager(checkListKeyString, shouldCheck){
  if(shouldCheck && global.collectionList.includes("oldResident"+checkListKeyString)){
    return true;
  } else {
    return false
  }
}

export function inVillagerPhoto(checkListKeyString, shouldCheck){
  if(shouldCheck && global.collectionList.includes("havePhoto"+checkListKeyString)){
    return true;
  } else {
    return false
  }
}

export async function getStorageData(data, checkListKey, defaultValue, debug){
  var dataLoadingTotal = [];
  let inputData;
  if(data===undefined){
    inputData = [];
  } else {
    inputData = data
  }
  //Loop through all datasets
  for(let dataSet = 0; dataSet <inputData.length; dataSet++){
    let dataLoading = inputData[dataSet][0]; //data[dataSet][1] is the Data category String
    let totalIndex = -1;
    let dontPush = false;
    //Loop through that specific dataset
    for(var i = 0; i < dataLoading.length; i++){
      //Remove no name K.K. songs
      // if(dataLoading[i].hasOwnProperty("Name")&&dataLoading[i]["Name"].includes("Hazure")){
      //   dataLoading.splice(i,1);
      //   continue;
      // }
      totalIndex++;
      let checkListKeyString = checkListKey[dataSet][0];
      //Loop through specific checklistKey property for that dataset
      for(let x = 1; x < checkListKey[dataSet].length; x++){
        if(dataLoading[i][checkListKey[dataSet][x]]!==undefined){
          checkListKeyString += dataLoading[i][checkListKey[dataSet][x]];
        }else{
          if(i===0){
            console.log(checkListKey[dataSet][x])
            console.log(inputData[dataSet][1])
          }
        }
      }
      if(checkListKeyString===checkListKey[dataSet][0]){
        checkListKeyString=checkListKeyString+"things be missing"
      }
      //Get value from storage
      // var value=defaultValue;
      // var wishlist = "false";
      // if(global.collectionList.includes("wishlist"+checkListKeyString)){
      //   wishlist="true";
      // } 
      // if(global.collectionList.includes(checkListKeyString)){
      //   value="true";
      // }
      // dataLoading[i].collected=value;
      // dataLoading[i].wishlist=wishlist;
      dataLoading[i]["checkListKey"]=checkListKeyString;

      if(checkListKey[dataSet][0] === "fishCheckList" || checkListKey[dataSet][0] === "seaCheckList" || checkListKey[dataSet][0] === "bugCheckList"){
        let hemispherePre = ["NH ", "SH "];
        let monthShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        for(let hemispherePreIndex=0; hemispherePreIndex<hemispherePre.length; hemispherePreIndex++){
          for(let monthShortIndex=0; monthShortIndex<monthShort.length; monthShortIndex++){
            dataLoading[i][hemispherePre[hemispherePreIndex]+[monthShort[monthShortIndex]+" Active"]] = dataLoading[i][hemispherePre[hemispherePreIndex]+[monthShort[monthShortIndex]]]!=="NA"?"true":"false";
            if(dataLoading[i][hemispherePre[hemispherePreIndex]+[monthShort[monthShortIndex]]]!=="NA" && dataLoading[i][hemispherePre[hemispherePreIndex]+[monthShort[monthShortIndex]]]!=="All day")
              dataLoading[i][hemispherePre[hemispherePreIndex]+"time"] = dataLoading[i][hemispherePre[hemispherePreIndex]+[monthShort[monthShortIndex]]];
          }
          if(!dataLoading[i].hasOwnProperty(hemispherePre[hemispherePreIndex]+"time"))
            dataLoading[i][hemispherePre[hemispherePreIndex]+"time"] = "All day"
        }
      }
      if(global.language!=="English"){
        // if(!customDatabase){
        //   dataLoading[i]["NameLanguage"]=attemptToTranslateItem(dataLoading[i]["Name"]);
        // }else{
          dataLoading[i]["NameLanguage"]=attemptToTranslate(dataLoading[i]["Name"], true);
        // }
      } else {
        dataLoading[i]["NameLanguage"]=dataLoading[i]["Name"];
      }
      dataLoading[i]["Data Category"]=inputData[dataSet][1];
    }
    dataLoadingTotal.push(dataLoading);
  }
  return dataLoadingTotal;
}

export function countCollection(checkListKeyStart){
  var count = 0;
  for(var i = 0; i<global.collectionList.length; i++){
    if(global.collectionList[i].includes(checkListKeyStart) && !global.collectionList[i].includes("wishlist") && !global.collectionList[i].includes("museum")){
      if(checkListKeyStart.includes("artCheckList") && (global.collectionList[i].includes("No") || (global.collectionList[i].includes("0") && global.collectionList[i].includes("Yes")))){
        continue;
      } else {
        count++
      }
    }
  }
  return count;
}

export function determineDataGlobal(datakeyName){
  if(datakeyName==="dataLoadedAmiibo")
    return global.dataLoadedAmiibo;
  else if(datakeyName==="dataLoadedReactions")
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
  else if(datakeyName==="dataLoadedGyroids")
    return global.dataLoadedGyroids;
}

export async function resetFilters(){
  var allFilterKeys = await AsyncStorage.getAllKeys();
  var filterKeys = []
  for(var x =0; x < allFilterKeys.length; x++){
    if(allFilterKeys[x].includes("Filters")){
      filterKeys.push(allFilterKeys[x])
    }
  }
  console.log(filterKeys)
  for(var i =0; i < filterKeys.length; i++){
    AsyncStorage.setItem(filterKeys[i], "");
  }
}

export function getSpecificFilters(searchFor){
  if(searchFor===undefined){
    return [];
  }
  const filterDefinitionsAll = require("./assets/data/Generated/filterDefinitions.json")["All Items"];
  var foundFilters = [];
  for(var i=0; i<filterDefinitionsAll.length; i++){
    for(var j=0; j<filterDefinitionsAll[i]["children"].length; j++){
      if(filterDefinitionsAll[i]["children"][j]["id"].split(":")[1].toLowerCase().includes(searchFor.toLowerCase())){
        foundFilters.push(filterDefinitionsAll[i]["children"][j]["id"])
      }
    }
  }
  console.log(foundFilters)
  return foundFilters;
}

export async function deleteSavedPhotos(){
  const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
  const sizeMB = ((await FileSystem.getInfoAsync(FileSystem.documentDirectory)).size)/1000000;
  for(var i=0; i<files.length; i++){
    if(!files[i].includes(".json"))
      await FileSystem.deleteAsync(FileSystem.documentDirectory+files[i]);
  }
  return [files.length, sizeMB];
}

export async function deleteGeneratedData(){
  const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
  const sizeMB = ((await FileSystem.getInfoAsync(FileSystem.documentDirectory)).size)/1000000;
  for(var i=0; i<files.length; i++){
    if(files[i].includes(".json"))
      await FileSystem.deleteAsync(FileSystem.documentDirectory+files[i]);
  }
  return [files.length, sizeMB];
}

export function checkOff(checkListKey, collected, type="", indexSpecial="", vibrate=getSettingsString("settingsEnableVibrations")==="true"){
  console.log(type+checkListKey+indexSpecial);
  console.log("TYPE"+type)
  if(collected===false){
    vibrate ? Vibration.vibrate([0,10,100,20]) : "";
    global.collectionList.push(type+checkListKey+indexSpecial)
  } else {
    vibrate ? Vibration.vibrate(10) : "";
    collectionListRemove(type+checkListKey+indexSpecial)
  }
  collectionListSave();
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
  console.log(outputString)
  AsyncStorage.setItem("collectedString"+global.profile, outputString);
}

export function removeAccents(text){
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace("-"," ")
}

export function capitalize(name) {
  if(name!==undefined){
    if(name.includes("(") && name.includes(")")){
      var withinBrackets = name.match(/\((.*?)\)/);
      name = name.replace(withinBrackets[0], "("+capitalize(withinBrackets[1])+")")
      return name;
    }
    var name = name.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
    return name.charAt(0).toUpperCase() + name.slice(1);
  } else {
    return "";
  }
}

export function capitalizeFirst(name) {
  if(name!==undefined){
    return name.charAt(0).toUpperCase() + name.slice(1);
  } else {
    return "";
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
  global.dataLoadedAmiibo = await getStorageData([
    [require("./assets/data/Amiibo Data/Series 1.json"),"Series 1"],
    [require("./assets/data/Amiibo Data/Series 2.json"),"Series 2"],
    [require("./assets/data/Amiibo Data/Series 3.json"),"Series 3"],
    [require("./assets/data/Amiibo Data/Series 4.json"),"Series 4"],
    [require("./assets/data/Amiibo Data/Series 5.json"),"Series 5"],
    [require("./assets/data/Amiibo Data/Promos.json"),"Promos"],
    [require("./assets/data/Amiibo Data/Welcome amiibo series.json"),"Welcome Amiibo Series"],
    [require("./assets/data/Amiibo Data/Sanrio series.json"),"Sanrio Series"],
  ], [
    ["amiiboCheckListSeries1","Name"],
    ["amiiboCheckListSeries2","Name"],
    ["amiiboCheckListSeries3","Name"],
    ["amiiboCheckListSeries4","Name"],
    ["amiiboCheckListSeries5","Name"],
    ["amiiboCheckListPromos","Name"],
    ["amiiboCheckListSeriesWelcomeamiiboseries","Name"],
    ["amiiboCheckListSeriesSanrioseries","Name"],
  ], "false")
  global.dataLoadedReactions = await getStorageData([[require("./assets/data/DataCreated/Reactions.json"),"Reactions"]],[["emojiCheckList","Name"]],"false");
  global.dataLoadedMusic = await getStorageData([[require("./assets/data/DataCreated/Music.json"),"Music"]],[["songCheckList","Name"]],"false");
  global.dataLoadedConstruction = await getStorageData([[require("./assets/data/DataCreated/Construction.json"),"Construction"],[require("./assets/data/DataCreated/Fencing.json"),"Fencing"]],[["constructionCheckList","Name"],["fenceCheckList","Name"]],"false");
  global.dataLoadedFish = await getStorageData([[require("./assets/data/DataCreated/Fish.json"),"Fish"]],[["fishCheckList","Name"]],"false");
  global.dataLoadedBugs = await getStorageData([[require("./assets/data/DataCreated/Insects.json"), "Insects"]],[["bugCheckList","Name"]],"false");
  global.dataLoadedSea = await getStorageData([[require("./assets/data/DataCreated/Sea Creatures.json"), "Sea Creatures"]],[["seaCheckList","Name"]],"false");
  global.dataLoadedCreatures = await getStorageData([
    [require("./assets/data/DataCreated/Fish.json"),"Fish"],
    [require("./assets/data/DataCreated/Sea Creatures.json"), "Sea Creatures"],
    [require("./assets/data/DataCreated/Insects.json"), "Insects"],
  ],[
    ["fishCheckList","Name"],
    ["seaCheckList","Name"],
    ["bugCheckList","Name"]
  ],"false", true);
  global.dataLoadedFossils = await getStorageData([[require("./assets/data/DataCreated/Fossils.json"),"Fossils"]],[["fossilCheckList","Name"]],"false");
  global.dataLoadedArt = await getStorageData([[require("./assets/data/DataCreated/Art.json"),"Art"]],[["artCheckList","Name","Genuine"]],"false");
  global.dataLoadedVillagers = await getStorageData([[require("./assets/data/DataCreated/Villagers.json"),"Villagers"]],[["villagerCheckList","Name"]],"false");
  global.dataLoadedFurniture = await getStorageData([
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Housewares.json")), "Housewares"],
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Miscellaneous.json")), "Miscellaneous"],
    [require("./assets/data/DataCreated/Wall-mounted.json"), "Wall-mounted"],
    [require("./assets/data/DataCreated/Ceiling Decor.json"), "Ceiling Decor"],
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Photos.json")), "Photos"],
    [require("./assets/data/DataCreated/Posters.json"), "Posters"],
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
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Headwear.json")), "Headwear"],
    [require("./assets/data/DataCreated/Accessories.json"), "Accessories"],
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Tops.json")), "Tops"],
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Dress-Up.json")), "Dress-Up"],
    [require("./assets/data/DataCreated/Clothing Other.json"),"Clothing Other"],
    [require("./assets/data/DataCreated/Bottoms.json"),"Bottoms"],
    [require("./assets/data/DataCreated/Socks.json"),"Socks"],
    [require("./assets/data/DataCreated/Shoes.json"),"Shoes"],
    [require("./assets/data/DataCreated/Bags.json"),"Bags"],
    [require("./assets/data/DataCreated/Umbrellas.json"),"Umbrellas"],
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
    [require("./assets/data/DataCreated/Floors.json"), "Floors"],
    [require("./assets/data/DataCreated/Rugs.json"), "Rugs"],
    [require("./assets/data/DataCreated/Wallpaper.json"), "Wallpaper"],
  ],
  [
    ["floorWallsCheckList","Name"],
    ["floorWallsCheckList","Name"],
    ["floorWallsCheckList","Name"],
  ],"false");
  global.dataLoadedTools = await getStorageData([[require("./assets/data/DataCreated/Tools.json"), "Tools"]],[["toolsCheckList","Name","Variation"]],"false");
  global.dataLoadedRecipes = await getStorageData([[require("./assets/data/DataCreated/Recipes.json"),"Recipes"],],[["recipesCheckList","Name"]],"false");
  global.dataLoadedCards = await getStorageData([[require("./assets/data/DataCreated/Message Cards.json"), "Message Cards"],],[["cardsCheckList","Name"]],"false");
  global.dataLoadedMaterials = await getStorageData([[require("./assets/data/DataCreated/Other.json"),"Other"]],[["materialsCheckList","Name"]],"false");
  global.dataLoadedGyroids = await getStorageData([[require("./assets/data/DataCreated/Gyroids.json"),"Gyroids"]],[["gyroidCheckList","Name","Variation","Pattern"]],"false");
  global.dataLoadedAll = await getStorageData(
  [
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Housewares.json")), "Housewares"],
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Miscellaneous.json")), "Miscellaneous"],
    [require("./assets/data/DataCreated/Wall-mounted.json"), "Wall-mounted"],
    [require("./assets/data/DataCreated/Ceiling Decor.json"), "Ceiling Decor"],
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Photos.json")), "Photos"],
    [require("./assets/data/DataCreated/Posters.json"), "Posters"],
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Headwear.json")), "Headwear"],
    [require("./assets/data/DataCreated/Accessories.json"), "Accessories"],
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Tops.json")), "Tops"],
    [JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + "Dress-Up.json")), "Dress-Up"],
    [require("./assets/data/DataCreated/Clothing Other.json"),"Clothing Other"],
    [require("./assets/data/DataCreated/Bottoms.json"),"Bottoms"],
    [require("./assets/data/DataCreated/Socks.json"),"Socks"],
    [require("./assets/data/DataCreated/Shoes.json"),"Shoes"],
    [require("./assets/data/DataCreated/Bags.json"),"Bags"],
    [require("./assets/data/DataCreated/Umbrellas.json"),"Umbrellas"],
    [require("./assets/data/DataCreated/Floors.json"), "Floors"],
    [require("./assets/data/DataCreated/Rugs.json"), "Rugs"],
    [require("./assets/data/DataCreated/Wallpaper.json"), "Wallpaper"],
    [require("./assets/data/DataCreated/Recipes.json"), 'Recipes'],
    [require("./assets/data/DataCreated/Tools.json"), "Tools"],
    [require("./assets/data/DataCreated/Fish.json"), "Fish"],
    [require("./assets/data/DataCreated/Insects.json"), "Insects"],
    [require("./assets/data/DataCreated/Sea Creatures.json"),"Sea Creatures"],
    [require("./assets/data/DataCreated/Fossils.json"),"Fossils"],
    [require("./assets/data/DataCreated/Art.json"),"Art"],
    [require("./assets/data/DataCreated/Villagers.json"),"Villagers"],
    [require("./assets/data/DataCreated/Music.json"),"Music"],
    [require("./assets/data/DataCreated/Reactions.json"),"Reactions"],
    [require("./assets/data/DataCreated/Construction.json"),"Construction"],
    [require("./assets/data/DataCreated/Fencing.json"),"Fencing"],
    [require("./assets/data/DataCreated/Other.json"),"Other"],
    [require("./assets/data/DataCreated/Gyroids.json"),"Gyroids"],
    [require("./assets/data/Amiibo Data/Series 1.json"),"Series 1"],
    [require("./assets/data/Amiibo Data/Series 2.json"),"Series 2"],
    [require("./assets/data/Amiibo Data/Series 3.json"),"Series 3"],
    [require("./assets/data/Amiibo Data/Series 4.json"),"Series 4"],
    [require("./assets/data/Amiibo Data/Promos.json"),"Promos"],
    [require("./assets/data/Amiibo Data/Welcome amiibo series.json"),"Welcome Amiibo Series"],
    [require("./assets/data/Amiibo Data/Sanrio series.json"),"Sanrio Series"],
  ],
  [
    ["furnitureCheckList","Name","Variation","Pattern"],
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
    ["materialsCheckList","Name"],
    ["gyroidCheckList","Name","Variation","Pattern"],
    ["amiiboCheckListSeries1","Name"],
    ["amiiboCheckListSeries2","Name"],
    ["amiiboCheckListSeries3","Name"],
    ["amiiboCheckListSeries4","Name"],
    ["amiiboCheckListPromos","Name"],
    ["amiiboCheckListSeriesWelcomeamiiboseries","Name"],
    ["amiiboCheckListSeriesSanrioseries","Name"],
  ],"false");
}

const artIdentification = require("./assets/data/artIdentification.json")
export function getArtIdentification(name){
  for(var i = 0; i<artIdentification.length; i++){
    if(artIdentification[i]["Name"]===name){
      if(artIdentification[i]["Identification"]==="This is always real"){
        return "";
      } else {
        return artIdentification[i]["Identification"];
      }
    }
  }
  return "";
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

export function setSettingsString(key, value){
  if(settings!==undefined||global.settingsCurrent!==undefined){
    for(var i = 0; i<settings.length; i++){
      if(global.settingsCurrent[i]["keyName"]===key){
        global.settingsCurrent[i]["currentValue"]=value;
        AsyncStorage.setItem(key, value);
        break;
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
    "displayName" : "Northern Hemisphere",
    "description" : "Set your hemisphere, north or south. This will change the data displayed for creatures and events.",
  },
  {
    "keyName" : "settingsAutoBackup",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/fileBackup.png"),
    "displayName" : "Auto backups",
    "description" : "Once your credentials are remembered on the backup page, automatic backups will occur every time you open the application and are connected to the internet. Auto backups overwrite what is currently backed up in the cloud!",
  },
  {
    "keyName" : "settingsSortAlphabetically",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/alphabet.png"),
    "displayName" : "Sort lists in alphabetical order",
    "description" : "Sort any list into alphabetical order.",
  },
  {
    "keyName" : "settingsHideImages",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/spoiler.png"),
    "displayName" : "Avoid spoilers - hide preview images",
    "description" : "Hide images to avoid any spoilers if the item is not yet collected.",
  },
  {
    "keyName" : "settingsHighlightNotCraftableVariations",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/dice.png"),
    "displayName" : "Highlight furniture with non-craftable variations",
    "description" : "Highlight furniture with variations that can't be crafted by the player in blue. This will help complete your catalog with all the furniture variations!",
    "displayPicture1" : require("./assets/icons/settingsScreenshots/screenshotNoChecks.jpg"),
    "displayPicture2" : require("./assets/icons/settingsScreenshots/screenshotHighlightUncraftable.jpg"),
  },
  {
    "keyName" : "breaker",
    "text" : "Notifications",
  },
  {
    "keyName" : "settingsNotifications",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/bell.png"),
    "displayName" : "App notifications",
    "description" : "This will enable/disable notifications. You can select event notifications under the [Edit Events] of the [Events] section on the homepage.",
  },
  // {
  //   "keyName" : "settingsShowVariation",
  //   "defaultValue" : "false",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/dice.png"),
  //   "displayName" : "Show variations in lists",
  //   "description" : "Show the different colours/patterns of furniture and clothing items in the list.",
  // },
  // {
  //   "keyName" : "settingsRemoveCraftVariations",
  //   "defaultValue" : "false",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/diyKit.png"),
  //   "displayName" : "Remove customizable variations in lists",
  //   "description" : "Remove variations that you can obtain through customization. Useful to keep track of furniture types that has not been purchased.",
  // },

  {
    "keyName" : "breaker",
    "text" : "Creatures",
  },
  // {
  //   "keyName" : "settingsListOnlyActiveCreatures",
  //   "defaultValue" : "false",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/clockIcon.png"),
  //   "displayName" : "List only active creatures",
  //   "description" : "Only creatures that can be caught in the current month will be displayed.",
  // },
  // {
  //   "keyName" : "settingsCreaturesLeavingWarning",
  //   "defaultValue" : "true",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/alarmClock.png"),
  //   "displayName" : "Last month to catch warning",
  //   "description" : "Display a red warning background colour around creatures that won't be able to be caught in the next month.",
  // },
  {
    "keyName" : "settingsSortCritterpedia",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/filter.png"),
    "displayName" : "Sort creatures based on Critterpedia",
    "description" : "Sort creatures the same way they are sorted in the Critterpedia. This applies to the Creatures + Museum page.",
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
  // {
  //   "keyName" : "settingsColorLists",
  //   "defaultValue" : "true",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/colorPalette.png"),
  //   "displayName" : "Colored lists",
  //   "description" : "Change the background of the list based on the color of the item",
  //   "displayPicture1" : require("./assets/icons/settingsScreenshots/screenshotChecks.jpg"),
  //   "displayPicture2" : require("./assets/icons/settingsScreenshots/screenshotChecksColor.jpg"),
  // },
  // {
  //   "keyName" : "settingsShowBlankCheckMarks",
  //   "defaultValue" : "true",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/checkEmpty.png"),
  //   "displayName" : "Show empty check marks",
  //   "description" : "Show an empty check mark in lists. Can be tapped to quickly check off the item. Disabling this can increase performance as less animations need to be rendered.",
  //   "displayPicture1" : require("./assets/icons/settingsScreenshots/screenshotChecks.jpg"),
  //   "displayPicture2" : require("./assets/icons/settingsScreenshots/screenshotNoChecks.jpg"),
  // },
  // {
  //   "keyName" : "settingsShowMuseumButton",
  //   "defaultValue" : "true",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/owl.png"),
  //   "displayName" : "Show donated to museum button",
  //   "description" : "Shows a donation button which can be used to track if you've donated it to the museum in addition to collecting it.",
  // },
  {
    "keyName" : "settingsCompressVariations",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/variations.png"),
    "displayName" : "Compress variations into a scrollable list",
    "description" : "The way gestures work, it may not allow scrolling inside a popup container. Disable this to be able to see all variations without the need for a nested scroll.",
    "displayPicture1" : require("./assets/icons/settingsScreenshots/screenshotCondenseVariations.jpg"),
    "displayPicture2" : require("./assets/icons/settingsScreenshots/screenshotVariations.jpg"),
  },
  {
    "keyName" : "settingsLargerItemPreviews",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/magnifyingGlass.png"),
    "displayName" : "Use larger images in popup",
    "description" : "Use a larger image when previewing items in their popup",
    "displayPicture1" : require("./assets/icons/settingsScreenshots/screenshotCondenseVariations.jpg"),
    "displayPicture2" : require("./assets/icons/settingsScreenshots/screenshotLargeImage.jpg"),
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
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/vibration.png"),
    "displayName" : "Enable haptic feedback",
    "description" : "Enable/Disable the vibrations with certain actions.",
  },
  {
    "keyName" : "settingsDownloadImages",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/photo.png"),
    "displayName" : "Download images",
    "description" : "Save images locally for offline use once viewed. If disabled, can save storage space, but always requires an internet connection to view images.",
  },
  // {
  //   "keyName" : "settingsTabBarPosition",
  //   "defaultValue" : "false",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/scroll.png"),
  //   "displayName" : "Category labels on bottom",
  //   "description" : "Show the category tabs on the bottom, or top of the screen in list pages with multiple categories.",
  // },
  // {
  //   "keyName" : "settingsUseFilters",
  //   "defaultValue" : "true",
  //   "currentValue" : "",
  //   "picture" : require("./assets/icons/filter.png"),
  //   "displayName" : "Enable filters in lists",
  //   "description" : "Turning this off can increase performance of loading, for basic needs",
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
    "description" : "Use any date you want, in case you are one of those time travellers",
  },
]

//How translations are handled


//attemptToTranslate()
//Original entry is split by ';' and each part is translated
//translates from Main, NPCs, Sources

//attemptToTranslate(force=true)
//Original entry is split by ';' and each part is translated
//also tries attemptToTranslateItem() (because this may have event names) and attemptToTranslateSpecial(type="variants")
//translates from (Main, NPCs, Sources) + Event Names

//attemptToTranslateItem()
//gets translation from original item translation spreadsheet json converted Items
//then tried to get translations from Missing Items, Cards

//attemptToTranslateSpecial(type="variants")
//gets translation from original item translation spreadsheet json converted Variants

//attemptToTranslateSpecial(type="catchphrase")
//gets translation from original item translation spreadsheet json converted Catchphrases

//attemptToTranslateAchievement()
//translates from Achievements only

//attemptToTranslateSourceNotes()
//translated from Source Notes only

//attemptToTranslateMysteryIslands()
//translates from Mystery Islands only

//attemptToTranslateCreatureCatchPhrase()
//translates creatures catch phrases from Catch Phrases

//attemptToTranslateMuseumDescription()
//translates museum descriptions from Museum Descriptions


const variantTranslations = require("./assets/data/Generated/translatedVariants.json");
const catchphraseTranslations = require("./assets/data/Generated/translatedVillagerCatchPhrases.json");
const appTranslations = require("./assets/data/translationsApp.json")["Main"];
const achievementTranslations = require("./assets/data/translationsApp.json")["Achievements"];
const itemTranslations = require("./assets/data/Generated/translatedItems.json")
const itemTranslationsMissing = require("./assets/data/translationsApp.json")["Missing Items"];
const eventTranslationsMissing = require("./assets/data/translationsApp.json")["Event Names"];
const sourcesTranslations = require("./assets/data/translationsApp.json")["Sources"];
const sourceNotesTranslations = require("./assets/data/translationsApp.json")["Source Notes"];
const cardsTranslations = require("./assets/data/translationsApp.json")["Cards"];
const NPCTranslations = require("./assets/data/translationsApp.json")["NPCs"];
const mysteryIslandsTranslations = require("./assets/data/translationsApp.json")["Mystery Islands"];
const creatureCatchPhraseTranslations = require("./assets/data/translationsApp.json")["Catch Phrases"];
const museumDescriptionTranslations = require("./assets/data/translationsApp.json")["Museum Descriptions"];

export function attemptToTranslateFromDatabases(text, databases){
  if(text===undefined){
    return "";
  } else if(global.language==="English"){
    return text;
  }
  for(var i=0; i<databases.length; i++){
    for(var j=0; j<databases[i].length; j++){
      if(databases[i][j].hasOwnProperty("English") && databases[i][j]["English"].toLowerCase()===text.toString().toLowerCase()){
        var translatedText = databases[i][j][global.language];
        if(translatedText!==undefined&&translatedText!==null&&translatedText!==""){
          return translatedText;
        }
      }
    }
  }
  return text;
}

export function attemptToTranslateItem(text){
  if(global.language!=="English"){
    if(itemTranslations.hasOwnProperty(text)){
      if(itemTranslations[text][global.language]===undefined){
        if(itemTranslations[text]["English"]!=undefined){
          return itemTranslations[text]["English"]
        } else {
          return ""
        }
      }
      return(itemTranslations[text][global.language])
    }
  }
  var newText = attemptToTranslateFromDatabases(text,[itemTranslationsMissing]);
  if(text === newText){
    newText = attemptToTranslateFromDatabases(text,[cardsTranslations]);
  }
  return newText;
}

export function attemptToTranslateSpecial(text, type){
  if(global.language!=="English"){
    var translated;
    if(type==="variants"){
      translated = variantTranslations;
    } else if (type==="catchphrase"){
      translated = catchphraseTranslations;
    } else {
      return text
    }
    if(translated.hasOwnProperty(text)){
      return(translated[text][global.language])
    }
  }
  return text;
}
export function attemptToTranslateAchievement(text){
  return attemptToTranslateFromDatabases(text, [achievementTranslations])
}

export function attemptToTranslateMysteryIslands(text){
  return attemptToTranslateFromDatabases(text, [mysteryIslandsTranslations])
}

export function attemptToTranslateSourceNotes(text){
  return attemptToTranslateFromDatabases(text, [sourceNotesTranslations])
}

export function attemptToTranslateCreatureCatchPhrase(text){
  return attemptToTranslateFromDatabases(text, [creatureCatchPhraseTranslations])
}

export function attemptToTranslateMuseumDescription(text){
  return attemptToTranslateFromDatabases(text, [museumDescriptionTranslations])
}

export function attemptToTranslate(text, forcedTranslation=false){
  if(text===undefined){
    return "";
  } else if(global.language==="English"){
    return text;
  }

  var textArray = [];
  if(text.toString().includes(";")){
    textArray = text.toString().split(";");
    for(var x=0; x<textArray.length; x++){
      textArray[x] = textArray[x].trim();
    }
  } else {
    textArray.push(text);
  }
  var translatedTextOut = "";
  var success = false;
  for(var j=0; j<textArray.length; j++){
    success = false;

    if(forcedTranslation){
      var forcedTranslationText = attemptToTranslateSpecial(textArray[j], "variants");
      if(forcedTranslationText===textArray[j]){
        forcedTranslationText = attemptToTranslateItem(textArray[j])
      }
      if(forcedTranslationText===textArray[j]){
        forcedTranslationText = attemptToTranslateFromDatabases(textArray[j],[eventTranslationsMissing]);
      }

      if(forcedTranslationText !== textArray[j]){
        if(j>0){
          translatedTextOut+="; " + forcedTranslationText;
        } else {
          translatedTextOut+=forcedTranslationText;
        }
        success = true;
        continue;
      }
    }

    for(var i=0; i<appTranslations.length; i++){
      if(appTranslations[i].hasOwnProperty("English") && appTranslations[i]["English"].toLowerCase()===textArray[j].toString().toLowerCase()){
        var translatedText = appTranslations[i][global.language];
        if(translatedText===undefined||translatedText===null||translatedText===""){
          translatedTextOut+=textArray[j];
          success = true;
          break;
        } else {
          if(j>0){
            translatedTextOut+="; " + translatedText;
          } else {
            translatedTextOut+=translatedText;
          }
          success = true;
          break;
        }
      }
    }
    if(success===false){
      var extraTranslation = attemptToTranslateFromDatabases(textArray[j], [NPCTranslations, sourcesTranslations])
      if(extraTranslation!==textArray[j]){
        if(j>0){
          translatedTextOut+="; " + extraTranslation;
        } else {
          translatedTextOut+=extraTranslation;
        }
        success = true;
        continue;
      } else {
        if(j>0){
          translatedTextOut+="; " + textArray[j];
        } else {
          translatedTextOut+=textArray[j];
        }
      }
    }
  }
  return translatedTextOut;
}

export function checkTranslationEntry(textCheck, fallback){
  if(textCheck===null||textCheck===undefined){
    return fallback;
  } else {
    return textCheck;
  }
}

//Special translations
// {label: "English", value: "English",},
// {label: "English (Europe)", value: "English (Europe)",},
// {label: "Français", value: "French",},
// {label: "Français (Québec)", value: "French (US)",},
// {label: "Español (In progress - if you would like to help, feel free to email)", value: "Spanish",},
// {label: "Español (US) (In progress - if you would like to help, feel free to email)", value: "Spanish (US)",},
// {label: "German (In progress - if you would like to help, feel free to email)", value: "German",},
// {label: "Italian (Not fully supported)", value: "Italian",},
// {label: "Dutch (Not fully supported)", value: "Dutch",},
// {label: "Chinese (Not fully supported)", value: "Chinese",},
// {label: "Chinese (Traditional) (Not fully supported)", value: "Chinese (Traditional)",},
// {label: "Japanese (Not fully supported)", value: "Japanese",},
// {label: "Korean (Not fully supported)", value: "Korean",},
// {label: "Russian (Not fully supported)", value: "Russian",},
export function translateDreamAddressBeginning(){
  if(global.language==="French" || global.language==="French (US)"){
    return ("DA")
  } else if(global.language==="Spanish" || global.language==="Spanish (US)"){
    return ("DA")
  } else if(global.language==="German"){
    return ("DA")
  } else {
    return ("DA")
  }
}

export function translateBirthday(villager){
  if(global.language==="French" || global.language==="French (US)"){
    return ("Anniversaire de " + villager)
  } else if(global.language==="Spanish" || global.language==="Spanish (US)"){
    return ("Cumpleaños de " + villager)
  } else if(global.language==="German"){
    return (villager + "'s Geburtstag")
  } else if(global.language==="Russian"){
    return ("День рождения " + villager)
  } else {
    return (villager + "'s Birthday")
  }
}

export function translateIslandNameInputLabel1(){
  if (global.language==="French" || global.language==="French (US)"){
    return "de l'île";
  } else if(global.language==="Spanish" || global.language==="Spanish (US)"){
    return "de isla";
  } else if (global.language==="German"){
    return "der";
  } else if (global.language==="Russian"){
    return " ";
  } else {
    return "of";
  }
}

export function translateIslandNameInputLabel2(){
  if (global.language==="French" || global.language==="French (US)"){
    return "";
  } else if (global.language==="German"){
    return "Insel";
  } else {
    return "Island";
  }
}

export function getDefaultLanguage(){
  //var languages = ["English", "English (Europe)","German","Spanish","Spanish (US)","French","French (US)","Italian","Dutch","Chinese","Chinese (Traditional)","Japanese","Korean","Russian","Portuguese"]

  var defaultLanguage = "English";
  if(Localization.locale.includes("en")){
    defaultLanguage = "English";
  } else if(Localization.locale.includes("fr")){
    defaultLanguage = "French";
  } else if(Localization.locale.includes("es")){
    defaultLanguage = "Spanish";
  } else if(Localization.locale.includes("de")){
    defaultLanguage = "German";
  } else if(Localization.locale.includes("it")){
    defaultLanguage = "Italian";
  } else if(Localization.locale.includes("zh")){
    defaultLanguage = "Chinese";
  } else if(Localization.locale.includes("ja")){
    defaultLanguage = "Japanese";
  } else if(Localization.locale.includes("ko")){
    defaultLanguage = "Korean";
  } else if(Localization.locale.includes("ru")){
    defaultLanguage = "Russian";
  } else if(Localization.locale.includes("nl")){
    defaultLanguage = "Dutch";
  } else if(Localization.locale.includes("pt")){
    defaultLanguage = "Portuguese";
  }
  return defaultLanguage;
}

export function translateFilters(filters){
  var label = [];
  if(filters===undefined){
    return filters;
  }
  for(var i = 0; i<filters.length; i++){
    filters[i]["name"] = capitalizeFirst(attemptToTranslate(filters[i]["name"], true));
    for(var x = 0; x<filters[i]["children"].length; x++){
      filters[i]["children"][x]["name"] = capitalizeFirst(attemptToTranslate(filters[i]["children"][x]["name"], true));
    }
  }
  return filters;
}

export function translateDateRange(dateRange){
  if(dateRange.includes("-")){
    var dateRanges = dateRange.split(";");
    var dateOut = "";
    for(var i = 0; i<dateRanges.length; i++){
      var dateRangeSplit = dateRanges[i].split(" ")
      
      dateOut += doWeSwapDate()===true ? dateRangeSplit[1] + " " + attemptToTranslate(dateRangeSplit[0]) : attemptToTranslate(dateRangeSplit[0]) + " " + dateRangeSplit[1]
      dateOut += " - ";
      dateOut += doWeSwapDate()===true ? dateRangeSplit[4] + " " + attemptToTranslate(dateRangeSplit[3]) : attemptToTranslate(dateRangeSplit[3]) + " " + dateRangeSplit[4]
    }
    return dateOut;
  } else {
    var dateRanges = dateRange.split(/;| /);
    var dateOut = "";
    for(var i = 0; i<dateRanges.length; i++){
      dateOut += attemptToTranslate(dateRanges[i]) + " "
    }
    return dateOut;
  }
} 

export function getCurrentVillagerObjects(){
  const data = require("./assets/data/DataCreated/Villagers.json");
  var currentVillagers = [];
  for(var i=0; i<global.collectionList.length; i++){
    if(global.collectionList[i].includes("villagerCheckList")){
      var villagerName = global.collectionList[i].replace("villagerCheckList","");
      for(var z=0; z<data.length; z++){
        if(data[z]["Name"]===villagerName){
          currentVillagers.push(data[z]);
        }
      }
    }
  }
  return currentVillagers;
}

function getAllVillagerPersonalities(){
  const data = require("./assets/data/DataCreated/Villagers.json");
  var villagerPersonalities = [];
  var currentPersonality = "";
  for(var z=0; z<data.length; z++){
    currentPersonality = data[z]["Personality"];
    if(!villagerPersonalities.includes(currentPersonality)){
      villagerPersonalities.push(currentPersonality);
    }
  }
  return villagerPersonalities;
}

function getCurrentVillagerPersonalities(){
  var currentVillagers = getCurrentVillagerObjects();
  var villagerPersonalities = [];
  for(var z=0; z<currentVillagers.length; z++){
    villagerPersonalities.push(currentVillagers[z]["Personality"])
  }
  return villagerPersonalities;
}

export function getCurrentVillagerNamesString(){
  var currentVillagers = getCurrentVillagerObjects();
  var villagerNames = "";
  for(var z=0; z<currentVillagers.length; z++){
    villagerNames+=(currentVillagers[z]["NameLanguage"]) + ", ";
  }
  if(villagerNames===""){
    return "You have no favorite villagers."
  }
  return villagerNames.slice(0, -2);
}

export function getCurrentVillagerFilters(){
  var currentVillagers = getCurrentVillagerObjects();
  var allFilters = [];
  for(var i=0; i<currentVillagers.length; i++){
    allFilters.push("Source:" + currentVillagers[i]["Personality"] + " villagers");
    allFilters.push("Source:" + currentVillagers[i]["Personality"] + " villagers" + "; Tom Nook");
  }
  allFilters.push("Source:All villagers (while stung)");
  allFilters.push("Source:All villagers; Balloons");
  allFilters.push("Source:All villagers");
  allFilters = Array.from(new Set(allFilters));
  return allFilters;
}

export function getInverseVillagerFilters(string=false){
  var inversePersonalities = getAllVillagerPersonalities().filter(n => !getCurrentVillagerPersonalities().includes(n))
  var allFilters = [];
  var allFiltersString = "";
  for(var i=0; i<inversePersonalities.length; i++){
    allFilters.push("Source:" + inversePersonalities[i] + " villagers");
    allFilters.push("Source:" + inversePersonalities[i] + " villagers" + "; Tom Nook");
    if(string){
      allFiltersString+=attemptToTranslate(inversePersonalities[i])+", "
    }
  }
  if(string){
    return allFiltersString.slice(0, -2);
  } else {
    return allFilters
  }
}

export function findItemIDName(id, name){
  for(var dataSet = 0; dataSet < global.dataLoadedAll.length; dataSet++){
    for(var i = 0; i < global.dataLoadedAll[dataSet].length; i++){
      if(global.dataLoadedAll[dataSet][i].hasOwnProperty("Internal ID") && global.dataLoadedAll[dataSet][i]["Internal ID"].toString()===id.toString() && global.dataLoadedAll[dataSet][i]["Name"]===name){
        return global.dataLoadedAll[dataSet][i];
      }
    }
  }
}

export function findItemCheckListKey(checkListKey){
  for(var dataSet = 0; dataSet < global.dataLoadedAll.length; dataSet++){
    for(var i = 0; i < global.dataLoadedAll[dataSet].length; i++){
      if(global.dataLoadedAll[dataSet][i].hasOwnProperty("checkListKey") && global.dataLoadedAll[dataSet][i]["checkListKey"]===checkListKey){
        return global.dataLoadedAll[dataSet][i];
      }
    }
  }
}

// itemIDs={[
//   {
//     list:[...this.props.villager["Furniture List"].split(";"), ...this.props.villager["Kitchen Equipment"].split(',')[0], ...this.props.villager["DIY Workbench"].split(',')[0],],
//     key:"furnitureCheckList"
//   },
// ]}
export function compareItemID(itemIDs, currentItem){
  if(!currentItem.hasOwnProperty("Internal ID") || !currentItem.hasOwnProperty("checkListKey")){
    return false;
  }
  for(var i=0; i<itemIDs.length; i++){
    for(var x=0; x<itemIDs[i]["list"].length; x++){
      if((itemIDs[i]["list"][x].toString()===currentItem["Name"].toString()||itemIDs[i]["list"][x].toString()===currentItem["Internal ID"].toString()) && currentItem["checkListKey"].includes(itemIDs[i]["key"])){
        return true;
      }
    }
  }
  return false;
}

export function getEventName(eventNameInput){
  // var eventName = "";
  // if(eventNameInput.includes("(ready days)")){
    // eventName = attemptToTranslate(attemptToTranslateItem(eventNameInput.replace(" (ready days)",""))) + " " + attemptToTranslate("Ready Days")
  // } else if (eventNameInput.includes("(") && eventNameInput.includes(")")){
  //   var withinBrackets = eventNameInput.match(/\((.*?)\)/);
  //   eventName = attemptToTranslate(attemptToTranslateItem(eventNameInput.replace(" "+withinBrackets[0],""))) + " (" + attemptToTranslate(withinBrackets[1]) + ")"
  // } else {
  //   eventName = attemptToTranslate(attemptToTranslateItem(eventNameInput))
  // }
  var eventName = attemptToTranslate(eventNameInput, true);
  return eventName
}

export function determineCustomizationString(item){
  if(item["Variant ID"] !==undefined && item["Variant ID"] !=="NA"){
    var canCustomize = []
    if(item["Body Customize"] !==undefined && item["Body Customize"] ==="Yes"){
      canCustomize.push("the body")
    }
    if(item["Pattern Customize"] !==undefined && item["Pattern Customize"] ==="Yes"){
      canCustomize.push("the pattern")
    }
    if(canCustomize.length===0){
      return capitalizeFirst(attemptToTranslate("cannot be customized, variations must be obtained"))
    }else if(canCustomize.length>1){
      return capitalizeFirst(attemptToTranslate(canCustomize[0]) + " " +  "and" + " " +  attemptToTranslate(canCustomize[1]) + " " +  attemptToTranslate("can be customized"))
    }else{
      return capitalizeFirst(attemptToTranslate(canCustomize[0]) + " " + attemptToTranslate("can be customized"))
    }
  } else {
    return ""
  }
}

export function variationsCheckedPercent(item, index){
  if(!item) return false;
  
  if(item.hasOwnProperty("Variation") && item["Variation"]!=="NA"){
    const variations = getVariations(item["Name"],global.dataLoadedAll,item["checkListKey"], index);
    const howManyVariations = howManyVariationsChecked(variations)
    if(howManyVariations<1){
      return 0;
    }
    return howManyVariations/variations.length;
  }
  return 0;
}

export function allVariationsChecked(item, index){
  if(!item) return false;
  
  if(item.hasOwnProperty("Variation") && item["Variation"]!=="NA"){
    const variations = getVariations(item["Name"],global.dataLoadedAll,item["checkListKey"], index);
    const howManyVariations = howManyVariationsChecked(variations)
    return howManyVariations/variations.length===1 || howManyVariations<1 ? true: false;
  }
  return true;
}

export function getFlowerChecklistKey(flowerName){
  let flowerStripped = flowerName;
  flowerStripped = flowerStripped.replace("roses", "rose");
  flowerStripped = flowerStripped.replace("pansies", "pansy");
  flowerStripped = flowerStripped.replace("windflowers", "windflower");
  flowerStripped = flowerStripped.replace("hyacinths", "hyacinth");
  flowerStripped = flowerStripped.replace("lilies", "lily");
  flowerStripped = flowerStripped.replace("cosmos", "cosmos");
  flowerStripped = flowerStripped.replace("mums", "mum");
  flowerStripped = flowerStripped.replace("tulips", "tulip");
  flowerStripped = flowerStripped.replace(" ","-")
  flowerStripped = flowerStripped + " Plant"
  for(let dataSet = 0; dataSet < global.dataLoadedMaterials.length; dataSet++){
    for(let i = 0; i < global.dataLoadedMaterials[dataSet].length; i++){
      if(global.dataLoadedMaterials[dataSet][i]["Name"].toLowerCase()===flowerStripped.toLowerCase()){
        return global.dataLoadedMaterials[dataSet][i]["checkListKey"]
      }
    }
  }
  return "s";
}

export function generateMaterialsFilters(materialName){
  let filtersOut = []
  for(let i=1; i<10; i++){
    filtersOut.push("Material " + i.toString() + ":" + materialName)
    console.log("Material " + i.toString() + ":" + materialName)
  }
  return ["Material 1:elegant mushroom"]
}

export function allEventItemsCheck(eventName){
  if(eventName===undefined || eventName.constructor !== String){
    return false
  }
  let previousName = ""
  let previousDataCategory = ""
  for(let dataSet = 0; dataSet < global.dataLoadedAll.length; dataSet++){
    for(let i = 0; i < global.dataLoadedAll[dataSet].length; i++){
      if((global.dataLoadedAll[dataSet][i].hasOwnProperty("Source") && global.dataLoadedAll[dataSet][i]["Source"].toLowerCase().split("; ").includes(eventName.toLowerCase())) || (global.dataLoadedAll[dataSet][i].hasOwnProperty("Season/Event") && global.dataLoadedAll[dataSet][i]["Season/Event"].toLowerCase().split("; ").includes(eventName.toLowerCase()))){
        if(previousName === global.dataLoadedAll[dataSet][i]["Name"] && previousDataCategory === global.dataLoadedAll[dataSet][i]["Data Category"]){
          continue
        } else {
          if(inChecklist(global.dataLoadedAll[dataSet][i]["checkListKey"])===false){
            return false
          }
          previousName = global.dataLoadedAll[dataSet][i]["Name"]
          previousDataCategory = global.dataLoadedAll[dataSet][i]["Data Category"]
        }
      }
    }
  }
  return true
}