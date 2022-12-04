import React, {Component} from 'react';
import ProgressContainerToggle from '../components/ProgressContainer';
import TextFont from '../components/TextFont';
import LottieView from 'lottie-react-native';
import { Vibration, TouchableOpacity, View } from 'react-native';
import {setSettingsString, getCurrentVillagerNamesString, getInverseVillagerFilters, capitalize,countCollection,getStorage, countCollectionSpecial, collectionListRemoveDuplicates, countCollectionAchievements, countAchievements, attemptToTranslate, getSettingsString} from "../LoadJsonData"
import { PopupRaw } from '../components/Popup';
import colors from '../Colors'
import { countCollectionHHP, countHHP } from './ParadisePlanningPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class CollectionProgress extends Component {
  constructor(){
    super()
    this.state = {
      editMode:false,
      fishCount: 0,
      fishCountTotal: 0,
      fishPercentage: 0,
      seaCount: 0,
      seaCountTotal: 0,
      seaPercentage: 0,
      bugsCount: 0,
      bugsCountTotal: 0,
      bugsPercentage: 0,
      fossilCount: 0,
      fossilCountTotal: 0,
      fossilPercentage: 0,
      artCount: 0,
      artCountTotal: 0,
      artPercentage: 0,
      musicCount: 0,
      musicCountTotal: 0,
      musicPercentage: 0,
      emojipediaCount: 0,
      emojipediaCountTotal: 0,
      emojipediaPercentage: 0,
      recipeCount: 0,
      recipeCountTotal: 0,
      recipePercentage: 0,
      countFloorWalls: 0,
      floorWallsCount: 0,
      floorWallsCountTotal: 0,
      floorWallsPercentage: 0,
      countFurniture: 0,
      furnitureCount: 0,
      furnitureCountTotal: 0,
      furniturePercentage: 0,
      countClothing: 0,
      clothingCount: 0,
      clothingCountTotal: 0,
      clothingPercentage: 0,
      countGyroid: 0,
      gyroidCount: 0,
      gyroidCountTotal: 0,
      gyroidPercentage: 0,
      achievementsCount: 0,
      achievementsCountTotal: 0,
      achievementsPercentage: 0,
    }
  }
  async componentDidMount(){
    let collectionSectionsDisabled = JSON.parse(await getStorage("collectionSectionsDisabled"+global.profile,JSON.stringify([])));
    this.countCollectionTotal(collectionSectionsDisabled)
  }
  countCollectionTotal = (collectionSectionsDisabled) => {
    if(global.collectionList!==undefined && global.collectionList.length>7000){
      this.popupLoading?.setPopupVisible(true)
    }
    setTimeout(async ()=>{
      collectionListRemoveDuplicates();
      let fishCount = 0
      let fishCountTotal = 0
      let fishPercentage = 0
      if(!collectionSectionsDisabled.includes("fishCount")){
        fishCount = await countCollection("fishCheckList");
        fishCountTotal = global.dataLoadedFish[0].length;
        fishPercentage = fishCount/fishCountTotal * 100;
      }
      let seaCount = 0
      let seaCountTotal = 0
      let seaPercentage = 0
      if(!collectionSectionsDisabled.includes("seaCount")){
        seaCount = await countCollection("seaCheckList");
        seaCountTotal = global.dataLoadedSea[0].length;
        seaPercentage = seaCount/seaCountTotal * 100;
      }
      let bugsCount = 0
      let bugsCountTotal = 0
      let bugsPercentage = 0
      if(!collectionSectionsDisabled.includes("bugsCount")){
        bugsCount = await countCollection("bugCheckList");
        bugsCountTotal = global.dataLoadedBugs[0].length;
        bugsPercentage = bugsCount/bugsCountTotal * 100;
      }
      let fossilCount = 0
      let fossilCountTotal = 0
      let fossilPercentage = 0
      if(!collectionSectionsDisabled.includes("fossilCount")){
        fossilCount = await countCollection("fossilCheckList");
        fossilCountTotal = global.dataLoadedFossils[0].length;
        fossilPercentage = fossilCount/fossilCountTotal * 100;
      }
      let artCount = 0
      let artCountTotal = 0
      let artPercentage = 0
      if(!collectionSectionsDisabled.includes("artCount")){
        artCount = await countCollection("artCheckList");
        artCountTotal = 43;
        artPercentage = artCount/artCountTotal * 100;
      }
      let musicCount = 0
      let musicCountTotal = 0
      let musicPercentage = 0
      if(!collectionSectionsDisabled.includes("musicCount")){
        musicCount = await countCollection("songCheckList");
        musicCountTotal = global.dataLoadedMusic[0].length - 3; //there are 3 Hazure songs
        musicPercentage = musicCount/musicCountTotal * 100;
      }
      let emojipediaCount = 0
      let emojipediaCountTotal = 0
      let emojipediaPercentage = 0
      if(!collectionSectionsDisabled.includes("emojipediaCount")){
        emojipediaCount = await countCollection("emojiCheckList");
        emojipediaCountTotal = global.dataLoadedReactions[0].length;
        emojipediaPercentage = emojipediaCount/emojipediaCountTotal * 100;
      }
      let recipeCount = 0
      let recipeCountTotal = 0
      let recipePercentage = 0
      if(!collectionSectionsDisabled.includes("recipeCount")){
        recipeCount = await countCollection("recipesCheckList");
        recipeCountTotal = global.dataLoadedRecipes[0].length;
        recipePercentage = recipeCount/recipeCountTotal * 100;
      }
      let countfood = 0
      let foodCount = 0
      let foodCountTotal = 0
      let foodPercentage = 0
      if(!collectionSectionsDisabled.includes("foodCount")){
        countfood = await countCollectionSpecial("dataLoadedFurniture", [], ["Food"]);
        foodCount = countfood[0]
        foodCountTotal = countfood[1]
        foodPercentage = foodCount/foodCountTotal * 100;
      }
      let countFloorWalls = 0
      let floorWallsCount = 0
      let floorWallsCountTotal = 0
      let floorWallsPercentage = 0
      if(!collectionSectionsDisabled.includes("floorWallsCount")){
        countFloorWalls = await countCollectionSpecial("dataLoadedFloorWalls");
        floorWallsCount = countFloorWalls[0]
        floorWallsCountTotal = countFloorWalls[1]
        floorWallsPercentage = floorWallsCount/floorWallsCountTotal * 100;
      }
      let countFurniture = 0
      let furnitureCount = 0
      let furnitureCountTotal = 0
      let furniturePercentage = 0
      if(!collectionSectionsDisabled.includes("furnitureCount")){
        countFurniture = await countCollectionSpecial("dataLoadedFurniture", ["Photos", "Posters", "Food"]);
        furnitureCount = countFurniture[0]
        furnitureCountTotal = countFurniture[1]
        furniturePercentage = furnitureCount/furnitureCountTotal * 100;
      }
      let countphotos = 0
      let photosCount = 0
      let photosCountTotal = 0
      let photosPercentage = 0
      if(!collectionSectionsDisabled.includes("photosCount")){
        countphotos = await countCollectionSpecial("dataLoadedFurniture", [], ["Photos"]);
        photosCount = countphotos[0]
        photosCountTotal = countphotos[1]
        photosPercentage = photosCount/photosCountTotal * 100;
      }
      let countposters = 0
      let postersCount = 0
      let postersCountTotal = 0
      let postersPercentage = 0
      if(!collectionSectionsDisabled.includes("postersCount")){
        countposters = await countCollectionSpecial("dataLoadedFurniture", [], ["Posters"]);
        postersCount = countposters[0]
        postersCountTotal = countposters[1]
        postersPercentage = postersCount/postersCountTotal * 100;
      }
      let countClothing = 0
      let clothingCount = 0
      let clothingCountTotal = 0
      let clothingPercentage = 0
      if(!collectionSectionsDisabled.includes("clothingCount")){
        countClothing = await countCollectionSpecial("dataLoadedClothing");
        clothingCount = countClothing[0]
        clothingCountTotal = countClothing[1]
        clothingPercentage = clothingCount/clothingCountTotal * 100;
      }
      let countGyroid = 0
      let gyroidCount = 0
      let gyroidCountTotal = 0
      let gyroidPercentage = 0
      if(!collectionSectionsDisabled.includes("gyroidCount")){
        countGyroid = await countCollectionSpecial("dataLoadedGyroids");
        gyroidCount = countGyroid[0]
        gyroidCountTotal = countGyroid[1]
        gyroidPercentage = gyroidCount/gyroidCountTotal * 100;
      }
      let achievementsCount = 0
      let achievementsCountTotal = 0
      let achievementsPercentage = 0
      if(!collectionSectionsDisabled.includes("achievementsCount")){
        achievementsCount = await countCollectionAchievements();
        achievementsCountTotal = await countAchievements();
        achievementsPercentage = achievementsCount/achievementsCountTotal * 100;
      }
      let hhpCount = 0
      let hhpCountTotal = 0
      let hhpPercentage = 0
      if(!collectionSectionsDisabled.includes("hhpCount")){
        hhpCount = await countCollectionHHP();
        hhpCountTotal = await countHHP();
        hhpPercentage = hhpCount/hhpCountTotal * 100;
      }
      let countVillager = 0
      let villagerCount = 0
      let villagerCountTotal = 0
      let villagerPercentage = 0
      if(!collectionSectionsDisabled.includes("villagerCount")){
        countVillager = await countCollectionSpecial("dataLoadedVillagers", [], [], true);
        villagerCount = countVillager[0]
        villagerCountTotal = countVillager[1]
        villagerPercentage = villagerCount/villagerCountTotal * 100;
      }
      this.setState({
        collectionSectionsDisabled:collectionSectionsDisabled,
        fishCount: fishCount,
        fishCountTotal: fishCountTotal,
        fishPercentage: fishPercentage,
        seaCount: seaCount,
        seaCountTotal: seaCountTotal,
        seaPercentage: seaPercentage,
        bugsCount: bugsCount,
        bugsCountTotal: bugsCountTotal,
        bugsPercentage: bugsPercentage,
        fossilCount: fossilCount,
        fossilCountTotal: fossilCountTotal,
        fossilPercentage: fossilPercentage,
        artCount: artCount,
        artCountTotal: artCountTotal,
        artPercentage: artPercentage,
        musicCount: musicCount,
        musicCountTotal: musicCountTotal,
        musicPercentage: musicPercentage,
        emojipediaCount: emojipediaCount,
        emojipediaCountTotal: emojipediaCountTotal,
        emojipediaPercentage: emojipediaPercentage,
        recipeCount: recipeCount,
        recipeCountTotal: recipeCountTotal,
        recipePercentage: recipePercentage,
        foodCount: foodCount,
        foodCountTotal: foodCountTotal,
        foodPercentage: foodPercentage,
        countFloorWalls: countFloorWalls,
        floorWallsCount: floorWallsCount,
        floorWallsCountTotal: floorWallsCountTotal,
        floorWallsPercentage: floorWallsPercentage,
        countFurniture: countFurniture,
        furnitureCount: furnitureCount,
        furnitureCountTotal: furnitureCountTotal,
        furniturePercentage: furniturePercentage,
        photosCount: photosCount,
        photosCountTotal: photosCountTotal,
        photosPercentage: photosPercentage,
        postersCount: postersCount,
        postersCountTotal: postersCountTotal,
        postersPercentage: postersPercentage,
        countClothing: countClothing,
        clothingCount: clothingCount,
        clothingCountTotal: clothingCountTotal,
        clothingPercentage: clothingPercentage,
        countGyroid: countGyroid,
        gyroidCount: gyroidCount,
        gyroidCountTotal: gyroidCountTotal,
        gyroidPercentage: gyroidPercentage,
        achievementsCount: achievementsCount,
        achievementsCountTotal: achievementsCountTotal,
        achievementsPercentage: achievementsPercentage,
        hhpCount: hhpCount,
        hhpCountTotal: hhpCountTotal,
        hhpPercentage: hhpPercentage,
        villagerCount: villagerCount,
        villagerCountTotal: villagerCountTotal,
        villagerPercentage: villagerPercentage,
      })
      this.popupLoading?.setPopupVisible(false)
    },0)
  } 
  saveList = async (name) => {
    let collectionSectionsDisabled = this.state.collectionSectionsDisabled
    if(collectionSectionsDisabled.includes(name)){
      collectionSectionsDisabled = collectionSectionsDisabled.filter(e => e !== name)
      collectionSectionsDisabled = collectionSectionsDisabled.filter(e => e !== "")
    } else {
      collectionSectionsDisabled.push(name)
    }
    this.setState({collectionSectionsDisabled:collectionSectionsDisabled})
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    console.log("Side sections disabled: " + collectionSectionsDisabled)
    await AsyncStorage.setItem("collectionSectionsDisabled"+global.profile, JSON.stringify(collectionSectionsDisabled));
  }
  toggleEditMode = (state) => {
    this.setState({editMode:state})
    if(state===false){
      this.countCollectionTotal(this.state.collectionSectionsDisabled)
    }
  }
  getDelay = (keyName) => {
    let originalOrder = [
      "fishCount",
      "seaCount",
      "fossilCount",
      "artCount",
      "musicCount",
      "emojipediaCount",
      "recipeCount",
      "foodCount",
      "furnitureCount",
      "photosCount",
      "postersCount",
      "furnitureCount",
      "floorWallsCount",
      "clothingCount",
      "gyroidCount",
      "achievementsCount",
      "hhpCount",
      "villagerCount",
    ]
    //subtract the lists
    originalOrder = originalOrder.filter(n => !this.state.collectionSectionsDisabled.includes(n))
    return originalOrder.indexOf(keyName)+1
  }
  render(){
    return(<>
      <PopupRaw
        ref={(popupLoading) => this.popupLoading = popupLoading} 
        text={attemptToTranslate("Counting Collection...")}
        textFontSize={18}
        loadingScale={1.3}
        loadingWidth={40}
      />
      <TouchableOpacity style={{padding:5,position:"absolute",right:20,top:10}} 
        onPress={async()=>{
          this.toggleEditMode(!this.state.editMode)
          getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
      }}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{this.state.editMode ? "Disable Edit List" : "Edit List"}</TextFont>
      </TouchableOpacity>
      <View style={{height: 25}}/>
        {this.state.collectionSectionsDisabled?<>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("fishCount")} keyName="fishCount" delay={this.getDelay("fishCount")} setPage={this.props.setPage} page={2} tab={0} color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.fishPercentage} image={require("../assets/icons/fish.png")} text={attemptToTranslate("Fish") + " " + this.state.fishCount + "/" + this.state.fishCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("seaCount")} keyName="seaCount" delay={this.getDelay("seaCount")} setPage={this.props.setPage} page={2} tab={2} color={colors.seaCollectionProgress[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.seaPercentage} image={require("../assets/icons/octopus.png")} text={attemptToTranslate("Sea Creatures") + " " + this.state.seaCount + "/" + this.state.seaCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("bugsCount")} keyName="bugsCount" delay={this.getDelay("bugsCount")} setPage={this.props.setPage} page={2} tab={1} color={colors.bugAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.bugsPercentage} image={require("../assets/icons/bugs.png")} text={attemptToTranslate("Bugs") + " " + this.state.bugsCount + "/" + this.state.bugsCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("fossilCount")} keyName="fossilCount" delay={this.getDelay("fossilCount")} setPage={this.props.setPage} page={2} tab={3} color={colors.fossilAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.fossilPercentage} image={require("../assets/icons/bones.png")} text={attemptToTranslate("Fossils") + " " + this.state.fossilCount + "/" + this.state.fossilCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("artCount")} keyName="artCount" delay={this.getDelay("artCount")} setPage={this.props.setPage} page={2} tab={4} color={colors.artAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.artPercentage} image={require("../assets/icons/colorPalette.png")} text={attemptToTranslate("Art") + " " + this.state.artCount + "/" + this.state.artCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("musicCount")} keyName="musicCount" delay={this.getDelay("musicCount")} setPage={this.props.setPage} page={4} tab={""} color={colors.musicCollectionProgress[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.musicPercentage} image={require("../assets/icons/music.png")} text={attemptToTranslate("Songs") + " " + this.state.musicCount + "/" + this.state.musicCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("emojipediaCount")} keyName="emojipediaCount" delay={this.getDelay("emojipediaCount")} setPage={this.props.setPage} page={5} tab={""} color={colors.emojipediaAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.emojipediaPercentage} image={require("../assets/icons/emote.png")} text={attemptToTranslate("Reactions") + " " + this.state.emojipediaCount + "/" + this.state.emojipediaCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("recipeCount")} keyName="recipeCount" delay={this.getDelay("recipeCount")} setPage={this.props.setPage} page={6} tab={""} color={colors.toolsAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.recipePercentage} image={require("../assets/icons/crafting.png")} text={attemptToTranslate("Recipes") + " " + this.state.recipeCount + "/" + this.state.recipeCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("foodCount")} keyName="foodCount" delay={this.getDelay("foodCount")} setPage={this.props.setPage} page={3} tab={3} color={colors.foodCollectionProgress[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.foodPercentage} image={require("../assets/icons/food.png")} text={attemptToTranslate("Food") + " " + this.state.foodCount + "/" + this.state.foodCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("furnitureCount")} keyName="furnitureCount" delay={this.getDelay("furnitureCount")} setPage={this.props.setPage} page={3} tab={0} color={colors.furnitureCollectionProgress[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.furniturePercentage} image={require("../assets/icons/leaf.png")} text={attemptToTranslate("Furniture") + " " + this.state.furnitureCount + "/" + this.state.furnitureCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("photosCount")} keyName="photosCount" delay={this.getDelay("photosCount")} setPage={this.props.setPage} page={41} tab={0} color={colors.photosCollectionProgress[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.photosPercentage} image={require("../assets/icons/portrait.png")} text={attemptToTranslate("Villager Photos") + " " + this.state.photosCount + "/" + this.state.photosCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("postersCount")} keyName="postersCount" delay={this.getDelay("postersCount")} setPage={this.props.setPage} page={41} tab={0} color={colors.postersCollectionProgress[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.postersPercentage} image={require("../assets/icons/poster.png")} text={attemptToTranslate("Posters") + " " + this.state.postersCount + "/" + this.state.postersCountTotal.toString()}/>        
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("floorWallsCount")} keyName="floorWallsCount" delay={this.getDelay("floorWallsCount")} setPage={this.props.setPage} page={3} tab={2} color={colors.floorWallsCollectionProgress[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.floorWallsPercentage} image={require("../assets/icons/carpet.png")} text={attemptToTranslate("Floor & Walls") + " " + this.state.floorWallsCount + "/" + this.state.floorWallsCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("clothingCount")} keyName="clothingCount" delay={this.getDelay("clothingCount")} setPage={this.props.setPage} page={3} tab={1} color={colors.clothingCollectionProgress[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.clothingPercentage} image={require("../assets/icons/top.png")} text={attemptToTranslate("Clothing") + " " + this.state.clothingCount + "/" + this.state.clothingCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("gyroidCount")} keyName="gyroidCount" delay={this.getDelay("gyroidCount")} setPage={this.props.setPage} page={33} tab={""} color={colors.gyroidAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.gyroidPercentage} image={require("../assets/icons/gyroid.png")} text={attemptToTranslate("Gyroids") + " " + this.state.gyroidCount + "/" + this.state.gyroidCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("achievementsCount")} keyName="achievementsCount" delay={this.getDelay("achievementsCount")} setPage={this.props.setPage} page={19} tab={""} color={colors.achievementsAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.achievementsPercentage} image={require("../assets/icons/achievementIcon.png")} text={attemptToTranslate("Achievements") + " " + this.state.achievementsCount + "/" + this.state.achievementsCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("hhpCount")} keyName="hhpCount" delay={this.getDelay("hhpCount")} setPage={this.props.setPage} page={35} tab={""} color={colors.paradisePlansAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.hhpPercentage} image={require("../assets/icons/paradisePlanning.png")} text={attemptToTranslate("Paradise Planning") + " " + this.state.hhpCount + "/" + this.state.hhpCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("villagerCount")} keyName="villagerCount" delay={this.getDelay("villagerCount")} setPage={this.props.setPage} page={8} tab={""} color={colors.villagerAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.villagerPercentage} image={require("../assets/icons/cat.png")} text={attemptToTranslate("Villagers") + " " + this.state.villagerCount + "/" + this.state.villagerCountTotal.toString()}/>
        </>:<View style={{justifyContent:"center", alignItems:"center"}}>
          <LottieView autoPlay loop
            style={{width: 90, zIndex:1,}}
            source={require('../assets/loading.json')}
          />
        </View>}
      <View style={{height: 15}}/>
      </>
    )
  }
}