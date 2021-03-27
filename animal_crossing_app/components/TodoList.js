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
import {getSettingsString, attemptToTranslate} from "../LoadJsonData"
import DropDownPicker from 'react-native-dropdown-picker'
import FastImage from "./FastImage"

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      showTurnipLog: false,
      showEdit: false,
    }
  }

  componentDidMount(){
    this.mounted=true;
    this.loadList();
  }

  componentWillUnmount(){
    this.mounted=false;
  }

  loadList = async() => {
    var defaultList = [
      {title: attemptToTranslate('Rock') + " 1", finished: false, picture:"rock.png",small:true},
      {title: attemptToTranslate('Rock') + " 2", finished: false, picture:"rock.png",small:true},
      {title: attemptToTranslate('Rock') + " 3", finished: false, picture:"rock.png",small:true},
      {title: attemptToTranslate('Rock') + " 4", finished: false, picture:"rock.png",small:true},
      {title: attemptToTranslate('Rock') + " 5", finished: false, picture:"rock.png",small:true},
      {title: attemptToTranslate('Rock') + " 6", finished: false, picture:"rock.png",small:true},
      {title: attemptToTranslate('Turnip Prices'), finished: false, picture:"turnip.png", small:true},
      {title: attemptToTranslate('Turnip Prices'), finished: false, picture:"turnip.png", small:true},
      {title: attemptToTranslate('Water Flowers'), finished: false, picture:"flower.png"},
      {title: attemptToTranslate('Talk To Villagers'), finished: false, picture:"cat.png"},
      {title: attemptToTranslate('Dig Fossils'), finished: false, picture:"digIcon.png"},
    ]
    var storageData = JSON.parse(await getStorage("ToDoList",JSON.stringify(defaultList)));
    var storageShowTurnipLog = await getStorage("TurnipListShow","true") === "true";
    if(this.mounted){
      this.setState({data:storageData, showTurnipLog: storageShowTurnipLog});
    }
    this.props.setLoadedToDo(true);
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("ToDoList", JSON.stringify(data));
    console.log(data)
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

  deleteItem = (index) => {
    const newTaskList = this.state.data.filter((item,i) => i!=index);
    this.setState({data:newTaskList});
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.saveList(newTaskList);
  }

  componentWillUnmount(){
  }

  addItemPopup = (open) => {
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.popupAddTask.setPopupVisible(true);
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
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([30,30,30,30,30,30]) : "";
    this.saveList(currentData);
  }

  toggleTurnipLog = async () => {
    var currentTurnipLog = this.state.showTurnipLog;
    this.setState({showTurnipLog:!currentTurnipLog});
    var currentTurnipLogString = !currentTurnipLog ? "true" : "false"
    await AsyncStorage.setItem("TurnipListShow", currentTurnipLogString);
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(20) : "";
  }

  render(){
    var turnipLog = <View/>;
    if(this.state.showTurnipLog===true){
      turnipLog = <TurnipLog/>;
    }
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
            this.setState({showEdit:!this.state.showEdit});
            getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
        }}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{this.state.showEdit ? "Disable Edit List" : "Edit List"}</TextFont>
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
        {this.state.data.map( (item, index)=>{
          if(!item.small){
            return(
              <TodoItem
                key={item+index.toString()}
                item={item}
                index={index}
                checkOffItem={this.checkOffItem}
                deleteItem={this.deleteItem}
                showEdit={this.state.showEdit}
              />
            )
          }
        })}
        <View style={{paddingTop:10, marginHorizontal: 20, flex: 1, flexDirection: 'row', justifyContent:'center',flexWrap:"wrap"}}>
          {this.state.data.map( (item, index)=>{
            if(item.small){
              return(
                <TodoItemSmall
                  key={item+index.toString()}
                  item={item}
                  index={index}
                  checkOffItem={this.checkOffItem}
                  deleteItem={this.deleteItem}
                  showEdit={this.state.showEdit}
                />
              )
            }
          })}
        </View>
        {turnipLog}
      </View>
      <TouchableOpacity style={{padding:10}} 
        onPress={()=>{
          this.toggleTurnipLog(); 
      }}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{this.state.showTurnipLog ? "Hide Turnip Log" : "Show Turnip Log"}</TextFont>
      </TouchableOpacity>
      <PopupAddTask ref={(popupAddTask) => this.popupAddTask = popupAddTask} addItem={this.addItem}/>
    </>
  }
}
export default TodoList;

