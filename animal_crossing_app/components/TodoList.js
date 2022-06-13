import React, {Component, useRef} from 'react';
import {Dimensions, Linking, TextInput, Vibration,TouchableNativeFeedback,TouchableOpacity,StyleSheet, Text, View, Image, BackHandler} from 'react-native';
import TextFont from './TextFont';
import {addHours, getCurrentDateObject, getDateStringMonthDay, getMonth, getWeekDayShort} from './DateFunctions';
import {getStorage, checkOff, capitalize, commas, removeBrackets, attemptToTranslateSpecial} from "../LoadJsonData"
import {getPhoto} from "./GetPhoto"
import Check from './Check';
import colors from '../Colors'
import PopupAddTask, { PopupAddTaskBreak } from "./PopupAddTask"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSettingsString, attemptToTranslate, getCurrentVillagerObjects, getCurrentVillagerNamesString} from "../LoadJsonData"
import FastImage from "./FastImage"
import Popup, {PopupInfoCustom} from "./Popup"
import ButtonComponent from "./ButtonComponent";
import * as RootNavigation from '../RootNavigation.js';
import { DropdownMenu } from './Dropdown';
import FadeInOut from './FadeInOut';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/native';

export function TodoList(props){
  let onlyUpdateMe = false
  
  useFocusEffect(
    React.useCallback(() => {
      if(onlyUpdateMe){
        if(todoListWrapped!==undefined){
          todoListWrapped?.current.loadList(true)
        }
      }
    },)
  );

  const setOnlyUpdateMe = (value) => {
    onlyUpdateMe = value
  }

  const todoListWrapped = useRef(undefined)

  return <TodoListWrapped {...props} setOnlyUpdateMe={setOnlyUpdateMe} ref={todoListWrapped}/>
}

