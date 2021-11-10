import React, {Component} from 'react';
import ListPage from '../components/ListPage';
import colors from '../Colors.js';

class CraftingPage extends Component {
  constructor() {
    super();
  }
  render(){
    return(
      <ListPage 
        title={this.props.title===undefined?"Recipes":this.props.title}
        extraInfo={this.props.extraInfo===undefined?"":this.props.extraInfo}
        appBarColor={this.props.appBarColor===undefined?colors.toolsAppBar[global.darkMode]:this.props.appBarColor}
        accentColor={this.props.accentColor===undefined?colors.toolsAccent[global.darkMode]:this.props.accentColor}
        subHeader={this.props.subHeader===undefined?"":this.props.subHeader}
        tabs={this.props.tabs===undefined?false:this.props.tabs}
        smallerHeader={this.props.smallerHeader===undefined?false:this.props.smallerHeader}
        filterSearchable={this.props.filterSearchable===undefined?true:this.props.filterSearchable}
        titleColor={this.props.titleColor===undefined?colors.textWhite[0]:this.props.titleColor}
        showCraftableFromMaterial={this.props.showCraftableFromMaterial===undefined?undefined:this.props.showCraftableFromMaterial}
        imageProperty={["Image"]}
        textProperty={["NameLanguage"]}
        textProperty2={["(DIY)"]}
        searchKey={[["NameLanguage"]]}
        gridType="smallGrid" //smallGrid, largeGrid, row
        dataGlobalName={"dataLoadedRecipes"}
        searchBarColor={colors.searchbarBG[global.darkMode]}
        backgroundColor={colors.lightDarkAccent[global.darkMode]}
        boxColor={false}
        labelColor={colors.textBlack[global.darkMode]}
        specialLabelColor={colors.fishText[global.darkMode]}
        popUpCornerImageProperty={["Source"]}
        popUpCornerImageLabelProperty={["Source"]}
        popUpContainer={[["RecipesPopup",500]]}
      />
    )
  }
}
export default CraftingPage;