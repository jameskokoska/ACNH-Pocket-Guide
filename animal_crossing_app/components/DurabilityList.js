import React, {Component} from 'react';
import {Vibration,TouchableNativeFeedback,TouchableOpacity,View, Image, Animated, Dimensions, BackHandler} from 'react-native';
import TextFont from './TextFont';
import {getStorage, commas,} from "../LoadJsonData"
import colors from '../Colors'
import PopupAddTool from "./PopupAddTool"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSettingsString} from "../LoadJsonData"
import ButtonComponent from "./ButtonComponent";
import FastImage from './FastImage';
// import AnimateNumber from 'react-native-countup'

export default class DurabilityList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      showEdit: false,
    }
  }

  componentDidMount(){
    this.mounted=true;
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPressHome",
      this.handleBackButton,
    );
    setTimeout(()=>{
      this.loadList();
    },0)
  }

  componentWillUnmount(){
    this.mounted=false;
    BackHandler.removeEventListener("hardwareBackPressHome", this.handleBackButton);
  }

  handleBackButton = () => {
    if(this.state.showEdit===true){
      this.setState({showEdit:false})
      return true
    } else {
      return false
    }
  }

  loadList = async() => {
    var defaultList = [
      {title: 'Shovel', total: 100, current:0, image: "https://acnhcdn.com/latest/FtrIcon/ToolScoop_Remake_0_0.png"},
      {title: 'Slingshot', total: 20, current:0, image: "https://acnhcdn.com/latest/FtrIcon/ToolSlingshot_Remake_0_0.png"},
    ]
    var storageData = JSON.parse(await getStorage("ToolList"+global.profile,JSON.stringify(defaultList)));
    if(this.mounted){
      this.setState({data:storageData,});
    }
  }

  saveList = async(data) => {
    await AsyncStorage.setItem("ToolList"+global.profile, JSON.stringify(data));
  }

  editAmount = (index, amount) => {
    const newItemList=this.state.data;
    newItemList[index].current = amount;
    this.setState({data:newItemList})
    this.saveList(newItemList);
  }

  deleteItem = (index) => {
    const newItemList = this.state.data.filter((item,i) => i!=index);
    this.setState({data:newItemList});
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.saveList(newItemList);
  }

  reorderItem = (index, direction) => {
    //-1 moves the item down
    //1 moves the item up
    const items = this.state.data
    const position = index
    if (
      (direction === -1 && position === 0) ||
      (direction === 1 && position === items.length - 1)
    ) {
      return;
    }

    const item = items[position]; // save item for later
    
    items.splice(index, 1);
    items.splice(position + direction, 0, item);

    this.setState({data: items});
    this.saveList(items);
  };

  componentWillUnmount(){
  }

  addItemPopup = (open) => {
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.popupAddTool.setPopupVisible(true);
  }

  addItem = (item) => {
    var addedItem = this.state.data;
    //flimsy net fix -> changes 5-10 into 510, so change it to 10
    if(item?.total===510){
      item.total=10
    }
    addedItem.push(item);
    this.setState({data: addedItem});
    this.saveList(addedItem);
  }


  render(){
    return <>
      <View style={{alignItems:"center",flexDirection:"row", right:0, top:0,position:'absolute',zIndex:10}}>
        <TouchableOpacity style={{padding:10}} 
          onPress={()=>{
            this.setState({showEdit:!this.state.showEdit});
            getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
        }}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{this.state.showEdit ? "Disable Edit List" : "Edit List"}</TextFont>
        </TouchableOpacity>
        <TouchableOpacity style={{padding:10}} 
          onPress={()=>{
            this.addItemPopup(true); 
        }}>
          <Image source={require("../assets/icons/addIcon.png")} style={{width:25, height:25, borderRadius:100,}}/>
        </TouchableOpacity>
      </View>
      <View style={{height:10}}/>
      <View style={{alignItems: 'center'}}>
        {this.state.data.map( (item, index)=>{
          return(
            <View style={{width:"100%", paddingHorizontal:5}} key={item+index.toString()}>
              <ToolItem
                item={item}
                index={index}
                editAmount={this.editAmount}
                deleteItem={this.deleteItem}
                reorderItem={this.reorderItem}
                showEdit={this.state.showEdit}
              />
            </View>
          )
        })}
      </View>
      <PopupAddTool ref={(popupAddTool) => this.popupAddTool = popupAddTool} addItem={this.addItem}/>
    </>
  }
}


