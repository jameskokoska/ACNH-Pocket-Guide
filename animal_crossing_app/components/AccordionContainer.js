import React, {Component} from 'react';
import {Dimensions, Image, View, Text} from 'react-native';
import colors from "../Colors"
import CachedImage from 'react-native-expo-cached-image';
import Accordion from 'react-native-collapsible/Accordion';
import TextFont from './TextFont'
import ButtonComponent from './ButtonComponent'

class AccordionContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeSections: [],
    };
  }

  renderHeader = section => {
    return (
      <View style={{marginHorizontal:Dimensions.get('window').width*0.2, paddingLeft: 10, paddingRight: 10, paddingTop: 6, paddingBottom: 6, borderRadius: 7, backgroundColor: colors.okButtonFaint[global.darkMode],  justifyContent: 'center', alignItems: 'center'}}>
        <TextFont style={{fontSize:17, color: colors.textBlack[global.darkMode]}}>{section.title}</TextFont>
      </View>
    );
  };

  renderContent = section => {
    return (
      <View style={{borderRadius:10, backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode], marginVertical: 5, alignItems: 'center', width: Dimensions.get('window').width, justifyContent:"center"}}>
        <CachedImage
          style={{width: Dimensions.get('window').width-Dimensions.get('window').width*section.widthSubtraction, height:section.height, marginTop: section.marginTop, marginBottom: section.marginBottom, resizeMode: "contain", borderRadius: 2}}
          source={{
            uri: this.props.item[section.image],
          }}
        />
      </View>
    );
  };

  updateSections = activeSections => {
    this.setState({ activeSections });
  };
  render(){
    return <View style={{width: "100%", alignItems: "center"}}>
      <View style={{height:20}}/>
      <Accordion
        sections={this.props.sections}
        activeSections={this.state.activeSections}
        renderHeader={this.renderHeader}
        renderContent={this.renderContent}
        onChange={this.updateSections}
        sectionContainerStyle={{margin:3}}
        underlayColor={"#0000000"}
      />
    </View>
  }
}
export default AccordionContainer ;