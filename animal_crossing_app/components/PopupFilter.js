import React, { Component } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Image
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import {translateFilters, getStorage, attemptToTranslate, getSettingsString, addFilterPreset} from '../LoadJsonData';
import AsyncStorage from '@react-native-async-storage/async-storage';
const filterDefinitions = require("../assets/data/Generated/filterDefinitions.json");
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {MaterialIcons} from '@expo/vector-icons';
import { AnimatedPopupWrapper } from "./PopupAnimatedWrapper";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { PopupInfoCustom } from "./Popup";

function addNewFilter(filterObject, newFilter){
  filterObject[0].children.push(newFilter)
  return filterObject
}

class PopupFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      selectedItems: [],
    };
    this.savedItems = []
    this.openFirst = true;

    var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH ";
    let customListFilters = []
    for(let customListName of global.customLists){
      customListFilters.push({name:customListName, id:"{CustomLists}"+customListName},)
    }

    let removeBuyPriceFilters = false
    if (this.props.title==="Active Creatures" || this.props.title==="Fish" || this.props.title==="Bugs" || this.props.title==="Sea Creatures" || this.props.title==="Fossils"){
      removeBuyPriceFilters = true
    }

    this.possibleFilters = [{
      "name": "Collected/Not Collected",
      "id": "Collected/Not Collected",
      "children": [
        {name:"Collected", id:"Collected"},{name:"Not Collected", id:"Not Collected"},{name:"", id:"break10"},{name:"Fully Collected Variations", id:"Fully Collected Variations"},{name:"Partially Collected Variations", id:"Partially Collected Variations"},{name:"Missing All Variations", id:"Missing All Variations"},{name:"Incomplete Items", id:"Incomplete Items"}
      ]
    },
    {
      "name": "Custom Lists",
      "id": "Custom Lists",
      "children":[
        {name:"Wishlist", id:"Wishlist"},
        ...customListFilters
      ]
    }
    ]
    this.museumFilters = [{
      "name": "Museum",
      "id": "MuseumFilters",
      "children": [
        {name:"Donated to museum", id:"Museum"},{name:"Not donated to museum", id:"Not Museum"}
      ]
    }]
    this.villagerFilters = [{
      "name": "Villagers",
      "id": "VillagerFilters",
      "children": [
        {name:"Completed Paradise Planning", id:"Completed Paradise Planning"},{name:"Incomplete Paradise Planning", id:"Incomplete Paradise Planning"},{name:"Old villager resident", id:"Old Resident"},{name:"Not an old villager resident", id:"Not Old Resident"},{name:"Have villager photo", id:"Have villager photo"},{name:"Do not have villager photo", id:"Do not have villager photo"}
      ]
    }]
    this.genderFilters = [{
      "name": "Genders",
      "id": "GenderFilters",
      "children": [
        {name:"Male", id:"Gender:Male"},{name:"Female", id:"Gender:Female"}
      ]
    }]
    this.sortByFiltersCollectedOnly = [
      {
        "name": "Sort by...",
        "id": "Sort by...",
        "children": [
          {name:"Reverse sorting direction", id:"Reverse direction"},
          {name:"", id:"break"},
          {name:"Collected", id:"Sort-Collected"},
          {name:getSettingsString("settingsSortAlphabetically")==="true" ? "Remove Alphabetical Sorting" : "Alphabetical", id:getSettingsString("settingsSortAlphabetically")==="true" ? "Sort-RemoveAlphabetical" : "Sort-Alphabetical"},
        ]
      },
    ]
    this.sortByFilters = [
      {
        "name": "Sort by...",
        "id": "Sort by...",
        "children": [
          {name:"Reverse sorting direction", id:"Reverse direction"},
          {name:"", id:"break"},
          {name:"Collected", id:"Sort-Collected"},
          {name:"Type category", id:"Sort-Data Category"},
          {name:"Sell price", id:"SortInt-Sell"},
          ...(removeBuyPriceFilters ? [] : [{name:"Buy price", id:"SortInt-Buy"}]),
          {name:"Color 1", id:"Sort-Color 1"},
          {name:"Color 2", id:"Sort-Color 2"},
          {name:"Furniture tag", id:"Sort-Tag"},
          {name:getSettingsString("settingsSortAlphabetically")==="true" ? "Remove Alphabetical Sorting" : "Alphabetical", id:getSettingsString("settingsSortAlphabetically")==="true" ? "Sort-RemoveAlphabetical" : "Sort-Alphabetical"},
        ]
      },
    ]
    this.sortByFiltersReducedWithColor = [
      {
        "name": "Sort by...",
        "id": "Sort by...",
        "children": [
          {name:"Reverse sorting direction", id:"Reverse direction"},
          {name:"", id:"break"},
          {name:"Collected", id:"Sort-Collected"},
          {name:"Sell price", id:"SortInt-Sell"},
          ...(removeBuyPriceFilters ? [] : [{name:"Buy price", id:"SortInt-Buy"}]),
          {name:"Color 1", id:"Sort-Color 1"},
          {name:"Color 2", id:"Sort-Color 2"},
          {name:getSettingsString("settingsSortAlphabetically")==="true" ? "Remove Alphabetical Sorting" : "Alphabetical", id:getSettingsString("settingsSortAlphabetically")==="true" ? "Sort-RemoveAlphabetical" : "Sort-Alphabetical"},
        ]
      },
    ]
    this.sortByFiltersReduced = [
      {
        "name": "Sort by...",
        "id": "Sort by...",
        "children": [
          {name:"Reverse sorting direction", id:"Reverse direction"},
          {name:"", id:"break"},
          {name:"Collected", id:"Sort-Collected"},
          {name:"Sell price", id:"SortInt-Sell"},
          ...(removeBuyPriceFilters ? [] : [{name:"Buy price", id:"SortInt-Buy"}]),
          {name:getSettingsString("settingsSortAlphabetically")==="true" ? "Remove Alphabetical Sorting" : "Alphabetical", id:getSettingsString("settingsSortAlphabetically")==="true" ? "Sort-RemoveAlphabetical" : "Sort-Alphabetical"},
        ]
      },
    ]
    this.sortByDataCategoryFilter = {name:"Type category", id:"Sort-Data Category"}
    this.invertFilters = [
      {
        "name": "Invert Filters...",
        "id": "Invert Filters...",
        "children": [
          {name:"Filter Out", id:"Filter Out"},
        ]
      },
    ]
    var notCraftVariationsFilters = [{
      "name": "Uncraftable Item Variations Filter",
      "id": "Uncraftable Item Variations Filter",
      "children": [{name:"Show uncraftable item variations", id:"Show uncraftable item variations"}, {name:"Show craftable item variations", id:"Show craftable item variations"}]
    }]
    var activeFilters = [{
      "name": "Active Times Filters",
      "id": "Active Times Filters",
      "children": [
        {name:"Can catch in January",id:hemispherePre+"Jan Active:true"},
        {name:"Can catch in February",id:hemispherePre+"Feb Active:true"},
        {name:"Can catch in March",id:hemispherePre+"Mar Active:true"},
        {name:"Can catch in April",id:hemispherePre+"Apr Active:true"},
        {name:"Can catch in May",id:hemispherePre+"May Active:true"},
        {name:"Can catch in June",id:hemispherePre+"Jun Active:true"},
        {name:"Can catch in July",id:hemispherePre+"Jul Active:true"},
        {name:"Can catch in August",id:hemispherePre+"Aug Active:true"},
        {name:"Can catch in September",id:hemispherePre+"Sep Active:true"},
        {name:"Can catch in October",id:hemispherePre+"Oct Active:true"},
        {name:"Can catch in November",id:hemispherePre+"Nov Active:true"},
        {name:"Can catch in December",id:hemispherePre+"Dec Active:true"},
      ]
    }]
    const categoriesAll = [{
      "name": "Type Categories",
      "id": "Type Categories",
      "children": [{"name":"Housewares","id":"Data Category:Housewares"},{"name":"Miscellaneous","id":"Data Category:Miscellaneous"},{"name":"Wall-mounted","id":"Data Category:Wall-mounted"},{"name":"Ceiling Decor","id":"Data Category:Ceiling Decor"},{"name":"Photos","id":"Data Category:Photos"},{"name":"Posters","id":"Data Category:Posters"},{"name":"Headwear","id":"Data Category:Headwear"},{"name":"Accessories","id":"Data Category:Accessories"},{"name":"Tops","id":"Data Category:Tops"},{"name":"Dress-Up","id":"Data Category:Dress-Up"},{"name":"Clothing Other","id":"Data Category:Clothing Other"},{"name":"Bottoms","id":"Data Category:Bottoms"},{"name":"Socks","id":"Data Category:Socks"},{"name":"Shoes","id":"Data Category:Shoes"},{"name":"Bags","id":"Data Category:Bags"},{"name":"Umbrellas","id":"Data Category:Umbrellas"},{"name":"Floors","id":"Data Category:Floors"},{"name":"Rugs","id":"Data Category:Rugs"},{"name":"Wallpaper","id":"Data Category:Wallpaper"},{"name":"All Recipes (DIYs)","id":"Data Category:Recipes"},{"name":"Crafting Recipes (DIY)","id":"Filter Crafting DIY"},{"name":"Cooking Recipes (DIY)","id":"Filter Cooking DIY"},{"name":"Tools","id":"Data Category:Tools"},{"name":"Fish","id":"Data Category:Fish"},{"name":"Bugs","id":"Data Category:Insects"},{"name":"Sea Creatures","id":"Data Category:Sea Creatures"},{"name":"Fossils","id":"Data Category:Fossils"},{"name":"Art","id":"Data Category:Art"},{"name":"Villagers","id":"Data Category:Villagers"},{"name":"Music","id":"Data Category:Music"},{"name":"Reactions","id":"Data Category:Reactions"},{"name":"Construction","id":"Data Category:Construction"},{"name":"Fencing","id":"Data Category:Fencing"},{"name":"Interior Structures","id":"Data Category:Interior Structures"},{"name":"Other","id":"Data Category:Other"},
      ]
    }]
    if(this.props.title==="Amiibo Cards"){
      const sortByNumberFilter = {name:"Number", id:"Sort-number"}
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [
          {"name":"Series 1","id":"Data Category:Series 1"},
          {"name":"Series 2","id":"Data Category:Series 2"},
          {"name":"Series 3","id":"Data Category:Series 3"},
          {"name":"Series 4","id":"Data Category:Series 4"},
          {"name":"Series 5","id":"Data Category:Series 5"},
          {"name":"Promos","id":"Data Category:Promos"},
          {"name":"Welcome Amiibo Series","id":"Data Category:Welcome Amiibo Series"} ,
          {"name":"Sanrio Series","id":"Data Category:Sanrio Series"} 
        ]
      }]
      const handSigns = [{
        "name": "Hand Sign",
        "id": "Hand Sign",
        "children": [
          {"name":"Rock","id":"handSign:Rock"},
          {"name":"Paper","id":"handSign:Paper"},
          {"name":"Scissors","id":"handSign:Scissors"},
        ]
      }]
      const personality = [{
        "name": "Personality",
        "id": "Personality",
        "children": [
          {"name":"None","id":"Personality:NA"},
          {"name": "Big Sister","id": "Personality:Big Sister"},
          {"name": "Cranky","id": "Personality:Cranky"},
          {"name": "Jock","id": "Personality:Jock"},
          {"name": "Lazy","id": "Personality:Lazy"},
          {"name": "Normal","id": "Personality:Normal"},
          {"name": "Peppy","id": "Personality:Peppy"},
          {"name": "Smug","id": "Personality:Smug"},
          {"name": "Snooty","id": "Personality:Snooty"}
        ]
      }]
      const isVillager = [{
        "name": "Villager?",
        "id": "Villager?",
        "children": [
          {"name":"Yes","id":"Villager:Yes"},
          {"name": "No","id": "Villager:No"},
        ]
      }]
      this.possibleFilters = [...(addNewFilter(addNewFilter(this.sortByFiltersCollectedOnly, this.sortByDataCategoryFilter), sortByNumberFilter)), ...this.possibleFilters, ...categories, ...handSigns, ...personality, ...isVillager];
    } else if(this.props.title==="Active Creatures"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Fish","id":"Data Category:Fish"},{"name":"Bugs","id":"Data Category:Insects"},{"name":"Sea Creatures","id":"Data Category:Sea Creatures"}]
      }]
      this.possibleFilters = [...(addNewFilter(this.sortByFiltersReduced, this.sortByDataCategoryFilter)),...this.possibleFilters, ...this.museumFilters, ...categories];
    } else if(this.props.title==="Fish"){
      this.possibleFilters = [...this.sortByFiltersReduced,...this.possibleFilters, ...this.museumFilters, ...activeFilters, ...filterDefinitions["Fish"], ...this.invertFilters];
    } else if(this.props.title==="Bugs"){
      this.possibleFilters = [...this.sortByFiltersReduced,...this.possibleFilters, ...this.museumFilters, ...activeFilters, ...filterDefinitions["Bugs"], ...this.invertFilters];
    } else if(this.props.title==="Sea Creatures"){
      this.possibleFilters = [...this.sortByFiltersReduced,...this.possibleFilters, ...this.museumFilters, ...activeFilters, ...filterDefinitions["Sea Creatures"], ...this.invertFilters];
    } else if(this.props.title==="Fossils"){
      this.possibleFilters = [...this.sortByFiltersReducedWithColor,...this.possibleFilters, ...this.museumFilters, ...activeFilters, ...filterDefinitions["Sea Creatures"], ...this.invertFilters];
    } else if(this.props.title==="Art"){
      this.possibleFilters = [...this.sortByFiltersReducedWithColor,...this.possibleFilters, ...this.museumFilters, ...this.invertFilters];
    } else if(this.props.title==="Furniture"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Housewares","id":"Data Category:Housewares"},{"name":"Miscellaneous","id":"Data Category:Miscellaneous"},{"name":"Wall-mounted","id":"Data Category:Wall-mounted"},{"name":"Ceiling Decor","id":"Data Category:Ceiling Decor"},{"name":"Photos","id":"Data Category:Photos"},{"name":"Posters","id":"Data Category:Posters"} ]
      }]
      this.possibleFilters = [...this.sortByFilters,...this.possibleFilters, ...categories, ...notCraftVariationsFilters, ...filterDefinitions["Furniture"], ...this.invertFilters];
    } else if(this.props.title==="Photos + Posters"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Photos","id":"Data Category:Photos"},{"name":"Posters","id":"Data Category:Posters"} ]
      }]
      this.possibleFilters = [...this.sortByFilters,...this.possibleFilters, ...categories, ...filterDefinitions["Furniture"], ...this.invertFilters];
    } else if(this.props.title==="Clothing"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Headwear","id":"Data Category:Headwear"},{"name":"Accessories","id":"Data Category:Accessories"},{"name":"Tops","id":"Data Category:Tops"},{"name":"Dress-Up","id":"Data Category:Dress-Up"},{"name":"Clothing Other","id":"Data Category:Clothing Other"},{"name":"Bottoms","id":"Data Category:Bottoms"},{"name":"Socks","id":"Data Category:Socks"},{"name":"Shoes","id":"Data Category:Shoes"},{"name":"Bags","id":"Data Category:Bags"},{"name":"Umbrellas","id":"Data Category:Umbrellas"} ]
      }]
      this.possibleFilters = [...this.sortByFilters,...this.possibleFilters, ...categories, ...notCraftVariationsFilters, ...filterDefinitions["Clothing"], ...this.invertFilters];
    } else if(this.props.title==="Floor & Walls"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Floors","id":"Data Category:Floors"},{"name":"Rugs","id":"Data Category:Rugs"},{"name":"Wallpaper","id":"Data Category:Wallpaper"}]
      }]
      this.possibleFilters = [...this.sortByFilters,...this.possibleFilters, ...categories, ...filterDefinitions["Floor & Walls"], ...this.invertFilters];
    } else if(this.props.title==="Reactions"){
      this.possibleFilters = [...this.sortByFiltersCollectedOnly, ...this.possibleFilters, ...filterDefinitions["Reactions"], ...this.invertFilters];
    } else if(this.props.title==="Recipes"){
      const categories = [{
        "name": "Type Categories",
        "id":"Type Categories",
        "children": [{"name":"Crafting Recipes (DIY)","id":"Filter Crafting DIY"},{"name":"Cooking Recipes (DIY)","id":"Filter Cooking DIY"}]
      }]
      this.possibleFilters = [...this.sortByFiltersCollectedOnly, ...this.possibleFilters, ...categories, ...filterDefinitions["Recipes"], ...this.invertFilters];
    } else if(this.props.title==="Villagers"){
      this.sortByFilters[0]["children"] = [{name:"Reverse sorting direction", id:"Reverse direction"},
      {name:"", id:"break"},{name:"Birthday", id:"Sort-Birthday"}]
      this.possibleFilters = [...this.sortByFilters,...this.possibleFilters, ...this.villagerFilters, ...this.genderFilters, ...filterDefinitions["Villagers"], ...this.invertFilters];
    } else if(this.props.title==="Gyroids"){
      this.possibleFilters = [...this.sortByFiltersCollectedOnly, ...this.possibleFilters, ...filterDefinitions["Gyroids"], ...this.invertFilters];
    } else if(this.props.title==="New Items"){
      this.possibleFilters = [...this.sortByFilters,...this.possibleFilters, ...this.villagerFilters, ...notCraftVariationsFilters, ...categoriesAll, ...this.invertFilters];
    } else if(this.props.title==="Everything" || this.props.title==="Wishlist" || this.props.title==="Search Items"){
      let currentMuseumFilters = []
      if(this.props.title!=="Wishlist"){
        currentMuseumFilters = this.museumFilters
      }
      this.possibleFilters = [...this.sortByFilters,...this.possibleFilters, ...currentMuseumFilters, ...this.villagerFilters, ...categoriesAll, ...notCraftVariationsFilters, ...activeFilters, ...filterDefinitions["All Items"], ...this.genderFilters, ...this.invertFilters];
    } else if(this.props.title==="Construction"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Counter","id":"Tag:Counter"},{"name":"Pillar","id":"Tag:Pillar"},{"name":"Fencing","id":"Data Category:Fencing"},{"name":"Bridge","id":"Category:Bridge"},{"name":"Incline","id":"Category:Incline"},{"name":"Doors","id":"Category:Door"},{"name":"Roofing","id":"Category:Roofing"},{"name":"Siding","id":"Category:Siding"},{"name":"Mailbox","id":"Category:Mailbox"}]
      }]
      this.possibleFilters = [...(addNewFilter(this.sortByFiltersReduced, this.sortByDataCategoryFilter)),...this.possibleFilters,...categories, ...this.invertFilters]
    } else if(this.props.title==="Tools"){
      this.possibleFilters = [...(addNewFilter(this.sortByFiltersReducedWithColor, this.sortByDataCategoryFilter)),...this.possibleFilters, ...this.invertFilters];
    } else if(this.props.title==="Music"){
      this.possibleFilters = [...this.sortByFiltersCollectedOnly, ...this.possibleFilters, ...filterDefinitions["Music"], ...this.invertFilters]
    } else if(this.props.villagerGifts===true){
      const categories = [{
        "name": "Villager Wearable Filters",
        "id": "Villager Wearable Filters",
        "children": [{"name":"Villager can wear","id":"Villager Equippable:Yes"},{"name":"Villager cannot wear","id":"Villager Equippable:No"}]
      }]
      this.possibleFilters = [...this.sortByFilters,...this.possibleFilters, ...categories]
    } else if(this.props.title==="Food"){
      this.possibleFilters = [...this.sortByFiltersReducedWithColor, ...this.possibleFilters]
    } else if(this.props.title==="Materials"){
      this.possibleFilters = [...this.sortByFiltersReduced, ...this.possibleFilters]
    } else {
      this.possibleFilters = [ ...this.sortByFiltersReduced, ...this.possibleFilters]
    }
  }

  componentWillUnmount() {
    this.mounted=false
  }

  async componentDidMount(){
    if(this.props.disableFilters){
      return;
    }
    await this.initializeFilters();
  }

  initializeFilters = async (customFilters=undefined) => {
    this.savedItems = []
    let defaultValuesStored
    if(customFilters==undefined){
      defaultValuesStored = await getStorage(this.props.title+"Filters","");
    } else {
      defaultValuesStored = customFilters.join(",")
    }
    // console.log(this.possibleFilters)
    
    //Check for filters selected that don't exist, could cause errors, then reset them
    if(defaultValuesStored!==""){
      for(var i = 0; i<defaultValuesStored.split(",").length; i++){
        var errors = true;
        for(var x = 0; x<this.possibleFilters.length; x++){
          for(var y = 0; y<this.possibleFilters[x]["children"].length; y++){
            if(this.possibleFilters[x]["children"][y]["id"]===defaultValuesStored.split(",")[i]){
              errors=false;
              break;
            }
          }
          if(errors===false){
            break;
          }
        }
        if(errors){
          console.log("A filter that was previously set no longer exists. Clearing...")
          await AsyncStorage.setItem(this.props.title+"Filters", "");
          this.setState({selectedItems:[""]})
          this.setFilters();
          this.props.setRefresh(true)
          return;
        }
      }
    }

    
    this.mounted=true;
    if(defaultValuesStored!==""){
      this.setState({selectedItems:defaultValuesStored.split(",")})
      this.setFiltersWithValue(defaultValuesStored.split(","));
    }
    // console.log(defaultValuesStored.split(","))

    // //Check for filters selected that don't exist, could cause errors, then reset them
    // if(defaultValuesStored[0]!==""){
    //   var errors = false;
    //   for(var i = 0; i<defaultValuesStored.length; i++){
    //     var found = false;
    //     for(var x = 0; x<this.possibleFilters.length; x++){
    //       if(this.possibleFilters[x].value===defaultValuesStored[i]){
    //         found=true;
    //       }
    //     }
    //     if(found===false){
    //       console.log("error with saved filters, resetting");
    //       errors = true;
    //       break;
    //     }
    //   }
    //   if(errors){
    //     this.defaultValues=[];
    //     await AsyncStorage.setItem(this.props.title+"Filters", "");
    //     return;
    //   }

    //   this.defaultValues = defaultValuesStored;
      
    //   setTimeout(function() {
    //     if(this.mounted && this.defaultValues!=[""] && this.defaultValues!=[]){
    //       this.props.updateSearchFilters(this.defaultValues);
    //     }
    //   }.bind(this), 0);
    // }
  }

  setPopupVisible = async (visible) => {
    this.setState({popupVisible:visible});
    if(visible===false && this.mounted){
      await AsyncStorage.setItem(this.props.title+"Filters", this.state.selectedItems.toString());
      console.log(this.props.title+"Filters")
      this.setFilters();
    } else if(this.mounted){
      // Needed to refresh the chips shown when filter preset loaded
      setTimeout(()=>{this.setState({}); console.log("Refreshed filter popup")}, 50)
    }
  }

  setFilters = () =>{
    if(this.mounted){
      this.props.updateSearchFilters(this.state.selectedItems); 
    }
  }

  setFiltersWithValue = (value) =>{
    if(this.mounted){
      this.props.updateSearchFilters(value); 
    }
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };


  render(){
    
    if(this.props.disableFilters){
      return <View style={{width:10, height:10, opacity: 0.2}}/>
    } else if(this.state.loaded===false){
      return <View style={{width:10, height:10, opacity: 0.2}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          statusBarTranslucent
        ><View style={styles.centeredView}></View>
        </Modal>
      </View>
    }
    var dropDownPickerOpacity = 0
    if(this.possibleFilters!== undefined && this.possibleFilters.length!==0){
      dropDownPickerOpacity = 0.7
    }
    const filters = translateFilters(this.possibleFilters)
    return (
      <View style={{width:10, height:10, opacity: 0.2}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
          onRequestClose={()=>{
            this.setPopupVisible(!this.state.popupVisible);
          }}
        >
          <AnimatedPopupWrapper style={styles.centeredView} disableAnimations={getSettingsString("settingsLowEndDevice")==="true"}>
            <TouchableOpacity onPress={()=>{this.setPopupVisible(!this.state.popupVisible);}} activeOpacity={0.55} style={{position:"absolute", left:-100, top:-100, width: Dimensions.get('window').width+200, height: Dimensions.get('window').height+200, backgroundColor: "black", opacity: 0.6}}/>
            <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode]}]}>
              <ScrollView>
                <View style={{paddingHorizontal:20}}>
                  <View style={{height:20}}/>
                  <TextFont bold={true} style={{fontSize: 22, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Set Filters</TextFont>
                  <View style={{height:10}}/>
                  <SectionedMultiSelect
                    noResultsComponent={<TextFont style={{padding:20, textAlign:"center", fontSize: 20, color:colors.textBlack[global.darkMode]}}>{attemptToTranslate("Not found")}</TextFont>}
                    searchPlaceholderText={attemptToTranslate("Search for an item")}
                    IconRenderer={MaterialIcons}
                    items={filters}
                    uniqueKey="id"
                    subKey="children"
                    selectText=""
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={this.state.selectedItems}
                    ref={SectionedMultiSelect => {this.SectionedMultiSelect = SectionedMultiSelect; if(this.openFirst){SectionedMultiSelect._toggleSelector(true); this.openFirst=false}}}
                    colors={{primary:colors.okButton[global.darkMode], chipColor:colors.selectedText[global.darkMode], text:colors.textBlack[global.darkMode], subText:colors.textBlack[global.darkMode], itemBackground: colors.white[global.darkMode], subItemBackground: colors.white[global.darkMode]}}
                    hideSelect={true}
                    dropDownToggleIconDownComponent={<Image
                      style={{width:18,height:18,resizeMode:'contain',transform: [{ rotate: '270deg'}], opacity: 0.6}}
                      source={global.darkMode ? require("../assets/icons/leftArrowWhite.png") : require("../assets/icons/leftArrow.png")}
                    />}
                    dropDownToggleIconUpComponent={<Image
                      style={{width:18,height:18,resizeMode:'contain',transform: [{ rotate: '90deg'}], opacity: 0.6}}
                      source={global.darkMode ? require("../assets/icons/leftArrowWhite.png") : require("../assets/icons/leftArrow.png")}
                    />}
                    styles={{separator:{backgroundColor: colors.lightDarkAccent[global.darkMode], height:2},chipText:{fontFamily:"ArialRoundedBold", fontSize:14, color:colors.textBlack[global.darkMode]},confirmText:{padding:7},container:{backgroundColor:colors.white[global.darkMode], borderRadius:15}, selectedItem:{backgroundColor:colors.lightDarkAccent[global.darkMode], marginHorizontal:5, paddingHorizontal:10, borderRadius:5,}, subItem:{marginHorizontal:5, paddingHorizontal:10, paddingVertical:7, marginBottom:2}, item:{paddingVertical:12}, searchBar:{backgroundColor:colors.lightDarkAccent2[global.darkMode]}, searchTextInput:{color:colors.textBlack[global.darkMode]}}}
                    modalWithTouchable={true}
                    itemFontFamily={{fontFamily:"ArialRoundedBold"}}
                    subItemFontFamily={{fontFamily:"ArialRounded"}}
                    searchTextFontFamily={{fontFamily:"ArialRounded"}}
                    confirmFontFamily={{fontFamily:"ArialRoundedBold"}}
                    confirmText={attemptToTranslate("Confirm")}
                    customChipsRenderer = {(props) => {
                      if(!props.selectedItems){
                        return <View/>
                      }
                      return (
                        <View style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", alignItems:'center'}}>
                          {this.state.selectedItems.map((singleSelectedItem,index) => {
                            if(!singleSelectedItem) return <View></View>
                            const item = this.SectionedMultiSelect?._findItem(singleSelectedItem)
                            // console.log(item)
                            if (!item || !item[props.displayKey]) return this.savedItems[index]
                            this.savedItems[index] = (<TouchableOpacity key={item[props.uniqueKey]} onPress={() => { this.SectionedMultiSelect._removeItem(item) }} style={{borderRadius: 10, paddingHorizontal:15, paddingVertical:5, marginHorizontal:5, marginVertical:5, paddingBottom: 8, backgroundColor:colors.lightDarkAccent[global.darkMode], flexDirection:"row", alignItems:"center"}}>
                              <TextFont style={{fontSize: 18, color:colors.textBlack[global.darkMode],}}>{item[props.displayKey]}</TextFont>
                              <Image style={{width:16,height:16, marginTop: 4, marginLeft:5, marginRight:-5, opacity: 0.35, resizeMode:"contain",}} source={global.darkMode ? require("../assets/icons/exitWhite.png") : require("../assets/icons/exit.png")}/>
                            </TouchableOpacity>)
                            return this.savedItems[index]
                          })} 
                        </View>
                      )
                    }}
                  />
                  
                  {this.props.title!==undefined && this.props.title==="Everything" ? <ButtonComponent
                    text={"Save Filter Preset"}
                    color={colors.okButton3[global.darkMode]}
                    vibrate={5}
                    onPress={() => {
                      if(this.state.selectedItems===undefined || (this.state.selectedItems!=undefined && this.state.selectedItems?.length <= 0)) return
                      this.popupAddFilterPreset?.setPopupVisible(true)
                    }}
                    marginHorizontal={5}
                    style={{ flex: 1, opacity: this.state.selectedItems!=undefined && this.state.selectedItems?.length <= 0 ? 0.3 : 1 }}
                  /> : <View></View>}
                  <PopupAddFilterPreset 
                    ref={(popupAddFilterPreset) => this.popupAddFilterPreset = popupAddFilterPreset}
                    addCustomFilterPreset={async (presetName)=>{
                      await addFilterPreset(presetName, this.state.selectedItems)
                      if(toast)
                        toast.show("", {type:"success",
                          placement:'top',
                          renderType:{
                            success: (toast) => (
                              <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, borderRadius: 5, backgroundColor: colors.popupSuccess[global.darkMode], alignItems:"center", justifyContent:"center"}}>
                                <TextFont style={{color:"white", fontSize: 15}}>{"Added Filter Preset"}</TextFont>
                              </View>
                            ),
                          }
                        })
                      this.setPopupVisible(!this.state.popupVisible);
                      this.props.refreshFilterPresetList();
                    }}
                  />
                  
                  <ButtonComponent
                    text={"Select Filters"}
                    color={colors.dateButton[global.darkMode]}
                    vibrate={5}
                    onPress={() => {
                      this.SectionedMultiSelect._toggleSelector()
                    }}
                    marginHorizontal={5}
                  />
                  
                  <View style={{width:"100%",flexDirection:"row", alignItems:'center', justifyContent:"center", flex:1}}>
                    <ButtonComponent
                      text={"Clear Filters"}
                      color={colors.filtersResetButton[global.darkMode]}
                      vibrate={5}
                      onPress={() => {
                        this.setPopupVisible(!this.state.popupVisible);
                        this.defaultValues=["Check"];
                        AsyncStorage.setItem(this.props.title+"Filters", "");
                        if(this.mounted){
                          this.props.updateSearchFilters(this.defaultValues);
                        }
                        this.SectionedMultiSelect._removeAllItems()
                      }}
                      marginHorizontal={5}
                      style={{ flex: 1, opacity: this.state.selectedItems!=undefined && this.state.selectedItems?.length <= 0 ? 0.3 : 1 }}
                    />
                    <ButtonComponent
                      text={"OK"}
                      color={colors.okButton[global.darkMode]}
                      vibrate={5}
                      onPress={() => {
                        this.setPopupVisible(!this.state.popupVisible);
                      }}
                      marginHorizontal={5}
                      style={{ flex: 1,  }}
                    />
                  </View>
                  <View style={{height:20}}/>
                </View>
              </ScrollView>
            </View>
          </AnimatedPopupWrapper>
        </Modal>
      </View>
    )
  }
}


