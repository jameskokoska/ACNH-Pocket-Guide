import React, {useRef, Component} from 'react';
import { ScrollView, Dimensions, Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet, ActivityIndicator} from 'react-native';
import ListPage from './components/ListPage';
import SidebarElement from './components/SidebarElement';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FAB from './components/FAB';

const {width} = Dimensions.get('window');


const art = require("./assets/data/art.json");
const fencing = require("./assets/data/fencing.json");
const reactions = require("./assets/data/reactions.json");

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
    this.setPage = this.setPage.bind(this);
    this.state = {
      currentPage: 0,
      index: 0,
      routes: [
        { key: 'first', title: 'Reactions' },
        { key: 'second', title: 'Art' },
      ],
    }
  }

  
  handleIndexChange = index => this.setState({index});
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
    if(this.state.currentPage===0){
      currentPageView = 
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
    } else {
      currentPageView = 
        <Text>Page 2</Text>
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

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});