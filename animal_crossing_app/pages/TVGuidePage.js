import React, {Component} from 'react';
import {Image, TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import {MailLink, ExternalLink, SubHeader, Header, Paragraph} from "../components/Formattings"
import TextFont from '../components/TextFont'
import colors from '../Colors.js';
import {attemptToTranslate} from "../LoadJsonData"
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default class TVGuidePage extends Component {
  constructor(props) {
    super(props);
  }
  openVillagerPopup = (item) => {
    this.villagerPopupPopup?.setPopupVisible(true, item);
  }
  
  
  render(){
    var timeRow = ["00:00", "00:57", "01:00", "02:45", "03:00", "03:34", "04:00", "05:00", "05:55", "06:00", "06:15", "06:59", "07:00", "07:29", 
      "07:30", "07:45", "07:59", "08:00", "08:29", "08:30", "08:59", "09:00", "09:18", "09:19", "09:20", 
      "09:29", "09:30", "09:59", "10:00", "10:29", "10:30", "10:59", "11:00", "11:29", "11:30", "11:45", "11:59", "12:00", "12:29", 
      "12:30", "12:59", "13:00", "13:29", "13:30", "13:58", "13:59", "14:00", "14:29", "14:30", "14:59", "15:00", "15:29", "15:30", 
      "15:50", "15:51", "15:59", "16:00", "16:29", "16:30", "16:59", "17:00", "17:29", "17:30", "17:58", "17:59", "18:00", "18:29", 
      "18:30", "18:45", "18:59", "19:00", "19:30", "19:50", "19:51", "19:57", "19:59", "20:00", "20:29", "20:30", "20:57", "20:58", "20:59", 
      "21:00", "21:29", "21:30", "21:53", "21:54", "21:55", "21:59", "22:00", "22:44", "22:45", "22:59", "23:00", "23:29", "23:30", "23:55"];
    var dayCol = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var televisionData = [
      ["variety show", "talk show", "documentary", "variety show", "variety show", "color bars", "music program"], 
      ["shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "—", "shopping commercial"], 
      ["documentary", "movie", "documentary", "sports", "documentary", "static", "documentary"], 
      ["shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "—", "color bars"], 
      ["color bars", "color bars", "color bars", "color bars", "color bars", "—", "—"], 
      ["—", "—", "—", "—", "—", "secret program", "—"], 
      ["—", "—", "—", "—", "—", "static", "—"], 
      ["static", "static", "static", "static", "static", "—", "static"], 
      ["color bars", "color bars", "color bars", "color bars", "color bars", "color bars", "color bars"], 
      ["snack commercial", "corporate commercial", "snack commercial", "snack commercial", "corporate commercial", "snack commercial", "corporate commercial"], 
      ["news", "news", "news", "news", "news", "news", "news"], 
      ["weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast"], 
      ["exercise", "exercise", "exercice", "exercise", "exercise", "exercise", "exercise"], 
      ["shopping commercial", "fruit commercial", "seasonal commercial", "shopping commercial", "fruit commercial", "seasonal commercial", "fruit commercial"], 
      ["news", "news", "news", "news", "news", "news", "kid's show"], 
      ["—", "—", "—", "—", "—", "—", "fruit commercial"], 
      ["—", "—", "—", "—", "—", "—", "kid's show"], 
      ["weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast", "—"], 
      ["shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "seasonal commercial", "snack commercial"], 
      ["drama", "drama", "drama", "drama", "drama", "variety show", "cartoon"], 
      ["shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "corporate commercial", "seasonal commercial"], 
      ["documentary", "documentary", "documentary", "documentary", "documentary", "variety show", "cartoon"], 
      ["—", "—", "—", "—", "—", "snack commercial", "snack commercial"], 
      ["—", "—", "—", "—", "—", "documentary", "quiz show"], 
      ["seasonal commercial", "seasonal commercial", "seasonal commercial", "seasonal commercial", "seasonal commercial", "—", "—"], 
      ["fruit commercial", "fruit commercial", "fruit commercial", "fruit commercial", "fruit commercial", "—", "—"], 
      ["documentary", "documentary", "documentary", "documentary", "documentary", "—", "—"], 
      ["—", "—", "—", "—", "—", "shopping commercial", "shopping commercial"], 
      ["—", "—", "—", "—", "—", "documentary", "quiz show"], 
      ["shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "snack commercial"], 
      ["kid's show", "cartoon", "kid's show", "kid's show", "cartoon", "kid's show", "variety show"], 
      ["fruit commercial", "fruit commercial", "snack commercial", "snack commercial", "snack commercial", "fruit commercial", "snack commercial"], 
      ["kid's show", "cartoon", "kid's show", "kid's show", "cartoon", "kid's show", "variety show"], 
      ["corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial"], 
      ["cooking show", "cooking show", "cooking show", "cooking show", "cooking show", "news", "news"], 
      ["fruit commercial", "seasonal commercial", "fruit commercial", "seasonal commercial", "fruit commercial", "—", "—"], 
      ["news", "news", "news", "news", "news", "—", "—"], 
      ["weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast"], 
      ["seasonal commercial", "shopping commercial", "seasonal commercial", "shopping commercial", "seasonal commercial", "shopping commercial", "shopping commercial"], 
      ["variety show", "variety show", "variety show", "variety show", "variety show", "variety show", "talk show"], 
      ["fruit commercial", "fruit commercial", "fruit commercial", "fruit commercial", "fruit commercial", "fruit commercial", "snack commercial"], 
      ["variety show", "variety show", "variety show", "variety show", "variety show", "variety show", "talk show"], 
      ["shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial"], 
      ["drama", "drama", "drama", "drama", "drama", "talk show", "sports"], 
      ["corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "—", "shopping commercial"], 
      ["talk show", "talk show", "talk show", "talk show", "drama", "—", "sports"], 
      ["fruit commercial", "—", "—", "—", "fruit commercial", "—", "—"], 
      ["snack commercial", "corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "—"], 
      ["variety show", "documentary", "variety show", "variety show", "talk show", "documentary", "—"], 
      ["fruit commercial", "seasonal commercial", "fruit commercial", "fruit commercial", "snack commercial", "snack commercial", "—"], 
      ["variety show", "documentary", "variety show", "variety show", "talk show", "documentary", "—"], 
      ["shopping commercial", "shopping commercial", "seasonal commercial", "shopping commercial", "seasonal commercial", "seasonal commercial", "seasonal commercial"], 
      ["exercise", "exercise", "exercise", "exercise", "exercise", "sports", "quiz show"], 
      ["corporate commercial", "snack commercial", "fruit commercial", "snack commercial", "fruit commercial", "—", "snack commercial"], 
      ["exercise", "exercise", "exercise", "exercise", "exercise", "—", "quiz show"], 
      ["—", "—", "—", "—", "—", "snack commercial", "—"], 
      ["—", "—", "—", "—", "—", "sports", "—"], 
      ["seasonal commercial", "seasonal commercial", "seasonal commercial", "seasonal commercial", "seasonal commercial", "—", "seasonal commercial"], 
      ["cartoon", "kid's show", "cartoon", "kid's show", "kid's show", "—", "cooking show"], 
      ["snack commercial", "snack commercial", "snack commercial", "corporate commercial", "snack commercial", "—", "snack commercial"], 
      ["cartoon", "cooking show", "cartoon", "kid's show", "kid's show", "—", "cooking show"], 
      ["corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "seasonal commercial", "fruit commercial"], 
      ["variety show", "variety show", "variety show", "variety show", "variety show", "variety show", "variety show"], 
      ["seasonal commercial", "snack commercial", "fruit commercial", "snack commercial", "snack commercial", "snack commercial", "seasonal commercial"], 
      ["variety show", "variety show", "variety show", "variety show", "variety show", "variety show", "variety show"], 
      ["—", "—", "—", "—", "fruit commercial", "—", "—"], 
      ["fruit commercial", "fruit commercial", "seasonal commercial", "fruit commercial", "seasonal commercial", "corporate commercial", "corporate commercial"], 
      ["news", "news", "news", "news", "news", "news", "cartoon"], 
      ["—", "—", "—", "—", "—", "—", "fruit commercial"], 
      ["weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast", "—", "cartoon"], 
      ["—", "—", "—", "—", "—", "weather forecast", "—"], 
      ["corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial", "corporate commercial"], 
      ["variety show", "sports", "cooking show", "cartoon", "sports", "quiz show", "sports"], 
      ["seasonal commercial", "—", "seasonal commercial", "seasonal commercial", "—", "seasonal commercial", "—"], 
      ["variety show", "—", "cooking show", "cartoon", "—", "quiz show", "—"], 
      ["—", "corporate commercial", "—", "—", "—", "—", "seasonal commercial"], 
      ["—", "sports", "—", "—", "—", "—", "sports"], 
      ["—", "—", "—", "—", "shopping commercial", "—", "—"], 
      ["snack commercial", "—", "snack commercial", "snack commercial", "—", "snack commercial", "—"], 
      ["quiz show", "—", "music program", "documentary", "sports", "variety show", "—"], 
      ["fruit commercial", "—", "seasonal commercial", "seasonal commercial", "—", "—", "—"], 
      ["quiz show", "—", "music program", "documentary", "—", "—", "—"], 
      ["fruit commercial", "fruit commercial", "snack commercial", "snack commercial", "corporate commercial", "fruit commercial", "corporate commercial"], 
      ["seasonal commercial", "shopping commercial", "corporate commercial", "corporate commercial", "snack commercial", "seasonal commercial", "snack commercial"], 
      ["corporate commercial", "seasonal commercial", "shopping commercial", "shopping commercial", "seasonal commercial", "snack commercial", "seasonal commercial"], 
      ["drama", "talk show", "drama", "drama", "music program", "movie", "movie"], 
      ["seasonal commercial", "corporate commercial", "seasonal commercial", "seasonal commercial", "corporate commercial", "—", "—"], 
      ["drama", "talk show", "drama", "drama", "music program", "—", "—"], 
      ["—", "—", "—", "—", "—", "—", "snack commercial"], 
      ["—", "—", "—", "—", "—", "corporate commercial", "corporate commercial"], 
      ["—", "—", "—", "—", "—", "movie", "movie"], 
      ["fruit commercial", "snack commercial", "snack commercial", "corporate commercial", "fruit commercial", "—", "—"], 
      ["news", "news", "news", "news", "news", "—", "—"], 
      ["—", "—", "—", "—", "—", "seasonal commercial", "snack commercial"], 
      ["weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast", "weather forecast"], 
      ["shopping commercial", "seasonal commercial", "shopping commercial", "seasonal commercial", "seasonal commercial", "—", "—"], 
      ["variety show", "documentary", "quiz show", "variety show", "quiz show", "news", "news"], 
      ["corporate commercial", "corporate commercial", "corporate commercial", "snack commercial", "fruit commercial", "shopping commercial", "—"], 
      ["variety show", "documentary", "quiz show", "variety show", "quiz show", "cooking show", "—"], 
      ["shopping commercial", "shopping commercial", "shopping commercial", "shopping commercial", "corporate commercial", "corporate commercial", "seasonal commercial"]
    ]
    return(
      <ScrollView>
        <View style={{marginTop: 100}}/>
        <Header>TV Guide</Header>
        <View style={{marginTop: 15}}/>
        <View style={{position:"absolute", marginTop: 161.7,height:100,flexDirection:"column"}}>
        <ContainerBox text={""} smallWidth background backgroundColor={colors.white[global.darkMode]}/>
          {dayCol.map((item)=>{
            return <ContainerBox text={attemptToTranslate(item)[0]} smallWidth background backgroundColor={colors.white[global.darkMode]}/>
          })}
        </View>
        <ScrollView horizontal>
          <View style={{alignContent:"flex-start", height:100,flexDirection:"column"}}>
          <ContainerBox text={""} backgroundColor={colors.white[global.darkMode]}/>
            {dayCol.map((item)=>{
              return <ContainerBox text={item}/>
            })}
          </View>
            <View style={{height:700,alignContent:"flex-start", flexDirection:"row"}}>
              {televisionData.map((item, index)=>{
                return <View style={{alignContent:"flex-start", height:100,flexDirection:"column"}}>
                  <ContainerBox text={timeRow[index]} backgroundColor={colors.white[global.darkMode]}/>
                  {televisionData[index].map((item)=>{
                    return <ContainerBox text={item}/>
                  })}
                </View>
              })}
            </View>
          </ScrollView>
      </ScrollView>
    );
  }
}

class ContainerBox extends Component { 
  render(){
    var highlight=["news","weather forecast"]
    return <View style={{padding:this.props.smallWidth?0:10,width:this.props.smallWidth?17:130, height:60, alignItems:"center", justifyContent:"center", zIndex: this.props.background?5:0,backgroundColor: this.props.backgroundColor!=undefined?this.props.backgroundColor:(highlight.includes(this.props.text)?colors.selectedText[global.darkMode]:"#00000000"), borderBottomColor: colors.lightDarkAccentHeavy[global.darkMode],borderBottomWidth: 2,}}><TextFont style={{fontSize:18, textAlign:"center"}}>{this.props.text}</TextFont></View>
  }
}