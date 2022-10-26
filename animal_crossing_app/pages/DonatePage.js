import React, {Component} from 'react';
import {ScrollView, Text, View, Image, TouchableNativeFeedback} from 'react-native';
import TextFont from '../components/TextFont';
import colors from '../Colors'
import FadeInOut from "../components/FadeInOut";
import {SubHeader, MailLink, Header} from "../components/Formattings"

export default class DonatePage extends Component {
  render(){
    return <ScrollView>
      <FadeInOut fadeIn={true} duration={1000}>
        <SubHeader style={{marginTop: 140, fontSize:25, marginBottom: 5, marginLeft: 25}}>Support the Developer</SubHeader>

        <SupportOption label="Coffee" image={require("../assets/icons/coffee3.png")} price={"$3.45"}/>
        <SupportOption label="Cake" image={require("../assets/icons/cupcake.png")} price={"$10.50"}/>
        <SupportOption label="Meal" image={require("../assets/icons/meal.png")} price={"$20.50"}/>     

        <SubHeader style={{marginTop: 20, fontSize:23, marginBottom: 4, marginLeft: 25}}>Supporter Tiers</SubHeader>
        <SupportOption label="Silver" image={require("../assets/icons/silver-medal.png")} price={"$5/month"} description="Get your name in the About page of the app!"/>
        <SupportOption label="Gold" image={require("../assets/icons/gold-medal.png")} price={"$10/month"} description="Get your name and player avatar in the About page of the app!"/>
        <SupportOption label="Diamond" image={require("../assets/icons/diamond-medal.png")} price={"$20/month"} description="Get your name and player avatar in the About page of the app!"/>

        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end", marginRight: 25, marginTop: 30}}>
          <SubHeader style={{marginTop: 20}}>About the Developer</SubHeader>
          <Image source={require("../assets/icons/James.png")} style={{width: 70, height: 70, resizeMode:"contain"}}></Image>
        </View>
        <TextFont style={{fontSize:14, marginHorizontal: 30, marginTop: 5, marginBottom: 15, color:colors.textBlack[global.darkMode]}}>Hello I'm James! I am the lead developer of this application and currently studying at University. If you would like to help support me and my education, feel free to purchase something off the menu. Everything helps me out! This app will remain free and ad free forever.</TextFont>

        <View style={{height:70}}></View>
      </FadeInOut>
    </ScrollView>
  }
}

class SupportOption extends Component{
  render(){
    return <TouchableNativeFeedback>
      <View style={{backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode], padding: 20, borderRadius: 15, marginHorizontal: 20, marginTop: 10, }}>
        <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between"}}>
          <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <Image source={this.props.image} style={{width: 30, height: 30, resizeMode:"contain"}}></Image>
              <TextFont bold={true} style={{color:colors.textBlack[global.darkMode], marginLeft:15, fontSize: 20}}>{this.props.label}</TextFont>
          </View>
          <TextFont bold={true} style={{color:colors.textBlack[global.darkMode], marginLeft:10, fontSize: 23}}>{this.props.price}</TextFont>
        </View>
        {this.props.description ? <TextFont bold={true} style={{color:colors.textBlack[global.darkMode], marginLeft:45, fontSize: 13, marginTop: 3}}>{this.props.description}</TextFont> : <></>}
      </View>
    </TouchableNativeFeedback>
  }
}
