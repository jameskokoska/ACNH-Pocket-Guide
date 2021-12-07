import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import { DraggableGrid } from 'react-native-draggable-grid';
import { ScrollView } from 'react-native-gesture-handler';
import { Header } from './Formattings';
import { TodoItemSmallDraggable } from './TodoList';

export default class DraggableList extends React.Component{

  constructor(props) {
    super(props);
    let data = this.props.list
    for(let i = 0; i < data.length; i++){
      data[i]["key"]=data[i]["title"]+i.toString()
    }
    this.state = {
      data:data
    };
  }

  renderItem(item, index) {
    return (
      <View
        style={styles.item}
        key={item.title}
      >
        <TodoItemSmallDraggable
          key={item.key}
          item={item}
          index={index}
          checkOffItem={this.checkOffItem}
          deleteItem={this.deleteItem}
          reorderItem={this.reorderItem}
          showEdit={true}
          editTask={()=>{this.popupAddTask?.setPopupVisible(true, item, index);}}
        />
      </View>
    );
  }

  render() {
    return (<>
      <Header>To-Do List</Header>
        <View style={styles.wrapper}>
          <DraggableGrid
            numColumns={4}
            renderItem={this.renderItem}
            data={this.state.data}
            onDragRelease={(data) => {
              this.setState({data});
            }}
            delayLongPress={0}
          />
        </View>
    </>);
  }
}

const styles = StyleSheet.create({
  wrapper:{
    paddingTop:100,
    paddingHorizontal:30,
    width:'100%',
    height:'100%',
    justifyContent:'center',
  },
  item:{
    borderRadius:8,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
  },
});