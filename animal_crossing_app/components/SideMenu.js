import React, { Component } from 'react'
import {Dimensions, Text, View,StyleSheet ,Animated} from 'react-native'
import  {DrawerLayout, ScrollView} from 'react-native-gesture-handler'
import SidebarElement from './SidebarElement';
import colors from '../Colors.js';
import TextFont from './TextFont';
import {getSettingsString} from '../LoadJsonData';

export default class SideMenu extends Component {
  nonTabbedPages = ["HomePage"];
  render() {
    return (
      <View style={{width: "100%", height:"100%", backgroundColor:colors.textWhite[global.darkMode]}}>
        <ScrollView>
          <View style={{backgroundColor: colors.topSidebar[global.darkMode], marginBottom: 10}}>
            <TextFont bold={true} style={{marginHorizontal: 15, marginTop: 130, marginBottom: 10, fontSize: 34, color: colors.textBlack[global.darkMode]}}>ACNH Pocket</TextFont>
          </View>
          <SidebarElement image={require("../assets/icons/homeIcon.png")} title="Home" pageName={"HomePage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectHome[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/book.png")} title="Everything" pageName={"AllItemsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectEverything[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/wishlist.png")} title="Wishlist" pageName={"WishlistPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectWishlist[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/package.png")} title="New Items" pageName={"NewItemsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectNewItems[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:3, marginHorizontal: 17, marginVertical:8}}/>
          <SidebarElement image={require("../assets/icons/bugs.png")} title="Creatures + Museum" pageName={"MuseumPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCreatures[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/leaf.png")} title="Items" pageName={"ItemsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectItems[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/music.png")} title="Songs" pageName={"SongsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectSongs[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/emote.png")} title="Emoticons" pageName={"EmoticonsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectEmotes[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/crafting.png")} title="Recipes + Tools" pageName={"CraftingPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCrafting[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/cat.png")} title="Villagers" pageName={"VillagersPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectVillagers[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/construction.png")} title="Construction" pageName={"ConstructionPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectConstruction[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/flower.png")} title="Flowers" pageName={"FlowersPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectItems[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/envelope.png")} title="Letters" pageName={"CardsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCards[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:3, marginHorizontal: 17, marginVertical:8}}/>
          <SidebarElement image={require("../assets/icons/obtainable.png")} title="Obtainable Items" pageName={"ObtainableItemsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectObtainable[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/achievementIcon.png")} title="Achievements" pageName={"AchievementsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectAchievements[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/calendar.png")} title="Calendar + Events" pageName={"CalendarPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCalendar[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/palmTree.png")} title="Mystery Islands" pageName={"MysteryIslandsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectIsland[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/acnhFAQIcon.png")} title="Guide + FAQ" pageName={"GuidePage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectAbout[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:3, marginHorizontal: 17, marginVertical:8}}/>
          <SidebarElement image={require("../assets/icons/scroll.png")} title="Catalog Scanning" pageName={"CatalogPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectAbout[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/settings.png")} title="Settings" pageName={"SettingsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectSettings[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/magnifyingGlass.png")} title="About" pageName={"CreditsPage"} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectAbout[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <View style={{margin:15}}/>
        </ScrollView>
      </View>
    )
  }
}
