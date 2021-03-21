import * as Font from 'expo-font';
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
    var prefix = this.props.prefix === undefined ? "" : this.props.prefix;
    var suffix = this.props.suffix === undefined ? "" : this.props.suffix;
    return <Text adjustsFontSizeToFit={this.props.adjustsFontSizeToFit} numberOfLines={this.props.numberOfLines} style={[this.props.style,{fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}]}>{prefix+text+suffix}</Text>
  }
}
export default TextFont;