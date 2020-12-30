import * as Font from 'expo-font';
import React, {PureComponent} from 'react';
import {Text} from 'react-native';

//<TextFont bold={true}>My text here</TextFont>

class TextFont extends PureComponent {
  constructor(props){
    super(props);
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }
  render(){
    return <Text adjustsFontSizeToFit={this.props.adjustsFontSizeToFit} numberOfLines={this.props.numberOfLines} style={[this.props.style,{fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}]}>{this.props.children}</Text>
  }
}
export default TextFont;