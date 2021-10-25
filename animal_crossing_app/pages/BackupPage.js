import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import FirebaseBackup from '../components/FirebaseBackup';
import {SubHeader, HeaderNote, MailLink, Header} from "../components/Formattings"
import {ExportFile, LoadFile, ExportClipboard, LoadClipboard} from '../components/LoadFile';
import SettingsContainer from '../components/SettingsContainer';
import colors from "../Colors"
import ToggleSwitch from 'toggle-switch-react-native'
import { getSettingsString, setSettingsString } from '../LoadJsonData';
import TextFont from '../components/TextFont';

class BackupPage extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <>
        <ScrollView>
          <View style={{marginTop: 100}}/>
          <Header>Manage Data</Header>
          <HeaderNote>It is always good to keep periodic backups of your data!</HeaderNote>
          <View style={{height: 55}}/>
          <SubHeader>Cloud Backup</SubHeader>
          <HeaderNote>(Recommended)</HeaderNote>
          <HeaderNote>Your email is only used as a Username and to verify identity for a lost password.</HeaderNote>
          <View style={{height: 15}}/>
          <FirebaseBackup/>
          <AutoBackupSwitch/>
          <View style={{height: 35}}/>
          <SubHeader>Files</SubHeader>
          <View style={{paddingHorizontal:40}}>
            <ExportFile/>
            <LoadFile/>
          </View>
          <View style={{height: 60}}/>
          <SubHeader>Clipboard</SubHeader>
          <View style={{paddingHorizontal:40}}>
            <ExportClipboard/>
            <LoadClipboard/>
          </View>
          <View style={{height: 100}}/>
          <MailLink/>
          <View style={{height: 100}}/>
        </ScrollView>
      </>
    )
  }
}
export default BackupPage;


class AutoBackupSwitch extends Component{
  constructor(props){
    super(props)
    this.state={value:false}
  }
  componentDidMount(){
    (getSettingsString("settingsAutoBackup")==="true") ? this.setState({value:true}):this.setState({value:false});
  }
  toggleSetting = () => {
    setSettingsString("settingsAutoBackup", !this.state.value?"true":"false")
    this.setState({value:!this.state.value})
  }
  render(){
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={() => {this.toggleSetting()}}>
        <View style={{paddingVertical: 10, paddingHorizontal:5, flexDirection:"row",flex:1,alignItems: 'center',marginHorizontal: 10, borderRadius: 10,backgroundColor:colors.white[global.darkMode]}}>
          <View style={{marginHorizontal: 10,padding:5}}>
            <TextFont bold={true} style={{fontSize: 18, marginRight: 65,color:colors.textBlack[global.darkMode]}}>{"Auto backups"}</TextFont>
            <TextFont style={{fontSize: 13, marginRight: 65,color:colors.textBlack[global.darkMode]}}>{"Once your credentials are remembered on the backup page, automatic backups will occur every time you open the application and are connected to the internet. Auto backups overwrite what is currently backed up in the cloud!"}</TextFont>
          </View>
          <View style={{position:"absolute", right: 8, transform: [{ scale: 0.75 }]}}>
            <ToggleSwitch
              isOn={this.state.value}
              onColor="#57b849"
              offColor="#DFDFDF"
              size="large"
              onToggle={() => {this.toggleSetting()}}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}