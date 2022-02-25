import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox, TouchableOpacity, Image, TextInput, TouchableNativeFeedback, Vibration} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {addCustomList, attemptToTranslate, capitalize, commas, getCustomListsAmount, getSettingsString, inCustomLists, inWishlist, removeCustomList, setCustomListsAmount, setLastSelectedListPage} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"
import { Paragraph, SubHeader } from '../components/Formattings';
import Popup, { PopupBottomCustom, PopupInfoCustom } from '../components/Popup';
import ButtonComponent from '../components/ButtonComponent';
import TextFont from '../components/TextFont';

export default class Wishlist extends Component {
  constructor() {
    super();
    this.state = {selectedList: global.lastSelectedListPage!==undefined?global.lastSelectedListPage:""}
  }

  changeSelectedList = (listName) => {
    //listName should be ID
    this.setState({selectedList: listName})
    setLastSelectedListPage(listName)
  }

  render(){
    return(
      <>
        <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(colors.dateButton[global.darkMode], true, 32)}
          onPress={() => {this.popup?.setPopupVisible(true); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}
        >
          <View style={{zIndex:100, backgroundColor:colors.FAB2[global.darkMode], position:"absolute", bottom:100, right: 20, width:64, height:64, borderRadius:500, justifyContent:'center', alignItems:'center'}}>
            <Image source={require("../assets/icons/list.png")} style={{opacity:0.6,width:35, height:35, resizeMode:'contain'}}/>
          </View>
        </TouchableNativeFeedback>
        <WishlistSelectionPopup ref={(popup) => this.popup = popup} selectedList={[this.state.selectedList]} changeSelectedList={this.changeSelectedList} addCustomList={this.addCustomList} showAdd/>
        <AllItemsPage 
          smallerHeader={this.state.selectedList!==undefined&&this.state.selectedList.length>15?true:false}
          // disableFilters={true}
          title={this.state.selectedList===""?"Wishlist":this.state.selectedList}
          wishlistItems={true}
          setPage={this.props.setPage}
          subHeader="Long press items to add/remove from your wishlist"
          appBarColor = {colors.wishlistAppBar[global.darkMode]}
          accentColor = {colors.wishlistAccent[global.darkMode]}
          currentCustomList = {this.state.selectedList}
        />
      </>
    )
  }
}

export class WishlistSelectionPopup extends Component{
  constructor(props){
    super(props)
    this.state = {subHeader:"",checkListKeyString:"", selectedList: (this.props.selectedList!==undefined ? this.props.selectedList : [])}
  }

  componentDidUpdate(prevProps){
    if(prevProps.selectedList!==this.props.selectedList){
      this.setState({selectedList:this.props.selectedList})
    }
  }

  updateSelectedList = () => {
    let outputLists = []
    if(inWishlist(this.state.checkListKeyString)){
      outputLists.push("")
    }
    for(let list of global.customLists){
      if(inCustomLists(this.state.checkListKeyString,list)){
        outputLists.push(list)
      }
    }
    this.setState({selectedList:outputLists})
  }

  addCustomList = (listName) => {
    this.customLists?.addCustomList(listName)
  }

  removeCustomList = (listName) => {
    this.customLists?.removeCustomList(listName)
  }

  setPopupVisible = (visible,checkListKeyString="", subHeader) => {
    this.popup?.setPopupVisible(visible)
    if(this.props.updateWhenOpen){
      this.customLists?.checkIfNeedsRefresh()
    }
    this.setState({checkListKeyString:checkListKeyString, subHeader:subHeader})
  }

