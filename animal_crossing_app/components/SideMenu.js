import React, { Component } from 'react'
import {Vibration, Dimensions, View,TouchableOpacity} from 'react-native'
import  {DrawerLayout, ScrollView} from 'react-native-gesture-handler'
import SidebarElement from './SidebarElement';
import colors from '../Colors.js';
import TextFont from './TextFont';
import {attemptToTranslate, getSettingsString, getStorage} from '../LoadJsonData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileIcon} from "../pages/ProfileCurrentPage"

export default class SideMenu extends Component {
  constructor(props){
    super(props);
    this.state = {editMode: false, sideSections:this.props.sideMenuSections, sideMenuSectionsDisabled: this.props.sideMenuSectionsDisabled}
    this.maxWidth = 411*0.7;
    if(Dimensions.get('window').width*0.7 < this.maxWidth){
      this.maxWidth = Dimensions.get('window').width*0.7;
    }
    // console.log(this.props.sideMenuSectionsDisabled)
  }
  disableEditMode = (progress) => {
    if(this.state.editMode===true && progress>0.15){
      this.setState({editMode:false})
    }
  }
  openDrawer = () => {
    this.drawer.openDrawer();
  }
  closeDrawer = () => {
    this.drawer.closeDrawer()
  }
  editSections = async (name) => {
    let sideSectionsDisabled = this.state.sideMenuSectionsDisabled
    if(sideSectionsDisabled.includes(name)){
      console.log("Removed side section"+name)
      sideSectionsDisabled = sideSectionsDisabled.filter(e => e !== name)
      sideSectionsDisabled = sideSectionsDisabled.filter(e => e !== "")
    } else {
      console.log("Added side section"+name)
      sideSectionsDisabled.push(name)
    }
    this.setState({sideMenuSectionsDisabled:sideSectionsDisabled})
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    console.log("Side sections disabled: " + sideSectionsDisabled)
    await this.saveDisabledSections(sideSectionsDisabled);
  }
  reorderSections = async (index, direction) => {
    //-1 moves the item down
    //1 moves the item up
    const items = this.state.sideSections
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

    this.setState({sideSections: items});
    await this.saveSections(items);
  };
  saveSections = async(data) => {
    await AsyncStorage.setItem("SideMenuSections", JSON.stringify(data));
  }
  saveDisabledSections = async(data) => {
    await AsyncStorage.setItem("SideMenuSectionsDisabled", JSON.stringify(data));
  }
  getSectionPictureFix(displayName){
    for(let i = 0; i<sideSections.length; i++){
      if(sideSections[i]["displayName"]===displayName){
        return sideSections[i]["picture"]
      }
    }
  }
  getSectionColorFix(displayName){
    for(let i = 0; i<sideSections.length; i++){
      if(sideSections[i]["displayName"]===displayName){
        return sideSections[i]["color"]
      }
    }
  }
  nonTabbedPages = []; //can be 0 as the home page so you can swipe from anywhere, but now only edge
  renderDrawer = () => {
    return (
      <View style={{width: "100%", height:"100%", backgroundColor:colors.textWhite[global.darkMode]}}>
        <ScrollView overScrollMode={"never"} ref={(scrollView) => this.scrollView = scrollView}>
          <View style={{backgroundColor: colors.topSidebar[global.darkMode], marginBottom: 10}}>
            <View style={{height:45}}/>
            <View style={{flexDirection:"row", width:this.maxWidth-10}}>
              <ProfileIcon onPress={()=>{this.props.setPage(26)}} profile={global.profile} style={{marginLeft:20}}/>
              <TouchableOpacity onPress={()=>{this.props.setPage(26)}} style={{justifyContent:"center"}}>
                <TextFont translate={false} bold={true} style={{fontSize: 18, marginLeft:14, marginRight:100, color: colors.textBlack[global.darkMode]}}>{global.name===""?attemptToTranslate("Tap to setup your profile"):global.name}</TextFont>
                {global.name===""?<View/>:<TextFont translate={false} bold={false} style={{fontSize: 17, marginLeft:14, marginRight:6, color: colors.textBlack[global.darkMode]}}>{global.islandName}</TextFont>}
              </TouchableOpacity>
            </View>
            <TextFont bold={true} style={{marginHorizontal: 20, marginTop: 16, marginBottom: 10, fontSize: 30, color: colors.textBlack[global.darkMode]}}>ACNH Pocket</TextFont>
          </View>
          {this.state.sideSections.map( (section, index)=>
            {
              if(section["pageNum"]!="breaker"){
                let disabled = this.state.sideMenuSectionsDisabled.includes(section["displayName"])
                return <SidebarElement 
                  key={section["pageNum"].toString()+index.toString()}
                  image={this.getSectionPictureFix(section.displayName)} 
                  title={section.displayName}
                  pageNum={section.pageNum} 
                  setPage={this.props.setPage} 
                  currentPage={this.props.currentPage} 
                  backgroundColor={colors[this.getSectionColorFix(section.displayName)][global.darkMode]}
                  textColor={colors.textBlack[global.darkMode]} 
                  unselectedColor={this.state.editMode&&!section.cannotDisable?colors.inkWell[global.darkMode]+(disabled?"1F":"8F"):colors.textWhite[global.darkMode]}
                  editMode={this.state.editMode}
                  editSections={this.editSections}
                  index={index}
                  reorderSections={this.reorderSections}
                  disabled={disabled}
                  cannotDisable={section.cannotDisable}
                />
              } else {
                return <View 
                  key={section["pageNum"].toString()+index.toString()}
                  style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:3, marginHorizontal: 17, marginVertical:8}}
                />
              }
            }
          )}
          <View style={{margin:2}}/>
          <TouchableOpacity style={{padding:8, alignItems:"center"}} 
            onPress={()=>{
              this.setState({editMode:!this.state.editMode});
              getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
              setTimeout(()=>{
                this.scrollView.scrollToEnd();
              }, 150);
          }}>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14,}}>{this.state.editMode ? "Disable Edit Pages" : "Edit Pages"}</TextFont>
          </TouchableOpacity>
          <View style={{margin:5}}/>
        </ScrollView>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <DrawerLayout
          ref={(drawer) => this.drawer = drawer }
          edgeWidth={this.nonTabbedPages.includes(this.props.currentPage) ? Dimensions.get('window').width : Dimensions.get('window').width*0.17}
          drawerWidth={this.maxWidth}
          drawerPosition={DrawerLayout.positions.Left}
          drawerType="slide"
          drawerBackgroundColor="#ddd"
          renderNavigationView={this.renderDrawer}
          onDrawerSlide={(progress)=>this.disableEditMode(progress)}
          minSwipeDistance={20}
          useNativeAnimations={true}
        >
            {this.props.children}
        </DrawerLayout>
      </View>
    )
  }
}

