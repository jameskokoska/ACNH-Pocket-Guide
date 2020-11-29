import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Text, Vibration} from 'react-native';
import TextFont from './TextFont'

const Header = (props) => {
  const [search, setSearch] = useState('Search')
  return (
    <>
      <View style={[styles.topSpace, {height: props.headerHeight / 1.5,}]}>
      </View>
      <View style={{height: props.headerHeight / 2}}>
        <View style={styles.subHeader}>
          <TextFont style={styles.title} bold={true}>{props.title}</TextFont>
          <View style={styles.searchBox}>
            <TextInput style={styles.searchText} value={search} onChangeText={function(text){setSearch(text); props.updateSearch(text);}} onFocus={() => {setSearch(""); Vibration.vibrate(15);}} onBlur={function(){if(search===""){setSearch("Search"); props.updateSearch("Search");}else{setSearch(search);}}}/>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topSpace: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#1c1c1c',
    flexDirection: 'column',
  },
  subHeader: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#1c1c1c',
    flexDirection: 'column',
    position: 'absolute',
    bottom:0,
  },
  title: {
    color: 'white', 
    fontSize: 41, 
    marginBottom: 5,
  },
  searchText: {
    color: '#8B8B8B',
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
    width:'100%',
    paddingRight: 25,
  },
  searchBox: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#0F0F0F',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 18
  },
});
export default Header;