class TurnipLog extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      lastPattern:"-1",
      firstTime: "false",
    }
    this.loadList();
    this.turnipLink = "https://turnipprophet.io/";
  }

  loadList = async() => {
    var defaultList = [
      {title: 'Purchase', purchase: ""},
      {title: 'Monday', am: "", pm:""},
      {title: 'Tuesday', am: "", pm:""},
      {title: 'Wednesday', am: "", pm:""},
      {title: 'Thursday', am: "", pm:""},
      {title: 'Friday', am: "", pm:""},
      {title: 'Saturday', am: "", pm:""},
    ]
    var storageData = JSON.parse(await getStorage("TurnipList",JSON.stringify(defaultList)));
    var storageLastPattern = await getStorage("TurnipListLastPattern","-1");
    var storageFirstTime = await getStorage("TurnipListFirstTime","false");
    this.setState({data:storageData, lastPattern: storageLastPattern, firstTime: storageFirstTime});
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("TurnipList", JSON.stringify(data));
  }

  updateItem = (item, index) => {
    var currentData = this.state.data;
    currentData[index] = item;
    console.log(item);
    this.setState({data: currentData});
    this.saveList(currentData);
  }

  getTurnipLink = () => {
    this.turnipLink = "https://turnipprophet.io/?prices="
    for(var i = 0; i<this.state.data.length; i++){
      if(i===0){
        this.turnipLink += this.state.data[0].purchase;
      }else{
        this.turnipLink += this.state.data[i].am;
        this.turnipLink += ".";
        this.turnipLink += this.state.data[i].pm;
      }
      if(i!==this.state.data.length){
        this.turnipLink += ".";
      }
    }
    this.turnipLink += "&first="+this.state.firstTime;
    this.turnipLink += "&pattern="+this.state.lastPattern;
  }

  render(){
    var turnipLink = this.getTurnipLink();
    return (
      <View style={{width: "90%", marginTop: 20}}>
        <TextFont bold={true} numberOfLines={2} style={{marginBottom: 10, fontSize:23, color:colors.textBlack[global.darkMode]}}>{capitalize("Turnip Log")}</TextFont>
        <DropDownPicker
          items={[
            {label: attemptToTranslate("Last week's pattern") + ": " + attemptToTranslate("Unknown"), value: "-1",},
            {label: attemptToTranslate("Last week's pattern") + ": " + attemptToTranslate("Fluctuating"), value: "0",},
            {label: attemptToTranslate("Last week's pattern") + ": " + attemptToTranslate("Small spike"), value: "3",},
            {label: attemptToTranslate("Last week's pattern") + ": " + attemptToTranslate("Large spike"), value: "1",},
            {label: attemptToTranslate("Last week's pattern") + ": " + attemptToTranslate("Decreasing"), value: "2",},
          ]}
          defaultValue={this.state.lastPattern}
          placeholder={attemptToTranslate("Last week's pattern")}
          dropDownMaxHeight={300}
          containerStyle={{height: 45}}
          style={[{width: "100%", borderWidth: 0, backgroundColor: colors.lightDarkAccentHeavyBackground[global.darkMode], borderTopLeftRadius: 8, borderTopRightRadius: 8,borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          labelStyle={{fontFamily: "ArialRoundedBold", fontSize: 15, marginLeft:10, color:colors.textBlack[global.darkMode]}}
          customTickIcon={()=><View/>}
          activeItemStyle={{borderRadius: 10, backgroundColor: colors.lightDarkAccentHeavy[global.darkMode]}}
          dropDownStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 0, backgroundColor: colors.lightDarkAccent2[global.darkMode], opacity: 0.98, }}
          onChangeItem={async (item) => {this.setState({lastPattern:item.value}); await AsyncStorage.setItem("TurnipListLastPattern", item.value);}}
        />
        <View style={{height:5}}/>
        <DropDownPicker
          items={[
            {label: attemptToTranslate("First time buyer?") + ": " + attemptToTranslate("Yes"), value: "true",},
            {label: attemptToTranslate("First time buyer?") + ": " + attemptToTranslate("No"), value: "false",},
          ]}
          defaultValue={this.state.firstTime}
          placeholder={attemptToTranslate("First time buyer?")}
          dropDownMaxHeight={300}
          containerStyle={{height: 45}}
          style={[{width: "100%", borderWidth: 0, backgroundColor: colors.lightDarkAccentHeavyBackground[global.darkMode], borderTopLeftRadius: 8, borderTopRightRadius: 8,borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          labelStyle={{fontFamily: "ArialRoundedBold", fontSize: 15, marginLeft:10, color:colors.textBlack[global.darkMode]}}
          customTickIcon={()=><View/>}
          activeItemStyle={{borderRadius: 10, backgroundColor: colors.lightDarkAccentHeavy[global.darkMode]}}
          dropDownStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 0, backgroundColor: colors.lightDarkAccent2[global.darkMode], opacity: 0.98, }}
          onChangeItem={async (item) => {this.setState({firstTime:item.value}); await AsyncStorage.setItem("TurnipListFirstTime", item.value);}}
        />

        {this.state.data.map( (item, index)=>
          <TurnipItem
            key={item.title+index.toString()}
            item={item}
            updateItem={this.updateItem}
            index={index}
          />
        )}
        <TouchableOpacity style={{margin:10, backgroundColor:colors.eventBackground[global.darkMode], padding: 10, borderRadius: 10}} 
          onPress={()=>{
            Linking.openURL(
              this.turnipLink,
            );
        }}>
          <TextFont bold={true} style={{color: colors.fishText[global.darkMode], fontSize: 18, textAlign:"center"}}>{"View on turnipprophet.io"}</TextFont>
        </TouchableOpacity>
      </View>
    )
  }
}

class TurnipItem extends Component {
  render(){
    if(this.props.item.purchase!==undefined){
      var item = {title: this.props.item.title, purchase: this.props.item.purchase,};
      return(
        <View style={[styles.row,{paddingLeft: 20, height: 70, backgroundColor:colors.eventBackground[global.darkMode]}]}>
          <TextFont bold={true} numberOfLines={2} style={{width:"45%", fontSize:17, color:colors.textBlack[global.darkMode]}}>{capitalize(this.props.item.title)}</TextFont>
          <TextInput
            allowFontScaling={false}
            keyboardType={"numeric"}
            style={{textAlign:"center", fontSize: 17, width:"55%", color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 6, borderRadius: 5}}
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
        <View style={[styles.row,{paddingLeft: 20, height: 70, backgroundColor:colors.eventBackground[global.darkMode]}]}>
          <TextFont bold={true} numberOfLines={2} style={{width:"45%", fontSize:17, color:colors.textBlack[global.darkMode]}}>{capitalize(this.props.item.title)}</TextFont>
          <TextInput
            allowFontScaling={false}
            keyboardType={"numeric"}
            style={{textAlign:"center", fontSize: 17, width:"25%", color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 6, borderRadius: 5}}
            onChangeText={(text) => {item.am = text; this.props.updateItem(item,this.props.index)}}
            placeholder={attemptToTranslate("AM")}
            defaultValue={this.props.item.am}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            multiline={true}
          />
          <View style={{width:"5%"}}/>
          <TextInput
            allowFontScaling={false}
            keyboardType={"numeric"}
            style={{textAlign:"center", fontSize: 17, width:"25%", color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 6, borderRadius: 5}}
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
  removeButton = (props)=>{
    if(props.showEdit)
      return(
        <TouchableOpacity style={{left:-10, top:-5,position:'absolute',zIndex:10, padding:10}} 
          onPress={()=>{
            props.deleteItem(props.index); 
        }}>
          <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
        </TouchableOpacity>
      )
    else
      return(
        <View/>
      )
  }
  render(){
    var imageComp = <View/>
    if(this.props.item.picture.startsWith("http")){
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
      <View style={{width: "90%"}}>
      
          {this.removeButton(this.props)}
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
                {imageComp}
              </View>
              <View style={styles.rowTextTop}>
                <TextFont translate={false} bold={true} numberOfLines={2} style={{fontSize:20, color:colors.textBlack[global.darkMode]}}>{capitalize(this.props.item.title)}</TextFont>
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

class TodoItemSmall extends Component {
  removeButton = (props)=>{
    if(props.showEdit)
      return(
        <TouchableOpacity style={{left:-10, top:-5,position:'absolute',zIndex:10, padding:10}} 
          onPress={()=>{
            props.deleteItem(props.index); 
        }}>
          <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
        </TouchableOpacity>
      )
    else
      return(
        <View/>
      )
  }
  render(){
    var imageComp = <View/>
    if(this.props.item.picture.startsWith("http")){
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
      <View style={{margin:5}}>
        {this.removeButton(this.props)}
        <TouchableOpacity 
          background={TouchableNativeFeedback.Ripple(colors.todoColorAccent[global.darkMode], false)}
          onLongPress={() => {  
            this.props.checkOffItem(this.props.index); 
          }}
          onPress={()=>{
            this.props.checkOffItem(this.props.index); 
          }}
        >
          <View style={[styles.rowImageBackground,{borderWidth: 2, borderColor: this.props.item.finished ? colors.checkGreen[global.darkMode] : colors.eventBackground[global.darkMode], backgroundColor:colors.eventBackground[global.darkMode]}]}>
            {imageComp}
          </View>
        </TouchableOpacity>
        {this.props.item.title==="" ? <View/> : <TextFont translate={false} numberOfLines={2} bold={false} style={{width: 60, marginTop: 3, color: colors.textBlack[global.darkMode], fontSize: 12, textAlign:"center"}}>{this.props.item.title}</TextFont>}
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