import React, {Component} from 'react';
import {TextInput, Vibration,TouchableNativeFeedback,TouchableOpacity,StyleSheet, Text, View, Image} from 'react-native';
import TextFont from './TextFont';
import {getCurrentDateObject, getMonth, getWeekDayShort} from './DateFunctions';
import {getStorage, checkOff, capitalize, commas, removeBrackets} from "../LoadJsonData"
import {getPhoto} from "./GetPhoto"
import Check from './Check';
import colors from '../Colors'
import PopupAddTask from "./PopupAddTask"
import AsyncStorage from '@react-native-async-storage/async-storage';

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      open: false,
    }
    this.loadList();
  }

  loadList = async() => {
    var defaultList = [
      {title: 'Smash rocks', finished: false, picture:"rock.png"},
      {title: 'Check turnip prices', finished: false, picture:"turnip.png"},
      {title: 'Water flowers', finished: false, picture:"flowerIcon.png"},
      {title: 'Talk to villagers', finished: false, picture:"cat.png"},
      {title: 'Dig fossils', finished: false, picture:"digIcon.png"},
    ]
    var storageData = JSON.parse(await getStorage("ToDoList",JSON.stringify(defaultList)));
    this.setState({data:storageData});
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("ToDoList", JSON.stringify(data));
  }

  checkOffItem = (index) => {
    const newTaskList=this.state.data;
    newTaskList[index].finished = !this.state.data[index].finished;
    this.setState({data:newTaskList})
    if(newTaskList[index].finished!==false){
      global.settingsCurrent[9].currentValue==="true" ? Vibration.vibrate([0,10,220,20]) : "";
    } else {
      global.settingsCurrent[9].currentValue==="true" ? Vibration.vibrate(10) : "";
    }
    this.saveList(newTaskList);
  }

  deleteItem = (index) => {
    const newTaskList = this.state.data.filter((item,i) => i!=index);
    this.setState({data:newTaskList});
    global.settingsCurrent[9].currentValue==="true" ? Vibration.vibrate(10) : "";
    this.saveList(newTaskList);
  }

  componentWillUnmount(){
  }

  addItemPopup = (open) => {
    global.settingsCurrent[9].currentValue==="true" ? Vibration.vibrate(10) : "";
    this.setState({open:open})
  }

  addItem = (item) => {
    var addedTask = this.state.data;
    addedTask.push(item);
    this.setState({data: addedTask});
    this.saveList(addedTask);
  }

  uncheckAll = () => {
    var currentData = this.state.data;
    for(var i = 0; i<currentData.length; i++){
      currentData[i].finished=false;
    }
    this.setState({data:currentData});
    global.settingsCurrent[9].currentValue==="true" ? Vibration.vibrate([30,30,30,30,30,30]) : "";
    this.saveList(currentData);
  }

  render(){
    return <>
      <View style={{alignItems:"center",flexDirection:"row", right:0, top:0,position:'absolute',zIndex:10}}>
        <TouchableOpacity style={{padding:10}} 
          onPress={()=>{
            this.uncheckAll(); 
        }}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"Uncheck All"}</TextFont>
        </TouchableOpacity>
        <TouchableOpacity style={{padding:10}} 
          onPress={()=>{
            this.addItemPopup(true); 
        }}>
          <Image source={require("../assets/icons/addIcon.png")} style={{width:25, height:25, borderRadius:100,}}/>
        </TouchableOpacity>
      </View>
      <View style={{height:10}}/>
      <View style={{alignItems: 'center'}}>
        {this.state.data.map( (item, index)=>
              <TodoItem
                key={item+index.toString()}
                item={item}
                index={index}
                checkOffItem={this.checkOffItem}
                deleteItem={this.deleteItem}
              />
            )}
      </View>
      <PopupAddTask addItem={this.addItem} addItemPopup={this.addItemPopup} popupVisible={this.state.open}/>
    </>
  }
}
export default TodoList;

class TodoItem extends Component {
  render(){
    return (
      <View style={{width: "90%"}}>
        <TouchableOpacity style={{left:-10, top:-5,position:'absolute',zIndex:10, padding:10}} 
          onPress={()=>{
            this.props.deleteItem(this.props.index); 
        }}>
          <Image source={require("../assets/icons/deleteIcon.png")} style={{width:15, height:15, borderRadius:100,}}/>
        </TouchableOpacity>
          <TouchableNativeFeedback onLongPress={() => {  
            this.props.checkOffItem(this.props.index); 
          }}
          background={TouchableNativeFeedback.Ripple(colors.todoColorAccent[global.darkMode], false)}
          onPress={()=>{
                this.props.checkOffItem(this.props.index); 
          }}
          >
            <View style={[styles.row,{backgroundColor:colors.eventBackground[global.darkMode]}]}>
              <View style={[styles.rowImageBackground,{backgroundColor:colors.lightDarkAccent[global.darkMode]}]}>
                <Image
                  style={styles.rowImage}
                  source={getPhoto(this.props.item.picture)}
                />
              </View>
              <View style={styles.rowTextTop}>
                <TextFont bold={true} numberOfLines={2} style={{fontSize:20, color:colors.textBlack[global.darkMode]}}>{capitalize(this.props.item.title)}</TextFont>
              </View>
              <TouchableOpacity style={{position:"absolute", right: -5}} 
                activeOpacity={0.6}
                onPress={() => {  
                this.props.checkOffItem(this.props.index); 
              }}>
                <Check checkType={this.props.checkType} fadeOut={false} play={this.props.item.finished} width={90} height={90} disablePopup={true}/>
              </TouchableOpacity>
            </View>
          </TouchableNativeFeedback>
        </View>
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