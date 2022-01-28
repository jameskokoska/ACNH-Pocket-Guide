import React, {Component} from 'react';
import {Image, TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import {MailLink, ExternalLink, SubHeader, Header, Paragraph} from "../components/Formattings"
import TextFont from '../components/TextFont'
import colors from '../Colors.js';
import {attemptToTranslate, capitalize, capitalizeFirst, getSettingsString} from "../LoadJsonData"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { getCurrentDateObject, getWeekDay } from '../components/DateFunctions';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{ backgroundColor: colors.white[global.darkMode]}}
    activeColor={colors.textBlack[global.darkMode]}
    inactiveColor={colors.textBlack[global.darkMode]}
    getLabelText={({ route }) => route.title}
    scrollEnabled
    tabStyle={{width:110}}
    renderLabel={({ route, focused, color }) => (
      <TextFont style={{ color, textAlign:"center", fontSize: 13}}>
        {route.title}
      </TextFont>
    )}
  />
);

export default class TVGuidePage extends Component {
  constructor() {
    super();
    this.state = {
      index: (getCurrentDateObject().getDay() >= 0 || getCurrentDateObject().getDay() <=6) ? getCurrentDateObject().getDay() : 0,
      routes: [
        { key: 'Sunday', title: attemptToTranslate('Sunday') },
        { key: 'Monday', title: attemptToTranslate('Monday') },
        { key: 'Tuesday', title: attemptToTranslate('Tuesday') },
        { key: 'Wednesday', title: attemptToTranslate('Wednesday') },
        { key: 'Thursday', title: attemptToTranslate('Thursday') },
        { key: 'Friday', title: attemptToTranslate('Friday') },
        { key: 'Saturday', title: attemptToTranslate('Saturday') },
      ],
    }
  }


  MondayRoute = () => (
    <SpecificTVPage dayIndex={0} actualDay={1}/>
  )
  TuesdayRoute = () => (
    <SpecificTVPage dayIndex={1} actualDay={2}/>
  )
  WednesdayRoute = () => (
    <SpecificTVPage dayIndex={2} actualDay={3}/>
  )
  ThursdayRoute = () => (
    <SpecificTVPage dayIndex={3} actualDay={4}/>
  )
  FridayRoute = () => (
    <SpecificTVPage dayIndex={4} actualDay={5}/>
  )
  SaturdayRoute = () => (
    <SpecificTVPage dayIndex={5} actualDay={6}/>
  )
  SundayRoute = () => (
    <SpecificTVPage dayIndex={6} actualDay={0}/>
  )

  renderScene = SceneMap({
    Monday: this.MondayRoute,
    Tuesday: this.TuesdayRoute,
    Wednesday: this.WednesdayRoute,
    Thursday: this.ThursdayRoute,
    Friday: this.FridayRoute,
    Saturday: this.SaturdayRoute,
    Sunday: this.SundayRoute,
  });

  handleIndexChange = index => this.setState({index});

  render(){
    return(
      <TabView
        lazy
        // tabBarPosition={getSettingsString("settingsTabBarPosition") === "true" ? "bottom" : "top"}
        gestureHandlerProps={{ failOffsetX: this.state.index === 0 ? 1 : 100}}
        navigationState={this.state}
        renderScene={this.renderScene}
        onIndexChange={(this.handleIndexChange)}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={renderTabBar}
      />
    )
  }
}

