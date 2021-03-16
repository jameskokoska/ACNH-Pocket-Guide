import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import TextFont from '../components/TextFont';
import colors from '../Colors'
import {getPhoto} from "../components/GetPhoto"


export default class CalendarPage extends Component {
  constructor(item) {
    super(item);

    this.state = {
      items: {},
      itemsColor: {}
    };
  }

  render() {
    console.log(this.state.itemsColor)
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={new Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markingType={'custom'}
        markedDates={this.state.itemsColor}
        // monthFormat={'yyyy'}
        theme={{ 
          // agendaDayTextColor: 'black',
          // agendaDayNumColor: 'black',
          // agendaTodayColor: 'black', 
          indicatorColor: colors.textBlack[global.darkMode],
          todayTextColor: '#00adf5',
          monthTextColor: colors.textBlack[global.darkMode],
          dayTextColor: colors.textBlack[global.darkMode],
          backgroundColor: colors.background[global.darkMode],
          calendarBackground: colors.backgroundLight[global.darkMode],
        }}
          
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const date = new Date(day.timestamp + i * 24 * 60 * 60 * 1000 - 10);
        const strTime = this.dateToString(date);
        
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];

          if(date.getDay()===0){
            this.state.items[strTime].push({
              name: 'Daisy Mae',
              time: '5 AM - 12 PM',
              image:"turnip.png",
            });
            this.state.itemsColor[strTime] = {customStyles: {
              container: { borderWidth:1, borderColor: colors.lightDarkAccentHeavy2[global.darkMode]},
              text: {fontWeight: 'bold'}
            }};
          } else if (date.getDay()===6){
            this.state.items[strTime].push({
              name: 'K.K. Slider',
              time: '8 PM - 12 AM',
              image:"music.png"
            });
            this.state.itemsColor[strTime] = {customStyles: {
              container: { borderWidth:1, borderColor: colors.lightDarkAccentHeavy2[global.darkMode]},
              text: {fontWeight: 'bold'}
            }};
          }

          // const numItems = Math.floor(Math.random() * 3);
          // for (let j = 0; j < numItems; j++) {
          //   this.state.items[strTime].push({
          //     name: 'Item for ' + strTime + ' #' + j,
          //     height: Math.max(50, Math.floor(Math.random() * 150))
          //   });
          // }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    var image = <View/>
    if(item.image.startsWith("http")){
      image = <Image style={{width: 50, height: 50, resizeMode:'contain',}} source={{uri:item.image}}/>
    } else {
      image = <Image style={{width: 50, height: 50, resizeMode:'contain',}} source={getPhoto(item.image)}/>
    }
    return(
        <View style={{elevation: 2, padding: 20, marginHorizontal: 10, marginVertical: 5,  flexDirection:"row", flex:1, alignItems: 'center', borderRadius: 10, backgroundColor:colors.white[global.darkMode]}}>
          {image}
          <View style={{marginLeft: 18}}>
            <TextFont bold={true} style={{fontSize: 20,color: colors.textBlack[global.darkMode]}}>{item.name}</TextFont>
            <TextFont style={{marginTop: 3,fontSize: 18,color: colors.textBlack[global.darkMode]}}>{item.time}</TextFont>
          </View>
          
        </View>
    )
  }
  
  renderDay(day){
    return(
      <View style={{width: 30, alignItems:"center", marginLeft: -8}}>
        <Image style={styles.eventCalendar} source={require("../assets/icons/calendarIcon.png")}/>
        <TextFont bold={true} style={{position:"absolute", top:1, textAlign:"center",color:"black", fontSize: 12, opacity: 0.8}}>{item.month}</TextFont>
        <TextFont bold={true} style={{position:"absolute", top:17, textAlign:"center",color:"black", fontSize: 24, opacity: 0.8}}>{item.day}</TextFont>
      </View>
    )
  }

  renderEmptyDate() {
    return (
      <View/>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  dateToString(date) {
    return date.toISOString().split('T')[0];
  }
}