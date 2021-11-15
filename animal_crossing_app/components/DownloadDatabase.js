import React, {Component} from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import * as FileSystem from 'expo-file-system'
import TextFont from './TextFont';
import colors from "../Colors"
import { PopupRaw } from './Popup';
import { attemptToTranslate } from '../LoadJsonData';

export class DownloadDatabase extends Component {
  constructor(){
    super()
    this.state={downloadProgress:0}
  }
  startDownload = () => {
    this.downloadData()
    this.popupDownload?.setPopupVisible(true)
  }
  downloadData = async () => {
    let error = false; 
    for(let i = 0; i<Object.keys(this.props.generateJSONLinks).length; i++){
      const callback = (downloadProgress) => {
        const progress =
          downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite;
        this.setState({
          downloadProgress: progress, //showing in kilobytes
        });
      };
  
      const downloadResumable = FileSystem.createDownloadResumable(
        this.props.generateJSONLinks[Object.keys(this.props.generateJSONLinks)[i]],
        FileSystem.documentDirectory + Object.keys(this.props.generateJSONLinks)[i] + ".json",
        {},
        callback
      );
  
      try {
        const {uri} = await downloadResumable.downloadAsync();
        console.log("Finished downloading to ", uri);
      } catch (e) {
        console.log(e);
        error = true
        this.popupDownload?.setPopupText(attemptToTranslate("Please make sure you are connected to the internet and restart the application") + "\n" +  e)
        break;
      }
    }
    if(!error){
      console.log("Done downloading data!")
      this.popupDownload?.setPopupText(attemptToTranslate("Loading app..."))
      this.props.continueMountingFinish()
    }
  };

  render(){
    return <PopupRaw
      ref={(popupDownload) => this.popupDownload = popupDownload} 
      text={attemptToTranslate("Downloading Data...")}
      textLower={attemptToTranslate("This may take a few minutes and is only done once.")}
      textLower2={attemptToTranslate("Please wait") + "... " + (parseInt(this.state.downloadProgress*100)).toString()+"%"}
    />
  }
}