import React, { Component } from 'react'
import {Dimensions, Text, View,StyleSheet ,Animated} from 'react-native'
import  {DrawerLayout, ScrollView} from 'react-native-gesture-handler'
import SidebarElement from './SidebarElement';
import colors from '../Colors.js';
import TextFont from './TextFont';

export default class SideMenu extends Component {
  openDrawer = () => {
    this.drawer.openDrawer();
  }
  closeDrawer = () => {
    this.drawer.closeDrawer()
  }
  tabbedPages = [2,3,6,10];
  renderDrawer = () => {
    return (
      <View style={{width: "100%", height:"100%", backgroundColor:colors.textWhite[global.darkMode]}}>
        <ScrollView>
          <View style={{backgroundColor: colors.topSidebar[global.darkMode], marginBottom: 10}}>
            <TextFont bold={true} style={{marginLeft: 15, marginTop: 130, marginBottom: 10, fontSize: 34, color: colors.textBlack[global.darkMode]}}>ACNH Pocket</TextFont>
          </View>
          <SidebarElement image={require("../assets/icons/house.png")} title="Home" pageNum={0} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectHome[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/book.png")} title="Everything" pageNum={1} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectEverything[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/bugs.png")} title="Creatures + Museum" pageNum={2} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCreatures[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/leaf.png")} title="Items" pageNum={3} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectItems[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/music.png")} title="Songs" pageNum={4} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectSongs[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/emote.png")} title="Emoticons" pageNum={5} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectEmotes[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/crafting.png")} title="Recipes + Tools" pageNum={6} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCrafting[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/wood.png")} title="Materials" pageNum={7} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectMaterials[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/cat.png")} title="Villagers" pageNum={8} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectVillagers[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/construction.png")} title="Construction" pageNum={9} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectConstruction[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/flower.png")} title="Flowers" pageNum={10} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectMisc[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/envelope.png")} title="Letters" pageNum={11} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectCards[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <View style={{backgroundColor:colors.lightDarkAccent[global.darkMode], height:3, marginLeft:14, marginRight: 14, marginTop: 10, marginBottom: 10}}/>
          <SidebarElement image={require("../assets/icons/settings.png")} title="Settings" pageNum={12} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectSettings[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
          <SidebarElement image={require("../assets/icons/magnifyingGlass.png")} title="About" pageNum={13} setPage={this.props.setPage} currentPage={this.props.currentPage} backgroundColor={colors.selectAbout[global.darkMode]} textColor={colors.textBlack[global.darkMode]} unselectedColor={colors.textWhite[global.darkMode]}/>
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
          edgeWidth={this.tabbedPages.includes(this.props.currentPage) ? Dimensions.get('window').width*0.25 : Dimensions.get('window').width}
          drawerWidth={Dimensions.get('window').width*0.66}
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
