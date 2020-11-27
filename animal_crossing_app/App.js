import React, {useRef, Component} from 'react';
import {Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import SidebarElement from './components/SidebarElement';

const art = require("./assets/data/art.json");
const fencing = require("./assets/data/fencing.json");
const navigationView = (<>
  <View style={{ margin: 100}}>
    <Text>ACNH Pocket</Text>
  </View>
  <View>
    <SidebarElement image={require("./assets/icons/house.png")} title="Home"/>
    <SidebarElement image={require("./assets/icons/bugs.png")} title="Creatures and Museum"/>
    <SidebarElement image={require("./assets/icons/leaf.png")} title="Items"/>
    <SidebarElement image={require("./assets/icons/emote.png")} title="Emoticons"/>
    <SidebarElement image={require("./assets/icons/crafting.png")} title="Crafting + Tools"/>
    <SidebarElement image={require("./assets/icons/cat.png")} title="Villagers"/>
    <SidebarElement image={require("./assets/icons/construction.png")} title="Construction"/>
    <SidebarElement image={require("./assets/icons/season.png")} title="Misc. Timetables"/>
  </View>
  </>
);

// TODO
// Search bar functionality
// Custom fonts
// Add components for home screen
// Home screen clock
// Animations (background) and checkmark animations
// Popup pages and respective components
// Row boxes (for row lists)

class App extends Component {
  render() {
    return (
      <DrawerLayoutAndroid drawerWidth={280} drawerPosition={"left"} renderNavigationView={() => navigationView}>
        <ListPage 
          data={[art,fencing]}
          showVariations={false}
          title="Art"
          imageProperty={["Image","Image"]}
          textProperty={["Name","Name"]}
          checkListKey={[["artCheckList","Name","Genuine"],["fenceCheckList","Name"]]}
          searchKey={[["Name","Genuine"],["Name"]]}
        />
        {/* https://stackoverflow.com/questions/51269281/can-i-get-a-text-value-between-tags-in-react-native-markup 
        use this for what classes go in the popup to be displayed*/}
      </DrawerLayoutAndroid>
    );
  }
}
export default App;
