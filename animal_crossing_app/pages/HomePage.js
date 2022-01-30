import React, {Component} from 'react';
import {Animated, Vibration, Image, Dimensions, TouchableOpacity, TextInput, StyleSheet, Text, View, Keyboard, BackHandler} from 'react-native';
import Clock from '../components/Clock';
import HomeContentArea from '../components/HomeContentArea';
import {EventContainer,getEventsDay} from '../components/EventContainer';
import StoreHoursContainer, { StoreHoursContainerHarvey } from '../components/StoreHoursContainer';
import ProgressContainerToggle from '../components/ProgressContainer';
import LottieView from 'lottie-react-native';
import colors from '../Colors'
import {setSettingsString, getCurrentVillagerNamesString, getInverseVillagerFilters, capitalize,countCollection,getStorage, countCollectionSpecial, collectionListRemoveDuplicates, countCollectionAchievements, countAchievements} from "../LoadJsonData"
import TextFont from "../components/TextFont"
import ActiveCreatures from "../components/ActiveCreatures"
import CurrentVillagers from "../components/CurrentVillagers"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentDateObject, doWeSwapDate, addDays, hoursStringNook, hoursStringAble, hoursNook, hoursAble} from '../components/DateFunctions';
import {TodoList, TurnipLog} from '../components/TodoList';
import VisitorsList from '../components/VisitorsList';
import {translateDreamAddressBeginning, translateIslandNameInputLabel2, translateIslandNameInputLabel1, getSettingsString, attemptToTranslate} from "../LoadJsonData"
import { ScrollView } from 'react-native-gesture-handler';
import Popup, {PopupBottomCustom, PopupRaw} from "../components/Popup"
import VillagerPopup from "../popups/VillagerPopup"
import ToggleSwitch from 'toggle-switch-react-native'
import {SubHeader, Paragraph} from "../components/Formattings"
import FadeInOut from "../components/FadeInOut"
import {getMaterialImage} from "../components/GetPhoto"
import FastImage from "../components/FastImage"
import {cancelAllPushNotifications} from "../Notifications"
import DateTimePicker from '@react-native-community/datetimepicker';
import ButtonComponent from "../components/ButtonComponent"
import {SelectionImage} from "../components/Selections"
import PopupChangelog from '../components/PopupChangelog';
import LoanList from "../components/LoanList"
import { LinearGradient } from 'expo-linear-gradient';
import { calculateHeaderHeight } from '../components/ListPage';
import * as RootNavigation from '../RootNavigation.js';
import DurabilityList from '../components/DurabilityList';
import ShootingStars from '../components/ShootingStars';

class HomePage extends Component {
  constructor(props){
    super(props);
    var eventSections = props.eventSections;
    if(eventSections.hasOwnProperty("App notifications")){
      getSettingsString("settingsNotifications")==="true" ? eventSections["App notifications"]=true : eventSections["App notifications"]=false;
    }
    this.searchOpen = false
    this.keyboardStatus = false
    this.searchText = ""
    this.cannotOpenSearchOnThisSlide = false;
    this.keyboardInterference = false;
    this.state = {
      eventSections:props.eventSections,
      sectionsOrder:this.props.sectionsOrder, 
      sections:props.sections, 
      editOrder:false,
    }
  }
  
