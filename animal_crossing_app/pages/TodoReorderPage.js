import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Vibration, TouchableNativeFeedback } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Header, HeaderNote } from "../components/Formattings";
import Popup from "../components/Popup";
import PopupAddTask, { PopupAddTaskBreak } from "../components/PopupAddTask";
import { TodoItemEdit } from "../components/TodoList";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSettingsString } from "../LoadJsonData";
import * as RootNavigation from '../RootNavigation.js';
import colors from '../Colors'

function createInitialData(todos){
  return todos.map((todo, index) => {
    return {
      key: `item-${index}-${todo.title.toString()}`,
      ...todo
    };
  });
}

export default function TodoReorderPage(props) {
  let deleteIndex = 0

  const deleteItem = (index) => {
    deleteIndex = index
    popupDeleteToDo?.current.setPopupVisible(true, "", data[index]?.title)
  }

  const deleteItemGo = () => {
    const newTaskList = data.filter((index,i) => i!=deleteIndex);
    setData(createInitialData(newTaskList))
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    saveList(newTaskList);
  }

  const saveList = async(data) => {
    await AsyncStorage.setItem("ToDoList"+global.profile, JSON.stringify(data));
  }

  const addItem = async (item, edit=false) => {
    let tasks = [...data];
    if(edit===false){
      if(props.todos.addToTop){
        tasks = [item, ...tasks]
      } else {
        tasks.push(item);
      }
    }
    if(edit!==false){
      tasks[edit] = item;
    }
    await saveList(tasks)
    setData([...createInitialData(tasks)])
  }

  const addItemPopup = (open) => {
    getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
    popupAddTask?.current.setPopupVisible(true);
  }


  const [data, setData] = useState(createInitialData(props.todos.todos));

  const popupDeleteToDo = useRef()
  const popupAddTaskBreak = useRef()
  const popupAddTask= useRef()

  const renderItem = ({ item, getIndex, drag, isActive }) => {
    let index = getIndex()
    return (
      <TouchableOpacity
        onLongPress={()=>{
          Vibration.vibrate(5)
          drag()
        }}
        disabled={isActive}
        style={[
          { opacity: isActive ? 0.5 : 1, 
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        activeOpacity={0.7}
        delayLongPress={150}
        key={item.key!==undefined ? item.key : index}
      >
        <TodoItemEdit
          item={item}
          index={index}
          showEdit={true}
          deleteItem={deleteItem}
          editTask={()=>{item.picture==="breakerSeparator" ?  popupAddTaskBreak?.current.setPopupVisible(true, item, index) : popupAddTask?.current.setPopupVisible(true, item, index);}}
          compactUI={props.todos.compactUI}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <PopupAddTask ref={popupAddTask} addItem={addItem}/>
      <PopupAddTaskBreak ref={popupAddTaskBreak} addItem={addItem}/>
      <Popup ref={popupDeleteToDo} text="Delete?" button1={"Cancel"} button1Action={()=>{}} button2={"Delete"} button2Action={()=>{deleteItemGo()}}/>
      <TouchableNativeFeedback 
          background={TouchableNativeFeedback.Ripple(colors.dateButton[global.darkMode], true, 44/2)}
          onPress={() => {addItemPopup(true);}}
        >
        <View style={{zIndex:100, backgroundColor:colors.FAB2[global.darkMode], position:"absolute", bottom:getSettingsString("settingsShowFAB")==="true" ? 90 : 20, right: 20, width:44, height:44, borderRadius:500, justifyContent:'center', alignItems:'center'}}>
          <Image source={require("../assets/icons/addWhite.png")} style={{opacity:0.6,width:20, height:20, resizeMode:'contain'}}/>
        </View>
      </TouchableNativeFeedback>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => {setData(data); saveList(data);}}
        keyExtractor={(item, index) => item.key+index.toString()}
        renderItem={renderItem}
        // ListHeaderComponent={headerComponent}
        // ListFooterComponent={footerComponent}
        ListHeaderComponent={()=><View style={{marginBottom: 15}}>
          <Header style={{marginTop: 120}}>Edit To-Do List</Header>
          <HeaderNote>Drag and drop to reorder items.</HeaderNote>
          <TouchableOpacity style={{padding:10, paddingRight:0, position:"absolute", right:15, top: 5}} 
            onPress={()=>{
              addItemPopup(true); 
          }}>
            <Image source={require("../assets/icons/addIcon.png")} style={{width:30, height:30, borderRadius:100,}}/>
          </TouchableOpacity>
          <TouchableOpacity style={{padding:10, paddingRight:0, position:"absolute", right:55, top: 5}} 
            onPress={()=>{
              popupAddTaskBreak?.current.setPopupVisible(true)
              getSettingsString("settingsEnableVibrations")==="true" ? Vibration.vibrate(10) : "";
          }}>
            <Image source={require("../assets/icons/separatorIcon.png")} style={{width:30, height:30, borderRadius:100,}}/>
          </TouchableOpacity>
          
          <TouchableOpacity style={{padding:10, paddingRight:0, position:"absolute", left:5, top: 5}} 
            onPress={()=>{
              RootNavigation.popRoute(1)
          }}>
            <Image
              style={{width:30,height:30,resizeMode:'contain', opacity:0.5}}
              source={global.darkMode ? require("../assets/icons/leftArrowWhite.png") : require("../assets/icons/leftArrow.png")}
            />
          </TouchableOpacity>
        </View>
        }
        ListFooterComponent={()=><View style={{height:125}}/>}
      />
    </>
  );
}
