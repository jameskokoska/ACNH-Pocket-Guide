import React, {Component} from 'react';
import {ScrollView, Text, View, Image} from 'react-native';
import TextFont from '../components/TextFont';
import colors from '../Colors'
import FadeInOut from "../components/FadeInOut";
import {SubHeader, MailLink} from "../components/Formattings"
export default class ErrorPage extends Component {

  render(){
    return <ScrollView>
      <FadeInOut fadeIn={true} duration={1000}>
        <View style={{alignItems:"center", justifyContent:"center",backgroundColor: colors.background[global.darkMode],}}>
          <Image style={{width: 200,zIndex:1,resizeMode:"contain"}} source={require("../assets/icons/loid.png")}/>
          <SubHeader style={{textAlign:"center"}}>Unfortunately this page isn't available right now or this information is not yet implemented.</SubHeader>
        </View>
        <View style={{height:50}}/>
        <MailLink/>
        <View style={{height:50}}/>
      </FadeInOut>
    </ScrollView>
  }
}
