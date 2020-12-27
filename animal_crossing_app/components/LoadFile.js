import React, {Component} from 'react';
import {Image, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont';
import ButtonComponent from './ButtonComponent';
import Popup from './Popup';
import * as DocumentPicker from 'expo-document-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStorage, collectionListSave, loadGlobalData} from "../LoadJsonData"
import colors from "../Colors"

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
            .then( (text) => {
              var totalImport = text.split("\n");
              for(var i = 0; i<totalImport.length; i++){
                var exists = false;
                for(var j = 0; j<global.collectionList.length; j++){
                  if(global.collectionList[j]===totalImport[i]){
                    exists=true;
                  }
                }
                if(exists===false){
                  global.collectionList.push(totalImport[i]);
                }
              }
              collectionListSave();
              loadGlobalData();
              console.log(global.collectionList)
            })
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
          text={"Load Data"}
          color={colors.okButton[colors.mode]}
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
        text={"Export Data"}
        color={colors.okButton[colors.mode]}
        vibrate={5}
        onPress={async () => {
          var data = await getStorage("collectedString","");
          console.log(data)
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status === "granted") {
            var fileUri = FileSystem.documentDirectory + "ACNHPocketGuideData.txt";
            await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
            this.setState({open:!this.state.open, message:"File exported to Downloads folder ACNHPocketGuideData.txt", title:"Backup Successful"});
          } else {
            this.setState({open:!this.state.open, message:"Error backing up. Please enable the permissions and try again. Unfortunately Camera Permission is required to write to local storage (using the Expo SDK). This permission can be disabled at any time. Sorry for the inconvenience.", title:"Backup Error"});
          }

        }}/>
      </View>
    )
  }
}
export {LoadFile,ExportFile};