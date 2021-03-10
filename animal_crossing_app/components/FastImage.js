import React, {Component } from 'react'

import {View, Image } from 'react-native'

import * as FileSystem from 'expo-file-system'

import PropTypes from 'prop-types'

class FastImage extends Component{
  constructor(props){
    super(props);
    this.state = {
      imgURI:""
    }
    // const { source: { uri }, cacheKey } = props
  }
  componentDidUpdate(prevProps){
    if(prevProps.source.uri!==this.props.source.uri)
      this.getImage();
  }
  async componentDidMount(){
    this.mounted = true;
    this.getImage();
  }

  getImage = async () => {
    var cacheKey = this.props.cacheKey.replace("https://","");
    cacheKey = cacheKey.replace(/\\|\//g,"");
    cacheKey = cacheKey.replace(".png","");
    cacheKey = cacheKey.replace(".jpg","");
    cacheKey = cacheKey.replace(".com","");

    try {
      var fileURI = `${FileSystem.cacheDirectory}${cacheKey}`;
      // Use the cached image if it exists
      const metadata = await FileSystem.getInfoAsync(fileURI)
      
      await FileSystem.downloadAsync(
        this.props.source.uri,
        fileURI
      )
      if (!metadata.exists) {
        // download to cache
        if (this.mounted) {
          await FileSystem.downloadAsync(
            this.props.source.uri,
            fileURI
          )
        }
      }
      if (this.mounted) {
        this.setState({imgURI:fileURI})
      }
    } catch (err) {
      this.setState({imgURI:this.props.source.uri})
    }
  }

  componentWillUnmount(){
    this.mounted=false;
  }

  render(){
    if(this.state.imgURI!==""&&this.mounted){
      return (
        <Image
          {...this.props}
          source={{
            uri: this.state.imgURI,
          }}
        />
      )
    } else {
      return(
        <View {...this.props}/>
      )
    }
    
  }
}

// FastImage.propTypes = {
//   source: PropTypes.object.isRequired,
//   cacheKey: PropTypes.string.isRequired,
// }

export default FastImage