  render(){
    let popupChildren = <>
      <WishlistBox text="Wishlist" showDelete={false} id="" selected={this.state.selectedList?.includes("")} changeSelectedList={this.props.changeSelectedList} setPopupVisible={(visible)=>this.popup?.setPopupVisible(visible)}/>
      <CustomLists checkListKeyString={this.state.checkListKeyString} showDelete={this.props.showDelete===false?false:true} showAmount={this.props.showAmount===true?true:false} ref={(customLists) => this.customLists = customLists} selectedList={this.state.selectedList} changeSelectedList={this.props.changeSelectedList} setPopupVisible={(visible)=>this.popup?.setPopupVisible(visible)}/>
    </>
    if(this.props.popupBottom===false){
      var buttons = <>
        <View style={{flexDirection:"row", justifyContent:"center"}}>
          <ButtonComponent
            text={"Close"}
            color={colors.okButton[global.darkMode]}
            vibrate={8}
            onPress={() => {
              this.popup?.setPopupVisible(false);
            }}
          /> 
        </View>
      </>
      var header = <>
        <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode],marginBottom:2}}>{"Select a List"}</TextFont>
        <TextFont bold={true} style={{fontSize: 19, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{this.state.subHeader}</TextFont>
        <View style={{height:15}}/>
      </>
      return <>
        <PopupAddWishlist ref={(popupAddWishlist) => this.popupAddWishlist = popupAddWishlist} addCustomList={this.addCustomList}/>

        <PopupInfoCustom ref={(popup) => this.popup = popup} buttonDisabled={true} buttons={buttons} header={header}>
          {popupChildren}
        </PopupInfoCustom>
      </>
    } else {
      return <>
        <PopupAddWishlist ref={(popupAddWishlist) => this.popupAddWishlist = popupAddWishlist} addCustomList={this.addCustomList}/>
  
        <PopupBottomCustom onClose={this.props.onClose!==undefined?()=>this.props.onClose(this.state.checkListKeyString):()=>{}} ref={(popup) => this.popup = popup}>
          <View style={{flexDirection:"row", justifyContent:"space-between", marginRight:5}}>
            <View>
              <SubHeader style={{fontSize:25, marginLeft:10, marginBottom:3}} margin={false}>{"Select a List"}</SubHeader>
              {this.state.subHeader!=="" && this.state.subHeader!==undefined ? <SubHeader style={{fontSize:19, marginLeft:10}} margin={false}>{capitalize(this.state.subHeader)}</SubHeader>:<View/>}
            </View>
            {this.props.showAdd?<TouchableOpacity style={{padding:4,marginTop:-10}} 
              onPress={()=>{
                this.popupAddWishlist?.setPopupVisible(true)
            }}>
              <Image source={require("../assets/icons/addIcon.png")} style={{opacity:0.8,width:27, height:27, borderRadius:100,}}/>
            </TouchableOpacity>:<View/>}
          </View>
          <View style={{height:15}}/>
          {popupChildren}
        </PopupBottomCustom>
      </>
    }
    
  }
}

class CustomLists extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checkListKeyString:this.props.checkListKeyString!==undefined?this.props.checkListKeyString : "",
      lists: [...global.customLists],
      selectedList:this.props.selectedList
    }
  }

  addCustomList = (listName) => {
    let result = addCustomList(listName)
    if(result){
      this.setState({lists: [...this.state.lists, listName]})
    } else {
      this.warningPopup?.setPopupVisible(true)
    }
  }

  removeCustomList = (listName) => {
    if(this.props.selectedList?.includes(listName)){
      this.props.changeSelectedList("")
    }
    let result = removeCustomList(listName)
    let indexToDelete = this.state.lists.indexOf(listName);
    const newList = this.state.lists.filter((index,i) => i!=indexToDelete);
    if(result){
      this.setState({lists: newList})
    }
  }

  checkIfNeedsRefresh = () => {
    if(global.customLists !== this.state.lists){
      this.setState({lists:global.customLists})
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.checkListKeyString!==this.props.checkListKeyString){
      this.setState({checkListKeyString:this.props.checkListKeyString})
    }
    if(prevProps.selectedList!==this.props.selectedList){
      this.setState({selectedList:this.props.selectedList})
    }
  }

  render(){
    return <>
      {
        this.state.lists.map((item)=>{
          return <WishlistBox checkListKeyString={this.state.checkListKeyString} key={item} text={item} showDelete={this.props.showDelete===false?false:true} showAmount={this.props.showAmount===true?true:false} removeCustomList={this.removeCustomList} addCustomList={this.addCustomList} id={item} selected={this.state.selectedList?.includes(item)} changeSelectedList={this.props.changeSelectedList} setPopupVisible={(visible)=>this.props.setPopupVisible(visible)}/>
        })
      }
      <Popup
        ref={(warningPopup) => this.warningPopup = warningPopup}
        button1={"OK"}
        button1Action={()=>{}}
        text={"Error"}
        textLower={"Please choose a different name and try again."}
      />
    </>
  }
}

