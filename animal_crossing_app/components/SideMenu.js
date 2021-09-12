import React, { Component } from 'react'
import {Vibration, Dimensions, View,TouchableOpacity} from 'react-native'
import  {DrawerLayout, ScrollView} from 'react-native-gesture-handler'
import SidebarElement from './SidebarElement';
import colors from '../Colors.js';
import TextFont from './TextFont';
import {getSettingsString, getStorage} from '../LoadJsonData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileIcon} from "../pages/ProfileCurrentPage"

export default class SideMenu extends Component {
  constructor(props){
    super(props);
    this.state = {editMode: false, sideSections:this.props.sideMenuSections}
    this.maxWidth = 411*0.7;
    if(Dimensions.get('window').width*0.7 < this.maxWidth){
      this.maxWidth = Dimensions.get('window').width*0.7;
    }
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
    var sideSections = this.state.sideSections
    for(let index= 0; index<sideSections.length; index++){
      if(sideSections[index]["displayName"]===name){
        sideSections[index]["disabled"] = !sideSections[index]["disabled"]
        break
      }
    }
    this.setState({sideSections:sideSections})
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    await this.saveSections(sideSections);
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
    console.log(JSON.parse(await getStorage("SideMenuSections","")))
  }
  nonTabbedPages = [0];
  renderDrawer = () => {
    return (
      <View style={{width: "100%", height:"100%", backgroundColor:colors.textWhite[global.darkMode]}}>
        <ScrollView ref={(scrollView) => this.scrollView = scrollView}>
          <View style={{backgroundColor: colors.topSidebar[global.darkMode], marginBottom: 10}}>
            <View style={{height:45}}/>
            <View style={{flexDirection:"row", width:this.maxWidth-10}}>
              <ProfileIcon onPress={()=>{this.props.setPage(26)}} profile={global.profile} style={{marginLeft:20}}/>
              <TouchableOpacity onPress={()=>{this.props.setPage(26)}} style={{justifyContent:"center"}}>
                <TextFont bold={true} style={{fontSize: 19, marginLeft:14, marginRight:100, color: colors.textBlack[global.darkMode]}}>{global.name===""?"Tap to setup your profile":global.name}</TextFont>
                {global.name===""?<View/>:<TextFont bold={false} style={{fontSize: 18, marginLeft:14, marginRight:6, color: colors.textBlack[global.darkMode]}}>{global.islandName}</TextFont>}
              </TouchableOpacity>
            </View>
            <TextFont bold={true} style={{marginHorizontal: 20, marginTop: 16, marginBottom: 10, fontSize: 31, color: colors.textBlack[global.darkMode]}}>ACNH Pocket</TextFont>
          </View>
          {this.state.sideSections.map( (section, index)=>
            {
              if(section["pageNum"]!="breaker"){
                let disabled = section.disabled===true
                return <SidebarElement 
                  key={section["pageNum"].toString()+index.toString()}
                  image={section.picture} 
                  title={section.displayName}
                  pageNum={section.pageNum} 
                  setPage={this.props.setPage} 
                  currentPage={this.props.currentPage} 
                  backgroundColor={colors[section.color][global.darkMode]}
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
        >
            {this.props.children}
        </DrawerLayout>
      </View>
    )
  }
}

export const sideSections = [
  {
    "pageNum" : 0,
    "picture" : require("../assets/icons/homeIcon.png"),
    "displayName" : "Home",
    "color": "selectHome",
    "cannotDisable":true,
    "disabled":false
  },
  {
    "pageNum" : 1,
    "picture" : require("../assets/icons/book.png"),
    "displayName" : "Everything",
    "color": "selectEverything",
    "disabled":false
  },
  {
    "pageNum" : 18,
    "picture" : require("../assets/icons/wishlist.png"),
    "displayName" : "Wishlist",
    "color": "selectWishlist",
    "disabled":false
  },
  {
    "pageNum" : 17,
    "picture" : require("../assets/icons/package.png"),
    "displayName" : "New Items",
    "color": "selectNewItems",
    "disabled":false
  },
  {
    "pageNum" : 29,
    "picture" : require("../assets/icons/fishingRod.png"),
    "displayName" : "Active Creatures",
    "color": "selectWishlist",
    "disabled":false
  },
  {
    "pageNum" : "breaker",
  },
  {
    "pageNum" : 2,
    "picture" : require("../assets/icons/bugs.png"),
    "displayName" : "Creatures + Museum",
    "color": "selectCreatures",
    "disabled":false
  },
  {
    "pageNum" : 3,
    "picture" : require("../assets/icons/leaf.png"),
    "displayName" : "Items",
    "color": "selectItems",
    "disabled":false
  },
  {
    "pageNum" : 4,
    "picture" : require("../assets/icons/music.png"),
    "displayName" : "Songs",
    "color": "selectSongs",
    "disabled":false
  },
  {
    "pageNum" : 5,
    "picture" : require("../assets/icons/emote.png"),
    "displayName" : "Emoticons",
    "color": "selectEmotes",
    "disabled":false
  },
  {
    "pageNum" : 6,
    "picture" : require("../assets/icons/crafting.png"),
    "displayName" : "Recipes + Tools",
    "color": "selectCrafting",
    "disabled":false
  },
  {
    "pageNum" : 8,
    "picture" : require("../assets/icons/cat.png"),
    "displayName" : "Villagers",
    "color": "selectVillagers",
    "disabled":false
  },
  {
    "pageNum" : 9,
    "picture" : require("../assets/icons/construction.png"),
    "displayName" : "Construction",
    "color": "selectConstruction",
    "disabled":false
  },
  {
    "pageNum" : 10,
    "picture" : require("../assets/icons/flower.png"),
    "displayName" : "Flowers",
    "color": "selectItems",
    "disabled":false
  },
  {
    "pageNum" : 11,
    "picture" : require("../assets/icons/envelope.png"),
    "displayName" : "Letters",
    "color": "selectCards",
    "disabled":false
  },
  {
    "pageNum" : 27,
    "picture" : require("../assets/icons/amiiboIcon.png"),
    "displayName" : "Amiibo Cards",
    "color": "selectAmiibo",
    "disabled":false
  },
  {
    "pageNum" : "breaker",
  },
  {
    "pageNum" : 19,
    "picture" : require("../assets/icons/achievementIcon.png"),
    "displayName" : "Achievements",
    "color": "selectAchievements",
    "disabled":false
  },
  {
    "pageNum" : 16,
    "picture" : require("../assets/icons/calendar.png"),
    "displayName" : "Calendar + Events",
    "color": "selectCalendar",
    "disabled":false
  },
  {
    "pageNum" : 21,
    "picture" : require("../assets/icons/obtainable.png"),
    "displayName" : "Obtainable Items",
    "color": "selectObtainable",
    "disabled":false
  },
  {
    "pageNum" : 24,
    "picture" : require("../assets/icons/personalityEmoji.png"),
    "displayName" : "Villager Compatibility",
    "color": "selectAchievements",
    "disabled":false
  },
  {
    "pageNum" : 7,
    "picture" : require("../assets/icons/palmTree.png"),
    "displayName" : "Mystery Islands",
    "color": "selectIsland",
    "disabled":false
  },
  {
    "pageNum" : 15,
    "picture" : require("../assets/icons/acnhFAQIcon.png"),
    "displayName" : "Guide + FAQ",
    "color": "selectAbout",
    "disabled":false
  },
  {
    "pageNum" : 28,
    "picture" : require("../assets/icons/meteonookIcon.png"),
    "displayName" : "MeteoNook",
    "color": "selectAbout",
    "disabled":false
  },
  {
    "pageNum" : "breaker",
  },
  {
    "pageNum" : 25,
    "picture" : require("../assets/icons/coconut-tree.png"),
    "displayName" : "Profiles/Islands",
    "color": "selectAbout",
    "disabled":false
  },
  {
    "pageNum" : 12,
    "picture" : require("../assets/icons/scroll.png"),
    "displayName" : "Catalog Scanning",
    "color": "selectAbout",
    "disabled":false
  },
  {
    "pageNum" : 13,
    "picture" : require("../assets/icons/settings.png"),
    "displayName" : "Settings",
    "color": "selectSettings",
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