export class TodoListWrapped extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      loaded:false,
      showEdit: false,
      showVillagersTalkList: false,
      resetEachDay: false,
      addToTop: false,
    }
    this.deleteIndex=-1
  }

  componentDidMount(){
    this.mounted=true;
    this.loadList();
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPressToDo",
      this.handleBackButton,
    );
  }

  componentWillUnmount(){
    this.mounted=false;
    BackHandler.removeEventListener("hardwareBackPressToDo", this.handleBackButton);
  }

  handleBackButton = () => {
    if(this.state.showEdit===true){
      this.setState({showEdit:false})
      return true
    } else {
      return false
    }
  }

  loadList = async(showLoading=false) => {
    if(showLoading)
      this.setState({loaded:false})
    let showVillagersTalkList = (await getStorage("showVillagersTalkList"+global.profile,"false"))==="true";
    let storageData = JSON.parse(await getStorage("ToDoList"+global.profile,JSON.stringify(defaultToDoList())));
    let resetEachDay = (await getStorage("resetEachDay","false"))==="true";
    let addToTop = (await getStorage("addTasksToTop"+global.profile,"true")) === "true";
    if(showVillagersTalkList){
      storageData = [...storageData, ...this.populateDataWithNewVillagers(storageData)];
      await this.saveList(storageData);
    }
    if(this.mounted){
      this.setState({loaded:true,data:storageData,showVillagersTalkList:showVillagersTalkList, resetEachDay: resetEachDay,addToTop:addToTop});
    }
    if(resetEachDay){
      let dateWithOffset = addHours(getCurrentDateObject(),-5)
      let currentDateString = dateWithOffset.getMonth().toString()+"-"+dateWithOffset.getDate().toString()+"-"+dateWithOffset.getFullYear().toString()
      let lastOpened = await getStorage("lastOpenedDay",currentDateString);
      // console.log(lastOpened)
      if(lastOpened!==currentDateString){
        this.uncheckAll()
        await AsyncStorage.setItem("lastOpenedDay", currentDateString);
      }
      // console.log(currentDateString)
    }
    this.props.setLoadedToDo(true);
  }

  populateDataWithVillagers = () => {
    var currentVillagers = getCurrentVillagerObjects();
    var data = [];
    var currentVillager = {}
    for(var i = 0; i<currentVillagers.length; i++){
      currentVillager = {villagerChecklist: true, title: attemptToTranslate("Talk to") + " " + attemptToTranslate(currentVillagers[i]["Name"], true), finished: false, picture: currentVillagers[i]["Icon Image"], small:true}
      data.push(currentVillager)
    }
    return data;
  }

  populateDataWithNewVillagers = (currentData) => {
    var currentVillagers = getCurrentVillagerObjects();
    var data = [];
    var currentVillager = {}

    for(var i = 0; i<currentVillagers.length; i++){
      currentVillager = {villagerChecklist: true, title: attemptToTranslate("Talk to") + " " + attemptToTranslateSpecial(currentVillagers[i]["Name"],"villagers"), finished: false, picture: currentVillagers[i]["Icon Image"], small:true}
      let found = false
      for(var j = 0; j<currentData.length; j++){
        if(currentData[j]["picture"]===currentVillagers[i]["Icon Image"]){
          found = true
          break;
        }
      }
      if(!found){
        data.push(currentVillager)
      }
    }
    return data;
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("ToDoList"+global.profile, JSON.stringify(data));
  }

  checkOffItem = (index, value) => {
    // console.log(value)
    const newTaskList=this.state.data;
    newTaskList[index].finished = value;
    // this.setState({data:newTaskList})
    if(value!==false && newTaskList[index].small !== true){
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10,220,20]) : "";
    } else if(value!==false && newTaskList[index].small === true){
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10,20,20]) : "";
    } else {
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    }
    this.saveList(newTaskList);
  }

  deleteItem = (index) => {
    this.deleteIndex = index
    this.popupDeleteToDo?.setPopupVisible(true, "", this.state.data[index]?.title)
  }

  deleteItemGo = () => {
    const newTaskList = this.state.data.filter((index,i) => i!=this.deleteIndex);
    this.setState({data:newTaskList});
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.saveList(newTaskList);
  }

  reorderItem = (index, direction) => {
    //-1 moves the item down
    //1 moves the item up
    const items = this.state.data
    const position = index
    if (
      (direction === -1 && position === 0) ||
      (direction === 1 && position === items.length - 1)
    ) {
      return;
    }

    const item = items[position]; // save item for later
    
    items.splice(index, 1);
    items.splice(position + direction, 0, item);

    this.setState({data: items});
    this.saveList(items);
  };

  componentWillUnmount(){
  }

  addItemPopup = (open) => {
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.popupAddTask?.setPopupVisible(true);
  }

  addItem = (item, edit=false) => {
    let tasks = this.state.data;
    if(edit===false){
      if(this.state.addToTop){
        tasks = [item, ...tasks]
      } else {
        tasks.push(item);
      }
    }
    if(edit!==false){
      tasks[edit] = item;
    }
    this.setState({data: tasks});
    this.saveList(tasks);
  }

  uncheckAll = () => {
    var currentData = this.state.data;
    for(var i = 0; i<currentData.length; i++){
      currentData[i].finished=false;
    }
    this.setState({data:currentData});
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([30,30,30,30,30,30]) : "";
    this.saveList(currentData);
  }

  toggleVillagerTalk = async () => {
    if(getCurrentVillagerNamesString()==="You have no favorite villagers."){
      this.popup?.setPopupVisible(true);
      return;
    }
    await AsyncStorage.setItem("showVillagersTalkList",!this.state.showVillagersTalkList?"true":"false");
    var data = this.state.data
    if(!this.state.showVillagersTalkList){
      data = [...this.state.data, ...this.populateDataWithVillagers()];
    } else {
      //Remove all villager checklist entries
      var removeIndexes = [];
      for(var i = 0; i<data.length; i++){
        if(data[i]["villagerChecklist"]){
          removeIndexes.push(i)
        }
      }
      while(removeIndexes.length) {
        data.splice(removeIndexes.pop(), 1);
      }
      
    }
    this.setState({showVillagersTalkList:!this.state.showVillagersTalkList, data:data})
    await this.saveList(data);
  }

  render(){
    return <>
      <View style={{alignItems:"center",flexDirection:"row", right:-3, top:0,position:'absolute',zIndex:10}}>
        <TouchableOpacity style={{padding:10, paddingRight:0, marginRight:-5}} 
          onPress={()=>{
            this.addItemPopup(true); 
        }}>
          <Image source={require("../assets/icons/addIcon.png")} style={{width:25, height:25, borderRadius:100,}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:2, padding:10, paddingRight:0, marginRight:-5}} 
            onPress={()=>{
              this.props.setOnlyUpdateMe(true)
              RootNavigation.navigate('38', {propsPassed:{todos:this.state.data, addToTop: this.state.addToTop}});
          }}>
            <Image source={require("../assets/icons/pencil.png")} style={{opacity:global.darkMode?1:0.7, width:25, height:25, borderRadius:100,}}/>
          </TouchableOpacity>
        <DropdownMenu
          style={{padding:10, paddingLeft:0}}
          width={120}
          items={[
            {label:"Add Category Separator", value:"Add Category Separator", highlighted: false},
            // {label:this.state.showEdit ? "Disable Edit List" : "Edit List", value:"Edit List", highlighted: this.state.showEdit ? true : false},
            {label:"Uncheck All", value:"Uncheck All",},
            {label:"Uncheck Each Day (at 5 AM)", value:"Uncheck Each Day", highlighted: this.state.resetEachDay},
            {label:this.state.addToTop ? "Add New Tasks To Top" : "Add New Tasks To Bottom", value:"Add To Top", highlighted: this.state.addToTop ? true : false},
          ]}
          defaultValue={""}
          onChangeItem={
            async (item)=>{
              if(item.value==="Add Category Separator"){
                this.popupAddTaskBreak?.setPopupVisible(true)
                getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
              }else if(item.value==="Edit List"){
                // this.setState({showEdit:!this.state.showEdit});
                this.props.setOnlyUpdateMe(true)
                getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
                RootNavigation.navigate('38', {propsPassed:{todos:this.state.data, addToTop: this.state.addToTop}});
              }else if(item.value==="Uncheck All"){
                this.uncheckAll(); 
              }else if(item.value==="Uncheck Each Day"){
                if(!this.state.resetEachDay){
                  //set up first time when enabled
                  let dateWithOffset = addHours(getCurrentDateObject(),-5)
                  let currentDateString = dateWithOffset.getMonth().toString()+"-"+dateWithOffset.getDate().toString()+"-"+dateWithOffset.getFullYear().toString()
                  let lastOpened = await getStorage("lastOpenedDay"+global.profile,currentDateString);
                  console.log("enabled reset tasks")
                }
                await AsyncStorage.setItem("resetEachDay",!this.state.resetEachDay?"true":"false");
                this.setState({resetEachDay:!this.state.resetEachDay})
              }else if(item.value==="Add To Top"){
                await AsyncStorage.setItem("addTasksToTop",!this.state.addToTop?"true":"false");
                this.setState({addToTop:!this.state.addToTop})
              }
            }
          }
        >
          <Image style={{width:21,height:21,resizeMode:'contain',marginLeft:10,}} source={global.darkMode ? require("../assets/icons/menuDotsWhite.png") : require("../assets/icons/menuDots.png")} />
        </DropdownMenu>
      </View>
      <View style={{height:10}}/>
      <View style={{alignItems: 'center'}}>
        <View style={{paddingTop:0, marginHorizontal: 0, flex: 1, flexDirection: 'row', justifyContent:'center',flexWrap:"wrap"}}>
          {this.state.loaded?
            <>
              {this.state.data.map( (item, index)=>{
                if(this.state.showEdit){
                  return <TodoItemEdit
                    key={item+index.toString()}
                    item={item}
                    index={index}
                    deleteItem={this.deleteItem}
                    showEdit={true}
                    editTask={()=>{item.picture==="breakerSeparator" ?  this.popupAddTaskBreak?.setPopupVisible(true, item, index) : this.popupAddTask?.setPopupVisible(true, item, index);}}
                  />
                }else if(item.small){
                  return(
                    <TodoItemSmall
                      key={item+index.toString()}
                      item={item}
                      index={index}
                      checkOffItem={this.checkOffItem}
                      deleteItem={this.deleteItem}
                      reorderItem={this.reorderItem}
                      showEdit={this.state.showEdit}
                      editTask={()=>{item.picture==="breakerSeparator" ?  this.popupAddTaskBreak?.setPopupVisible(true, item, index) : this.popupAddTask?.setPopupVisible(true, item, index);}}
                    />
                  )
                } else {
                  return(
                    <TodoItem
                      key={item+index.toString()}
                      item={item}
                      index={index}
                      checkOffItem={this.checkOffItem}
                      deleteItem={this.deleteItem}
                      reorderItem={this.reorderItem}
                      showEdit={this.state.showEdit}
                      editTask={()=>{item.picture==="breakerSeparator" ?  this.popupAddTaskBreak?.setPopupVisible(true, item, index) : this.popupAddTask?.setPopupVisible(true, item, index);}}
                    />
                  )
                }
              })}
              <View style={{width:"100%"}}>
                {getCurrentVillagerNamesString()==="You have no favorite villagers."?<>
                <View style={{height:10}}/>
                <TouchableOpacity onPress={() => this.props.setPage(8)}>
                  <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>You have no villagers added</TextFont>
                  <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>Tap here and go add some</TextFont>
                </TouchableOpacity>
                <View style={{height:10}}/>
                </>:<View/>}
                <TouchableOpacity style={{marginTop:5, padding:12, alignSelf: 'center'}} 
                  onPress={()=>{
                    if(this.state.showVillagersTalkList){
                      this.popupRemoveTalkVillagers?.setPopupVisible(true)
                    }else{
                      this.toggleVillagerTalk(); 
                    }
                }}>
                  <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{this.state.showVillagersTalkList ? "Hide talk to villagers list" : "Show talk to villagers list"}</TextFont>
                </TouchableOpacity>
              </View>
              <PopupAddTask ref={(popupAddTask) => this.popupAddTask = popupAddTask} addItem={this.addItem}/>
              <PopupAddTaskBreak ref={(popupAddTaskBreak) => this.popupAddTaskBreak = popupAddTaskBreak} addItem={this.addItem}/>
              <PopupInfoCustom header={<TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>You do not have any villagers added!</TextFont>} ref={(popup) => this.popup = popup} buttonText={"Dismiss"}>
                <TouchableOpacity style={{paddingVertical:20,}} onPress={() => this.props.setPage(8)}>
                  <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 16, textAlign:"center"}}>{"Tap here and go add some!"}</TextFont>
                </TouchableOpacity>
              </PopupInfoCustom>
              <Popup ref={(popupRemoveTalkVillagers) => this.popupRemoveTalkVillagers = popupRemoveTalkVillagers} text={attemptToTranslate("Hide talk to villagers list")+"?"} button1={"Cancel"} button1Action={()=>{}} button2={"Yes"} button2Action={()=>{this.toggleVillagerTalk()}}/>
              <Popup ref={(popupDeleteToDo) => this.popupDeleteToDo = popupDeleteToDo} text="Delete?" button1={"Cancel"} button1Action={()=>{}} button2={"Delete"} button2Action={()=>{this.deleteItemGo()}}/>
            </>
            :
            <LottieView autoPlay loop
              style={{width: 90, zIndex:1, transform: [{ scale: 1.1 },{ rotate: '0deg'},],}}
              source={require('../assets/loading.json')}
            />
          }
        </View>
      </View>
    </>
  }
}

