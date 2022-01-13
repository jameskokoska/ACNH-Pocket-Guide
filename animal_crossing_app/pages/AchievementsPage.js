import React, {Component} from 'react';
import {Animated,FlatList, Dimensions, Vibration,TouchableNativeFeedback,TouchableOpacity,StyleSheet, Text, View, Image} from 'react-native';
import TextFont from '../components/TextFont';
import {removeAccents,getStorage, commas} from "../LoadJsonData"
import colors from '../Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {capitalizeFirst, getSettingsString, attemptToTranslate, attemptToTranslateAchievement} from "../LoadJsonData"
import {SubHeader, Paragraph} from "../components/Formattings"
import Header from "../components/Header"
import {PopupBottomCustom} from "../components/Popup"
import FadeInOut from "../components/FadeInOut";
import { calculateHeaderHeight } from '../components/ListPage';

export default class AchievementsPage extends Component {
  constructor(props){
    super(props);
    this.data = require("../assets/data/DataCreated/Achievements.json");
    this.state = {
      selectedAchievement:"",
      data: require("../assets/data/DataCreated/Achievements.json"),
    }
  }

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  openPopup = (achievement) =>{
    this.popup.openPopup(achievement);
  }

  handleSearch = (text) => {
    if(text===""){
      if(this.mounted){
        this.setState({data: this.data})
      }
    } else {
      var outputData = [];
      this.data.map( (achievement, index)=>{
        var achievementName = attemptToTranslateAchievement(achievement["Name"]).replace("(island name)", global.islandName);
        if(removeAccents(achievementName.toLowerCase()).includes(removeAccents(text.toLowerCase()))){
          outputData.push(achievement);
        } else if (achievement["Internal Category"].toLowerCase().includes(text.toLowerCase())){
          outputData.push(achievement);
        }
      })
      if(this.mounted){
        this.setState({data:outputData});
      }
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
    return <>
      <Animated.View style={{width:Dimensions.get('window').width,position:"absolute", zIndex:1, transform: [{ translateY: this.translateY }]}}>
        <View style={{backgroundColor: colors.background[global.darkMode], flex: 1,justifyContent: 'flex-end',height:this.headerHeight,}}>
          <Header disableFilters={true} disableSearch={false} title={"Achievements"} headerHeight={this.headerHeight} updateSearch={this.handleSearch} appBarColor={colors.achievementsAppBar[global.darkMode]} searchBarColor={colors.searchbarBG[global.darkMode]} titleColor={colors.textBlack[global.darkMode]}/>
        </View>
      </Animated.View>
      <Animated.FlatList
        style={{paddingTop:this.headerHeight+5}}
        onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: this.scrollY}}}],{useNativeDriver: true,},)}
        data={this.state.data}
        renderItem={({item}) => {
          return(<Achievement achievement={item} storageData={this.storageData} openPopup={this.openPopup}/>)
        }}
        keyExtractor={(item, index) => `list-item-${index}-${item["Name"]}`}
        contentContainerStyle={{paddingBottom:Dimensions.get('window').height/3}}
      />
      <AchievementsPopup ref={(popup) => this.popup = popup}/>
    </>
  }
}

class AchievementsPopup extends Component {
  constructor(props){
    super(props);
    this.achievementNouns = [];
    this.state = {
      selectedAchievement:"",
    }
  }
  getNouns = ()=>{
    this.achievementNouns = [];
    for(var i = 0; i < this.state.selectedAchievement["Num of Tiers"]; i++){
      this.achievementNouns.push(
        <TextFont key={"Tier "+(i+1).toString()+" Modifier"} style={{fontSize:20,
          color: colors.textWhite[0],
          marginLeft: 13,
          paddingLeft: 13,
          paddingRight: 13,
          paddingTop: 4,
          paddingBottom: 4,
          elevation: 3, 
          marginVertical: 5,
          alignSelf: 'flex-start', 
          textAlign: 'center', 
          backgroundColor: colors.achievementsModifier[global.darkMode], 
          borderRadius: 10}}
          translate={false}
        >
          {capitalizeFirst(attemptToTranslateAchievement(this.state.selectedAchievement["Tier "+(i+1).toString()+" Modifier"]))}
        </TextFont>
      )
      this.achievementNouns.push(
        <TextFont key={"Tier "+(i+1).toString()+" Noun"} style={{fontSize:20,
          color: colors.textWhite[0],
          marginLeft: 13,
          paddingLeft: 13,
          paddingRight: 13,
          paddingTop: 4,
          paddingBottom: 4,
          elevation: 3, 
          marginVertical: 5,
          alignSelf: 'flex-start', 
          textAlign: 'center', 
          backgroundColor: colors.achievementsNoun[global.darkMode], 
          borderRadius: 10}}
          translate={false}
        >
          {capitalizeFirst(attemptToTranslateAchievement(this.state.selectedAchievement["Tier "+(i+1).toString()+" Noun"]))}
        </TextFont>
      )
    }
  }
  
  openPopup = (achievement) =>{
    this.setState({selectedAchievement:achievement});
    this.popup?.setPopupVisible(true);
  }
  
