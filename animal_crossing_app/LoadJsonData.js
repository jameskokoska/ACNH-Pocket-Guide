import {Vibration,Clipboard,Linking, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doWeSwapDate,} from "./components/DateFunctions";
import {howManyVariationsChecked, getVariations} from "./components/BottomSheetComponents"
import * as Localization from 'expo-localization';
import * as FileSystem from 'expo-file-system'
import Toast from "react-native-toast-notifications";
import TextFont from './components/TextFont';
import colors from './Colors.js';

export async function getStorage(storageKey, defaultValue){
  const valueReturned = await AsyncStorage.getItem(storageKey);
  if(valueReturned === null || valueReturned === undefined) {
    await AsyncStorage.setItem(storageKey, defaultValue);
    return defaultValue;
  }
  return valueReturned;
}

export function changeCustomListImage(name,image){
  global.customListsImagesIndexed[name]=image
  AsyncStorage.setItem("customListsImagesIndexed"+global.profile, JSON.stringify(global.customListsImagesIndexed));
}

export function getCustomListImage(name){
  if(global.customListsImagesIndexed[name]){
    return global.customListsImagesIndexed[name]
  } else {
    return "leaf.png"
  }
}

export function addCustomList(name){
  if(name===undefined || global.customLists.includes(name) || name==="" || name.includes("}") || name.includes("{")){
    return false
  } else {
    global.customLists.push(name)
    AsyncStorage.setItem("customLists"+global.profile, JSON.stringify(global.customLists));
    return true
  }
}

export function removeCustomList(name){
  if(global.customLists.includes(name)){
    const oldList = [...global.customLists]
    let indexToDelete = oldList.indexOf(name);
    const newList = oldList.filter((index,i) => i!=indexToDelete);
    global.customLists = newList
    AsyncStorage.setItem("customLists"+global.profile, JSON.stringify(global.customLists));

    let checkListKeyStart = "customLists::"+name
    const globalCollectionListCopy = [...global.collectionList]
    for(var i = 0; i<globalCollectionListCopy.length; i++){
      if(globalCollectionListCopy[i].includes(checkListKeyStart)){
        checkOff(globalCollectionListCopy[i], true, "", "", false)
      }
    }
    if(global.defaultSelectedList===name){
      global.defaultSelectedList = ""
      AsyncStorage.setItem("defaultSelectedList"+global.profile, "");
      AsyncStorage.setItem("settingsSelectDefaultWishlist"+global.profile, "false");
    }
    return true 
  }
  return false
}

export function inCustomLists(checkListKeyString, name){
  if(global.collectionListIndexed["customLists::"+name+checkListKeyString]===true){
    return true;
  } else {
    return false
  }
}

export function getCustomListsAmount(checkListKeyString, name){
  if(global.collectionListIndexedAmount["customLists::"+name+checkListKeyString]!==undefined){
    return global.collectionListIndexedAmount["customLists::"+name+checkListKeyString];
  } else {
    return 0
  }
}

export function setCustomListsAmount(checkListKeyString, name, amount){
  global.collectionListIndexedAmount["customLists::"+name+checkListKeyString] = amount;
  AsyncStorage.setItem("collectionListIndexedAmount" + global.profile, JSON.stringify(global.collectionListIndexedAmount));
}

export function setLastSelectedListPage(name){
  global.lastSelectedListPage = name
  AsyncStorage.setItem("lastSelectedListPage"+global.profile, name);
}

export function inWishlist(checkListKeyString){
  if(global.collectionListIndexed["wishlist"+checkListKeyString]===true){
    return true;
  } else {
    return false
  }
}


export async function initializeParadisePlanningGlobal(){
  if(global.paradisePlanningListIndexed===undefined || global.loadNewHHPList===true){
    console.log("Loading HHP list into memory")
    global.loadNewHHPList = false
    var storageData = JSON.parse(await getStorage("ParadisePlanning"+global.profile,JSON.stringify([])));
    if(storageData.constructor!==Array || storageData === undefined){
      storageData=[];
    }
    global.paradisePlanningListIndexed = {}
    for(const item of storageData){
      global.paradisePlanningListIndexed[item] = true
      
    }
  }
}

export async function removeAndSaveParadisePlanning(id){
  global.paradisePlanningListIndexed[id] = false
  let storageData = JSON.parse(await getStorage("ParadisePlanning"+global.profile,JSON.stringify([])));
  storageData = storageData.filter(item => item !== id)
  await AsyncStorage.setItem("ParadisePlanning"+global.profile, JSON.stringify(storageData));
}

export async function addAndSaveParadisePlanning(id){
  global.paradisePlanningListIndexed[id] = true
  let storageData = JSON.parse(await getStorage("ParadisePlanning"+global.profile,JSON.stringify([])));
  storageData.push(id)
  await AsyncStorage.setItem("ParadisePlanning"+global.profile, JSON.stringify(storageData));
}

export async function addAndSaveParadisePlanningList(items, key){
  let storageData = JSON.parse(await getStorage("ParadisePlanning"+global.profile,JSON.stringify([])));
  for(const item of items){
    const id = item[key]
    global.paradisePlanningListIndexed[id] = true
    storageData.push(id)
  }
  await AsyncStorage.setItem("ParadisePlanning"+global.profile, JSON.stringify(storageData));
}

export async function removeAndSaveParadisePlanningList(items, key){
  let storageData = JSON.parse(await getStorage("ParadisePlanning"+global.profile,JSON.stringify([])));
  for(const item of items){
    const id = item[key]
    if(inVillagerParadise(id, true)){
      storageData = storageData.filter(item2 => item2 !== id)
      global.paradisePlanningListIndexed[id] = false
    }
  }
  await AsyncStorage.setItem("ParadisePlanning"+global.profile, JSON.stringify(storageData));
}

export async function invertAndSaveParadisePlanningList(items, key){
  let storageData = JSON.parse(await getStorage("ParadisePlanning"+global.profile,JSON.stringify([])));
  for(const item of items){
    const id = item[key]
    if(inVillagerParadise(id, true)){
      storageData = storageData.filter(item2 => item2 !== id)
      global.paradisePlanningListIndexed[id] = false
    } else {
      storageData.push(id)
      global.paradisePlanningListIndexed[id] = true
    }
  }
  await AsyncStorage.setItem("ParadisePlanning"+global.profile, JSON.stringify(storageData));
}

export function getCustomListsFirst(checkListKey){
  if(global.collectionListIndexed!==undefined && global.customListsImagesIndexed!==undefined){
    for(let list of global.customLists){
      if(inCustomLists(checkListKey, list)){
        return list
      }
    }
  }
  return ""
}

