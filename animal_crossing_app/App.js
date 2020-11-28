import React, {useRef, Component} from 'react';
import { ScrollView, Dimensions, Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import SidebarElement from './components/SidebarElement';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FAB from './components/FAB';
import TabsPage from './pages/TabsPage';
import HomePage from './pages/HomePage';

const {width} = Dimensions.get('window');


function NavigationView(props) {
  return (
    <View style={{marginRight: "30%", height:"100%", backgroundColor:"white"}}>
      <ScrollView>
      <Text style={{margin: 100}}>ACNH Pocket</Text>
      <SidebarElement image={require("./assets/icons/house.png")} title="Home" pageNum={0} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/bugs.png")} title="Creatures and Museum" pageNum={1} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/leaf.png")} title="Items" pageNum={2} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/emote.png")} title="Emoticons" pageNum={3} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/crafting.png")} title="Crafting + Tools" pageNum={4} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/cat.png")} title="Villagers" pageNum={5} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/construction.png")} title="Construction" pageNum={6} setPage={props.setPage}/>
      <SidebarElement image={require("./assets/icons/season.png")} title="Misc. Timetables" pageNum={7} setPage={props.setPage}/>
    </ScrollView>
    </View>
  )
}


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
    this.setPage = this.setPage.bind(this);
    this.state = {
      currentPage: 0,
    }
  }

  openDrawer() {
    this.drawer.openDrawer();
  }
  setPage(pageNum) {
    console.log(pageNum)
    this.setState({currentPage: pageNum})
    this.drawer.closeDrawer();
  }
  
  render(){
    var currentPageView;
    if (this.state.currentPage===0){
      currentPageView = <HomePage/>
    } else if(this.state.currentPage===1){
      currentPageView = <TabsPage/>
    } else if (this.state.currentPage===2){
      currentPageView = <TabsPage/>
    } else {
      currentPageView = <Text>Default</Text>
    }
    
    return (
      <DrawerLayoutAndroid style={{elevation: 0,}} 
        drawerBackgroundColor="rgba(0,0,0,0.01)" 
        ref={_drawer => (this.drawer = _drawer)} 
        drawerWidth={width} drawerPosition={"left"} 
        renderNavigationView={() => <NavigationView setPage={this.setPage}/>}>
        {currentPageView}
        <FAB backgroundColor='red' openDrawer={this.openDrawer}/>
      </DrawerLayoutAndroid>
    );
  }
    
}
export default App;