import React, {Component} from 'react';
import {Linking, TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont'
import StoreHoursContainer from '../components/StoreHoursContainer';
import colors from '../Colors'
import PopupRating from "../components/PopupRating"
import ButtonComponent from "../components/ButtonComponent"

const music = require("../assets/data/music.json");
const {width} = Dimensions.get('window');


class CreditsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }
  render(){
    return(
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <ScrollView>
          <View style={{marginTop: 100}}/>
          <LottieView 
            autoPlay
            loop
            style={{
              width: width,
            }} 
            source={require('../assets/credits.json')}
          />
          <View style={{marginTop: 40}}/>
          <TextFont bold={true} style={{fontSize: 40, marginLeft: 30, color:colors.textBlack[global.darkMode]}}>Credits</TextFont>
          <View style={{marginTop: 20}}/>
          <View style={{height: 300}}>
            <StoreHoursContainer backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} image={require("../assets/icons/James.png")} text="James" textBottom="Lead Programmer"/>
            <StoreHoursContainer backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} image={require("../assets/icons/Ryan.png")} text="Ryan" textBottom="Lead Graphics"/>
          </View>
          <View style={{height: 50}}/>
          <TextFont bold={true} style={{fontSize: 20, marginLeft: 30, color:colors.textBlack[global.darkMode], marginBottom: 10}}>Additional Information</TextFont>
          <Text style={{fontSize: 16, marginLeft: 30, marginRight: 30, color:colors.textBlack[global.darkMode]}}>This application was created using React Native, with the original App programmed in Flutter. This application and contents are NOT affiliated with Nintendo. All local artwork recreated/licensed. This application is not made for commercial use, and is provided at a price of 0$ (free) on the Google Play Store with no advertisements. All application source code is of property to respective owners/contributors listed on the Credits page and/or licenses associated within specific packages/libraries within this application.</Text>
          <Text style={{marginTop: 10, fontSize: 16, marginLeft: 30, marginRight: 30, color:colors.textBlack[global.darkMode]}}>Twemoji Icons Graphics licensed under CC-BY 4.0:</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://creativecommons.org/licenses/by/4.0/') }>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 16, marginLeft: 30, marginRight: 30, }}>{"https://creativecommons.org/licenses/by/4.0/"}</TextFont>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 16, marginLeft: 30, marginRight: 30, color:colors.textBlack[global.darkMode]}}>FlatIcons: from 'Freepik' and 'Pixel perfect'.</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.flaticon.com/') }>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 16, marginLeft: 30, marginRight: 30, }}>{"https://www.flaticon.com/"}</TextFont>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 16, marginLeft: 30, marginRight: 30, color:colors.textBlack[global.darkMode]}}>All game data sourced from the community created spreadsheet. Thank you everyone for all the hard work and for making the spreadsheet!</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://tinyurl.com/acnh-sheet') }>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 16, marginLeft: 30, marginRight: 30, }}>{"https://tinyurl.com/acnh-sheet"}</TextFont>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 16, marginLeft: 30, marginRight: 30, color:colors.textBlack[global.darkMode]}}>And thank YOU for downloading this application and showing your support.</Text>
          <View style={{height:30}}/>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:dapperappdeveloper@gmail.com') }>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"Suggestions, bugs, or concerns? \nSend me an email!"}</TextFont>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>dapperappdeveloper@gmail.com</TextFont>
          </TouchableOpacity>
          <PopupRating show={this.state.show} noShow={()=>{this.setState({show:false})}}/>
          <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.setState({show:true})}} text={"Leave a rating"} />
          <View style={{height: 90}}/>
          <TextFont bold={false} style={{marginLeft: 30, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 14,}}>{"v" + global.version + " - " + global.versionCode + "\n\nChangelog:"}</TextFont>
          <TextFont bold={false} style={{marginLeft: 30, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 14,}}>{global.changelog}</TextFont>
          <View style={{height: 20}}/>
        </ScrollView>
     </View>
    )
  }
}
export default CreditsPage;