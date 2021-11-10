import React, {Component} from 'react';
import {Vibration, TouchableOpacity, Image, ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';
import TextFont from '../components/TextFont'
import {HeaderNote, MailLink, ExternalLink, SubHeader, Header, Paragraph} from "../components/Formattings"
import {AccordionContainerCustom} from "../components/AccordionContainer"
import {InfoLineBeside, InfoLine} from "../components/BottomSheetComponents"
import {PopupBottomCustom} from "../components/Popup"
import {attemptToTranslateMysteryIslands, getStorage, getSettingsString} from "../LoadJsonData"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Check from '../components/Check';

class MysteryIslandsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedIsland:"",
      data: [],
    }
  }
  loadList = async() => {
    var storageData = JSON.parse(await getStorage("IslandsVisited",JSON.stringify([])));
    if(storageData.constructor!==Array){
      storageData=[];
    }
    this.setState({data:storageData})
  }
  checkOffItem = (id) => {
    var oldList = this.state.data;
    if(oldList.includes(id)){
      oldList = oldList.filter(item => item !== id)
      this.saveList(oldList);
      this.setState({data: oldList})
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    } else {
      oldList.push(id);
      this.saveList(oldList);
      this.setState({data: oldList})
      getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate([0,10,220,20]) : "";
    }

  }

  saveList = async(data) => {
    await AsyncStorage.setItem("IslandsVisited", JSON.stringify(data));
  }

  openPopup = (island) =>{
    this.setState({selectedIsland:island})
    this.popup?.setPopupVisible(true);
  }

  componentDidMount(){
    this.loadList();
  }
  render(){
    return(
      <>
        <ScrollView style={{backgroundColor:colors.background[global.darkMode]}}>
          <View style={{height: 100}}/>
          <Header>Mystery Islands</Header>
          {/* <HeaderNote>{"Note: long press to check off the island as visited"}</HeaderNote>
          <HeaderNote>{"Tap each for more details"}</HeaderNote> */}
          <View style={{height: 10}}/>
          <View style={{marginHorizontal: 20, flex: 1, flexDirection: 'row', justifyContent:'space-evenly',flexWrap:"wrap"}}>
          {
            mysteryIslandsData.map((island, index) => (
              <MysteryIslandsComponent data={this.state.data} checkOffItem={this.checkOffItem} key={island.name} island={island} openPopup={this.openPopup}/>
            ))
          }
          </View>
          <View style={{height: 70}}/>
        </ScrollView>
        <PopupBottomCustom ref={(popup) => this.popup = popup}>
          <Image style={{resizeMode:'contain', width:"100%", borderRadius:2}} source={this.state.selectedIsland.picture}/>
          <View style={{height:5}}/>
          <TextFont translate={false} bold={true} style={{textAlign:"center",marginTop:10, fontSize: 25, color: colors.textBlack[global.darkMode]}}>{attemptToTranslateMysteryIslands(this.state.selectedIsland.name)}</TextFont>
          <View style={{height:5}}/>
          <InfoLineBeside
            image1={require("../assets/icons/dice.png")} 
            item1={this.state.selectedIsland}
            textProperty1={["chance"]}
            image2={require("../assets/icons/clockIcon.png")} 
            item2={this.state.selectedIsland}
            textProperty2={["maxDailyVisit"]}
          />
          <InfoLine
            image={require("../assets/icons/lock.png")} 
            item={this.state.selectedIsland}
            textProperty={["requires"]}
          />
          <Paragraph styled={true} translate={false} margin={false}>{attemptToTranslateMysteryIslands(this.state.selectedIsland.description)}</Paragraph>
        </PopupBottomCustom>
      </>
    )
  }
}
export default MysteryIslandsPage;

