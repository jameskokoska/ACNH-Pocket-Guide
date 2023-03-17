import React, { Component } from 'react';
import { View, Animated } from 'react-native';

export class AnimatedPopupWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: this.props.disableAnimations===true ? undefined : new Animated.Value(0)
    }
  }

  componentDidMount(){
    if(this.state.animation!==undefined){
      Animated.spring(this.state.animation, {
        toValue: 1,
        useNativeDriver: true,
        speed: global.reducedMotion ? 100000000 : 10,
      }).start()
    }
  }
  
  renderModal = () => {
    return (
      <Animated.View style={[this.props.style,{
        opacity: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        }),
        transform:[
          {
            scale: this.state.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1]
            })
          }
        ]
      }
      ]}>
        {this.props.children}
      </Animated.View>
    )
  }
  
  render() {
    if(this.props.disableAnimations===true || this.state.animation===undefined){
      return <View style={this.props.style}>
        {this.props.children}
      </View>
    } else {
      return (
        this.renderModal()
      );
    }
  }
}