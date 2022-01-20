import React, {Component} from 'react';
import {Share, Image, Vibration,StyleSheet, DrawerLayoutAndroid, View, Text,Clipboard} from 'react-native';
import TextFont from './TextFont';
import ButtonComponent from './ButtonComponent';
import Popup from './Popup';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { StorageAccessFramework } from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {attemptToTranslate, getStorage, collectionListSave, loadGlobalData, setSettingsString, indexCollectionList} from "../LoadJsonData"
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
            this.popupWait.setPopupVisible(true)
            fetch(document.uri)
            .then( file => file.text() )
            .then( async (text) => {
              var totalImported = await importAllData(text)
              this.setState({loadedNumber:totalImported}) 
              this.popupWait.setPopupVisible(false)
              this.loadPopupResults?.setPopupVisible(true);
            })
          }}
          text={"Import File"}
          textLower={"\n" + attemptToTranslate("Please import ACNHPocketGuideData.txt.")}
        />
        <Popup 
          ref={(popupWait) => this.popupWait = popupWait}
          button1Action={()=>{}}
          text={"Importing..."}
          textLower={"Please wait"}
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
          color={colors.okButton3[global.darkMode]}
          vibrate={5}
          onPress={() => {
            this.loadPopup?.setPopupVisible(true);
        }}/>
      </View>
    )
  }
}

