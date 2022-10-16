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
import {attemptToTranslate, getStorage, collectionListSave, loadGlobalData, setSettingsString, indexCollectionList, settings} from "../LoadJsonData"
import colors from "../Colors"
import {profileNames} from "../pages/ProfilesPage"
import { defaultToDoList, defaultTurnipList } from './TodoList';

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
            console.log("Loading file with URI: " + document.uri)
            this.popupWait?.setPopupVisible(true)
            if(document===undefined||document.uri===undefined){
              this.setState({loadedNumber:"\n\nFailed to load file. Please enable file permissions or ensure you selected a file and try again.\n\n"}) 
              this.popupWait?.setPopupVisible(false)
              this.loadPopupResults?.setPopupVisible(true);
              console.log("Failed to load backup file from storage - document not selected or undefined")
            } else {
              fetch(document.uri)
              .then( file => file.text() )
              .then( async (text) => {
                if(this.props.experimental===true){
                  var totalImported = await importAllDataExperimental(text)
                } else {
                  var totalImported = await importAllData(text)
                }
                if(this.props.experimental){
                  this.popupRestart?.setPopupVisible(true)
                }
                this.setState({loadedNumber:totalImported}) 
                console.log("Loaded file with results: " + totalImported)
                this.popupWait?.setPopupVisible(false)
                this.loadPopupResults?.setPopupVisible(true);
                
              })
            }
          }}
          text={"Import File"}
          textLower={"\n" + attemptToTranslate("Please import ACNHPocketGuideData.txt.") + (this.props.experimental?("\n\n"+attemptToTranslate("You need to select the file that has been exported using [Export All Data].")):"")}
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
          textLower={attemptToTranslate("Imported:") + " " + this.state.loadedNumber + " " + attemptToTranslate("entires.") + "\n\n" + attemptToTranslate("Note: If this has imported 0 entires, please double check you have chosen the correct file.") + "\n" + attemptToTranslate("You need to select the file that has been exported using [Export All Data].")}
        />
        <Popup 
          ref={(popupExperimental) => this.popupExperimental = popupExperimental}
          button1={"Cancel"}
          button1Action={()=>{}}
          button2={"OK"}
          button2Action={()=>{this.popupExperimental2?.setPopupVisible(true);}}
          text={"Warning!"}
          textLower={"Use at your own risk! Ensure you use a backup file that has not been tampered with. This may result in data loss or break the application. Reinstall if this occurs."}
        />
        <Popup 
          ref={(popupExperimental2) => this.popupExperimental2 = popupExperimental2}
          button1={"Cancel"}
          button1Action={()=>{}}
          button2={"OK"}
          button2Action={()=>{this.loadPopup?.setPopupVisible(true);}}
          textLower={"Importing all data will replace any current data, not merge!"}
        />
        <ButtonComponent
          text={this.props.experimental?"Import All Data":"Import Data"}
          color={colors.okButton3[global.darkMode]}
          vibrate={5}
          onPress={() => {
            if(this.props.experimental){
              this.popupExperimental?.setPopupVisible(true)
            } else {
              this.loadPopup?.setPopupVisible(true);
            }
        }}/>
        <Popup ref={(popupRestart) => this.popupRestart = popupRestart} text="Restart Required" textLower="Please restart the application."/>
      </View>
    )
  }
}

