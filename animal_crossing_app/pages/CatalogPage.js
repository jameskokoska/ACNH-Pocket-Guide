import React, {Component} from 'react';
import {TextInput, Linking, TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont'
import StoreHoursContainer from '../components/StoreHoursContainer';
import colors from '../Colors'
import ButtonComponent from "../components/ButtonComponent"
import {attemptToTranslate, collectionListSave, checkOff, loadGlobalData} from "../LoadJsonData"
import Popup from '../components/Popup';


class CatalogPage extends Component {
  constructor(props) {
    super(props);
    this.input = "";
    this.linkInput = "";
    this.totalSuccess = 0;
    this.totalFail = 0;
    this.method = "";
    this.state = {
      method:"",
      totalSuccess:"",
      totalFail:"",
    }
  }

  import = async () =>{
    try{
      this.popupWait.setPopupVisible(true);
      var inputList = [];
      var inputType = "";
      if(this.linkInput!=="" || this.input==""){
        this.method = attemptToTranslate("Using nook.lol link to import data")+"\n"+ attemptToTranslate("(First option)")+"\n";
        var responseJSON = await (await fetch(this.linkInput+"/json?locale=en-us")).json();
        inputType = responseJSON["type"];
        inputList = responseJSON["data"];
        this.method = this.method + "\nImport type: " + inputType;
      } else {
        this.method = attemptToTranslate("Using list of results to import data")+"\n"+attemptToTranslate("(Second option)")+"\n";
        inputList = this.input.split("\n");
      }
      if(inputList===undefined)
        inputList = [];
      var success = false;
      this.totalSuccess = 0;
      this.totalFail = 0;
      for(var z = 0; z < inputList.length; z++){
        success = false;
        for(var i = 0; i < global.dataLoadedAll.length; i++){
          for(var a = 0; a < global.dataLoadedAll[i].length; a++){
            if(global.dataLoadedAll[i][a]["Name"].toLowerCase() === inputList[z].toLowerCase()){
              success = true;
              this.totalSuccess++;
              if(inputType==="recipes" && global.dataLoadedAll[i][a]["checkListKey"].includes("recipesCheckList")){
                checkOff(global.dataLoadedAll[i][a]["checkListKey"], false, "", "", false);
              } else if(inputType==="recipes" && !global.dataLoadedAll[i][a]["checkListKey"].includes("recipesCheckList")){
                this.totalSuccess--;
              } else if(inputType==="catalog" && global.dataLoadedAll[i][a]["checkListKey"].includes("recipesCheckList")){
                this.totalSuccess--;
              } else if(inputType==="critters" && global.dataLoadedAll[i][a]["checkListKey"].includes("villagerCheckList")){
                this.totalSuccess--;
              } else {
                checkOff(global.dataLoadedAll[i][a]["checkListKey"], false, "", "", false);
              }
              break;
            } else {
              continue;
            }
          }
        }
        if(!success){
          console.log("Didn't find:" + inputList[z]);
          this.totalFail++;
        }
      }
      await loadGlobalData();
      global.collectionList = Array.from(new Set(collectionList));
      collectionListSave();
      this.setState({
        method: this.method,
        totalFail: this.totalFail,
        totalSuccess: this.totalSuccess
      })
    } catch(err){
      this.setState({
        method: attemptToTranslate("Attempted:") + "\n"+ this.method + "\n"+attemptToTranslate("There was an error, please check the link and try again...") +"\n\n" + err + "\n",
        totalFail: 0,
        totalSuccess: 0
      })
    }
    
  }


  render(){
    return(
      <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:"100%"}}>
        <ScrollView>
          <View style={{height: 100}}/>
          <TextFont bold={true} style={{fontSize: 37, marginLeft: 30, marginRight: 40, color:colors.textBlack[global.darkMode]}}>Catalog Import</TextFont>
          <View style={{height: 50}}/>
          <TouchableOpacity onPress={() => Linking.openURL('https://nook.lol/') }>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 17, marginLeft: 30, marginRight: 30, textAlign:"center"}}>{"Visit https://nook.lol/ for more information"}</TextFont>
          </TouchableOpacity>
          <View style={{height: 50}}/>
          <TextFont bold={true} style={{fontSize: 20, marginLeft: 30, marginRight: 40, color:colors.textBlack[global.darkMode]}}>{"Paste nook.lol link and Import"}</TextFont>
          <View style={{height: 15}}/>
          <TextInput
            allowFontScaling={false}
            style={{borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 20, fontSize: 20, backgroundColor:colors.white[global.darkMode], color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold"}}
            onChangeText={(text) => {this.linkInput = text}}
            placeholder={"https://nook.lol/abc123"}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            multiline={false}
          />
          <View style={{height: 30}}/>
          <TextFont bold={true} style={{textAlign:"center",fontSize: 15, marginLeft: 30, marginRight: 40, color:colors.textBlack[global.darkMode]}}>{"or..."}</TextFont>
          <View style={{height: 30}}/>
          <TextFont bold={true} style={{fontSize: 20, marginLeft: 30, marginRight: 40, color:colors.textBlack[global.darkMode]}}>{"Paste results here and Import"}</TextFont>
          <View style={{height: 15}}/>
          <TextInput
            allowFontScaling={false}
            style={{borderRadius: 10, maxHeight: 130, paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 20, fontSize: 20, backgroundColor:colors.white[global.darkMode], color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold"}}
            onChangeText={(text) => {this.input = text}}
            placeholder={"Abstract wall\nBackyard-fence wall\nGo K.K. Rider\n..."}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            multiline={true}
          />
          <View style={{height: 35}}/>
          <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={async ()=>{await this.import(); this.popupWait.setPopupVisible(false); this.popup?.setPopupVisible(true);}} text={"Import"} />
          <View style={{height: 10}}/>
          <TextFont suffix={"\n"+attemptToTranslate("Please be patient.")} bold={false} style={{fontSize: 13, marginLeft: 30, marginRight: 30, textAlign:"center",color:colors.textBlack[global.darkMode]}}>{"May take a few seconds to complete."}</TextFont>
          <View style={{height: 50}}/>
        </ScrollView>
        <Popup 
          ref={(popup) => this.popup = popup}
          button1={"OK"}
          button1Action={()=>{}}
          text={"Import Results"}
          textLower={this.state.method + "\n"+attemptToTranslate("Imported:") + " " + this.state.totalSuccess + " " + attemptToTranslate("items") +"\n" + attemptToTranslate("Errors:") + " " + this.state.totalFail + " " + attemptToTranslate("items")}
        />
        <Popup 
          ref={(popupWait) => this.popupWait = popupWait}
          button1Action={()=>{}}
          text={"Importing..."}
          textLower={"Please wait"}
        />
     </View>
    )
  }
}
export default CatalogPage;