export const sideSections = [
  {
    "pageNum" : 39,
    "picture" : require("../assets/icons/coffee2.png"),
    "displayName" : "Buy Me a Coffee",
    "color": "selectHome",
    "cannotDisable":false,
  },
  {
    "pageNum" : 0,
    "picture" : require("../assets/icons/homeIcon.png"),
    "displayName" : "Home",
    "color": "selectHome",
    "cannotDisable":true,
  },
  {
    "pageNum" : 1,
    "picture" : require("../assets/icons/book.png"),
    "displayName" : "Everything",
    "color": "selectEverything",
  },
  {
    "pageNum" : 18,
    "picture" : require("../assets/icons/wishlist.png"),
    "displayName" : "Wishlist",
    "color": "selectWishlist",
  },
  {
    "pageNum" : 17,
    "picture" : require("../assets/icons/package.png"),
    "displayName" : "New Items",
    "color": "selectNewItems",
  },
  {
    "pageNum" : 29,
    "picture" : require("../assets/icons/fishingRod.png"),
    "displayName" : "Active Creatures",
    "color": "selectActiveCreatures",
  },
  {
    "pageNum" : "breaker",
  },
  {
    "pageNum" : 2,
    "picture" : require("../assets/icons/creatures.png"),
    "displayName" : "Creatures + Museum",
    "color": "selectCreatures",
  },
  {
    "pageNum" : 3,
    "picture" : require("../assets/icons/leaf.png"),
    "displayName" : "Items",
    "color": "selectItems",
  },
  {
    "pageNum" : 33,
    "picture" : require("../assets/icons/gyroid.png"),
    "displayName" : "Gyroids",
    "color": "selectGyroids",
  },
  {
    "pageNum" : 4,
    "picture" : require("../assets/icons/music.png"),
    "displayName" : "Songs",
    "color": "selectSongs",
  },
  {
    "pageNum" : 5,
    "picture" : require("../assets/icons/emote.png"),
    "displayName" : "Reactions",
    "color": "selectEmotes",
  },
  {
    "pageNum" : 6,
    "picture" : require("../assets/icons/recipes.png"),
    "displayName" : "Recipes",
    "color": "selectCrafting",
  },
  {
    "pageNum" : 8,
    "picture" : require("../assets/icons/cat.png"),
    "displayName" : "Villagers",
    "color": "selectVillagers",
  },
  {
    "pageNum" : 9,
    "picture" : require("../assets/icons/construction.png"),
    "displayName" : "Construction + Tools",
    "color": "selectConstruction",
  },
  {
    "pageNum" : 10,
    "picture" : require("../assets/icons/flower.png"),
    "displayName" : "Flowers",
    "color": "selectItems",
  },
  {
    "pageNum" : 11,
    "picture" : require("../assets/icons/envelope.png"),
    "displayName" : "Letters",
    "color": "selectCards",
  },
  {
    "pageNum" : 27,
    "picture" : require("../assets/icons/amiiboIcon.png"),
    "displayName" : "Amiibo Cards",
    "color": "selectAmiibo",
  },
  {
    "pageNum" : "breaker",
  },
  {
    "pageNum" : 19,
    "picture" : require("../assets/icons/achievementIcon.png"),
    "displayName" : "Achievements",
    "color": "selectAchievements",
  },
  {
    "pageNum" : 16,
    "picture" : require("../assets/icons/calendar.png"),
    "displayName" : "Calendar + Events",
    "color": "selectCalendar",
  },
  {
    "pageNum" : 35,
    "picture" : require("../assets/icons/paradisePlanning.png"),
    "displayName" : "Paradise Planning",
    "color": "selectParadise",
  },
  {
    "pageNum" : 21,
    "picture" : require("../assets/icons/obtainable.png"),
    "displayName" : "Obtainable Items",
    "color": "selectObtainable",
  },
  {
    "pageNum" : 24,
    "picture" : require("../assets/icons/personalityEmoji.png"),
    "displayName" : "Villager Compatibility",
    "color": "selectVillagerCompatibility",
  },
  {
    "pageNum" : 7,
    "picture" : require("../assets/icons/palmTree.png"),
    "displayName" : "Mystery Islands",
    "color": "selectIsland",
  },
  {
    "pageNum" : 31,
    "picture" : require("../assets/icons/tv.png"),
    "displayName" : "TV Guide",
    "color": "selectConstruction",
    "disabled":false
  },
  // {
  //   "pageNum" : 32,
  //   "picture" : require("../assets/icons/clipboard.png"),
  //   "displayName" : "Ordinances",
  //   "color": "selectOrdinances",
  // },
  {
    "pageNum" : 15,
    "picture" : require("../assets/icons/acnhFAQIcon.png"),
    "displayName" : "Guide + FAQ",
    "color": "selectFAQ",
  },
  {
    "pageNum" : 28,
    "picture" : require("../assets/icons/meteonookIcon.png"),
    "displayName" : "MeteoNook",
    "color": "selectMeteoNook",
  },
  {
    "pageNum" : "breaker",
  },
  {
    "pageNum" : 25,
    "picture" : require("../assets/icons/coconut-tree.png"),
    "displayName" : "Profiles/Islands",
    "color": "selectProfile",
  },
  {
    "pageNum" : 12,
    "picture" : require("../assets/icons/scroll.png"),
    "displayName" : "Catalog Scanning",
    "color": "selectCatalogScanning",
  },
  {
    "pageNum" : 13,
    "picture" : require("../assets/icons/settings.png"),
    "displayName" : "Settings",
    "color": "selectSettings",
    "cannotDisable":true,
  },
  {
    "pageNum" : 30,
    "picture" : require("../assets/icons/fileBackup.png"),
    "displayName" : "Backup + Restore",
    "color": "selectBackupAndRestore",
    "cannotDisable":true,
  },
  {
    "pageNum" : 14,
    "picture" : require("../assets/icons/magnifyingGlass.png"),
    "displayName" : "About",
    "color": "selectAbout",
    "cannotDisable":true,
  },
]

