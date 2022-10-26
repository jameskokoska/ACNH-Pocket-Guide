import React, {Component} from 'react';
import {ScrollView, Text, View, Image, TouchableNativeFeedback} from 'react-native';
import TextFont from '../components/TextFont';
import colors from '../Colors'
import FadeInOut from "../components/FadeInOut";
import {SubHeader, MailLink, Header} from "../components/Formattings"
import { Supporters } from './CreditsPage';
import * as InAppPurchases from 'expo-in-app-purchases';
import { attemptToTranslate, capitalize, capitalizeFirst, openURL } from '../LoadJsonData';
import Popup, { PopupInfoCustom } from '../components/Popup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonComponent from '../components/ButtonComponent';

export default class DonatePage extends Component {
  constructor() {
    super();
    this.state = {
      products:{}
    }
  }

  getProducts = async () => {
    const products = ['coffee','cake','meal','silver','gold','diamond']
    const { responseCode, results } = await InAppPurchases.getProductsAsync(products);
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      const output = {}
      for(let result of results){
        output[result["productId"]] = result
      }
      this.setState({products: output})
    } else {
      this.setState({products: {}});
    }
  }

  async componentDidMount(){
    try {
      await InAppPurchases.connectAsync();
    } catch (e) {
      console.log(e.toString())
    }

    await this.getProducts()

    InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {

      if (responseCode === InAppPurchases.IAPResponseCode.OK) {
        results.forEach(async (purchase) => {
          if (!purchase.acknowledged) {
            await new Promise(resolve => setTimeout(resolve, 500));
            if(["silver"].includes(purchase["productId"])){
              await InAppPurchases.finishTransactionAsync(purchase, false);
              this.popupUsername?.setPopupVisible(true)
            } else if(["gold","diamond"].includes(purchase["productId"])){
              await InAppPurchases.finishTransactionAsync(purchase, false);
              this.popupUsernameIcon?.setPopupVisible(true)
            } else {
              await InAppPurchases.finishTransactionAsync(purchase, true);
              toast.show("Thank you for your support!", {type:"success", 
                placement:'top',
                duration: 5000, 
                renderType:{
                  success: (toast) => (
                    <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, marginRight: 20, borderRadius: 5, backgroundColor: colors.popupSuccess[global.darkMode], alignItems:"center", justifyContent:"center"}}>
                      <TextFont translate={false} style={{color:"white", fontSize: 15}}>{toast.message}</TextFont>
                    </View>
                  ),
                }
              })
            }
          }
        });
      } else {
        toast.show("There was a problem processing your order. Please try again.", {type:"danger", 
          placement:'top',
          duration: 5000, 
          renderType:{
            danger: (toast) => (
              <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, marginRight: 20, borderRadius: 5, backgroundColor: colors.popupDanger[global.darkMode], alignItems:"center", justifyContent:"center"}}>
                <TextFont translate={false} style={{color:"white", fontSize: 15}}>{toast.message}</TextFont>
              </View>
            )
          }
        })
      }
    });
  }

  render(){
    let buttons = <>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <ButtonComponent
          text={"Cancel"}
          color={colors.cancelButton[global.darkMode]}
          vibrate={8}
          onPress={() => {
            this.popupUsername?.setPopupVisible(false);
            this.popupUsernameIcon?.setPopupVisible(false);
            toast.show("Thank you for your support!", {type:"success", 
              placement:'top',
              duration: 5000, 
              renderType:{
                success: (toast) => (
                  <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, marginRight: 20, borderRadius: 5, backgroundColor: colors.popupSuccess[global.darkMode], alignItems:"center", justifyContent:"center"}}>
                    <TextFont translate={false} style={{color:"white", fontSize: 15}}>{toast.message}</TextFont>
                  </View>
                ),
              }
            })
          }}
        /> 
        <ButtonComponent
          text={"OK"}
          color={colors.okButton[global.darkMode]}
          vibrate={15}
          onPress={() => {
            toast.show("Thank you for your support!", {type:"success", 
              placement:'top',
              duration: 5000, 
              renderType:{
                success: (toast) => (
                  <View style={{paddingHorizontal: 15, paddingVertical: 10, marginHorizontal: 10, marginLeft:15, marginVertical: 5, marginRight: 20, borderRadius: 5, backgroundColor: colors.popupSuccess[global.darkMode], alignItems:"center", justifyContent:"center"}}>
                    <TextFont translate={false} style={{color:"white", fontSize: 15}}>{toast.message}</TextFont>
                  </View>
                ),
              }
            })
            this.popupUsername?.setPopupVisible(false);
            this.popupUsernameIcon?.setPopupVisible(false);
            openURL('mailto:dapperappdeveloper@gmail.com')
          }}
        /> 
      </View>
    </>
    // console.log(this.state.products)
    return <ScrollView>
      <FadeInOut fadeIn={true} duration={1000}>
        <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"flex-end", marginRight: 25, marginTop: 30}}>
          <SubHeader style={{marginTop: 20}}>About the Developer</SubHeader>
          <Image source={require("../assets/icons/James.png")} style={{width: 70, height: 70, resizeMode:"contain"}}></Image>
        </View>
        <TextFont style={{fontSize:14, marginHorizontal: 30, marginTop: 5, marginBottom: 15, color:colors.textBlack[global.darkMode]}}>Hello I'm James! I am the lead developer of this application and currently studying at University. If you would like to help support me and my education, feel free to purchase something off the menu. Everything helps me out! This app will remain free and ad free forever.</TextFont>

        <SubHeader style={{marginTop: 10, fontSize:25, marginBottom: 5, marginLeft: 25}}>Support the Developer</SubHeader>

        {this.state.products!=={} ? <>
        
        {this.state.products["coffee"]?.price === undefined ? <></> : <SupportOption label="Coffee" id="coffee" image={require("../assets/icons/coffee3.png")} price={this.state.products["coffee"]?.price} descriptionShort={"Caffeine to stay awake!"}/>}
        {this.state.products["cake"]?.price === undefined ? <></> : <SupportOption label="Cake" id="cake" image={require("../assets/icons/cupcake.png")} price={this.state.products["cake"]?.price} descriptionShort={"Something sweet to eat!"}/>}
        {this.state.products["meal"]?.price === undefined ? <></> : <SupportOption label="Meal" id="meal" image={require("../assets/icons/meal.png")} price={this.state.products["meal"]?.price} descriptionShort={"Very yummy and filling!"}/>}

        <SubHeader style={{marginTop: 20, fontSize:23, marginBottom: 4, marginLeft: 25}}>Supporter Tiers</SubHeader>
        {this.state.products["silver"]?.price === undefined ? <></> : <SupportOption label="Silver" id="silver" image={require("../assets/icons/silver-medal.png")} price={this.state.products["silver"]?.price+"/"+attemptToTranslate("month")} description="Get your name in the About page of the app!"/>}
        {this.state.products["gold"]?.price === undefined ? <></> : <SupportOption label="Gold" id="gold" image={require("../assets/icons/gold-medal.png")} price={this.state.products["gold"]?.price+"/"+attemptToTranslate("month")} description="Get your name and custom player avatar in the About page of the app!"/>}
        {this.state.products["diamond"]?.price === undefined ? <></> : <SupportOption label="Diamond" id="diamond" image={require("../assets/icons/diamond-medal.png")} price={this.state.products["diamond"]?.price+"/"+attemptToTranslate("month")} description="Get your name and custom player avatar in the About page of the app!"/>}
        
        </>
        :
        <TextFont bold={true} style={{color:colors.textBlack[global.darkMode], marginHorizontal: 25, textAlign:"center", marginTop: 15, marginBottom: 15, fontSize: 17}}>This is currently unavailable.</TextFont>
        }
        <View style={{height:25}}></View>
        <Supporters/>
        <View style={{height:20}}></View>
        <MailLink></MailLink>
        <View style={{height:70}}></View>

        <PopupInfoCustom ref={(popupUsername) => this.popupUsername = popupUsername} buttons={buttons} buttonDisabled={true} noDismiss>
          <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
            <TouchableOpacity onPress={() => openURL('mailto:dapperappdeveloper@gmail.com') }>
              <TextFont bold={false} translate={false} style={{color: colors.textBlack[global.darkMode], fontSize: 16, textAlign:"center"}}>{attemptToTranslate("Please email me your username so I can include it in the app") + " 😀"}</TextFont>
              <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>dapperappdeveloper@gmail.com</TextFont>
            </TouchableOpacity>
          </View>
        </PopupInfoCustom>

        <PopupInfoCustom ref={(popupUsernameIcon) => this.popupUsernameIcon = popupUsernameIcon} buttons={buttons} buttonDisabled={true} noDismiss>
          <View style={{flex: 1, flexWrap: 'wrap', flexDirection:"row",justifyContent:"center"}}>
            <TouchableOpacity onPress={() => openURL('mailto:dapperappdeveloper@gmail.com') }>
            <TextFont bold={false} translate={false} style={{color: colors.textBlack[global.darkMode], fontSize: 16, textAlign:"center"}}>{attemptToTranslate("Please email me your username and character screenshot so I can include it in the app") + " 😀"}</TextFont>
              <TextFont bold={false} style={{color: colors.textBlack[global.darkMode], fontSize: 16, textAlign:"center"}}>{"Please remove all accessories (glasses are fine) if sending your ACNH player's character."}</TextFont>
              <TextFont bold={false} style={{color: colors.fishText[global.darkMode], fontSize: 15, textAlign:"center"}}>dapperappdeveloper@gmail.com</TextFont>
            </TouchableOpacity>
          </View>
        </PopupInfoCustom>

      </FadeInOut>
    </ScrollView>
  }
}

