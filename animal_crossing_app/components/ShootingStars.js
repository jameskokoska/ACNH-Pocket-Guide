import React, {Component} from 'react';
import {Vibration,TouchableNativeFeedback,TouchableOpacity, View, Image, Animated} from 'react-native';
import TextFont from './TextFont';
import {getStorage, capitalize, commas, findObjectWithGlobal} from "../LoadJsonData"
import colors from '../Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSettingsString, attemptToTranslate} from "../LoadJsonData"
import { ToolItem } from './DurabilityList';
import ButtonComponent from './ButtonComponent';
import Popup from './Popup';
import GuideRedirectButton from './PopupGuideRedirectButton';

export default class ShootingStars extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount(){
    this.mounted=true;
    this.loadList();
  }

  componentWillUnmount(){
    this.mounted=false;
  }

  loadList = async() => {
    var defaultList = [
      {title: "Wishes", total: 20, current:0, image:findObjectWithGlobal("star fragment", "Name", global.dataLoadedMaterials)["Inventory Image"]},
    ]
    var storageData = JSON.parse(await getStorage("ShootingStarsTracker"+global.profile,JSON.stringify(defaultList)));
    if(this.mounted){
      this.setState({data:storageData,});
    }
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("ShootingStarsTracker"+global.profile, JSON.stringify(data));
  }

  editAmount = (index, amount) => {
    const newItemList=this.state.data;
    newItemList[index].current = amount;
    this.setState({data:newItemList})
    this.saveList(newItemList);
  }

  render(){
    const extraInfo= {
      type:"guideRedirect",
      title:"Guide + FAQ",
      content:"You can read more details about shooting stars by visiting the guide page.",
      linkText: "Tap here to read more about shooting stars",
      redirectPassBack: "shootingStarsRedirect"
    }
    return <>
      <View style={{alignItems:"center",flexDirection:"row", right:0, top:0,position:'absolute',zIndex:10}}>
        <GuideRedirectButton icon={"i"} style={{padding:12}} extraInfo={extraInfo} setPage={this.props.setPage}/>
      </View>
      <View style={{height:10}}/>
      <View style={{alignItems: 'center'}}>
        <View style={{paddingTop:0, marginHorizontal: 0, flex: 1, flexDirection: 'row', justifyContent:'center',flexWrap:"wrap"}}>
          {this.state.data.map( (item, index)=>{
            let currentToolItemRef;
            let popupResetRef;
            return(
              <>
                <ToolItem
                  ref={(currentToolItem) => currentToolItemRef = currentToolItem} 
                  key={item+index.toString()}
                  item={item}
                  index={index}
                  editAmount={this.editAmount}
                  deleteItem={this.deleteItem}
                  reorderItem={this.reorderItem}
                  showEdit={this.state.showEdit}
                  canGoOver
                  noLongPress
                  color={colors.starProgress[global.darkMode]}
                  extraComponent={<ButtonComponent
                    style={{opacity:0.9}}
                    text={"Reset"}
                    color={colors.okButton3[global.darkMode]}
                    vibrate={15}
                    onPress={() => {
                      popupResetRef?.setPopupVisible(true)
                    }}
                  />}
                />
                <Popup ref={(popupReset) => popupResetRef = popupReset} text="Reset Count?" button1={"Cancel"} button1Action={()=>{}} button2={"Reset"} 
                  button2Action={()=>{
                    this.editAmount(index,0)
                    currentToolItemRef?.animation()}
                  }
                />
              </>
            )
          })}
        </View>
      </View>
    </>
  }
}