import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  Easing,
  Dimensions
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import DropDownPicker from 'react-native-dropdown-picker'
import {translateFilters, getStorage, attemptToTranslate, getSettingsString} from '../LoadJsonData';
import AsyncStorage from '@react-native-async-storage/async-storage';
const filterDefinitions = require("../assets/data/Generated/filterDefinitions.json");


class PopupFilter extends Component {
  constructor(props) {
    super(props);
    this.updateDefaultValues = this.updateDefaultValues.bind(this);
    this.state = {
      popupVisible: false,
    };   
    this.defaultValues = [];
  }

  componentWillUnmount() {
    this.mounted=false
  }

  async componentDidMount(){
    if(this.props.disableFilters){
      return;
    }
    var defaultValuesStored = (await getStorage(this.props.title+"Filters","")).split(",");
    console.log(this.props.title+"Filters")

    var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH ";

    this.possibleFilters = [{label:"Collected", value:"Collected"},{label:"Not Collected", value:"Not Collected"}];
    var notCraftVariationsFilters = [{label:"Uncraftable item variations", value:"Show uncraftable item variations"}]
    var activeFilters = [
      {label:"Can catch in January",value:hemispherePre+"Jan Active:true"},
      {label:"Can catch in February",value:hemispherePre+"Feb Active:true"},
      {label:"Can catch in March",value:hemispherePre+"Mar Active:true"},
      {label:"Can catch in April",value:hemispherePre+"Apr Active:true"},
      {label:"Can catch in May",value:hemispherePre+"May Active:true"},
      {label:"Can catch in June",value:hemispherePre+"Jun Active:true"},
      {label:"Can catch in July",value:hemispherePre+"Jul Active:true"},
      {label:"Can catch in August",value:hemispherePre+"Aug Active:true"},
      {label:"Can catch in September",value:hemispherePre+"Sep Active:true"},
      {label:"Can catch in October",value:hemispherePre+"Oct Active:true"},
      {label:"Can catch in November",value:hemispherePre+"Nov Active:true"},
      {label:"Can catch in December",value:hemispherePre+"Dec Active:true"},
    ]
    if(this.props.title==="Fish"){
      this.possibleFilters = [...this.possibleFilters, ...activeFilters, ...filterDefinitions["Fish"]];
    } else if(this.props.title==="Bugs"){
      this.possibleFilters = [...this.possibleFilters, ...activeFilters, ...filterDefinitions["Bugs"]];
    } else if(this.props.title==="Sea Creatures"){
      this.possibleFilters = [...this.possibleFilters, ...activeFilters, ...filterDefinitions["Sea Creatures"]];
    } else if(this.props.title==="Furniture"){
      const categories = [{"label":"Housewares","value":"Data Category:Housewares"},{"label":"Miscellaneous","value":"Data Category:Miscellaneous"},{"label":"Wall-mounted","value":"Data Category:Wall-mounted"},{"label":"Photos","value":"Data Category:Photos"},{"label":"Posters","value":"Data Category:Posters"} ]
      this.possibleFilters = [...this.possibleFilters, ...categories, ...notCraftVariationsFilters, ...filterDefinitions["Furniture"]];
    } else if(this.props.title==="Clothing"){
      const categories = [{"label":"Headwear","value":"Data Category:Headwear"},{"label":"Accessories","value":"Data Category:Accessories"},{"label":"Tops","value":"Data Category:Tops"},{"label":"Dress-Up","value":"Data Category:Dress-Up"},{"label":"Clothing Other","value":"Data Category:Clothing Other"},{"label":"Bottoms","value":"Data Category:Bottoms"},{"label":"Socks","value":"Data Category:Socks"},{"label":"Shoes","value":"Data Category:Shoes"},{"label":"Bags","value":"Data Category:Bags"},{"label":"Umbrellas","value":"Data Category:Umbrellas"} ]
      this.possibleFilters = [...this.possibleFilters, ...categories, ...notCraftVariationsFilters, ...filterDefinitions["Clothing"]];
    } else if(this.props.title==="Floor & Walls"){
      const categories = [{"label":"Floors","value":"Data Category:Floors"},{"label":"Rugs","value":"Data Category:Rugs"},{"label":"Wallpaper","value":"Data Category:Wallpaper"}]
      this.possibleFilters = [...this.possibleFilters, ...categories, ...filterDefinitions["Floor & Walls"]];
    } else if(this.props.title==="Emoticons"){
      this.possibleFilters = [...this.possibleFilters, ...filterDefinitions["Reactions"]];
    } else if(this.props.title==="Recipes"){
      this.possibleFilters = [...this.possibleFilters, ...filterDefinitions["Recipes"]];
    } else if(this.props.title==="Villagers"){
      this.possibleFilters = [...this.possibleFilters, ...filterDefinitions["Villagers"]];
    } else if(this.props.title==="Everything"){
      const categories = [{"label":"Housewares","value":"Data Category:Housewares"},{"label":"Miscellaneous","value":"Data Category:Miscellaneous"},{"label":"Wall-mounted","value":"Data Category:Wall-mounted"},{"label":"Photos","value":"Data Category:Photos"},{"label":"Posters","value":"Data Category:Posters"},{"label":"Headwear","value":"Data Category:Headwear"},{"label":"Accessories","value":"Data Category:Accessories"},{"label":"Tops","value":"Data Category:Tops"},{"label":"Dress-Up","value":"Data Category:Dress-Up"},{"label":"Clothing Other","value":"Data Category:Clothing Other"},{"label":"Bottoms","value":"Data Category:Bottoms"},{"label":"Socks","value":"Data Category:Socks"},{"label":"Shoes","value":"Data Category:Shoes"},{"label":"Bags","value":"Data Category:Bags"},{"label":"Umbrellas","value":"Data Category:Umbrellas"},{"label":"Floors","value":"Data Category:Floors"},{"label":"Rugs","value":"Data Category:Rugs"},{"label":"Wallpaper","value":"Data Category:Wallpaper"},
      {"label":"Recipes","value":"Data Category:Recipes"},
      {"label":"Tools","value":"Data Category:Tools"},
      {"label":"Fish","value":"Data Category:Fish"},
      {"label":"Bugs","value":"Data Category:Insects"},
      {"label":"Sea Creatures","value":"Data Category:Sea Creatures"},
      {"label":"Fossils","value":"Data Category:Fossils"},
      {"label":"Art","value":"Data Category:Art"},
      {"label":"Villagers","value":"Data Category:Villagers"},
      {"label":"Music","value":"Data Category:Music"},
      {"label":"Reactions","value":"Data Category:Reactions"},
      {"label":"Construction","value":"Data Category:Construction"},
      {"label":"Fencing","value":"Data Category:Fencing"},
      {"label":"Other","value":"Data Category:Other"},
      ]
      this.possibleFilters = [...this.possibleFilters, ...categories, ...notCraftVariationsFilters, ...activeFilters, ...filterDefinitions["All Items"]];
    } else if(this.props.title==="Construction"){
      this.possibleFilters = [...this.possibleFilters,{"label":"Bridge","value":"Category:Bridge"},{"label":"Incline","value":"Category:Incline"},{"label":"Doors","value":"Category:Door"},{"label":"Roofing","value":"Category:Roofing"},{"label":"Siding","value":"Category:Siding"},{"label":"Mailbox","value":"Category:Mailbox"}]
    } else if(this.props.title==="Music"){
      this.possibleFilters = [...this.possibleFilters, ...filterDefinitions["Music"]]
    } else if(this.props.villagerGifts===true){
      this.possibleFilters = [{"label":"Villager can wear","value":"Villager Equippable:Yes"},{"label":"Villager cannot wear","value":"Villager Equippable:No"}]
    }

    //Check for filters selected that don't exist, could cause errors, then reset them
    if(defaultValuesStored[0]!==""){
      var errors = false;
      for(var i = 0; i<defaultValuesStored.length; i++){
        var found = false;
        for(var x = 0; x<this.possibleFilters.length; x++){
          if(this.possibleFilters[x].value===defaultValuesStored[i]){
            found=true;
          }
        }
        if(found===false){
          console.log("error with saved filters, resetting");
          errors = true;
          break;
        }
      }
      if(errors){
        this.defaultValues=[];
        await AsyncStorage.setItem(this.props.title+"Filters", "");
        return;
      }

      this.defaultValues = defaultValuesStored;
      
      setTimeout(function() {
        if(this.mounted && this.defaultValues!=[""] && this.defaultValues!=[]){
          this.props.updateSearchFilters(this.defaultValues);
        }
      }.bind(this), 0);
    }
    this.mounted=true;
  }


