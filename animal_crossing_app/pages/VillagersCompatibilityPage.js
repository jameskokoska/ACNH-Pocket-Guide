import React, {Component} from 'react';
import {TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import TextFont from '../components/TextFont'
import colors from '../Colors'
import {HeaderNote, SubHeader, Header, Paragraph} from "../components/Formattings"
import {attemptToTranslate, getCurrentVillagerObjects} from "../LoadJsonData"
import {PopupInfoCustom} from "../components/Popup"
import FastImage from "../components/FastImage"
import VillagerPopup from "../popups/VillagerPopup"
import {VillagerPopupPopup} from "./HomePage"
import GuideRedirectButton from "../components/PopupGuideRedirectButton"
import LottieView from 'lottie-react-native';

export default class VillagersCompatibilityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calculatedPossibilities:false
    }
    this.currentVillagers = getCurrentVillagerObjects().slice(0,15)
    this.index = ["Normal", "Lazy", "Big Sister", "Snooty", "Cranky", "Jock", "Peppy", "Smug"]
    this.compatibility = [
      ["Get Along", "Get Along", "Neutral", "Occasionally", "Occasionally", "Get Along", "Get Along", "Get Along"], 
      ["Get Along", "Get Along", "Get Along", "Neutral", "Occasionally", "Conflict", "Get Along", "Get Along"], 
      ["Neutral", "Get Along", "Neutral", "Conflict", "Conflict", "Get Along", "Get Along", "Get Along"], 
      ["Occasionally", "Neutral", "Conflict", "Neutral", "Get Along", "Conflict", "Neutral", "Neutral"], 
      ["Occasionally", "Occasionally", "Conflict", "Get Along", "Neutral", "Get Along", "Conflict", "Conflict"], 
      ["Get Along", "Conflict", "Get Along", "Conflict", "Get Along", "Neutral", "Get Along", "Neutral"], 
      ["Get Along", "Get Along", "Get Along", "Neutral", "Conflict", "Get Along", "Neutral", "Get Along"], 
      ["Get Along", "Get Along", "Get Along", "Neutral", "Conflict", "Neutral", "Get Along", "Get Along"]
    ]
    this.testCompat = ["Get Along", "Neutral", "Occasionally", "Conflict"]
  }

  componentDidMount(){
    if(this.currentVillagers.length===0){
      this.popup?.setPopupVisible(true);
    }
    setTimeout(() => {
      this.villagerCompatibilityComponentsGenerated = this.currentVillagers.map((villager, index) => {
        return(
          <View key={villager["Name"]} style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
            <View style={{flexWrap: 'wrap', flexDirection:"row", marginHorizontal:30, alignItems:"center"}}>
              <FastImage
                style={{height: 40,width: 40,resizeMode:'contain',}}
                source={{uri:villager["Icon Image"]}}
                cacheKey={villager["Icon Image"]}
              />
              <SubHeader margin={false} translate={false} style={{marginHorizontal:10}}>{villager["NameLanguage"] + " - " + attemptToTranslate(villager["Personality"])}</SubHeader>                
            </View>
            <View style={{height:10}}/>
            {this.testCompat.map((compat, index) => {
              var totalCompat = this.getCompatibilityVillagers(villager, compat)
              if(totalCompat.length>0){
                return<View key={villager["Name"]+compat}>
                  <TextFont style={{fontSize:18, marginHorizontal:30, color:colors.textBlack[global.darkMode]}}>{compat}</TextFont>
                  <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row", marginHorizontal:30}}>
                    {totalCompat.map((villagerCompat, index) => {
                        return (
                          <View key={villager["Name"]+villagerCompat["Name"]+compat} >
                          <View style={{margin:5}}>
                              <TouchableOpacity onPress={()=>{this.openVillagerPopup(villagerCompat)}}>
                                <View style={{borderWidth: 2, borderColor: colors["villagerOutline"+compat][global.darkMode], width: 60,height: 60,borderRadius: 100,justifyContent: "center",alignItems: "center",backgroundColor:colors.eventBackground[global.darkMode]}}>
                                  <FastImage
                                    style={{height: 50,width: 50,resizeMode:'contain',}}
                                    source={{uri:villagerCompat["Icon Image"]}}
                                    cacheKey={villagerCompat["Icon Image"]}
                                  />
                                </View>
                              </TouchableOpacity>
                            </View>
                          </View>
                        )
                    })}
                  </View>
                  <View style={{height: 10}}/>
                </View>
              }
            })}
          </View>
        )
      });
      this.setState({calculatedPossibilities:true});
      return true;
    }, 10);
  }
  

  getCompatibilityVillagers = (villager, compatType) => {
    var outputVillagers = [];
    for(var i=0; i<this.currentVillagers.length; i++){
      if(this.currentVillagers[i]["Name"]===villager["Name"]){
        continue;
      } else {
        if(compatType===this.compatibility[this.index.indexOf(villager["Personality"])][this.index.indexOf(this.currentVillagers[i]["Personality"])]){
          outputVillagers.push(this.currentVillagers[i])
          outputVillagers[outputVillagers.length-1]["Compatibility"] = compatType
        }
      }
    }
    return outputVillagers
  }

  openVillagerPopup = (item) => {
    this.villagerPopupPopup?.setPopupVisible(true, item);
  }

  render(){
    const extraInfo= {
      type:"externalRedirect",
      title:"Villager Compatibility",
      content:"This has not yet been proven to be accurate in ACNH, and is a feature from older games. Use as a reference only, as it may not impact gameplay. Villager's types of conversations may be based on their personalities. Only the first 15 favorite villagers are compared.",
      linkText: "Tap here to see how compatibility is calculated",
      redirectPassBack: "https://docs.google.com/spreadsheets/d/1prjGTzHwlL1jHkMPxIr9BXzJsNMk0Pl0YxkCYIblCIk/edit?usp=sharing"
    }
    let loadingComponent = <View style={{alignItems:"center", justifyContent:"center"}}>
      <LottieView autoPlay loop
        style={{width: 90, zIndex:1, transform: [{ scale: 1.1 },{ rotate: '0deg'},],}}
        source={require('../assets/loading.json')}
      />
    </View>
    return(
      <>
        <VillagerPopupPopup ref={(villagerPopupPopup) => this.villagerPopupPopup = villagerPopupPopup} setPage={this.props.setPage}/>
        <PopupInfoCustom header={<TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>You do not have any villagers added!</TextFont>} ref={(popup) => this.popup = popup} buttonText={"Dismiss"}>
          <TouchableOpacity style={{paddingVertical:20,}} onPress={() => this.props.setPage(8)}>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 16, textAlign:"center"}}>{"Tap here and go add some!"}</TextFont>
          </TouchableOpacity>
        </PopupInfoCustom> 
        <ScrollView>
          <View>
            <GuideRedirectButton icon={"i"} style={{position:"absolute", padding:15, right:0}} extraInfo={extraInfo} setPage={this.props.setPage}/>
            <View style={{height: 100}}/>
            <Header>Villager Compatibility</Header>
            <HeaderNote>This has NOT yet been proven to be accurate in ACNH, and is a feature from older games. Reference with caution.</HeaderNote>
            <HeaderNote>Tap the [i] in the top right corner for more information.</HeaderNote>
            <View style={{height: 20}}/>
            {this.state.calculatedPossibilities?this.villagerCompatibilityComponentsGenerated:loadingComponent}
            <View style={{height: 100}}/>
          </View>
        </ScrollView>
      </>
    )
  }
}