class PopupAddFilterPreset extends Component{
  constructor(){
    super();
    this.presetName="";
  }
  setPopupVisible = () => {
    this.popup?.setPopupVisible(true)
  }
  render(){
    var buttons = <>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <ButtonComponent
          text={"Cancel"}
          color={colors.cancelButton[global.darkMode]}
          vibrate={8}
          onPress={() => {
            this.popup?.setPopupVisible(false);
          }}
        /> 
        <ButtonComponent
          text={"Done"}
          color={colors.okButton[global.darkMode]}
          vibrate={15}
          onPress={() => {
            this.props.addCustomFilterPreset(this.presetName)
            this.popup?.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    var header = <>
      <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{"New Filter Preset"}</TextFont>
      <View style={{height:10}}/>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1, justifyContent:"center", marginHorizontal:5,}}>
          <TextInput
            maxLength={45}
            allowFontScaling={false}
            style={{fontSize: 18, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 10, borderRadius: 5}}
            onChangeText={(text) => {this.presetName=text}}
            placeholder={attemptToTranslate("Filter Preset Name")}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          />
        </View>
      </View>
    </>
    return <PopupInfoCustom ref={(popup) => this.popup = popup} buttonDisabled={true} buttons={buttons} header={header}/>
  }
}

export default PopupFilter;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor:"rgba(0,0,0,0.5)",
    paddingTop: "10%",
  },
  modalView: {
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5
  },
});