  setPopupVisible = async (visible) => {
    this.setState({popupVisible:visible});
    if(visible===false && this.mounted){
      await AsyncStorage.setItem(this.props.title+"Filters", this.defaultValues.toString());
      this.setFilters();
    }
  }

  updateDefaultValues(item){
    this.defaultValues=item;
  }

  setFilters = () =>{
    if(this.mounted){
      this.props.updateSearchFilters(this.defaultValues); 
    }
  }

  render(){
    if(this.props.disableFilters){
      return <View style={{width:10, height:10, opacity: 0.2}}/>
    } else if(this.state.loaded===false){
      return <View style={{width:10, height:10, opacity: 0.2}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          statusBarTranslucent
        ><View style={styles.centeredView}></View>
        </Modal>
      </View>
    }
    var dropDownPickerOpacity = 0
    if(this.possibleFilters!== undefined && this.possibleFilters.length!==0){
      dropDownPickerOpacity = 0.7
    }
    const filters = translateFilters(this.possibleFilters)
    return (
      <View style={{width:10, height:10, opacity: 0.2}}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
          onRequestClose={()=>{
            this.setPopupVisible(!this.state.popupVisible);
          }}
        >
          <View style={styles.centeredView}>
            <TouchableOpacity onPress={()=>{this.setPopupVisible(!this.state.popupVisible);}} style={{position:"absolute", width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: "black", opacity: 0.1}}/>
            <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode], height:Dimensions.get('window').height*0.75}]}>
              <TextFont bold={true} style={{fontSize: 22, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Set Filters</TextFont>
              <View style={{height:10}}/>
              <DropDownPicker
                searchablePlaceholder={attemptToTranslate("Search for an item")}
                searchableError={() => <Text>{attemptToTranslate("Not found")}</Text>}
                items={this.possibleFilters}
                placeholder={attemptToTranslate("Select filter...")}
                multipleText="%d filters(s) applied"
                dropDownMaxHeight={Dimensions.get('window').height*0.75-175}
                containerStyle={{height: 45, marginLeft: 15, marginRight: 15}}
                style={[{width: "100%", borderWidth: 0, backgroundColor: colors.searchbarBG[global.darkMode], opacity: dropDownPickerOpacity,borderTopLeftRadius: 8, borderTopRightRadius: 8,borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}
                searchable={this.props.filterSearchable}
                itemStyle={{
                    justifyContent: 'flex-start'
                }}
                multiple
                isVisible
                searchablePlaceholderTextColor={colors.filterSearch[global.darkMode]}
                labelStyle={{fontFamily: "ArialRounded", fontSize: 15, marginLeft:10, color:colors.textBlack[global.darkMode]}}
                customTickIcon={()=><View/>}
                activeItemStyle={{borderRadius: 10, backgroundColor: colors.lightDarkAccent[global.darkMode]}}
                dropDownStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 0, backgroundColor: colors.filterBG[global.darkMode], opacity: 0.98, }}
                onChangeItem={item => {this.updateDefaultValues(item)}}
                defaultValue = {this.defaultValues}
              />
              <View style={{flexDirection:"row", position:"absolute", bottom: 20}}>
                <ButtonComponent
                  text={"Clear Filters"}
                  color={colors.filtersResetButton[global.darkMode]}
                  vibrate={5}
                  onPress={() => {
                    this.setPopupVisible(!this.state.popupVisible);
                    this.defaultValues=[];
                    AsyncStorage.setItem(this.props.title+"Filters", "");
                    if(this.mounted){
                      this.props.updateSearchFilters(this.defaultValues);
                    }
                  }}
                />
                <ButtonComponent
                  text={"OK"}
                  color={colors.okButton[global.darkMode]}
                  vibrate={5}
                  onPress={() => {
                    this.setPopupVisible(!this.state.popupVisible);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
export default PopupFilter;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor:"rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 10,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5
  },
});