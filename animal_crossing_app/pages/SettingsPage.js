import React, {Component} from 'react';
import {ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont'
import SettingsContainer from '../components/SettingsContainer';
import colors from '../Colors';

const music = require("../assets/data/music.json");
const {width} = Dimensions.get('window');


class SettingsPage extends Component {
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
          <View style={{height: 50}}/>
          <View style={{height: 100}}/>
        </ScrollView>
     </View>
     </>
    )
  }
}
export default SettingsPage;