import React, {Component} from 'react';
import {View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import colors from '../Colors.js';


class EmoticonsPage extends Component {
  render(){
    return(
        <ListPage 
          disablePopup={[true]}
          title={this.props.title===undefined?"Emoticons":this.props.title}
          extraInfo={this.props.extraInfo===undefined?"":this.props.extraInfo}
          appBarColor={this.props.appBarColor===undefined?colors.emojipediaAppBar[global.darkMode]:this.props.appBarColor}
          accentColor={this.props.accentColor===undefined?colors.emojipediaAccent[global.darkMode]:this.props.accentColor}
          subHeader={this.props.subHeader===undefined?"":this.props.subHeader}
          tabs={this.props.tabs===undefined?false:this.props.tabs}
          smallerHeader={this.props.smallerHeader===undefined?false:this.props.smallerHeader}
          filterSearchable={this.props.filterSearchable===undefined?true:this.props.filterSearchable}
          titleColor={this.props.titleColor===undefined?colors.textBlack[global.darkMode]:this.props.titleColor}
          imageProperty={["Image"]}
          textProperty={["NameLanguage",]}
          textProperty2={["Source"]}
          searchKey={[["NameLanguage",]]}
          gridType="smallGrid" //smallGrid, largeGrid, row
          dataGlobalName={"dataLoadedReactions"}
          searchBarColor={colors.searchbarBG[global.darkMode]}
          backgroundColor={colors.lightDarkAccent[global.darkMode]}
          boxColor={false}
          labelColor={colors.textBlack[global.darkMode]}
          specialLabelColor={colors.fishText[global.darkMode]}
        />
    )
  }
}
export default EmoticonsPage;