class SpecificTVPage extends Component {
  constructor(props) {
    super(props);
  }
  
  
  render(){
    // data[0]
    //data["day of week"]["index"]["datatype"]
    //day of week starts on monday
    //index should be all
    //datatype 0 for time, 1 for name
    let data =[[['00:00', 'variety show'], ['00:57', 'shopping commercial'], ['01:00', 'documentary'], ['02:45', 'shopping commercial'], ['03:00', 'color bars'], ['03:34', '—'], ['04:00', '—'], ['05:00', 'static'], ['05:55', 'color bars'], ['06:00', 'snack commercial'], ['06:15', 'news'], ['06:59', 'weather forecast'], ['07:00', 'exercise'], ['07:29', 'shopping commercial'], ['07:30', 'news'], ['07:45', '—'], ['07:59', '—'], ['08:00', 'weather forecast'], ['08:29', 'shopping commercial'], ['08:30', 'drama'], ['08:59', 'shopping commercial'], ['09:00', 'documentary'], ['09:18', '—'], ['09:19', '—'], ['09:20', 'seasonal commercial'], ['09:29', 'fruit commercial'], ['09:30', 'documentary'], ['09:59', '—'], ['10:00', '—'], ['10:29', 'shopping commercial'], ['10:30', "kid's show"], ['10:59', 'fruit commercial'], ['11:00', "kid's show"], ['11:29', 'corporate commercial'], ['11:30', 'cooking show'], ['11:45', 'fruit commercial'], ['11:59', 'news'], ['12:00', 'weather forecast'], ['12:29', 'seasonal commercial'], ['12:30', 'variety show'], ['12:59', 'fruit commercial'], ['13:00', 'variety show'], ['13:29', 'shopping commercial'], ['13:30', 'drama'], ['13:58', 'corporate commercial'], ['13:59', 'talk show'], ['14:00', 'fruit commercial'], ['14:29', 'snack commercial'], ['14:30', 'variety show'], ['14:59', 'fruit commercial'], ['15:00', 'variety show'], ['15:29', 'shopping commercial'], ['15:30', 'exercise'], ['15:50', 'corporate commercial'], ['15:51', 'exercise'], ['15:59', '—'], ['16:00', '—'], ['16:29', 'seasonal commercial'], ['16:30', 'cartoon'], ['16:59', 'snack commercial'], ['17:00', 'cartoon'], ['17:29', 'corporate commercial'], ['17:30', 'variety show'], ['17:58', 'seasonal commercial'], ['17:59', 'variety show'], ['18:00', '—'], ['18:29', 'fruit commercial'], ['18:30', 'news'], ['18:45', '—'], ['18:59', 'weather forecast'], ['19:00', '—'], ['19:30', 'corporate commercial'], ['19:50', 'variety show'], ['19:51', 'seasonal commercial'], ['19:57', 'variety show'], ['19:59', '—'], ['20:00', '—'], ['20:29', '—'], ['20:30', 'snack commercial'], ['20:57', 'quiz show'], ['20:58', 'fruit commercial'], ['20:59', 'quiz show'], ['21:00', 'fruit commercial'], ['21:29', 'seasonal commercial'], ['21:30', 'corporate commercial'], ['21:53', 'drama'], ['21:54', 'seasonal commercial'], ['21:55', 'drama'], ['21:59', '—'], ['22:00', '—'], ['22:44', '—'], ['22:45', 'fruit commercial'], ['22:59', 'news'], ['23:00', '—'], ['23:29', 'weather forecast'], ['23:30', 'shopping commercial'], ['23:55', 'variety show']], [['00:00', 'talk show'], ['00:57', 'shopping commercial'], ['01:00', 'movie'], ['02:45', 'shopping commercial'], ['03:00', 'color bars'], ['03:34', '—'], ['04:00', '—'], ['05:00', 'static'], ['05:55', 'color bars'], ['06:00', 'corporate commercial'], ['06:15', 'news'], ['06:59', 'weather forecast'], ['07:00', 'exercise'], ['07:29', 'fruit commercial'], ['07:30', 'news'], ['07:45', '—'], ['07:59', '—'], ['08:00', 'weather forecast'], ['08:29', 'shopping commercial'], ['08:30', 'drama'], ['08:59', 'shopping commercial'], ['09:00', 'documentary'], ['09:18', '—'], ['09:19', '—'], ['09:20', 'seasonal commercial'], ['09:29', 'fruit commercial'], ['09:30', 'documentary'], ['09:59', '—'], ['10:00', '—'], ['10:29', 'shopping commercial'], ['10:30', 'cartoon'], ['10:59', 'fruit commercial'], ['11:00', 'cartoon'], ['11:29', 'corporate commercial'], ['11:30', 'cooking show'], ['11:45', 'seasonal commercial'], ['11:59', 'news'], ['12:00', 'weather forecast'], ['12:29', 'shopping commercial'], ['12:30', 'variety show'], ['12:59', 'fruit commercial'], ['13:00', 'variety show'], ['13:29', 'shopping commercial'], ['13:30', 'drama'], ['13:58', 'corporate commercial'], ['13:59', 'talk show'], ['14:00', '—'], ['14:29', 'corporate commercial'], ['14:30', 'documentary'], ['14:59', 'seasonal commercial'], ['15:00', 'documentary'], ['15:29', 'shopping commercial'], ['15:30', 'exercise'], ['15:50', 'snack commercial'], ['15:51', 'exercise'], ['15:59', '—'], ['16:00', '—'], ['16:29', 'seasonal commercial'], ['16:30', "kid's show"], ['16:59', 'snack commercial'], ['17:00', 'cooking show'], ['17:29', 'corporate commercial'], ['17:30', 'variety show'], ['17:58', 'snack commercial'], ['17:59', 'variety show'], ['18:00', '—'], ['18:29', 'fruit commercial'], ['18:30', 'news'], ['18:45', '—'], ['18:59', 'weather forecast'], ['19:00', '—'], ['19:30', 'corporate commercial'], ['19:50', 'sports'], ['19:51', '—'], ['19:57', '—'], ['19:59', 'corporate commercial'], ['20:00', 'sports'], ['20:29', '—'], ['20:30', '—'], ['20:57', '—'], ['20:58', '—'], ['20:59', '—'], ['21:00', 'fruit commercial'], ['21:29', 'shopping commercial'], ['21:30', 'seasonal commercial'], ['21:53', 'talk show'], ['21:54', 'corporate commercial'], ['21:55', 'talk show'], ['21:59', '—'], ['22:00', '—'], ['22:44', '—'], ['22:45', 'snack commercial'], ['22:59', 'news'], ['23:00', '—'], ['23:29', 'weather forecast'], ['23:30', 'seasonal commercial'], ['23:55', 'documentary']], [['00:00', 'documentary'], ['00:57', 'shopping commercial'], ['01:00', 'documentary'], ['02:45', 'shopping commercial'], ['03:00', 'color bars'], ['03:34', '—'], ['04:00', '—'], ['05:00', 'static'], ['05:55', 'color bars'], ['06:00', 'snack commercial'], ['06:15', 'news'], ['06:59', 'weather forecast'], ['07:00', 'exercise'], ['07:29', 'seasonal commercial'], ['07:30', 'news'], ['07:45', '—'], ['07:59', '—'], ['08:00', 'weather forecast'], ['08:29', 'shopping commercial'], ['08:30', 'drama'], ['08:59', 'shopping commercial'], ['09:00', 'documentary'], ['09:18', '—'], ['09:19', '—'], ['09:20', 'seasonal commercial'], ['09:29', 'fruit commercial'], ['09:30', 'documentary'], ['09:59', '—'], ['10:00', '—'], ['10:29', 'shopping commercial'], ['10:30', "kid's show"], ['10:59', 'snack commercial'], ['11:00', "kid's show"], ['11:29', 'corporate commercial'], ['11:30', 'cooking show'], ['11:45', 'fruit commercial'], ['11:59', 'news'], ['12:00', 'weather forecast'], ['12:29', 'seasonal commercial'], ['12:30', 'variety show'], ['12:59', 'fruit commercial'], ['13:00', 'variety show'], ['13:29', 'shopping commercial'], ['13:30', 'drama'], ['13:58', 'corporate commercial'], ['13:59', 'talk show'], ['14:00', '—'], ['14:29', 'corporate commercial'], ['14:30', 'variety show'], ['14:59', 'fruit commercial'], ['15:00', 'variety show'], ['15:29', 'seasonal commercial'], ['15:30', 'exercise'], ['15:50', 'fruit commercial'], ['15:51', 'exercise'], ['15:59', '—'], ['16:00', '—'], ['16:29', 'seasonal commercial'], ['16:30', 'cartoon'], ['16:59', 'snack commercial'], ['17:00', 'cartoon'], ['17:29', 'corporate commercial'], ['17:30', 'variety show'], ['17:58', 'fruit commercial'], ['17:59', 'variety show'], ['18:00', '—'], ['18:29', 'seasonal commercial'], ['18:30', 'news'], ['18:45', '—'], ['18:59', 'weather forecast'], ['19:00', '—'], ['19:30', 'corporate commercial'], ['19:50', 'cooking show'], ['19:51', 'seasonal commercial'], ['19:57', 'cooking show'], ['19:59', '—'], ['20:00', '—'], ['20:29', '—'], ['20:30', 'snack commercial'], ['20:57', 'music program'], ['20:58', 'seasonal commercial'], ['20:59', 'music program'], ['21:00', 'snack commercial'], ['21:29', 'corporate commercial'], ['21:30', 'shopping commercial'], ['21:53', 'drama'], ['21:54', 'seasonal commercial'], ['21:55', 'drama'], ['21:59', '—'], ['22:00', '—'], ['22:44', '—'], ['22:45', 'snack commercial'], ['22:59', 'news'], ['23:00', '—'], ['23:29', 'weather forecast'], ['23:30', 'shopping commercial'], ['23:55', 'quiz show']], [['00:00', 'variety show'], ['00:57', 'shopping commercial'], ['01:00', 'sports'], ['02:45', 'shopping commercial'], ['03:00', 'color bars'], ['03:34', '—'], ['04:00', '—'], ['05:00', 'static'], ['05:55', 'color bars'], ['06:00', 'snack commercial'], ['06:15', 'news'], ['06:59', 'weather forecast'], ['07:00', 'exercise'], ['07:29', 'shopping commercial'], ['07:30', 'news'], ['07:45', '—'], ['07:59', '—'], ['08:00', 'weather forecast'], ['08:29', 'shopping commercial'], ['08:30', 'drama'], ['08:59', 'shopping commercial'], ['09:00', 'documentary'], ['09:18', '—'], ['09:19', '—'], ['09:20', 'seasonal commercial'], ['09:29', 'fruit commercial'], ['09:30', 'documentary'], ['09:59', '—'], ['10:00', '—'], ['10:29', 'shopping commercial'], ['10:30', "kid's show"], ['10:59', 'snack commercial'], ['11:00', "kid's show"], ['11:29', 'corporate commercial'], ['11:30', 'cooking show'], ['11:45', 'seasonal commercial'], ['11:59', 'news'], ['12:00', 'weather forecast'], ['12:29', 'shopping commercial'], ['12:30', 'variety show'], ['12:59', 'fruit commercial'], ['13:00', 'variety show'], ['13:29', 'shopping commercial'], ['13:30', 'drama'], ['13:58', 'corporate commercial'], ['13:59', 'talk show'], ['14:00', '—'], ['14:29', 'corporate commercial'], ['14:30', 'variety show'], ['14:59', 'fruit commercial'], ['15:00', 'variety show'], ['15:29', 'shopping commercial'], ['15:30', 'exercise'], ['15:50', 'snack commercial'], ['15:51', 'exercise'], ['15:59', '—'], ['16:00', '—'], ['16:29', 'seasonal commercial'], ['16:30', "kid's show"], ['16:59', 'corporate commercial'], ['17:00', "kid's show"], ['17:29', 'corporate commercial'], ['17:30', 'variety show'], ['17:58', 'snack commercial'], ['17:59', 'variety show'], ['18:00', '—'], ['18:29', 'fruit commercial'], ['18:30', 'news'], ['18:45', '—'], ['18:59', 'weather forecast'], ['19:00', '—'], ['19:30', 'corporate commercial'], ['19:50', 'cartoon'], ['19:51', 'seasonal commercial'], ['19:57', 'cartoon'], ['19:59', '—'], ['20:00', '—'], ['20:29', '—'], ['20:30', 'snack commercial'], ['20:57', 'documentary'], ['20:58', 'seasonal commercial'], ['20:59', 'documentary'], ['21:00', 'snack commercial'], ['21:29', 'corporate commercial'], ['21:30', 'shopping commercial'], ['21:53', 'drama'], ['21:54', 'seasonal commercial'], ['21:55', 'drama'], ['21:59', '—'], ['22:00', '—'], ['22:44', '—'], ['22:45', 'corporate commercial'], ['22:59', 'news'], ['23:00', '—'], ['23:29', 'weather forecast'], ['23:30', 'seasonal commercial'], ['23:55', 'variety show']], [['00:00', 'variety show'], ['00:57', 'shopping commercial'], ['01:00', 'documentary'], ['02:45', 'shopping commercial'], ['03:00', 'color bars'], ['03:34', '—'], ['04:00', '—'], ['05:00', 'static'], ['05:55', 'color bars'], ['06:00', 'corporate commercial'], ['06:15', 'news'], ['06:59', 'weather forecast'], ['07:00', 'exercise'], ['07:29', 'fruit commercial'], ['07:30', 'news'], ['07:45', '—'], ['07:59', '—'], ['08:00', 'weather forecast'], ['08:29', 'shopping commercial'], ['08:30', 'drama'], ['08:59', 'shopping commercial'], ['09:00', 'documentary'], ['09:18', '—'], ['09:19', '—'], ['09:20', 'seasonal commercial'], ['09:29', 'fruit commercial'], ['09:30', 'documentary'], ['09:59', '—'], ['10:00', '—'], ['10:29', 'shopping commercial'], ['10:30', 'cartoon'], ['10:59', 'snack commercial'], ['11:00', 'cartoon'], ['11:29', 'corporate commercial'], ['11:30', 'cooking show'], ['11:45', 'fruit commercial'], ['11:59', 'news'], ['12:00', 'weather forecast'], ['12:29', 'seasonal commercial'], ['12:30', 'variety show'], ['12:59', 'fruit commercial'], ['13:00', 'variety show'], ['13:29', 'shopping commercial'], ['13:30', 'drama'], ['13:58', 'corporate commercial'], ['13:59', 'drama'], ['14:00', 'fruit commercial'], ['14:29', 'corporate commercial'], ['14:30', 'talk show'], ['14:59', 'snack commercial'], ['15:00', 'talk show'], ['15:29', 'seasonal commercial'], ['15:30', 'exercise'], ['15:50', 'fruit commercial'], ['15:51', 'exercise'], ['15:59', '—'], ['16:00', '—'], ['16:29', 'seasonal commercial'], ['16:30', "kid's show"], ['16:59', 'snack commercial'], ['17:00', "kid's show"], ['17:29', 'corporate commercial'], ['17:30', 'variety show'], ['17:58', 'snack commercial'], ['17:59', 'variety show'], ['18:00', 'fruit commercial'], ['18:29', 'seasonal commercial'], ['18:30', 'news'], ['18:45', '—'], ['18:59', 'weather forecast'], ['19:00', '—'], ['19:30', 'corporate commercial'], ['19:50', 'sports'], ['19:51', '—'], ['19:57', '—'], ['19:59', '—'], ['20:00', '—'], ['20:29', 'shopping commercial'], ['20:30', '—'], ['20:57', 'sports'], ['20:58', '—'], ['20:59', '—'], ['21:00', 'corporate commercial'], ['21:29', 'snack commercial'], ['21:30', 'seasonal commercial'], ['21:53', 'music program'], ['21:54', 'corporate commercial'], ['21:55', 'music program'], ['21:59', '—'], ['22:00', '—'], ['22:44', '—'], ['22:45', 'fruit commercial'], ['22:59', 'news'], ['23:00', '—'], ['23:29', 'weather forecast'], ['23:30', 'seasonal commercial'], ['23:55', 'quiz show']], [['00:00', 'color bars'], ['00:57', '—'], ['01:00', 'static'], ['02:45', '—'], ['03:00', '—'], ['03:34', 'secret program'], ['04:00', 'static'], ['05:00', '—'], ['05:55', 'color bars'], ['06:00', 'snack commercial'], ['06:15', 'news'], ['06:59', 'weather forecast'], ['07:00', 'exercise'], ['07:29', 'seasonal commercial'], ['07:30', 'news'], ['07:45', '—'], ['07:59', '—'], ['08:00', 'weather forecast'], ['08:29', 'seasonal commercial'], ['08:30', 'variety show'], ['08:59', 'corporate commercial'], ['09:00', 'variety show'], ['09:18', 'snack commercial'], ['09:19', 'documentary'], ['09:20', '—'], ['09:29', '—'], ['09:30', '—'], ['09:59', 'shopping commercial'], ['10:00', 'documentary'], ['10:29', 'shopping commercial'], ['10:30', "kid's show"], ['10:59', 'fruit commercial'], ['11:00', "kid's show"], ['11:29', 'corporate commercial'], ['11:30', 'news'], ['11:45', '—'], ['11:59', '—'], ['12:00', 'weather forecast'], ['12:29', 'shopping commercial'], ['12:30', 'variety show'], ['12:59', 'fruit commercial'], ['13:00', 'variety show'], ['13:29', 'shopping commercial'], ['13:30', 'talk show'], ['13:58', '—'], ['13:59', '—'], ['14:00', '—'], ['14:29', 'corporate commercial'], ['14:30', 'documentary'], ['14:59', 'snack commercial'], ['15:00', 'documentary'], ['15:29', 'seasonal commercial'], ['15:30', 'sports'], ['15:50', '—'], ['15:51', '—'], ['15:59', 'snack commercial'], ['16:00', 'sports'], ['16:29', '—'], ['16:30', '—'], ['16:59', '—'], ['17:00', '—'], ['17:29', 'seasonal commercial'], ['17:30', 'variety show'], ['17:58', 'snack commercial'], ['17:59', 'variety show'], ['18:00', '—'], ['18:29', 'corporate commercial'], ['18:30', 'news'], ['18:45', '—'], ['18:59', '—'], ['19:00', 'weather forecast'], ['19:30', 'corporate commercial'], ['19:50', 'quiz show'], ['19:51', 'seasonal commercial'], ['19:57', 'quiz show'], ['19:59', '—'], ['20:00', '—'], ['20:29', '—'], ['20:30', 'snack commercial'], ['20:57', 'variety show'], ['20:58', '—'], ['20:59', '—'], ['21:00', 'fruit commercial'], ['21:29', 'seasonal commercial'], ['21:30', 'snack commercial'], ['21:53', 'movie'], ['21:54', '—'], ['21:55', '—'], ['21:59', '—'], ['22:00', 'corporate commercial'], ['22:44', 'movie'], ['22:45', '—'], ['22:59', '—'], ['23:00', 'seasonal commercial'], ['23:29', 'weather forecast'], ['23:30', '—'], ['23:55', 'news']], [['00:00', 'music program'], ['00:57', 'shopping commercial'], ['01:00', 'documentary'], ['02:45', 'color bars'], ['03:00', '—'], ['03:34', '—'], ['04:00', '—'], ['05:00', 'static'], ['05:55', 'color bars'], ['06:00', 'corporate commercial'], ['06:15', 'news'], ['06:59', 'weather forecast'], ['07:00', 'exercise'], ['07:29', 'fruit commercial'], ['07:30', "kid's show"], ['07:45', 'fruit commercial'], ['07:59', "kid's show"], ['08:00', '—'], ['08:29', 'snack commercial'], ['08:30', 'cartoon'], ['08:59', 'seasonal commercial'], ['09:00', 'cartoon'], ['09:18', 'snack commercial'], ['09:19', 'quiz show'], ['09:20', '—'], ['09:29', '—'], ['09:30', '—'], ['09:59', 'shopping commercial'], ['10:00', 'quiz show'], ['10:29', 'snack commercial'], ['10:30', 'variety show'], ['10:59', 'snack commercial'], ['11:00', 'variety show'], ['11:29', 'corporate commercial'], ['11:30', 'news'], ['11:45', '—'], ['11:59', '—'], ['12:00', 'weather forecast'], ['12:29', 'shopping commercial'], ['12:30', 'talk show'], ['12:59', 'snack commercial'], ['13:00', 'talk show'], ['13:29', 'shopping commercial'], ['13:30', 'sports'], ['13:58', 'shopping commercial'], ['13:59', 'sports'], ['14:00', '—'], ['14:29', '—'], ['14:30', '—'], ['14:59', '—'], ['15:00', '—'], ['15:29', 'seasonal commercial'], ['15:30', 'quiz show'], ['15:50', 'snack commercial'], ['15:51', 'quiz show'], ['15:59', '—'], ['16:00', '—'], ['16:29', 'seasonal commercial'], ['16:30', 'cooking show'], ['16:59', 'snack commercial'], ['17:00', 'cooking show'], ['17:29', 'fruit commercial'], ['17:30', 'variety show'], ['17:58', 'seasonal commercial'], ['17:59', 'variety show'], ['18:00', '—'], ['18:29', 'corporate commercial'], ['18:30', 'cartoon'], ['18:45', 'fruit commercial'], ['18:59', 'cartoon'], ['19:00', '—'], ['19:30', 'corporate commercial'], ['19:50', 'sports'], ['19:51', '—'], ['19:57', '—'], ['19:59', 'seasonal commercial'], ['20:00', 'sports'], ['20:29', '—'], ['20:30', '—'], ['20:57', '—'], ['20:58', '—'], ['20:59', '—'], ['21:00', 'corporate commercial'], ['21:29', 'snack commercial'], ['21:30', 'seasonal commercial'], ['21:53', 'movie'], ['21:54', '—'], ['21:55', '—'], ['21:59', 'snack commercial'], ['22:00', 'corporate commercial'], ['22:44', 'movie'], ['22:45', '—'], ['22:59', '—'], ['23:00', 'snack commercial'], ['23:29', 'weather forecast'], ['23:30', '—'], ['23:55', 'news']]]
    return(
      <ScrollView>
        <View style={{marginTop: 100}}/>
        <SubHeader>{getWeekDay(this.props.actualDay)}</SubHeader>
        <View style={{marginTop: 3}}/>
        <Header translate={false}>{capitalize(attemptToTranslate("TV Guide"))}</Header>
        <View style={{marginTop: 20}}/>
          {data[this.props.dayIndex].map((item)=>{
            return <ContainerBox key={item[0]+item[1]} text={item[0]} text2={attemptToTranslate(item[1])} smallWidth/>
          })}
        
      </ScrollView>
    );
  }
}

