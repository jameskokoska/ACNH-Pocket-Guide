import React, {Component} from 'react';
import {View, Dimensions, TouchableOpacity, BackHandler, Image, Vibration} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';
import { attemptToTranslate, capitalizeFirst, getSettingsString } from '../LoadJsonData';
import TextFont from '../components/TextFont';
import FadeInOut from '../components/FadeInOut.js';
import Animated from 'react-native-reanimated';
import FastImage from '../components/FastImage';
import { SubHeader } from '../components/Formattings';
import { Audio } from 'expo-av';
import Toast from "react-native-toast-notifications";
import { getPhoto } from '../components/GetPhoto';
import { PopupBottomCustom } from '../components/Popup';

export default class SongsPage extends Component {
  render(){
    var animationWidth = 350
    // console.log(-1/(animationWidth/Dimensions.get('window').width)*100+100)
    return(
      <>
        
        <ListPage 
          tabs={false}
          disablePopup={[true, true]}
          title="Music"
          imageProperty={["Album Image","Album Image"]}
          textProperty={["NameLanguage","NameLanguage"]}
          searchKey={[["NameLanguage",],["NameLanguage",]]}
          gridType="songGrid" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedMusic"}
          appBarColor={colors.musicAppBar[global.darkMode]}
          titleColor={colors.textWhite[0]}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.lightDarkAccent[global.darkMode]}
          boxColor={false}
          labelColor={colors.textBlack[global.darkMode]}
          accentColor={colors.musicAccent[global.darkMode]}
          customTapFunction={(item, liveMusic)=>{this.popupBottomMusicWrapper?.addSongToQueue(item,item["Filename"], liveMusic)}}
          showAllVariations={true}
        />

        <View pointerEvents="none" 
          style={{
            overflow:"hidden",
            zIndex:50,
            position:"absolute",
            bottom:-1/(animationWidth/Dimensions.get('window').width)*50+50 + 100 - 20,
            transform: [
              { rotate: '180deg'},
            ],
            opacity: colors.musicWavesTransparency[global.darkMode],
          }}
        >
          <LottieView 
            autoPlay={getSettingsString("settingsLowEndDevice")==="true"?false:true}
            loop
            style={{
              width: Dimensions.get('window').width,
              zIndex:5,
              transform: [
                { scaleX: 1/(animationWidth/Dimensions.get('window').width)},
              ],
            }} 
            source={require('../assets/waveAnimation.json')}
          />
        </View>
        <View pointerEvents="none" 
          style={{
            overflow:"hidden",
            zIndex:50,
            position:"absolute",
            top:-1/(animationWidth/Dimensions.get('window').width)*50+40 - 1,
            transform: [
              { rotate: '0deg'},
            ],
            opacity: colors.musicWavesTransparency[global.darkMode],
          }}
        >
          <LottieView 
            autoPlay={getSettingsString("settingsLowEndDevice")==="true"?false:true}
            loop
            style={{
              width: Dimensions.get('window').width,
              zIndex:5,
              transform: [
                { scaleX: 1/(animationWidth/Dimensions.get('window').width)},
                { scaleY: 1.1},
              ],
            }} 
            source={require('../assets/waveAnimation.json')}
          />
        </View>
        <PopupBottomMusicWrapper ref={(popupBottomMusicWrapper) => this.popupBottomMusicWrapper = popupBottomMusicWrapper}/>
      </>
    )
  }
}

