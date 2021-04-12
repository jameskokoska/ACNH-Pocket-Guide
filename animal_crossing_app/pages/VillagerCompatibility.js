import React, {Component} from 'react';
import {Linking, TouchableOpacity, ScrollView, View, Dimensions, Text} from 'react-native';
import ListPage from '../components/ListPage';
import LottieView from 'lottie-react-native';
import TextFont from '../components/TextFont'
import StoreHoursContainer from '../components/StoreHoursContainer';
import colors from '../Colors'
import PopupRating from "../components/PopupRating"
import ButtonComponent from "../components/ButtonComponent"
import {MailSupport, MailLink, ExternalLink, SubHeader, Header, Paragraph} from "../components/Formattings"
import {attemptToTranslate, getCurrentVillagerObjects} from "../LoadJsonData"

class VillagerCompatibilityPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }
  render(){
    console.log(getCurrentVillagerObjects)
    return(
      <View>
        {getCurrentVillagerObjects.map((villager, index) => {
          <View style={{backgroundColor: colors.white[global.darkMode], paddingVertical: 20, paddingRight: 10, marginHorizontal: 20, marginVertical: 5,  borderRadius: 10}}>
            <SubHeader>{villager["Name"]}</SubHeader>
          </View>
        })}
      </View>
    )
  }
}
export default CreditsPage;