import React, {Component} from 'react';
import {Image, Vibration,StyleSheet, DrawerLayoutAndroid, View, Text,Clipboard} from 'react-native';
import TextFont from './TextFont';
import ButtonComponent from './ButtonComponent';
import Popup from './Popup';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {attemptToTranslate, getStorage, collectionListSave, loadGlobalData, setSettingsString} from "../LoadJsonData"
import colors from "../Colors"
import {profileNames} from "../pages/ProfilesPage"

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
            .then( async (text) => {
              var totalImported = await importAllData(text)
              this.setState({loadedNumber:totalImported}) 
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

async function importAllData(text){
  var totalImport = text.split("\n");
  var totalAchievements = [];
  var currentProfile = ""
  var currentCollectionList = (await getStorage("collectedString"+currentProfile,"")).split("\n");

  for(var i = 0; i<totalImport.length; i++){
    if(totalImport[i].includes("{") && totalImport[i].includes("}")){
      var key = totalImport[i].match(/\{(.*?)\}/);
      var importEntry = totalImport[i].replace(key[0],"")
      if(importEntry==="" || importEntry==="\n" || totalImport[i]==="\n"){
        continue;
      }else if(key[1]==="Profile"){
        currentProfile = importEntry
        currentCollectionList = (await getStorage("collectedString"+currentProfile,"")).split("\n");
      } else if(key[1]==="Achievements"){
        totalAchievements.push(importEntry);
      } else {
        await AsyncStorage.setItem(key[1]+currentProfile, importEntry);
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
    } else if (totalImport[i]!=="---END---"){
      var exists = false;
      for(var j = 0; j<currentCollectionList.length; j++){
        if(currentCollectionList[j]===totalImport[i]){
          exists=true;
        }
      }
      if(exists===false){
        currentCollectionList.push(totalImport[i]);
      }
    }
    if(totalImport[i]==="---END---" || i+1===totalImport.length){
      await AsyncStorage.setItem("Achievements"+currentProfile, JSON.stringify(totalAchievements));
      var outputString = "";
      for(var x = 0; x<currentCollectionList.length; x++){
        outputString += currentCollectionList[x];
        outputString += "\n";
      }
      await AsyncStorage.setItem("collectedString"+currentProfile, outputString);
    }
  }
  global.collectionList = (await getStorage("collectedString"+global.profile,"")).split("\n");
  return totalImport.length
}

async function getAllData(){
  var dataTotal = ""
  for(var i = 0; i<profileNames.length; i++){
    var profile = profileNames[i]
    var data = await getStorage("collectedString"+profile,"");
    var data2 = "\n{Achievements}" + JSON.parse(await getStorage("Achievements"+profile,"[]")).join("\n{Achievements}");
    var data3 = "\n{name}" + (await getStorage("name"+profile,""))
    var data4 = "\n{islandName}" + (await getStorage("islandName"+profile,""))
    var data5 = "\n{dreamAddress}" + (await getStorage("dreamAddress"+profile,""))
    var data6 = "\n{friendCode}" + (await getStorage("friendCode"+profile,""))
    var data7 = "\n{selectedFruit}" + (await getStorage("selectedFruit"+profile,""))
    var data8 = "\n{settingsNorthernHemisphere}" + (await getStorage("settingsNorthernHemisphere"+profile,""))
    dataTotal = dataTotal + "{Profile}"+profile +"\n" + data + data2 + data3 + data4 + data5 + data6 + data7 + data8 + "\n" + "---END---" + "\n"
  }
  console.log(dataTotal.replace(/^\s*\n/gm, ""))
  return dataTotal.replace(/^\s*\n/gm, "") 
}

class LoadClipboard extends Component {
  constructor() {
    super()
    this.state = {
      loadedNumber: 0,
    }
  }
  render(){
    return(
      <>
      <Popup 
        ref={(loadPopupResults) => this.loadPopupResults = loadPopupResults}
        button1={"OK"}
        button1Action={()=>{}}
        text={"Import Results"}
        textLower={attemptToTranslate("Imported:") + " " + this.state.loadedNumber + " " + attemptToTranslate("entires.") + "\n\n" + attemptToTranslate("Note: If this has imported 0 entires, please double check you have copied the correct contents created from exporting to clipboard.")}
      />
      <ButtonComponent
        text={"Import Data from Clipboard"}
        color={colors.okButton[global.darkMode]}
        vibrate={5}
        onPress={async () => {
          const text = await Clipboard.getString();
          var totalImported = await importAllData(text);
          this.setState({loadedNumber:totalImported}) 
          this.loadPopupResults.setPopupVisible(true);
        }}
      />
      </>
    )
  }
}

class ExportClipboard extends Component {
  render(){
    return(
      <>
        <Popup 
          ref={(exportPopup) => this.exportPopup = exportPopup}
          button1={"OK"}
          button1Action={()=>{}}
          text={"Data is copied to your clipboard"}
          textLower={"Paste it somewhere safe"}
        />
        <ButtonComponent
          text={"Export Data to Clipboard"}
          color={colors.okButton[global.darkMode]}
          vibrate={5}
          onPress={async () => {
            var dataTotal = await getAllData();
            Clipboard.setString(dataTotal);
            this.exportPopup?.setPopupVisible(true);
          }}
        />
      </>
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
          textLower={this.state.message + "\n\n" + attemptToTranslate("If you are using Android version 11 or above, this may not work. Please use the Clipboard backing up options below. Sorry for the inconvenience.")}
        />
        <ButtonComponent
          text={"Export Data"}
          color={colors.okButton[global.darkMode]}
          vibrate={5}
          onPress={async () => {
            var dataTotal = await getAllData();
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
export {LoadFile,ExportFile, ExportClipboard, LoadClipboard};