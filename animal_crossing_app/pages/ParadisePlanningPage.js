import React, {Component} from 'react';
import {Animated,FlatList, Dimensions, TouchableOpacity,StyleSheet, Text, View, Image, Vibration} from 'react-native';
import {removeAccents,getStorage, findObject, attemptToTranslateItem, getSettingsString, attemptToTranslateSpecial, attemptToTranslate, checkOff, removeAndSaveParadisePlanningList, addAndSaveParadisePlanningList, addAndSaveParadisePlanning, removeAndSaveParadisePlanning, initializeParadisePlanningGlobal, invertAndSaveParadisePlanningList, inVillagerParadise} from "../LoadJsonData"
import colors from '../Colors'
import {attemptToTranslateAchievement} from "../LoadJsonData"
import FastImage from "../components/FastImage"
import {SubHeader, Paragraph, BlueText} from "../components/Formattings"
import Header from "../components/Header"
import * as RootNavigation from '../RootNavigation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Check from '../components/Check';
import FadeInOut from '../components/FadeInOut';
import { calculateHeaderHeight } from '../components/ListPage';
import Toast from "react-native-toast-notifications";
import TextFont from '../components/TextFont';

export async function countCollectionHHP(){
  var storageData = JSON.parse(await getStorage("ParadisePlanning"+global.profile,JSON.stringify([])));
  return storageData.length;
}

export async function countHHP(){
  let data = [...require("../assets/data/DataCreated/Paradise Planning.json"),...require("../assets/data/DataCreated/Special NPCs.json")];
  return data.length
}

export default class ParadisePlanningPage extends Component {
  constructor(props){
    super(props);
    this.data = [...require("../assets/data/DataCreated/Paradise Planning.json"),...require("../assets/data/DataCreated/Special NPCs.json")];
    this.filterTypes = ["none","checked","not checked"]
    this.state = {
      selectedAchievement:"",
      data: this.sortAlphabetically(this.createNameLanguage([...require("../assets/data/DataCreated/Paradise Planning.json"),...require("../assets/data/DataCreated/Special NPCs.json")])),
      loaded: false,
      setFilter: 0,
      update: false
    }
  }

  loadList = async() => {
    await initializeParadisePlanningGlobal()
    this.setState({loaded: true})
  }

