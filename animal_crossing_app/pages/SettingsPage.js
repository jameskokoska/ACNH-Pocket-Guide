import React, {Component} from 'react';
import {ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont'
import SettingsContainer from '../components/SettingsContainer';
import colors from '../Colors';
import ButtonComponent from "../components/ButtonComponent"
import Popup from '../components/Popup'
import AsyncStorage from '@react-native-async-storage/async-storage';

const music = require("../assets/data/music.json");
const {width} = Dimensions.get('window');


class SettingsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      open:false,
      openRestart:false,
    }
  }
  render(){
    return(<>
      <View style={{backgroundColor:colors.lightDarkAccent[colors.mode], height:"100%"}}>
        <ScrollView>
          <View style={{marginTop: 100}}/>
          <TextFont bold={true} style={{fontSize: 40, marginLeft: 30, color:colors.textBlack[colors.mode]}}>Settings</TextFont>
          <View style={{marginTop: 20}}/>
          {global.settingsCurrent.map( (setting, index)=>
            <SettingsContainer 
              key={setting["keyName"]} 
              currentValue={setting["currentValue"]} 
              backgroundColor={colors.white[colors.mode]} 
              textColor={colors.textBlack[colors.mode]} 
              image={setting["picture"]} 
              text={setting["displayName"]} 
              description={setting["description"]}
              index={index}
              keyName={setting["keyName"]}
              
            />
          )}
          <ButtonComponent text="Reset Data" onPress={() => {this.setState({open:true})}} vibrate={100} color={colors.cancelButton[colors.mode]}/>
          <Popup text="Reset Data" textLower="Would you like to reset your collection? This action cannot be undone." button2={"Reset"} button1={"Cancel"} button1Action={()=>{console.log("")}} button2Action={()=>{AsyncStorage.setItem("collectedString", ""); this.setState({openRestart:true});}} popupVisible={this.state.open} close={() => this.setState({open:!this.state.open})}/>
          <Popup text="Restart Required" textLower="Please restart the application." button1Action={()=>{console.log("")}} button2Action={()=>{AsyncStorage.setItem("collectedString", "");}} popupVisible={this.state.openRestart} close={() => this.setState({open:!this.state.open})}/>
          <View style={{height: 50}}/>
          <View style={{height: 100}}/>
        </ScrollView>
     </View>
     </>
    )
  }
}
export default SettingsPage;