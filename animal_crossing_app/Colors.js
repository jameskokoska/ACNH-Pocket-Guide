import { Appearance } from 'react-native-appearance';

const colors = {
    //Use global.darkMode or global.darkModeReverse
    background: ["#f5f5f5","#1a1a1a"], //"#34454f" original
    backgroundLight: ["#ebebeb","#272727"],
    FAB: ["#49599a", "#455a64"],
    searchbarBG : ["#DFDFDF", "#A3A3A3"],
    searchbarIcon : ["#000000","#FFFFFF"],
    shadow : ["#ebebeb", "#313131"],
    inkWell : ["#CDD0D3","#737592"],
    shadowPopUp : ["#000000", "#000000"],
    lightDarkAccent : ["#F5F5F5","#1A1A1A"],
    lightDarkAccentTextBG : ["#F1F1F1","#202020"],
    lightDarkAccent2 : ["#DADADA","#383838"],
    lightDarkAccentHeavy : ["#bcbfc2","#494c4d"],
    lightDarkAccentHeavy2 : ["#ebebeb","#494c4d"],
    lightDarkAccentHeavyBackground : ["#ebebeb","#282829"],
    filterBG : ["#ebebeb","#494c4d"],
    filterText : ["#ebebeb","#494c4d"],
    filterSearch : ["#bcbfc2","#A3A3A3"],
    textBlack : ["#373737","#f2f2f2"],
    textWhite : ["#FFFFFF","#373737"],
    textWhiteOnly : ["#FFFFFF","#FFFFFF"],
    textLight : ["#a8a8a8","#8c8c8c"],
    white : ["#FFFFFF","#2B2B2B"],
    checkRed : ["#F8DFE3","#805D62"],
    checkGreen : ["#A0DDA1","#557E55"],
    fishAppBar : ["#A2D0F7","#536991"],
    fishAccent : ["#E3F2FD","#434C53"],
    fishText : ["#3F51B5","#9AA2D4"],
    bugAppBar : ["#a5d6a7","#295029"],
    bugAccent : ["#e8f5e9","#6D756E"],
    bugText : ["#1b5e20","#729E75"],
    fossilAppBar : ["#947C5D","#4E463B"],
    fossilAccent : ["#E9DAC5","#726A5F"],
    villagerAppBar : ["#80CACF","#4B6E70"],
    villagerAccent : ["#EEFDFC","#71807F"],
    villagerCheck : ["#D6F5F2","#E2B0B0"],
    furnitureAppBar : ["#6EB171","#2F5832"],
    furnitureAccent : ["#e8f5e9","#626D63"],
    clothingAppBar : ["#7569A0","#473C6B"],
    clothingAccent : ["#ede7f6","#625D69"],
    toolsAppBar : ["#D87575","#6E3333"],
    toolsAccent : ["#FDF1F2","#5A474A"],
    floorWallsAppBar : ["#416EA1","#304F74"],
    floorWallsAccent : ["#e3f2fd","#505E68"],
    newItemsAppBar : ["#93C0F3","#2F527A"],
    newItemsAccent : ["#e3f2fd","#505E68"],
    emojipediaAppBar : ["#F3E98E","#807623"],
    emojipediaAccent : ["#dbd388","#878468"],
    allItemsAppBar : ["#B5DFB5","#2A522A"],
    allItemsAccent : ["#e8f5e9","#586353"],
    musicAppBar : ["#6B78BE","#364980"],
    musicAccent : ["#E3F2FD","#434C53"],
    musicWavesTransparency: [0.9,0.4],
    giftsAppBar : ["#C6BCFF","#2D3D83"],
    artAppBar : ["#e57373","#793030"],
    artAccent : ["#FFF0F5","#5A4043"],
    warningBackground : ["#ffccbc","#4d2a2c"],
    warningEventBackground : ["#F5D9D9","#38292B"],
    startEventBackground : ["#D3F3D3","#2B3326"],
    specialEventBackground : ["#D4EDF5","#2B333A"],
    specialEventBirthdayBackground : ["#EFDEF3","#36293B"],
    specialEventBackgroundHighlight : ["#56CFF7","#3077B4"],
    specialEventBirthdayBackgroundHighlight : ["#D963F3","#8332A3"],
    seaAppBar : ["#A2D0F7","#536991"],
    seaAccent : ["#E3F2FD","#434C53"],
    musicWaves : ["#404662","#a9afdd"],
    constructionAppBar : ["#EEBE77","#946E1B"],
    cardsAppBar : ["#b884bf","#703D77"],
    cardsAccent : ["#fbf0fc","#57365c"],
    materialsAppBar : ["#66A9AC","#266164"],
    materialsAccent : ["#e8feff","#434C53"],
    wishlistAppBar: ["#E69D9F", "#8B535A"],
    wishlistAccent: ["#FCE1E3", "#4E3B3C"],
    obtainableItemsAppBar: ["#D4D8A3", "#7C7A56"],
    obtainableItemsAccent: ["#EFF0CD", "#535344"],
    skyColor : ["#aad5f0","#1A1A1A"],
    grassColor : ["#9FDBA7","#4c6337"],
    checkedColor : ["#dcebce","#34402a"],
    eventsColor : ["#ffe366","#333333"],
    todoColor : ["#ffcc80","#333333"],
    todoColorAccent : ["#ffeccf","#333333"],
    visitorsColor : ["#82b5b4","#333333"],
    storeHoursColor : ["#8fc6f7","#333333"],
    collectionColor : ["#c7a4ff","#333333"],
    profileColor : ["#81c784","#333333"],
    activeCreaturesColor : ["#ff8d7e","#333333"],
    sectionBackground1 : ["#f8f8f8", "#1A1A1A"],
    eventBackground : ["#FFFFFF", "#262626"],
    sectionBackground2 : ["#f2f2f2", "#171717"],
    topSidebar : ["#e7f3e9","#6d746e"],
    selectHome : ["#d6d6d6", "#828282"],
    selectCreatures : ["#D4DBEC", "#697385"],
    selectItems : ["#CFE6DD", "#57694e"],
    selectIsland : ["#c1d8d0", "#57694e"],
    selectSongs : ["#D8E0F7", "#688194"],
    selectNewItems : ["#CADFEC", "#526474"],
    selectEverything : ["#D3E9D3", "#4E664D"],
    selectEmotes : ["#f0efd5", "#918f76"],
    selectCrafting : ["#f2e2d8", "#907373"],
    selectVillagers : ["#CEE1E7", "#738790"],
    selectConstruction : ["#ECE5D0", "#9B8B77"],
    selectCards : ["#E6D0E9", "#988799"],
    selectMisc : ["#c1d8d0", "#6d8387"],
    selectSettings : ["#cdd8df","#72818b"],
    selectAbout : ["#D6DBE7","#7d8986"],
    selectCalendar : ["#f2e2d8", "#907373"],
    selectWishlist: ["#FDE7E9", "#886769"],
    selectAchievements : ["#E8ECFD","#566181"],
    selectObtainable : ["#F0EBD5", "#777459"],
    selectText : ["#7792A8","#3C7477"],
    selectedText : ["#5B82AF","#2D82A3"],
    achievementsAppBar : ["#C1CBF7","#485068"],
    achievementsNoun : ["#5c6bc0","#3C56A3"],
    achievementsModifier : ["#548BAA","#3C8BA3"],
    highlightNonCustomizableItems : ["#8DAFEE6B","#7688C04B"],
    okButton : ["#4A9EE2","#146EA5"],
    okButtonFaint : ["#99cbf2","#125580"],
    dateButton : ["#81c784","#519657"],
    cancelButton : ["#E96D6D","#9B1A25"],
    filtersResetButton : ["#ff8d7e","#e57373"],
    closedStore : ["#ffd9d9","#654848"],
    openStore : ["#beebc0","#2c5730"],
    closingSoonStore : ["#f4fabe","#9e9855"],
    template : ["#","#"],
    creaturesLeavingBG : ["#E2B0B0","#6E3333"],
    itemBoxYellow : ["#b1b400","#ece739"],
    itemBoxBeige : ["#d9b600","#e3bf55"],
    itemBoxRed : ["#ff0000","#ff6c6c"],
    itemBoxBrown : ["#a77600","#d88f00"],
    itemBoxBlue : ["#006dff","#00b0ff"],
    itemBoxWhite : ["#A3A3A3","#FFFFFF"],
    itemBoxBlack : ["#000000","#414141"],
    itemBoxPink : ["#ff4ebb","#ff4ebb"],
    itemBoxGreen : ["#0bb600","#8bff00"],
    itemBoxGray : ["#3a3a3a","#7b7b7b"],
    itemBoxOrange : ["#ff9200","#ff9200"],
    itemBoxAqua : ["#00ffc7","#00ffc7"],
    itemBoxPurple : ["#8000ff","#c35bff"],
    itemBoxNone : ["#3a3a3a","#7b7b7b"],
    itemBoxColorful : ["#f000ff","#ff78f5"],
    itemBoxYellowDisplay : ["#ece739","#ece739"],
    itemBoxBeigeDisplay : ["#e3bf55","#e3bf55"],
    itemBoxRedDisplay : ["#ff6c6c","#ff6c6c"],
    itemBoxBrownDisplay : ["#A17B23","#A17B23"],
    itemBoxBlueDisplay : ["#006dff","#006dff"],
    itemBoxWhiteDisplay : ["#FFFFFF","#FFFFFF"],
    itemBoxBlackDisplay : ["#000000","#000000"],
    itemBoxPinkDisplay : ["#ff4ebb","#ff4ebb"],
    itemBoxGreenDisplay : ["#0bb600","#0bb600"],
    itemBoxGrayDisplay : ["#7b7b7b","#7b7b7b"],
    itemBoxOrangeDisplay : ["#FFBB00","#FFBB00"],
    itemBoxAquaDisplay : ["#94FFE8","#94FFE8"],
    itemBoxPurpleDisplay : ["#c35bff","#c35bff"],
    itemBoxNoneDisplay : ["#3a3a3a","#3a3a3a"],
    itemBoxColorfulDisplay : ["#3a3a3a","#3a3a3a"],

}
module.exports = colors;