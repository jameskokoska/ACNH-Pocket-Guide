import * as Font from 'expo-font';
import React, {Component} from 'react';
import {Text} from 'react-native';

//<TextFont bold={true}>My text here</TextFont>

class TextFont extends Component {
  constructor(props){
    super(props);
    this.state={
      fontLoaded:false
    }
  }
  async componentDidMount(){
    await Font.loadAsync({
      "ArialRounded": require('../assets/fonts/arialRound.ttf'),
    });
    await Font.loadAsync({
      "ArialRoundedBold": require('../assets/fonts/arialRoundBold.ttf'),
    });
    this.setState({fontLoaded:true});
  }
  render(){
    if(this.state.fontLoaded){
      return <Text adjustsFontSizeToFit={this.props.adjustsFontSizeToFit} numberOfLines={this.props.numberOfLines} style={[this.props.style,{fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}]}>{this.props.children}</Text>
    } else {
      return <Text>Not loaded</Text>
    }
  }
}
export default TextFont;