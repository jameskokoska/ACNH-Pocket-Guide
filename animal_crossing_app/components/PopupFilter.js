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


class PopupFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupVisible: props.popupVisible,
    };   
  }
  componentDidUpdate(){
    if(this.props.popupVisible===true&&this.state.popupVisible===false)
      this.setPopupVisible(this.props.popupVisible);
  }

  setPopupVisible = (visible) => {
    this.setState({popupVisible:visible});
  }

  render(){
    var dropDownPickerOpacity = 0
    if(this.props.possibleFilters!== undefined && this.props.possibleFilters.length!==0){
      dropDownPickerOpacity = 0.7
    }
    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.popupVisible}
          statusBarTranslucent
          onRequestClose={()=>{
            this.setPopupVisible(!this.state.popupVisible);
            this.props.close();}}
        >
        <View style={styles.centeredView}>
          <TouchableOpacity onPress={()=>{this.setPopupVisible(!this.state.popupVisible); this.props.close();}} style={{position:"absolute", width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor: "black", opacity: 0.1}}/>
          <View style={[styles.modalView,{backgroundColor: colors.white[global.darkMode], height:Dimensions.get('window').height*0.75}]}>
            <TextFont bold={true} style={{fontSize: 22, textAlign:"center", color: colors.textBlack[global.darkMode]}}>Set Filters</TextFont>
            <View style={{height:10}}/>
            <DropDownPicker
              items={this.props.possibleFilters}
              placeholder={"Select filter..."}
              defaultValue={[]}
              multipleText="%d filters(s) applied"
              dropDownMaxHeight={Dimensions.get('window').height*0.55}
              containerStyle={{height: 45, marginLeft: 15, marginRight: 15}}
              style={[{width: "100%", borderWidth: 0, backgroundColor: colors.searchbarBG[global.darkMode], opacity: dropDownPickerOpacity,borderTopLeftRadius: 8, borderTopRightRadius: 8,borderBottomLeftRadius: 8, borderBottomRightRadius: 8}]}
              searchable={this.props.filterSearchable}
              itemStyle={{
                  justifyContent: 'flex-start'
              }}
              multiple
              isVisible
              searchablePlaceholderTextColor={colors.filterSearch[global.darkMode]}
              labelStyle={{fontSize: 15, marginLeft:10, color:colors.textBlack[global.darkMode]}}
              customTickIcon={()=><View/>}
              activeItemStyle={{borderRadius: 10, backgroundColor: colors.lightDarkAccent[global.darkMode]}}
              dropDownStyle={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 0, backgroundColor: colors.filterBG[global.darkMode], opacity: 0.98, }}
              onChangeItem={item => this.props.updateSearch(item)}
            />
            <View style={{flexDirection:"row", position:"absolute", bottom: 20}}>
              <ButtonComponent
                text={"OK"}
                color={colors.okButton[global.darkMode]}
                vibrate={5}
                onPress={() => {
                  this.setPopupVisible(!this.state.popupVisible);
                  this.props.close();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      </>
    )
  }
}
export default PopupFilter;

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