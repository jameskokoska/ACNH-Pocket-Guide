import React, {Component} from 'react';
import {Animated,FlatList, Dimensions, TouchableOpacity,StyleSheet, Text, View, Image} from 'react-native';
import {removeAccents,getStorage, findObject, attemptToTranslateItem} from "../LoadJsonData"
import colors from '../Colors'
import {attemptToTranslateAchievement} from "../LoadJsonData"
import FastImage from "../components/FastImage"
import {SubHeader, Paragraph} from "../components/Formattings"
import Header from "../components/Header"
import * as RootNavigation from '../RootNavigation.js';

export default class ParadiserequestningPage extends Component {
  constructor(props){
    super(props);
    this.data = require("../assets/data/DataCreated/Paradise Planning.json");
    this.state = {
      selectedAchievement:"",
      data: require("../assets/data/DataCreated/Paradise Planning.json"),
    }
  }

  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  handleSearch = (text) => {
    if(text===""){
      if(this.mounted){
        this.setState({data: this.data})
      }
    } else {
      var outputData = [];
      this.data.map( (request, index)=>{
        let requestRequest = request["Request"];
        if(removeAccents(requestRequest.toLowerCase()).includes(removeAccents(text.toLowerCase()))){
          outputData.push(request);
        } else if (attemptToTranslateItem(request["Name"]).toLowerCase().includes(text.toLowerCase())){
          outputData.push(request);
        }
      })
      if(this.mounted){
        this.setState({data:outputData});
      }
    }
  }

  headerHeight = Dimensions.get('window').height*0.3;
  scrollY = new Animated.Value(0);
  scrollYClamped = Animated.diffClamp(this.scrollY, 0, this.headerHeight/0.8); //or 1.5
  translateY = this.scrollYClamped.interpolate({
    inputRange: [0, this.headerHeight],
    outputRange: [0, -(this.headerHeight)],
  });
  
  render(){
    return <>
      <Animated.View style={{width:Dimensions.get('window').width,position:"absolute", zIndex:1, transform: [{ translateY: this.translateY }]}}>
        <View style={{backgroundColor: colors.background[global.darkMode], flex: 1,justifyContent: 'flex-end',height:this.headerHeight,}}>
          <Header disableFilters={true} disableSearch={false} title={"Paradise Planning"} headerHeight={this.headerHeight} updateSearch={this.handleSearch} appBarColor={colors.paradisePlansAppBar[global.darkMode]} searchBarColor={colors.searchbarBG[global.darkMode]} titleColor={colors.textBlack[global.darkMode]}/>
        </View>
      </Animated.View>
      <Animated.FlatList
        style={{paddingTop:this.headerHeight+5}}
        onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: this.scrollY}}}],{useNativeDriver: true,},)}
        data={this.state.data}
        renderItem={({item, index}) => {
            return(<Request request={item}/>)
        }}
        keyExtractor={(item, index) => `list-item-${index}-${item["Name"]}`}
        contentContainerStyle={{paddingBottom:Dimensions.get('window').height/3}}
      />
    </>
  }
}

class Request extends React.PureComponent{
  constructor(props){
    super(props);
    this.villagerObject = findObject(this.props.request["Name"], "Name", "Villagers")
  }
  render(){
    return <>
      <TouchableOpacity activeOpacity={0.7} onPress={()=>{RootNavigation.navigate('36', {propsPassed:this.props.request});}}>
      <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
        <View style={{paddingRight:40}}>
          <SubHeader style={{fontSize: 28,}}>{this.villagerObject["NameLanguage"]}</SubHeader>
          <SubHeader style={{fontSize: 19,}}>{this.props.request["Request"]}</SubHeader>
        </View>
        <FastImage source={{uri:this.villagerObject["Icon Image"]}} cacheKey={this.villagerObject["Icon Image"]} style={{position:"absolute", right:13, top:13, height: 60, width: 60, resizeMode:'contain'}}/>
        <Paragraph style={{marginTop:3}} translate={false} styled={true}>{attemptToTranslateAchievement(this.props.request["Thought bubble"])}</Paragraph>
      </View>
      </TouchableOpacity>
    </>
  }
}