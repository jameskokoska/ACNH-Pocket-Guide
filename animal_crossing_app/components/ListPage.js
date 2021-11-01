import React, {Component, useState, useRef, useEffect} from 'react';
import {TouchableOpacity, View, Animated,StyleSheet,RefreshControl} from 'react-native';
import Header, {HeaderLoading, HeaderActive} from './Header';
import ListItem from './ListItem';
import {getInverseVillagerFilters, getCurrentVillagerFilters, determineDataGlobal, allVariationsChecked, inChecklist, inWishlist} from "../LoadJsonData"
import {Dimensions } from "react-native";
import {Variations,Phrase, CircularImage, RightCornerCheck, LeftCornerImage, Title} from './BottomSheetComponents';
import colors from "../Colors.js"
import {getCurrentDateObject, getMonthShort, isActive2} from "./DateFunctions"
import FishPopup from "../popups/FishPopup"
import SeaPopup from "../popups/SeaPopup"
import FossilPopup from "../popups/FossilPopup"
import BugPopup from "../popups/BugPopup"
import ArtPopup from "../popups/ArtPopup"
import VillagerPopup from "../popups/VillagerPopup"
import ClothingPopup from "../popups/ClothingPopup"
import FurniturePopup from "../popups/FurniturePopup"
import FloorWallsPopup from "../popups/FloorWallsPopup"
import ToolsPopup from "../popups/ToolsPopup"
import RecipesPopup from "../popups/RecipesPopup"
import MaterialsPopup from "../popups/MaterialsPopup"
import PopupFilter from './PopupFilter'
import TextFont from "./TextFont"
import {compareItemID, removeAccents,getSettingsString} from "../LoadJsonData"
import {PopupBottomCustom} from "./Popup"
import {gameVersion, museumCategories} from "../Changelog"

//use tabs={false} if the page doesn't have  the tab bar

Object.entries(exports).forEach(([name, exported]) => window[name] = exported);

const {diffClamp} = Animated;
function calculateHeaderHeight(){
  var headerHeight = Dimensions.get('window').height*0.3;
  var maxHeight = 845.7*0.3;
  if(headerHeight > maxHeight){
    headerHeight = maxHeight;
  }
  var minHeight = 451*0.3;
  if(headerHeight < minHeight){
    headerHeight = minHeight
  }
  return headerHeight
}

