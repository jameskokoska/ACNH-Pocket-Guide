import React, {Component} from 'react';
import ButtonComponent from './ButtonComponent';
import { TextInput } from 'react-native-gesture-handler';
import {TouchableOpacity, View} from 'react-native';
import TextFont from './TextFont';
import colors from "../Colors"
import app from '../firebase';
import { getAllData, importAllData } from './LoadFile';
import Popup from './Popup';
import { attemptToTranslate, getStorage } from '../LoadJsonData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = app.auth();

export async function autoBackup(){
  let email = await getStorage("loginEmail","")
  let password = await getStorage("loginPassword","")
  let output = ""
  let error = false
  try {
    if (email !== '' && password !== '') {
      await auth.signInWithEmailAndPassword(email, password);
      console.log(auth.currentUser.uid)
    } else {
      throw({"message":attemptToTranslate("The login credentials are not set for cloud backup or are incorrect. Please set them in the Backup + Restore page.")})
    }
  } catch (errorMesssage) {
    error=true
    return [attemptToTranslate("Auto Backups") + ": " + errorMesssage.message,true];
  }
  console.log("logged in")
  let allData = await getAllData()
  try{
    await (app.database()).ref('users/' + auth.currentUser.uid).set({data: allData})
    await (app.database()).ref('users/' + auth.currentUser.uid).once('value').then(async (snapshot) => {
      if(snapshot.val()===null || snapshot.val()["data"]===undefined){
        await auth.signOut();
        console.log("signed out")
        output = attemptToTranslate("Auto Backups") + ": " + attemptToTranslate("An error occurred. No backup was created.");
        error = true
      } else {
        await auth.signOut();
        console.log("signed out")
        output = attemptToTranslate("Auto Backups") + " ("+ email +"): " + attemptToTranslate("There are") + " " + snapshot.val()["data"].split("\n").length.toString() + " " + attemptToTranslate("entries on the server now")
      }
    })
  } catch {
    output = attemptToTranslate("Auto Backups") + ": " + attemptToTranslate("An error occurred. Please check your internet connection and try again later.")
    error = true
  }
  return [output,error]
}

export default class FirebaseBackup extends Component {
  constructor(props) {
    super(props);
    this.state={secureTextEntry:true, email:"",password:"", error:"", uid:"", loadedNumber: "", messageExport:"", messageImport:""}
  }

  async componentDidMount(){
    this.setState({email:await getStorage("loginEmail","")})
    this.setState({password:await getStorage("loginPassword","")})
  }

  storeData = async (user) => {
    if (user != "") {
      this.exportPopup?.setPopupVisible(true);
      this.setState({messageExport:attemptToTranslate("Please wait")});
      let allData = await getAllData()
      try{
        (app.database()).ref('users/' + user).set({
          data: allData
        }).then(()=>{
          this.setState({messageExport:attemptToTranslate("Verifying data...")});
          (app.database()).ref('users/' + user).once('value').then(async (snapshot) => {
            if(snapshot.val()===null || snapshot.val()["data"]===undefined){
              this.setState({messageExport:attemptToTranslate("An error occurred. No backup was created.")});
              return
            } else {
              this.setState({messageExport:attemptToTranslate("There are") + " " + snapshot.val()["data"].split("\n").length.toString() + " " + attemptToTranslate("entries on the server now")+"\n" + attemptToTranslate("Exported to user:") + "\n"  + this.state.email + "\n" + user.toString()});
            }
          })
        });
      }catch(e){
        this.setState({messageExport:e.toString() + " " + attemptToTranslate("An error occurred. Please check your internet connection and try again later.")});
      }
    }
  }

