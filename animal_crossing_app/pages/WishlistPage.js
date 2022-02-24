import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text, LogBox, TouchableOpacity, Image, TextInput, TouchableNativeFeedback} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {addCustomList, attemptToTranslate, getSettingsString, removeCustomList} from "../LoadJsonData"
import AllItemsPage from "./AllItemsPage"
import { Paragraph, SubHeader } from '../components/Formattings';
import Popup, { PopupBottomCustom, PopupInfoCustom } from '../components/Popup';
import ButtonComponent from '../components/ButtonComponent';
import TextFont from '../components/TextFont';

export default class Wishlist extends Component {
  constructor() {
    super();
    this.state = {selectedList: ""}
  }

  changeSelectedList = (listName) => {
    //listName should be ID
    this.setState({selectedList: listName})
  }

  render(){
    return(
      <>
        <TouchableOpacity onPress={()=>{this.popup?.setPopupVisible(true)}} style={{zIndex:100, backgroundColor:"green", position:"absolute", bottom:50, width:100, height:100}}>
          <View></View>
        </TouchableOpacity>
        <WishlistSelectionPopup ref={(popup) => this.popup = popup} selectedList={[this.state.selectedList]} changeSelectedList={this.changeSelectedList} addCustomList={this.addCustomList}/>
        <AllItemsPage 
          smallerHeader={this.state.selectedList!==undefined&&this.state.selectedList.length>15?true:false}
          // disableFilters={true}
          title={this.state.selectedList===""?"Wishlist":this.state.selectedList}
          wishlistItems={true}
          setPage={this.props.setPage}
          subHeader="Long press items to add/remove from your wishlist"
          appBarColor = {colors.wishlistAppBar[global.darkMode]}
          accentColor = {colors.wishlistAccent[global.darkMode]}
        />
      </>
    )
  }
}

export class WishlistSelectionPopup extends Component{
  addCustomList = (listName) => {
    this.customLists?.addCustomList(listName)
  }

  removeCustomList = (listName) => {
    this.customLists?.removeCustomList(listName)
  }

  setPopupVisible = (visible) => {
    this.popup?.setPopupVisible(visible)
  }

  render(){
    return <>
      <PopupAddWishlist ref={(popupAddWishlist) => this.popupAddWishlist = popupAddWishlist} addCustomList={this.addCustomList}/>
 
      <PopupBottomCustom ref={(popup) => this.popup = popup}>
        <View style={{flexDirection:"row", justifyContent:"space-between", marginRight:5}}>
          <SubHeader style={{fontSize:25, marginLeft:10}} margin={false}>{"Lists"}</SubHeader>
          {this.props.showAdd?<TouchableOpacity style={{padding:4,marginTop:-10}} 
            onPress={()=>{
              this.popupAddWishlist?.setPopupVisible(true)
          }}>
            <Image source={require("../assets/icons/addIcon.png")} style={{opacity:0.8,width:27, height:27, borderRadius:100,}}/>
          </TouchableOpacity>:<View/>}
        </View>
        <View style={{height:15}}/>

        <WishlistBox text="Wishlist" showDelete={false} id="" selected={this.props.selectedList?.includes("")} changeSelectedList={this.props.changeSelectedList} setPopupVisible={(visible)=>this.popup?.setPopupVisible(visible)}/>
        <CustomLists showDelete={this.props.showDelete===false?false:true} ref={(customLists) => this.customLists = customLists} selectedList={this.props.selectedList} changeSelectedList={this.props.changeSelectedList} setPopupVisible={(visible)=>this.popup?.setPopupVisible(visible)}/>

      </PopupBottomCustom>
    </>
  }
}

class CustomLists extends Component{
  constructor() {
    super();
    this.state = {lists: [...global.customLists]}
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
    let result = removeCustomList(listName)
    let indexToDelete = this.state.lists.indexOf(listName);
    const newList = this.state.lists.filter((index,i) => i!=indexToDelete);
    if(result){
      this.setState({lists: newList})
    }
  }

  render(){
    return <>
      {
        this.state.lists.map((item)=>{
          return <WishlistBox key={item} text={item} showDelete={this.props.showDelete===false?false:true} removeCustomList={this.removeCustomList} id={item} selected={this.props.selectedList?.includes(item)} changeSelectedList={this.props.changeSelectedList} setPopupVisible={(visible)=>this.props.setPopupVisible(visible)}/>
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
  render(){
    return <>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode], false)}
        onPress={()=>{
          this.props.changeSelectedList(this.props.id)
          this.props.setPopupVisible(false)
        }}
      >
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between",backgroundColor: this.props.selected ? colors.lightDarkAccentHeavy[global.darkMode] : colors.lightDarkAccent[global.darkMode], paddingVertical: 15, paddingRight: 15, marginHorizontal: 10, marginVertical: 4,  borderRadius: 10}}>
          <SubHeader>{this.props.text}</SubHeader>
          <View style={{flexDirection:"row"}}>
            {this.props.showDelete?<>
              <TouchableOpacity style={{padding:3}} 
                onPress={()=>{
                  this.popupDelete?.setPopupVisible(true)
              }}>
                <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.6,width:22, height:22, borderRadius:100,}}/>
              </TouchableOpacity>
            </>
            : <View/>}
            {this.props.id===""?<Image source={global.darkMode ? require("../assets/icons/shareWhite.png") : require("../assets/icons/share.png")} style={{opacity:0.7, width:20, height:20, resizeMode:"contain", marginRight:3}}/>:<></>}
          </View>
        </View>
      </TouchableNativeFeedback>
      <Popup ref={(popupDelete) => this.popupDelete = popupDelete} text="Delete?" textLower={this.props.text + "\n\n" + attemptToTranslate("This will remove all items from the list.")} button1={"Cancel"} button1Action={()=>{}} button2={"Delete"} button2Action={()=>{this.props.removeCustomList(this.props.text)}}/>
    </>
  }
}