export function getCustomListsIconQuick(list){
  if(global.collectionListIndexed!==undefined && global.customListsImagesIndexed!==undefined){
    return global.customListsImagesIndexed[list]
  }
  return ""
}

export function getCustomListsIcon(checkListKey){
  if(global.collectionListIndexed!==undefined && global.customListsImagesIndexed!==undefined){
    for(let list of global.customLists){
      if(inCustomLists(checkListKey, list)){
        return global.customListsImagesIndexed[list]
      }
    }
  }
  return ""
}

export function getCustomListsFirstAmountQuick(checkListKey, list){
  if(global.collectionListIndexed!==undefined && global.customListsImagesIndexed!==undefined){
    return getCustomListsAmount(checkListKey, list)
  }
  return 0
}

export function getCustomListsFirstAmount(checkListKey){
  if(global.collectionListIndexed!==undefined && global.customListsImagesIndexed!==undefined){
    for(let list of global.customLists){
      if(inCustomLists(checkListKey, list)){
        return getCustomListsAmount(checkListKey, list)
      }
    }
  }
  return 0
}

export function inChecklist(checkListKeyString){
  if(global.collectionListIndexed[checkListKeyString]===true){
    return true;
  } else {
    return false
  }
}

export function inMuseum(checkListKeyString, shouldCheck){
  if(shouldCheck && global.collectionListIndexed["museum"+checkListKeyString]===true){
    return true;
  } else {
    return false
  }
}

export function inVillager(checkListKeyString, shouldCheck){
  if(shouldCheck && global.collectionListIndexed["oldResident"+checkListKeyString]===true){
    return true;
  } else {
    return false
  }
}

export function inVillagerPhoto(checkListKeyString, shouldCheck){
  if(shouldCheck && global.collectionListIndexed["havePhoto"+checkListKeyString]===true){
    return true;
  } else {
    return false
  }
}

export function inVillagerParadise(id, shouldCheck){
  if(shouldCheck && global.paradisePlanningListIndexed && global.paradisePlanningListIndexed[id]===true){
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
    let currentParentKey = ""
    let currentParent = ""
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
        }
        // else{
        //   if(i===0){
        //     console.log(checkListKey[dataSet][x])
        //     console.log(inputData[dataSet][1])
        //   }
        // }
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

      if(currentParent!==dataLoading[i]["Name"]){
        currentParentKey = checkListKeyString
        currentParent = dataLoading[i]["Name"]
      }

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
      if(global.language!=="English" && global.language!=="Portuguese" && global.language!=="Czech" && global.language!=="Slovak"){
        // if(!customDatabase){
        //   dataLoading[i]["NameLanguage"]=attemptToTranslateItem(dataLoading[i]["Name"]);
        // }else{
          if(checkListKey[dataSet][0]==="villagerCheckList" || (checkListKey[dataSet][0]!==undefined && checkListKey[dataSet][0].includes("amiiboCheckList"))){
            dataLoading[i]["NameLanguage"]=attemptToTranslateSpecial(dataLoading[i]["Name"],"villagers")
          } else {
            //handle special case where there are multiple items with same name
            if(global.language!=="English" && dataLoading[i]["Name"]==="ant" ){
              let currentTranslation = {
                "CNzh": "蚂蚁",
                "EUde": "Ameise",
                "EUen": "ant",
                "EUes": "hormiga",
                "EUfr": "fourmi",
                "EUit": "formica",
                "EUnl": "mier",
                "EUru": "муравей",
                "JPja": "アリ",
                "KRko": "개미",
                "TWzh": "螞蟻",
                "USen": "ant",
                "USes": "hormiga",
                "USfr": "fourmi"
              }
              dataLoading[i]["NameLanguage"]=translateRepeatItem(currentTranslation,global.language)
            }else if(global.language!=="English" && dataLoading[i]["Name"]==="tank" ){
              // inputData[dataSet][1] is DataCategory
              if(inputData[dataSet][1] === "Housewares"){
                let currentTranslation = {
                  "CNzh": "燃料桶",
                  "EUde": "Tank",
                  "EUen": "tank",
                  "EUes": "cisterna",
                  "EUfr": "réservoir",
                  "EUit": "serbatoio",
                  "EUnl": "tank",
                  "EUru": "резервуар",
                  "JPja": "タンク",
                  "KRko": "탱크",
                  "TWzh": "燃料桶",
                  "USen": "tank",
                  "USes": "cisterna",
                  "USfr": "réservoir"
                }
                dataLoading[i]["NameLanguage"]=translateRepeatItem(currentTranslation,global.language)
              }else if(inputData[dataSet][1] === "Tops"){
                let currentTranslation = {
                  "CNzh": "坦克背心",
                  "EUde": "Tanktop",
                  "EUen": "tank",
                  "EUes": "top básico",
                  "EUfr": "débardeur",
                  "EUit": "canotta",
                  "EUnl": "tanktop",
                  "EUru": "топ",
                  "JPja": "タンクトップ",
                  "KRko": "탱크톱",
                  "TWzh": "坦克背心",
                  "USen": "tank",
                  "USes": "top básico",
                  "USfr": "camisole"
                }
                dataLoading[i]["NameLanguage"]=translateRepeatItem(currentTranslation,global.language)
              }
            }else{
              dataLoading[i]["NameLanguage"]=attemptToTranslate(dataLoading[i]["Name"], true);
            }
          }
        // }
      } else {
        dataLoading[i]["NameLanguage"]=dataLoading[i]["Name"];
      }
      
      if(dataLoading[i]["NameLanguage"]===undefined || dataLoading[i]["NameLanguage"]===""){
        dataLoading[i]["SortString"]="zzzzzzzzzzzzzz"
      } else {
        const output = removeAccents(dataLoading[i]["NameLanguage"].toUpperCase()).replace("-"," ")
        dataLoading[i]["SortString"]= output===undefined ? dataLoading[i]["NameLanguage"] : output;
      }

      dataLoading[i]["Data Category"]=inputData[dataSet][1];
      if(determineFoodItem(dataLoading[i])){
        dataLoading[i]["Data Category 2"] = "Food"
      }
      dataLoading[i]["checkListKeyParent"]=currentParentKey

      // duplicate key fix for amiibo card
      if(dataLoading[i]["checkListKey"]==="amiiboCheckListSeries5Tom Nook"){
        dataLoading[i]["checkListKey"] = dataLoading[i]["checkListKey"]+dataLoading[i]["number"]
        dataLoading[i]["checkListKeyParent"] = dataLoading[i]["checkListKeyParent"]+dataLoading[i]["number"]
      }
      if(dataLoading[i]["checkListKey"]==="amiiboCheckListSeries5Isabelle"){
        dataLoading[i]["checkListKey"] = dataLoading[i]["checkListKey"]+dataLoading[i]["number"]
        dataLoading[i]["checkListKeyParent"] = dataLoading[i]["checkListKeyParent"]+dataLoading[i]["number"]
      }
    }
    dataLoadingTotal.push(dataLoading);
  }
  return dataLoadingTotal;
}

