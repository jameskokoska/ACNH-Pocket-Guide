import React, {Component} from 'react';
import {TextInput, Linking, TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont'
import StoreHoursContainer from '../components/StoreHoursContainer';
import colors from '../Colors'
import PopupRating from "../components/PopupRating"
import ButtonComponent from "../components/ButtonComponent"
import {checkOff, loadGlobalData} from "../LoadJsonData"
import Popup from '../components/Popup';

const music = require("../assets/data/music.json");
const {width} = Dimensions.get('window');


class CatalogPage extends Component {
  constructor(props) {
    super(props);
    this.input = "";
    this.totalSuccess = 0;
    this.totalFail = 0;
    this.state = {
      openDone: false,
      openWaiting: false,
    }
  }

  import = async () =>{
    var inputList = this.input.split("\n");
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
            checkOff(global.dataLoadedAll[i][a], "false", "dataLoadedAll", false);
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
    await this.setState({openDone: true});
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
          <TextFont bold={true} style={{fontSize: 20, marginLeft: 30, marginRight: 40, color:colors.textBlack[global.darkMode]}}>{"Copy results below and Import"}</TextFont>
          <View style={{height: 15}}/>
          <TextInput
            style={{borderRadius: 10, height: Dimensions.get('window').height*0.33, paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 20, fontSize: 20, backgroundColor:colors.white[global.darkMode], color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold"}}
            onChangeText={(text) => {this.input = text}}
            placeholder={"Abstract wall\nAmber\nArched-brick flooring\nBackyard-fence wall\nGo K.K. Rider\n..."}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
            multiline={true}
          />
          <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.import()}} text={"Import"} />
          <View style={{height: 10}}/>
          <TextFont bold={true} style={{fontSize: 13, marginLeft: 30, marginRight: 30, textAlign:"center",color:colors.textBlack[global.darkMode]}}>{"May take a few seconds to complete. \nPlease be patient."}</TextFont>
        </ScrollView>
        <Popup 
          button1={"OK"}
          button1Action={()=>{}}
          popupVisible={this.state.openDone} 
          close={() => this.setState({openDone:!this.state.openDone})}
          text={"Import Results"}
          textLower={"Imported: " + this.totalSuccess + " items\n Errors: " + this.totalFail + " items"}
        />
     </View>
    )
  }
}
export default CatalogPage;