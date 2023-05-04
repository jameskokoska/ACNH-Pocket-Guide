import React, {Component} from 'react';
import {View} from 'react-native';
import colors from "../Colors"

export default class PopupSeparator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasChildren: undefined,
    };
  }

  componentDidUpdate(prevProps){
    if(prevProps.children!=this.props.children){
      this.setState({hasChildren:undefined})
    }
  }

  handleLayout = event => {
    const { height } = event.nativeEvent.layout;
    this.setState({ hasChildren: height > 0 });
  };

  render() {
    const { hasChildren } = this.state;
    const { children } = this.props;
    
    if(hasChildren===undefined){
      return <View onLayout={this.handleLayout}>{this.props.children}</View>
    }
    return (
      <>
        {hasChildren ? (
          <View
            style={{
              backgroundColor: colors.lightDarkAccentTextBG[global.darkMode],
              padding: 8,
              paddingHorizontal: 10,
              marginHorizontal: -10,
              marginVertical: 5,
              borderRadius: 15,
            }}
          >
            {children}
          </View>
        ) : (
          <View />
        )}
      </>
    );
  }
}