  checkOffItem = (id) => {
    try {
      if(inVillagerParadise(id, true)){
        removeAndSaveParadisePlanning(id)
        getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
      } else {
        addAndSaveParadisePlanning(id)
        getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10,100,20]) : "";
      }
    } catch (e){
      toast.show("Please report this error to dapperappdeveloper@gmail.com : \n" + e.toString(), {type:"danger"})
    }
  }

  async componentDidMount(){
    this.mounted = true;
    await this.loadList()
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  handleSearch = (text, filter="") => {
    var outputData = [];
    console.log(this.filterTypes[this.state.setFilter])
    this.data.map( (request, index)=>{
      let requestRequest = request["Request"]!==undefined ? request["Request"] : "";
      let skip=false

      //handle filters
      if(filter===""){
        if(this.filterTypes[this.state.setFilter]==="checked"){
          if(inVillagerParadise(request["Name"], true)===false){
            skip=true
          }
        }else if(this.filterTypes[this.state.setFilter]==="not checked"){
          if(inVillagerParadise(request["Name"], true)===true){
            skip=true
          }
        }
      } else {
        if(this.filterTypes[filter]==="checked"){
          if(inVillagerParadise(request["Name"], true)===false){
            skip=true
          }
        }else if(this.filterTypes[filter]==="not checked"){
          if(inVillagerParadise(request["Name"], true)===true){
            skip=true
          }
        }
      }
      
      if(!skip){
        if(text===""){
          outputData.push(request);
        } else if (request["NameLanguage"] !==undefined & request["NameLanguage"].toString().toLowerCase().includes(text.toString().toLowerCase())){
          outputData.push(request);
        } else if(removeAccents(requestRequest.toString().toLowerCase()).includes(removeAccents(text.toString().toLowerCase()))){
          outputData.push(request);
        } 
      }
    })
    if(this.mounted){
      this.setState({data:this.sortAlphabetically(outputData)});
    }
  }

  createNameLanguage = (data) => {
    for(let datum of data){
      try{
        if(datum["Request"]===undefined && datum["Name"]!==undefined){ //this means it's a special NPC from the list, fill in info from Special NPCs JSON object
          datum["NameLanguage"] = attemptToTranslate(datum["Name"].toString()).toString()
        }else if (datum["Name"] !==undefined){
          datum["NameLanguage"] = attemptToTranslateSpecial(datum["Name"].toString(), "villagers").toString()
        } else {
          datum["NameLanguage"] = "";
        }
      } catch(e) {
          datum["NameLanguage"] = "";
      }
    }
    return data;
  }

  sortAlphabetically = (data) => {
    //Sort alphabetically
    if(getSettingsString("settingsSortAlphabetically")==="true"){
      data.sort(function(a, b) {
        var textA
        var textB
        if(a===undefined || a.NameLanguage===undefined){
          textA = "zzzzzzzzzzzzzz"
        } else {
          textA = removeAccents(a.NameLanguage.toUpperCase()).replace("-"," ");
          if(textA===""){
            textA = "zzzzzzzzzzzzzz"
          }
        }
        if(b===undefined || b.NameLanguage===undefined){
          textB = "zzzzzzzzzzzzzz"
        } else {
          textB = removeAccents(b.NameLanguage.toUpperCase()).replace("-"," ");
          if(textB===""){
            textB = "zzzzzzzzzzzzzz"
          }
        }
        if(textB==="zzzzzzzzzzzzzz"){
          return -1
        } else if (textA==="zzzzzzzzzzzzzz"){
          return -1
        }
        return (textA.localeCompare(textB));
      });
    }
    return data
  }

  checkAllItemsListed = async () => {
    addAndSaveParadisePlanningList(this.state.data, "Name")
    setTimeout(()=>{this.setState({update: !this.state.update})}, 100)
  }

  unCheckAllItemsListed = async () => {
    removeAndSaveParadisePlanningList(this.state.data, "Name")
    setTimeout(()=>{this.setState({update: !this.state.update})}, 100)
  }

  invertCheckItemsListed = async () => {
    invertAndSaveParadisePlanningList(this.state.data, "Name")
    setTimeout(()=>{this.setState({update: !this.state.update})}, 100)
  }
  
  cycleFilter = () => {
    if(this.state.setFilter+1 >= this.filterTypes.length){
      this.setState({setFilter:0})
      this.handleSearch("", 0)
    }else {
      this.setState({setFilter:this.state.setFilter+1})
      this.handleSearch("", this.state.setFilter+1)
    }
  }

  headerHeight = calculateHeaderHeight(true, 0.2);
  scrollY = new Animated.Value(0);
  scrollYClamped = Animated.diffClamp(this.scrollY, 0, this.headerHeight/0.8); //or 1.5
  translateY = this.scrollYClamped.interpolate({
    inputRange: [0, this.headerHeight],
    outputRange: [0, -(this.headerHeight)],
  });
  
  render(){
    if(!this.state.loaded){
      return <Animated.View style={{width:Dimensions.get('window').width,position:"absolute", zIndex:1, transform: [{ translateY: this.translateY }]}}>
        <View style={{backgroundColor: colors.background[global.darkMode], flex: 1,justifyContent: 'flex-end',height:this.headerHeight,}}>
          <Header disableFilters={true} disableSearch={false} title={"Paradise Planning"} headerHeight={this.headerHeight} updateSearch={this.handleSearch} appBarColor={colors.paradisePlansAppBar[global.darkMode]} searchBarColor={colors.searchbarBG[global.darkMode]} titleColor={colors.textBlack[global.darkMode]}/>
        </View>
      </Animated.View>
    }
    return <>
      <FadeInOut duration={500} delay={0} startValue={0} endValue={1} fadeIn={true} maxFade={0.8}>
        <Animated.FlatList
          initialNumToRender={8}
          windowSize={4}
          style={{paddingTop:this.headerHeight+5}}
          onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: this.scrollY}}}],{useNativeDriver: true,},)}
          data={this.state.data}
          renderItem={({item, index}) => {
              return(<Request update={this.state.update} request={item} checkOffItem={this.checkOffItem}/>)
          }}
          keyExtractor={(item, index) => `list-item-${index}-${item["Name"]}`}
          contentContainerStyle={{paddingBottom:Dimensions.get('window').height/3}}
          ListFooterComponent={()=>{
            return this.state.data.length <= 0 && (global.language==="English" || global.language==="English (Europe)") ? <><View style={{height:100}}/>
              <TextFont bold={false} style={{fontSize: 16, textAlign:"center", color: colors.textBlack[global.darkMode], marginHorizontal: 20}}>Different regions have different Villager names.</TextFont>
              <TextFont bold={false} style={{fontSize: 16, textAlign:"center", color: colors.textBlack[global.darkMode], marginHorizontal: 20, marginTop:10}}>{"If a Villager is not listed, try changing the Language to " + (global.language==="English" ? "English (Europe)." : "English.")}</TextFont>
              <TouchableOpacity onPress={()=>{this.props.setPage(13)}} style={{padding:20}}><BlueText>Tap here to change Language in Settings</BlueText></TouchableOpacity>
            <View style={{height:30}}/></> : 
            <TextFont style={{marginTop:10, marginBottom:10, textAlign:'center', color:colors.lightDarkAccentHeavy[global.darkMode]}} translate={false}>{this.state.data.length+" "+(this.state.data.length!==1?attemptToTranslate("entries."):attemptToTranslate("entry."))}</TextFont>
          }}
        />
      </FadeInOut>
      <Animated.View style={{width:Dimensions.get('window').width,position:"absolute", zIndex:1, transform: [{ translateY: this.translateY }]}}>
        <View style={{backgroundColor: colors.background[global.darkMode], flex: 1,justifyContent: 'flex-end',height:this.headerHeight,}}>
          <Header invertCheckItemsListed={()=>{this.invertCheckItemsListed()}} unCheckAllItemsListed={()=>{this.unCheckAllItemsListed()}} checkAllItemsListed={()=>{this.checkAllItemsListed()}} customButton={<CycleCheckListFilter setFilter={this.state.setFilter} cycleFilter={this.cycleFilter}/>} disableFilters={true} disableSearch={false} title={"Paradise Planning"} headerHeight={this.headerHeight} updateSearch={this.handleSearch} appBarColor={colors.paradisePlansAppBar[global.darkMode]} searchBarColor={colors.searchbarBG[global.darkMode]} titleColor={colors.textBlack[global.darkMode]}/>
        </View>
      </Animated.View>
    </>
  }
}

