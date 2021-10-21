import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Image} from 'react-native';
import colors from '../Colors.js';
import TextFont from '../components/TextFont'
import {SubHeader, Paragraph, Header} from "../components/Formattings"
import { getPhoto } from '../components/GetPhoto.js';

export default class OrdinancePage extends Component {
  render(){
    var data = require("../assets/data/ordinances.json");

    return(<ScrollView>
      <View style={{marginTop: 100}}/>
      <Header>Ordinances</Header>
      <View style={{marginTop: 10}}/>
      {data.map((item, index)=>{
        return <View key={item.name + toString(index)} style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
          <View style={{flexDirection: "row"}}>
          <Image source={getPhoto(item.image)} style={{width: 25, height: 25, resizeMode:"contain", marginLeft: 30, marginRight: 10}}/>
            <SubHeader margin={false}>{item.title}</SubHeader>
          </View>
          <Paragraph><TextFont>{item.description}</TextFont></Paragraph>
        </View>
      })}
      <View style={{marginTop: 100}}/>
      </ScrollView>
    )
  }
}