  componentDidMount(){
    setTimeout(()=>{this.scrollViewRef?.scrollTo({
      y:this.headerHeight,
      animated:false
    });},0)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPressHome",
      this.handleBackButton,
    );
  }
    
  componentWillUnmount(){
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
    BackHandler.removeEventListener("hardwareBackPressHome", this.handleBackButton);
  }

  handleBackButton = () => {
    if(this.state.editOrder===true){
      this.setState({editOrder:false})
      return true
    } else {
      return false
    }
  }

  keyboardDidHide = () => {
    if (this.searchOpen) {
      this.keyboardInterference = true
      this.scrollViewRef.scrollTo({
        y:this.headerHeight
      });
      this.closeSearch()
      setTimeout(()=>{this.keyboardInterference = false},1000)
    }
    this.keyboardStatus = false
  }

  keyboardDidShow = () => {
    this.keyboardStatus = true
  }

  openVillagerPopup = (item) => {
    this.villagerPopupPopup?.setPopupVisible(true, item);
  }
  setPages = async (checked,name) =>{
    var sections = this.state.sections;
    sections[name] = checked;
    this.setState({sections:sections});
    await AsyncStorage.setItem("Sections", JSON.stringify(sections));
  }

  setEventPages = async (checked,name) =>{
    var eventSections = this.state.eventSections;
    eventSections[name] = checked;
    this.setState({eventSections:eventSections});
    await AsyncStorage.setItem("EventSections", JSON.stringify(eventSections));
  }

  setLoadedToDo = (status) => {
    this.setState({loadedToDo: status})
  }

  scrollToEnd = () => {
    this.scrollViewRef?.scrollToEnd()
  }

  reorderItem = async (index, direction) => {
    //-1 moves the item down
    //1 moves the item up
    const items = this.state.sectionsOrder
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

    this.setState({sectionsOrder: items});
    await AsyncStorage.setItem("SectionsOrder", JSON.stringify(items));
  };

  headerHeight = 70;
  clampHeight = 10;
  doubleScrollToOpenClampHeight = 10;
  scrollY = new Animated.Value(0);
  scrollYClamped = Animated.diffClamp(this.scrollY, 0, this.headerHeight+2);
  
  handleSnap = ({nativeEvent}) => {
    const offsetY = nativeEvent.contentOffset.y;
    if(this.cannotOpenSearchOnThisSlide && offsetY<=this.clampHeight){
      this.scrollViewRef.scrollTo({
        y: offsetY + this.headerHeight
      });
      return
    } else {
      // console.log(offsetY)
      if (offsetY<=this.clampHeight) {
        //header search open
        this.scrollViewRef.scrollTo({
          y:0
        });
        this.openSearch()
      }
      else if (offsetY > this.headerHeight){
        this.closeSearch()
        return
      } else {
        this.scrollViewRef.scrollTo({
          y:this.headerHeight
        });
        this.closeSearch()
      }
    }
  };

  openSearch = () => {
    this.searchOpen = true
    this.searchRef?.focus()
  }

  closeSearch = () => {
    this.searchOpen = false
    this.searchRef?.blur()
  }

  render(){

    var landscape = <LottieView autoPlay={getSettingsString("settingsLowEndDevice")==="true"?false:true} loop style={{width: 690, height: 232, position:'absolute', top:32, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/home.json')}/>
    if(getCurrentDateObject().getMonth()===11||getCurrentDateObject().getMonth()===0){
      landscape = <LottieView loop autoPlay={getSettingsString("settingsLowEndDevice")==="true"?false:true} style={{width: 690, height: 232, position:'absolute', top:32, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/homeSnow.json')}/>
    } else if (getCurrentDateObject().getMonth()===7 && getCurrentDateObject().getDay()===0){
      landscape = <LottieView autoPlay={getSettingsString("settingsLowEndDevice")==="true"?false:true} loop style={{width: 690, height: 232, position:'absolute', top:32, transform: [ { scale: 1.25 }, { rotate: '0deg'}, ], }} source={require('../assets/homeCelebration.json')}/>
    }
    const sections = this.state.sections;

    return <View style={{height:"100%",width:"100%"}}>
      <PopupChangelog/>
      {/* <PopupBottomCustom ref={(popupSettings) => this.popupSettings = popupSettings} onClose={()=>{}}>
        <ConfigureHomePages 
          header={"Select Homepage Sections"} 
          refreshEvents={()=>{this.refreshEvents()}} 
          setPages={(checked,name)=>this.setPages(checked,name)} 
          sections={this.state.sections}
        />
      </PopupBottomCustom> */}
      {sections["Events"]===true?<PopupBottomConfigureHomePages 
        ref={(popupEventsSettings) => this.popupEventsSettings = popupEventsSettings}
        setPage={(page)=>this.props.setPage(page)} 
        header={"Select Events"} 
        refreshEvents={()=>{this.eventSection?.refreshEvents()}} 
        setPages={(checked,name)=>this.setEventPages(checked,name)} 
        sections={this.state.eventSections}
      />:<View/>}
      <ScrollView
        onMomentumScrollEnd={this.handleSnap}
        ref={(scrollViewRef) => this.scrollViewRef = scrollViewRef}
        onScroll={(event)=>{
          if(event.nativeEvent.contentOffset.y>this.headerHeight) this.closeSearch()
          if (this.keyboardInterference===false && !this.cannotOpenSearchOnThisSlide && this.searchOpen===false && event.nativeEvent.contentOffset.y<=this.clampHeight) {
            this.openSearch()
          }
        }}
        // onScroll={Animated.event([{ nativeEvent: {contentOffset: {y: this.scrollY}}}], {useNativeDriver: true, 
        //   listener: (event)=>{
        //     if(event.nativeEvent.contentOffset.y>this.headerHeight) this.closeSearch()
        //     if (this.keyboardInterference===false && !this.cannotOpenSearchOnThisSlide && this.searchOpen===false && event.nativeEvent.contentOffset.y<=this.clampHeight) {
        //       this.scrollViewRef.scrollTo({y:0});
        //       this.openSearch()
        //     }
        //   }
        // },)}
        // Not needed because when the keyboard is closed, the search is closed too
        // onScrollEndDrag={
        //   (event) => {
        //     if(event.nativeEvent.contentOffset.y===0){
        //       if(this.keyboardStatus===false){
        //         this.closeSearch()
        //         this.openSearch()
        //       }
        //     }
        //   }
        // }
        onScrollBeginDrag={
          (event) => {
            if(event.nativeEvent.contentOffset.y>this.headerHeight + this.doubleScrollToOpenClampHeight){
              this.cannotOpenSearchOnThisSlide = true
            } else {
              this.cannotOpenSearchOnThisSlide = false
            }
          }
        }
      >
        <FadeInOut fadeIn={true} delay={200} duration={500}>
          <View style={{justifyContent:"center",backgroundColor:colors.lightDarkAccentHeavy2[global.darkMode],height:this.headerHeight, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
            <TextInput
              ref={(searchRef) => this.searchRef = searchRef}
              allowFontScaling={false}
              style={{opacity:0.8, marginVertical: 10, marginHorizontal:15, padding:10, paddingHorizontal:20, fontSize: 17, color:colors.textBlack[global.darkMode], fontFamily: "ArialRoundedBold", backgroundColor:colors.lightDarkAccent[global.darkMode], borderRadius: 5}}
              onChangeText={(text) => {this.searchText = text}}
              placeholder={"Search for an item..."}
              defaultValue={""}
              placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
              onSubmitEditing={(event)=>{
                this.scrollViewRef.scrollTo({
                  y:this.headerHeight
                });
                this.closeSearch()
                this.searchRef.clear()
                this.searchText = ""
                if(event.nativeEvent.text!==""){
                  RootNavigation.navigate('GlobalSearchPage', {propsPassed:event.nativeEvent.text});
                }
              }}
            />
            {/* You can't touch the search button - need keyboardShouldPersistTaps='handled' for ScrollView */}
            <TouchableOpacity style={{position:"absolute", right:20}} onPress={()=>{
              this.scrollViewRef.scrollTo({
                y:this.headerHeight
              });
              this.closeSearch()
              this.searchRef.clear()
              let searchTextTemp = this.searchText
              this.searchText = ""
              RootNavigation.navigate('GlobalSearchPage', {propsPassed:searchTextTemp});
            }}>
              <FadeInOut fadeIn={true} duration={200}>
              <Image style={{width:20,height:20, margin: 10, marginTop: 12, opacity: 0.25, resizeMode:"contain",}} source={global.darkMode?require("../assets/icons/searchWhite.png"):require("../assets/icons/search.png")}/>
              </FadeInOut>
            </TouchableOpacity>
          </View>
        </FadeInOut>

        <View style={{height:55}}/>
        <Clock swapDate={doWeSwapDate()}/>
        <View style={{height:125}}/>
        <View style={{height:40}}>
          <View style={{padding:10, paddingVertical:12, position:"absolute",right:0, top: -15}}>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity style={{padding:5, paddingVertical:12}} 
                onPress={()=>{this.setState({editOrder:!this.state.editOrder}); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}
              }>
                <TextFont bold={false} style={{marginRight:10, color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"right"}}>{!this.state.editOrder?"Edit Sections":"Disable Edit Sections"}</TextFont>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {this.state.sectionsOrder.map( (section, index)=>{
          let backgroundColor = colors.sectionBackground1[global.darkMode]
          if(index%2!=0){
            backgroundColor = colors.sectionBackground2[global.darkMode]
          }
          if(section["name"]==="Events"){
            if(this.state.editOrder){
              let name = "Events"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.eventsColor[global.darkMode]} title={name} titleColor={colors.eventsColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Events"]===true?<HomeContentArea index={index} key={"Events"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.eventsColor[global.darkMode]} title="Events" titleColor={colors.eventsColor[global.darkModeReverse]}>
              <EventSection openVillagerPopup={this.openVillagerPopup} ref={(eventSection) => this.eventSection = eventSection} setPage={this.props.setPage} eventSections={this.state.eventSections} setPopupVisible={(visible)=>{this.popupEventsSettings.setPopupVisible(visible)}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="To-Do"){
            if(this.state.editOrder){
              let name = "To-Do"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.todoColor[global.darkMode]} title={name} titleColor={colors.todoColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["To-Do"]===true?<HomeContentArea index={index} key={"To-Do"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.todoColor[global.darkMode]} title="To-Do" titleColor={colors.todoColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <TodoList sections={sections} setLoadedToDo={this.setLoadedToDo} setPage={this.props.setPage}/>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Turnip Log"){
            if(this.state.editOrder){
              let name = "Turnip Log"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.turnipColor[global.darkMode]} title={name} titleColor={colors.turnipColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return this.props.sections["Turnip Log"]===true?<HomeContentArea index={index} key={"Turnip Log"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.turnipColor[global.darkMode]} title="Turnip Log" titleColor={colors.turnipColor[global.darkModeReverse]}>
              <View style={{height: 13}}/>
              <TurnipLog/>
              <View style={{height: 20}}/>
            </HomeContentArea>
            :<View/>
          }else if(section["name"]==="Visitors"){
            if(this.state.editOrder){
              let name = "Visitors"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.visitorsColor[global.darkMode]} title={name} titleColor={colors.visitorsColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Visitors"]===true?<HomeContentArea index={index} key={"Visitors"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.visitorsColor[global.darkMode]} title="Visitors" titleColor={colors.visitorsColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <VisitorsList setPage={this.props.setPage}/>
              <View style={{height: 25}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Collection"){
            if(this.state.editOrder){
              let name = "Collection"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.collectionColor[global.darkMode]} title={name} titleColor={colors.collectionColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Collection"]===true?<HomeContentArea index={index} key={"Collection"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.collectionColor[global.darkMode]} title="Collection" titleColor={colors.collectionColor[global.darkModeReverse]}>
              <CollectionProgress setPage={this.props.setPage}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Profile"){
            if(this.state.editOrder){
              let name = "Profile"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.profileColor[global.darkMode]} title={name} titleColor={colors.profileColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Profile"]===true?<HomeContentArea index={index} key={"Profile"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.profileColor[global.darkMode]} title="Profile" titleColor={colors.profileColor[global.darkModeReverse]}>
              <View style={{height: 37}}/>
              <Profile setPage={this.props.setPage}/>
              <CurrentVillagers openVillagerPopup={this.openVillagerPopup} setPage={this.props.setPage}/>
              <View style={{height: 30}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Loan Tracking"){
            if(this.state.editOrder){
              let name = "Loan Tracking"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.loanTrackingColor[global.darkMode]} title={name} titleColor={colors.loanTrackingColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Loan Tracking"]===true?<HomeContentArea index={index} key={"Loan Tracking"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.loanTrackingColor[global.darkMode]} title="Loan Tracking" titleColor={colors.loanTrackingColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <LoanList/>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Tool Durability"){
            if(this.state.editOrder){
              let name = "Tool Durability"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.toolTrackingColor[global.darkMode]} title={name} titleColor={colors.toolTrackingColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Tool Durability"]===true?<HomeContentArea index={index} key={"Tool Durability"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.toolTrackingColor[global.darkMode]} title="Tool Durability" titleColor={colors.toolTrackingColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <DurabilityList/>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Star Counter"){
            if(this.state.editOrder){
              let name = "Star Counter"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.shootingStarsColor[global.darkMode]} title={name} titleColor={colors.shootingStarsColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Star Counter"]===true?<HomeContentArea index={index} key={"Star Counter"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.shootingStarsColor[global.darkMode]} title="Star Counter" titleColor={colors.shootingStarsColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <ShootingStars setPage={this.props.setPage}/>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>
          }else if(section["name"]==="Store Hours"){
            if(this.state.editOrder){
              let name = "Store Hours"
              return <HomeContentArea index={index} key={name+"edit"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.storeHoursColor[global.darkMode]} title={name} titleColor={colors.storeHoursColor[global.darkModeReverse]}>
                <View style={{height:10}}/><ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/><View style={{height:10}}/>
              </HomeContentArea>
            }
            return sections["Store Hours"]===true?<HomeContentArea index={index} key={"Store Hours"} editOrder={this.state.editOrder} reorderItem={this.reorderItem} backgroundColor={backgroundColor} accentColor={colors.storeHoursColor[global.darkMode]} title="Store Hours" titleColor={colors.storeHoursColor[global.darkModeReverse]}>
              <View style={{height: 15}}/>
              <StoreHoursContainer filter={"Nook's Cranny"} image={require("../assets/icons/nook.png")} text="Nook's Cranny" textBottom={hoursNook()} openHour={hoursNook("openHour")} closeHour={hoursNook("closeHour")}/>
              <StoreHoursContainer filter={"Able Sisters"} image={require("../assets/icons/able.png")} text="Able Sisters" textBottom={hoursAble()} openHour={hoursAble("openHour")} closeHour={hoursAble("closeHour")}/>
              <View style={{height: 5}}/>
              <View style={{flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
                <StoreHoursContainerHarvey filter={"Katrina's Cleansing Service"} image={require("../assets/icons/katrina.png")} text="Katrina" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 1:00" : "5 AM - 1 AM"} openHour={5} closeHour={1}/>
                <StoreHoursContainerHarvey filter={"Saharah's Co-op"} image={require("../assets/icons/saharah.png")} text="Saharah" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 24:00" : "5 AM - 12 AM"} openHour={5} closeHour={24}/>
                <StoreHoursContainerHarvey image={require("../assets/icons/tortimer.png")} text="Tortimer" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 23:00" : "5 AM - 11 PM"} openHour={5} closeHour={23}/>
                <StoreHoursContainerHarvey image={require("../assets/icons/cyrus.png")} text="Cyrus" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 24:00" : "5 AM - 12 AM"} openHour={5} closeHour={24}/>
                <StoreHoursContainerHarvey filter={"Leif"} image={require("../assets/icons/leif.png")} text="Leif" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 23:00" : "5 AM - 11 PM"} openHour={5} closeHour={23}/>
                <StoreHoursContainerHarvey filter={"Redd's Co-op Raffle"} image={require("../assets/icons/redd.png")} text="Redd" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 1:00" : "5 AM - 1 AM"} openHour={5} closeHour={1}/>
                <StoreHoursContainerHarvey filter={"Kicks' Co-op"} image={require("../assets/icons/kicks.png")} text="Kicks" textBottom={getSettingsString("settingsUse24HourClock") === "true" ? "5:00 - 24:00" : "5 AM - 12 AM"} openHour={5} closeHour={24}/>
              </View>
              <View style={{height: 15}}/>
            </HomeContentArea>:<View/>
          }
        })}
        
        {/* <View style={{height: 55}}/>
        <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:colors.lightDarkAccent[global.darkMode], borderRadius:15, margin: 20, padding:20}} onPress={() => this.props.setPage(29, true, "giftsRedirect")}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center",}}>{"Active Creatures has been moved to a separate page."}</TextFont>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center",}}>{"You can tap here to go to that page, or open the sidebar."}</TextFont>
        </TouchableOpacity> */}
        <View style={{height: 75}}/>
      </ScrollView>
      
      <View style={{position:"absolute", width: "100%", height:"100%", zIndex:-5, top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',overflow: "hidden" }}>
        <View style={{width:690, height: "100%", zIndex:1, position:'absolute', overflow: "hidden", }}>
          {landscape}
          <LinearGradient
            colors={[colors.skyColor[global.darkMode], 'transparent']}
            style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: "100%", zIndex: 50}}
            start={{x:1.0, y:0}}
            end={{x: 0.9, y: 0}}
          />
          <LinearGradient
            colors={[colors.skyColor[global.darkMode], 'transparent']}
            style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: "100%", zIndex: 50}}
            start={{x: 0, y:0}}
            end={{x: 0.1, y: 0}}
          />
        </View>
        <View style={[styles.homeScreenBackgroundTop,{backgroundColor:colors.skyColor[global.darkMode]}]}/>
        <Image style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height-295, resizeMode:"stretch",zIndex:10, backgroundColor:colors.grassColor[global.darkMode]}} source={global.darkMode===1 ? require("../assets/icons/cliffDark.png") : require("../assets/icons/cliff.png")} />
      </View>
      <VillagerPopupPopup ref={(villagerPopupPopup) => this.villagerPopupPopup = villagerPopupPopup} setPage={this.props.setPage}/>
    </View>
  }
}
export default HomePage;

class EventSection extends Component {
  constructor(props){
    super(props);
    this.state = {
      eventSections:props.eventSections, 
      todayEvents: [],
      tomorrowEvents: [],
      thisWeekEvents: [],
      loaded:false
    }
  }
  
  componentDidMount(){
    this.mounted=true
    setTimeout(async () => {
      this.refreshEvents();
    },0)
  }

  componentWillUnmount(){
    this.mounted=false
  }

  refreshEvents = () => {
    cancelAllPushNotifications();
    let todayEvents = getEventsDay(getCurrentDateObject(), this.state.eventSections,this.state.eventSections["Show All Events Happening Today"]);
    let tomorrowEvents = getEventsDay(addDays(getCurrentDateObject(), 1), this.state.eventSections);
    let thisWeekEvents = [];
    for(var i=2; i<7; i++){
      thisWeekEvents = thisWeekEvents.concat(getEventsDay(addDays(getCurrentDateObject(), i), this.state.eventSections));
    }
    this.todayEventsComponent = todayEvents.map( (event, index)=>
      <EventContainer 
        openVillagerPopup={this.props.openVillagerPopup}
        setPage={this.props.setPage}
        key={event.name+index} 
        backgroundColor={colors.eventBackground[global.darkMode]}
        textColor={colors.textBlack[global.darkMode]}
        event={event}
        eventSections={this.state.eventSections}
      />
    )
    this.tomorrowEventsComponent = tomorrowEvents.map( (event, index)=>
      <EventContainer 
        openVillagerPopup={this.props.openVillagerPopup}
        setPage={this.props.setPage}
        key={event.name+index} 
        backgroundColor={colors.eventBackground[global.darkMode]}
        textColor={colors.textBlack[global.darkMode]}
        event={event}
        eventSections={this.state.eventSections}
      />
    )
    this.thisWeekEventsComponent = thisWeekEvents.map( (event, index)=>
      <EventContainer 
        openVillagerPopup={this.props.openVillagerPopup}
        setPage={this.props.setPage}
        key={event.name+index} 
        backgroundColor={colors.eventBackground[global.darkMode]}
        textColor={colors.textBlack[global.darkMode]}
        event={event}
        eventSections={this.state.eventSections}
      />
    )
    if(this.mounted){
      this.setState({todayEvents: todayEvents, tomorrowEvents: tomorrowEvents, thisWeekEvents: thisWeekEvents, loaded:true})
    }
  }
  render(){
    var todayTitle=<View/>
    if(this.state.todayEvents.length>0){
      todayTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>Today</TextFont>
    }
    var tomorrowTitle=<View/>
    if(this.state.tomorrowEvents.length>0){
      tomorrowTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>Tomorrow</TextFont>
    }
    var thisWeekTitle=<View/>
    if(this.state.thisWeekEvents.length>0){
      thisWeekTitle=<TextFont bold={true} style={[styles.dayHeader,{color:colors.textBlack[global.darkMode]}]}>This Week</TextFont>
    }
    return <>
      <TouchableOpacity style={{padding:10, paddingVertical:12, position:"absolute",right:0}} 
        onPress={()=>{this.props.setPopupVisible(true); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}
      }>
        <TextFont bold={false} style={{marginRight:10, color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"right"}}>{"Edit Events"}</TextFont>
      </TouchableOpacity>
      {todayTitle}
      {this.todayEventsComponent}
      {tomorrowTitle}
      {this.tomorrowEventsComponent}
      {thisWeekTitle}
      {this.thisWeekEventsComponent}
      <View style={{height: 2}}/>
      {this.state.loaded?<TouchableOpacity style={{marginHorizontal: 20, marginVertical:10, backgroundColor:colors.eventBackground[global.darkMode], padding: 10, borderRadius: 10}} 
        onPress={()=>{this.props.setPage(16); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}
      >
        <TextFont bold={true} style={{color: colors.fishText[global.darkMode], fontSize: 18, textAlign:"center"}}>{"View All"}</TextFont>
      </TouchableOpacity>:<View/>}
      <View style={{height: 20}}/>
    </>
  }
}

export class Profile extends Component{
  render(){
    return(
      <View style={{alignItems:"center", marginHorizontal:50}}>
        <NameEntry/>
        <TextFont bold={true} style={{marginTop: 0, marginBottom: -2, color:colors.fishText[global.darkMode]}}>{translateIslandNameInputLabel1()}</TextFont>
        <IslandEntry/>
        <TextFont bold={true} style={{marginTop: 0, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{translateIslandNameInputLabel2()}</TextFont>
        <TouchableOpacity onPress={() => this.props.setPage(13)}>
          <TextFont bold={false} style={{padding:10, color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{getSettingsString("settingsNorthernHemisphere")==="true" ? "Northern Hemisphere" : "Southern Hemisphere"}</TextFont>
        </TouchableOpacity>
        <View style={{height: 5}}/>
        <Code start={"SW"} storageKey="friendCode" label="Friend Code" setGlobal={(value)=>{global.friendCode=value;}} initialValue={global.friendCode}/>
        <Code start={translateDreamAddressBeginning()} storageKey="dreamAddress" label="Dream Address" setGlobal={(value)=>{global.dreamAddress=value;}} initialValue={global.dreamAddress}/>
        <Code start={"MA"} storageKey="creatorCode" label="Creator Code" setGlobal={(value)=>{global.creatorCode=value;}} initialValue={global.creatorCode}/>
        <Code start={"RA"} storageKey="HHPCode" label="Happy Home Network ID" setGlobal={(value)=>{global.HHPCode=value;}} initialValue={global.HHPCode}/>
        <View style={{height: 18}}/>
        <SelectionImage 
          selectedImage={global.selectedFruit} 
          images={[getMaterialImage("apple",true),getMaterialImage("cherry",true),getMaterialImage("orange",true),getMaterialImage("peach",true),getMaterialImage("pear",true)]}
          onSelected={(image)=>{AsyncStorage.setItem("selectedFruit"+global.profile, image); global.selectedFruit=image;}}
          canDeselect={true}
          sizeImageOnline={[35,35]}
          sizeContainer={[45,45]}
        />
      </View>
    )
  }
}

export class Code extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code:this.props.initialValue,
    }
  }
  onChangeText = (text) =>{
    if(text.includes("\n")) Keyboard.dismiss()
    text = text.replace("\n","")
    var newValue = "";
    if(text===this.props.start){
      this.setState({code:""});
    } else if (text===this.props.start.charAt(0)){
      this.setState({code:this.props.start+"-"});
    } else {
      const afterIndices = [4,9,14]; 
      var value = text.replace(this.props.start+"-","");
      for(let i=0; i<value.length; i++){
        if(afterIndices.includes(i)){
          newValue+="-";
        } 
        if (value[i] !== "-") {
          newValue+=value[i];
        }
      }
      newValue = this.props.start+"-"+newValue;
      this.setState({code:newValue});
    }
    this.props.setGlobal(newValue)
    AsyncStorage.setItem(this.props.storageKey+global.profile, newValue);
  }
  render(){
    return(
      <>
        <TextInput
          maxLength = {17}
          allowFontScaling={false}
          style={{fontSize: 18, width:"100%", color:colors.textBlack[global.darkMode], textAlign:"center", fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}}
          onChangeText={async (text) => {this.onChangeText(text)}}
          placeholder={"["+attemptToTranslate(this.props.label)+"]"}
          placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          value={this.state.code}
          defaultValue={this.props.initialValue}
          multiline={true}
        />
        <TextFont bold={false} style={{marginTop: -5, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{this.props.label}</TextFont>
      </>
    )
  }
}

export class NameEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:global.name,
    }
  }
  onChangeText = (text) =>{
    if(text.includes("\n")) Keyboard.dismiss()
    text = text.replace("\n","")
    this.setState({name:text});
    AsyncStorage.setItem("name"+global.profile, text);
    global.name=text;
  }
  render(){
    return(
      <>
        <TextInput
          maxLength = {17}
          allowFontScaling={false}
          style={{fontSize: 28, width:"100%", color:colors.textBlack[global.darkMode], textAlign:"center", fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}}
          onChangeText={async (text) => {this.onChangeText(text)}}
          placeholder={"["+attemptToTranslate("Name")+"]"}
          placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          value={this.state.name}
          defaultValue={global.name}
          multiline={true}
        />
      </>
    )
  }
}

export class IslandEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      islandName:global.islandName,
    }
  }
  onChangeText = (text) =>{
    if(text.includes("\n")) Keyboard.dismiss()
    text = text.replace("\n","")
    this.setState({islandName:text});
    AsyncStorage.setItem("islandName"+global.profile, text);
    global.islandName=text;
  }
  render(){
    return(
      <>
        <TextInput
          maxLength = {17}
          allowFontScaling={false}
          style={{fontSize: 28, width:"100%", color:colors.textBlack[global.darkMode], textAlign:"center", fontFamily: this.props.bold===true ? "ArialRoundedBold":"ArialRounded"}}
          onChangeText={async (text) => {this.onChangeText(text)}}
          placeholder={"["+attemptToTranslate("Island")+"]"}
          placeholderTextColor={colors.lightDarkAccentHeavy[global.darkMode]}
          value={this.state.islandName}
          defaultValue={global.islandName}
          multiline={true}
        />
      </>
    )
  }
}

//optimization class - only render when called
export class PopupBottomConfigureHomePages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
    }
  }
  setPopupVisible = (visible) => {
    this.setState({visible:visible})
    this.popupEventsSettings.setPopupVisible(visible)
  }
  render(){
    return <PopupBottomCustom ref={(popupEventsSettings) => this.popupEventsSettings = popupEventsSettings} onClose={()=>{}}>
      {this.state.visible?<ConfigureHomePages 
        setPage={this.props.setPage} 
        header={this.props.header} 
        refreshEvents={this.props.refreshEvents} 
        setPages={this.props.setPages} 
        sections={this.props.sections}
      />:<View/>}
    </PopupBottomCustom>
  }
}

export class ConfigureHomePages extends Component {
  constructor(props) {
    super(props);
    var sections = this.props.sections
    this.state = {
      sections:sections,
    }
  }
  setPages = (check,name) => {
    this.props.setPages(check,name);
    if(this.props.header==="Select Events"){
      this.props.refreshEvents();
    }
    if(name==="App notifications"){
      setSettingsString("settingsNotifications", check?"true":"false")
    }
  }
  render(){
    console.log("RENDEREDDD")
    const sectionNames = Object.keys(this.state.sections);
    return(<>
      <SubHeader>{this.props.header}</SubHeader>
      <View style={{height:10}}/>
        {sectionNames.map( (name, index)=>{
          if(name.includes("Break")){
            return <View style={{height:30}} key={name+index.toString()}/>
          } else if(name.includes("Info")){
            return <Paragraph styled={true} style={{marginBottom:10}} key={name+index.toString()}>{this.props.sections[name]}</Paragraph>
          } else if(name==="Set Notification Time"){
            return <SetNotificationTime key={name+index.toString()} title={name} setPages={this.setPages}/>
          } else {
            return <ConfigureHomePageSettingContainer key={name+index.toString()} title={name} defaultValue={this.state.sections[name]} onCheck={(check)=>{this.setPages(check,name)}}/>
          }
        })}
      </>
    )
  }
}

class SetNotificationTime extends Component {
  constructor(props){
    super(props);
    this.state = {
      timePickerVisible: false,
      time:new Date(),
    }
  }
  toggle = () =>{
    this.setState({timePickerVisible:true})
  }
  setTime = (event, selectedTime) => {
    if(selectedTime!==undefined){
      this.setState({time:selectedTime,timePickerVisible:false})
      this.props.setPages(selectedTime, this.props.title);
    } else {
      this.setState({timePickerVisible:false})
    }
    return true;
  }
  render(){
    return (<>
      <ButtonComponent vibrate={10} color={colors.dateButton[global.darkMode]} onPress={()=>{this.toggle()}} text={this.props.title} />
      <View style={{height:20}}/>
      {this.state.timePickerVisible&& (
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.time}
          mode={"time"}
          is24Hour={getSettingsString("settingsUse24HourClock")==="true"}
          display="spinner"
          onChange={this.setTime}
        />
      )}
      </>
    )
  }
}

export class ConfigureHomePageSettingContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggle:this.props.defaultValue,
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.defaultValue!==prevProps.defaultValue){
      this.setState({toggle:this.props.defaultValue})
    }
  }
  toggle = () => {
    this.props.onCheck(!this.state.toggle);
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    this.setState({toggle:!this.state.toggle});
  }
  render(){
    return(
      <TouchableOpacity activeOpacity={0.65} onPress={()=>this.toggle()}>
        <View style={[styles.settingsContainer,{backgroundColor:colors.lightDarkAccent[global.darkMode]}]}>
            <View style={styles.textContainer}>
              <TextFont bold={true} style={[styles.textContainerTop,{color:colors.textBlack[global.darkMode]}]}>{this.props.title}</TextFont>
            </View>
          <View style={{position:"absolute", right: 8, transform: [{ scale: 0.75 }]}}>
            <ToggleSwitch
              isOn={this.state.toggle}
              onColor="#57b849"
              offColor="#DFDFDF"
              size="large"
              onToggle={() => {this.toggle();}}
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}


export class VillagerPopupPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item:"",
    };   
  }

  setPopupVisible = (visible, item) => {
    this.setState({item:item});
    this.popup?.setPopupVisible(true);
  }

  render(){
    var villagerPopup = <View/>
    if(this.state.item!==undefined && this.state.item!==""){
      villagerPopup = <VillagerPopup item={this.state.item} setPage={this.props.setPage}/>
    }
    return(
      <PopupBottomCustom ref={(popup) => this.popup = popup}>
        {this.state.item===""?
        <View/>
        :
        <>
          <TextFont bold={true} style={{textAlign:"center",fontSize: 30, marginTop: 0, marginBottom: 5, color:colors.fishText[global.darkMode]}}>{this.state.item["NameLanguage"]}</TextFont>
          {villagerPopup}
        </>}
      </PopupBottomCustom>
    )
  }
}

export class CollectionProgress extends Component {
  constructor(){
    super()
    this.state = {
      editMode:false,
      fishCount: 0,
      fishCountTotal: 0,
      fishPercentage: 0,
      seaCount: 0,
      seaCountTotal: 0,
      seaPercentage: 0,
      bugsCount: 0,
      bugsCountTotal: 0,
      bugsPercentage: 0,
      fossilCount: 0,
      fossilCountTotal: 0,
      fossilPercentage: 0,
      artCount: 0,
      artCountTotal: 0,
      artPercentage: 0,
      musicCount: 0,
      musicCountTotal: 0,
      musicPercentage: 0,
      emojipediaCount: 0,
      emojipediaCountTotal: 0,
      emojipediaPercentage: 0,
      recipeCount: 0,
      recipeCountTotal: 0,
      recipePercentage: 0,
      countFloorWalls: 0,
      floorWallsCount: 0,
      floorWallsCountTotal: 0,
      floorWallsPercentage: 0,
      countFurniture: 0,
      furnitureCount: 0,
      furnitureCountTotal: 0,
      furniturePercentage: 0,
      countClothing: 0,
      clothingCount: 0,
      clothingCountTotal: 0,
      clothingPercentage: 0,
      countGyroid: 0,
      gyroidCount: 0,
      gyroidCountTotal: 0,
      gyroidPercentage: 0,
      achievementsCount: 0,
      achievementsCountTotal: 0,
      achievementsPercentage: 0,
    }
  }
  async componentDidMount(){
    let collectionSectionsDisabled = JSON.parse(await getStorage("collectionSectionsDisabled"+global.profile,JSON.stringify([])));
    this.countCollectionTotal(collectionSectionsDisabled)
  }
  countCollectionTotal = (collectionSectionsDisabled) => {
    if(global.collectionList!==undefined && global.collectionList.length>7000){
      this.popupLoading.setPopupVisible(true)
    }
    setTimeout(async ()=>{
      collectionListRemoveDuplicates();
      let fishCount = 0
      let fishCountTotal = 0
      let fishPercentage = 0
      if(!collectionSectionsDisabled.includes("fishCount")){
        fishCount = await countCollection("fishCheckList");
        fishCountTotal = global.dataLoadedFish[0].length;
        fishPercentage = fishCount/fishCountTotal * 100;
      }
      let seaCount = 0
      let seaCountTotal = 0
      let seaPercentage = 0
      if(!collectionSectionsDisabled.includes("seaCount")){
        seaCount = await countCollection("seaCheckList");
        seaCountTotal = global.dataLoadedSea[0].length;
        seaPercentage = seaCount/seaCountTotal * 100;
      }
      let bugsCount = 0
      let bugsCountTotal = 0
      let bugsPercentage = 0
      if(!collectionSectionsDisabled.includes("bugsCount")){
        bugsCount = await countCollection("bugCheckList");
        bugsCountTotal = global.dataLoadedBugs[0].length;
        bugsPercentage = bugsCount/bugsCountTotal * 100;
      }
      let fossilCount = 0
      let fossilCountTotal = 0
      let fossilPercentage = 0
      if(!collectionSectionsDisabled.includes("fossilCount")){
        fossilCount = await countCollection("fossilCheckList");
        fossilCountTotal = global.dataLoadedFossils[0].length;
        fossilPercentage = fossilCount/fossilCountTotal * 100;
      }
      let artCount = 0
      let artCountTotal = 0
      let artPercentage = 0
      if(!collectionSectionsDisabled.includes("artCount")){
        artCount = await countCollection("artCheckList");
        artCountTotal = 43;
        artPercentage = artCount/artCountTotal * 100;
      }
      let musicCount = 0
      let musicCountTotal = 0
      let musicPercentage = 0
      if(!collectionSectionsDisabled.includes("musicCount")){
        musicCount = await countCollection("songCheckList");
        musicCountTotal = global.dataLoadedMusic[0].length - 3; //there are 3 Hazure songs
        musicPercentage = musicCount/musicCountTotal * 100;
      }
      let emojipediaCount = 0
      let emojipediaCountTotal = 0
      let emojipediaPercentage = 0
      if(!collectionSectionsDisabled.includes("emojipediaCount")){
        emojipediaCount = await countCollection("emojiCheckList");
        emojipediaCountTotal = global.dataLoadedReactions[0].length;
        emojipediaPercentage = emojipediaCount/emojipediaCountTotal * 100;
      }
      let recipeCount = 0
      let recipeCountTotal = 0
      let recipePercentage = 0
      if(!collectionSectionsDisabled.includes("recipeCount")){
        recipeCount = await countCollection("recipesCheckList");
        recipeCountTotal = global.dataLoadedRecipes[0].length;
        recipePercentage = recipeCount/recipeCountTotal * 100;
      }
      let countFloorWalls = 0
      let floorWallsCount = 0
      let floorWallsCountTotal = 0
      let floorWallsPercentage = 0
      if(!collectionSectionsDisabled.includes("floorWallsCount")){
        countFloorWalls = await countCollectionSpecial("dataLoadedFloorWalls");
        floorWallsCount = countFloorWalls[0]
        floorWallsCountTotal = countFloorWalls[1]
        floorWallsPercentage = floorWallsCount/floorWallsCountTotal * 100;
      }
      let countFurniture = 0
      let furnitureCount = 0
      let furnitureCountTotal = 0
      let furniturePercentage = 0
      if(!collectionSectionsDisabled.includes("furnitureCount")){
        countFurniture = await countCollectionSpecial("dataLoadedFurniture");
        furnitureCount = countFurniture[0]
        furnitureCountTotal = countFurniture[1]
        furniturePercentage = furnitureCount/furnitureCountTotal * 100;
      }
      let countClothing = 0
      let clothingCount = 0
      let clothingCountTotal = 0
      let clothingPercentage = 0
      if(!collectionSectionsDisabled.includes("clothingCount")){
        countClothing = await countCollectionSpecial("dataLoadedClothing");
        clothingCount = countClothing[0]
        clothingCountTotal = countClothing[1]
        clothingPercentage = clothingCount/clothingCountTotal * 100;
      }
      let countGyroid = 0
      let gyroidCount = 0
      let gyroidCountTotal = 0
      let gyroidPercentage = 0
      if(!collectionSectionsDisabled.includes("gyroidCount")){
        countGyroid = await countCollectionSpecial("dataLoadedGyroids");
        gyroidCount = countGyroid[0]
        gyroidCountTotal = countGyroid[1]
        gyroidPercentage = gyroidCount/gyroidCountTotal * 100;
      }
      let achievementsCount = 0
      let achievementsCountTotal = 0
      let achievementsPercentage = 0
      if(!collectionSectionsDisabled.includes("achievementsCount")){
        achievementsCount = await countCollectionAchievements();
        achievementsCountTotal = await countAchievements();
        achievementsPercentage = achievementsCount/achievementsCountTotal * 100;
      }
      this.setState({
        collectionSectionsDisabled:collectionSectionsDisabled,
        fishCount: fishCount,
        fishCountTotal: fishCountTotal,
        fishPercentage: fishPercentage,
        seaCount: seaCount,
        seaCountTotal: seaCountTotal,
        seaPercentage: seaPercentage,
        bugsCount: bugsCount,
        bugsCountTotal: bugsCountTotal,
        bugsPercentage: bugsPercentage,
        fossilCount: fossilCount,
        fossilCountTotal: fossilCountTotal,
        fossilPercentage: fossilPercentage,
        artCount: artCount,
        artCountTotal: artCountTotal,
        artPercentage: artPercentage,
        musicCount: musicCount,
        musicCountTotal: musicCountTotal,
        musicPercentage: musicPercentage,
        emojipediaCount: emojipediaCount,
        emojipediaCountTotal: emojipediaCountTotal,
        emojipediaPercentage: emojipediaPercentage,
        recipeCount: recipeCount,
        recipeCountTotal: recipeCountTotal,
        recipePercentage: recipePercentage,
        countFloorWalls: countFloorWalls,
        floorWallsCount: floorWallsCount,
        floorWallsCountTotal: floorWallsCountTotal,
        floorWallsPercentage: floorWallsPercentage,
        countFurniture: countFurniture,
        furnitureCount: furnitureCount,
        furnitureCountTotal: furnitureCountTotal,
        furniturePercentage: furniturePercentage,
        countClothing: countClothing,
        clothingCount: clothingCount,
        clothingCountTotal: clothingCountTotal,
        clothingPercentage: clothingPercentage,
        countGyroid: countGyroid,
        gyroidCount: gyroidCount,
        gyroidCountTotal: gyroidCountTotal,
        gyroidPercentage: gyroidPercentage,
        achievementsCount: achievementsCount,
        achievementsCountTotal: achievementsCountTotal,
        achievementsPercentage: achievementsPercentage,
      })
      this.popupLoading?.setPopupVisible(false)
    },0)
  } 
  saveList = async (name) => {
    let collectionSectionsDisabled = this.state.collectionSectionsDisabled
    if(collectionSectionsDisabled.includes(name)){
      collectionSectionsDisabled = collectionSectionsDisabled.filter(e => e !== name)
      collectionSectionsDisabled = collectionSectionsDisabled.filter(e => e !== "")
    } else {
      collectionSectionsDisabled.push(name)
    }
    this.setState({collectionSectionsDisabled:collectionSectionsDisabled})
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    console.log("Side sections disabled: " + collectionSectionsDisabled)
    await AsyncStorage.setItem("collectionSectionsDisabled"+global.profile, JSON.stringify(collectionSectionsDisabled));
  }
  toggleEditMode = (state) => {
    this.setState({editMode:state})
    if(state===false){
      this.countCollectionTotal(this.state.collectionSectionsDisabled)
    }
  }
  getDelay = (keyName) => {
    let originalOrder = [
      "fishCount",
      "seaCount",
      "fossilCount",
      "artCount",
      "musicCount",
      "emojipediaCount",
      "recipeCount",
      "furnitureCount",
      "floorWallsCount",
      "clothingCount",
      "gyroidCount",
      "achievementsCount",
    ]
    //subtract the lists
    originalOrder = originalOrder.filter(n => !this.state.collectionSectionsDisabled.includes(n))
    return originalOrder.indexOf(keyName)+1
  }
  render(){
    return(<>
      <PopupRaw
        ref={(popupLoading) => this.popupLoading = popupLoading} 
        text={attemptToTranslate("Counting Collection...")}
        textFontSize={18}
        loadingScale={1.3}
        loadingWidth={40}
      />
      <TouchableOpacity style={{padding:5,position:"absolute",right:20,top:10}} 
        onPress={async()=>{
          this.toggleEditMode(!this.state.editMode)
          getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
      }}>
        <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, textAlign:"center"}}>{this.state.editMode ? "Disable Edit List" : "Edit List"}</TextFont>
      </TouchableOpacity>
      <View style={{height: 25}}/>
        {this.state.collectionSectionsDisabled?<>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("fishCount")} keyName="fishCount" delay={this.getDelay("fishCount")} setPage={this.props.setPage} page={2} tab={0} color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.fishPercentage} image={require("../assets/icons/fish.png")} text={attemptToTranslate("Fish") + " " + this.state.fishCount + "/" + this.state.fishCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("seaCount")} keyName="seaCount" delay={this.getDelay("seaCount")} setPage={this.props.setPage} page={2} tab={2} color={colors.fishAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.seaPercentage} image={require("../assets/icons/octopus.png")} text={attemptToTranslate("Sea Creatures") + " " + this.state.seaCount + "/" + this.state.seaCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("bugsCount")} keyName="bugsCount" delay={this.getDelay("bugsCount")} setPage={this.props.setPage} page={2} tab={1} color={colors.bugAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.bugsPercentage} image={require("../assets/icons/bugs.png")} text={attemptToTranslate("Bugs") + " " + this.state.bugsCount + "/" + this.state.bugsCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("fossilCount")} keyName="fossilCount" delay={this.getDelay("fossilCount")} setPage={this.props.setPage} page={2} tab={3} color={colors.fossilAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.fossilPercentage} image={require("../assets/icons/bones.png")} text={attemptToTranslate("Fossils") + " " + this.state.fossilCount + "/" + this.state.fossilCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("artCount")} keyName="artCount" delay={this.getDelay("artCount")} setPage={this.props.setPage} page={2} tab={4} color={colors.artAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.artPercentage} image={require("../assets/icons/colorPalette.png")} text={attemptToTranslate("Art") + " " + this.state.artCount + "/" + this.state.artCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("musicCount")} keyName="musicCount" delay={this.getDelay("musicCount")} setPage={this.props.setPage} page={4} tab={""} color={colors.musicAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.musicPercentage} image={require("../assets/icons/music.png")} text={attemptToTranslate("Songs") + " " + this.state.musicCount + "/" + this.state.musicCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("emojipediaCount")} keyName="emojipediaCount" delay={this.getDelay("emojipediaCount")} setPage={this.props.setPage} page={5} tab={""} color={colors.emojipediaAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.emojipediaPercentage} image={require("../assets/icons/emote.png")} text={attemptToTranslate("Reactions") + " " + this.state.emojipediaCount + "/" + this.state.emojipediaCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("recipeCount")} keyName="recipeCount" delay={this.getDelay("recipeCount")} setPage={this.props.setPage} page={6} tab={""} color={colors.toolsAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.recipePercentage} image={require("../assets/icons/crafting.png")} text={attemptToTranslate("Recipes") + " " + this.state.recipeCount + "/" + this.state.recipeCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("furnitureCount")} keyName="furnitureCount" delay={this.getDelay("furnitureCount")} setPage={this.props.setPage} page={3} tab={0} color={colors.furnitureAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.furniturePercentage} image={require("../assets/icons/leaf.png")} text={attemptToTranslate("Furniture") + " " + this.state.furnitureCount + "/" + this.state.furnitureCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("floorWallsCount")} keyName="floorWallsCount" delay={this.getDelay("floorWallsCount")} setPage={this.props.setPage} page={3} tab={2} color={colors.floorWallsAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.floorWallsPercentage} image={require("../assets/icons/carpet.png")} text={attemptToTranslate("Floor & Walls") + " " + this.state.floorWallsCount + "/" + this.state.floorWallsCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("clothingCount")} keyName="clothingCount" delay={this.getDelay("clothingCount")} setPage={this.props.setPage} page={3} tab={1} color={colors.clothingAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.clothingPercentage} image={require("../assets/icons/top.png")} text={attemptToTranslate("Clothing") + " " + this.state.clothingCount + "/" + this.state.clothingCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("gyroidCount")} keyName="gyroidCount" delay={this.getDelay("gyroidCount")} setPage={this.props.setPage} page={33} tab={""} color={colors.gyroidAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.gyroidPercentage} image={require("../assets/icons/gyroid.png")} text={attemptToTranslate("Gyroids") + " " + this.state.gyroidCount + "/" + this.state.gyroidCountTotal.toString()}/>
        <ProgressContainerToggle saveList={this.saveList} toggleEditMode = {this.toggleEditMode} editMode={this.state.editMode} enabled={!this.state.collectionSectionsDisabled.includes("achievementsCount")} keyName="achievementsCount" delay={this.getDelay("achievementsCount")} setPage={this.props.setPage} page={19} tab={""} color={colors.achievementsAppBar[0]} backgroundColor={colors.white[global.darkMode]} textColor={colors.textBlack[global.darkMode]} percentage={this.state.achievementsPercentage} image={require("../assets/icons/achievementIcon.png")} text={attemptToTranslate("Achievements") + " " + this.state.achievementsCount + "/" + this.state.achievementsCountTotal.toString()}/>
        </>:<View style={{justifyContent:"center", alignItems:"center"}}>
          <LottieView autoPlay loop
            style={{width: 90, zIndex:1,}}
            source={require('../assets/loading.json')}
          />
        </View>}
      <View style={{height: 15}}/>
      </>
    )
  }
}


const styles = StyleSheet.create({
  dayHeader:{
    fontSize: 17,
    marginTop: 15,
    marginHorizontal: 20,
    marginBottom: 4,
  },
  homeScreenList: {
    alignItems: 'center',
    width: "100%"
  },
  homeScreenBackgroundTop: {
    height: 295,
    width: "100%",
    backgroundColor: "#4298f5",
  },
  textContainerTop:{
    fontSize: 17,
    marginRight: 100,
  },
  textContainer:{
    marginLeft: 30,
  },
  settingsContainer: {
    margin: 3,
    paddingVertical: 20,
    flexDirection:"row",
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
});