class CycleCheckListFilter extends Component{
  render(){
    // console.log("Paradise planning page filter state:  "+this.props.setFilter)
    return <TouchableOpacity style={{width:70, height:63}} activeOpacity={0.7} onPress={()=>{this.props.cycleFilter()}}>
      {this.props.setFilter===0
        ?
        <Image style={{width:25,height:25, margin: 10, marginTop: 12, opacity: 0.35, marginRight: 30, resizeMode:"contain"}} source={require("../assets/icons/filterSearch.png")}/>
        : (
          this.props.setFilter===1
        ?
        <Check style={{position:"absolute", top:-4, left:-4, zIndex:100}} play={true} width={60} height={60} disablePopup={true}/>
        :<Check style={{position:"absolute", top:-4, left:-4, zIndex:100}} play={false} width={60} height={60} disablePopup={true}/>
        )
      }
    </TouchableOpacity>
  }
}

export class Request extends React.PureComponent{
  constructor(props){
    super(props);
    if(this.props.request["Request"]===undefined){ //this means it's a special NPC from the list, fill in info from Special NPCs JSON object
      this.villagerObject = {
        "NameLanguage": attemptToTranslate(this.props.request["Name"]),
        "Request": "Special NPC",
        "Icon Image": this.props.request["Icon Image"]
      }
    } else {
      if(this.props.villagerObject!==undefined){
        this.villagerObject = this.props.villagerObject
      } else {
        this.villagerObject = findObject(this.props.request["Name"], "Name", "Villagers")
      }
    }
    this.state = {checked:inVillagerParadise(this.props.request["Name"], true)===true}
  }
  componentDidMount(){
    this.setState({checked:inVillagerParadise(this.props.request["Name"], true)===true})
  }
  componentDidUpdate(prevProps){
    if(this.props!==prevProps){
      if(this.props.villagerObject){
        this.villagerObject = this.props.villagerObject
      }
      this.setState({checked:inVillagerParadise(this.props.request["Name"], true)===true})
    }
  }
  checkOff = () => {
    this.props.checkOffItem(this.props.request["Name"]); 
    this.setState({checked:!this.state.checked})
  }
  render(){
    let thoughtBubble =""
    let request = ""
    if(this.props.request["Request"]===undefined){ //this means it's a special NPC from the list, fill in info from Special NPCs JSON object
      request = "Special NPC character"
      thoughtBubble = "There is no special request for special NPC characters."
    } else {
      thoughtBubble = this.props.request["Thought bubble"]
      request = this.props.request["Request"]
    }
    if(this.villagerObject["Icon Image"]=="NA"){
      return <></>
    }
    return <>
      <TouchableOpacity activeOpacity={0.7} onPress={()=>{if(this.props.request["Request"]!==undefined) RootNavigation.navigate('36', {propsPassed:this.props.request}); else this.checkOff();}}>
      <View style={{backgroundColor: this.props.darkerBackground ? colors.lightDarkAccent[global.darkMode] : colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: this.props.lessMargin ? 10 : 20, marginVertical: 5,  borderRadius: 10}}>
        <View style={{paddingRight:40}}>
          <SubHeader style={{fontSize: 28,}}>{this.villagerObject["NameLanguage"]}</SubHeader>
          <SubHeader style={{fontSize: 19,}}>{request}</SubHeader>
          <Paragraph style={{marginTop:3}} translate={false} styled={true}>{thoughtBubble}</Paragraph>
        </View>
        <FastImage source={{uri:this.villagerObject["Icon Image"]}} cacheKey={this.villagerObject["Icon Image"]} style={{position:"absolute", right:13, top:13, height: 60, width: 60, resizeMode:'contain'}}/>
        <View style={{position:'absolute', right: 3, bottom: 0, zIndex:10}}>
          <TouchableOpacity onPress={()=>{this.checkOff()}}>
            <Check play={this.state.checked} width={80} height={80} disablePopup={true}/>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    </>
  }
}