function translateRepeatItem(itemTranslation, language){
  let languages = {
    "Chinese":"CNzh",
    "German":"EUde",
    "English (Europe)":"EUen",
    "Spanish":"EUes",
    "French":"EUfr",
    "Italian":"EUit",
    "Dutch":"EUnl",
    "Russian":"EUru",
    "Japanese":"JPja",
    "Korean":"KRko",
    "Chinese (Traditional)":"TWzh",
    "English":"USen",
    "Spanish (US)":"USes",
    "French (US)":"USfr"
  }
  if(languages[language]===undefined || itemTranslation[languages[language]]===undefined){
    return ""
  }
  if(languages[language] && itemTranslation[languages[language]]){
    return itemTranslation[languages[language]]
  } 
  return ""
}

export function countCollection(checkListKeyStart){
  var count = 0;
  for(var i = 0; i<global.collectionList.length; i++){
    if(global.collectionList[i].includes("customLists::") || global.collectionList[i].includes("wishlist") || global.collectionList[i].includes("museum")){
      continue
    }
    if(global.collectionList[i].includes(checkListKeyStart)){
      if(checkListKeyStart.includes("artCheckList") && (global.collectionList[i].includes("No") || (global.collectionList[i].includes("0") && global.collectionList[i].includes("Yes")))){
        continue;
      } else if(checkListKeyStart.includes("songCheckList") && global.collectionList[i].includes("Hazure")){
        continue;
      } else {
        count++
      }
    }
  }
  return count;
}

export async function countCollectionSpecial(datakeyName, dataCategoriesSkip=[], dataCategoriesOnly=[], alsoInVillager=false){
  let database = determineDataGlobal(datakeyName)
  let count = 0;
  let total = 0;
  let previousVariation = "";
  for(let i = 0; i<database.length; i++){
    for(let k = 0; k<database[i].length; k++){

      let found = false
      for(const dataCategorySkip of dataCategoriesSkip){
        if(database[i][k]["Data Category"] === dataCategorySkip || database[i][k]["Data Category 2"] === dataCategorySkip){
          found = true
          break
        }
      }
      if(found) break

      if(previousVariation===database[i][k]["Name"]){
        continue
      } else {
        previousVariation=database[i][k]["Name"]

        if(dataCategoriesOnly.length > 0){
          for(const dataCategoryOnly of dataCategoriesOnly){
            if(database[i][k]["Data Category"] === dataCategoryOnly || database[i][k]["Data Category 2"] === dataCategoryOnly){
              total++
              if(global.collectionListIndexed[database[i][k]["checkListKey"]]===true){
                count++
              } else if (alsoInVillager==true && inVillager(database[i][k]["checkListKey"], true)===true){
                count++
              }
              break
            }
          }
          continue
        }

        total++
        if(global.collectionListIndexed[database[i][k]["checkListKey"]]===true){
          count++
        } else if (alsoInVillager==true && inVillager(database[i][k]["checkListKey"], true)===true){
          count++
        }
      }
    }
  }
  if(total===0){
    total++
  }
  return [count, total];
}

//total achievements
export async function countAchievements(){
  let data = require("./assets/data/DataCreated/Achievements.json");
  let totalAchievements = 0
  for(let i = 0; i<data.length; i++){
    if(data[i]["Num of Tiers"]!==undefined){
      totalAchievements = totalAchievements + parseInt(data[i]["Num of Tiers"]);
    }
  }
  return totalAchievements
}

//collected achievements
export async function countCollectionAchievements(){
  var storageData = JSON.parse(await getStorage("Achievements"+global.profile,JSON.stringify([])));
  return storageData.length;
}

export function determineDataGlobal(datakeyName){
  if(datakeyName==="dataLoadedAmiibo")
    return global.dataLoadedAmiibo;
  if(datakeyName==="dataLoadedPhotosPosters")
    return global.dataLoadedPhotosPosters;
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
  else if(datakeyName==="dataLoadedFood")
    return getFoodItems();
  else if(datakeyName==="dataLoadedGyroids")
    return global.dataLoadedGyroids;
}

function getFoodItems(){
  let outputItems = []
  let item = {}
  let dataLoaded2D = global.dataLoadedFurniture
  for(let j = 0; j < dataLoaded2D.length; j++){
    var dataLoaded = dataLoaded2D[j];
    for(let i = 0; i < dataLoaded.length; i++){
      item = dataLoaded[i];
      item.indexOriginal = i;
      item.dataSetOriginal = j;
      if(determineFoodItem(item)){
        outputItems.push(item)
      }
    }
  }

  return [outputItems]
}

