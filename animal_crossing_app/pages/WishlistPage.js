import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox, TouchableOpacity, Image, TextInput, TouchableNativeFeedback, Vibration} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {addCustomList, attemptToTranslate, capitalize, changeCustomListImage, commas, getCustomListImage, getCustomListsAmount, getSettingsString, inCustomLists, inWishlist, removeCustomList, setCustomListsAmount, setLastSelectedListPage} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"
import { Paragraph, SubHeader } from '../components/Formattings';
import Popup, { PopupBottomCustom, PopupInfoCustom } from '../components/Popup';
import ButtonComponent from '../components/ButtonComponent';
import TextFont from '../components/TextFont';
import FastImage from '../components/FastImage';
import { getPhoto } from '../components/GetPhoto';
import { PopupChooseIcon, taskImages } from '../components/PopupAddTask';

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
        
        <TouchableNativeFeedback 
          style={{zIndex:0}}
          background={TouchableNativeFeedback.Ripple(colors.dateButton[global.darkMode], true, 32)}
          onPress={() => {this.popup?.setPopupVisible(true); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}
        >
          <View style={{zIndex:1, backgroundColor:colors.FAB2[global.darkMode], position:"absolute", bottom:20, right: getSettingsString("settingsShowFAB")==="true" ? 95 : 20, width:64, height:64, borderRadius:500, justifyContent:'center', alignItems:'center'}}>
            <Image source={require("../assets/icons/list.png")} style={{opacity:0.6,width:35, height:35, resizeMode:'contain'}}/>
          </View>
        </TouchableNativeFeedback>
        <WishlistSelectionPopup showSelectedOriginal ref={(popup) => this.popup = popup} selectedList={[this.state.selectedList]} changeSelectedList={this.changeSelectedList} addCustomList={this.addCustomList} showAdd/>
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

  setPopupVisible = (visible,checkListKeyString="", subHeader, image="") => {
    this.popup?.setPopupVisible(visible)
    if(this.props.updateWhenOpen){
      this.customLists?.checkIfNeedsRefresh()
    }
    this.setState({checkListKeyString:checkListKeyString, subHeader:subHeader, image: image})
  }

  render(){
    let popupChildren = <>
      <WishlistBox showSelectedOriginal={this.props.showSelectedOriginal} checkListKeyString={this.state.checkListKeyString} text="Wishlist" showDelete={false} id="" selected={this.state.selectedList?.includes("")} changeSelectedList={this.props.changeSelectedList} setPopupVisible={(visible)=>this.popup?.setPopupVisible(visible)}/>
      <CustomLists showSelectedOriginal={this.props.showSelectedOriginal} checkListKeyString={this.state.checkListKeyString} showDelete={this.props.showDelete===false?false:true} showAmount={this.props.showAmount===true?true:false} ref={(customLists) => this.customLists = customLists} selectedList={this.state.selectedList} changeSelectedList={this.props.changeSelectedList} setPopupVisible={(visible)=>this.popup?.setPopupVisible(visible)}/>
    </>
    let imageComponent = <View/>
    if(this.state.image==="" || this.state.image===undefined){
      imageComponent = <></>
    }else if(this.state.image.constructor === String && this.state.image.startsWith("http")){
      imageComponent = <FastImage
        style={{width: 75,height: 75,resizeMode:'contain',borderRadius: 5,}}
        source={{uri:this.state.image}}
        cacheKey={this.state.image}
      />
    }else if (this.state.image){
      imageComponent = <Image
        style={{width: 50,height: 50,resizeMode:'contain',borderRadius: 5, }}
        source={getPhoto(this.state.image)}
      />
    }
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
      var header = <View>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginLeft:5, marginTop:5}}>
          <View style={{flexDirection:"column", flex:1}}>
            <TextFont bold={true} style={{fontSize: 23, textAlign:"left", color: colors.textBlack[global.darkMode],marginBottom:2}}>{"Select A List"}</TextFont>
            <TextFont bold={false} style={{fontSize: 16, textAlign:"left", color: colors.textBlack[global.darkMode]}}>{this.props.subHeader!==undefined ? this.props.subHeader : capitalize(this.state.subHeader)}</TextFont>
          </View>
          <View style={{marginLeft:5}}>
            {imageComponent}
          </View>
        </View>
        <View style={{height:15}}/>
      </View>
      return <>
        <PopupAddWishlist ref={(popupAddWishlist) => this.popupAddWishlist = popupAddWishlist} addCustomList={this.addCustomList}/>

        <PopupInfoCustom ref={(popup) => this.popup = popup} buttonDisabled={true} buttons={buttons} header={header}>
          <View style={{marginHorizontal: -10}}>
            {popupChildren}
          </View>
        </PopupInfoCustom>
      </>
    } else {
      return <>
        <PopupAddWishlist ref={(popupAddWishlist) => this.popupAddWishlist = popupAddWishlist} addCustomList={this.addCustomList}/>
  
        <PopupBottomCustom onClose={this.props.onClose!==undefined?()=>this.props.onClose(this.state.checkListKeyString):()=>{}} ref={(popup) => this.popup = popup}>
          <View style={{flexDirection:"row", justifyContent:"space-between", flexWrap:"wrap", alignItems:"center"}}>
            <View style={{flexDirection:"column", flex:1}}>
              <SubHeader style={{fontSize:25, marginLeft:10, marginBottom:3}} margin={false}>{"Select A List"}</SubHeader>
              {this.state.subHeader!=="" && this.state.subHeader!==undefined ? <SubHeader bold={false} style={{fontSize:16, marginLeft:10}} margin={false}>{capitalize(this.state.subHeader)}</SubHeader>:<View/>}
            </View>
            <View style={{marginLeft:5}}>
              {imageComponent}
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
    if(prevProps!==this.props){
      this.setState({selectedList:this.props.selectedList})
    }
  }

  render(){
    return <>
      {
        this.state.lists.map((item)=>{
          return <WishlistBox showSelectedOriginal={this.props.showSelectedOriginal} checkListKeyString={this.state.checkListKeyString} key={item} text={item} showDelete={this.props.showDelete===false?false:true} showAmount={this.props.showAmount===true?true:false} removeCustomList={this.removeCustomList} addCustomList={this.addCustomList} id={item} selected={this.state.selectedList?.includes(item)} changeSelectedList={this.props.changeSelectedList} setPopupVisible={(visible)=>this.props.setPopupVisible(visible)}/>
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
    this.listName="";
    this.image="leaf.png"
  }
  setPopupVisible = () => {
    this.popup?.setPopupVisible(true)
  }
  setCustomImage = (image) => {
    this.image=image
  }
  render(){
    var buttons = <>
      <ButtonComponent
        text={"Select Icon"}
        color={colors.okButton3[global.darkMode]}
        vibrate={8}
        onPress={() => {
          this.popupChooseIcon?.setPopupVisible(false);
        }}
      /> 
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
            changeCustomListImage(this.listName, this.image)
            this.popup?.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    var header = <>
      <PopupChooseIcon moreImages={taskImages} setImage={(image)=>{this.setCustomImage(image)}} ref={(popupChooseIcon) => this.popupChooseIcon = popupChooseIcon}/>

      <TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>{"New List"}</TextFont>
      <Paragraph styled style={{textAlign:"center"}}>The name cannot be changed.</Paragraph>
      <View style={{height:10}}/>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1, justifyContent:"center", marginHorizontal:5,}}>
          <TextInput
            maxLength={45}
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
    this.state={image:getCustomListImage(this.props.id), selected:this.props.showSelectedOriginal? this.props.selected : (this.props.id===""?inWishlist(this.props.checkListKeyString):inCustomLists(this.props.checkListKeyString, this.props.id)), amount:getCustomListsAmount(this.props.checkListKeyString, this.props.id)}
  }  
  setCustomImage = (image) => {
    this.setState({image:image})
    changeCustomListImage(this.props.id, image)
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
    let imageComponent = <View/>
    if(this.props.id===""){
      imageComponent = <Image source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} style={{opacity:0.7, marginVertical:16,width:25, height:25, marginHorizontal:6, resizeMode:"contain", marginRight:8}}/>
    } else if(this.state.image==="" || this.state.image===undefined){
      imageComponent = <Image
        style={{width: 30,height: 30, resizeMode:'contain', marginVertical:14, marginRight:10,}}
        source={getPhoto("leaf.png")}
      />
    }else if(this.state.image.constructor === String && this.state.image.startsWith("http")){
      imageComponent = <FastImage
        style={{width: 45,height: 45,resizeMode:'contain',marginRight:1, marginLeft:-5, marginVertical:8,}}
        source={{uri:this.state.image}}
        cacheKey={this.state.image}
      />
    }else if (this.state.image){
      imageComponent = <Image
        style={{width: 30,height: 30,resizeMode:'contain', marginVertical:14, marginRight:10}}
        source={getPhoto(this.state.image)}
      />
    }

    return <>
      <PopupChooseIcon moreImages={taskImages} setImage={(image)=>{this.setCustomImage(image)}} ref={(popupChooseIcon) => this.popupChooseIcon = popupChooseIcon}/>

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
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between",backgroundColor: this.state.selected ? colors.lightDarkAccentHeavy[global.darkMode] : colors.lightDarkAccent[global.darkMode],paddingRight: 15, marginHorizontal: 10, marginVertical: 4,  borderRadius: 10}}>
          {this.props.showDelete?
          <TouchableOpacity onPress={()=>{this.props.id!==""?this.popupChooseIcon?.setPopupVisible(true):""}}>
            <View style={{marginHorizontal:10, paddingLeft:5,marginRight:5}}>
              {imageComponent}
            </View>
          </TouchableOpacity>
          :<View style={{marginHorizontal:10, paddingLeft:5,marginRight:5}}>
            {imageComponent}
          </View>}
          <SubHeader margin={false} style={{flex: 1, flexWrap: 'wrap', marginVertical:15, marginRight:10, fontSize: this.props.text!==undefined && this.props.text.length > 13 ? 16 : 18}}>{this.props.text}</SubHeader>
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
          </View>
        </View>
      </TouchableNativeFeedback>
      <Popup ref={(popupDelete) => this.popupDelete = popupDelete} text="Delete?" textLower={this.props.text + "\n\n" + attemptToTranslate("This will remove all items from the list.")} button1={"Cancel"} button1Action={()=>{}} button2={"Delete"} button2Action={()=>{this.props.removeCustomList(this.props.text)}}/>
    </>
  }
}