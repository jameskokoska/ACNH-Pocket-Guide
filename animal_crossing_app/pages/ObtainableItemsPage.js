import React, {Component} from 'react';
import {TouchableOpacity, View, ScrollView, Dimensions, Text, LogBox} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';
import {getInverseVillagerFilters, getCurrentVillagerNamesString, getSettingsString, attemptToTranslate} from "../LoadJsonData"
import {ClothingRouteClass} from "./ItemsPage"
import {InfoLineBeside, InfoLine} from '../components/BottomSheetComponents';
import EmoticonsPage from "./EmoticonsPage";
import CraftingPage from "./CraftingPage"
import {PopupInfoCustom} from "../components/Popup"
import TextFont from "../components/TextFont"


const renderTabBar = props => (
  <TabBar
    scrollEnabled
    {...props}
    indicatorStyle={{backgroundColor: colors.lightDarkAccentHeavy[global.darkMode], height:'100%', opacity: 0.6, borderRadius: 10 }}
    style={{backgroundColor: colors.white[global.darkMode]}}
    activeColor={colors.textBlack[global.darkMode]}
    inactiveColor={colors.textBlack[global.darkMode]}
    getLabelText={({ route }) => route.title}
    renderLabel={({ route, focused, color }) => (
      <TextFont style={{ color, textAlign:"center", fontSize: 13}}>
        {route.title}
      </TextFont>
    )}
  />
);
class ObtainableDIYsRouteClass extends React.PureComponent {
  render(){
    return(
      <CraftingPage
        tabs={true}
        smallerHeader={true}
        filterSearchable={false}
        title={"Obtainable DIYs"}
        subHeader={attemptToTranslate("You WILL get these from your favorite villagers.") + "\n" + attemptToTranslate("Tap the [?] in the top right corner for more information.")}
        appBarColor = {colors.obtainableItemsAppBar[global.darkMode]}
        accentColor = {colors.obtainableItemsAccent[global.darkMode]}
        titleColor={colors.textBlack[global.darkMode]}
        extraInfo={
          [
            attemptToTranslate("Obtainable DIYs"),
            attemptToTranslate("Specific villager personalities will give you different items."),
            attemptToTranslate("It is recommended that you have all personality types to be able to get all DIYs and Reactions."),
            attemptToTranslate("These DIYs WILL be given to you by your villagers:"),
            getCurrentVillagerNamesString(),
            getInverseVillagerFilters(true)===""? attemptToTranslate("You can get everything since you have all personality types!") : attemptToTranslate("Missing personalities:") + " " + getInverseVillagerFilters(true),        
          ]
        }
      />
    )
  }
}

class UnobtainableDIYsRouteClass extends React.PureComponent {
  render(){
    return(
      <RecipesRouteClass
        tabs={true}
        smallerHeader={true}
        filterSearchable={false}
        title={"Unobtainable DIYs"}
        subHeader={attemptToTranslate("You will NOT get these from your favorite villagers.") + "\n" + attemptToTranslate("Tap the [?] in the top right corner for more information.")}
        appBarColor = {colors.obtainableItemsAppBar[global.darkMode]}
        accentColor = {colors.obtainableItemsAccent[global.darkMode]}
        titleColor={colors.textBlack[global.darkMode]}
        extraInfo={
          [
            attemptToTranslate("Unobtainable DIYs"),
            attemptToTranslate("Specific villager personalities will give you different items."),
            attemptToTranslate("It is recommended that you have all personality types to be able to get all DIYs and Reactions."),
            attemptToTranslate("These DIYs will NOT be given to you by your villagers:"),
            getCurrentVillagerNamesString(),
            getInverseVillagerFilters(true)===""? attemptToTranslate("You can get everything since you have all personality types!") : attemptToTranslate("Missing personalities:") + " " + getInverseVillagerFilters(true),        
          ]
        }
      />
    )
  }
}

