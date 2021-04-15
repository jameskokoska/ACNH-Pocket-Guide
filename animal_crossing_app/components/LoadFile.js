import React, {Component} from 'react';
import {Image, Vibration,StyleSheet, DrawerLayoutAndroid, View, Text,} from 'react-native';
import TextFont from './TextFont';
import ButtonComponent from './ButtonComponent';
import Popup from './Popup';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {attemptToTranslate, getStorage, collectionListSave, loadGlobalData, setSettingsString} from "../LoadJsonData"
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
              var totalAchievements = [];
              for(var i = 0; i<totalImport.length; i++){
                if(totalImport[i].includes("{") && totalImport[i].includes("}")){
                  var key = totalImport[i].match(/\{(.*?)\}/);
                  var importEntry = totalImport[i].replace(key[0],"")
                  if(key[1]==="Achievements"){
                    totalAchievements.push(importEntry);
                  } else {
                    AsyncStorage.setItem(key[1], importEntry);
                    if(key[1]==="name"){
                      global.name=importEntry
                    } else if(key[1]==="islandName") {
                      global.islandName=importEntry
                    } else if (key[1]==="dreamAddress") {
                      global.dreamAddress=importEntry
                    } else if (key[1]==="friendCode") {
                      global.friendCode=importEntry
                    } else if (key[1]==="selectedFruit") {
                      global.selectedFruit=importEntry
                    } else if (key[1]==="settingsNorthernHemisphere") {
                      setSettingsString("settingsNorthernHemisphere",importEntry);
                    }
                  }
                } else {
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
              }
              collectionListSave();
              loadGlobalData();
              this.setState({loadedNumber:totalImport.length})
              console.log(totalAchievements)
              console.log(global.collectionList)
              AsyncStorage.setItem("Achievements", JSON.stringify(totalAchievements));
            })
            this.loadPopupResults.setPopupVisible(true);
          }}
          text={"Import File"}
          textLower={"\n" + attemptToTranslate("Please import ACNHPocketGuideData.txt.")+ "\n\n" + attemptToTranslate("The default location is:") + "\n\n" + "Pictures/ACNHPocketGuide/ACNHPocketGuideData.txt"}
        />
        <Popup 
          ref={(loadPopupResults) => this.loadPopupResults = loadPopupResults}
          button1={"OK"}
          button1Action={()=>{}}
          text={"Import Results"}
          textLower={attemptToTranslate("Imported:") + " " + this.state.loadedNumber + " " + attemptToTranslate("entires.") + "\n\n" + attemptToTranslate("Note: If this has imported 0 entires, please double check you have chosen the correct file.")}
        />
        <ButtonComponent
          text={"Import Data"}
          color={colors.okButton[global.darkMode]}
          vibrate={5}
          onPress={() => {
            this.loadPopup?.setPopupVisible(true);
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
            var data2 = "\n{Achievements}" + JSON.parse(await getStorage("Achievements","[]")).join("\n{Achievements}");
            var data3 = "\n{name}" + (await getStorage("name",""))
            var data4 = "\n{islandName}" + (await getStorage("islandName",""))
            var data5 = "\n{dreamAddress}" + (await getStorage("dreamAddress",""))
            var data6 = "\n{friendCode}" + (await getStorage("friendCode",""))
            var data7 = "\n{selectedFruit}" + (await getStorage("selectedFruit",""))
            var data8 = "\n{settingsNorthernHemisphere}" + (await getStorage("settingsNorthernHemisphere",""))
            var dataTotal = data + data2 + data3 + data4 + data5 + data6 + data7 + data8
            console.log(dataTotal)
            const res = await MediaLibrary.requestPermissionsAsync();
            if (res.granted) {
              var fileUri = FileSystem.documentDirectory + "ACNHPocketGuideData.txt";
              await FileSystem.writeAsStringAsync(fileUri, dataTotal, { encoding: FileSystem.EncodingType.UTF8 });
              const asset = await MediaLibrary.createAssetAsync(fileUri)
              await MediaLibrary.createAlbumAsync("ACNHPocketGuide", asset, false)
              this.setState({message:"\n"+attemptToTranslate("File exported to") + "\n\n" + "Pictures/ACNHPocketGuide/ACNHPocketGuideData.txt", title:"Backup Successful"});
              this.exportPopup?.setPopupVisible(true);
            } else {
              this.setState({message:"Error backing up. Please enable the permissions and try again."});
              this.exportPopup?.setPopupVisible(true);
            }
          }}
        />
      </View>
    )
  }
}
export {LoadFile,ExportFile};