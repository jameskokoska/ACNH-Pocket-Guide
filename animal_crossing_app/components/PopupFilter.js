import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Vibration,
  Animated,
  Easing,
  Dimensions
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import DropDownPicker from 'react-native-dropdown-picker'
import {translateFilters, getStorage, attemptToTranslate} from '../LoadJsonData';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    //Check for filters selected that don't exist, could cause errors, then reset them
    if(defaultValuesStored[0]!==""){
      var errors = false;
      for(var i = 0; i<defaultValuesStored.length; i++){
        var found = false;
        for(var x = 0; x<this.props.possibleFilters.length; x++){
          if(this.props.possibleFilters[x].value===defaultValuesStored[i]){
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
        if(this.mounted && this.defaultValues!=[""]){
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
    if(this.props.possibleFilters!== undefined && this.props.possibleFilters.length!==0){
      dropDownPickerOpacity = 0.7
    }
    const filters = translateFilters(this.props.possibleFilters)
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
                items={this.props.possibleFilters}
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