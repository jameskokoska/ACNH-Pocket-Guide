import React, {Component} from 'react';
import {Linking, TextInput, Vibration,TouchableNativeFeedback,TouchableOpacity,StyleSheet, Text, View, Image} from 'react-native';
import TextFont from './TextFont';
import {getCurrentDateObject, getMonth, getWeekDayShort} from './DateFunctions';
import {getStorage, checkOff, capitalize, commas, removeBrackets} from "../LoadJsonData"
import {getPhoto} from "./GetPhoto"
import Check from './Check';
import colors from '../Colors'
import PopupAddTask from "./PopupAddTask"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSettingsString} from "../LoadJsonData"
import DropDownPicker from 'react-native-dropdown-picker'

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
    this.loadList();
  }

  loadList = async() => {
    var defaultList = [
      {day: '', title: "Saharah", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/cml.png"},
      {day: '', title: "Leif", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/slo.png"},
      {day: '', title: "Kicks", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/skk.png"},
      {day: '', title: "Whisp", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/skk.png"},
      {day: '', title: "Celeste", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/ows.png"},
      {day: '', title: "Redd", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/fox.png"},
      {day: '', title: "Label", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/hgc.png"},
      {day: '', title: "C.J.", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/fox.png"},
      {day: '', title: "Flick", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/fox.png"},
      {day: '', title: "Gulliver", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/gul.png"},
      {day: '', title: "Gullivarrr", finished: false, picture:"https://acnhcdn.com/latest/NpcIcon/gul.png"},
    ]
    var storageData = JSON.parse(await getStorage("ToDoList",JSON.stringify(defaultList)));
    storageData = defaultList;
    var storageShowTurnipLog = await getStorage("TurnipListShow","true") === "true";
    this.setState({data:storageData, showTurnipLog: storageShowTurnipLog});
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("ToDoList", JSON.stringify(data));
  }

  checkOffItem = (index) => {
    const newTaskList=this.state.data;
    newTaskList[index].finished = !this.state.data[index].finished;
    this.setState({data:newTaskList})
    if(newTaskList[index].finished!==false){
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10,220,20]) : "";
    } else {
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    }
    this.saveList(newTaskList);
  }


  componentWillUnmount(){
  }

  addItemPopup = (open) => {
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.popupAddTask.setPopupVisible(true);
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

  render(){
    return <>
      <View style={{alignItems:"center",flexDirection:"row", right:0, top:0,position:'absolute',zIndex:10}}>
        <TouchableOpacity style={{padding:12, marginRight: 10}} 
          onPress={()=>{
            this.uncheckAll(); 
        }}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"View last week"}</TextFont>
        </TouchableOpacity>
      </View>
      <View style={{height:10}}/>
      <View style={{marginHorizontal: 20, flex: 1, flexDirection: 'row', justifyContent:'space-evenly',flexWrap:"wrap"}}>
        {this.state.data.map( (item, index)=>
          <TodoItem
            key={item+index.toString()}
            item={item}
            index={index}
            checkOffItem={this.checkOffItem}
          />
        )}
      </View>
      <PopupAddTask ref={(popupAddTask) => this.popupAddTask = popupAddTask} addItem={this.addItem}/>
    </>
  }
}
export default TodoList;


class TodoItem extends Component {
  render(){
    return (
      <View style={{margin:5}}>
        <TouchableNativeFeedback onLongPress={() => {  
          this.props.checkOffItem(this.props.index); 
        }}
        background={TouchableNativeFeedback.Ripple(colors.todoColorAccent[global.darkMode], false)}
        onPress={()=>{
              this.props.checkOffItem(this.props.index); 
        }}
        >
          <View style={[styles.rowImageBackground,{backgroundColor:colors.eventBackground[global.darkMode]}]}>
            <Image
              style={styles.rowImage}
              source={{uri: this.props.item.picture}}
            />
          </View>
        </TouchableNativeFeedback>
        {this.props.item.day==="" ? <View/> : <TextFont numberOfLines={2} bold={false} style={{width: 60, marginTop: 3, color: colors.textBlack[global.darkMode], fontSize: 12, textAlign:"center"}}>{this.props.item.day}</TextFont>}
      </View>
    )
  }
}


const styles = StyleSheet.create({
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
    alignItems: 'center',
    elevation: 0,
  },
})