  getData = async (user) => {
    if (user != "") {
      this.importPopup?.setPopupVisible(true);
      this.setState({messageImport:attemptToTranslate("Please wait")});
      try{
        (app.database()).ref('users/' + user).once('value').then(async (snapshot) => {
          if(snapshot.val()===null || snapshot.val()["data"]===undefined){
            this.setState({messageImport:attemptToTranslate("There are no backups stored. Please Upload one.")});
            return
          }
          let loadedNumber = await importAllData(snapshot.val()["data"])
          this.setState({loadedNumber:loadedNumber})
          console.log(loadedNumber)
          this.setState({messageImport: attemptToTranslate("Imported:") + " " + this.state.loadedNumber + " " + attemptToTranslate("entires.")})
        })
      }catch(e){
        this.setState({messageImport:e.toString() + " " + attemptToTranslate("An error occurred. Please check your internet connection and try again later.")});
      }
    }
  }
  
  onLogin = async () => {
    this.setState({secureTextEntry:true})
    try {
      if (this.state.email !== '' && this.state.password !== '') {
        await auth.signInWithEmailAndPassword(this.state.email, this.state.password);
        this.setState({uid:auth.currentUser.uid})
        console.log(auth.currentUser.uid)
      } else {
        this.setState({error:"Please enter an email and password"});
      }
    } catch (error) {
      this.setState({error:error.message});
    }
  };

  onSignup = async () => {
    this.setState({secureTextEntry:true})
    try {
      if (this.state.email !== '' && this.state.password !== '') {
        await auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
        this.setState({uid:auth.currentUser.uid})
        console.log(auth.currentUser.uid)
      } else {
        this.setState({error:"Please enter an email and password"});
      }
    } catch (error) {
      console.log(error)
      this.setState({error:error.message});
    }
  };

  onSignOut = async () => {
    this.setState({secureTextEntry:true})
    try {
      await auth.signOut();
      this.setState({uid:""})
    } catch (error) {
      this.setState({error:error.message});
    }
  };

  formatError = (errorInput) => {
    let formattedError = errorInput;
    formattedError.replace("email address","username")
    if(formattedError.includes("The user may have been deleted")){
      formattedError = formattedError + " Please try to create an account and Sign-up."
    }
    return attemptToTranslate(formattedError)
  }

  resetPassword = async () => {
    try {
      await auth.sendPasswordResetEmail(this.state.email)
      this.resetPasswordSuccessPopup?.setPopupVisible(true)
    } catch (error) {
      console.log(error)
      this.setState({error:error.message});
      this.resetPasswordErrorPopup?.setPopupVisible(true)
    }
  }
 