class MysteryIslandsComponent extends Component {
  render(){
    var checked = false;
    if(this.props.data.includes(this.props.island.id)){
      checked=true;
    }
    // var showBlankCheckMarks = getSettingsString("settingsShowBlankCheckMarks")==="true";
    var showBlankCheckMarks = true;
    return(
      <>
        <TouchableOpacity activeOpacity={0.7} onLongPress={()=>this.props.checkOffItem(this.props.island.id)} onPress={()=>this.props.openPopup(this.props.island)}>
        <View pointerEvents={showBlankCheckMarks?"auto":"none"} style={{position:'absolute', right: -15, top: -10, zIndex:10}}>
          <TouchableOpacity onPress={()=>{if(showBlankCheckMarks){this.props.checkOffItem(this.props.island.id)}}}>
            <Check play={checked} width={53} height={53} disablePopup={true}/>
          </TouchableOpacity>
        </View>
        <View style={{width:Dimensions.get('window').width*0.42, borderRadius:9, backgroundColor:colors.white[global.darkMode], padding:10, marginVertical: 6, justifyContent:"center", alignItems:"center",}}>
          <Image style={{resizeMode:'contain', width:"100%", height: 140, borderRadius:2}} source={this.props.island.picture}/>
          <TextFont translate={false} bold={true} style={{textAlign:"center",marginHorizontal:5, fontSize: 17, color: colors.textBlack[global.darkMode]}}>{attemptToTranslateMysteryIslands(this.props.island.name)}</TextFont>
        </View>
        </TouchableOpacity>
      </>
    )
  }
}

