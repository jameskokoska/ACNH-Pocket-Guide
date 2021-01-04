import { NativeModules } from 'react-native';
import React, { Component } from 'react';
import {
  View, StyleSheet, ScrollView, Dimensions
} from 'react-native';


export default class Masonry extends Component {

    constructor(props){
        super(props);
        this.pageSize = this.props.pageSize | 50;

        this.vpWidth = Dimensions.get('window').width;
        this.vpHeight = Dimensions.get('window').height;

        this.handleScroll = this.handleScroll.bind(this);
        this.logScrollViewSize = this.logScrollViewSize.bind(this);
        this.scrollViewHeight = 0;

        this.state = {
            data: []
        };

        this.styles = StyleSheet.create({
            container: {
                width: this.vpWidth,
                flexDirection: 'row'
            }
        });

    }

    generateData(){

        const data = this.props.itemsProvider(this.pageSize);

        this.setState({
            data: [...this.state.data, ...data]
        });

    }

    handleScroll(e){

            const { y } = e.nativeEvent.contentOffset;
            const height = this.scrollViewHeight;

            let lastScreenOffset = height - this.vpHeight * 3;
            if( y >= lastScreenOffset ){
                this.generateData();
            }
    }

    logScrollViewSize(width, height){
        this.scrollViewHeight = height;
    }

    componentDidMount(){

        this.generateData();

    }

    render(){
            const data = this.state.data;

            return (
                <ScrollView
                    onScroll={this.handleScroll}
                    onContentSizeChange={this.logScrollViewSize}
                    >
                     <View
                        style={this.styles.container}
                        >
                            <View>
                                {
                                    data.length ? data.slice(0, data.length / 2).map((di, i) => {
                                        return this.props.renderItem(di, i)
                                    }) :
                                        (<></>)
                                }
                            </View>
                            <View>
                                {
                                    data.length ? data.slice(data.length/2, data.length).map((di, i) => {
                                        return this.props.renderItem(di, i + data.length/2)
                                    }) : (<></>)
                                }
                            </View>
                    </View>
            </ScrollView>
        );
    }
}
