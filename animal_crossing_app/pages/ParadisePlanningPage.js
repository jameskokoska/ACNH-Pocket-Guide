import React, {Component} from 'react';
import {Animated,FlatList, Dimensions, TouchableOpacity,StyleSheet, Text, View, Image, Vibration} from 'react-native';
import {removeAccents,getStorage, findObject, attemptToTranslateItem, getSettingsString, attemptToTranslateSpecial, attemptToTranslate} from "../LoadJsonData"
import colors from '../Colors'
import {attemptToTranslateAchievement} from "../LoadJsonData"
import FastImage from "../components/FastImage"
import {SubHeader, Paragraph} from "../components/Formattings"
import Header from "../components/Header"
import * as RootNavigation from '../RootNavigation.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Check from '../components/Check';
import FadeInOut from '../components/FadeInOut';
import { calculateHeaderHeight } from '../components/ListPage';
import Toast from "react-native-toast-notifications";
import TextFont from '../components/TextFont';

export default class ParadisePlanningPage extends Component {
  constructor(props){
    super(props);
    this.data = require("../assets/data/DataCreated/Paradise Planning.json");
    this.filterTypes = ["none","checked","not checked"]
    this.state = {
      selectedAchievement:"",
      data: require("../assets/data/DataCreated/Paradise Planning.json"),
      loaded: false,
      setFilter: 0,
    }
  }

  loadList = async() => {
    var storageData = JSON.parse(await getStorage("ParadisePlanning"+global.profile,JSON.stringify([])));
    if(storageData.constructor!==Array || storageData === undefined){
      storageData=[];
    }
    this.paradiseChecklist = storageData
    this.setState({loaded: true})
  }

  checkOffItem = (id) => {
    try {
      var oldList = this.paradiseChecklist;
      if(oldList.includes(id)){
        oldList = oldList.filter(item => item !== id)
        this.saveList(oldList);
        this.paradiseChecklist = oldList
        getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
      } else {
        oldList.push(id);
        this.saveList(oldList);
        this.paradiseChecklist = oldList
        getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,20,220,20]) : "";
      }
    } catch (e){
      toast.show("Please report this error to dapperappdeveloper@gmail.com : \n" + e.toString(), {type:"danger"})
    }
  }

  saveList = async(checklist) => {
    await AsyncStorage.setItem("ParadisePlanning"+global.profile, JSON.stringify(checklist));
  }

  async componentDidMount(){
    this.mounted = true;
    await this.loadList()
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  handleSearch = (text, filter=0) => {
    if(text===""){
      if(this.mounted){
        this.setState({data: this.data})
      }
    } else {
      var outputData = [];
      this.data.map( (request, index)=>{
        let requestRequest = request["Request"];
        let skip=false

        //handle filters
        if(this.filterTypes[filter]==="checked"){
          if(!this.paradiseChecklist.includes(request["Name"])){
            skip=true
          }
        }else if(this.filterTypes[filter]==="not checked"){
          if(this.paradiseChecklist.includes(request["Name"])){
            skip=true
          }
        }
        if(!skip){
          if(removeAccents(requestRequest.toString().toLowerCase()).includes(removeAccents(text.toString().toLowerCase()))){
            outputData.push(request);
          } else if (request["Name"] !==undefined && attemptToTranslateSpecial(request["Name"], "villagers")!==undefined && attemptToTranslateSpecial(request["Name"], "villagers").toString().toLowerCase().includes(text.toString().toLowerCase())){
            outputData.push(request);
          }
        }
      })
      if(this.mounted){
        this.setState({data:outputData});
      }
    }
  }

  
  cycleFilter = () => {
    if(this.state.setFilter+1 >= this.filterTypes.length){
      this.handleSearch(" ", 0)
      this.setState({setFilter:0})
    }else {
      this.handleSearch(" ", this.state.setFilter+1)
      this.setState({setFilter:this.state.setFilter+1})
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
      <Animated.View style={{width:Dimensions.get('window').width,position:"absolute", zIndex:1, transform: [{ translateY: this.translateY }]}}>
        <View style={{backgroundColor: colors.background[global.darkMode], flex: 1,justifyContent: 'flex-end',height:this.headerHeight,}}>
          <Header customButton={<CycleCheckListFilter setFilter={this.state.setFilter} cycleFilter={this.cycleFilter}/>} disableFilters={true} disableSearch={false} title={"Paradise Planning"} headerHeight={this.headerHeight} updateSearch={this.handleSearch} appBarColor={colors.paradisePlansAppBar[global.darkMode]} searchBarColor={colors.searchbarBG[global.darkMode]} titleColor={colors.textBlack[global.darkMode]}/>
        </View>
      </Animated.View>
      <FadeInOut duration={500} delay={0} startValue={0} endValue={1} fadeIn={true} maxFade={0.8}>
        <Animated.FlatList
          initialNumToRender={8}
          windowSize={4}
          style={{paddingTop:this.headerHeight+5}}
          onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: this.scrollY}}}],{useNativeDriver: true,},)}
          data={this.state.data}
          renderItem={({item, index}) => {
              return(<Request request={item} checkOffItem={this.checkOffItem} paradiseChecklist={this.paradiseChecklist}/>)
          }}
          keyExtractor={(item, index) => `list-item-${index}-${item["Name"]}`}
          contentContainerStyle={{paddingBottom:Dimensions.get('window').height/3}}
          ListFooterComponent={()=>{
            return <TextFont style={{marginTop:10, marginBottom:10, textAlign:'center', color:colors.lightDarkAccentHeavy[global.darkMode]}} translate={false}>{this.state.data.length+" "+(this.state.data.length!==1?attemptToTranslate("entries."):attemptToTranslate("entry."))}</TextFont>
          }}
        />
      </FadeInOut>
    </>
  }
}

class CycleCheckListFilter extends Component{
  render(){
    console.log("Paradise planning page filter state: "+this.props.setFilter)
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

class Request extends React.PureComponent{
  constructor(props){
    super(props);
    this.villagerObject = findObject(this.props.request["Name"], "Name", "Villagers")
    this.state = {checked:this.props.paradiseChecklist.includes(this.props.request["Name"])}
  }
  componentDidMount(){
    this.setState({checked:this.props.paradiseChecklist.includes(this.props.request["Name"])})
  }
  render(){
    return <>
      <TouchableOpacity activeOpacity={0.7} onPress={()=>{RootNavigation.navigate('36', {propsPassed:this.props.request});}}>
      <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
        <View style={{paddingRight:40}}>
          <SubHeader style={{fontSize: 28,}}>{this.villagerObject["NameLanguage"]}</SubHeader>
          <SubHeader style={{fontSize: 19,}}>{this.props.request["Request"]}</SubHeader>
          <Paragraph style={{marginTop:3}} translate={false} styled={true}>{attemptToTranslateAchievement(this.props.request["Thought bubble"])}</Paragraph>
        </View>
        <FastImage source={{uri:this.villagerObject["Icon Image"]}} cacheKey={this.villagerObject["Icon Image"]} style={{position:"absolute", right:13, top:13, height: 60, width: 60, resizeMode:'contain'}}/>
        <View style={{position:'absolute', right: 3, bottom: 0, zIndex:10}}>
          <TouchableOpacity onPress={()=>{this.props.checkOffItem(this.props.request["Name"]); this.setState({checked:!this.state.checked})}}>
            <Check play={this.state.checked} width={80} height={80} disablePopup={true}/>
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    </>
  }
}