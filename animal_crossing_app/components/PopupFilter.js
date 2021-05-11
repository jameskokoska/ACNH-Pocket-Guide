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
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {MaterialIcons} from '@expo/vector-icons';

class PopupFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
      selectedItems: []
    };
    this.openFirst = true;

    var hemispherePre = getSettingsString("settingsNorthernHemisphere") === "true" ? "NH " : "SH ";

    this.possibleFilters = [{
      "name": "Collected/Not Collected",
      "id": "Collected/Not Collected",
      "children": [
        {name:"Collected", id:"Collected"},{name:"Not Collected", id:"Not Collected"}
      ]
    }]
    var notCraftVariationsFilters = [{
      "name": "Uncraftable Item Variations Filter",
      "id": "Uncraftable Item Variations Filter",
      "children": [{name:"Uncraftable item variations", id:"Show uncraftable item variations"}]
    }]
    var activeFilters = [{
      "name": "Active Times Filters",
      "id": "Active Times Filters",
      "children": [
        {name:"Can catch in January",id:hemispherePre+"Jan Active:true"},
        {name:"Can catch in February",id:hemispherePre+"Feb Active:true"},
        {name:"Can catch in March",id:hemispherePre+"Mar Active:true"},
        {name:"Can catch in April",id:hemispherePre+"Apr Active:true"},
        {name:"Can catch in May",id:hemispherePre+"May Active:true"},
        {name:"Can catch in June",id:hemispherePre+"Jun Active:true"},
        {name:"Can catch in July",id:hemispherePre+"Jul Active:true"},
        {name:"Can catch in August",id:hemispherePre+"Aug Active:true"},
        {name:"Can catch in September",id:hemispherePre+"Sep Active:true"},
        {name:"Can catch in October",id:hemispherePre+"Oct Active:true"},
        {name:"Can catch in November",id:hemispherePre+"Nov Active:true"},
        {name:"Can catch in December",id:hemispherePre+"Dec Active:true"},
      ]
    }]
    if(this.props.title==="Amiibo Cards"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [
          {"name":"Series 1","id":"Data Category:Series 1"},
          {"name":"Series 2","id":"Data Category:Series 2"},
          {"name":"Series 3","id":"Data Category:Series 3"},
          {"name":"Series 4","id":"Data Category:Series 4"},
          {"name":"Promos","id":"Data Category:Promos"},
          {"name":"Welcome Amiibo Series","id":"Data Category:Welcome Amiibo Series"} ,
          {"name":"Sanrio Series","id":"Data Category:Sanrio Series"} 
        ]
      }]
      const handSigns = [{
        "name": "Hand Sign",
        "id": "Hand Sign",
        "children": [
          {"name":"Rock","id":"handSign:Rock"},
          {"name":"Paper","id":"handSign:Paper"},
          {"name":"Scissors","id":"handSign:Scissors"},
        ]
      }]
      this.possibleFilters = [...this.possibleFilters, ...categories, ...handSigns];
    } else if(this.props.title==="Active Creatures"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Fish","id":"Data Category:Fish"},{"name":"Bugs","id":"Data Category:Insects"},{"name":"Sea Creatures","id":"Data Category:Sea Creatures"}]
      }]
      this.possibleFilters = [...this.possibleFilters, ...categories];
    } else if(this.props.title==="Fish"){
      this.possibleFilters = [...this.possibleFilters, ...activeFilters, ...filterDefinitions["Fish"]];
    } else if(this.props.title==="Bugs"){
      this.possibleFilters = [...this.possibleFilters, ...activeFilters, ...filterDefinitions["Bugs"]];
    } else if(this.props.title==="Sea Creatures"){
      this.possibleFilters = [...this.possibleFilters, ...activeFilters, ...filterDefinitions["Sea Creatures"]];
    } else if(this.props.title==="Furniture"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Housewares","id":"Data Category:Housewares"},{"name":"Miscellaneous","id":"Data Category:Miscellaneous"},{"name":"Wall-mounted","id":"Data Category:Wall-mounted"},{"name":"Photos","id":"Data Category:Photos"},{"name":"Posters","id":"Data Category:Posters"} ]
      }]
      this.possibleFilters = [...this.possibleFilters, ...categories, ...notCraftVariationsFilters, ...filterDefinitions["Furniture"]];
    } else if(this.props.title==="Clothing"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Headwear","id":"Data Category:Headwear"},{"name":"Accessories","id":"Data Category:Accessories"},{"name":"Tops","id":"Data Category:Tops"},{"name":"Dress-Up","id":"Data Category:Dress-Up"},{"name":"Clothing Other","id":"Data Category:Clothing Other"},{"name":"Bottoms","id":"Data Category:Bottoms"},{"name":"Socks","id":"Data Category:Socks"},{"name":"Shoes","id":"Data Category:Shoes"},{"name":"Bags","id":"Data Category:Bags"},{"name":"Umbrellas","id":"Data Category:Umbrellas"} ]
      }]
      this.possibleFilters = [...this.possibleFilters, ...categories, ...notCraftVariationsFilters, ...filterDefinitions["Clothing"]];
    } else if(this.props.title==="Floor & Walls"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Floors","id":"Data Category:Floors"},{"name":"Rugs","id":"Data Category:Rugs"},{"name":"Wallpaper","id":"Data Category:Wallpaper"}]
      }]
      this.possibleFilters = [...this.possibleFilters, ...categories, ...filterDefinitions["Floor & Walls"]];
    } else if(this.props.title==="Emoticons"){
      this.possibleFilters = [...this.possibleFilters, ...filterDefinitions["Reactions"]];
    } else if(this.props.title==="Recipes"){
      this.possibleFilters = [...this.possibleFilters, ...filterDefinitions["Recipes"]];
    } else if(this.props.title==="Villagers"){
      this.possibleFilters = [...this.possibleFilters, ...filterDefinitions["Villagers"]];
    } else if(this.props.title==="Everything" || this.props.title==="Wishlist"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Housewares","id":"Data Category:Housewares"},{"name":"Miscellaneous","id":"Data Category:Miscellaneous"},{"name":"Wall-mounted","id":"Data Category:Wall-mounted"},{"name":"Photos","id":"Data Category:Photos"},{"name":"Posters","id":"Data Category:Posters"},{"name":"Headwear","id":"Data Category:Headwear"},{"name":"Accessories","id":"Data Category:Accessories"},{"name":"Tops","id":"Data Category:Tops"},{"name":"Dress-Up","id":"Data Category:Dress-Up"},{"name":"Clothing Other","id":"Data Category:Clothing Other"},{"name":"Bottoms","id":"Data Category:Bottoms"},{"name":"Socks","id":"Data Category:Socks"},{"name":"Shoes","id":"Data Category:Shoes"},{"name":"Bags","id":"Data Category:Bags"},{"name":"Umbrellas","id":"Data Category:Umbrellas"},{"name":"Floors","id":"Data Category:Floors"},{"name":"Rugs","id":"Data Category:Rugs"},{"name":"Wallpaper","id":"Data Category:Wallpaper"},{"name":"Recipes","id":"Data Category:Recipes"},{"name":"Tools","id":"Data Category:Tools"},{"name":"Fish","id":"Data Category:Fish"},{"name":"Bugs","id":"Data Category:Insects"},{"name":"Sea Creatures","id":"Data Category:Sea Creatures"},{"name":"Fossils","id":"Data Category:Fossils"},{"name":"Art","id":"Data Category:Art"},{"name":"Villagers","id":"Data Category:Villagers"},{"name":"Music","id":"Data Category:Music"},{"name":"Reactions","id":"Data Category:Reactions"},{"name":"Construction","id":"Data Category:Construction"},{"name":"Fencing","id":"Data Category:Fencing"},{"name":"Other","id":"Data Category:Other"},
        ]
      }]
      this.possibleFilters = [...this.possibleFilters, ...categories, ...notCraftVariationsFilters, ...activeFilters, ...filterDefinitions["All Items"]];
    } else if(this.props.title==="Construction"){
      const categories = [{
        "name": "Type Categories",
        "id": "Type Categories",
        "children": [{"name":"Bridge","id":"Category:Bridge"},{"name":"Incline","id":"Category:Incline"},{"name":"Doors","id":"Category:Door"},{"name":"Roofing","id":"Category:Roofing"},{"name":"Siding","id":"Category:Siding"},{"name":"Mailbox","id":"Category:Mailbox"}]
      }]
      this.possibleFilters = [...this.possibleFilters,...categories]
    } else if(this.props.title==="Music"){
      this.possibleFilters = [...this.possibleFilters, ...filterDefinitions["Music"]]
    } else if(this.props.villagerGifts===true){
      const categories = [{
        "name": "Villager Wearable Filters",
        "id": "Villager Wearable Filters",
        "children": [{"name":"Villager can wear","id":"Villager Equippable:Yes"},{"name":"Villager cannot wear","id":"Villager Equippable:No"}]
      }]
      this.possibleFilters = categories
    }
  }

  componentWillUnmount() {
    this.mounted=false
  }

  async componentDidMount(){
    if(this.props.disableFilters){
      return;
    }
    var defaultValuesStored = await getStorage(this.props.title+"Filters","");

    this.mounted=true;
    if(defaultValuesStored!==""){
      this.setState({selectedItems:defaultValuesStored.split(",")})
      this.setFilters();
    }
    

    // //Check for filters selected that don't exist, could cause errors, then reset them
    // if(defaultValuesStored[0]!==""){
    //   var errors = false;
    //   for(var i = 0; i<defaultValuesStored.length; i++){
    //     var found = false;
    //     for(var x = 0; x<this.possibleFilters.length; x++){
    //       if(this.possibleFilters[x].value===defaultValuesStored[i]){
    //         found=true;
    //       }
    //     }
    //     if(found===false){
    //       console.log("error with saved filters, resetting");
    //       errors = true;
    //       break;
    //     }
    //   }
    //   if(errors){
    //     this.defaultValues=[];
    //     await AsyncStorage.setItem(this.props.title+"Filters", "");
    //     return;
    //   }

    //   this.defaultValues = defaultValuesStored;
      
    //   setTimeout(function() {
    //     if(this.mounted && this.defaultValues!=[""] && this.defaultValues!=[]){
    //       this.props.updateSearchFilters(this.defaultValues);
    //     }
    //   }.bind(this), 0);
    // }
    
    
  }

  setPopupVisible = async (visible) => {
    this.setState({popupVisible:visible});
    if(visible===false && this.mounted){
      await AsyncStorage.setItem(this.props.title+"Filters", this.state.selectedItems.toString());
      console.log(this.props.title+"Filters")
      this.setFilters();
    }
  }

  setFilters = () =>{
    if(this.mounted){
      this.props.updateSearchFilters(this.state.selectedItems); 
    }
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  };


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
              <SectionedMultiSelect
                noResultsComponent={<TextFont style={{padding:20, textAlign:"center", fontSize: 20, color:colors.textBlack[global.darkMode]}}>{attemptToTranslate("Not found")}</TextFont>}
                searchPlaceholderText={attemptToTranslate("Search for an item")}
                IconRenderer={MaterialIcons}
                items={filters}
                uniqueKey="id"
                subKey="children"
                selectText=""
                showDropDowns={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
                ref={SectionedMultiSelect => {this.SectionedMultiSelect = SectionedMultiSelect; if(this.openFirst){SectionedMultiSelect._toggleSelector(true); this.openFirst=false}}}
                colors={{primary:colors.okButton[global.darkMode], chipColor:colors.selectedText[global.darkMode], text:colors.textBlack[global.darkMode], subText:colors.textBlack[global.darkMode], itemBackground: colors.white[global.darkMode], subItemBackground: colors.white[global.darkMode]}}
                hideSelect={true}
                styles={{chipText:{fontFamily:"ArialRoundedBold", padding:10, fontSize:15, color:colors.textBlack[global.darkMode]},confirmText:{padding:7},container:{backgroundColor:colors.white[global.darkMode], borderRadius:15}, selectedItem:{backgroundColor:colors.lightDarkAccent[global.darkMode], marginHorizontal:5, paddingHorizontal:10, borderRadius:5,}, subItem:{marginHorizontal:5, paddingHorizontal:10, paddingVertical:7}, item:{paddingVertical:12}, searchBar:{backgroundColor:colors.lightDarkAccent2[global.darkMode]}, searchTextInput:{color:colors.textBlack[global.darkMode]}}}
                modalWithTouchable={true}
                itemFontFamily={{fontFamily:"ArialRoundedBold"}}
                subItemFontFamily={{fontFamily:"ArialRounded"}}
                searchTextFontFamily={{fontFamily:"ArialRounded"}}
                confirmFontFamily={{fontFamily:"ArialRoundedBold"}}
                confirmText={attemptToTranslate("Confirm")}
              />
              
              <View style={{position:"absolute", bottom: 20}}>
                <ButtonComponent
                  text={"Select Filters"}
                  color={colors.dateButton[global.darkMode]}
                  vibrate={5}
                  onPress={() => {
                    this.SectionedMultiSelect._toggleSelector()
                  }}
                />
                <View style={{flexDirection:"row"}}>
                  <ButtonComponent
                    text={"Clear Filters"}
                    color={colors.filtersResetButton[global.darkMode]}
                    vibrate={5}
                    onPress={() => {

                      this.setPopupVisible(!this.state.popupVisible);
                      this.defaultValues=["Check"];
                      AsyncStorage.setItem(this.props.title+"Filters", "");
                      if(this.mounted){
                        this.props.updateSearchFilters(this.defaultValues);
                      }
                      this.SectionedMultiSelect._removeAllItems()
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