import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Search from '../assets/svg/Search';

const Header = (props) => {
  return (
    <>
      <View style={[styles.topSpace, {height: props.headerHeight / 1.5,}]}>
      </View>
      <View style={{height: props.headerHeight / 2}}>
        <View style={styles.subHeader}>
          <Text style={styles.title}>{props.title}</Text>
          <View style={styles.searchBox}>
            <Search />
            <Text style={styles.searchText}>Search</Text>
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  searchText: {
    color: '#8B8B8B',
    fontSize: 17,
    lineHeight: 22,
    marginLeft: 8,
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