  render(){
    return <>
      <Popup 
        ref={(exportPopup) => this.exportPopup = exportPopup}
        button1={"OK"}
        button1Action={()=>{}}
        text={"Export Results"}
        textLower={this.state.messageExport}
      />
      <Popup
        ref={(importPopup) => this.importPopup = importPopup}
        button1={"OK"}
        button1Action={()=>{}}
        text={"Import Results"}
        textLower={this.state.messageImport}
      />
      <Popup
        ref={(uploadPopup) => this.uploadPopup = uploadPopup}
        button1={"OK"}
        button1Action={()=>{this.storeData(this.state.uid)}}
        button2={"Cancel"}
        button2Action={()=>{}}
        text={attemptToTranslate("Upload Data")+"?"}
        textLower={"Note: Uploading data will replace what is currently backed up in the cloud!"}
      />
      <TextInput
        allowFontScaling={false}
        style={{fontSize: 18, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.white[global.darkMode], padding: 15, borderRadius: 5, marginHorizontal:30}}
        onChangeText={(text) => {AsyncStorage.setItem("loginEmail", text.replace(/ /g, "")); this.setState({email:text.replace(/ /g, "")})}}
        placeholder={attemptToTranslate("Email")}
        placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
        autoCorrect={false}
        value={this.state.email}
        autoCompleteType={"email"}
        textContentType={'emailAddress'}
      />
      <View style={{height: 10}}/>
      <TextInput
        allowFontScaling={false}
        style={{fontSize: 18, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.white[global.darkMode], padding: 15, borderRadius: 5, marginHorizontal:30}}
        onChangeText={(text) => {AsyncStorage.setItem("loginPassword", text); this.setState({password:text})}}
        placeholder={attemptToTranslate("Password")}
        placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
        autoCorrect={false}
        value={this.state.password}
        textContentType={"password"}
        secureTextEntry={this.state.secureTextEntry}
        onFocus={()=>{this.setState({secureTextEntry:false})}}
      />
      {this.state.uid===""?<ButtonComponent
        marginHorizontal={40}
        text={"Sign-in"}
        color={colors.okButton[global.darkMode]}
        vibrate={10}
        onPress={() => {this.onLogin()}}
      />:<View/>}
      {this.state.uid===""?<ButtonComponent
        marginHorizontal={40}
        text={"Sign-up"}
        color={colors.okButton3[global.darkMode]}
        vibrate={10}
        onPress={() => {this.onSignup()}}
      />:<View/>}
      {this.state.uid!==""?<ButtonComponent
        marginHorizontal={40}
        text={"Sign-out"}
        color={colors.cancelButton[global.darkMode]}
        vibrate={10}
        onPress={() => {this.onSignOut()}}
      />:<View/>}
      {this.state.uid!==""?<ButtonComponent
        marginHorizontal={40}
        text={"Upload Data"}
        color={colors.okButton2[global.darkMode]}
        vibrate={10}
        onPress={() => {this.uploadPopup?.setPopupVisible(true)}}
      />:<View/>}
      {this.state.uid!==""?<ButtonComponent
        marginHorizontal={40}
        text={"Download and Import Data"}
        color={colors.okButton3[global.darkMode]}
        vibrate={10}
        onPress={() => {this.getData(this.state.uid)}}
      />:<View/>}
      <View style={{height: 2}}/>
      {this.state.uid!=="" ? <TextFont style={{marginVertical:10, textAlign:"center", color:colors.fishText[global.darkMode], marginHorizontal:40}}>{"Note: Uploading data will replace what is currently backed up in the cloud!"}</TextFont>:<View/>}
      {(this.state.uid===""&&this.state.error!=="") ? <TextFont style={{marginVertical:10, textAlign:"center", color:colors.textError[global.darkMode], marginHorizontal:40}}>{this.formatError(this.state.error)}</TextFont>:<View/>}
      <View style={{height: 2}}/>
      <TouchableOpacity style={{padding:10}} 
        onPress={()=>{
          if(this.state.email!=undefined && this.state.email.includes("@"))
            this.resetPassPopup?.setPopupVisible(true)
          else
          this.emptyUsernamePopup?.setPopupVisible(true)
        }}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{"Forgot Password"}</TextFont>
      </TouchableOpacity>
      <View style={{height: 15}}/>
      <Popup 
        ref={(resetPassPopup) => this.resetPassPopup = resetPassPopup}
        button1={"Yes"}
        button1Action={()=>{
          this.resetPassword()
        }}
        button2={"Cancel"}
        button2Action={()=>{}}
        text={"Reset Password?"}
        textLower={"You will get an email with instructions."}
      />
      <Popup
        ref={(emptyUsernamePopup) => this.emptyUsernamePopup = emptyUsernamePopup}
        button1={"OK"}
        button1Action={()=>{}}
        text={"Reset Password Error"}
        textLower={"Please fill in your email. The password can be blank."}
      />
      <Popup
        ref={(resetPasswordErrorPopup) => this.resetPasswordErrorPopup = resetPasswordErrorPopup}
        button1={"OK"}
        button1Action={()=>{}}
        text={"Reset Password Error"}
        textLower={this.state.error}
      />
      <Popup
        ref={(resetPasswordSuccessPopup) => this.resetPasswordSuccessPopup = resetPasswordSuccessPopup}
        button1={"OK"}
        button1Action={()=>{}}
        text={"Email Sent"}
        textLower={"You should get an email with instructions on how to reset your password."}
      />
    </>
  }
}