class ObtainableReactionsRouteClass extends React.PureComponent {
  render(){
    return(
      <EmoticonsPage
        tabs={true}
        smallerHeader={true}
        filterSearchable={false}
        title={"Obtainable Reactions"}
        subHeader={attemptToTranslate("You WILL get these from your favorite villagers.") + "\n" + attemptToTranslate("Tap the [?] in the top right corner for more information.")}
        appBarColor = {colors.obtainableItemsAppBar[global.darkMode]}
        accentColor = {colors.obtainableItemsAccent[global.darkMode]}
        titleColor={colors.textBlack[global.darkMode]}
        extraInfo={
          [
            attemptToTranslate("Obtainable Reactions"),
            attemptToTranslate("Specific villager personalities will give you different items."),
            attemptToTranslate("It is recommended that you have all personality types to be able to get all DIYs and Reactions."),
            attemptToTranslate("These Reactions WILL be given to you by your villagers:"),
            getCurrentVillagerNamesString(),
            getInverseVillagerFilters(true)===""? attemptToTranslate("You can get everything since you have all personality types!") : attemptToTranslate("Missing personalities:") + " " + getInverseVillagerFilters(true),        
          ]
        }
      />
    )
  }
}

class UnobtainableReactionsRouteClass extends React.PureComponent {
  render(){
    return(
      <EmoticonsPage
        tabs={true}
        smallerHeader={true}
        filterSearchable={false}
        title={"Unobtainable Reactions"}
        subHeader={attemptToTranslate("You will NOT get these from your favorite villagers.") + "\n" + attemptToTranslate("Tap the [?] in the top right corner for more information.")}
        appBarColor = {colors.obtainableItemsAppBar[global.darkMode]}
        accentColor = {colors.obtainableItemsAccent[global.darkMode]}
        titleColor={colors.textBlack[global.darkMode]}
        extraInfo={
          [
            attemptToTranslate("Unobtainable Reactions"),
            attemptToTranslate("Specific villager personalities will give you different items."),
            attemptToTranslate("It is recommended that you have all personality types to be able to get all DIYs and Reactions."),
            attemptToTranslate("These Reactions will NOT be given to you by your villagers:"),
            getCurrentVillagerNamesString(),
            getInverseVillagerFilters(true)===""? attemptToTranslate("You can get everything since you have all personality types!") : attemptToTranslate("Missing personalities:") + " " + getInverseVillagerFilters(true),        
          ]
        }
      />
    )
  }
}


class ObtainableItemsPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: 'ObtainableDIYs', title: attemptToTranslate('Obtainable DIYs') },
        { key: 'UnobtainableDIYs', title: attemptToTranslate('Unobtainable DIYs') },
        { key: 'ObtainableReactions', title: attemptToTranslate('Obtainable Reactions') },
        { key: 'UnobtainableReactions', title: attemptToTranslate('Unobtainable Reactions') },
      ],
    }
  }

  // renderScene = SceneMap({
  //   UnobtainableDIYs: UnobtainableDIYs,
  //   ObtainableDIYs: ObtainableDIYs,
  //   UnobtainableReactions: UnobtainableReactions,
  //   ObtainableReactions: ObtainableReactions
  // });

  renderScene = ({ route }) => {
    switch (route.key) {
      case 'UnobtainableDIYs':
        return <UnobtainableDIYsRouteClass/>;
      case 'ObtainableDIYs':
        return <ObtainableDIYsRouteClass/>;
      case 'UnobtainableReactions':
        return <UnobtainableReactionsRouteClass/>;
      case 'ObtainableReactions':
        return <ObtainableReactionsRouteClass/>;
      default:
        return <View/>;
    }
  };

  handleIndexChange = index => this.setState({index});

  componentDidMount(){
    if(getCurrentVillagerNamesString()==="You have no favorite villagers."){
      this.popup?.setPopupVisible(true);
    }
  }

  render(){
    return(
      <>
        <PopupInfoCustom header={<TextFont bold={true} style={{fontSize: 28, textAlign:"center", color: colors.textBlack[global.darkMode]}}>You do not have any villagers added!</TextFont>} ref={(popup) => this.popup = popup} buttonText={"Dismiss"}>
          <TouchableOpacity style={{paddingVertical:20,}} onPress={() => this.props.setPage(8)}>
            <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 16, textAlign:"center"}}>{"Tap here and go add some!"}</TextFont>
          </TouchableOpacity>
        </PopupInfoCustom> 
        <TabView
          lazy
          // tabBarPosition={getSettingsString("settingsTabBarPosition") === "true" ? "bottom" : "top"}
          gestureHandlerProps={{ failOffsetX: this.state.index === 0 ? 1 : 100}}
          navigationState={this.state}
          renderScene={this.renderScene}
          onIndexChange={(this.handleIndexChange)}
          initialLayout={{width: Dimensions.get('window').width}}
          renderTabBar={renderTabBar}
        />
      </>
    )
  }
}
export default ObtainableItemsPage;