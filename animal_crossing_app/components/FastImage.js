import React, {Component } from 'react'
import {View, Image} from 'react-native'
import * as FileSystem from 'expo-file-system'
//Remade from: https://dev.to/dmitryame/implementing-fast-image-for-react-native-expo-apps-1dn3
import {getSettingsString} from "../LoadJsonData"

class FastImage extends Component{
  constructor(props){
    super(props);
    this.state = {
      imgURI:""
    }
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
      if(getSettingsString("settingsDownloadImages")==="true"){
        fileURI = `${FileSystem.documentDirectory}${cacheKey}`;
      }
      
      // Use the cached image if it exists
      const metadata = await FileSystem.getInfoAsync(fileURI)
      
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