import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import TextFont from "./TextFont";
import ButtonComponent from "./ButtonComponent";
import colors from "../Colors";
import {PopupInfoCustom} from "./Popup"
import {findMultipleObjectWithGlobal} from "../LoadJsonData"
import { SelectionImage } from "./Selections";


export default class PopupAddTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: false,
    };
    this.tool = {title: "", image:"", total:0, current:0};
    this.images = []
    this.items = []
  }

  componentDidMount(){
    this.items = findMultipleObjectWithGlobal(
      [
        "flimsy shovel","shovel","colorful shovel","outdoorsy shovel","printed-design shovel","golden shovel",
        "flimsy net", "net", "colorful net", "outdoorsy net", "star net", "golden net",
        "flimsy fishing rod", "fishing rod", "colorful fishing rod", "outdoorsy fishing rod", "fish fishing rod","golden rod",
        "slingshot", "colorful slingshot", "outdoorsy slingshot", "golden slingshot",
        "flimsy axe", "stone axe", "axe", "golden axe", 
        "flimsy watering can", "watering can", "colorful watering can", "outdoorsy watering can", "elephant watering can", "golden watering can"
      ], "Name",global.dataLoadedTools,true,true
    )
    for(let item of this.items){this.images.push(item["Image"])}
    this.tool.image = this.images[0]
    this.tool.total = this.items[0]["Uses"]
    this.tool.title = this.items[0]["NameLanguage"]
  }

  setPopupVisible = (visible) => {
    this.popup?.setPopupVisible(true);
    this.tool = {title: "", image:"", total:0, current:0};
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
            this.tool.total = parseInt(this.tool.total.toString().replace(/[^0-9]/g, ''));
            this.props.addItem(this.tool);
            this.popup?.setPopupVisible(false);
          }}
        /> 
      </View>
    </>
    var header = <>
      <TextFont bold={true} style={{fontSize: 24, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Add Tool</TextFont>      
      <View style={{height:10}}/>
    </>
    return (
      <>
        <PopupInfoCustom ref={(popup) => this.popup = popup} buttonDisabled={true} buttons={buttons} header={header}>
          <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
            <View style={{flex:1, justifyContent:"center", marginHorizontal:5,}}>
              <SelectionImage
                selectedImage={this.tool.image} 
                images={this.images}
                onSelected={(image)=>{
                  for(let item of this.items){
                    if(item["Image"]===image){
                      this.tool.image=image
                      this.tool.title=item["NameLanguage"]!==undefined?item["NameLanguage"]:item["Name"]
                      this.tool.total=item["Uses"]
                    }
                  }
                }}
                canDeselect={false}
                sizeImage={[35,35]}
                sizeImageOnline={[50,50]}
                sizeContainer={[60,60]}
              />
            </View>
          </View>
        </PopupInfoCustom>
      </>
    )
  }
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    paddingTop: "10%",
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