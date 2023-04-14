import React, {Component} from 'react';
import {View, Image, FlatList} from 'react-native';
import TextFont from '../components/TextFont'
import colors from '../Colors'
import PopupRating from "../components/PopupRating"
import ButtonComponent from "../components/ButtonComponent"
import {MailLink, ExternalLink, SubHeader, Header, Paragraph, HeaderNote} from "../components/Formattings"
import {attemptToTranslate, capitalize, openURL} from "../LoadJsonData"
import {changelog, dataVersion} from "../Changelog"

class CreditsPage extends Component {
  render(){
    var changelogText = changelog.toString();
    changelogText = changelogText.split("\n-");
    let headerComponent = <View>
      <View style={{height: 100}}/>
      <Header>Credits</Header>
      <HeaderNote>{attemptToTranslate("Made In Canada") + " " + "🍁"}</HeaderNote>
      <View style={{height: 20}}/>
      <CreditImageContainer image={require("../assets/icons/James.png")} text="James" textBottom="Lead Programmer"/>
      <CreditImageContainer image={require("../assets/icons/Ryan.png")} text="Ryan" textBottom="Lead Graphics"/>
      <View style={{height: 15}}/>
      <MailLink/>
      <View style={{height: 25}}/>
      <Supporters/>
      <View style={{height: 5}}/>
      {/* <View style={{paddingHorizontal: 20}}>
        <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.popupRating?.setPopupVisible(true)}} text={capitalize(attemptToTranslate("Leave a rating"))} />
        <PopupRating ref={(popupRating) => this.popupRating = popupRating}/>
      </View> */}

      <View style={{height: 20}}/>
      <SubHeader>Volunteer Translators</SubHeader>
      <SubHeader bold={false} style={{marginBottom:6, marginTop:0, fontSize: 17}}>{attemptToTranslate("Thanks for your help!")}</SubHeader>
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("French") + ":"}</SubHeader>
        <SubHeader> Christophe Laffitte</SubHeader>
        <SubHeader> Rose Cornette-Lafable</SubHeader>
        <SubHeader> Zachary Corbeau</SubHeader>
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
        <SubHeader> David</SubHeader>
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
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Czech") + ":"}</SubHeader>
        <SubHeader> SirDave</SubHeader>
      </CreditBox>
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Slovak") + ":"}</SubHeader>
        <SubHeader> SirDave</SubHeader>
      </CreditBox>
      <CreditBox>
        <SubHeader style={{marginBottom:5}}>{attemptToTranslate("Korean") + ":"}</SubHeader>
        <SubHeader> Hwaryu</SubHeader>
      </CreditBox>
      
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
      <Paragraph>FlatIcons: from 'Freepik' and 'Pixel perfect' and 'Vitaly Gorbachev' and 'Smashicons':</Paragraph>
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

      <View style={{height:25}}/>
      <SubHeader>Sources</SubHeader>
      <Paragraph>Mystery Islands - by Ninji:</Paragraph>
      <ExternalLink link="https://wuffs.org/acnh/mysterytour.html"/>

      <View style={{height: 35}}/>
      <SubHeader>App Information</SubHeader>
      <View style={{height: 10}}/>
      <TextFont bold={true} style={{marginLeft: 30, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 15,}}>{"Database v" + dataVersion}</TextFont>
      <TextFont bold={true} style={{marginLeft: 30, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 15,}}>{"App v" + global.version + " - " + global.versionCode}</TextFont>
      <View style={{height: 35}}/>
      <SubHeader>Changelog</SubHeader>
      {/* <SubHeader>Debug Tools</SubHeader>
      <Paragraph>Development use only</Paragraph>
      <ButtonComponent color="gray" onPress={()=>{throw new Error("Test error log!");}} text={"Error"}/> */}
    </View>

