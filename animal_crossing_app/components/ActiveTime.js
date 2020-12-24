import React, { Component } from "react";
import {AppRegistry, StyleSheet, ScrollView , StatusBar, Text, View} from "react-native";
import colors from '../Colors.js';
// import PieChart from 'react-native-pie-chart';

class ActiveTime extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    
  }

  // render() {
  //   console.log(this.props);
  //   var displayText;
  //   if(this.props.displayText==="hello"){
  //     displayText = "yes";
  //   } else {
  //     displayText = "no";
  //   }
  //   return <Text style={[styles.text,{backgroundColor: colors.textWhite[colors.mode]}]}>{this.props.displayText2}</Text>
  // }

  render() {
    const chart_wh = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
 
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <StatusBar
            hidden={true}
          />
          <Text style={styles.title}>Basic</Text>
          <PieChart
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
          />
          <Text style={styles.title}>Doughnut</Text>
          <PieChart
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    fontSize:26,
    borderRadius: 100,
    marginLeft: 13,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 4,
    paddingBottom: 4,
    elevation: 5,
    marginTop: 100
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    margin: 10
  }
})

export default ActiveTime;