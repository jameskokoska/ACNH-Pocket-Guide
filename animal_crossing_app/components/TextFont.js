import * as Font from 'expo-font';
import { isLoaded } from 'expo-font';
import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import {attemptToTranslate} from '../LoadJsonData';

//<TextFont bold={true}>My text here</TextFont>

class TextFont extends PureComponent {
  constructor(props){
    super(props);
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }
  render(){
    var text;
    if(this.props.translate===false){
      text = this.props.children;
    } else {
      text = attemptToTranslate(this.props.children);
    }
    let fontLoaded = this.props.checkFont===true ? isLoaded("ArialRoundedBold") : true
    let fontFamilyStyles = {}
    if(fontLoaded){
      fontFamilyStyles = {fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}
    }
    var prefix = this.props.prefix === undefined ? "" : this.props.prefix;
    var suffix = this.props.suffix === undefined ? "" : this.props.suffix;
    return <Text adjustsFontSizeToFit={this.props.adjustsFontSizeToFit} numberOfLines={this.props.numberOfLines!==undefined?this.props.numberOfLines:2000} style={[this.props.style,fontFamilyStyles]}>{prefix+text+suffix}</Text>
  }
}
export default TextFont;