function ListPage(props){
  var headerHeight = calculateHeaderHeight();
  var selectedItem;
  var updateCheckChildFunction;
  var updateWishlistChildFunction;
  let avoidSpoilers = getSettingsString("settingsHideImages")==="true"
  const renderItem = (({ item }) =>
    <ListItem
      avoidSpoilers={avoidSpoilers}
      item={item}
      disablePopup={props.disablePopup}
      imageProperty={props.imageProperty} 
      textProperty={props.textProperty}
      textProperty2={props.textProperty2}
      textProperty3={props.textProperty3}
      gridType={props.gridType}
      key={item.checkListKeyString}
      dataGlobalName={props.dataGlobalName}
      openBottomSheet={(updateCheckChild, updateWishlistChild)=>{
        sheetRef.current.setPopupVisible(true); 
        if(props.activeCreatures && props.activeCreaturesPage===false){
          // console.log(props.scrollViewRef)
          props.scrollToEnd();
        }
        //pass in the check mark update function of that current element
        bottomSheetRenderRef.current.update(item, updateCheckChild)
        selectedItem = item;
        updateCheckChildFunction = updateCheckChild
        updateWishlistChildFunction = updateWishlistChild
      }}
      boxColor={props.boxColor}
      labelColor={props.labelColor}
      accentColor={props.accentColor}
      specialLabelColor={props.specialLabelColor}
      popUpCornerImageProperty={props.popUpCornerImageProperty}
      popUpCornerImageLabelProperty={props.popUpCornerImageLabelProperty}
      popUpPhraseProperty={props.popUpPhraseProperty}
      popUpContainer={props.popUpContainer}
      checkType={props.checkType}
      leaveWarning={props.leaveWarning}
      title={props.title}
    />
  )
  const ref = useRef(null);

  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight/0.8); //or 1.5

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

  const [search, setSearch] = useState("");
  function updateSearch(search){
    // console.log(search)
    setSearch(search);
  }

  const [refresh, setRefresh] = useState(false);

  const refreshFiltersArray = [
    "Collected",
    "Partially collected variations",
    "Not Collected",
    "Wishlist",
    "Museum",
    "Not Museum",
    "Old Resident",
    "Not Old Resident",
    "Do not have villager photo",
    "Have villager photo"
  ]

  const [searchFilters, setSearchFilters] = useState([]);
  function updateSearchFilters(searchFilters){
    setSearchFilters(searchFilters);
  }

  const [data, setData] = useState("empty")
  const [possibleFiltersState, setPossibleFilters] = useState("empty")
  const popupFilter = React.useRef(null);

  const componentIsMounted = useRef(true);
  useEffect(() => {
    return () => {
      componentIsMounted.current = false
    }
  }, [])

  useEffect(()=>{
    var dataUpdated = [];
    var previousVariation = "";
    var item;
    var dataLoaded2D = determineDataGlobal(props.dataGlobalName);

    var currentVillagerFilters;
    var currentVillagerFiltersInverse;
    if(props.title==="Obtainable DIYs" || props.title==="Obtainable Reactions" || props.title==="Unobtainable DIYs" || props.title==="Unobtainable Reactions"){
      currentVillagerFilters = getCurrentVillagerFilters();
      currentVillagerFiltersInverse = getInverseVillagerFilters();
    }
    
    // console.log(props.currentSetFilters)
    var searchCategoryOnly = false;
    for(var y = 0; y < searchFilters.length; y++){
      if(searchFilters[y].includes("Data Category")){
        searchCategoryOnly = true;
      } else if (!searchFilters[y].includes("Collected")){
        searchCategoryOnly = false;
        break;
      }
    }

    var searchActual = searchFilters;
    if(props.filterCollectedOnly){
      searchActual = ["Collected"];
    } else if (props.newItems){
      searchActual = ["New version"];
    // } else if (props.wishlistItems){
    //   searchActual = ["Wishlist",...searchFilters]; //todo add wishlist filtering eventually
    } else if (props.villagerGifts) {
      searchActual = [...props.villagerGiftsFilters,...searchActual];
    } else if (props.itemIDs!==undefined && props.itemIDs!=="") {
      searchActual = ["SearchIDs"]
    } else if (props.title==="Obtainable DIYs" || props.title==="Obtainable Reactions") {
      searchActual = [...currentVillagerFilters,...searchActual];
    } else if (props.title==="Unobtainable DIYs" || props.title==="Unobtainable Reactions") {
      searchActual = [...currentVillagerFiltersInverse,...searchActual];
      if(currentVillagerFiltersInverse.length===0){
        searchActual = [":"];
      }
    } else if (props.currentSetFilters!==undefined && props.currentSetFilters!="") {
      searchActual = [...props.currentSetFilters,...searchActual];
    }

    console.log(searchActual)
    //organize filters into categories
    var filters = {}
    var filterCategory = ""
    var filterCategoriesDone = []
    for(var p = 0; p < searchActual.length; p++){
      if(searchActual[p].includes(":")){
        filterCategory = searchActual[p].split(":")[0]
        var filtersWithin = []
        if(!filterCategoriesDone.includes(searchActual[p].split(":")[0])){
          for(var w = 0; w < searchActual.length; w++){
            if(searchActual[w].includes(":")){
              if(searchActual[w].split(":")[0]===filterCategory){
                filtersWithin.push(searchActual[w].split(":")[1])
              }
            }
          }
          filters[filterCategory]=filtersWithin
          filterCategoriesDone.push(filterCategory)
        }
      }
    }
    // console.log(filters)
    

    for(var j = 0; j < dataLoaded2D.length; j++){
      var dataLoaded = dataLoaded2D[j];

      for(var i = 0; i < dataLoaded.length; i++){
        item = dataLoaded[i];
        //Loop through the specific search criteria specified for this dataset
        for(var x = 0; x < props.searchKey[j].length; x++){
          var searchFound = false;
          var filterFound = false;
          var showUncraftableVar = true;
          var showPartiallyFoundOnly = true;
          for(var z = 0; z < searchActual.length; z++){
            if(searchActual.includes("New version") && props.newItems && item["Version Added"] !==undefined && item["Version Added"] !=="NA" && item["Version Added"]===gameVersion){
              filterFound = true;
              break;
            } else if (searchActual.includes("New version") && props.newItems){
              filterFound = false;
              break;
            } else if(searchActual.includes("Wishlist") && props.wishlistItems && global.collectionList.includes("wishlist"+item["checkListKey"])){
              filterFound = true;
              break;
            } else if (searchActual.includes("Wishlist") && props.wishlistItems){
              filterFound = false;
              break;
            } else if (searchActual.includes("SearchIDs")) {
              if(compareItemID(props.itemIDs, item)){
                filterFound = true;
              } else {
                filterFound = false;
                searchFound= false;
              }
              break;
            } else if(item["Data Category"]!==undefined && item["Data Category"]==="Art" && item["Genuine"]!==undefined && item["Genuine"]!=="Yes"){
              //Fix art, remove fake art from list no matter what
              break;
            }
            //Check category
            var searchCategory = true;
            for(var y = 0; y < searchActual.length; y++){
              if(searchActual[y].includes("Data Category")){
                //Category selected
                if(item[searchActual[y].split(":")[0]]!==undefined && item[searchActual[y].split(":")[0]].toLowerCase()===searchActual[y].split(":")[1].toLowerCase()){
                  //Item in selected category
                  searchCategory = true;
                  break;
                } else {
                  searchCategory = false;
                }
              }
            }
            //If the property is in search, not needed
            // if(props.searchKey[j].includes(search[z].split("-")[0])){
            //If property is Collected
            var searchCollected = true;
            if(searchActual.includes("Collected") || props.filterCollectedOnly){
              searchCollected = false;
              if(global.collectionList.includes(item["checkListKey"])){
                searchCollected = true;
                if(searchActual.length===1 || props.filterCollectedOnly){
                  filterFound = true;
                  //Only check collected filter
                  if(searchCollected && props.filterCollectedOnly){
                    filterFound = true;
                    break;
                  }
                  break;
                }
              }
            } else if(searchActual.includes("Not Collected")){
              searchCollected = false;
              if(!global.collectionList.includes(item["checkListKey"])){
                searchCollected = true;
                if(searchActual.length===1){
                  filterFound = true;
                  break;
                }
              }
            }
            if(searchActual.includes("Collected")&&searchActual.includes("Not Collected")){
              searchCollected=true;
            }
            if (searchActual.includes("Partially collected variations")){
              if(allVariationsChecked(item, item.index)){
                showPartiallyFoundOnly = false;
              } else {
                showPartiallyFoundOnly = true;
                searchCollected = true;
              }
              if((searchActual.includes("Collected")||searchActual.includes("Not Collected")) && searchCollected){
                showPartiallyFoundOnly = true;
              }
            }

            //special case for categories
            if(props.title==="Obtainable DIYs" || props.title==="Obtainable Reactions" || props.title==="Unobtainable DIYs" || props.title==="Unobtainable Reactions"){
              if(searchCollected && item[searchActual[z].split(":")[0]]!==undefined && item[searchActual[z].split(":")[0]].toLowerCase()===searchActual[z].split(":")[1].toLowerCase()){
                if((props.title==="Obtainable DIYs" || props.title==="Unobtainable DIYs") && item.checkListKey.includes("recipesCheckList")){
                  filterFound = true;
                  break;
                } else if((props.title==="Obtainable Reactions" || props.title==="Unobtainable Reactions") && item.checkListKey.includes("emojiCheckList")){
                  filterFound = true;
                  break;
                } else {
                  filterFound = false;
                  continue;
                }
              } else {
                filterFound = false;
                continue;
              }
            }
            else if(searchCollected && (props.villagerGifts===true && item["Color 1"]!==undefined && item["Color 2"]!==undefined && item["Style 1"]!==undefined && item["Style 2"]!==undefined) &&
              (item["Color 1"].includes(searchActual[0])  || 
              item["Color 2"].includes(searchActual[1])  || 
              item["Color 2"].includes(searchActual[0])  || 
              item["Color 1"].includes(searchActual[1])   ) && (
              item["Style 1"].includes(searchActual[2])  || 
              item["Style 2"].includes(searchActual[3])  || 
              item["Style 2"].includes(searchActual[2])  || 
              item["Style 1"].includes(searchActual[3]) )
            ){
              if(searchActual.includes("Villager Equippable:Yes")||searchActual.includes("Villager Equippable:No")){
                if((item["Villager Equippable"]==="Yes" && searchActual.includes("Villager Equippable:Yes")) || (item["Villager Equippable"]==="No" && searchActual.includes("Villager Equippable:No"))){
                  filterFound = true;
                } else {
                  filterFound = false;
                  break;
                }
              } else {
                filterFound = true;
                break;
              }
            } else if(props.villagerGifts===true){
              filterFound = false;
              break;
            } 
            //Only check the property selected
            else if((searchCollected) && (searchCategory || searchCategoryOnly) && (!searchActual[z].includes("Data Category") || searchCategoryOnly)){
              filterFound = true;
              for(var f = 0; f<Object.keys(filters).length; f++){
                var filterCategory = Object.keys(filters)[f];
                var filterCurrentFound = false;
                for(var e = 0; e<filters[filterCategory].length; e++){
                  //check if split by semicolon
                  if(item[filterCategory]!==undefined){
                    var allEntries = item[filterCategory].split("; ")
                    for(var o = 0; o<allEntries.length; o++){
                      if(allEntries[o]!==undefined && allEntries[o].toLowerCase()===filters[filterCategory][e].toLowerCase()){
                        filterCurrentFound = true
                        break;
                      } 
                    }
                  }
                  if(item[filterCategory]!==undefined && item[filterCategory].toLowerCase()===filters[filterCategory][e].toLowerCase()){
                    filterCurrentFound = true
                    break;
                  }
                }
                if(filterCurrentFound===false){
                  filterFound = false;
                  break;
                }
              }
              showUncraftableVar = true;
              if(searchActual.includes("Show uncraftable item variations") && item["Body Customize"] !==undefined && item["Body Customize"] ==="No" && item["Variant ID"] !==undefined && item["Variant ID"] !=="NA"){
                showUncraftableVar = true;
              } else if (searchActual.includes("Show uncraftable item variations")){
                showUncraftableVar = false;
              }

              if(searchActual.includes("Show craftable item variations") && ((item["Pattern Customize"] !==undefined && item["Pattern Customize"] ==="No") || (item["Pattern Customize"] ===undefined)) && ((item["Body Customize"] !==undefined && item["Body Customize"] ==="No") || (item["Body Customize"] ===undefined)) && item["Variant ID"] !==undefined && item["Variant ID"] !=="NA"){
                showUncraftableVar = false;
              } else if (searchActual.includes("Show craftable item variations") && item["Variant ID"] !==undefined && item["Variant ID"] ==="NA"){
                showUncraftableVar = false;
              } else if (searchActual.includes("Show craftable item variations") && item["Kit Cost"]===undefined){
                showUncraftableVar = false;
              }
              // if( item.[searchActual[z].split(":")[0]]!==undefined && item.[searchActual[z].split(":")[0]].toLowerCase()===searchActual[z].split(":")[1].toLowerCase()){
              //   filterFound = true;
              // } else if (item.[searchActual[z].split(":")[0]]!==undefined && item.[searchActual[z].split(":")[0]].includes("; ")){
              //   var allEntries = item.[searchActual[z].split(":")[0]].split("; ")
              //   for(var o = 0; o<allEntries.length; o++){
              //     if(allEntries[o]!==undefined && allEntries[o].toLowerCase()===searchActual[z].split(":")[1].toLowerCase()){
              //       filterFound = true;
              //     } 
              //   }
              // } else if (searchActual[z].includes(":")){
              //   filterFound = false;
              //   break;
              // }
              // if(filterFound){
              //   break;
              // }
            }
            // }
          }
          
          if(item[props.searchKey[j][x]]!==undefined){
            //Translate search attribute from database
            //Search translations done here
            // searchFound = attemptToTranslateItem(item.[props.searchKey[j][x]]).toLowerCase().includes(search.toLowerCase())
            searchFound = removeAccents(item[props.searchKey[j][x]].toLowerCase()).includes(removeAccents(search.toLowerCase()))
          }
          //&&((!props.wishlistItems&&!props.filterCollectedOnly&&!props.newItems)||searchFound)
          if(showPartiallyFoundOnly && showUncraftableVar && (search==="" || searchFound) && (filterFound || searchActual.length === 0)){
            //Search result found...
              //If recipes item page, and its not DIY, remove
              if(props.recipes){
                if(item["DIY"]!=="Yes"){
                  continue;
                }
              }
              //If current active creatures, don't add it if not active
              if(props.activeCreatures){
                var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH "
                var currentMonthShort = getMonthShort(getCurrentDateObject().getMonth());
                if(!isActive2(item[hemispherePre+currentMonthShort],getCurrentDateObject().getHours())){
                  continue;
                }
              }
              //If list only active creatures for the month, don't add it if === NA
              //This is now done through filtering
              // if(props.activeCreaturesMonth && getSettingsString("settingsListOnlyActiveCreatures") === "true"){
              //   var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH "
              //   var currentMonthShort = getMonthShort(getCurrentDateObject().getMonth());
              //   if(item[hemispherePre+currentMonthShort]==="NA"){
              //     continue;
              //   }
              // }
              // if(item.[props.textProperty[j]]===previousVariation){
              //   previousVariation = item.[props.textProperty[j]];
              if(item["Name"]===previousVariation && !item["checkListKey"].includes("recipesCheckList")){
                previousVariation = item["Name"];
              } else {
                if(props.wishlistItems || searchActual.includes("Wishlist")){
                  if(global.collectionList.includes("wishlist"+item["checkListKey"])){
                    item.dataSet = j;
                    item.index = i;
                    dataUpdated = [...dataUpdated, item];
                    // previousVariation = item.[props.textProperty[j]];
                    // previousVariation = item["Name"];
                  } 
                } else if(searchActual.includes("Museum")){
                  if(item["Data Category"]!==undefined && museumCategories.includes(item["Data Category"]) && global.collectionList.includes("museum"+item["checkListKey"])){
                    item.dataSet = j;
                    item.index = i;
                    dataUpdated = [...dataUpdated, item];
                    // previousVariation = item.[props.textProperty[j]];
                    previousVariation = item["Name"];
                  } 
                } else if(searchActual.includes("Not Museum")){
                  if(item["Data Category"]!==undefined && museumCategories.includes(item["Data Category"]) && !global.collectionList.includes("museum"+item["checkListKey"])){
                    item.dataSet = j;
                    item.index = i;
                    dataUpdated = [...dataUpdated, item];
                    // previousVariation = item.[props.textProperty[j]];
                    previousVariation = item["Name"];
                  } 
                } else if(searchActual.includes("Old Resident")){
                  if(item["Data Category"]!==undefined && item["Data Category"]==="Villagers" && global.collectionList.includes("oldResident"+item["checkListKey"])){
                    item.dataSet = j;
                    item.index = i;
                    dataUpdated = [...dataUpdated, item];
                    // previousVariation = item.[props.textProperty[j]];
                    previousVariation = item["Name"];
                  } 
                } else if(searchActual.includes("Not Old Resident")){
                  if(item["Data Category"]!==undefined && item["Data Category"]==="Villagers" && !global.collectionList.includes("oldResident"+item["checkListKey"])){
                    item.dataSet = j;
                    item.index = i;
                    dataUpdated = [...dataUpdated, item];
                    // previousVariation = item.[props.textProperty[j]];
                    previousVariation = item["Name"];
                  } 
                } else if(searchActual.includes("Have villager photo")){
                  if(item["Data Category"]!==undefined && item["Data Category"]==="Villagers" && global.collectionList.includes("havePhoto"+item["checkListKey"])){
                    item.dataSet = j;
                    item.index = i;
                    dataUpdated = [...dataUpdated, item];
                    // previousVariation = item.[props.textProperty[j]];
                    previousVariation = item["Name"];
                  } 
                } else if(searchActual.includes("Do not have villager photo")){
                  if(item["Data Category"]!==undefined && item["Data Category"]==="Villagers" && !global.collectionList.includes("havePhoto"+item["checkListKey"])){
                    item.dataSet = j;
                    item.index = i;
                    dataUpdated = [...dataUpdated, item];
                    // previousVariation = item.[props.textProperty[j]];
                    previousVariation = item["Name"];
                  } 
                } else {
                  item.dataSet = j;
                  item.index = i;
                  dataUpdated = [...dataUpdated, item];
                  // previousVariation = item.[props.textProperty[j]];
                  previousVariation = item["Name"];
                }
                
              }
            // } else {
            //   item.dataSet = j;
            //   item.index = i;
            //   dataUpdated = [...dataUpdated, item];
            //   break;
            // }
          }
        }
      }
    }

    //Sort alphabetically
    if(getSettingsString("settingsSortAlphabetically")==="true"){
      var dataLoadedCopy = dataUpdated.slice(0);
      dataLoadedCopy.sort(function(a, b) {
        var textA
        var textB
        if(a===undefined || a.NameLanguage===undefined){
          textA = ""
        } else {
          textA = removeAccents(a.NameLanguage.toUpperCase()).replace("-"," ");
        }
        if(b===undefined || b.NameLanguage===undefined){
          textB = ""
        } else {
          textB = removeAccents(b.NameLanguage.toUpperCase()).replace("-"," ");
        }
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      dataUpdated = dataLoadedCopy
    }

    //Sort based on critterpedia entry number
    if(getSettingsString("settingsSortCritterpedia")==="true" && (props.title==="Fish" || props.title==="Bugs" || props.title==="Sea Creatures")){
      var dataLoadedCopy = dataUpdated.slice(0);
      dataLoadedCopy.sort(function(a, b) {
        var textA = parseInt(a["#"]);
        var textB = parseInt(b["#"]);
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      dataUpdated = dataLoadedCopy
    }

    //Sort based on filters
    var shouldSortDirection = false;
    for(var sort = 0; sort<searchActual.length; sort++){
      var shouldSortDirection = searchActual[sort].includes("Reverse direction");
      if(shouldSortDirection){
        break;
      }
    }
    for(var sort = 0; sort<searchActual.length; sort++){
      if(searchActual[sort].includes("Sort-")){
        var propertyToSort = searchActual[sort].replace("Sort-","")
        var dataLoadedCopy = dataUpdated.slice(0);
          dataLoadedCopy.sort(function(a, b) {
            var valueA = a[propertyToSort]
            if(a[propertyToSort]===undefined && !shouldSortDirection){
              valueA="zzzzzzzzzzz"
            } else if(a[propertyToSort]===undefined){
              valueA="aaaaaaaaaaa"
            }
            var valueB = b[propertyToSort]
            if(b[propertyToSort]===undefined && !shouldSortDirection){
              valueB="zzzzzzzzzzz"
            } else if(b[propertyToSort]===undefined){
              valueB="aaaaaaaaaaa"
            }
            
            var textA = valueA;
            var textB = valueB;
            if(searchActual.includes)
            if(!shouldSortDirection){
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            } else {
              return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            }
          });
        dataUpdated = dataLoadedCopy
      } else if(searchActual[sort].includes("SortInt-")){
        var propertyToSort = searchActual[sort].replace("SortInt-","")
        var dataLoadedCopy = dataUpdated.slice(0);
          dataLoadedCopy.sort(function(a, b) {
            var valueA = a[propertyToSort]
            if(a[propertyToSort]===undefined && shouldSortDirection){
              valueA=10000000000000
            } else if(a[propertyToSort]===undefined){
              valueA=0
            }
            var valueB = b[propertyToSort]
            if(b[propertyToSort]===undefined && shouldSortDirection){
              valueB=10000000000000
            } else if(b[propertyToSort]===undefined){
              valueB=0
            }
            
            var textA = parseInt(valueA);
            var textB = parseInt(valueB);
            if(searchActual.includes)
            if(shouldSortDirection){
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            } else {
              return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
            }
          });
        dataUpdated = dataLoadedCopy
      }
    }

    setData(dataUpdated)
    setRefresh(false)
    
  }, [props, search, searchFilters, refresh])
  
  var numColumns=3;
  if(props.gridType==="smallGrid"){
    numColumns=3;
    var maxWidth = 511
    if(Dimensions.get('window').width>maxWidth){
      numColumns = parseInt(Dimensions.get('window').width / (maxWidth/3))
    }
  } else if (props.gridType==="largeGrid" || props.gridType==="largeGridSmaller"){
    numColumns=2;
    var maxWidth = 511
    if(Dimensions.get('window').width>maxWidth){
      numColumns = parseInt(Dimensions.get('window').width / (maxWidth/2))
    }
  } else if (props.gridType==="row"||props.gridType===undefined){
    numColumns=1;
    var maxWidth = 511
    if(Dimensions.get('window').width>maxWidth){
      numColumns = parseInt(Dimensions.get('window').width / (maxWidth/1))
    }
  }
  
  const sheetRef = React.useRef(null);
  const bottomSheetRenderRef = React.useRef(null);

  // //if bottom sheet is really large, allow scrolling
  var bottomSheetTopPadding = 0;
  
  // if(props.popUpContainer!=undefined && props.popUpContainer[0][1]>=1000 && getSettingsValue("settingsTabBarPosition")==="false"){
  //   bottomSheetTopPadding = 70;
  // }

  const springConfig = {
      damping: 20,
      mass: 1,
      stiffness: 135,
      overshootClamping: true,
      restSpeedThreshold: 0.01,
      restDisplacementThreshold: 0.001
  };
  var header = (<>
      <Animated.View style={[styles.header, {transform: [{translateY}]}]}>
        {/* <Animated.View style={{zIndex:99, 
          transform: [
              { scale: Animated.multiply(1/headerHeight,scrollY.current) },
              { rotate: '0deg'},
            ],
          width: Dimensions.get('window').width, 
          height: Dimensions.get('window').height, position:"absolute"}} 
        pointerEvents="none"> */}
        <Header setPage={props.setPage} extraInfo={props.extraInfo} smallerHeader={props.smallerHeader} disableFilters={props.disableFilters} customHeader={props.customHeader} disableSearch={props.disableSearch} subHeader={props.subHeader} searchFilters={searchFilters} openPopupFilter={() => {popupFilter.current.setPopupVisible(true)}} title={props.title} headerHeight={headerHeight} updateSearch={updateSearch} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
        {/* </Animated.View> */}
      </Animated.View>

    </>);
  var paddingTop = headerHeight*1.18;
  var paddingBottom = Dimensions.get('window').height;
  if (props.title==="" && !props.activeCreatures){
    header = <View/>;
    paddingTop = 20;
    paddingBottom = 20;
  } else if (props.activeCreatures && props.activeCreaturesPage===false){
    paddingTop = 0;
    paddingBottom = 0;
    header = (<>
        <HeaderActive searchFilters={searchFilters} openPopupFilter={() => {popupFilter.current.setPopupVisible(true)}} title={props.title} headerHeight={headerHeight} updateSearch={updateSearch} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
    </>);
  }
  var style= {height: Dimensions.get('window').height, paddingBottom: paddingBottom,marginTop: -10}
  var paddingBottomContent = 150;
  if(data==="empty" && ((props.activeCreatures&&props.activeCreaturesPage===false)||props.title==="")){
    return(
      <View/>
    )
  }else if(data==="empty"){
    return(<>
        <HeaderLoading disableSearch={props.disableSearch} title={props.title} headerHeight={headerHeight} appBarColor={props.appBarColor} searchBarColor={props.searchBarColor} titleColor={props.titleColor} appBarImage={props.appBarImage}/>
      </>
    )
  } else if(props.comingSoon){
    return(<>
      <View style={{height:10}}/>
      {header}
      <PopupFilter villagerGifts={props.villagerGifts} disableFilters={props.disableFilters} title={props.title} ref={popupFilter} filterSearchable={props.filterSearchable} updateSearchFilters={updateSearchFilters}/> 
      <View style={{height:Dimensions.get('window').height/2}}/>
      <TextFont bold={false} style={{fontSize: 16, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Coming soon</TextFont>
      <TextFont bold={false} style={{fontSize: 16, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Please be patient</TextFont>
      <View style={{height:30}}/>
      </>
    )
  } else if (searchFilters!=undefined && searchFilters.length===0 && data.length===0 && props.wishlistItems && search==="" && !global.collectionList.includes("wishlist")){
    return(<>
      <View style={{height:10}}/>
      {header}
      <PopupFilter villagerGifts={props.villagerGifts} disableFilters={props.disableFilters} title={props.title} ref={popupFilter} filterSearchable={props.filterSearchable} updateSearchFilters={updateSearchFilters}/> 
      <View style={{height:Dimensions.get('window').height/2}}/>
      <TouchableOpacity onPress={() => props.setPage(1)}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"You have no wishlist items."}</TextFont>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"Long press items to add them to your wishlist."}</TextFont>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>Tap here and go add some</TextFont>
      </TouchableOpacity>
      <View style={{height:30}}/>
    </>)
  } else if (data.length===0 && (props.title==="Unobtainable DIYs" || props.title==="Unobtainable Reactions") && search===""){
    return(<>
      <View style={{height:10}}/>
      {header}
      <View style={{height:Dimensions.get('window').height/2}}/>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"You can get everything since you have all personality types!"}</TextFont>
      <View style={{height:30}}/>
    </>)
  } else if (data.length===0 && (props.title==="Unobtainable DIYs" || props.title==="Unobtainable Reactions") && search===""){
    return(<>
      <View style={{height:10}}/>
      {header}
      <View style={{height:Dimensions.get('window').height/2}}/>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"Your search results/selected filters produced no results"}</TextFont>
      <View style={{height:30}}/>
    </>)
  } else {
    return (
    <View style={{backgroundColor:props.backgroundColor}} >
      {header}
      <PopupFilter villagerGifts={props.villagerGifts} disableFilters={props.disableFilters} title={props.title} ref={popupFilter} filterSearchable={props.filterSearchable} updateSearchFilters={updateSearchFilters}/> 
      {/* setFilterPopupState(false) */}
      <Animated.FlatList
        nestedScrollEnabled
        initialNumToRender={45}
        scrollEventThrottle={16}
        contentContainerStyle={{paddingTop: paddingTop+10, paddingLeft: 8, paddingRight: 8, paddingBottom: paddingBottomContent}}
        onScroll={handleScroll}
        ref={ref}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `list-item-${index}-${item.checkListKeyString}`}
        numColumns={numColumns}
        key={numColumns}
        style={style}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={500}
        windowSize={10}
        refreshControl={
          <RefreshControl
            onRefresh={()=>{if(props.wishlistItems||searchFilters.some(item=>refreshFiltersArray.includes(item)))setRefresh(true)}} //only refresh if the order has the possibility of changing
            refreshing={refresh}
            progressViewOffset={headerHeight+50}
            progressBackgroundColor={colors.lightDarkAccentHeavy2[global.darkMode]}
            colors={[colors.textBlack[global.darkMode]]}
          />
        }
      />
      
      <PopupBottomCustom
        ref={sheetRef}
        padding={0}
        invisible={true}
        restrictSize={false}
        onClose={()=>{
          console.log(selectedItem); 
          if(selectedItem!=null && selectedItem!=undefined){
            !updateCheckChildFunction(inChecklist(selectedItem.checkListKey));
            !updateWishlistChildFunction(inWishlist(selectedItem.checkListKey));
          }
        }}
      >
        <BottomSheetRender 
          setPage={props.setPage}
          activeCreatures={props.activeCreatures}
          activeCreaturesPage={props.activeCreaturesPage}
          ref={bottomSheetRenderRef}
          imageProperty={props.imageProperty} 
          textProperty={props.textProperty}
          textProperty2={props.textProperty2}
          textProperty3={props.textProperty3}
          dataGlobalName={props.dataGlobalName}
          boxColor={props.boxColor}
          labelColor={props.labelColor}
          accentColor={props.accentColor}
          specialLabelColor={props.specialLabelColor}
          popUpCornerImageProperty={props.popUpCornerImageProperty}
          popUpCornerImageLabelProperty={props.popUpCornerImageLabelProperty}
          popUpPhraseProperty={props.popUpPhraseProperty}
          popUpContainer={props.popUpContainer}
          checkType={props.checkType}
          tabs={props.tabs}
        />
      </PopupBottomCustom>
    </View>
  );
  }
  
};

export default React.memo(ListPage);

class BottomSheetRender extends Component{
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.state = {
      item:"item",
    }
    this.updateCheckChildFunction="";
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  update(item, updateCheckChildFunction){
    if(this.mounted){
      this.forceUpdate();
      this.setState({
        item:item,
      })
      // console.log("item available to popup:")
      // console.log(item)
      if(item!==undefined){
        this.updateCheckChildFunction=updateCheckChildFunction;
      }
    }
  }
  updateVariations = (key,checked)=>{
    this.variations.updateVariations(key,checked);
  }
  updateRightCornerCheck= (key,checked)=>{
    this.rightCornerCheck.updateRightCornerCheck(key,checked);
  }
  render(){
    var leftCornerImage;
    if(this.props.popUpCornerImageProperty!==undefined && this.props.popUpCornerImageLabelProperty!==undefined && this.state.item.dataSet!==undefined && this.props.popUpCornerImageProperty[this.state.item.dataSet]!==""){
      leftCornerImage = <LeftCornerImage
        item={this.state.item}
        accentColor={this.props.accentColor}
        popUpCornerImageProperty={this.props.popUpCornerImageProperty}
        popUpCornerImageLabelProperty={this.props.popUpCornerImageLabelProperty}
      />
    }else{
      leftCornerImage = <View/>
    }

    var phrase;
    if(this.props.popUpPhraseProperty!==undefined){
      phrase = <Phrase
        item={this.state.item}
        popUpPhraseProperty={this.props.popUpPhraseProperty}
        specialLabelColor={this.props.specialLabelColor}
      />
    } else {
      phrase = <View/>
    }

    
    //Add popup classes here
    var popUpContainer = <View/>
    var marginHorizontal = 0;
    if(this.props.popUpContainer!==undefined && this.props.popUpContainer.hasOwnProperty(this.state.item.dataSet) && this.state.item.dataSet!==undefined){
      if(this.props.popUpContainer[this.state.item.dataSet][0]==="FishPopup"){
        popUpContainer = <FishPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="SeaPopup"){
        popUpContainer = <SeaPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="FossilPopup"){
        popUpContainer = <FossilPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="BugPopup"){
        popUpContainer = <BugPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="ArtPopup"){
        popUpContainer = <ArtPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="VillagerPopup"){
        popUpContainer = <VillagerPopup item={this.state.item} setPage={this.props.setPage}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="ClothingPopup"){
        popUpContainer = <ClothingPopup item={this.state.item} setPage={this.props.setPage}/>
        marginHorizontal = 60;
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="FurniturePopup"){
        popUpContainer = <FurniturePopup item={this.state.item}/>
        marginHorizontal = 60;
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="FloorWallsPopup"){
        popUpContainer = <FloorWallsPopup item={this.state.item}/>
        marginHorizontal = 60;
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="ToolsPopup"){
        popUpContainer = <ToolsPopup item={this.state.item}/>
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="RecipesPopup"){
        popUpContainer = <RecipesPopup item={this.state.item}/>
        marginHorizontal = 60;
      } else if(this.props.popUpContainer[this.state.item.dataSet][0]==="MaterialsPopup"){
        popUpContainer = <MaterialsPopup item={this.state.item}/>
      }
    } else {
      return <View/>
    }
    
    var rightCornerCheck = <View/>
    if(this.state.item!==undefined && this.updateCheckChildFunction!==""){
      rightCornerCheck = <RightCornerCheck
        item={this.state.item}
        updateCheckChildFunction={this.updateCheckChildFunction}
        checkType={this.props.checkType}
        updateVariations={this.updateVariations}
        ref={(rightCornerCheck) => this.rightCornerCheck = rightCornerCheck}
      />
    }
    return <View>
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: colors.white[global.darkMode],
          padding: 16,
          marginTop: getSettingsString("settingsLargerItemPreviews")==="false" ? 100 : 200,
        }}
      >
          <CircularImage 
            item={this.state.item}
            imageProperty={this.props.imageProperty}
            accentColor={this.props.accentColor}
          />
          {leftCornerImage}
          {rightCornerCheck}
          <View style={{height: 60}}/>
          {phrase}
          <Title
            item={this.state.item}
            textProperty={this.props.textProperty}
            popUpPhraseProperty={this.props.popUpPhraseProperty}
            marginHorizontal={marginHorizontal}
          />
          <Variations 
            updateRightCornerCheck={this.updateRightCornerCheck}
            ref={(variations) => this.variations = variations}
            item={this.state.item}
            updateCheckChildFunction={this.updateCheckChildFunction}
            imageProperty={this.props.imageProperty} 
            globalDatabase={global.dataLoadedAll} 
          />
          {popUpContainer}
          {this.props.activeCreatures===true && this.props.activeCreaturesPage===false ? <View style={{height:50}}/> : <View/>}
          {this.props.tabs===false ? <View style={{height:50}}/> : <View style={{height:100}}/>}
      </View>
    </View>
  }
}

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
    height: calculateHeaderHeight() / 2,
    width: '100%',
    paddingHorizontal: 10,
  },
});