    return(
      <FlatList
        initialNumToRender={100}
        data={changelogText}
        renderItem={(item, index)=>{return <TextFont key={item.item+index} bold={false} style={{marginLeft: 30, marginRight: 30, color: colors.fishText[global.darkMode], fontSize: 14,}}>{item.item}</TextFont>}}
        keyExtractor={(item, index) => `list-item-${index}-${item}`}
        ListHeaderComponent={()=>{
          return headerComponent
        }}
        windowSize={100}
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

export class Supporters extends Component{
  render(){
    return <View>
      <SubHeader style={{fontSize: 24}}>Diamond Supporters</SubHeader>
      <SubHeader bold={false} style={{marginBottom:6, marginTop:0, fontSize: 17}}>{attemptToTranslate("Thanks for your support!")}</SubHeader>
      <CreditImageContainer largerImage image={require("../assets/icons/Wheels.png")} text="Wheels" textBottom="Diamond Supporter"/>
      <CreditImageContainer image={require("../assets/icons/smma.png")} text="smma" textBottom="Diamond Supporter"/>
      <CreditImageContainer image={require("../assets/icons/Kalie.png")} text="Kalie" textBottom="Diamond Supporter"/>
      <CreditTextBox text="Spockslefteyebrow"/>
      <CreditImageContainer image={require("../assets/icons/Nym.png")} text="Nym" textBottom="Diamond Supporter"/>
      <CreditImageContainer image={require("../assets/icons/Patrick.png")} text="Patrick" textBottom="Diamond Supporter"/>
      <CreditImageContainer image={require("../assets/icons/SethN.png")} text="Seth N." textBottom="Diamond Supporter"/>
      <CreditImageContainer image={require("../assets/icons/Ari.png")} text="Ari K." textBottom="Diamond Supporter"/>
      <View style={{height:12}}/>
      <SubHeader style={{fontSize: 24}}>Gold Supporters</SubHeader>
      <SubHeader bold={false} style={{marginBottom:6, marginTop:0, fontSize: 17}}>{attemptToTranslate("Thanks for your support!")}</SubHeader>
      <CreditTextBox text="DeadlySweetz"/>
      <CreditImageContainer image={require("../assets/icons/Frank.png")} text="Frank S." textBottom="Gold Supporter"/>
      <CreditImageContainer image={require("../assets/icons/YvonneDeBusschere.png")} text="YvonneDeBusschere" textBottom="Gold Supporter"/>
      <CreditTextBox text="Hidden Cat"/>
      <CreditImageContainer image={require("../assets/icons/Tida.png")} text="Tida" textBottom="Gold Supporter"/>
      <CreditTextBox text="Cindee"/>
      <CreditTextBox text="Jennifer R."/>
      <CreditTextBox text="SavannahLynn"/>
      <CreditImageContainer image={require("../assets/icons/everstar.png")} text="everstar" textBottom="Gold Supporter"/>
      <CreditTextBox text="Utumno"/>
      <CreditImageContainer image={require("../assets/icons/LouieJohnson.png")} text="helljay1309" textBottom="Gold Supporter"/>
      <CreditImageContainer image={require("../assets/icons/Cathygrace.png")} text="Cathygrace" textBottom="Gold Supporter"/>
      <View style={{height:12}}/>
      <SubHeader style={{fontSize: 24}}>Silver Supporters</SubHeader>
      <SubHeader bold={false} style={{marginBottom:6, marginTop:0, fontSize: 17}}>{attemptToTranslate("Thanks for your support!")}</SubHeader>
      <CreditTextBox text="Nigerski"/>
      <CreditTextBox text="Christina J."/>
      <CreditTextBox text="NoLNoodle"/>
      <CreditTextBox text="Harkken"/>
      <CreditTextBox text="RisingProtostar"/>
      <CreditTextBox text="Kryptonite"/>
      <CreditTextBox text="Deanna"/>
      <CreditTextBox text="Tee"/>
      <CreditTextBox text="Jacqueline D. (Quinn)"/>
      <CreditTextBox text="nojinmyname"/>
      <CreditTextBox text="LunaKat"/>
      <CreditTextBox text="Fye"/>
      <CreditTextBox text="Tschitscho"/>
      <CreditTextBox text="Oratoria"/>
      <CreditTextBox text="Nanners"/>
      <CreditTextBox text="SalymSkye"/>
      <CreditTextBox text="Earper"/>
      <CreditTextBox text="Strinakken"/>
      <CreditTextBox text="Jess"/>
      <CreditTextBox text="Lambiepinx"/>
      <CreditTextBox text="Olivia"/>
    </View>
  }
}