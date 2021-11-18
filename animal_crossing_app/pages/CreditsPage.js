import React, {Component} from 'react';
import {Linking, ScrollView, View,} from 'react-native';
import TextFont from '../components/TextFont'
import StoreHoursContainer from '../components/StoreHoursContainer';
import colors from '../Colors'
import PopupRating from "../components/PopupRating"
import ButtonComponent from "../components/ButtonComponent"
import {MailLink, ExternalLink, SubHeader, Header, Paragraph} from "../components/Formattings"
import {attemptToTranslate} from "../LoadJsonData"
import {changelog, dataVersion} from "../Changelog"
import Popup from '../components/Popup';

class CreditsPage extends Component {
  render(){
    var changelogText = changelog.toString();
    changelogText = changelogText.split("\n-");
    return(
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <ScrollView>
          {/* <View style={{marginTop: 100}}/>
          <LottieView 
            autoPlay
            loop
            style={{
              width: Dimensions.get('window').width,
            }} 
            source={require('../assets/credits.json')}
          /> */}
          <View style={{height: 100}}/>
          <Header>Credits</Header>
          <View style={{height: 20}}/>
          <StoreHoursContainer backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} image={require("../assets/icons/James.png")} text="James" textBottom="Lead Programmer"/>
          <StoreHoursContainer backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} image={require("../assets/icons/Ryan.png")} text="Ryan" textBottom="Lead Graphics"/>
          <View style={{height: 20}}/>
          <SubHeader style={{fontSize: 26}}>Silver Supporters</SubHeader>
          <Paragraph style={{marginBottom:10}}>{attemptToTranslate("Thanks for your support!")}</Paragraph>
          <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
            <SubHeader>Nigerski</SubHeader>
            <SubHeader>Christina</SubHeader>
          </View>
          <View style={{height: 5}}/>
          <View style={{paddingHorizontal: 20}}>
            <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.popupSupport?.setPopupVisible(true)}} text={"Leave a tip"} />
            <Popup support={true} noDismiss ref={(popupSupport) => this.popupSupport = popupSupport} text="Leave a Tip" button1={"Sure!"} button1Action={()=>{Linking.openURL('https://ko-fi.com/dapperappdeveloper')}} button2={"No Thanks"} button2Action={()=>{}}/>
            <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.popupRating?.setPopupVisible(true)}} text={"Leave a rating"} />
            <PopupRating ref={(popupRating) => this.popupRating = popupRating}/>
          </View>
          <View style={{height: 20}}/>
          <MailLink/>

          <View style={{height: 40}}/>
          <SubHeader>Volunteer Translators</SubHeader>
          <Paragraph>{attemptToTranslate("Thanks for your help!")}</Paragraph>
          <View style={{height: 10}}/>
          <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
            <SubHeader style={{marginBottom:5}}>{attemptToTranslate("French") + ":"}</SubHeader>
            <SubHeader> Christophe Laffitte</SubHeader>
            <SubHeader> Rose Cornette-Lafable</SubHeader>
          </View>
          <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
            <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Spanish") + ":"}</SubHeader>
            <SubHeader> adrisniper7</SubHeader>
            <SubHeader> Vicente Soldevilla</SubHeader>
            <SubHeader> Robertin</SubHeader>
            <SubHeader> miyo0i</SubHeader>
            <SubHeader> Jorge Abraham</SubHeader>
            <SubHeader> Lizbeth Salazar Zetina</SubHeader>
            <SubHeader> SakerMaker</SubHeader>
          </View>
          <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
            <SubHeader style={{marginBottom:5}}>{attemptToTranslate("German") + ":"}</SubHeader>
            <SubHeader> Ännchen</SubHeader>
            <SubHeader> Andy S.</SubHeader>
            <SubHeader> .:MuschU:.</SubHeader>
            <SubHeader> Fataky</SubHeader>
            <SubHeader> Trevor Kenny</SubHeader>
            <SubHeader> Altaria175</SubHeader>
          </View>
          <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
            <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Russian") + ":"}</SubHeader>
            <SubHeader> Alex Karpsson</SubHeader>
            <SubHeader> Yura Menschikov</SubHeader>
          </View>
          <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
            <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Italian") + ":"}</SubHeader>
            <SubHeader> Lyndsie</SubHeader>
            <SubHeader> Ilaria Caiazzo</SubHeader>
            <SubHeader> Filip Gavran</SubHeader>
            <SubHeader> Martina Previtera</SubHeader>
          </View>
          <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
            <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Portuguese") + ":"}</SubHeader>
            <SubHeader> Erick Trigueiro</SubHeader>
          </View>
          <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
            <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Dutch") + ":"}</SubHeader>
            <SubHeader> Anonymous</SubHeader>
            <SubHeader> MarvelousBi</SubHeader>
            <SubHeader> Annelie</SubHeader>
          </View>
          
          {/* <PopupTip show={this.state.show2} noShow={()=>{this.setState({show2:false})}}/>
          <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.setState({show2:true})}} text={"Give a tip"} /> */}
          <View style={{height:30}}/>
          <SubHeader>Additional Information</SubHeader>
          <Paragraph>This application was created using React Native, with the original App programmed in Flutter. This application and contents are NOT affiliated with Nintendo. All local artwork recreated/licensed. This application is not made for commercial use, and is provided at a price of 0$ (free) on the Google Play Store with no advertisements. All application source code is of property to respective owners/contributors listed on the Credits page and/or licenses associated within specific packages/libraries within this application.</Paragraph>
          <Paragraph>The copyright of assets is likely to be held by the publisher where applicable. With limited number of low-resolution images for identification, critical commentary and information, the copyrighted content depicted in question qualifies as fair use under United States copyright law and therefore does not significantly impede the right of the copyright holder, since in this context the material is not being used to turn a profit and presents ideas that cannot be exhibited otherwise.</Paragraph>
          <Paragraph>ACNH Guide Privacy Policy:</Paragraph>
          <ExternalLink link="https://docs.google.com/document/d/1NPwtPfFH5_jP_vJHecl5PRT2SPhTXGeGog5WM_S7ZgE/edit?usp=sharing"/>
          <Paragraph>Twemoji Icons Graphics licensed under CC-BY 4.0:</Paragraph>
          <ExternalLink link="https://twemoji.twitter.com/"/>
          <Paragraph>Font Awesome icons:</Paragraph>
          <ExternalLink link="https://fontawesome.com/license"/>
          <Paragraph>FlatIcons: from 'Freepik' and 'Pixel perfect':</Paragraph>
          <ExternalLink link="https://www.flaticon.com/"/>
          <Paragraph>All game data sourced from the community created spreadsheet. Thank you everyone for all the hard work and for making the spreadsheet!</Paragraph>
          <ExternalLink link="https://tinyurl.com/acnh-sheet"/>
          <Paragraph>Translations sourced from the community spreadsheet. Thank you everyone for translating!</Paragraph>
          <ExternalLink link="https://github.com/alexislours/translation-sheet-data"/>
          <Paragraph>And thank YOU for downloading this application and showing your support.</Paragraph>
          
          <View style={{height:35}}/>
          <SubHeader>Integrations</SubHeader>
          <Paragraph>Turnip Prophet - Turnip Tracker:</Paragraph>
          <ExternalLink link="https://turnipprophet.io/"/>
          <Paragraph>Nook.lol - Catalog Scanner:</Paragraph>
          <ExternalLink link="https://nook.lol/"/>
          <Paragraph>{"Guide + FAQ:\nAuthor: littlesnorlax, Co-author: cestislife"}</Paragraph>
          <ExternalLink link="https://chibisnorlax.github.io/acnhfaq/"/>
          <Paragraph>Villager Compatibility:</Paragraph>
          <ExternalLink link="https://docs.google.com/spreadsheets/d/1Sc2HJRcgg-Q_CsFnewIB3n2f4Tgj-QT33qUCrItj0MU/"/>
          <Paragraph>{"MeteoNook:\nAuthor: Ash Wolf (Ninji)"}</Paragraph>
          <ExternalLink link="https://wuffs.org/acnh/weather/"/>

          <View style={{height:35}}/>
          <SubHeader>Sources</SubHeader>
          <Paragraph>Mystery Islands - by Ninji:</Paragraph>
          <ExternalLink link="https://wuffs.org/acnh/mysterytour.html"/>

          <View style={{height: 35}}/>
          <SubHeader>App Information</SubHeader>
          <TextFont bold={true} style={{marginLeft: 30, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 15,}}>{"\nDatabase v" + dataVersion}</TextFont>
          <TextFont bold={true} style={{marginLeft: 30, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 15,}}>{"App v" + global.version + " - " + global.versionCode + "\n\nChangelog:"}</TextFont>
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