const mysteryIslandsData = [
  {
    "id" : "0",
    "picture" : require("../assets/icons/islands/0.png"),
    "name" : "Island #0",
    "chance" : "9%",
    "description" : "A fairly normal island which you can get on your first tour, with one cliff, native fruit, coconuts, a river and a pond.",
  },
  {
    "id" : "1",
    "picture" : require("../assets/icons/islands/1.png"),
    "chance" : "9%",
    "name" : "Island #1",
    "description" : "Practically the same as Island #0, but without the pond, and with a slightly bigger cliff.",
  },
  {
    "id" : "2",
    "picture" : require("../assets/icons/islands/2.png"),
    "chance" : "9%",
    "name" : "Spiral Island",
    "description" : "Somewhat more interesting in layout but it has nothing special about the resources you can get.",
  },
  {
    "id" : "4",
    "picture" : require("../assets/icons/islands/4.png"),
    "chance" : "9%",
    "name" : "Fidget Spinner Island",
    "description" : "The last of the four starter islands. No river, just a pond and the sea.",
  },
  {
    "id" : "6",
    "picture" : require("../assets/icons/islands/6.png"),
    "chance" : "9%",
    "name" : "Mountain Island",
    "description" : "Multiple levels, no river. The base level has regular trees, the middle level has your native fruit, and the top level has five rocks with materials.",
    "requires" : "Ladder",
  },
  {
    "id" : "7",
    "picture" : require("../assets/icons/islands/7.png"),
    "chance" : "5%",
    "name" : "Bells Island",
    "description" : "Breaking the rock at the far north will let you vault over into the island with five money rocks on it.",
    "requires" : "Town Hall, Vaulting Pole",
  },
  {
    "id" : "8",
    "picture" : require("../assets/icons/islands/8.png"),
    "chance" : "5%",
    "name" : "Bamboo Island",
    "description" : "Every tree on this island is bamboo and you can get to it at any time of year. The most common island you can get out of the 20, statistically.",
  },
  {
    "id" : "10",
    "picture" : require("../assets/icons/islands/10.png"),
    "chance" : "9%",
    "name" : "Fruit Island",
    "description" : "There are 19 fruit trees on this island and all will be your 'sister fruit'. This will be different from your native fruit - but every time you come here, it will be the same one.",
  },
  // {
  //   "id" : "11",
  //   "picture" : require("../assets/icons/islands/11.png"),
  //   "chance" : "2%",
  //   "name" : "Flower Island",
  //   "description" : "This island has a pond surrounded by rare flowers and the only insects that will spawn are those that hang around flowers.",
  // },
  {
    "id" : "12",
    "picture" : require("../assets/icons/islands/12.png"),
    "chance" : "2%",
    "name" : "Money Rock Island 2",
    "description" : "There are four small triangular cliffs, one in each corner, and the ground level is full of flowers and 7 money rocks.",
    "requires" : "Town Hall",
    "maxDailyVisit" : "1 visit/day",
  },
  {
    "id" : "13",
    "picture" : require("../assets/icons/islands/13.png"),
    "chance" : "2%",
    "name" : "Tarantula Island",
    "description" : "Yes, the infamous one. The only insects that spawn here are tarantulas (as long as it is night time in a Tarantula month), and the 7 rocks have crafting materials if you can get to them. The river is thin enough that you can jump over it without a vaulting pole.",
    "maxDailyVisit" : "1 visit/day",
  },
  {
    "id" : "14",
    "picture" : require("../assets/icons/islands/14.png"),
    "chance" : "2%",
    "name" : "Tree Island",
    "description" : "This island has no river or pond and has tons of hardwood and coconut trees, and the only insects that spawn are those that are associated with trees.",
    "requires" : "Town Hall, Ladder",
    "maxDailyVisit" : "1 visit/day",
  },
  // {
  //   "id" : "16",
  //   "picture" : require("../assets/icons/islands/16.png"),
  //   "chance" : "3%",
  //   "name" : "Big Fish Island",
  //   "description" : "This island has rare hybrid flowers and the only fish available are larger ones, including some of the more rare ones.",
  //   "requires" : "Town Hall, Ladder",
  // },
  {
    "id" : "17",
    "picture" : require("../assets/icons/islands/17.png"),
    "chance" : "1%",
    "name" : "Tree Island 2",
    "description" : "This island is exactly the same as Bamboo Island but the trees are all just regular hardwood trees.",
    "maxDailyVisit" : "1 visit/day",
  },
  {
    "id" : "18",
    "picture" : require("../assets/icons/islands/18.png"),
    "chance" : "5%",
    "name" : "Curly River Island",
    "description" : "There is one square cliff at the north east, a few flowers and rocks and a small amount of fruit trees. Only insects associated with water spawn here.",
  },
  {
    "id" : "19",
    "picture" : require("../assets/icons/islands/19.png"),
    "chance" : "2%",
    "name" : "Big Fish Island 2",
    "description" : "This rare island only spawns big fish. Otherwise it is quite normal, with less flowers and a lower chance of appearing than the other big fish island.",
    "requires" : "Vaulting Pole",
    "maxDailyVisit" : "1 visit/day",
  },
  {
    "id" : "20",
    "picture" : require("../assets/icons/islands/20.png"),
    "chance" : "5%",
    "name" : "Trash Island",
    "description" : "Everything you can fish here is trash. Only water-related insects spawn.",
    "requires" : "Ladder",
  },
  {
    "id" : "21",
    "picture" : require("../assets/icons/islands/21.png"),
    "chance" : "1%",
    "name" : "Fins Island",
    "description" : "A rectangular pond with rectangular cliffs inside, the tallest one being too tall to climb up to. The only fish that spawn here are the largest finned fish.",
    "requires" : "Town Hall, Vaulting Pole, Ladder",
    "maxDailyVisit" : "1 visit/day",
  },
  {
    "id" : "23",
    "picture" : require("../assets/icons/islands/23.png"),
    "chance" : "5%",
    "name" : "Falls Island",
    "description" : "Lots of cliffs, waterfalls and river forks. Normal resource spawns.",
    "requires" : "Ladder",
  },
  {
    "id" : "24",
    "picture" : require("../assets/icons/islands/24.png"),
    "chance" : "1%",
    "name" : "Gold Island",
    "description" : "A very rare island with flowers, scorpions and a rectangular pond. If you climb up onto the cliff and climb down from the back, you can vault over to a tiny island in the middle and get 8 gold nuggets from a single rock.",
    "requires" : "Town Hall, Vaulting Pole, Ladder",
    "maxDailyVisit" : "1 visit/day",
  },

]