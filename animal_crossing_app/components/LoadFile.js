import React, {Component} from 'react';
import {Image, Vibration,StyleSheet, DrawerLayoutAndroid, View, Text,} from 'react-native';
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
      loadedNumber: 0,
    }
  }
  render(){
    return(
      <View>
        <Popup 
          ref={(loadPopup) => this.loadPopup = loadPopup}
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
              this.setState({loadedNumber:totalImport.length})
              console.log(global.collectionList)
            })
            this.loadPopupResults.setPopupVisible(true);
          }}
          text={"Import File"}
          textLower={"Please import ACNHPocketGuideData.txt from the downloads folder."}
        />
        <Popup 
          ref={(loadPopupResults) => this.loadPopupResults = loadPopupResults}
          button1={"OK"}
          button1Action={()=>{}}
          text={"Import Results"}
          textLower={"\nImported " + this.state.loadedNumber + " entires. \n\nNote: If this has imported 0 entires, please double check you have chosen the correct file."}
        />
        <ButtonComponent
          text={"Import Data"}
          color={colors.okButton[global.darkMode]}
          vibrate={5}
          onPress={() => {
            this.loadPopup.setPopupVisible(true);
        }}/>
      </View>
    )
  }
}

class ExportFile extends Component {
  constructor() {
    super()
    this.state = {
      message: "",
    }
  }
  render(){
    return(
      <View>
        <Popup 
          ref={(exportPopup) => this.exportPopup = exportPopup}
          button1={"OK"}
          button1Action={()=>{}}
          text={"Export Results"}
          textLower={this.state.message}
        />
        <ButtonComponent
          text={"Export Data"}
          color={colors.okButton[global.darkMode]}
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
              this.setState({message:"File exported to Downloads folder ACNHPocketGuideData.txt", title:"Backup Successful"});
              this.exportPopup.setPopupVisible(true);
            } else {
              this.setState({message:"Error backing up. Please enable the permissions and try again. Unfortunately Camera Permission may be required to write to local storage (using the Expo SDK). This permission can be disabled at any time. Sorry for the inconvenience."});
              this.exportPopup.setPopupVisible(true);
            }
          }}
        />
      </View>
    )
  }
}
export {LoadFile,ExportFile};