export function determineFoodItem(item){
  if(item["Tag"]!==undefined && (item["Tag"]==="DishFood"||item["Tag"]==="DishDrink")){
    return true
  }
  return false
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

export async function resetAlphabeticalFilters(){
  var allFilterKeys = await AsyncStorage.getAllKeys();
  var filterKeys = []
  for(var x =0; x < allFilterKeys.length; x++){
    if(allFilterKeys[x].includes("Filters")){
      filterKeys.push(allFilterKeys[x])
    }
  }
  for(var i =0; i < filterKeys.length; i++){
    let defaultValuesStored = await getStorage(filterKeys[i], "")
    // console.log(defaultValuesStored)

    defaultValuesStored = defaultValuesStored.replace("Sort-RemoveAlphabetical,","")
    defaultValuesStored = defaultValuesStored.replace("Sort-RemoveAlphabetical","")
    defaultValuesStored = defaultValuesStored.replace("Sort-Alphabetical,","")
    defaultValuesStored = defaultValuesStored.replace("Sort-Alphabetical","")
    // let newOutput = []
    // if(defaultValuesStored!==""){
    //   for(var i = 0; i<defaultValuesStored.split(",").length; i++){
    //     if(defaultValuesStored.split(",")[i]==="Sort-RemoveAlphabetical" || defaultValuesStored.split(",")[i]==="Sort-Alphabetical"){
    //       continue
    //     }
    //     newOutput.push(i)
    //   }
    //   console.log(newOutput)
    //   AsyncStorage.setItem(filterKeys[i], newOutput.toString());
    // }
    // console.log(defaultValuesStored)
    await AsyncStorage.setItem(filterKeys[i], defaultValuesStored);
  }
}

export function getSpecificFilters(searchFor, searchingMore = false){
  if(searchFor===undefined){
    return [];
  }
  const filterDefinitionsAll = require("./assets/data/Generated/filterDefinitions.json")["All Items"];
  var foundFilters = [];
  for(var i=0; i<filterDefinitionsAll.length; i++){
    for(var j=0; j<filterDefinitionsAll[i]["children"].length; j++){
      if(filterDefinitionsAll[i]["children"][j]["id"].split(":")[1].toLowerCase()===(searchFor.toLowerCase())){
        foundFilters.push(filterDefinitionsAll[i]["children"][j]["id"])
      }
    }
  }
  console.log("FOUND FILTERS")
  console.log(foundFilters)
  if(foundFilters.length<=0 && searchingMore===false){
    console.log("SEARCHING MORE:" + searchFor + " (Nook Shopping)")
    return getSpecificFilters(searchFor + " (Nook Shopping)", true)
  }
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
  let totalFiles = 0
  const sizeMB = ((await FileSystem.getInfoAsync(FileSystem.documentDirectory)).size)/1000000;
  for(var i=0; i<files.length; i++){
    if(files[i].includes(".json")){
      await FileSystem.deleteAsync(FileSystem.documentDirectory+files[i]);
      totalFiles++
    }
  }
  return [totalFiles, sizeMB];
}

export function checkOff(checkListKey, collected, type="", indexSpecial="", vibrate=getSettingsString("settingsEnableVibrations")==="true", save=true){
  // console.log(type+checkListKey+indexSpecial);
  // console.log("TYPE"+type)
  if(collected===false){
    vibrate ? Vibration.vibrate([0,10,100,20]) : "";
    global.collectionList.push(type+checkListKey+indexSpecial)
    global.collectionListIndexed[type+checkListKey+indexSpecial]=true
  } else {
    vibrate ? Vibration.vibrate(10) : "";
    collectionListRemove(type+checkListKey+indexSpecial)
    global.collectionListIndexed[type+checkListKey+indexSpecial]=false
  }
  if(save){
    collectionListSave();
  }
  //console.log(global.collectionList)
}

function collectionListRemove(checkListKey){
  if(global.collectionListIndexed[checkListKey]===true){
    global.collectionList = global.collectionList.filter(e => e !== checkListKey)
    global.collectionList = global.collectionList.filter(e => e !== "")
  }
}

export async function collectionListSave(){
  var outputString = "";
  for(var i = 0; i<global.collectionList.length; i++){
    outputString += global.collectionList[i];
    outputString += "\n";
  }
  // console.log(outputString)
  await AsyncStorage.setItem("collectedString"+global.profile, outputString);
}

export function collectionListRemoveDuplicates(){
  global.collectionList = [...new Set(global.collectionList)];
  collectionListSave()
}

export function removeAccents(text){
  if(text && text.constructor===String)
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, " ")
  return ""
}

