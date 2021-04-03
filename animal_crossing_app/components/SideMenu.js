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
          <SidebarElement image={require("../assets/icons/homeIcon.png")} title="Home" pageNum={0} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectHome[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/book.png")} title="Everything" pageNum={1} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectEverything[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/wishlist.png")} title="Wishlist" pageNum={18} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectWishlist[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/package.png")} title="New Items" pageNum={17} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectNewItems[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:3, marginHorizontal: 17, marginVertical:8}}/>
          <SidebarElement image={require("../assets/icons/bugs.png")} title="Creatures + Museum" pageNum={2} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCreatures[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/leaf.png")} title="Items" pageNum={3} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectItems[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/music.png")} title="Songs" pageNum={4} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectSongs[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/emote.png")} title="Emoticons" pageNum={5} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectEmotes[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/crafting.png")} title="Recipes + Tools" pageNum={6} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCrafting[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/cat.png")} title="Villagers" pageNum={8} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectVillagers[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/construction.png")} title="Construction" pageNum={9} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectConstruction[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/flower.png")} title="Flowers" pageNum={10} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectItems[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/envelope.png")} title="Letters" pageNum={11} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCards[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:3, marginHorizontal: 17, marginVertical:8}}/>
          <SidebarElement image={require("../assets/icons/obtainable.png")} title="Obtainable Items" pageNum={21} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectObtainable[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/achievementIcon.png")} title="Achievements" pageNum={19} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectAchievements[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/calendar.png")} title="Calendar + Events" pageNum={16} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCalendar[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/palmTree.png")} title="Mystery Islands" pageNum={7} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectIsland[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/acnhFAQIcon.png")} title="Guide + FAQ" pageNum={15} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectAbout[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:3, marginHorizontal: 17, marginVertical:8}}/>
          <SidebarElement image={require("../assets/icons/scroll.png")} title="Catalog Scanning" pageNum={12} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectAbout[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/settings.png")} title="Settings" pageNum={13} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectSettings[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/magnifyingGlass.png")} title="About" pageNum={14} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectAbout[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
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
