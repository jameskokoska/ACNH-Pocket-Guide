import React, {Component} from 'react';
import {View, TouchableNativeFeedback, Image, Vibration, TouchableOpacity} from 'react-native';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {deleteFilterPreset, getFilterPresets, getSettingsString} from "../LoadJsonData"
import Popup, { PopupBottomCustom } from '../components/Popup';
import { SubHeader } from '../components/Formattings';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class FilterPresetSelectionPopup extends Component{
  setPopupVisible = (visible) => {
    this.popup?.setPopupVisible(visible)
  }

  render(){
    if(this.props.filterPresets===undefined){
      return <View/>
    }

    let popupChildren = this.props.filterPresets===undefined ? [] : (Object.keys(this.props.filterPresets).map((item)=>{
      return <FilterPresetBox key={item} 
        filterKey={item} 
        showDelete={true} 
        setPopupVisible={(visible)=>this.setPopupVisible(visible)} 
        onDelete={(name)=>this.props.deleteFilterPreset(name)} 
        onSelected={async (name)=>{
          if(this.props.filterPresets!==undefined){
            this.props.setFilterPreset(this.props.filterPresets[name])
            await AsyncStorage.setItem(this.props.title+"Filters", this.props.filterPresets[name].join(","));
          }
            
        }}
      />
    }))
      
    return <>
      <PopupBottomCustom onClose={this.props.onClose!==undefined?()=>this.props.onClose(this.state.checkListKeyString):()=>{}} ref={(popup) => this.popup = popup}>
        <View style={{flexDirection:"row", justifyContent:"space-between", flexWrap:"wrap", alignItems:"center"}}>
          <View style={{flexDirection:"column", flex:1}}>
            <SubHeader style={{fontSize:25, marginLeft:10, marginBottom:3}} margin={false}>{"Select A Filter Preset"}</SubHeader>
          </View>
        </View>
        <View style={{height:15}}/>
        {popupChildren}
      </PopupBottomCustom>
    </>
  }
}

export class FilterPresetBox extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return <>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}
        onPress={()=>{
          this.props?.setPopupVisible(false)
          this.props?.onSelected(this.props.filterKey)
          getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
        }}
      >
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between",backgroundColor: colors.lightDarkAccent[global.darkMode],paddingRight: 15, marginHorizontal: 10, marginVertical: 4,  borderRadius: 10}}>
          <SubHeader margin={false} style={{flex: 1, flexWrap: 'wrap', marginVertical:15, marginRight:10, marginLeft: 20, fontSize: this.props.filterKey!==undefined && this.props.filterKey.length > 13 ? 16 : 18}}>{this.props.filterKey}</SubHeader>
          <View style={{flexDirection:"row"}}>
            {this.props.showDelete?<>
              <TouchableOpacity style={{padding:3}} 
                onPress={()=>{
                  this.popupDelete?.setPopupVisible(true)
                  getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
              }}>
                <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.6,width:22, height:22, borderRadius:100,}}/>
              </TouchableOpacity>
            </>
            : <View/>}
          </View>
        </View>
      </TouchableNativeFeedback>
      <Popup ref={(popupDelete) => this.popupDelete = popupDelete} text="Delete?" textLower={this.props.filterKey} button1={"Cancel"} button1Action={()=>{}} button2={"Delete"} 
        button2Action={()=>{
          this.props.onDelete(this.props.filterKey)
        }}
      />
    </>
  }
}

export class SelectFilterPresetButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      filterPresets: undefined
    }
  }

  refreshList = () => {
    getFilterPresets()
    this.setState({})
  }

  async componentDidMount(){
    this.getFilterPresets()
  }

  getFilterPresets = async () => {
    let filterPresets = await getFilterPresets()
    this.setState({
      filterPresets: filterPresets
    })
  }

  deleteFilterPreset = async (filterName) => {
    await deleteFilterPreset(filterName)
    this.getFilterPresets()
  }

  render(){
    if((this.state.filterPresets===undefined ? [] : Object.keys(this.state.filterPresets)).length<=0){
      return <View/>
    }
    return <>
      <TouchableNativeFeedback
        style={{zIndex:10}}
        background={TouchableNativeFeedback.Ripple(colors.dateButton[global.darkMode], true, 44/2)}
        onPress={() => {this.popup?.setPopupVisible(true); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}
      >
        <View style={{zIndex:1, backgroundColor:colors.FAB2[global.darkMode], position:"absolute", bottom:getSettingsString("settingsShowFAB")==="true" ? 90 : 20, right: 20, width:44, height:44, borderRadius:500, justifyContent:'center', alignItems:'center'}}>
          <Image source={require("../assets/icons/filterSearchWhite.png")} style={{opacity:0.5,width:20, height:20, resizeMode:'contain'}}/>
        </View>
      </TouchableNativeFeedback>
      <FilterPresetSelectionPopup ref={(popup) => this.popup = popup} deleteFilterPreset={this.deleteFilterPreset} title={this.props.title} setFilterPreset={this.props.onSelectFilter} filterPresets={this.state.filterPresets}/>
    </>
  }
}