export function capitalize(name) {
  if(name && name.constructor===String){
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
  if(name && name.constructor===String){
    return name.toString().charAt(0).toUpperCase() + name.slice(1);
  } else {
    return "";
  }
}

export function commas(number) {
  if(number){
    if(isNaN(number)){
      return number
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
  } else if(number===0){
    return 0
  } else {
    return "null"
  }
}

export function removeBrackets(string){
  if(string){
    return string.toString().replace(/ *\([^)]*\) */g, "");
  } else {
    return "null"
  }
}

export async function loadGlobalData(){
  try{
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
    global.dataLoadedPhotosPosters = await getStorageData([
      [require("./assets/data/DataCreated/Photos.json"), "Photos"],
      [require("./assets/data/DataCreated/Posters.json"), "Posters"],
    ],[
      ["furnitureCheckList","Name","Variation","Pattern"],
      ["furnitureCheckList","Name"],
    ],"false");
    global.dataLoadedReactions = await getStorageData([[require("./assets/data/DataCreated/Reactions.json"),"Reactions"]],[["emojiCheckList","Name"]],"false");
    global.dataLoadedMusic = await getStorageData([[require("./assets/data/DataCreated/Music.json"),"Music"]],[["songCheckList","Name"]],"false");
    global.dataLoadedConstruction = await getStorageData([[require("./assets/data/DataCreated/Construction.json"),"Construction"],[require("./assets/data/DataCreated/Fencing.json"),"Fencing"],[require("./assets/data/DataCreated/Interior Structures.json"),"Interior Structures"]],[["constructionCheckList","Name"],["fenceCheckList","Name"],["interiorStructuresCheckList","Name","Color 1","Color 2"]],"false");
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
    global.dataLoadedArt = await getStorageData([[require("./assets/data/DataCreated/Artwork.json"),"Art"]],[["artCheckList","Name","Genuine"]],"false");
    global.dataLoadedVillagers = await getStorageData([[require("./assets/data/DataCreated/Villagers.json"),"Villagers"]],[["villagerCheckList","Name"]],"false");
    global.dataLoadedFurniture = await getStorageData([
      [require("./assets/data/DataCreated/Housewares.json"), "Housewares"],
      [require("./assets/data/DataCreated/Miscellaneous.json"), "Miscellaneous"],
      [require("./assets/data/DataCreated/Wall-mounted.json"), "Wall-mounted"],
      [require("./assets/data/DataCreated/Ceiling Decor.json"), "Ceiling Decor"],
      [require("./assets/data/DataCreated/Photos.json"), "Photos"],
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
      [require("./assets/data/DataCreated/Headwear.json"), "Headwear"],
      [require("./assets/data/DataCreated/Accessories.json"), "Accessories"],
      [require("./assets/data/DataCreated/Tops.json"), "Tops"],
      [require("./assets/data/DataCreated/Dress-Up.json"), "Dress-Up"],
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
    global.dataLoadedTools = await getStorageData([[require("./assets/data/DataCreated/ToolsGoods.json"), "Tools"]],[["toolsCheckList","Name","Variation"]],"false");
    global.dataLoadedRecipes = await getStorageData([[require("./assets/data/DataCreated/Recipes.json"),"Recipes"],],[["recipesCheckList","Name"]],"false");
    global.dataLoadedCards = await getStorageData([[require("./assets/data/DataCreated/Message Cards.json"), "Message Cards"],],[["cardsCheckList","Name"]],"false");
    global.dataLoadedMaterials = await getStorageData([[require("./assets/data/DataCreated/Other.json"),"Other"]],[["materialsCheckList","Name"]],"false");
    global.dataLoadedGyroids = await getStorageData([[require("./assets/data/DataCreated/Gyroids.json"),"Gyroids"]],[["gyroidCheckList","Name","Variation","Pattern"]],"false");
    global.dataLoadedAll = await getStorageData(
    [
      [require("./assets/data/DataCreated/Housewares.json"), "Housewares"],
      [require("./assets/data/DataCreated/Miscellaneous.json"), "Miscellaneous"],
      [require("./assets/data/DataCreated/Wall-mounted.json"), "Wall-mounted"],
      [require("./assets/data/DataCreated/Ceiling Decor.json"), "Ceiling Decor"],
      [require("./assets/data/DataCreated/Photos.json"), "Photos"],
      [require("./assets/data/DataCreated/Posters.json"), "Posters"],
      [require("./assets/data/DataCreated/Headwear.json"), "Headwear"],
      [require("./assets/data/DataCreated/Accessories.json"), "Accessories"],
      [require("./assets/data/DataCreated/Tops.json"), "Tops"],
      [require("./assets/data/DataCreated/Dress-Up.json"), "Dress-Up"],
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
      [require("./assets/data/DataCreated/ToolsGoods.json"), "Tools"],
      [require("./assets/data/DataCreated/Fish.json"), "Fish"],
      [require("./assets/data/DataCreated/Insects.json"), "Insects"],
      [require("./assets/data/DataCreated/Sea Creatures.json"),"Sea Creatures"],
      [require("./assets/data/DataCreated/Fossils.json"),"Fossils"],
      [require("./assets/data/DataCreated/Artwork.json"),"Art"],
      [require("./assets/data/DataCreated/Villagers.json"),"Villagers"],
      [require("./assets/data/DataCreated/Music.json"),"Music"],
      [require("./assets/data/DataCreated/Reactions.json"),"Reactions"],
      [require("./assets/data/DataCreated/Construction.json"),"Construction"],
      [require("./assets/data/DataCreated/Fencing.json"),"Fencing"],
      [require("./assets/data/DataCreated/Interior Structures.json"),"Interior Structures"],
      [require("./assets/data/DataCreated/Other.json"),"Other"],
      [require("./assets/data/DataCreated/Gyroids.json"),"Gyroids"],
      [require("./assets/data/Amiibo Data/Series 1.json"),"Series 1"],
      [require("./assets/data/Amiibo Data/Series 2.json"),"Series 2"],
      [require("./assets/data/Amiibo Data/Series 3.json"),"Series 3"],
      [require("./assets/data/Amiibo Data/Series 4.json"),"Series 4"],
      [require("./assets/data/Amiibo Data/Series 5.json"),"Series 5"],
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
      ["interiorStructuresCheckList","Name","Color 1","Color 2"],
      ["materialsCheckList","Name"],
      ["gyroidCheckList","Name","Variation","Pattern"],
      ["amiiboCheckListSeries1","Name"],
      ["amiiboCheckListSeries2","Name"],
      ["amiiboCheckListSeries3","Name"],
      ["amiiboCheckListSeries4","Name"],
      ["amiiboCheckListSeries5","Name"],
      ["amiiboCheckListPromos","Name"],
      ["amiiboCheckListSeriesWelcomeamiiboseries","Name"],
      ["amiiboCheckListSeriesSanrioseries","Name"],
    ],"false");
    return true
  } catch (e) {
    console.log("Error parsing collection JSON: "+e)
    return false
  }
  
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
  try{
    if(settings!==undefined||global.settingsCurrent!==undefined){
      for(var i = 0; i<settings.length; i++){
        if(global.settingsCurrent[i]["keyName"]===key){
          return global.settingsCurrent[i]["currentValue"];
        }
      }
    }
  } catch {
    return 0;
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
    "dropdownValues" : ["Northern Hemisphere", "Southern Hemisphere"],
    "onChangeItem": async (item)=>{
      await AsyncStorage.setItem("settingsNorthernHemisphere", item.value==="Northern Hemisphere" === true ? "true" : "false");
      let index = 0;
      for(let setting of global.settingsCurrent){
        if(setting.keyName==="settingsNorthernHemisphere"){break}
        index++
      }
      global.settingsCurrent[index]["currentValue"] = item.value==="Northern Hemisphere" === true ? "true" : "false";
      
    },
    "getDefaultValue": ()=>{
      if(getSettingsString("settingsNorthernHemisphere") === "true"){
        return "Northern Hemisphere"
      } else {
        return "Southern Hemisphere"
      }
    }
  },
  {
    "keyName" : "settingsEditHomePage",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/homeIcon.png"),
    "displayName" : "Edit home page",
    "description" : "Tap here to edit sections on your home page.",
  },
  {
    "keyName" : "settingsSelectDefaultWishlist",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/wishlist.png"),
    "displayName" : "Default wishlist",
    "description" : "Select the default wishlist when adding items with a long press.",
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
  {
    "keyName" : "settingsEditNotifications",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/calendar.png"),
    "displayName" : "Edit event notifications",
    "description" : "Tap here to edit sections on your home page.",
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
    "text" : "Museum",
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
    "keyName" : "settingsAutoCheckMuseum",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/owl.png"),
    "displayName" : "Automatically collect when donated to Museum",
    "description" : "Automatically check off the item as collected when the donated to museum button is checked.",
  },
  {
    "keyName" : "breaker",
    "text" : "User interface",
  },
  {
    "keyName" : "settingsAutoDarkMode",
    "defaultValue" : "true",
    "currentValue" : "",
    "picture" : require("./assets/icons/autoMode.png"),
    "displayName" : "Theme mode",
    "description" : "Dark mode will follow system default, if your Android version does not support system dark mode, disable this and use the setting below.",
    "dropdownValues" : ["Light mode", "Dark mode", "Follow system"],
    "onChangeItem": async (item, updateSettings)=>{
      let indexDark = 0;
      for(let setting of global.settingsCurrent){
        if(setting.keyName==="settingsDarkMode"){break}
        indexDark++
      }
      let indexDarkAuto = 0;
      for(let setting of global.settingsCurrent){
        if(setting.keyName==="settingsAutoDarkMode"){break}
        indexDarkAuto++
      }
      if(item.value==="Light mode"){
        await AsyncStorage.setItem("settingsDarkMode", "false");
        global.settingsCurrent[indexDark]["currentValue"] = "false";
        await AsyncStorage.setItem("settingsAutoDarkMode", "false");
        global.settingsCurrent[indexDarkAuto]["currentValue"] = "false";
      } else if (item.value==="Dark mode") {
        await AsyncStorage.setItem("settingsDarkMode", "true");
        global.settingsCurrent[indexDark]["currentValue"] = "true";
        await AsyncStorage.setItem("settingsAutoDarkMode", "false");
        global.settingsCurrent[indexDarkAuto]["currentValue"] = "false";
      } else { //auto
        await AsyncStorage.setItem("settingsDarkMode", "false");
        global.settingsCurrent[indexDark]["currentValue"] = "false";
        await AsyncStorage.setItem("settingsAutoDarkMode", "true");
        global.settingsCurrent[indexDarkAuto]["currentValue"] = "true";
      }      
    },
    "getDefaultValue": ()=>{
      if(getSettingsString("settingsAutoDarkMode") === "true"){
        return "Follow system"
      } else if (getSettingsString("settingsDarkMode")==="true"){
        return "Dark mode"
      } else {
        return "Light mode"
      }
    }
  },
  {
    "keyName" : "settingsDarkMode",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/darkMode.png"),
    "displayName" : "Dark mode",
    "description" : "Toggle dark mode, ensure auto dark mode is off to use this",
    "hideCompletely": true,
  },
  {
    "keyName" : "smallHeader",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/header.png"),
    "displayName" : "Short header",
    "description" : "The header will take up less room on item list pages and provide more space for the items to be displayed.",
    "displayPicture1" : require("./assets/icons/settingsScreenshots/screenshotNormalHeader.jpg"),
    "displayPicture2" : require("./assets/icons/settingsScreenshots/screenshotSmallHeader.jpg"),
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
    "keyName" : "settingsLowEndDevice",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/repeat.png"),
    "displayName" : "Battery saver / Increase performance",
    "description" : "Disable animations and preloading of some app data to increase performance and loading times on older devices.",
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
    "defaultValue" : "true",
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
    "picture" : require("./assets/icons/savePhoto.png"),
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
    "text" : "Extra Settings",
    "hidden":true,
  },
  {
    "keyName" : "settingsUseOldKeyboardBehaviour",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/keyboard.png"),
    "displayName" : "Use old keyboard behviour",
    "description" : "Uses the old keyboard behaviour. The text entry does not lose focus when the keyboard is minimized.",
    "hidden":true,
  },
  {
    "keyName" : "settingsReducedMotionAndAnimations",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/slow-motion.png"),
    "displayName" : "Reduce motion and animations",
    "description" : "Reduces the motion and animations of certain actions within the application. If Remove Animations is disabled in the System Settings, it will take precedence over this setting. However, Reduce Motion Setting does not work yet. This is a bug in the React Native SDK and is being fixed: https://github.com/facebook/react-native/issues/31221",
    "hidden":true,
  },
  {
    "keyName" : "breaker",
    "text" : "Custom dates",
  },
  {
    "keyName" : "settingsUseCustomDate",
    "defaultValue" : "false",
    "currentValue" : "",
    "picture" : require("./assets/icons/schedule.png"),
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

//attemptToTranslateSpecial(type="villagers")
//gets translation from original item translation spreadsheet json converted villagers

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
const villagerTranslations = require("./assets/data/Generated/translatedVillagers.json");
const appTranslations = require("./assets/data/Generated/translationsAppGenerated.json")["Main"];
const achievementTranslations = require("./assets/data/Generated/translationsAppGenerated.json")["Achievements"];
const itemTranslations = require("./assets/data/Generated/translatedItems.json")
const itemTranslationsMissing = require("./assets/data/Generated/translationsAppGenerated.json")["Missing Items"];
const eventTranslationsMissing = require("./assets/data/Generated/translationsAppGenerated.json")["Event Names"];
const sourcesTranslations = require("./assets/data/Generated/translationsAppGenerated.json")["Sources"];
const sourceNotesTranslations = require("./assets/data/Generated/translationsAppGenerated.json")["Source Notes"];
const cardsTranslations = require("./assets/data/Generated/translationsAppGenerated.json")["Cards"];
const NPCTranslations = require("./assets/data/Generated/translationsAppGenerated.json")["NPCs"];
const mysteryIslandsTranslations = require("./assets/data/Generated/translationsAppGenerated.json")["Mystery Islands"];
const creatureCatchPhraseTranslations = require("./assets/data/Generated/translationsAppGenerated.json")["Catch Phrases"];
const museumDescriptionTranslations = require("./assets/data/Generated/translationsAppGenerated.json")["Museum Descriptions"];

export function attemptToTranslateFromDatabases(text, databases){
  if(text===undefined){
    return "";
  } else if(global.language==="English"){
    return text;
  }
  for(var i=0; i<databases.length; i++){
    if(databases[i][text.toString().toLowerCase()]!==undefined && databases[i][text.toString().toLowerCase()]["English"]!==undefined && databases[i][text.toString().toLowerCase()]["English"].toString().toLowerCase()===text.toString().toLowerCase()){
      var translatedText = databases[i][text.toString().toLowerCase()][global.language];
      if(translatedText!==undefined&&translatedText!==null&&translatedText!==""){
        return translatedText;
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
    } else if (type==="villagers"){
      translated = villagerTranslations;
    } else {
      return text
    }
    if(translated.hasOwnProperty(text)){
      if(translated[text][global.language]===undefined)
        return text
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

export function attemptToTranslate(text, forcedTranslation=false, ){
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

    // if(text==="Edit Sections"){
    //   console.log(appTranslations[text.toString().toLowerCase()]["English"])
    // }
    if(appTranslations[text.toString().toLowerCase()]!==undefined && appTranslations[text.toString().toLowerCase()]["English"]!==undefined && appTranslations[text.toString().toLowerCase()]["English"].toString().toLowerCase()===text.toString().toLowerCase()){
      var translatedText = appTranslations[text.toString().toLowerCase()][global.language];
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
  } else if(global.language==="Italian"){
    return ("Compleanno di " + villager)
  } else if(global.language==="Dutch"){
    return (villager + "'s Verjaardag")
  } else if(global.language==="Portuguese"){
    return ("Aniversário de " + villager)
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
  } else if(global.language==="Italian"){
    return ("dall'isola")
  } else if(global.language==="Dutch"){
    return ("van het eiland")
  } else if(global.language==="Portuguese"){
    return ("da ilha")
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
  //var languages = ["English", "English (Europe)","German","Spanish","Spanish (US)","French","French (US)","Italian","Dutch","Chinese","Chinese (Traditional)","Japanese","Korean","Russian","Portuguese","Czech", "Slovak"]

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
  } else if(Localization.locale.includes("cs")){
    defaultLanguage = "Czech";
  } else if(Localization.locale.includes("sk")){
    defaultLanguage = "Slovak";
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
  for(var z=0; z<data.length; z++){
    if(global.collectionListIndexed["villagerCheckList"+data[z]["Name"]]===true){
      currentVillagers.push(data[z]);
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

export function findPhotoAndPoster(villagerName){
  let photoName = villagerName + "'s photo"
  let posterName = villagerName + "'s poster"
  let outputIds = []
  for(var dataSet = 0; dataSet < global.dataLoadedFurniture.length; dataSet++){
    for(var i = 0; i < global.dataLoadedFurniture[dataSet].length; i++){
      if(global.dataLoadedFurniture[dataSet][i]["Data Category"] !== "Photos" && global.dataLoadedFurniture[dataSet][i]["Data Category"] !== "Posters"){
        break
      }
      if(global.dataLoadedFurniture[dataSet][i].hasOwnProperty("Internal ID") && global.dataLoadedFurniture[dataSet][i]["Name"]===photoName){
        outputIds.push(global.dataLoadedFurniture[dataSet][i]["Internal ID"]);
      } else if(global.dataLoadedFurniture[dataSet][i].hasOwnProperty("Internal ID") && global.dataLoadedFurniture[dataSet][i]["Name"]===posterName){
        outputIds.push(global.dataLoadedFurniture[dataSet][i]["Internal ID"]);
      }
    }
  }
  return outputIds
}

export function findIngredients(baseItem){
  let ingredients = [
    (baseItem["Material 1"] ?? "").toLowerCase(),
    (baseItem["Material 2"] ?? "").toLowerCase(),
    (baseItem["Material 3"] ?? "").toLowerCase(),
    (baseItem["Material 4"] ?? "").toLowerCase(),
    (baseItem["Material 5"] ?? "").toLowerCase(),
    (baseItem["Material 6"] ?? "").toLowerCase(),
    (baseItem["Material 7"] ?? "").toLowerCase(),
    (baseItem["Material 8"] ?? "").toLowerCase(),
    (baseItem["Material 9"] ?? "").toLowerCase(),
    (baseItem["Material 10"] ?? "").toLowerCase(),
  ]
  if(ingredients.includes("10 turnips")){
    ingredients.push("turnips")
  }
  let outputIds = []
  for(var dataSet = 0; dataSet < global.dataLoadedAll.length; dataSet++){
    for(var i = 0; i < global.dataLoadedAll[dataSet].length; i++){
      if(
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Photos" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Posters" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Villagers" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Recipes" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Music" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Reactions" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Construction" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Fencing" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Interior" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Gyroids" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Series 1" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Series 2" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Series 3" || 
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Series 4" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Series 5" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Promos" || 
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Welcome Amiibo Series" ||
        global.dataLoadedAll[dataSet][i]["Data Category"] === "Sanrio Series"     
      ){
        break
      }
      if(global.dataLoadedAll[dataSet][i].hasOwnProperty("Internal ID") && ingredients.includes((global.dataLoadedAll[dataSet][i]["Name"] ?? "").toLowerCase())){
        outputIds.push(global.dataLoadedAll[dataSet][i]["Internal ID"]);
      }
    }
  }
  return outputIds
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
    if(currentItem["checkListKey"].includes(itemIDs[i]["key"]) || itemIDs[i]["key"]===undefined){
      for(var x=0; x<itemIDs[i]["list"].length; x++){
        if((itemIDs[i]["list"][x].toString()===currentItem["Name"].toString()||itemIDs[i]["list"][x].toString()===currentItem["Internal ID"].toString())){
          return true;
        }
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
  if(eventNameInput!==undefined){
    var eventName = attemptToTranslate(eventNameInput, true);
    if(eventName===eventNameInput){
      var withinBrackets = eventNameInput.match(/\((.*?)\)/);
      if(withinBrackets){
        eventName = attemptToTranslate(eventNameInput.replace(" "+withinBrackets[0],""), true) + " (" + attemptToTranslate(withinBrackets[1]) + ")"
      }
    }
    return eventName
  } else if(global.language==="English"){
    return eventNameInput;
  }
  return ""
  
  
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
      return capitalizeFirst(attemptToTranslate("cannot be customized yourself"))
    }else if(canCustomize.length>1){
      return capitalizeFirst(attemptToTranslate(canCustomize[0]) + " " +  "and" + " " +  attemptToTranslate(canCustomize[1]) + " " +  attemptToTranslate("can be customized with Customization Kits"))
    }else{
      return capitalizeFirst(attemptToTranslate(canCustomize[0]) + " " + attemptToTranslate("can be customized with Customization Kits"))
    }
  } else {
    return ""
  }
}

export function variationsCheckedPercent(item, index){
  if(!item) return false;
  if(item["Data Category"]!==undefined && item["Data Category"]==="Interior Structures") return false;
  
  if((item.hasOwnProperty("Variation") && item["Variation"]!=="NA") || item.hasOwnProperty("Pattern") && item["Pattern"]!=="NA"){
    const variations = getVariations(item["Name"],global.dataLoadedAll,item["checkListKey"], index);
    const howManyVariations = howManyVariationsChecked(variations)
    
    if(howManyVariations<1){
      if(variations.length===0){
        return false
      }
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
      if(global.dataLoadedMaterials[dataSet][i]["Name"].toString().toLowerCase()===flowerStripped.toString().toLowerCase()){
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
    //it is a birthday object or something else
    return false
  }

  if(eventName==="K.K. concert"){
    let musicCount = countCollection("songCheckList");
    let musicCountTotal = global.dataLoadedMusic[0].length - 3; //there are 3 Hazure songs
    let musicPercentage = musicCount/musicCountTotal * 100;
    return [musicPercentage === 100]
  }
  // console.log(eventName)

  let previousName = ""
  let previousDataCategory = ""
  let foundAnyItem = false
  let firstItemFound = false
  for(let dataSet = 0; dataSet < global.dataLoadedAll.length; dataSet++){
    for(let i = 0; i < global.dataLoadedAll[dataSet].length; i++){
      if(
          (global.dataLoadedAll[dataSet][i].hasOwnProperty("Source") && global.dataLoadedAll[dataSet][i]["Source"].toString().toLowerCase().split("; ").includes(eventName.toString().toLowerCase()))
          ||
          (global.dataLoadedAll[dataSet][i].hasOwnProperty("Season/Event") && global.dataLoadedAll[dataSet][i]["Season/Event"].toString().toLowerCase().split("; ").includes(eventName.toString().toLowerCase()))
        ){
        foundAnyItem = true
        if(firstItemFound===false){
          firstItemFound = global.dataLoadedAll[dataSet][i]
        }
        if(previousName === global.dataLoadedAll[dataSet][i]["Name"] && previousDataCategory === global.dataLoadedAll[dataSet][i]["Data Category"]){
          continue
        } else {
          if(inChecklist(global.dataLoadedAll[dataSet][i]["checkListKey"])===false){
            return [false, firstItemFound]
          }
          previousName = global.dataLoadedAll[dataSet][i]["Name"]
          previousDataCategory = global.dataLoadedAll[dataSet][i]["Data Category"]
        }
      }
    }
  }
  if(foundAnyItem===false){
    return ["no event items found", firstItemFound]
  }
  return [true, firstItemFound]
}

//findItem, getItem
export function findObject(string, paramToSearch, dataCategory=""){
  for(var dataSet = 0; dataSet < global.dataLoadedAll.length; dataSet++){
    for(var i = 0; i < global.dataLoadedAll[dataSet].length; i++){
      if(global.dataLoadedAll[dataSet][i]["Data Category"]===dataCategory || dataCategory===""){
        if(global.dataLoadedAll[dataSet][i].hasOwnProperty(paramToSearch) && global.dataLoadedAll[dataSet][i][paramToSearch].toString()===string){
          return global.dataLoadedAll[dataSet][i];
        }
      }
    }
  }
  return false
}

export function findObjectWithGlobal(string, paramToSearch, globalCategory){
  for(var dataSet = 0; dataSet < globalCategory.length; dataSet++){
    for(var i = 0; i < globalCategory[dataSet].length; i++){
      if(globalCategory[dataSet][i].hasOwnProperty(paramToSearch) && globalCategory[dataSet][i][paramToSearch].toString()===string){
        return globalCategory[dataSet][i];
      }
    }
  }
  return false
}

export function findMultipleObjectWithGlobal(strings, paramToSearch, globalCategory, removeVariations=false, sortAfter=false){
  let outputObjects = []
  let previousVariation = ""
  for(var dataSet = 0; dataSet < globalCategory.length; dataSet++){
    for(var i = 0; i < globalCategory[dataSet].length; i++){
      for(var x = 0; x < strings.length; x++){
        if(removeVariations && globalCategory[dataSet][i].hasOwnProperty("Name") && previousVariation===globalCategory[dataSet][i]["Name"]){
          previousVariation = globalCategory[dataSet][i]["Name"]
          continue
        }
        if(globalCategory[dataSet][i].hasOwnProperty(paramToSearch) && globalCategory[dataSet][i][paramToSearch].toString()===strings[x]){
          outputObjects.push(globalCategory[dataSet][i]);
          previousVariation = globalCategory[dataSet][i]["Name"]
        }
      }
    }
  }
  if(sortAfter){
    let outputObjects2 = []
    for(let string of strings){
      for(let item of outputObjects){
        if(item[paramToSearch]===string){
          outputObjects2.push(item)
          continue
        }
      }
    }
    return outputObjects2
  }
  return outputObjects
}

export function getRecentItemObjectsList(){
  let objectKeyList = []
  for(let itemCheckListKey of global.collectionList.slice(-50).reverse()){
    let object = findObject(itemCheckListKey, "checkListKey")
    if(object!==false && object["Internal ID"]!==undefined){
      objectKeyList.push(object["Internal ID"])
    }
  }
  return objectKeyList
}

//find if any item is craftable given a material
export function anythingCraftable(materialName){
  if(materialName===undefined){return false}
  for(var i = 0; i < global.dataLoadedRecipes[0].length; i++){
    let item = global.dataLoadedRecipes[0][i]
    for(let j=1; j<10; j++){
      let materialIndex = "Material " + j.toString()
      if(item[materialIndex]!==undefined && item[materialIndex]===materialName){
        return true
      } 
    }
  }
  return false
}

export function isInteger(value) {
  return /^\d+$/.test(value);
}

export function indexCollectionList(collectionList){
  console.log("Collection list: "+collectionList)
  let collectionListOut = {}
  for(let entry of collectionList){
    if(entry==="---ACNH Pocket Guide Backup---"||entry===""){
      continue
    }
    collectionListOut[entry]=true
  }
  return collectionListOut
}

//in the format "6:00 PM"
export function convertTimeTo24Hours(time){
  var settingsUse24HourClock = getSettingsString("settingsUse24HourClock")==="true";
  if(time===undefined){
    return ""
  }
  if(settingsUse24HourClock){
    let currentHour = time.toString().split(":")[0].toString()
    let currentMinutes = time.toString().split(":")[1].toString().substring(0,2)
    let meridian = time.toString().split(":")[1].toString().slice(-2)
    if(meridian.toLowerCase()==="pm"){
      return (parseInt(currentHour) + 12).toString() + ":" + currentMinutes
    } else {
      return currentHour + ":" + currentMinutes
    }
  } else {
    let currentHour = time.toString().split(":")[0].toString()
    let currentMinutes = time.toString().split(":")[1].toString().substring(0,2)
    let meridian = time.toString().split(":")[1].toString().slice(-2)
    if(currentMinutes==="00"){
      return currentHour + " " + meridian
    }
  }
}

export function openURL(url){
  try{
    Linking.openURL(url)
  }catch(e){
    try{
      Clipboard.setString(url);
    }catch(e){
      if(toast)
        toast.show("", {type:"success",
          placement:'top',
          renderType:{
            success: (toast) => (
              <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, borderRadius: 5, backgroundColor: colors.popupSuccess[global.darkMode], alignItems:"center", justifyContent:"center"}}>
                <TextFont translate={false} style={{color:"white", fontSize: 15}}>{"There was an error opening the external link."}</TextFont>
              </View>
            ),
          }
        })
    }
    if(toast)
      toast.show("", {type:"success",
        placement:'top',
        renderType:{
          success: (toast) => (
            <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, borderRadius: 5, backgroundColor: colors.popupSuccess[global.darkMode], alignItems:"center", justifyContent:"center"}}>
              <TextFont translate={false} style={{color:"white", fontSize: 15}}>{"Copied to clipboard."}</TextFont>
            </View>
          ),
        }
      })
  }
}

export function findVillagersParadisePlanning(villagersName){
  let dataSet = require("./assets/data/DataCreated/Paradise Planning.json")
  for(let i = 0; i < dataSet.length; i++){
    if(dataSet[i]["Name"]===villagersName){
      return dataSet[i]
    }
  }
  return false
}

export async function addFilterPreset(name, filters) {
  let filterPresets = JSON.parse(await getStorage("filtersPresets", "{}"))
  filterPresets[name] = filters;
  await AsyncStorage.setItem("filtersPresets", JSON.stringify(filterPresets));
  console.log("Added filter: " + filterPresets)
}

export async function getFilterPresets(name, filters){
  let filterPresets = JSON.parse(await getStorage("filtersPresets", "{}"))
  return filterPresets;
}

export async function deleteFilterPreset(name){
  let filterPresets = JSON.parse(await getStorage("filtersPresets", "{}"))
  delete filterPresets[name];
  await AsyncStorage.setItem("filtersPresets", JSON.stringify(filterPresets));
  console.log("Deleted filter: " + filterPresets)
}