  render(){
    var name = attemptToTranslateAchievement(this.state.selectedAchievement["Name"]);
    name = name.replace("(island name)", global.islandName)
    var description = attemptToTranslateAchievement(this.state.selectedAchievement["Achievement Description"])
    description = description.replace("(island name)", global.islandName)
    this.getNouns();
    return <>
      <PopupBottomCustom ref={(popup) => this.popup = popup}>
        <SubHeader margin={false}>{name}</SubHeader>
        <Paragraph translate={false} styled={true} margin={false}>{description}</Paragraph>
        <Paragraph translate={false} styled={true} margin={false}>{attemptToTranslateAchievement(this.state.selectedAchievement["Achievement Criteria"])}</Paragraph>
        <View style={{paddingTop:30, justifyContent:"center", marginHorizontal: 5, flexDirection: 'row', flexWrap:"wrap"}}>
          {this.achievementNouns}
        </View>
      </PopupBottomCustom>
    </>
  }
}

class Achievement extends React.PureComponent{
  constructor(props){
    super(props);
    this.achievementStamps = [];
    for(var i = 0; i < this.props.achievement["Num of Tiers"]; i++){
      this.achievementStamps.push(<AchievementStamp
        key={this.props.achievement["Name"]+i.toString()}
        id={this.props.achievement["Name"]+i.toString()}
        checkOffItem={this.props.checkOffItem}
        number = {this.props.achievement["Tier "+(i+1).toString()]}
        reward = {this.props.achievement["Tier "+(i+1).toString() + " Reward"]}
        index = {i.toString()}
      />)
    }
  }
  render(){
    var name = attemptToTranslateAchievement(this.props.achievement["Name"]);
    name = name.replace("(island name)", global.islandName)
    return <>
      <TouchableOpacity activeOpacity={0.7} onPress={()=>this.props.openPopup(this.props.achievement)}>
      <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
        <SubHeader>{name}</SubHeader>
        <Paragraph translate={false} styled={true}>{attemptToTranslateAchievement(this.props.achievement["Achievement Criteria"])}</Paragraph>
        <View style={{paddingTop:10, marginHorizontal: 5, flex: 1, flexDirection: 'row', justifyContent:'center',flexWrap:"wrap"}}>
          {this.achievementStamps}
        </View>
      </View>
      </TouchableOpacity>
    </>
  }
}

class AchievementStamp extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      checked: false,
    }
    this.random = Math.random();
  }

  componentDidMount(){
    this.mounted = true;
    this.id = this.props.id;
    this.loadChecked();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  loadChecked = async() => {
    var storageData = JSON.parse(await getStorage("Achievements"+global.profile,JSON.stringify([])));
    if(storageData.includes(this.id) && this.mounted){
      this.setState({checked:true})
    }
  }

  checkOffItem = async(id) => {
    var oldList = await JSON.parse(await getStorage("Achievements"+global.profile,JSON.stringify([])));
    
    if(oldList.includes(id)){
      oldList = oldList.filter(item => item !== id);
      await this.saveList(oldList);
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
      if(this.mounted)
        this.setState({checked:false})
    } else {
      oldList.push(id);
      await this.saveList(oldList);
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10,220,20]) : "";
      if(this.mounted)
        this.setState({checked:true})
    }
  }

  saveList = async(data) => {
    if(this.mounted)
      await AsyncStorage.setItem("Achievements"+global.profile, JSON.stringify(data));
    console.log("Achievements"+global.profile)
  }
  render(){
    return (
      <View style={{margin:3}}>
        <TouchableOpacity 
          background={TouchableNativeFeedback.Ripple(colors.todoColorAccent[global.darkMode], false)}
          onLongPress={() => {  
            this.checkOffItem(this.id); 
          }}
          onPress={()=>{
            this.checkOffItem(this.id); 
          }}
        >
          <View style={{width: 60,height: 60,borderRadius: 100,justifyContent: "center",alignItems: "center",borderWidth: 2, borderColor: this.state.checked ? colors.checkGreen[global.darkMode] : colors.lightDarkAccent[global.darkMode], backgroundColor:colors.lightDarkAccent[global.darkMode]}}>
            {this.state.checked?<FadeInOut duration={200} startValue={0} endValue={1} fadeIn={true} fadeInOut={true} scaleInOut={true} maxFade={0.8} minScale={0.2}><Image style={{transform: [{ rotate: (-20 + Math.floor(this.random * 40)).toString()+'deg' }], opacity: 0.7, resizeMode:'contain',width:45, height:45}} source={require("../assets/icons/seal.png")}/></FadeInOut>:<View/>}
          </View>
        </TouchableOpacity>
        <TextFont suffix={" "+attemptToTranslate("to get")} translate={false} numberOfLines={2} bold={false} style={{width: 60, marginTop: 3, color: colors.textBlack[global.darkMode], fontSize: 10, textAlign:"center"}}>{commas(this.props.number)}</TextFont>
        <View style={{alignItems: 'center', justifyContent:"center",flexDirection:"row"}}>
          <TextFont translate={false} bold={false} style={{color: colors.textBlack[global.darkMode], fontSize: 10, textAlign:"center"}}>{commas(this.props.reward)}</TextFont>
          <Image style={{marginLeft:5, resizeMode:'contain',width:20, height:20}} source={require("../assets/icons/miles.png")}/>
        </View>
      </View>
    )
  }
}