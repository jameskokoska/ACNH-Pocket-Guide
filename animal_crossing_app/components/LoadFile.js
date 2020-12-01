import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont';
import ButtonComponent from './ButtonComponent';
import Popup from './Popup';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

class LoadFile extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      openResult: false,
    }
  }
  render(){
    return(
      <View>
        <Popup 
          button1={"OK"}
          button1Action={async ()=>{
            var document = await DocumentPicker.getDocumentAsync();
            console.log(document.uri);
            fetch(document.uri)
            .then( file => file.text() )
            .then( text => console.log(text) )
            this.setState({openResult:!this.state.openResult});
          }}
          popupVisible={this.state.open} 
          close={() => this.setState({open:!this.state.open})}
          text={"Import File"}
          textLower={"Please import \nACNHPocketGuideData.txt\n from the downloads folder."}
        />
        <Popup 
          button1={"OK"}
          button1Action={()=>{}}
          popupVisible={this.state.openResult} 
          close={() => this.setState({openResult:!this.state.openResult})}
          text={"Imported Successful"}
          textLower={"\nSuccessfully imported X entires. \n\nNote: If this has imported 0 entires, please double check you have chosen the correct file."}
        />
        <ButtonComponent
          style={{width: 200}}
          text={"Load Data"}
          color={"#2196F3"}
          vibrate={5}
          onPress={() => {
            this.setState({open:!this.state.open});
        }}/>
      </View>
    )
  }
}

class ExportFile extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }
  render(){
    return(
      <View>
        <Popup 
          button1={"OK"}
          button1Action={()=>{}}
          popupVisible={this.state.open} 
          close={() => this.setState({open:!this.state.open})}
          text={this.state.title}
          textLower={this.state.message}
        />
        <ButtonComponent
        style={{width: 200}}
        text={"Export Data"}
        color={"#2196F3"}
        vibrate={5}
        onPress={async () => {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status === "granted") {
            var fileUri = FileSystem.documentDirectory + "ACNHPocketGuideData.txt";
            await FileSystem.writeAsStringAsync(fileUri, "Test", { encoding: FileSystem.EncodingType.UTF8 });
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
            this.setState({open:!this.state.open, message:"File exported to Downloads folder ACNHPocketGuideData.txt", title:"Backup Successful"});
          } else {
            this.setState({open:!this.state.open, message:"Error backing up. Please enable the permissions and try again.", title:"Backup Error"});
          }

        }}/>
      </View>
    )
  }
}
export {LoadFile,ExportFile};