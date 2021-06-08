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
import {SelectionText} from "./Selections"
import {PopupInfoCustom} from "./Popup"
import {getWeekDay, getMonday, getDateStringMonthDay} from "./DateFunctions"
import FastImage from "./FastImage"
import {SubHeader} from "./Formattings"
import ButtonComponent from "./ButtonComponent";
import GuideRedirectButton from "./PopupGuideRedirectButton"

export default class VisitorList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
    }
    this.characterList = [
      {name: "Saharah", picture:"https://acnhcdn.com/latest/NpcIcon/cml.png"},
      {name: "Leif", picture:"https://acnhcdn.com/latest/NpcIcon/slo.png"},
      {name: "Kicks", picture:"https://acnhcdn.com/latest/NpcIcon/skk.png"},
      {name: "Whisp", picture:require("../assets/icons/whisp.png")},
      {name: "Celeste", picture:"https://acnhcdn.com/latest/NpcIcon/ows.png"},
      {name: "Redd", picture:"https://acnhcdn.com/latest/NpcIcon/fox.png"},
      {name: "Label", picture:"https://acnhcdn.com/latest/NpcIcon/hgc.png"},
      {name: "C.J.", picture:require("../assets/icons/cj.png")},
      {name: "Flick", picture:require("../assets/icons/flick.png")},
      {name: "Gulliver", picture:"https://acnhcdn.com/latest/NpcIcon/gul.png"},
      {name: "Gullivarrr", picture:require("../assets/icons/gulivarrr.png")},
    ]
    this.days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday', 'None'];
    this.currentMondayIndex = getMonday().toISOString().split('T')[0];
    this.lastMondayIndex = getMonday(2).toISOString().split('T')[0];
  }

  componentDidMount(){
    this.loadList();
  }

  loadList = async() => {
    var storageData = JSON.parse(await getStorage("VisitorsList"+global.profile,JSON.stringify({})));
    this.setState({data:storageData});
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("VisitorsList"+global.profile, JSON.stringify(data));
  }

  clearHistory = () => {
    if(this.state.data[this.currentMondayIndex]!==undefined){
      var data = {};
      data[this.currentMondayIndex] = this.state.data[this.currentMondayIndex];
      this.saveList(data);
      this.setState({data:data})
    } else {
      var data = {};
      this.saveList(data);
      this.setState({data:data})
    }
    
  }

  componentWillUnmount(){
  }

  saveCharacter = (day, character) => {
    var entry = {};
    entry[character] = day;
    var data = this.state.data;
    data[this.currentMondayIndex] = {...data[getMonday().toISOString().split('T')[0]],...entry};
    this.saveList(data);
    this.setState({data:data})
  }

  render(){
    const extraInfo= {
      type:"guideRedirect",
      title:"Guide + FAQ",
      content:"You can read more details about NPC Visitors by visiting the guide page. The time icon shows that the NPC has visited last week.",
      linkText: "Tap here to read more about NPC Visitors",
      redirectPassBack: "npcVisitorsRedirect"
    }

    var buttonsHistory = <>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <ButtonComponent
          text={"Clear History"}
          color={colors.cancelButton[global.darkMode]}
          vibrate={8}
          onPress={() => {
            this.clearHistory();
            this.popupHistory?.setPopupVisible(false);
          }}
        /> 
        <ButtonComponent
          text={"Done"}
          color={colors.okButton[global.darkMode]}
          vibrate={15}
          onPress={() => {
            this.popupHistory?.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    return <>
      <View style={{alignItems:"center",flexDirection:"row", right:0, top:0,position:'absolute',zIndex:10}}>
        <TouchableOpacity style={{padding:5, marginRight: 0}} 
          onPress={()=>{
            this.popupHistory?.setPopupVisible(true);
            getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10]) : "";
        }}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"View History"}</TextFont>
        </TouchableOpacity>
        <GuideRedirectButton icon={"i"} style={{padding:12}} extraInfo={extraInfo} setPage={this.props.setPage}/>
      </View>
      <View style={{height:10}}/>
      <View style={{marginHorizontal: 20, flex: 1, flexDirection: 'row', justifyContent:'space-evenly',flexWrap:"wrap"}}>
        {this.characterList.map( (character, index)=>
          <CharacterItem
            key={character.name+index.toString()}
            character={character}
            setVisited={this.setVisited}
            onTap={(day)=>{this.setState({selectedCharacter:character.name, selectedDay:day}); this.popup?.setPopupVisible(true); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}
            day={this.state.data[this.currentMondayIndex]!==undefined?this.state.data[this.currentMondayIndex][character.name]:""}
            lastWeek={this.state.data[this.lastMondayIndex]}
          />
        )}
      </View>
      <PopupInfoCustom onClose={()=>{this.saveCharacter(this.state.selectedDay, this.state.selectedCharacter)}} ref={(popup) => this.popup = popup} buttonDisabled={false} buttonText={"OK"} header={<TextFont bold={true} style={{fontSize: 28, marginBottom:11, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Select Date</TextFont>}>
        <SelectionText
          selectedText={this.state.selectedDay} 
          text={this.days}
          onSelected={(text)=>{this.setState({selectedDay:text})}}
          canDeselect={false}
        />
      </PopupInfoCustom>
      <PopupInfoCustom buttons={buttonsHistory} ref={(popupHistory) => this.popupHistory = popupHistory} buttonDisabled={true} buttonText={"OK"} header={<TextFont bold={true} style={{fontSize: 28, marginBottom:11, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Visitor History</TextFont>}>
        {Object.keys(this.state.data).map( (date, index)=>{
          if(date!==this.currentMondayIndex){
            return(
              <View key={date}>
                <SubHeader margin={false}>{getDateStringMonthDay(date)}</SubHeader>
                <View style={{marginBottom:10, flex: 1, flexDirection: 'row', flexWrap:"wrap"}}>
                  {this.characterList.map( (character, index)=>
                    <CharacterItem
                      key={character.name+index.toString()}
                      character={character}
                      setVisited={this.setVisited}
                      onTap={()=>{}}
                      day={this.state.data[date]!==undefined?this.state.data[date][character.name]:""}
                      onlyShowVisited={true}
                    />
                  )}
                </View>
              </View>
            )
          } else if (Object.keys(this.state.data).length===1){
            return <TextFont key={date} bold={false} style={{color: colors.textBlack[global.darkMode], fontSize: 16, textAlign:"center"}}>No history yet, waiting for the week to end.</TextFont>
          } else {
            return <View key={date}/>
          }
        })}
      </PopupInfoCustom>
    </>
  }
}

class CharacterItem extends Component {
  render(){
    var dayDisplay = this.props.day;
    if(this.props.day===undefined||this.props.day===""||this.props.day==="None"){
      dayDisplay = ""
      if(this.props.onlyShowVisited){
        return <View/>
      }
    }
    var imageComponent = <View/>
    if(this.props.character.picture.constructor === String && this.props.character.picture.startsWith("http")){
      imageComponent = <FastImage
        source={{uri: this.props.character.picture}}
        cacheKey={this.props.character.picture}
        style={styles.rowImage}
      />
    }else{
      imageComponent = <Image
        style={styles.rowImage}
        source={this.props.character.picture}
      />
    }
    var dayPassBack;
    if(dayDisplay===""){
      dayPassBack = getWeekDay(getCurrentDateObject().getDay())
    } else {
      dayPassBack = this.props.day
    }
    var lastWeek = false;
    var imageLastWeek = <View/>
    if(this.props.lastWeek!==undefined){
      const lastWeekNPC = Object.keys(this.props.lastWeek);
      for(var i=0; i<lastWeekNPC.length; i++){
        if(lastWeekNPC[i]===this.props.character.name){
          lastWeek=true
        }
      }
      if(lastWeek){
        imageLastWeek = <Image style={{width:20, height:20, position:"absolute", left:0, top:0, zIndex:1}} source={require("../assets/icons/repeat.png")}/>
      }
    }
    return (
      <View style={{margin:7, alignItems:"center", justifyContent:"center"}}>
        <TouchableOpacity onLongPress={() => {this.props.onTap(dayPassBack);}} onPress={()=>{this.props.onTap(dayPassBack)}}>
          <View style={[styles.rowImageBackground,{backgroundColor:colors.eventBackground[global.darkMode]}]}>
            {imageLastWeek}
            {imageComponent}
          </View>
        </TouchableOpacity>
        {<TextFont numberOfLines={2} bold={false} style={{width: 60, marginTop: 3, color: colors.textBlack[global.darkMode], fontSize: 12, textAlign:"center"}}>{dayDisplay}</TextFont>}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  rowImageBackground:{
    width: 70,
    height: 70,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  rowImage:{
    height: 55,
    width: 55,
    resizeMode:'contain',
  },
  row: {
    alignItems: 'center',
    elevation: 0,
  },
})