class SupportOption extends Component{
  render(){
    return <TouchableNativeFeedback onPress={()=>InAppPurchases.purchaseItemAsync(this.props.id, {accountIdentifiers: {obfuscatedAccountId: null,obfuscatedProfileId: null,},})}>
      <View style={{backgroundColor:global.darkMode ? colors.lightDarkAccentHeavy2[global.darkMode] : colors.textWhite[global.darkMode], padding: 20, borderRadius: 15, marginHorizontal: 20, marginTop: 10, }}>
        <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between"}}>
          <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
            <Image source={this.props.image} style={{width: 30, height: 30, resizeMode:"contain"}}></Image>
            <View style={{flexDirection:"column"}}>
              <TextFont bold={true} translate={false} style={{color:colors.textBlack[global.darkMode], marginLeft:15, fontSize: 20}}>{capitalizeFirst(attemptToTranslate(this.props.label))}</TextFont>
              {this.props.descriptionShort ? <TextFont bold={true} style={{color:colors.textBlack[global.darkMode], marginLeft:15, fontSize: 12, width: 180}}>{this.props.descriptionShort}</TextFont> : <></>}
            </View>
          </View>
          <TextFont bold={true} style={{color:colors.textBlack[global.darkMode], marginLeft:5, fontSize: 20, marginRight: 3}}>{this.props.price}</TextFont>
        </View>
        {this.props.description ? <TextFont bold={true} style={{color:colors.textBlack[global.darkMode], marginLeft:45, fontSize: 13, marginTop: 3}}>{this.props.description}</TextFont> : <></>}
      </View>
    </TouchableNativeFeedback>
  }
}
