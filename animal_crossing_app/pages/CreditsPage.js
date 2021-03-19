import React, {Component} from 'react';
import {Linking, TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont'
import StoreHoursContainer from '../components/StoreHoursContainer';
import colors from '../Colors'
import PopupRating from "../components/PopupRating"
import ButtonComponent from "../components/ButtonComponent"
import {MailLink, ExternalLink, SubHeader, Header, Paragraph} from "../components/Formattings"

class CreditsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }
  render(){
    var changelogText = global.changelog.toString();
    changelogText = changelogText.split("\n-");
    return(
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <ScrollView>
          <View style={{marginTop: 100}}/>
          <LottieView 
            autoPlay
            loop
            style={{
              width: Dimensions.get('window').width,
            }} 
            source={require('../assets/credits.json')}
          />
          <View style={{marginTop: 40}}/>
          <Header>Credits</Header>
          <View style={{marginTop: 20}}/>
          <View style={{height: 300}}>
            <StoreHoursContainer backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} image={require("../assets/icons/James.png")} text="James" textBottom="Lead Programmer"/>
            <StoreHoursContainer backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} image={require("../assets/icons/Ryan.png")} text="Ryan" textBottom="Lead Graphics"/>
          </View>

          <View style={{height: 50}}/>
          <MailLink/>
          <PopupRating show={this.state.show} noShow={()=>{this.setState({show:false})}}/>
          <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.setState({show:true})}} text={"Leave a rating"} />
          
          <View style={{height:60}}/>
          <SubHeader>Additional Information</SubHeader>
          <Paragraph>This application was created using React Native, with the original App programmed in Flutter. This application and contents are NOT affiliated with Nintendo. All local artwork recreated/licensed. This application is not made for commercial use, and is provided at a price of 0$ (free) on the Google Play Store with no advertisements. All application source code is of property to respective owners/contributors listed on the Credits page and/or licenses associated within specific packages/libraries within this application.</Paragraph>
          <Paragraph>Twemoji Icons Graphics licensed under CC-BY 4.0:</Paragraph>
          <ExternalLink link="https://twemoji.twitter.com/"/>
          <Paragraph>Font Awesome icons:</Paragraph>
          <ExternalLink link="https://fontawesome.com/license"/>
          <Paragraph>FlatIcons: from 'Freepik' and 'Pixel perfect':</Paragraph>
          <ExternalLink link="https://www.flaticon.com/"/>
          <Paragraph>All game data sourced from the community created spreadsheet. Thank you everyone for all the hard work and for making the spreadsheet!</Paragraph>
          <ExternalLink link="https://tinyurl.com/acnh-sheet"/>
          <Paragraph>And thank YOU for downloading this application and showing your support.</Paragraph>
          
          
          <View style={{height:35}}/>
          <SubHeader>Integrations</SubHeader>
          <Paragraph>Turnip Prophet - Turnip Tracker:</Paragraph>
          <ExternalLink link="https://turnipprophet.io/"/>
          <Paragraph>Nook.lol - Catalog Scanner:</Paragraph>
          <ExternalLink link="https://nook.lol/"/>
          <Paragraph>{"Guide + FAQ:\nAuthor: littlesnorlax, Co-author: cestislife"}</Paragraph>
          <ExternalLink link="https://chibisnorlax.github.io/acnhfaq/"/>

          <View style={{height:35}}/>
          <SubHeader>Sources</SubHeader>
          <Paragraph>Mystery Islands - by Ninji:</Paragraph>
          <ExternalLink link="https://wuffs.org/acnh/mysterytour.html"/>

          <View style={{height: 35}}/>
          <SubHeader>App Information</SubHeader>
          <TextFont bold={false} style={{marginLeft: 30, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 14,}}>{"v" + global.version + " - " + global.versionCode + "\n\nChangelog:"}</TextFont>
          {
            changelogText.map((point, index) => (
              <TextFont key={point+index} bold={false} style={{marginLeft: 30, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 14,}}>{point}</TextFont>
            ))
          }
          <View style={{height: 25}}/>
        </ScrollView>
     </View>
    )
  }
}
export default CreditsPage;