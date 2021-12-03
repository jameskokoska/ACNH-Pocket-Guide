import React, {Component} from 'react';
import {Image, ScrollView, View, Dimensions, TouchableNativeFeedback} from 'react-native';
import TextFont from './TextFont'
import colors from '../Colors';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

function getLabelFromValue(items, value){
  for(let i=0; i<items.length; i++){
    if(items[i].value===value){
      return items[i].label
    }
  }
  return ""
}

export class DropdownMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      canOpen: true,
      selectedTitle: getLabelFromValue(props.items, props.defaultValue),
    }
  }

  openMenu = () => {this.waitUntilOpen(800);this.setState({canOpen:false}); this.setState({visible:true}); }

  closeMenu = () => {this.setState({visible:false});}

  waitUntilOpen = (timeout) => setTimeout(()=>{
    this.setState({canOpen:true});
  }, timeout);

  render(){
    let button = <></>
    if(this.props.selection===true){
      button = <TouchableOpacity activeOpacity={0.7} onPress={this.state.canOpen?()=>{this.openMenu()}:()=>{}}>
        <DropdownMenuPicker width={this.props.width} title={this.state.selectedTitle}/>
      </TouchableOpacity>
    } else {
      button = <TouchableOpacity style={this.props.style} activeOpacity={0.7} onPress={this.state.canOpen?()=>{this.openMenu()}:()=>{}}>
        {this.props.children}
      </TouchableOpacity>
    }

    let maxHeight = 300
    let heightFactor = 0.5
    if(Dimensions.get('window').height*heightFactor < maxHeight){
      maxHeight = Dimensions.get('window').height*heightFactor
    }

    return (<>
        <Menu
          visible={this.state.visible}
          onDismiss={this.closeMenu}
          anchor={this.props.selection?<View style={{width:0, height:20, marginBottom:-18}}/>:button}
          style={{marginTop: -10}}
        >
          <ScrollView style={{maxHeight:maxHeight, backgroundColor:colors.lightDarkAccentHeavyBackground[global.darkMode], borderRadius:10, marginVertical:-15}}>
            {this.props.items.map((item)=>{
              return <DropdownMenuItem highlighted={item.highlighted} width={this.props.width} key={item.value} selectedTitle={this.state.selectedTitle} onPress={()=>{this.setState({visible:false}); this.props.onChangeItem(item); if(this.props.selection) this.setState({selectedTitle:item.label})}} title={item.label}/>
            })}
          </ScrollView>
        </Menu>
        {this.props.selection?button:<></>}
      </>
    );
  }
};

export class DropdownMenuItem extends Component {
  render(){
    return <TouchableNativeFeedback
      onPress={()=>{
        this.props.onPress()
      }}
    >
      <View
        style={{
          borderWidth: 0, 
          borderTopLeftRadius: 8, 
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8, 
          borderBottomRightRadius: 8,
          paddingHorizontal: 15,
          paddingVertical:11,
          backgroundColor: this.props.selectedTitle===this.props.title || this.props.highlighted ? colors.lightDarkAccentHeavy[global.darkMode] : "#FFFFFF00",
          width: this.props.width+43,
        }}>
          <TextFont bold={true} style={{color: colors.textBlack[global.darkMode], fontSize:15}}>{this.props.title}</TextFont>
      </View>
    </TouchableNativeFeedback>
  }
}

export class DropdownMenuPicker extends Component {
  render(){
    return <View
      style={{
        borderWidth: 0, 
        backgroundColor: colors.white[global.darkMode], 
        borderTopLeftRadius: 8, 
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8, 
        borderBottomRightRadius: 8,
        padding: 15,
        paddingHorizontal: 18,
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
      }}>
        <TextFont bold={true} style={{color: colors.textBlack[global.darkMode], fontSize:15, width: this.props.width-10}}>{this.props.title}</TextFont>
        <Image style={{width:11,height:11,resizeMode:'contain',marginLeft:10,}} source={global.darkMode ? require("../assets/icons/dropDownWhite.png") : require("../assets/icons/dropDown.png")} />
    </View>
  }
}