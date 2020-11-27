import React, {useRef, Component} from 'react';
import {Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import ListPage from './components/ListPage';
const art = require("./assets/data/art.json");
const fencing = require("./assets/data/fencing.json");
const showVariations = false;
 const navigationView = (
    <View>
      <Text style={{ margin: 10, fontSize: 15 }}>I'm in the Drawer!</Text>
    </View>
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
      <DrawerLayoutAndroid drawerWidth={300} drawerPosition={"left"} renderNavigationView={() => navigationView}>
        <ListPage 
          data={[art,fencing]}
          showVariations={showVariations}
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
