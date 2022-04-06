import React, {Component} from 'react';
import {TextInput, Linking, TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont'
import StoreHoursContainer from '../components/StoreHoursContainer';
import colors from '../Colors'
import ButtonComponent from "../components/ButtonComponent"
import {attemptToTranslate, collectionListSave, checkOff, loadGlobalData, indexCollectionList} from "../LoadJsonData"
import Popup from '../components/Popup';
import ToggleSwitch from 'toggle-switch-react-native';


class CatalogPage extends Component {
  constructor(props) {
    super(props);
    this.input = "";
    this.linkInput = "";
    this.totalSuccess = 0;
    this.totalFail = 0;
    this.method = "";
    this.includeVillagers = true;
    this.includeRecipes = true;
    this.state = {
      method:"",
      totalSuccess:"",
      totalFail:"",
      totalErrorItems: "",
    }
  }

  import = async () =>{
    try{
      this.popupWait?.setPopupVisible(true);
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
      let totalErrorItems = [];
      for(var z = 0; z < inputList.length; z++){
        success = false;
        for(var i = 0; i < global.dataLoadedAll.length; i++){
          for(var a = 0; a < global.dataLoadedAll[i].length; a++){
            if(global.dataLoadedAll[i][a]["Name"]!==undefined && global.dataLoadedAll[i][a]["Name"].toString().toLowerCase() === inputList[z].toString().toLowerCase()){
              success = true;

              if(this.includeVillagers===false && global.dataLoadedAll[i][a]["Data Category"]!==undefined && global.dataLoadedAll[i][a]["Data Category"]==="Villagers"){
                continue
              }

              if(this.includeRecipes===false && global.dataLoadedAll[i][a]["Data Category"]!==undefined && global.dataLoadedAll[i][a]["Data Category"]==="Recipes"){
                continue
              }

              this.totalSuccess++;
              if(inputType==="recipes" && global.dataLoadedAll[i][a]["checkListKey"].includes("recipesCheckList")){
                checkOff(global.dataLoadedAll[i][a]["checkListKey"], false, "", "", false, false);
              } else if(inputType==="recipes" && !global.dataLoadedAll[i][a]["checkListKey"].includes("recipesCheckList")){
                this.totalSuccess--;
              } else if(inputType==="catalog" && global.dataLoadedAll[i][a]["checkListKey"].includes("recipesCheckList")){
                this.totalSuccess--;
              } else if(inputType==="critters" && global.dataLoadedAll[i][a]["checkListKey"].includes("villagerCheckList")){
                this.totalSuccess--;
              } else {
                checkOff(global.dataLoadedAll[i][a]["checkListKey"], false, "", "", false, false);
              }
              break;
            } else {
              continue;
            }
          }
        }
        if(!success){
          console.log("When importing didn't find: " + inputList[z]);
          if(inputList[z]!==undefined)
            totalErrorItems.push(inputList[z])
          this.totalFail++;
        }
      }
      await loadGlobalData();
      global.collectionList = Array.from(new Set(collectionList));
      collectionListSave();
      global.collectionListIndexed = indexCollectionList(global.collectionList)
      console.log("Total error items: "+ totalErrorItems)
      this.setState({
        method: this.method,
        totalFail: this.totalFail,
        totalSuccess: this.totalSuccess,
        totalErrorItems: totalErrorItems.join("\n")
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
            style={{borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 20, fontSize: 18, backgroundColor:colors.white[global.darkMode], color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold"}}
            onChangeText={(text) => {
              this.linkInput = text.replace("https://","")
              this.linkInput = "https://" + this.linkInput
            }}
            placeholder={"https://nook.lol/abc123"}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            multiline={false}
          />
          <View style={{height: 15}}/>
          <TextFont bold={true} style={{textAlign:"center",fontSize: 15, marginLeft: 30, marginRight: 40, color:colors.textBlack[global.darkMode]}}>{"or..."}</TextFont>
          <View style={{height: 15}}/>
          <TextFont bold={true} style={{fontSize: 20, marginLeft: 30, marginRight: 40, color:colors.textBlack[global.darkMode]}}>{"Paste results here and Import"}</TextFont>
          <View style={{height: 15}}/>
          <TextInput
            allowFontScaling={false}
            style={{borderRadius: 10, maxHeight: 130, paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 20, fontSize: 18, backgroundColor:colors.white[global.darkMode], color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold"}}
            onChangeText={(text) => {this.input = text}}
            placeholder={"Abstract wall\nBackyard-fence wall\nGo K.K. Rider\n..."}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            multiline={true}
          />
          <View style={{height: 45}}/>
          <IncludeSwitch header={"Include Villagers"} text={"Include villagers when importing items. Some villagers have the same name as items."} defaultValue={this.includeVillagers} toggleValue={()=>{this.includeVillagers = !this.includeVillagers}}/>
          <View style={{height: 5}}/>
          <IncludeSwitch header={"Include Recipes"} text={"Include recipes when importing items. Recipes and the item counterpart have the same name."} defaultValue={this.includeRecipes} toggleValue={()=>{this.includeRecipes = !this.includeRecipes}}/>
          <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={async ()=>{await this.import(); this.popupWait?.setPopupVisible(false); this.popup?.setPopupVisible(true);}} text={"Import"} />
          <View style={{height: 10}}/>
          <TextFont suffix={"\n"+attemptToTranslate("Please be patient.")} bold={false} style={{fontSize: 13, marginLeft: 30, marginRight: 30, textAlign:"center",color:colors.textBlack[global.darkMode]}}>{"May take a few seconds to complete."}</TextFont>
          <View style={{height: 70}}/>
        </ScrollView>
        <Popup 
          ref={(popup) => this.popup = popup}
          button1={"OK"}
          button1Action={()=>{}}
          text={"Import Results"}
          textLower={this.state.method + "\n"+attemptToTranslate("Imported:") + " " + this.state.totalSuccess + " " + attemptToTranslate("items") +"\n" + attemptToTranslate("Errors:") + " " + this.state.totalFail + " " + attemptToTranslate("items") + "\n" + this.state.totalErrorItems}
        />
        <Popup 
          ref={(popupWait) => this.popupWait = popupWait}
          button1Action={()=>{}}
          text={"Importing..."}
          textLower={"Please wait"}
          loading
        />
     </View>
    )
  }
}
export default CatalogPage;


class IncludeSwitch extends Component{
  constructor(props){
    super(props)
    this.state={value:this.props.defaultValue}
  }
  toggleSetting = () => {
    this.props.toggleValue()
    this.setState({value:!this.state.value})
  }
  render(){
    return(
      <TouchableOpacity activeOpacity={0.7} onPress={() => {this.toggleSetting()}}>
        <View style={{paddingVertical: 10, paddingHorizontal:5, flexDirection:"row",flex:1,alignItems: 'center',marginHorizontal: 15, borderRadius: 10,backgroundColor:colors.white[global.darkMode]}}>
          <View style={{marginHorizontal: 10,padding:5}}>
            <TextFont bold={true} style={{fontSize: 18, marginRight: 65,color:colors.textBlack[global.darkMode]}}>{this.props.header}</TextFont>
            <TextFont style={{fontSize: 12, marginRight: 65,color:colors.textBlack[global.darkMode]}}>{this.props.text}</TextFont>
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