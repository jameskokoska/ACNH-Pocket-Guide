import React, {useRef, Component} from 'react';
import {Text, View, DrawerLayoutAndroid, Animated, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import ListPage from './components/ListPage';
const data = require("./assets/data/art.json");
const showVariations = false;
 const navigationView = (
    <View>
      <Text style={{ margin: 10, fontSize: 15 }}>I'm in the Drawer!</Text>
    </View>
  );
class App extends Component {
  render() {
    return (
      <DrawerLayoutAndroid drawerWidth={300} drawerPosition={"left"} renderNavigationView={() => navigationView}>
        <ListPage 
          data={data}
          showVariations={showVariations}
          title="Art"
          imageProperty="Image"
          textProperty="Name"
          variationProperty="Genuine"
          checkListKey="artCheckList,Name,Genuine"
        />
      </DrawerLayoutAndroid>
    );
  }
}
export default App;
