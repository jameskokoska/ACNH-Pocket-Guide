import React, {Component} from 'react';
import {ScrollView, Dimensions, Vibration, TouchableOpacity, StyleSheet, DrawerLayoutAndroid, View, Text, TouchableNativeFeedback} from 'react-native';
import FAB from '../components/FAB';
import SidebarElement from '../components/SidebarElement';

const {width} = Dimensions.get('window');

function NavigationView(props) {
  return (
    <View style={{marginRight: "30%", height:"100%", backgroundColor:"white"}}>
      <ScrollView>
        <Text style={{margin: 100}}>ACNH Pocket</Text>
        <SidebarElement image={require("../assets/icons/house.png")} name="Home" navigation={props.navigation}/>
        <SidebarElement image={require("../assets/icons/book.png")} name="All Items" navigation={props.navigation}/>
        <SidebarElement image={require("../assets/icons/bugs.png")} name="Creatures and Museum" navigation={props.navigation}/>
        <SidebarElement image={require("../assets/icons/leaf.png")} name="Items" navigation={props.navigation}/>
        <SidebarElement image={require("../assets/icons/music.png")} name="Songs" navigation={props.navigation}/>
        <SidebarElement image={require("../assets/icons/emote.png")} name="Emoticons" setPage={props.setPage}/>
        <SidebarElement image={require("../assets/icons/crafting.png")} name="Crafting + Tools" setPage={props.setPage}/>
        <SidebarElement image={require("../assets/icons/cat.png")} name="Villagers" setPage={props.setPage}/>
        <SidebarElement image={require("../assets/icons/construction.png")} name="Construction" setPage={props.setPage}/>
        <SidebarElement image={require("../assets/icons/season.png")} name="Misc. Timetables" setPage={props.setPage}/>
        <View style={{backgroundColor:"grey", width:"87%", height:3, margin:20}}/>
        <SidebarElement image={require("../assets/icons/settings.png")} name="Settings" setPage={props.setPage}/>
        <SidebarElement image={require("../assets/icons/magnifyingGlass.png")} name="About" setPage={props.setPage}/>
        <View style={{margin:15}}/>
      </ScrollView>
    </View>
  )
}

class Overlay extends Component {
  componentDidMount() {
    
  }
  render(){
    return(
      <DrawerLayoutAndroid style={{elevation: 0,}} 
        drawerBackgroundColor="rgba(0,0,0,0.01)" 
        ref={_drawer => (this.drawer = _drawer)} 
        drawerWidth={width} drawerPosition={"left"} 
        renderNavigationView={() => <NavigationView navigation={this.props.navigation}/>}>
          {this.props.children}
        <FAB backgroundColor='red' openDrawer={this.openDrawer}/>
      </DrawerLayoutAndroid>
    )
  }
}
export default Overlay;