export async function importAllData(text){
  try{
    var totalImport = text.split("\n");
    var totalAchievements = [];
    var totalHHP = [];
    var totalCustomLists = [];
    var currentProfile = ""
    var currentCollectionList = (await getStorage("collectedString"+currentProfile,"")).split("\n");
    var currentAchievementsList = JSON.parse(await getStorage("Achievements"+profile,"[]"));
    var currentHHPList = JSON.parse(await getStorage("ParadisePlanning"+profile,"[]"));
    var currentCustomLists = JSON.parse(await getStorage("customLists"+global.profile,"[]"));

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
        } else if(key[1]==="CustomLists"){
          totalCustomLists.push(importEntry);
        } else {
          if(key[1]==="CustomListsAmount"){
            let list = JSON.parse(importEntry)
            let currentList = JSON.parse(await getStorage("collectionListIndexedAmount"+currentProfile,"{}"));
            let output = {...list, ...currentList};
            await AsyncStorage.setItem("collectionListIndexedAmount"+currentProfile, JSON.stringify(output));
            if(currentProfile===global.profile){
              global.collectionListIndexedAmount = output
            }
          }else if(key[1]==="CustomListsImages"){
            let list = JSON.parse(importEntry)
            let currentList = JSON.parse(await getStorage("customListsImagesIndexed"+currentProfile,"{}"));
            let output = {...list, ...currentList};
            await AsyncStorage.setItem("customListsImagesIndexed"+currentProfile, JSON.stringify(output));
            if(currentProfile===global.profile){
              global.customListsImagesIndexed = output
            }
          }else if(key[1]==="ToDoList"){
            //check to ensure data format correct
            let list = JSON.parse(importEntry)
            for(let item of list){
              if(item["title"]===undefined || item["finished"]===undefined || item["picture"]===undefined){
                throw("ToDoList item undefined attribute")
              }
            }
            let currentList = JSON.parse(await getStorage("ToDoList"+currentProfile,JSON.stringify(defaultToDoList())));
            let output = []
            for(let item of list){
              let isInCurrent = false
              for(let currentItem of currentList){
                if(item["title"]===currentItem["title"] && item["picture"]===currentItem["picture"]){
                  if(item["finished"]===true && currentItem["finished"]===false){
                    currentItem.finished = true
                  } else if (item["finished"]===false && currentItem["finished"]===true) {
                    currentItem.finished = false
                  }
                  isInCurrent = true
                }
              }
              if(!isInCurrent){
                output.push(item)
              }
            }
            output = [...currentList,...output]
            await AsyncStorage.setItem(key[1]+currentProfile, JSON.stringify(output));
          } else if(key[1]==="TurnipList"){
            //check to ensure data format correct
            let list = JSON.parse(importEntry)
            let checkTitles = ["Purchase","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
            for(let item of list){
              if(!checkTitles.includes(item["title"])){
                throw("TurnipList item undefined attribute 1")
              }
              if(item["title"]!=="Purchase"){
                if(item["am"]===undefined || item["pm"]===undefined){
                  throw("TurnipList item undefined attribute 2")
                }
              }
              if(item["title"]==="Purchase"){
                if(item["purchase"]===undefined){
                  throw("TurnipList item undefined attribute 3")
                }
              }
            }
            let currentList = JSON.parse(await getStorage("TurnipList"+currentProfile,JSON.stringify(defaultTurnipList())));
            for(let item of list){
              for(let currentItem of currentList){
                if(item["title"]===currentItem["title"]){
                  if(currentItem["am"]===""){
                    currentItem.am = item["am"]
                  } 
                  if(currentItem["pm"]===""){
                    currentItem.pm = item["pm"]
                  }
                  if(currentItem["purchase"]===""){
                    currentItem.purchase = item["purchase"]
                  }
                  break
                }
              }
            }
            await AsyncStorage.setItem(key[1]+currentProfile, JSON.stringify(currentList));
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
            } else if (key[1]==="settingsNorthernHemisphereSaved"&&currentProfile===global.profile) {
              setSettingsString("settingsNorthernHemisphere",importEntry);
            } else if (key[1]==="settingsUseCustomDateSaved"&&currentProfile===global.profile) {
              setSettingsString("settingsUseCustomDate",importEntry);
            } else if (key[1]==="customDateOffset"&&currentProfile===global.profile) {
              global.customTimeOffset=importEntry
            } else if (key[1]==="ordinance"&&currentProfile===global.profile) {
              global.ordinance=importEntry
            } else if (key[1]==="extraItemInfo"&&currentProfile===global.profile) {
              global.extraItemInfo=importEntry
            }
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
        await AsyncStorage.setItem("customLists"+currentProfile, JSON.stringify([...new Set([...totalCustomLists,...currentCustomLists])]));
        if(currentProfile===global.profile){
          global.customLists = [...new Set([...totalCustomLists,...currentCustomLists])]
        }
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

export async function getAllDataExperimental(){
  const keys = await AsyncStorage.getAllKeys()
  const items = await AsyncStorage.multiGet(keys)
  let out = JSON.stringify(["---ACNH Pocket Guide Backup All Data---",...items])
  return out
}

export async function importAllDataExperimental(text){
  try{
    if(!text.includes("---ACNH Pocket Guide Backup All Data---")){
      return attemptToTranslate("Wrong file, it seems you have not selected a backup that was created using [Export All Data]")
    }
    let input = JSON.parse(text)
    if(input[0]!=="---ACNH Pocket Guide Backup All Data---"){
      return attemptToTranslate("Wrong file, it seems you have not selected a backup that was created using [Export All Data]")
    }
    let totalCount = 0
    for(let pair of input){
      if(input==="---ACNH Pocket Guide Backup All Data---"){
        continue
      }
      totalCount = totalCount + 1
      await AsyncStorage.setItem(pair[0],pair[1])
      
    }
    return totalCount
  }catch(e){
    console.log("Error importing ALL ALL data: " + e)
    return 0
  }
}

export async function getAllData(){
  try{
    var dataTotal = "---ACNH Pocket Guide Backup---\n"
    for(var i = 0; i<profileNames.length; i++){
      let profile = profileNames[i]
      let data = await getStorage("collectedString"+profile,"");
      // data2 = uniq = [...new Set(data2)]
      // console.log("Achievements"+profile)
      // console.log(await getStorage("Achievements"+profile,"[]"))
      let data3 = "\n{name}" + (await getStorage("name"+profile,""))
      let data4 = "\n{islandName}" + (await getStorage("islandName"+profile,""))
      let data5 = "\n{dreamAddress}" + (await getStorage("dreamAddress"+profile,""))
      let data6 = "\n{friendCode}" + (await getStorage("friendCode"+profile,""))
      let data7 = "\n{creatorCode}" + (await getStorage("creatorCode"+profile,""))
      let data8 = "\n{HHPCode}" + (await getStorage("HHPCode"+profile,""))
      let data9 = "\n{selectedFruit}" + (await getStorage("selectedFruit"+profile,""))
      let data10 = "\n{settingsNorthernHemisphereSaved}" + (await getStorage("settingsNorthernHemisphereSaved"+profile,""))
      let data11 = "\n{settingsUseCustomDateSaved}" + (await getStorage("settingsUseCustomDateSaved"+profile,""))
      let data12 = "\n{Achievements}" + [...new Set(JSON.parse(await getStorage("Achievements"+profile,"[]")))].join("\n{Achievements}");
      let data13 = "\n{HHP}" + [...new Set(JSON.parse(await getStorage("ParadisePlanning"+profile,"[]")))].join("\n{HHP}");
      let data14 = "\n{ToDoList}" + (await getStorage("ToDoList"+profile,JSON.stringify(defaultToDoList())))
      let data15 = "\n{TurnipList}" + (await getStorage("TurnipList"+profile,JSON.stringify(defaultTurnipList())))
      let data16 = "\n{TurnipListLastPattern}" + (await getStorage("TurnipListLastPattern"+profile,"-1"))
      let data17 = "\n{TurnipListFirstTime}" + (await getStorage("TurnipListFirstTime"+profile,"false"))
      let data18 = "\n{customDateOffset}" + (await getStorage("customDateOffset"+profile,"0"))
      let data19 = "\n{showVillagersTalkList}" + (await getStorage("showVillagersTalkList"+profile,"false"))
      let data20 = "\n{CustomLists}" + [...new Set(JSON.parse(await getStorage("customLists"+profile,"[]")))].join("\n{CustomLists}");
      let data21 = "\n{CustomListsAmount}" + (await getStorage("collectionListIndexedAmount"+profile,JSON.stringify({})))
      let data22 = "\n{CustomListsImages}" + (await getStorage("customListsImagesIndexed"+profile,JSON.stringify({})))
      let data23 = "\n{ordinance}" + (await getStorage("ordinance"+profile,""))
      let data24 = "\n{extraItemInfo}" + (await getStorage("extraItemInfo"+profile,""))
      dataTotal = dataTotal + "{Profile}"+profile +"\n" + data + data3 + data4 + data5 + data6 + data7 + data8 + data9 + data10 + data11 + data12 + data13 + data14 + data15 + data16 + data17 + data18 + data19 + data20 + data21 + data22 + data23 + data24 + "\n" + "---END---" + "\n"
    }
    let settingsOutput = ""
    for(let setting of settings){
      let settingKey = setting["keyName"]
      if(settingKey!=="breaker")
        settingsOutput = settingsOutput + "\n{" + settingKey + "}" + (await getStorage(settingKey + profile,setting["defaultValue"]))
    }
    dataTotal = dataTotal + settingsOutput
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
          this.loadPopupResults?.setPopupVisible(true);
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
          checkFont={this.props.checkFont}
          darkMode={this.props.darkMode}
        />
        <ButtonComponent
          checkFont={this.props.checkFont}
          text={this.props.experimental?"Export All Data":(this.props.label?this.props.label:"Export Data")}
          color={this.props.color?this.props.color:colors.okButton2[global.darkMode]}
          vibrate={5}
          onPress={async () => {
            var dataTotal
            if(this.props.experimental===true){
              dataTotal = await getAllDataExperimental();
            } else {
              dataTotal = await getAllData();
            }
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
                this.setState({message:"Error backing up. Please enable the permissions and try again..."});
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