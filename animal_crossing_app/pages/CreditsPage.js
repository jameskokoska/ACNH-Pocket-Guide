import React, {Component} from 'react';
import {Button, Linking, ScrollView, View, Image, FlatList} from 'react-native';
import TextFont from '../components/TextFont'
import StoreHoursContainer from '../components/StoreHoursContainer';
import colors from '../Colors'
import PopupRating from "../components/PopupRating"
import ButtonComponent from "../components/ButtonComponent"
import {MailLink, ExternalLink, SubHeader, Header, Paragraph} from "../components/Formattings"
import {attemptToTranslate} from "../LoadJsonData"
import {changelog, dataVersion} from "../Changelog"
import Popup from '../components/Popup';
import { testNotification } from '../Notifications';

class CreditsPage extends Component {
  render(){
    var changelogText = changelog.toString();
    changelogText = changelogText.split("\n-");
    let headerComponent = <View>
      <View style={{height: 100}}/>
      <Header>Credits</Header>
      <View style={{height: 20}}/>
      <CreditImageContainer image={require("../assets/icons/James.png")} text="James" textBottom="Lead Programmer"/>
      <CreditImageContainer image={require("../assets/icons/Ryan.png")} text="Ryan" textBottom="Lead Graphics"/>
      <View style={{height: 20}}/>
      <SubHeader style={{fontSize: 24}}>Diamond Supporters</SubHeader>
      <Paragraph style={{marginBottom:6, marginTop:2}}>{attemptToTranslate("Thanks for your support!")}</Paragraph>
      <CreditImageContainer largerImage image={require("../assets/icons/Wheels.png")} text="Wheels" textBottom="Diamond Supporter"/>
      <CreditImageContainer image={require("../assets/icons/smma.png")} text="smma" textBottom="Diamond Supporter"/>
      <View style={{height:12}}/>
      <SubHeader style={{fontSize: 24}}>Gold Supporters</SubHeader>
      <Paragraph style={{marginBottom:6, marginTop:2}}>{attemptToTranslate("Thanks for your support!")}</Paragraph>
      <CreditTextBox text="DeadlySweetz"/>
      <CreditImageContainer image={require("../assets/icons/Frank.png")} text="Frank S." textBottom="Gold Supporter"/>
      <CreditImageContainer image={require("../assets/icons/YvonneDeBusschere.png")} text="YvonneDeBusschere" textBottom="Gold Supporter"/>
      <View style={{height:12}}/>
      <SubHeader style={{fontSize: 24}}>Silver Supporters</SubHeader>
      <Paragraph style={{marginBottom:6, marginTop:2}}>{attemptToTranslate("Thanks for your support!")}</Paragraph>
      <CreditTextBox text="Nigerski"/>
      <CreditTextBox text="Christina J."/>
      <CreditTextBox text="NoLNoodle"/>
      <CreditTextBox text="Harkken"/>
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
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("French") + ":"}</SubHeader>
        <SubHeader> Christophe Laffitte</SubHeader>
        <SubHeader> Rose Cornette-Lafable</SubHeader>
      </CreditBox>
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Spanish") + ":"}</SubHeader>
        <SubHeader> adrisniper7</SubHeader>
        <SubHeader> Vicente Soldevilla</SubHeader>
        <SubHeader> Robertin</SubHeader>
        <SubHeader> miyo0i</SubHeader>
        <SubHeader> Jorge Abraham</SubHeader>
        <SubHeader> Lizbeth Salazar Zetina</SubHeader>
        <SubHeader> SakerMaker</SubHeader>
      </CreditBox>
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("German") + ":"}</SubHeader>
        <SubHeader> Ännchen</SubHeader>
        <SubHeader> Andy S.</SubHeader>
        <SubHeader> .:MuschU:.</SubHeader>
        <SubHeader> Fataky</SubHeader>
        <SubHeader> Trevor Kenny</SubHeader>
        <SubHeader> Altaria175</SubHeader>
        <SubHeader> Rebecca H.</SubHeader>
      </CreditBox>
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Russian") + ":"}</SubHeader>
        <SubHeader> Alex Karpsson</SubHeader>
        <SubHeader> Yura Menschikov</SubHeader>
      </CreditBox>
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Italian") + ":"}</SubHeader>
        <SubHeader> Lyndsie</SubHeader>
        <SubHeader> Ilaria Caiazzo</SubHeader>
        <SubHeader> Filip Gavran</SubHeader>
        <SubHeader> Martina Previtera</SubHeader>
      </CreditBox>
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Portuguese") + ":"}</SubHeader>
        <SubHeader> Erick Trigueiro</SubHeader>
      </CreditBox>
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Dutch") + ":"}</SubHeader>
        <SubHeader> Anonymous</SubHeader>
        <SubHeader> MarvelousBi</SubHeader>
        <SubHeader> Annelie</SubHeader>
      </CreditBox>
      
      {/* <PopupTip show={this.state.show2} noShow={()=>{this.setState({show2:false})}}/>
      <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.setState({show2:true})}} text={"Give a tip"} /> */}
      <View style={{height:30}}/>
      <SubHeader>Additional Information</SubHeader>
      <Paragraph>This application was created using React Native, with the original App programmed in Flutter. This application and contents are NOT affiliated with Nintendo. All local artwork recreated/licensed. This application is not made for commercial use, and is provided at a price of 0$ (free) on the Google Play Store with no advertisements. All application source code is of property to respective owners/contributors listed on the Credits page and/or licenses associated within specific packages/libraries within this application.</Paragraph>
      <Paragraph>The copyright of assets is likely to be held by the publisher where applicable. With limited number of low-resolution images for identification, critical commentary and information, the copyrighted content depicted in question qualifies as fair use under United States copyright law and therefore does not significantly impede the right of the copyright holder, since in this context the material is not being used to turn a profit and presents ideas that cannot be exhibited otherwise.</Paragraph>
      <Paragraph>ACNH Pocket Guide Privacy Policy:</Paragraph>
      <ExternalLink link="https://acnh-pocket.web.app/privacy-policy.html"/>
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
      <View style={{height: 25}}/>
      {/* <SubHeader>Debug Tools</SubHeader>
      <Paragraph>Development use only</Paragraph>
      <ButtonComponent color="gray" onPress={()=>{throw new Error("Test error log!");}} text={"Error"}/> */}
    </View>

    return(
      <FlatList
        initialNumToRender={10}
        scrollEventThrottle={10}
        data={changelogText}
        renderItem={(item, index)=>{return <TextFont key={item.item+index} bold={false} style={{marginLeft: 30, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 14,}}>{item.item}</TextFont>}}
        keyExtractor={(item, index) => `list-item-${index}-${item}`}
        removeClippedSubviews={false}
        ListHeaderComponent={()=>{
          return headerComponent
        }}
        windowSize={4}
      />
      
    )
  }
}
export default CreditsPage;

class CreditImageContainer extends Component{
  render(){
    return <View style={{alignItems:"center", justifyContent:"center",backgroundColor:colors.white[global.darkMode], borderRadius: 10, flexDirection:"row", paddingHorizontal:30, paddingRight:20, paddingVertical: this.props.largerImage?17:20, marginHorizontal:20, marginVertical: 5}}>
      <Image style={{width:75, height:this.props.largerImage?80:70,resizeMode:'contain',}} source={this.props.image}/>
      <View style={{flex:1, marginLeft:25, justifyContent:'center'}}>
        <TextFont bold={true} style={{color:colors.textBlack[global.darkMode], fontSize: 23}}>{this.props.text}</TextFont>
        {this.props.textBottom?<TextFont style={{color:colors.textBlack[global.darkMode], fontSize: 17}}>{this.props.textBottom}</TextFont>:<View/>}
      </View>
    </View>
  }
}

class CreditTextBox extends Component{
  render(){
    return <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 15, paddingRight: 10, marginHorizontal: 20, marginVertical: 4,  borderRadius: 10}}>
      <SubHeader>{this.props.text}</SubHeader>
    </View>
  }
}

class CreditBox extends Component{
  render(){
    return <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
      {this.props.children}
    </View>
  }
}