export function defaultToDoList(){
  var defaultList = [
    {title: attemptToTranslate('Water Flowers'), finished: false, picture:"flower.png"},
    {title: attemptToTranslate('Dig Fossils'), finished: false, picture:"digIcon.png"},
    {title: attemptToTranslate('Find DIY bottle'), finished: false, picture: "https://acnhcdn.com/latest/MenuIcon/BottleRecipe.png"},
    {title: attemptToTranslate('Rock') + " 1", finished: false, picture:"rock.png",small:true},
    {title: attemptToTranslate('Rock') + " 2", finished: false, picture:"rock.png",small:true},
    {title: attemptToTranslate('Rock') + " 3", finished: false, picture:"rock.png",small:true},
    {title: attemptToTranslate('Rock') + " 4", finished: false, picture:"rock.png",small:true},
    {title: attemptToTranslate('Rock') + " 5", finished: false, picture:"rock.png",small:true},
    {title: attemptToTranslate('Rock') + " 6", finished: false, picture:"rock.png",small:true},
    {title: attemptToTranslate('Turnip Prices'), finished: false, picture:"turnip.png", small:true},
    {title: attemptToTranslate('Turnip Prices'), finished: false, picture:"turnip.png", small:true},
  ]
  return defaultList
}

export class TurnipLog extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: defaultTurnipList(),
    }
  }

  componentDidMount(){
    this.mounted = true
    setTimeout(()=>{this.loadList()},0)
  }

  componentWillUnmount(){
    this.mounted=false
  }

  loadList = async() => {
    var storageData = JSON.parse(await getStorage("TurnipList"+global.profile,JSON.stringify(defaultTurnipList())));
    var storageLastPattern = await getStorage("TurnipListLastPattern"+global.profile,"-1");
    var storageFirstTime = await getStorage("TurnipListFirstTime"+global.profile,"false");
    if(this.mounted){
      this.setState({data:storageData, lastPattern: storageLastPattern, firstTime: storageFirstTime});
    }
  }

  clearHistory = async() => {
    this.setState({data:defaultTurnipList()});
    // console.log(this.state.data);
    await this.saveList(defaultTurnipList());
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("TurnipList"+global.profile, JSON.stringify(data));
  }

  updateItem = (item, index) => {
    var currentData = this.state.data;
    currentData[index] = item;
    this.setState({data: currentData});
    this.saveList(currentData);
  }

  getTurnipLink = () => {
    let turnipLink = "https://turnipprophet.io/?prices="
    for(var i = 0; i<this.state.data.length; i++){
      if(i===0){
        turnipLink += this.state.data[0].purchase;
      }else{
        turnipLink += this.state.data[i].am;
        turnipLink += ".";
        turnipLink += this.state.data[i].pm;
      }
      if(i!==this.state.data.length){
        turnipLink += ".";
      }
    }
    turnipLink += "&first="+this.state.firstTime;
    turnipLink += "&pattern="+this.state.lastPattern;
    return turnipLink
  }

  render(){
    var buttonsHistory = <>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <ButtonComponent
          text={"Clear Prices"}
          color={colors.cancelButton[global.darkMode]}
          vibrate={20}
          onPress={() => {
            this.clearHistory();
            this.popupHistory?.setPopupVisible(false);
          }}
        /> 
        <ButtonComponent
          text={"Cancel"}
          color={colors.okButton[global.darkMode]}
          vibrate={10}
          onPress={() => {
            this.popupHistory?.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    return (
      <>
      <PopupInfoCustom buttons={buttonsHistory} ref={(popupHistory) => this.popupHistory = popupHistory} buttonDisabled={true} buttonText={"OK"} header={<TextFont bold={true} style={{fontSize: 22, marginBottom:11, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Are you sure you want to clear your turnip prices?</TextFont>}>
        <View/>
      </PopupInfoCustom>
        <TouchableOpacity style={{padding:5,position:"absolute",right:20,top:10}} 
          onPress={async()=>{
            this.popupHistory?.setPopupVisible(true);
            getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
        }}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"Clear Prices"}</TextFont>
        </TouchableOpacity>
      <View style={{marginHorizontal:25, marginTop: 15}}>
        <DropdownMenu
          selection
          width={Dimensions.get('window').width-100}
          items={[
            {label: attemptToTranslate("Last week's pattern") + ": " + attemptToTranslate("Unknown"), value: "-1",},
            {label: attemptToTranslate("Last week's pattern") + ": " + attemptToTranslate("Fluctuating"), value: "0",},
            {label: attemptToTranslate("Last week's pattern") + ": " + attemptToTranslate("Small spike"), value: "3",},
            {label: attemptToTranslate("Last week's pattern") + ": " + attemptToTranslate("Large spike"), value: "1",},
            {label: attemptToTranslate("Last week's pattern") + ": " + attemptToTranslate("Decreasing"), value: "2",},
          ]}
          defaultValue={this.state.lastPattern}
          onChangeItem={async (item) => {this.setState({lastPattern:item.value}); await AsyncStorage.setItem("TurnipListLastPattern"+global.profile, item.value);}}
        />
        <View style={{height:5}}/>
        <DropdownMenu
          selection
          width={Dimensions.get('window').width-100}
          items={[
            {label: attemptToTranslate("First time buyer?") + ": " + attemptToTranslate("Yes"), value: "true",},
            {label: attemptToTranslate("First time buyer?") + ": " + attemptToTranslate("No"), value: "false",},
          ]}
          defaultValue={this.state.firstTime}
          onChangeItem={async (item) => {this.setState({firstTime:item.value}); await AsyncStorage.setItem("TurnipListFirstTime"+global.profile, item.value);}}
        />

        {this.state.data.map( (item, index)=>
          <TurnipItem
            key={item.title+index.toString()}
            item={item}
            updateItem={this.updateItem}
            index={index}
          />
        )}
        <TouchableOpacity style={{marginVertical:8, backgroundColor:colors.eventBackground[global.darkMode], padding: 10, borderRadius: 10}} 
          onPress={()=>{
            // openURL(
            //   this.turnipLink,
            // );
            RootNavigation.navigate('BrowserPage', {propsPassed:this.getTurnipLink()});
        }}>
          <TextFont bold={true} style={{color: colors.fishText[global.darkMode], fontSize: 18, textAlign:"center"}}>{"View on turnipprophet.io"}</TextFont>
          <TextFont style={{color: colors.fishText[global.darkMode], fontSize: 12, textAlign:"center"}}>{"(Price calculator and predictor)"}</TextFont>
        </TouchableOpacity>
      </View>
      </>
    )
  }
}

export function defaultTurnipList(){
  return [
    {title: 'Purchase', purchase: ""},
    {title: 'Monday', am: "", pm:""},
    {title: 'Tuesday', am: "", pm:""},
    {title: 'Wednesday', am: "", pm:""},
    {title: 'Thursday', am: "", pm:""},
    {title: 'Friday', am: "", pm:""},
    {title: 'Saturday', am: "", pm:""},
  ];
}

class TurnipItem extends Component {
  render(){
    if(this.props.item.purchase!==undefined){
      var item = {title: this.props.item.title, purchase: this.props.item.purchase,};
      return(
        <View style={[styles.row,{paddingLeft: 20, height: 55, paddingVertical:5,backgroundColor:colors.eventBackground[global.darkMode]}]}>
          <TextFont bold={true} numberOfLines={2} style={{width:"45%", fontSize:16, color:colors.textBlack[global.darkMode]}}>{capitalize(this.props.item.title)}</TextFont>
          <TextInput
            allowFontScaling={false}
            keyboardType={"numeric"}
            style={{textAlign:"center", fontSize: 17, width:"55%", color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:(getCurrentDateObject().getDay() === this.props.index && getCurrentDateObject().getHours() < 12) ?colors.highlightTurnipDay[global.darkMode]:colors.lightDarkAccent[global.darkMode], padding: 6, borderRadius: 5}}
            onChangeText={(text) => {item.purchase = text; this.props.updateItem(item,this.props.index)}}
            placeholder={attemptToTranslate("Sunday Price")}
            defaultValue={this.props.item.purchase}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            multiline={true}
          />
        </View>
      )
    } else {
      var item = {title: this.props.item.title, am: this.props.item.am, pm:this.props.item.pm};
      return(
        <View style={[styles.row,{paddingLeft: 20, height: 55, paddingVertical:5, backgroundColor:colors.eventBackground[global.darkMode]}]}>
          <TextFont bold={true} numberOfLines={2} style={{width:"45%", fontSize:16, color:colors.textBlack[global.darkMode]}}>{capitalize(this.props.item.title)}</TextFont>
          <TextInput
            allowFontScaling={false}
            keyboardType={"numeric"}
            style={{textAlign:"center", fontSize: 17, width:"25%", color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:(getCurrentDateObject().getDay() === this.props.index && getCurrentDateObject().getHours() < 12) ?colors.highlightTurnipDay[global.darkMode]:colors.lightDarkAccent[global.darkMode], padding: 6, borderRadius: 5}}
            onChangeText={(text) => {item.am = text; this.props.updateItem(item,this.props.index)}}
            placeholder={attemptToTranslate("AM")}
            defaultValue={this.props.item.am}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            multiline={true}
          />
          <View style={{width:"3%"}}/>
          <TextInput
            allowFontScaling={false}
            keyboardType={"numeric"}
            style={{textAlign:"center", fontSize: 17, width:"25%", color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:(getCurrentDateObject().getDay() === this.props.index && getCurrentDateObject().getHours() >= 12) ?colors.highlightTurnipDay[global.darkMode]:colors.lightDarkAccent[global.darkMode], padding: 6, borderRadius: 5}}
            onChangeText={(text) => {item.pm = text; this.props.updateItem(item,this.props.index)}}
            placeholder={attemptToTranslate("PM")}
            defaultValue={this.props.item.pm}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            multiline={true}
          />
        </View>
      )
    }
  }
}

class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      showRemove:false,
      checked:false
    }
  }
  componentDidMount(){
    this.setState({showRemove:false, checked:this.props.item!==undefined ? this.props.item.finished : false})
  }
  componentDidUpdate(prevProps){
    if(prevProps!==this.props){
      this.setState({showRemove:false, checked:this.props.item!==undefined ? this.props.item.finished : false})
    }
  }
  removeButton = (props)=>{
    if(props.showEdit || this.state.showRemove)
      return(<>
        <View style={{flexDirection:"row",left:-10, top:-5,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{padding:9}} 
            onPress={()=>{
              props.deleteItem(props.index); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",left:-10, bottom:-10,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{padding:9}} 
            onPress={()=>{
              props.editTask(); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/pencil.png")} style={{opacity:0.5,width:20, height:20, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",right:5, top:-5,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{padding:9}} 
            onPress={()=>{
              props.reorderItem(props.index, -1); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/upArrow.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:9}} 
            onPress={()=>{
              props.reorderItem(props.index, 1); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/downArrow.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
      </>)
    else
      return(
        <View/>
      )
  }
  render(){
    if(this.props.item.picture === "breakerSeparator" && this.props.item.title==="")
      return (
        <View style={{width: Dimensions.get('window').width-20*2,}}>
        {this.removeButton(this.props)}
        <TouchableNativeFeedback onLongPress={() => {  
            this.setState({showRemove:!this.state.showRemove})
            getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(8) : "";
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"1A", false)}
        >
          <View style={{height:45, justifyContent:"center"}}>
            <View style={{marginTop: 10, height:2, borderRadius: 100, backgroundColor:colors.fishText[global.darkMode], marginHorizontal:-5}}/>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
    if(this.props.item.picture === "breakerSeparator")
      return (
        <View style={{width: Dimensions.get('window').width-20*2}}>
        {this.removeButton(this.props)}
        <TouchableNativeFeedback onLongPress={() => {  
          this.setState({showRemove:!this.state.showRemove})
          getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(8) : "";
        }}
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"1A", false)}
        >
          <View>
          <View style={{padding:5, paddingVertical:20, paddingBottom:0, paddingLeft:12}}>
            <TextFont translate={false} bold={true} numberOfLines={2} style={{fontSize:22, color:colors.fishText[global.darkMode]}}>{this.props.item.title}</TextFont>
          </View>
          </View>
        </TouchableNativeFeedback>
        <View style={{height:2, borderRadius: 100, backgroundColor:colors.fishText[global.darkMode], marginBottom:4, marginHorizontal:-5}}/>
      </View>
    )
    var imageComp = <View/>
    if(this.props.item.picture && this.props.item.picture?.startsWith("http")){
      imageComp = <FastImage
        style={{height: 45,width: 45,resizeMode:'contain',}}
        source={{uri:this.props.item.picture}}
        cacheKey={this.props.item.picture}
      />
    } else {
      imageComp = <Image
        style={{height: 35,width: 35,resizeMode:'contain',}}
        source={getPhoto(this.props.item.picture)}
      />
    }
    return (
      <View style={{width: Dimensions.get('window').width-20*2}}>
        {this.removeButton(this.props)}
        <TouchableNativeFeedback onLongPress={() => {  
          this.setState({showRemove:!this.state.showRemove})
          getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(8) : "";
        }}
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"1A", false)}
        onPress={()=>{
          this.props.checkOffItem(this.props.index, !this.state.checked); 
          this.setState({checked:!this.state.checked})
        }}
        >
          <View style={[styles.row,{backgroundColor:colors.eventBackground[global.darkMode]}]}>
            <View style={[styles.rowImageBackground,{backgroundColor:colors.lightDarkAccent[global.darkMode]}]}>
              {imageComp}
            </View>
            <View style={styles.rowTextTop}>
              <TextFont translate={false} bold={true} numberOfLines={2} style={{fontSize:20, color:colors.textBlack[global.darkMode]}}>{this.props.item.title}</TextFont>
            </View>
            <TouchableOpacity style={{position:"absolute", right: -5}} 
              activeOpacity={0.6}
              onPress={() => {  
                this.props.checkOffItem(this.props.index, !this.state.checked); 
                this.setState({checked:!this.state.checked})
            }}>
              <Check checkType={this.props.checkType} fadeOut={false} play={this.state.checked} width={90} height={90} disablePopup={true}/>
            </TouchableOpacity>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

class TodoItemSmall extends Component {
  constructor() {
    super();
    this.state = {
      showRemove:false,
      checked:false
    }
  }
  componentDidMount(){
    this.setState({showRemove:false, checked:this.props.item!==undefined ? this.props.item.finished : false})
  }
  componentDidUpdate(prevProps){
    if(prevProps!==this.props){
      this.setState({showRemove:false, checked:this.props.item!==undefined ? this.props.item.finished : false})
    }
  }
  removeButton = (props)=>{
    if(props.showEdit || this.state.showRemove)
      return(<>
        <View style={{flexDirection:"row",left:-9, top:-9,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{padding:9}} 
            onPress={()=>{
              props.deleteItem(props.index); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",left:-9, top:32,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{padding:9}} 
            onPress={()=>{
              props.editTask(); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/pencil.png")} style={{opacity:0.5,width:20, height:20, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",right:-2, top:-9,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{paddingVertical:9, padding:2}} 
            onPress={()=>{
              props.reorderItem(props.index, -1); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/upArrow.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical:9, padding:2}} 
            onPress={()=>{
              props.reorderItem(props.index, 1); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/downArrow.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
      </>)
    else
      return(
        <View/>
      )
  }
  render(){
    var imageComp = <View/>
    if(this.props.item.picture && this.props.item.picture?.startsWith("http")){
      imageComp = <FastImage
        style={{height: 45,width: 45,resizeMode:'contain',}}
        source={{uri:this.props.item.picture}}
        cacheKey={this.props.item.picture}
      />
    } else {
      imageComp = <Image
        style={{height: 35,width: 35,resizeMode:'contain',}}
        source={getPhoto(this.props.item.picture)}
      />
    }
    return (
      <View style={{margin:5, marginTop:8}}>
        {this.removeButton(this.props)}
        <TouchableOpacity 
          background={TouchableNativeFeedback.Ripple(colors.todoColorAccent[global.darkMode], false)}
          onLongPress={() => {  
            this.setState({showRemove:!this.state.showRemove})
            getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(8) : "";
          }}
          onPress={()=>{
            this.props.checkOffItem(this.props.index, !this.state.checked); 
            this.setState({checked:!this.state.checked})
          }}
        >
          <View style={[styles.rowImageBackground,{borderWidth: 2, borderColor: this.state.checked ? colors.checkGreen[global.darkMode] : colors.eventBackground[global.darkMode], backgroundColor:colors.eventBackground[global.darkMode]}]}>
            {imageComp}
          </View>
        </TouchableOpacity>
        {this.props.item.title==="" ? <View/> : <TextFont translate={false} numberOfLines={2} bold={false} style={{width: 60, marginTop: 3, color: colors.textBlack[global.darkMode], fontSize: 12, textAlign:"center"}}>{this.props.item.title}</TextFont>}
      </View>
    )
  }
}

export class TodoItemEdit extends Component {
  constructor(){
    super()
    this.state={fadeRefresh:true}
  }
  removeButton = (props)=>{
    if(props.showEdit)
      return(<>
        <View style={{flexDirection:"row",left:-10, top:-5,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{padding:9}} 
            onPress={()=>{
              props.deleteItem(props.index); 
          }}>
            <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
      </>)
    else
      return(
        <View/>
      )
  }
  componentDidUpdate(prevProps){
    if(this.props.item.key!==prevProps.item.key){
      this.setState({fadeRefresh:false})
      setTimeout(() => {
        this.setState({fadeRefresh:true})
      }, 150);
    }
  }
  render(){
    if(this.props.item.picture === "breakerSeparator")
      return (
        <View style={{width: Dimensions.get('window').width-20*2}}>
          {this.removeButton(this.props)}
          <View style={{paddingVertical:0}}>
            <View style={{padding:5, paddingVertical:20, paddingBottom:0, paddingLeft:12}}>
              <TextFont translate={false} bold={true} numberOfLines={2} style={{fontSize:22, color:colors.fishText[global.darkMode]}}>{this.props.item.title}</TextFont>
            </View>
            <View style={{position:'absolute',zIndex:10, right:14, top: 17, flexDirection:"row",zIndex:10, alignItems:"center", justifyContent:"center"}}>
                <Image
                  style={{width:18,height:18,resizeMode:'contain', opacity:0.3}}
                  source={global.darkMode ? require("../assets/icons/menuIconWhite.png") : require("../assets/icons/menuIcon.png")}
                />
                <View style={{width:11}}/>
                <TouchableOpacity
                  onPress={()=>{
                    this.props.editTask(); 
                }}>
                  <Image source={require("../assets/icons/pencil.png")} style={{opacity:0.5,width:25, height:25, borderRadius:100,}}/>
                </TouchableOpacity>
            </View>
          </View>
        <View style={{height:2, borderRadius: 100, backgroundColor:colors.fishText[global.darkMode], marginBottom:4, marginHorizontal:-5}}/>
      </View>
    )
    var imageComp = <View/>
    if(this.props.item.picture && this.props.item.picture?.startsWith("http")){
      imageComp = <FastImage
        style={{height: 45,width: 45,resizeMode:'contain',}}
        source={{uri:this.props.item.picture}}
        cacheKey={this.props.item.picture}
      />
    } else {
      imageComp = <Image
        style={{height: 35,width: 35,resizeMode:'contain',}}
        source={getPhoto(this.props.item.picture)}
      />
    }
    return (
      <FadeInOut fadeIn={this.state.fadeRefresh} duration={150}>
        <View style={{width: Dimensions.get('window').width-20*2}}>
          {this.removeButton(this.props)}
            <View style={[styles.row,{backgroundColor:colors.eventBackground[global.darkMode]}]}>
              <View style={[styles.rowImageBackground,{backgroundColor:colors.lightDarkAccent[global.darkMode]}]}>
                {imageComp}
              </View>
              <View style={styles.rowTextTop}>
                <TextFont translate={false} bold={true} numberOfLines={2} style={{fontSize:20, color:colors.textBlack[global.darkMode]}}>{this.props.item.title}</TextFont>
              </View>
              <View style={{flexDirection:"row",zIndex:10, position:"absolute",right:14, alignItems:"center", justifyContent:"center"}}>
                <Image
                  style={{width:18,height:18,resizeMode:'contain', opacity:0.3}}
                  source={global.darkMode ? require("../assets/icons/menuIconWhite.png") : require("../assets/icons/menuIcon.png")}
                />
                <View style={{width:11}}/>
                <TouchableOpacity
                  onPress={()=>{
                    this.props.editTask(); 
                }}>
                  <Image source={require("../assets/icons/pencil.png")} style={{opacity:0.5,width:25, height:25, borderRadius:100,}}/>
                </TouchableOpacity>
              </View>
            </View>
        </View>
      </FadeInOut>
    )
  }
}


const styles = StyleSheet.create({
  rowTextTop:{
    paddingLeft: 4,
    paddingRight: 5,
    marginBottom: 2,
    marginRight: 125,
    marginLeft: 10,
  },
  rowImageBackground:{
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  rowImage:{
    height: 35,
    width: 35,
    resizeMode:'contain',
  },
  row: {
    padding: 13,
    alignItems: 'center',
    flexDirection:"row",
    height: 80,
    borderRadius:10,
    elevation: 0,
    marginTop: 7,
  },
})