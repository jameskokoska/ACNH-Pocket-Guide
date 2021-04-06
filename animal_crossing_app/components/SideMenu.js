import React, { Component } from 'react'
import {Dimensions, Text, View,StyleSheet ,Animated} from 'react-native'
import  {DrawerLayout, ScrollView} from 'react-native-gesture-handler'
import SidebarElement from './SidebarElement';
import colors from '../Colors.js';
import TextFont from './TextFont';
import {getSettingsString} from '../LoadJsonData';

export default class SideMenu extends Component {
  openDrawer = () => {
    this.drawer.openDrawer();
  }
  closeDrawer = () => {
    this.drawer.closeDrawer()
  }
  nonTabbedPages = [0];
  renderDrawer = () => {
    return (
      <View style={{width: "100%", height:"100%", backgroundColor:colors.textWhite[global.darkMode]}}>
        <ScrollView>
          <View style={{backgroundColor: colors.topSidebar[global.darkMode], marginBottom: 10}}>
            <TextFont bold={true} style={{marginHorizontal: 15, marginTop: 130, marginBottom: 10, fontSize: 34, color: colors.textBlack[global.darkMode]}}>ACNH Pocket</TextFont>
          </View>
          {sideSections.map( (section, index)=>
            {
              if(section["pageNum"]!="breaker"){
                return <SidebarElement 
                  image={section.picture} 
                  title={section.displayName}
                  pageNum={section.pageNum} 
                  setPage={this.props.setPage} 
                  currentPage={this.props.currentPage} 
                  backgroundColor={colors[section.color][global.darkMode]}
                  textColor={colors.textBlack[global.darkMode]} 
                  unselectedColor={colors.textWhite[global.darkMode]}
                />
              } else {
                return <View 
                  key={section["pageNum"].toString()+index.toString()}
                  style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:3, marginHorizontal: 17, marginVertical:8}}
                />
              }
            }
          )}
          <View style={{margin:15}}/>
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
          drawerWidth={Dimensions.get('window').width*0.7}
          drawerPosition={DrawerLayout.positions.Left}
          drawerType="slide"
          drawerBackgroundColor="#ddd"
          renderNavigationView={this.renderDrawer}
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
    "color": "selectHome"
  },
  {
    "pageNum" : 1,
    "picture" : require("../assets/icons/book.png"),
    "displayName" : "Everything",
    "color": "selectEverything"
  },
  {
    "pageNum" : 18,
    "picture" : require("../assets/icons/wishlist.png"),
    "displayName" : "Wishlist",
    "color": "selectWishlist"
  },
  {
    "pageNum" : 17,
    "picture" : require("../assets/icons/package.png"),
    "displayName" : "New Items",
    "color": "selectNewItems"
  },
  {
    "pageNum" : "breaker",
  },
  {
    "pageNum" : 2,
    "picture" : require("../assets/icons/bugs.png"),
    "displayName" : "Creatures + Museum",
    "color": "selectCreatures"
  },
  {
    "pageNum" : 3,
    "picture" : require("../assets/icons/leaf.png"),
    "displayName" : "Items",
    "color": "selectItems"
  },
  {
    "pageNum" : 4,
    "picture" : require("../assets/icons/music.png"),
    "displayName" : "Songs",
    "color": "selectSongs"
  },
  {
    "pageNum" : 5,
    "picture" : require("../assets/icons/emote.png"),
    "displayName" : "Emoticons",
    "color": "selectEmotes"
  },
  {
    "pageNum" : 6,
    "picture" : require("../assets/icons/crafting.png"),
    "displayName" : "Recipes + Tools",
    "color": "selectCrafting"
  },
  {
    "pageNum" : 8,
    "picture" : require("../assets/icons/cat.png"),
    "displayName" : "Villagers",
    "color": "selectVillagers"
  },
  {
    "pageNum" : 9,
    "picture" : require("../assets/icons/construction.png"),
    "displayName" : "Construction",
    "color": "selectConstruction"
  },
  {
    "pageNum" : 10,
    "picture" : require("../assets/icons/flower.png"),
    "displayName" : "Flowers",
    "color": "selectItems"
  },
  {
    "pageNum" : 11,
    "picture" : require("../assets/icons/envelope.png"),
    "displayName" : "Letters",
    "color": "selectCards"
  },
  {
    "pageNum" : "breaker",
  },
  {
    "pageNum" : 21,
    "picture" : require("../assets/icons/obtainable.png"),
    "displayName" : "Obtainable Items",
    "color": "selectObtainable"
  },
  {
    "pageNum" : 19,
    "picture" : require("../assets/icons/achievementIcon.png"),
    "displayName" : "Achievements",
    "color": "selectAchievements"
  },
  {
    "pageNum" : 16,
    "picture" : require("../assets/icons/calendar.png"),
    "displayName" : "Calendar + Events",
    "color": "selectCalendar"
  },
  {
    "pageNum" : 7,
    "picture" : require("../assets/icons/palmTree.png"),
    "displayName" : "Mystery Islands",
    "color": "selectIsland"
  },
  {
    "pageNum" : 15,
    "picture" : require("../assets/icons/acnhFAQIcon.png"),
    "displayName" : "Guide + FAQ",
    "color": "selectAbout"
  },
  {
    "pageNum" : "breaker",
  },
  {
    "pageNum" : 12,
    "picture" : require("../assets/icons/scroll.png"),
    "displayName" : "Catalog Scanner",
    "color": "selectAbout"
  },
  {
    "pageNum" : 13,
    "picture" : require("../assets/icons/settings.png"),
    "displayName" : "Settings",
    "color": "selectSettings"
  },
  {
    "pageNum" : 14,
    "picture" : require("../assets/icons/magnifyingGlass.png"),
    "displayName" : "About",
    "color": "selectAbout"
  },
]