class PopupAddWishlist extends Component{
  constructor(){
    super();
    this.listName=""
  }
  setPopupVisible = () => {
    this.popup?.setPopupVisible(true)
  }
  render(){
    var buttons = <>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <ButtonComponent
          text={"Cancel"}
          color={colors.cancelButton[global.darkMode]}
          vibrate={8}
          onPress={() => {
            this.popup?.setPopupVisible(false);
          }}
        /> 
        <ButtonComponent
          text={"Done"}
          color={colors.okButton[global.darkMode]}
          vibrate={15}
          onPress={() => {
            this.props.addCustomList(this.listName)
            this.popup?.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    var header = <>
      <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{"New List"}</TextFont>
      <Paragraph styled>This name cannot be changed.</Paragraph>
      <View style={{height:10}}/>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1, justifyContent:"center", marginHorizontal:5,}}>
          <TextInput
            maxLength={30}
            allowFontScaling={false}
            style={{fontSize: 18, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], padding: 10, borderRadius: 5}}
            onChangeText={(text) => {this.listName=text}}
            placeholder={attemptToTranslate("List Name")}
            placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          />
        </View>
      </View>
    </>
    return <PopupInfoCustom ref={(popup) => this.popup = popup} buttonDisabled={true} buttons={buttons} header={header}/>
  }
}

class WishlistBox extends Component{
  constructor(props){
    super(props)
    this.state={selected:this.props.selected, amount:getCustomListsAmount(this.props.checkListKeyString, this.props.id)}
  }
  componentDidUpdate(prevProps){
    if(prevProps.selected!==this.props.selected || prevProps.checkListKeyString!==this.props.checkListKeyString){
      this.setState({selected:this.props.selected})
    }
    if(prevProps.checkListKeyString!==this.props.checkListKeyString){
      this.setState({amount:getCustomListsAmount(this.props.checkListKeyString, this.props.id)})
    }
  }
  render(){
    return <>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}
        onPress={()=>{
          if(this.state.amount<=0 && this.state.selected===false){
            setCustomListsAmount(this.props.checkListKeyString, this.props.id, this.state.amount+1)
            this.setState({amount: this.state.amount+1, selected: true})
          }
          this.props.changeSelectedList(this.props.id)
          this.props.setPopupVisible(false)
          getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
        }}
      >
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between",backgroundColor: this.state.selected ? colors.lightDarkAccentHeavy[global.darkMode] : colors.lightDarkAccent[global.darkMode], paddingVertical: this.props.showAmount===true?0:15, paddingRight: 15, marginHorizontal: 10, marginVertical: 4,  borderRadius: 10}}>
          <SubHeader style={{flex: 1, flexWrap: 'wrap', marginVertical:this.props.showAmount?15:0}}>{this.props.text}</SubHeader>
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
            {this.props.showAmount?<View style={{justifyContent:"center", flexDirection:"row", alignItems:"center", marginRight: -15,}}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  if(this.state.selected && this.state.amount-1===0){
                    this.setState({selected:false})
                    this.props.changeSelectedList(this.props.id)
                  }
                  if(this.state.amount>0){
                    setCustomListsAmount(this.props.checkListKeyString, this.props.id, this.state.amount-1)
                    this.setState({amount: this.state.amount-1})
                    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
                  }
                }}
              >
                <Image source={require("../assets/icons/minus.png")} style={{opacity:global.darkMode===false?0.9:0.8,width:23, height:23, marginHorizontal:10, marginVertical:15}}/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}>
                <TextFont translate={false} bold={true} style={{marginVertical:15, fontSize:20, color:colors.textBlack[global.darkMode]}}>{commas(this.state.amount)}</TextFont>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  if(!this.state.selected){
                    this.setState({selected:true})
                    this.props.changeSelectedList(this.props.id)
                  }
                  setCustomListsAmount(this.props.checkListKeyString, this.props.id, this.state.amount+1)
                  this.setState({amount: this.state.amount+1})
                  getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
                }}
              >
                <Image source={require("../assets/icons/plus.png")} style={{opacity:global.darkMode===false?0.9:0.8,width:23, height:23, marginHorizontal:10, marginVertical:15, marginRight:20, }}/>
              </TouchableOpacity>
            </View> : <View/>
            }
            {this.props.id===""?<Image source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} style={{opacity:0.7, width:20, height:20, resizeMode:"contain", marginRight:3}}/>:<></>}
          </View>
        </View>
      </TouchableNativeFeedback>
      <Popup ref={(popupDelete) => this.popupDelete = popupDelete} text="Delete?" textLower={this.props.text + "\n\n" + attemptToTranslate("This will remove all items from the list.")} button1={"Cancel"} button1Action={()=>{}} button2={"Delete"} button2Action={()=>{this.props.removeCustomList(this.props.text)}}/>
    </>
  }
}