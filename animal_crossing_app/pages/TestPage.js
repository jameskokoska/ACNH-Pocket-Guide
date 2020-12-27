import React, {Component} from 'react';
import {View, ScrollView, Dimensions, Text} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ActiveTime from '../components/ActiveTime';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';

const width = { width: Dimensions.get('window').width };

class TestPage extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render(){
    return(
      <ActiveTime/>
    //   <TabView
    //     lazy
    //     tabBarPosition={global.settingsCurrent[6]["currentValue"] === "true" ? "bottom" : "top"}
    //     gestureHandlerProps={{ failOffsetX: this.state.index === 0 ? 1 : 100}}
    //     navigationState={this.state}
    //     renderScene={this.renderScene}
    //     onIndexChange={(this.handleIndexChange)}
    //     initialLayout={width}
    //     renderTabBar={renderTabBar}
    //   />
    )
  }
}
export default TestPage;