export class PopupBottomMusicWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      nowPlaying: "",
      song: global.songQueue[0],
      songPlaying: global.songPlaying,
      songLooping: global.songLooping,
      songQueueLength: global.songQueue.length
    }
    if(global.songQueue[0]!==undefined){
      this.setGlobalVariableCheck()
    }
    Audio.setAudioModeAsync({
      // allowsRecordingIOS: false,
      staysActiveInBackground: true,
      // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
      // playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      playThroughEarpieceAndroid: false
   });
  }

  addSongToQueue = async (song, songID, liveMusic=false,) => {
    let link = ""
    if(song["special"]!==undefined && song["special"]==="hourly"){
      link = "https://raw.githubusercontent.com/jameskokoska/AnimalCrossingNH-App-React/main/animal_crossing_app/assets/data/Media/hourly/"
      songID = song["Filename"] + "_" + song["hour"] + "_" + capitalizeFirst(song["weather"]) 
      console.log(songID)
      liveMusic = "Hourly Music"
    }else if(liveMusic===true){
      link = "https://raw.githubusercontent.com/jameskokoska/AnimalCrossingNH-App-React/main/animal_crossing_app/assets/data/Media/live/"
    } else if(liveMusic==="Music Box"){
      link = "https://raw.githubusercontent.com/jameskokoska/AnimalCrossingNH-App-React/main/animal_crossing_app/assets/data/Media/musicbox/"
    } else {
      link = "https://raw.githubusercontent.com/jameskokoska/AnimalCrossingNH-App-React/main/animal_crossing_app/assets/data/Media/kk/"
    }
    if(this.state.song===undefined){
      this.setGlobalVariableCheck()
    }
    await addSongToQueue(link+songID+".mp3", song, liveMusic)
    this.setState({song:global.songQueue[0], nowPlaying: global.songQueue[0]["songID"]})
  }

  setGlobalVariableCheck = () => {
    this.globalVariableCheck = setInterval(() => {
      if(this.removeSong!==undefined && this.removeSong!==-1){
        removeSongFromQueue(this.removeSong+1)
        getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
        this.removeSong=-1
      }
      //listen for change of playing status
      if(global.songPlaying!==this.state.songPlaying){
        this.setState({songPlaying:global.songPlaying})
      }
      //listen for change of looping status
      if(global.songLooping!==this.state.songLooping){
        this.setState({songLooping:global.songLooping})
      }
      //listen for change of songQueue length (removed something from queue)
      if(global.songQueue.length!==this.state.songQueueLength){
        this.setState({songQueueLength: global.songQueue.length})
      }
      if(global.songQueue.length>=1 && this.state.song!==undefined && this.state.song["songKey"]!==undefined){
        if(global.songQueue[0]["songKey"]!==this.state.song["songKey"]){
          this.setState({song:global.songQueue[0], nowPlaying: global.songQueue[0]["songID"]})
        }
      } else if (global.songQueue.length<=0){
        this.setState({song:global.songQueue[0], nowPlaying: ""})
        clearInterval(this.globalVariableCheck)
        this.popup?.setPopupVisible(false)
      }
    }, 500);
  }

  componentWillUnmount() {
    if(this.globalVariableCheck){
      clearInterval(this.globalVariableCheck)
    }
  }

  render(){
    return <PopupBottomMusic ref={(popup) => this.popup = popup} smallChild={<NowPlayingSmall song={this.state.song}/>}>
      <NowPlayingLarge removeSong={(index)=>{
        if(this.removeSong===undefined || this.removeSong===-1)
          this.removeSong = index
      }} song={this.state.song} songPlaying={this.state.songPlaying} songLooping={this.state.songLooping}/>
    </PopupBottomMusic>
  }
}