export class ToolItem extends Component {
  constructor(props) {
    super();
    this.state = {
      showRemove:false,
      animationValue: new Animated.Value(-Dimensions.get('window').width),
      width:0,
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps!==this.props){
      this.setState({showRemove:false})
    }
  }
  removeButton = (props)=>{
    if(props.showEdit || this.state.showRemove)
      return(<>
        <View style={{flexDirection:"row",left:-10, top:-10,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{padding:9}} 
            onPress={()=>{
              props.deleteItem(props.index); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",right:-5, top:-5,position:'absolute',zIndex:10, }}>
          <TouchableOpacity style={{padding:5}} 
            onPress={()=>{
              props.reorderItem(props.index, -1); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/upArrow.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:5}} 
            onPress={()=>{
              props.reorderItem(props.index, 1); 
              this.setState({showRemove:false})
          }}>
            <Image source={require("../assets/icons/downArrow.png")} style={{opacity:0.5,width:15, height:15, borderRadius:100,}}/>
          </TouchableOpacity>
        </View>
      </>)
    else
      return(
        <View/>
      )
  }
  animation=(width=0)=>{
    var percent = (this.props.item?.current/this.props.item?.total)
    if(this.props.item?.total===0 || this.props.item===undefined || this.props.item.total===undefined || this.props.item.current===undefined){
      percent = 1
    }
    if(percent>1){
      percent = 1
    } else if (percent < 0){
      percent = 0
    }
    let animateToValue = 0
    if(width!==0){
      animateToValue = width - percent*width
    } else {
      animateToValue = this.state.width - percent*this.state.width
    }
    if(getSettingsString("settingsLowEndDevice")==="true"){

    } else {
      Animated.timing(this.state.animationValue, {
        toValue: animateToValue*-1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }
  render(){
    return (
      <View onLayout={(event) => {
          let width = event?.nativeEvent?.layout?.width;
          this.setState({width:width})
          this.animation(width)
        }} style={{margin:10, overflow:"hidden", borderRadius:10}}
      >
        <View style={{width: "100%", position:"absolute", backgroundColor:colors.eventBackground[global.darkMode], height:"100%", bottom:0 }}/>
        {getSettingsString("settingsLowEndDevice")==="true"?
        <View style={{width:((this.props.item?.current/this.props.item?.total)*100).toString()+"%", height:"100%", position:"absolute", backgroundColor:this.props.color!==undefined?this.props.color:colors.toolProgress[global.darkMode], borderRadius:10, bottom:0}}/>:
        <Animated.View style={{transform: [{ translateX: this.state.animationValue }], height:"100%", position:"absolute", backgroundColor:this.props.color!==undefined?this.props.color:colors.toolProgress[global.darkMode], width:"100%", borderRadius:10, bottom:0}}/>}
        {this.removeButton(this.props)}
        <TouchableNativeFeedback onLongPress={() => {
            if(this.props.noLongPress===true){
              return
            }
            this.setState({showRemove:!this.state.showRemove})
            getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(8) : "";
          }}
          background={TouchableNativeFeedback.Ripple(colors.inkWell[global.darkMode]+"1A", false)}
        >
          <View style={{justifyContent:"center", padding:5, paddingVertical:13}}>
            <View style={{flexDirection:"row", justifyContent:"space-around", alignItems:"center"}}>
              <View style={{borderRadius:50, backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode], padding:10}}>
                <FastImage cacheKey={this.props.item.image} source={{uri:this.props.item.image}} style={{height: 55, width: 55, resizeMode:'contain'}}/>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  this.props.editAmount(this.props.index,this.props.item?.current>0 ? this.props.item?.current-1 : this.props.item?.current)
                  getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
                  this.animation()
                }}
              >
                <Image source={require("../assets/icons/minus.png")} style={{opacity:global.darkMode===false?0.9:0.8,width:34, height:34, margin:10, marginVertical: 22}}/>
              </TouchableOpacity>
              <View style={{flexDirection:"column", alignItems:"center"}}>
                <View style={{alignItems: 'baseline',flexDirection:"row",}}>
                  <TextFont translate={false} bold={true} style={{fontSize:25, color:colors.textBlack[global.darkMode]}}>{commas(this.props.item?.total-this.props.item?.current<0?0:this.props.item?.total-this.props.item?.current)}</TextFont>
                </View>
                {/* <AnimateNumber style={{fontSize:25, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold"}} formatter={(val) => {
                    return val.toFixed(0)
                  }} initial={0} value={this.props.item?.total-this.props.item?.current}/> */}
                <TextFont style={{fontSize:15, color:colors.textBlack[global.darkMode], marginTop:-4}}>{"remaining"}</TextFont>
                <View style={{alignItems: 'center',flexDirection:"row",}}>
                  <TextFont translate={false} style={{fontSize:15, color:colors.textBlack[global.darkMode]}}>{commas(this.props.item?.current)}</TextFont>
                  <View style={{width:5}}/>
                  <TextFont style={{fontSize:18, color:colors.textBlack[global.darkMode]}}>/</TextFont>
                  <View style={{width:5}}/>
                  <TextFont translate={false} style={{fontSize:15, color:colors.textBlack[global.darkMode]}}>{commas(this.props.item?.total)}</TextFont>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                  this.props.editAmount(this.props.index,this.props.canGoOver? this.props.item?.current + 1 : (this.props.item?.current<this.props.item?.total ? this.props.item?.current+1 : this.props.item?.current))
                  getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
                  this.animation()
                }}
              >
                <Image source={require("../assets/icons/plus.png")} style={{opacity:global.darkMode===false?0.9:0.8,width:34, height:34, margin:10, marginVertical: 22}}/>
              </TouchableOpacity>
            </View>
            {this.state.showRemove || this.props.showEdit?
              <ButtonComponent
                text={"Repair"}
                color={colors.okButton[global.darkMode]}
                vibrate={15}
                onPress={() => {
                  this.props.editAmount(this.props.index,0)
                  this.animation()
                  this.setState({showRemove:false})
                }}
              />
              :
              <View/>
            }
            {this.props.extraComponent!==undefined ? this.props.extraComponent : <View/>}
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

export class CountUp extends Component{
  constructor(props) {
    super();
    this.state = {
      currentNumber: 0
    }
  }
  componentDidMount(){
    this.countUp(this.props.startValue)
  }
  countUp = (i) => {
    this.setState({currentNumber:i})
    if (this.props.countDown && i < this.props.endValue)
      setTimeout(()=>{this.countUp(i - 1)}, 10);
    else if ((this.props.countDown===false || this.props.countDown===undefined) && i < this.props.endValue)
      setTimeout(()=>{this.countUp(i + 1)}, 10);
  }
  render(){
    return <TextFont style={{fontSize:15, color:colors.textBlack[global.darkMode]}}>{this.state.currentNumber}</TextFont>
  }
}