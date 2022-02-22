import React, {Component} from 'react';
import {ScrollView, Text, View, Image, Appearance, Dimensions, TouchableOpacity, Linking} from 'react-native';
import TextFont from '../components/TextFont';
import colors from '../Colors'
import FadeInOut from "../components/FadeInOut";
import {SubHeader, MailLink} from "../components/Formattings"
import ButtonComponent from '../components/ButtonComponent';
import { attemptToTranslate, getDefaultLanguage, getStorage } from '../LoadJsonData';
import * as ErrorRecovery from 'expo-error-recovery';
import BackupPage from './BackupPage';
import { ExportFile } from '../components/LoadFile';


export default class CrashPage extends Component {
  constructor() {
    super();
  }
  async componentDidMount(){
    if(this.props.lastError){
      let defaultLanguage = getDefaultLanguage();
      let language = await getStorage("Language",defaultLanguage);
      global.language = language
      this.setState({language: language})
    }
  }
  render(){
    let darkMode = Appearance.getColorScheme()==="light" ? 0 : 1;
    let textWhite = ["#373737","#f2f2f2"][darkMode]
    let textBlue = ["#3F51B5","#9AA2D4"][darkMode]
    let background = ["#F5F5F5","#1A1A1A"][darkMode]
    let button2 = ["#61A876","#336E85"][darkMode]
    let button3 = ["#81c784","#519657"][darkMode]

    return <View style={{justifyContent:'center', alignItems:'center', paddingHorizontal: 10, flex:1, backgroundColor: background}}>
      <ScrollView>
        <View style={{minHeight: Dimensions.get('window').height,justifyContent:'center', alignItems:'center',}}>
          <View style={{height:40}}/>
          <Image source={require("../assets/icons/loid.png")} style={{width:75, height: 100, resizeMode:"contain", marginBottom:15}}/>
          <Text style={{textAlign:'center', fontSize:17, fontWeight: "bold", color: textWhite}}>{attemptToTranslate("It seems like the app has just crashed.")}</Text>
          <Text style={{textAlign:'center', fontSize:13, color: textWhite, marginTop: 10}}>{attemptToTranslate("If the app keeps crashing upon reload, please make a backup of your data, reinstall the application, and restore in the [Backup + Restore] page by selecting [Import Data] under Files.")}</Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:dapperappdeveloper@gmail.com') }>
            <Text style={{textAlign:'center', fontSize:13, color: textWhite, marginTop: 10}}>{attemptToTranslate("If you have any questions please email")}</Text>
            <Text style={{textAlign:'center', fontSize:13, color: textBlue, marginTop: 0}}>dapperappdeveloper@gmail.com</Text>
          </TouchableOpacity>
          <Text style={{textAlign:'center',  fontSize:15, color: textWhite, marginTop: 10}}>{attemptToTranslate("Please report the error so I can get it fixed.")}</Text>
          <ButtonComponent text={attemptToTranslate("Report Error to Developer")} color={button2} onPress={() => Linking.openURL('mailto:dapperappdeveloper@gmail.com?subject=Error Report&body=' + "Fatal? : " + (this.props.lastError.isFatal ? "Yes" : "No") + "\n" + "Error : " + JSON.stringify(this.props.lastError.error))}/>
          <ExportFile darkMode={darkMode} checkFont={true} color={button2} label={attemptToTranslate("Export and Backup Data")}/>
          <ButtonComponent onPress={()=>{this.props.loadApplication()}} text={attemptToTranslate("Load Application")} color={button3}/>
          <View style={{height:40}}/>
        </View>
      </ScrollView>
    </View>
  }
}