export async function importAllData(text){
  try{
    var totalImport = text.split("\n");
    var totalAchievements = [];
    var totalHHP = [];
    var currentProfile = ""
    var currentCollectionList = (await getStorage("collectedString"+currentProfile,"")).split("\n");
    var currentAchievementsList = JSON.parse(await getStorage("Achievements"+profile,"[]"));
    var currentHHPList = JSON.parse(await getStorage("ParadisePlanning"+profile,"[]"));

    for(var i = 0; i<totalImport.length; i++){
      if(totalImport[i].includes("{") && totalImport[i].includes("}")){
        var key = totalImport[i].match(/\{(.*?)\}/);
        var importEntry = totalImport[i].replace(key[0],"")
        if(importEntry==="" || importEntry==="\n" || totalImport[i]==="\n" || totalImport[i]==="---ACNH Pocket Guide Backup---"){
          continue;
        }else if(key[1]==="Profile"){
          currentProfile = importEntry
          currentCollectionList = (await getStorage("collectedString"+currentProfile,"")).split("\n");
          currentAchievementsList = JSON.parse(await getStorage("Achievements"+profile,"[]"));
        } else if(key[1]==="Achievements"){
          totalAchievements.push(importEntry);
        } else if(key[1]==="HHP"){
          totalHHP.push(importEntry);
        } else {
          await AsyncStorage.setItem(key[1]+currentProfile, importEntry);
          if(key[1]==="name"&&currentProfile===global.profile){
            global.name=importEntry
          } else if(key[1]==="islandName"&&currentProfile===global.profile) {
            global.islandName=importEntry
          } else if (key[1]==="dreamAddress"&&currentProfile===global.profile) {
            global.dreamAddress=importEntry
          } else if (key[1]==="friendCode"&&currentProfile===global.profile) {
            global.friendCode=importEntry
          } else if (key[1]==="creatorCode"&&currentProfile===global.profile) {
            global.creatorCode=importEntry
          } else if (key[1]==="HHPCode"&&currentProfile===global.profile) {
            global.HHPCode=importEntry
          } else if (key[1]==="selectedFruit"&&currentProfile===global.profile) {
            global.selectedFruit=importEntry
          } else if (key[1]==="settingsNorthernHemisphere"&&currentProfile===global.profile) {
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
        await AsyncStorage.setItem("Achievements"+currentProfile, JSON.stringify([...new Set([...totalAchievements,...currentAchievementsList])]));
        await AsyncStorage.setItem("ParadisePlanning"+currentProfile, JSON.stringify([...new Set([...totalHHP,...currentHHPList])]));
        var outputString = "";
        for(var x = 0; x<currentCollectionList.length; x++){
          outputString += currentCollectionList[x];
          outputString += "\n";
        }
        await AsyncStorage.setItem("collectedString"+currentProfile, outputString);
        totalAchievements = []
      }
    }
    global.collectionList = (await getStorage("collectedString"+global.profile,"")).split("\n");
    global.collectionListIndexed = indexCollectionList(global.collectionList)
    return totalImport.length
  }catch(error){
    console.log("Error importing all data: "+error)
    return 0
  }
}

export async function getAllData(){
  try{
    var dataTotal = "---ACNH Pocket Guide Backup---\n"
    for(var i = 0; i<profileNames.length; i++){
      var profile = profileNames[i]
      var data = await getStorage("collectedString"+profile,"");
    
      // data2 = uniq = [...new Set(data2)]
      // console.log("Achievements"+profile)
      // console.log(await getStorage("Achievements"+profile,"[]"))
      var data3 = "\n{name}" + (await getStorage("name"+profile,""))
      var data4 = "\n{islandName}" + (await getStorage("islandName"+profile,""))
      var data5 = "\n{dreamAddress}" + (await getStorage("dreamAddress"+profile,""))
      var data6 = "\n{friendCode}" + (await getStorage("friendCode"+profile,""))
      var data7 = "\n{creatorCode}" + (await getStorage("creatorCode"+profile,""))
      var data8 = "\n{HHPCode}" + (await getStorage("HHPCode"+profile,""))
      var data9 = "\n{selectedFruit}" + (await getStorage("selectedFruit"+profile,""))
      var data10 = "\n{settingsNorthernHemisphere}" + (await getStorage("settingsNorthernHemisphere"+profile,""))
      var data11 = "\n{Achievements}" + [...new Set(JSON.parse(await getStorage("Achievements"+profile,"[]")))].join("\n{Achievements}");
      var data12 = "\n{HHP}" + [...new Set(JSON.parse(await getStorage("ParadisePlanning"+profile,"[]")))].join("\n{HHP}");
      dataTotal = dataTotal + "{Profile}"+profile +"\n" + data + data3 + data4 + data5 + data6 + data7 + data8 + data9 + data10 + data11 + data12 + "\n" + "---END---" + "\n"
    }
    // console.log(dataTotal.replace(/^\s*\n/gm, ""))
    return dataTotal.replace(/^\s*\n/gm, "")
  }catch(error){
    console.log("Error getting all data: "+error)
    return ""
  }
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
        color={colors.okButton3[global.darkMode]}
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
          color={colors.okButton2[global.darkMode]}
          vibrate={5}
          onPress={async () => {
            var dataTotal = await getAllData();
            if(dataTotal==="" || dataTotal===false || dataTotal===undefined){
              console.log("Backup error. dataTotal appears to be undefined when exporting to clipboard.")
            } else {
              await Share.share({
                message: dataTotal,
              });
            }
            // Clipboard.setString(dataTotal);
            // this.exportPopup?.setPopupVisible(true);
            
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
          textLower={this.state.message}
        />
        <ButtonComponent
          text={"Export Data"}
          color={colors.okButton2[global.darkMode]}
          vibrate={5}
          onPress={async () => {
            var dataTotal = await getAllData();
            if(dataTotal==="" || dataTotal===false || dataTotal===undefined){
              console.log("Backup error. dataTotal appears to be undefined when exporting to file.")
            } else {
              console.log(dataTotal)
              const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
              if (permissions.granted) {
                try{
                  const uri = permissions.directoryUri;
                  this.setState({message:attemptToTranslate("Please wait")});
                  this.exportPopup?.setPopupVisible(false);
                  var filePath = await StorageAccessFramework.createFileAsync(uri, "ACNHPocketGuideData.txt", "txt")
                  await StorageAccessFramework.writeAsStringAsync(filePath, dataTotal, { encoding: FileSystem.EncodingType.UTF8 });
                  this.setState({message:"\n"+attemptToTranslate("File exported to") + "\n\n" + filePath, title:"Backup Successful"});
                  this.exportPopup?.setPopupVisible(true);
                } catch {
                  this.setState({message:"An error occurred, please choose another folder and try again."});
                  this.exportPopup?.setPopupVisible(true);
                }
              } else {
                this.setState({message:"Error backing up. Please enable the permissions and try again."});
                this.exportPopup?.setPopupVisible(true);
              }
            }
          }}
        />
      </View>
    )
  }
}
export {LoadFile,ExportFile, ExportClipboard, LoadClipboard};