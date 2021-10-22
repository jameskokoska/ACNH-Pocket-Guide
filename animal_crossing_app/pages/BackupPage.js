import React, {Component} from 'react';
import {ScrollView, View,} from 'react-native';
import FirebaseBackup from '../components/FirebaseBackup';
import {SubHeader, HeaderNote, MailLink, Header} from "../components/Formattings"
import {ExportFile, LoadFile, ExportClipboard, LoadClipboard} from '../components/LoadFile';

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
          <HeaderNote>You can turn on auto data backup in the Settings.</HeaderNote>
          <View style={{height: 15}}/>
          <FirebaseBackup/>
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