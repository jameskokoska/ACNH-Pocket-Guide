import React, {useRef, Component} from 'react';
import {Dimensions, Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import SidebarElement from './components/SidebarElement';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FAB from './components/FAB';

const art = require("./assets/data/art.json");
const fencing = require("./assets/data/fencing.json");
const reactions = require("./assets/data/reactions.json");
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

const FirstRoute = () => (
  <ListPage 
    data={[reactions]}
    showVariations={false}
    title="Reactions"
    imageProperty={["Image"]}
    textProperty={["Name"]}
    checkListKey={[["emojiCheckList","Name"]]}
    searchKey={[["Name"]]}
  />
  
);

const SecondRoute = () => (
  <ListPage 
    data={[art,fencing]}
    showVariations={false}
    title="Art"
    imageProperty={["Image","Image"]}
    textProperty={["Name","Name"]}
    checkListKey={[["artCheckList","Name","Genuine"],["fenceCheckList","Name"]]}
    searchKey={[["Name","Genuine"],["Name"]]}
  />
);
  {/*pass in list of what will be displayed in popup sheet*/}


const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white', height:'100%', opacity: 0.3, borderRadius: 10 }}
    style={{ backgroundColor: 'black'}}
    getLabelText={({ route }) => route.title}
  />
);


const initialLayout = { width: Dimensions.get('window').width };

// TODO
// Search bar functionality
// Custom fonts
// Add components for home screen
// Home screen clock
// Animations (background) and checkmark animations
// Popup pages and respective components
// Row boxes (for row lists)

class App extends Component {
  constructor() {
    super();
    this.openDrawer = this.openDrawer.bind(this);
  }

  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Reactions' },
      { key: 'second', title: 'Art' },
    ],
  }
  handleIndexChange = index => this.setState({index});
  openDrawer() {
    this.drawer.openDrawer();
  }
    
  render(){
    return (
      <DrawerLayoutAndroid ref={_drawer => (this.drawer = _drawer)} drawerWidth={280} drawerPosition={"left"} renderNavigationView={() => navigationView}>
        <TabView
          lazy
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
          })}
          onIndexChange={this.handleIndexChange}
          initialLayout={initialLayout}
          renderTabBar={renderTabBar}
        />
        <FAB backgroundColor='red' openDrawer={this.openDrawer}/>
      </DrawerLayoutAndroid>
    );
  }
    
}
export default App;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});