export class MusicButtonComponent extends Component {
  render(){
    return(
      <TouchableOpacity
        style={{marginVertical:5, marginTop: 0, marginHorizontal: 3, paddingHorizontal:11, paddingVertical:8, borderRadius: 10, backgroundColor: this.props.color,  justifyContent: 'center', alignItems: 'center'}}
        activeOpacity={0.5}
        onPress={()=> {this.props.onPress(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}
      >
        <TextFont style={{fontSize: 15, color: "white", textAlign:"center", marginTop:-2}}>{this.props.text}</TextFont>
      </TouchableOpacity>
    )
  }
}

class PopupBottomMusic extends Component {

  setPopupVisible = (visible) => {
    console.log("OK")
    this.popup?.setPopupVisible(visible)
  }
  
  render(){
    return <>
      <TouchableOpacity activeOpacity={0.85} onPress={()=>{this.setPopupVisible(true)}} style={{backgroundColor:colors.white[global.darkMode], bottom: 0, position:"absolute", zIndex: 60, borderTopLeftRadius: 20, borderTopRightRadius: 20,}}>
        {this.props.smallChild}
      </TouchableOpacity>
      <PopupBottomCustom ref={(popup) => this.popup = popup} fullscreen>
        {this.props.children}
      </PopupBottomCustom>
    </>
    const springConfig = {
        damping: 20,
        mass: 1,
        stiffness: global.reducedMotion ? 100000000 : 135,
        overshootClamping: true,
        restSpeedThreshold: 0.01,
        restDisplacementThreshold: 0.001,
    };
    return (
      <>
        {this.bottomSheetCallback?<Animated.View style={{zIndex:50, backgroundColor: "black", opacity: Animated.multiply(-0.8,Animated.add(-0.7,Animated.multiply(this.bottomSheetCallback,1))), width: Dimensions.get('window').width, height: Dimensions.get('window').height, position:"absolute"}} pointerEvents="none"/>:<View/>}
        {/* <BottomSheet
          enabledBottomClamp
          callbackNode={this.bottomSheetCallback}
          ref={(sheetRef) => this.sheetRef = sheetRef}
          snapPoints={[Dimensions.get('window').height, 100]}
          initialSnap={1}
          renderContent={this.renderContent}
          springConfig={springConfig}
          enabledContentTapInteraction={false}
          onCloseStart={()=>{if(this.mounted){this.setState({openStart:false})}}}
          onCloseEnd={()=>{if(this.mounted){this.visible=false; this.setState({openStart:false}); this.state.heightOffset = 0} this.props.onClose===undefined ? 0 : this.props.onClose();}}
          onOpenStart={()=>{if(this.mounted){this.setState({openStart:true})}}}
          onOpenEnd={()=>{if(this.mounted){this.setState({openStart:true}); this.visible=true}}}
        /> */}
      </>
    )
  }
}

class NowPlayingSmall extends Component {
  render(){
    if(this.props.song===undefined){
      return <View style={{height:100, paddingHorizontal:30, flexDirection:"row", alignItems:"center", width:Dimensions.get('window').width}}>
        <SubHeader bold={false} margin={false} style={{fontSize:16}}>{"No song playing"}</SubHeader>
      </View>
    }
    return <View style={{height:100, paddingHorizontal:30, flexDirection:"row", alignItems:"center", width:Dimensions.get('window').width}}>
      {this.props.song.special==="hourly"?
        <Image style={{marginTop:0, padding:0, height:65, width:65, resizeMode:"contain", transform:[{scale:0.9}]}} source={getPhoto(this.props.song.weather)}/>
        :<FastImage
          style={{width: 65, height:65, resizeMode: "contain", borderRadius: 5}}
          source={{uri: this.props.song["Album Image"]}}
          cacheKey={this.props.song["Album Image"]}
        />
      }
      <View style={{flexDirection:"column", justifyContent:"center", marginLeft:20, }}>
        <SubHeader bold={false} margin={false} style={{fontSize:13}}>{"Now Playing..."}</SubHeader>
        <SubHeader margin={false} style={{fontSize:20}}>{this.props.song["NameLanguage"]}</SubHeader>
        <SubHeader margin={false} style={{fontSize:17,}}>{this.props.song.special==="hourly" ? "Hourly Music" : (this.props.song["liveMusic"] === "Music Box" ? "Music Box" : this.props.song["liveMusic"] ? "Live" : "Aircheck")}</SubHeader>
      </View>
    </View>
  }
}

class NowPlayingLarge extends Component {
  render(){
    if(this.props.song===undefined){
      return <View style={{height:75, paddingHorizontal:30, flexDirection:"row", alignItems:"center", width:Dimensions.get('window').width}}>
        <SubHeader bold={false} margin={false} style={{fontSize:16}}>{"No song playing"}</SubHeader>
      </View>
    }
    let smallestSize = Dimensions.get('window').width
    if(Dimensions.get('window').width > Dimensions.get('window').height){
      smallestSize = Dimensions.get('window').height
    }
    let largestSize = 300;
    if(smallestSize > largestSize){
      smallestSize = largestSize
    }
    return <>
      <View style={{marginTop:25, marginBottom: 25, marginHorizontal:20, flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <View style = {{height:Dimensions.get('window').height*0.05}}/>
        {this.props.song.special==="hourly"?
          <Image style={{marginTop:0, padding:0, width: smallestSize-smallestSize*0.2, height:smallestSize-smallestSize*0.2, resizeMode:"contain", transform:[{scale:0.8}]}} source={getPhoto(this.props.song.weather)}/>
          :<FastImage
            style={{width: smallestSize-smallestSize*0.2, height:smallestSize-smallestSize*0.2, resizeMode: "contain", borderRadius: 5}}
            source={{uri: this.props.song["Album Image"]}}
            cacheKey={this.props.song["Album Image"]}
          />
        }
        <View style={{marginHorizontal: 10}}>
          <SubHeader translate={false} margin={false} style={{fontSize:24, textAlign:"center", marginTop: 15}}>{this.props.song["NameLanguage"]}</SubHeader>
          <SubHeader margin={false} style={{fontSize:20, textAlign:"center", marginTop: 5}}>{this.props.song.special==="hourly" ? "Hourly Music" : (this.props.song["liveMusic"] === "Music Box" ? "Music Box" : this.props.song["liveMusic"] ? "Live" : "Aircheck")}</SubHeader>
        </View>
        <View style={{flexDirection:"row", justifyContent:'center', marginTop: 10}}>
          <TouchableOpacity onPress={()=>{loopSong(!global.songLooping); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
            <Image style={{opacity: this.props.songLooping ? 1 : 0.3, marginTop:0, padding:0, height:70, width:70, resizeMode:"contain", transform:[{scale:0.7}]}} source={require("../assets/icons/repeat-button.png")}/>
          </TouchableOpacity>
          {this.props.songPlaying?
            <TouchableOpacity onPress={()=>{pauseSong(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
              <Image style={{marginTop:0, padding:0, height:70, width:70, resizeMode:"contain", transform:[{scale:0.7}]}} source={require("../assets/icons/pause-button.png")}/>
            </TouchableOpacity>:
            <TouchableOpacity onPress={()=>{resumeSong(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
              <Image style={{marginTop:0, padding:0, height:70, width:70, resizeMode:"contain", transform:[{scale:0.7}]}} source={require("../assets/icons/play-button.png")}/>
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={()=>{skipSong(); getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";}}>
            <Image style={{marginTop:0, padding:0, height:70, width:70, resizeMode:"contain", transform:[{scale:0.7}]}} source={require("../assets/icons/next-button.png")}/>
          </TouchableOpacity>
        </View>
        <View style = {{height:Dimensions.get('window').height*0.02}}/>
      </View>
      <View style={{justifyContent:"space-between", flexDirection:"row", alignItems:"flex-end", marginTop: 5, marginHorizontal: 20}}>
        <SubHeader bold={false} margin={false} style={{fontSize:20, marginVertical:10}}>{"Up Next"}</SubHeader>
        <TouchableOpacity
          onPress={async()=>{
            clearQueue();
            getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
        }}>
          <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 14, marginRight:-5, marginVertical:10}}>Clear Queue</TextFont>
        </TouchableOpacity>
      </View>
      {global.songQueue.slice(1).map((item,index)=>{
        return(<SongContainerRow removeSong={(index)=>this.props.removeSong(index)} index={index} song={item} key={item["Name"]+index} text={item["NameLanguage"]} text2={item.special==="hourly" ? "Hourly Music" : (item["liveMusic"] === "Music Box" ? "Music Box" : item["liveMusic"] ? "Live" : "Aircheck")} image={item["Album Image"]}/>)
      })}
      <View style={{borderTopColor: colors.lightDarkAccentHeavy2[global.darkMode],borderTopWidth: 2,}}/>
    </>
  }
}

class SongContainerRow extends Component {
  render(){
    return <View style={{paddingHorizontal:30, paddingVertical:10,flexDirection:"row", alignItems:"center",borderTopColor: colors.lightDarkAccentHeavy2[global.darkMode],borderTopWidth: 2,}}>
      <View style={{flexDirection:"row",right:3, top:3,position:'absolute',zIndex:10, }}>
        <TouchableOpacity style={{padding:11}} 
          onPress={()=>{
            this.props.removeSong(this.props.index)
        }}>
          <Image source={require("../assets/icons/deleteIcon.png")} style={{opacity:0.5,width:17, height:17, borderRadius:100,}}/>
        </TouchableOpacity>
      </View>
      {this.props.song.special==="hourly"?
        <Image style={{marginTop:0, padding:0, width: 55, height:55, resizeMode:"contain", transform:[{scale:0.7}]}} source={getPhoto(this.props.song.weather)}/>
        :<FastImage
          style={{width: 55, height:55, resizeMode: "contain", borderRadius: 5}}
          source={{uri: this.props.image}}
          cacheKey={this.props.image}
        />
      }
      <View style={{flexDirection:"column",marginLeft:15}}>
        <SubHeader translate={false} margin={false} style={{fontSize:20}}>{this.props.text}</SubHeader>
        <SubHeader margin={false} style={{fontSize:17, flexWrap:"wrap"}}>{this.props.text2}</SubHeader>
      </View>
    </View>
  }
}


onPlaybackStatusUpdate = playbackStatus => {
  if (!playbackStatus.isLoaded) {
    if (playbackStatus.error) {
      console.log(`Encountered a fatal error during playback: ${playbackStatus.error}`);
    }
  } else {
    if (playbackStatus.isPlaying) {
    } else {
      playSong[global.songQueue[0]]

    }
    if (playbackStatus.isBuffering) {
      // Update your UI for the buffering state
    }
    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      console.log("next song!")
      skipSong()
    }
  }
}


global.playback;
global.songQueue = []
global.songKey = 0
global.songPlaying = false
global.songLooping = false

async function playSong(url){
  try{
    console.log("Playing song: " + url)
    if(global.playback===undefined){
      console.log("Initiating sound object")
      global.playback = new Audio.Sound()
    }
    if(global.playback){
      await global.playback.unloadAsync()
    }
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: url}, //"https://www.kozco.com/tech/piano2-CoolEdit.mp3"
      { shouldPlay: true }
    );
    global.playback = sound
    await global.playback.playAsync()
    global.songPlaying = true
    global.playback.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
  } catch (e) {
    toast.show(attemptToTranslate("An error occurred. Please check your internet connection and try again later.") + "\n" + e.message, {type:"danger",
      placement:'top',
      renderType:{
        success: (toast) => (
          <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, borderRadius: 5, backgroundColor: colors.popupDanger[global.darkMode], alignItems:"center", justifyContent:"center"}}>
            <TextFont translate={false} style={{color:"white", fontSize: 15, textAlign:"center"}}>{toast.message}</TextFont>
          </View>
        ),
      }
    })
  }
}

async function removeSongFromQueue(index){
  if(global.songQueue.length > index){
    const songQueue = [...global.songQueue]
    songQueue.splice(index, 1)
    global.songQueue = songQueue
  }
}

async function pauseSong(){
  global.songPlaying = false
  await global.playback.pauseAsync()
}

async function resumeSong(){
  global.songPlaying = true
  await global.playback.playAsync()
}

async function loopSong(status){
  global.songLooping = status
  await global.playback.setIsLoopingAsync(status)
}

async function stopSong(){
  global.songPlaying = false
  await global.playback.stopAsync()
}

async function skipSong(){
  if(global.songQueue.length > 1){
    global.songQueue = global.songQueue.slice(1)
    playSong(global.songQueue[0]["url"])
  } else {
    console.log("Done playing Queue")
    global.songQueue = []
    stopSong()
  }
}

async function clearQueue(){
  if(global.songQueue.length > 1){
    global.songQueue = []
    skipSong()
  } else {
    skipSong()
  }
}

async function addSongToQueue(url, song, liveMusic){
  let songOut = Object.assign({}, song); //force create new object
  songOut["NameLanguage"] = songOut["NameLanguage"].replace("zzzzz ", "")
  songOut["NameLanguage"] = songOut["NameLanguage"].replace("Hourly Music ", "")
  songOut["liveMusic"] = liveMusic
  songOut["url"] = url
  global.songKey = global.songKey + 1
  songOut["songKey"] = global.songKey
  global.songQueue.push(songOut)

  if(global.songQueue.length<=1){
    playSong(url)
  } else {
    toast.show(songOut["NameLanguage"] + " " + attemptToTranslate("added to queue"), {type:"success",
      duration: 700,  
      placement:'top',
      renderType:{
        success: (toast) => (
          <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, borderRadius: 5, backgroundColor: colors.popupNeutral[global.darkMode], alignItems:"center", justifyContent:"center"}}>
            <TextFont translate={false} style={{color:colors.textBlack[global.darkMode], fontSize: 15, textAlign:"center"}}>{toast.message}</TextFont>
          </View>
        ),
      }
    })
  }
}

export function getHourlySongTitle(song){
  let hour = parseInt(song["hour"])
  let hourString = ""
  if(getSettingsString("settingsUse24HourClock")==="false"){
    if(hour===0){
      hourString = "12 AM"
    } else if (hour > 12){
      hourString = (hour-12).toString() + " PM"
    } else {
      hourString = hour.toString() + " AM"
    }
  } else {
    hourString = hour.toString() + ":00"
  }
  return hourString + " " + capitalizeFirst(attemptToTranslate(song["weather"]))
}