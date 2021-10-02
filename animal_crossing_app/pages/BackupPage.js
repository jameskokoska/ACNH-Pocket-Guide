import React, {Component} from 'react';
import {ScrollView, View,} from 'react-native';
import {SubHeader, Paragraph, HeaderNote, MailLink, Header, BlueText} from "../components/Formattings"
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
          <View style={{height: 75}}/>
          <SubHeader>Files</SubHeader>
          <HeaderNote>(Recommended)</HeaderNote>
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