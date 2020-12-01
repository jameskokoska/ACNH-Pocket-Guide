import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont';
import ButtonComponent from './ButtonComponent';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

class LoadFile extends Component {
  componentDidMount() {
    
  }
  render(){
    return(
        <ButtonComponent
        style={{width: 200}}
        text={"Load Data"}
        color={"#2196F3"}
        vibrate={5}
        onPress={async () => {
          var document = await DocumentPicker.getDocumentAsync();
          console.log(document.uri);
          fetch(document.uri)
          .then( file => file.text() )
          .then( text => console.log(text) )
        }}/>
    )
  }
}

class ExportFile extends Component {
  componentDidMount() {
    
  }
  render(){
    return(
      <ButtonComponent
      style={{width: 200}}
      text={"Export Data"}
      color={"#2196F3"}
      vibrate={5}
      onPress={async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
          let fileUri = FileSystem.documentDirectory + "ACNHPocketGuideData.txt";
          await FileSystem.writeAsStringAsync(fileUri, "Test", { encoding: FileSystem.EncodingType.UTF8 });
          const asset = await MediaLibrary.createAssetAsync(fileUri)
          await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
      }}/>
    )
  }
}
export {LoadFile,ExportFile};