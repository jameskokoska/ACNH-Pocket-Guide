import React, {Component } from 'react'
import {Vibration, TouchableOpacity, View, Image} from 'react-native'
import colors from "../Colors"
import {getSettingsString} from "../LoadJsonData"
import FastImage from "../components/FastImage"
import {getPhoto} from "../components/GetPhoto"
import TextFont from "../components/TextFont"

{/* <SelectionImage 
  selectedImage={"leaf.png"} 
  images={this.images}
  onSelected={(image)=>{this.setState({selectedImage:image}); this.task.picture=image;}}
  canDeselect={false}
  sizeImage={[35,35]}
  sizeImageOnline={[45,45]}
  sizeContainer={[60,60]}
/> */}

export class SelectionImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: this.props.selectedImage
    };
  }
  render(){
    return(<>
      <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
      {this.props.images.map( (image, index)=>{
        var imageComponent = <View/>
        if(image==="" || image===undefined){
          imageComponent = <View/>
        }else if(image.constructor === String && image.startsWith("http")){
          imageComponent = <FastImage
            style={{width: this.props.sizeImageOnline[0],height: this.props.sizeImageOnline[1],resizeMode:'contain',}}
            source={{uri:image}}
            cacheKey={image}
          />
        }else if (this.props.sizeImage){
          imageComponent = <Image
            style={{width: this.props.sizeImage[0],height: this.props.sizeImage[1],resizeMode:'contain',}}
            source={getPhoto(image)}
          />
        } else {
          imageComponent = <View/>
        }
        return(
          <View key={image+index.toString()} style={{width: this.props.sizeContainer[0],height: this.props.sizeContainer[1], margin:3}}>
            <TouchableOpacity 
              onPress={()=>{
                if(this.props.canDeselect && this.state.selectedImage===image){
                  this.setState({selectedImage:""});
                  this.props.onSelected("");
                } else {
                  this.setState({selectedImage:image});
                  this.props.onSelected(image);
                  getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10]) : "";
                }
              }}
            >
              <View style={{width: this.props.sizeContainer[0],height: this.props.sizeContainer[1],borderRadius: 100,justifyContent: "center",alignItems: "center",borderWidth: 2, borderColor: image===this.state.selectedImage ? colors.checkGreen[global.darkMode] : colors.eventBackground[global.darkMode], backgroundColor:colors.eventBackground[global.darkMode]}}>
                {imageComponent}
              </View>
            </TouchableOpacity>
          </View>
        )})}
      </View>
    </>)
  }
}

export class SelectionText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedText: this.props.selectedText
    };
  }
  render(){
    return(<>
      <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
      {this.props.text.map( (text, index)=>{
        return(
          <View key={text+index.toString()} style={{margin:3}}>
            <TouchableOpacity 
              onPress={()=>{
                if(this.props.canDeselect && this.state.selectedText===Text){
                  this.setState({selectedText:""});
                  this.props.onSelected("");
                } else {
                  this.setState({selectedText:text});
                  this.props.onSelected(text);
                  getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10]) : "";
                }
              }}
            >
              <TextFont 
                style={{fontSize:20,
                color: text===this.state.selectedText ? colors.textWhite[0] : colors.textBlack[global.darkMode],
                paddingHorizontal:15,
                paddingTop: 4,
                paddingBottom: 4,
                marginVertical: 2,
                textAlign: 'center', 
                backgroundColor: colors.achievementsModifier[global.darkMode], 
                borderRadius: 17,
                borderWidth: 2, borderColor: text===this.state.selectedText ? colors.selectedText[global.darkMode] : colors.selectText[global.darkMode], backgroundColor:text===this.state.selectedText ? colors.selectedText[global.darkMode]:colors.eventBackground[global.darkMode]}}
              >
                {text}
              </TextFont>
            </TouchableOpacity>
          </View>
        )})}
      </View>
    </>)
  }
}