class ContainerBox extends Component { 
  //text is hour
  //text2 is name of program
  render(){
    var highlight=["news","weather forecast"]
    let backgroundColor = colors.white[global.darkMode]
    let currentHour = this.props.text.toString().split(":")[0].toString()
    if(highlight.includes(this.props.text2)){
      backgroundColor = colors.specialEventBirthdayBackgroundHighlight[global.darkMode]
    }
    if(currentHour.charAt(0)==="0"){
      currentHour = currentHour.slice(1)
    }
    if(getCurrentDateObject().getHours().toString()===currentHour){
      backgroundColor=colors.selectedText[global.darkMode]
    }
    return <View style={{paddingHorizontal:20, flexDirection:"row", alignItems:"center",backgroundColor: backgroundColor, borderTopColor: colors.lightDarkAccentHeavy[global.darkMode],borderTopWidth: 2,}}>
      <SubHeader margin={false} style={{marginLeft:10,flex:2.25,fontSize:18, marginVertical:10}}>{convert24Hour(this.props.text)}</SubHeader>
      <SubHeader margin={false} style={{fontSize:18, flexWrap:"wrap", flex:5, marginLeft:10,marginVertical:10}}>{capitalizeFirst(this.props.text2)}</SubHeader>
    </View>
  }
}

//converts time of format 24:00 to 6:00PM
function convert24Hour(input){
  if(getSettingsString("settingsUse24HourClock")==="true"){
    return input
  } else {
    let currentHour = input.toString().split(":")[0].toString()
    let meridian = "AM"
    if(currentHour.charAt(0)==="0"){
      currentHour = currentHour.slice(1)
    }
    if(parseInt(currentHour)>=12){
      meridian = "PM"
      if(parseInt(currentHour)>12){
        currentHour = (parseInt(currentHour)-12).toString()
      }
    }
    if(parseInt(currentHour)===0){
      meridian = "AM"
      currentHour = "12"
    }
    let outputTime = currentHour+":"+input.toString().split(":")[1] + " " +attemptToTranslate(meridian)
    return outputTime
  }
}