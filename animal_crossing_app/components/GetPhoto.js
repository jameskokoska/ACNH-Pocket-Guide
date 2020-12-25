import {Image, View} from "react-native";
import React, { Component } from "react";

export function getPhoto(name){
  switch(name){
    case "leaf.png":
      return require("../assets/icons/leaf.png");
    case "fish.png":
      return require("../assets/icons/fish.png");
    case "bugs.png":
      return require("../assets/icons/bugs.png");
    case "popper.png":
      return require("../assets/icons/popper.png");
    case "heart.png":
      return require("../assets/icons/heart.png");
    case "snow.png":
      return require("../assets/icons/snow.png");
    case "fireworks.png":
      return require("../assets/icons/fireworks.png");
    case "fullmoon.png":
      return require("../assets/icons/fullmoon.png");
    case "pumpkin.png":
      return require("../assets/icons/pumpkin.png");
    case "corn.png":
      return require("../assets/icons/corn.png");
    case "present.png":
      return require("../assets/icons/present.png");
    case "popper.png":
      return require("../assets/icons/popper.png");
    case "bunny.png":
      return require("../assets/icons/bunny.png");
    case "blossom.png":
      return require("../assets/icons/blossom.png");
    case "music.png":
      return require("../assets/icons/music.png");
    case "turnip.png":
      return require("../assets/icons/turnip.png");
    default:
      break;
  }
}

export function getPhotoCorner(name){
  if(name===undefined){
    return <View/>;
  } else {
    name = name.toLowerCase();
  }
  if(name.includes("sea") && !name.includes("seasonal") || name.includes("pier") || name.includes("shoreline"))
    return <Image source={require("../assets/icons/oceanIcon.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>
  else if(name.includes("river"))
    return <Image source={require("../assets/icons/riverIcon.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>;
  else if(name.includes("pond") || name.includes("water"))
    return <Image source={require("../assets/icons/pondIcon.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>;
  else if(name.includes("flying"))
    return <Image source={require("../assets/icons/butterflies.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("flowers"))
    return <Image source={require("../assets/icons/flowerIcon.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("rock"))
    return <Image source={require("../assets/icons/rock.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("turnip"))
    return <Image source={require("../assets/icons/turnip.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("stump"))
    return <Image source={require("../assets/icons/stump.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("palm"))
    return <Image source={require("../assets/icons/palmTree.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("tree"))
    return <Image source={require("../assets/icons/forest.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("ground"))
    return <Image source={require("../assets/icons/sprout.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("snowballs"))
    return <Image source={require("../assets/icons/snow.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("villagers"))
    return <Image source={require("../assets/icons/cat.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("fossil"))
    return <Image source={require("../assets/icons/digIcon.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("able"))
    return <Image source={require("../assets/icons/able.png")} style={{height: 60, width: 60, resizeMode:'contain'}}/>;
  else if(name.includes("nook miles"))
    return <Image source={require("../assets/icons/miles.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("nook"))
    return <Image source={require("../assets/icons/nook.png")} style={{height: 55, width: 55, resizeMode:'contain'}}/>;
  else if(name.includes("crafting"))
    return <Image source={require("../assets/icons/crafting.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("gulliver"))
    return <Image source={require("../assets/icons/oceanIcon.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>
  else if(name.includes("new year"))
    return <Image source={require("../assets/icons/popper.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>
  else
    return <Image source={require("../assets/icons/leaf.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
}

export function getPhotoCornerSize(name){
  if(name===undefined){
    return true
  }
  switch(name){
    case "sea":
      return true;
    case "river":
      return true;
    case "sea":
      return false;
    case "sea":
      return false;
    default:
      return false;
  }
}

export function getPhotoShadow(item, centered){
  if(centered===false){
    var name = "shadow";
  } else {
    var name = "shadowNormal";
  }
  

  if(item["Where/How"]==="River" || item["Where/How"]==="Pond")
    name+="River-"
  else if(item["Where/How"]==="Sea" || item["Where/How"]==="Pier")
    name+="Sea-"
  else 
    name+="River-"

  if(item["Shadow"].includes("Fin") && item["Shadow"].includes("X-Large"))
    name="shadowLargeFin"
  else if(item["Shadow"].includes("Fin"))
    name="shadowLargeFin"
  else if(item["Shadow"].includes("Long"))
    name="shadowLong"
  else 
    name+=item["Shadow"]

  name+=".png"
  switch(name){
    case "shadowLargeFin.png":
      return require("../assets/icons/shadowsAligned/shadowLargeFin.png");
    case "shadowLong.png":
      return require("../assets/icons/shadowsAligned/shadowLong.png");
    case "shadowMediumFin.png":
      return require("../assets/icons/shadowsAligned/shadowMediumFin.png");
    case "shadowRiver-Large.png":
      return require("../assets/icons/shadowsAligned/shadowRiver-Large.png");
    case "shadowRiver-Medium.png":
      return require("../assets/icons/shadowsAligned/shadowRiver-Medium.png");
    case "shadowRiver-Small.png":
      return require("../assets/icons/shadowsAligned/shadowRiver-Small.png");
    case "shadowRiver-X-Large.png":
      return require("../assets/icons/shadowsAligned/shadowRiver-X-Large.png");
    case "shadowRiver-X-Small.png":
      return require("../assets/icons/shadowsAligned/shadowRiver-X-Small.png");
    case "shadowRiver-XX-Large.png":
      return require("../assets/icons/shadowsAligned/shadowRiver-XX-Large.png");
    case "shadowSea-Large.png":
      return require("../assets/icons/shadowsAligned/shadowSea-Large.png");
    case "shadowSea-Medium.png":
      return require("../assets/icons/shadowsAligned/shadowSea-Medium.png");
    case "shadowSea-Small.png":
      return require("../assets/icons/shadowsAligned/shadowSea-Small.png");
    case "shadowSea-X-Large.png":
      return require("../assets/icons/shadowsAligned/shadowSea-X-Large.png");
    case "shadowSea-X-Small.png":
      return require("../assets/icons/shadowsAligned/shadowSea-X-Small.png");
    case "shadowSea-XX-Large.png":
      return require("../assets/icons/shadowsAligned/shadowSea-XX-Large.png");
    case "shadowNormalLargeFin.png":
      return require("../assets/icons/shadowsCentered/shadowNormalLargeFin.png");
    case "shadowNormalLong.png":
      return require("../assets/icons/shadowsCentered/shadowNormalLong.png");
    case "shadowNormalMediumFin.png":
      return require("../assets/icons/shadowsCentered/shadowNormalMediumFin.png");
    case "shadowNormalRiver-Large.png":
      return require("../assets/icons/shadowsCentered/shadowNormalRiver-Large.png");
    case "shadowNormalRiver-Medium.png":
      return require("../assets/icons/shadowsCentered/shadowNormalRiver-Medium.png");
    case "shadowNormalRiver-Small.png":
      return require("../assets/icons/shadowsCentered/shadowNormalRiver-Small.png");
    case "shadowNormalRiver-X-Large.png":
      return require("../assets/icons/shadowsCentered/shadowNormalRiver-X-Large.png");
    case "shadowNormalRiver-X-Small.png":
      return require("../assets/icons/shadowsCentered/shadowNormalRiver-X-Small.png");
    case "shadowNormalRiver-XX-Large.png":
      return require("../assets/icons/shadowsCentered/shadowNormalRiver-XX-Large.png");
    case "shadowNormalSea-Large.png":
      return require("../assets/icons/shadowsCentered/shadowNormalSea-Large.png");
    case "shadowNormalSea-Medium.png":
      return require("../assets/icons/shadowsCentered/shadowNormalSea-Medium.png");
    case "shadowNormalSea-Small.png":
      return require("../assets/icons/shadowsCentered/shadowNormalSea-Small.png");
    case "shadowNormalSea-X-Large.png":
      return require("../assets/icons/shadowsCentered/shadowNormalSea-X-Large.png");
    case "shadowNormalSea-X-Small.png":
      return require("../assets/icons/shadowsCentered/shadowNormalSea-X-Small.png");
    case "shadowNormalSea-XX-Large.png":
      return require("../assets/icons/shadowsCentered/shadowNormalSea-XX-Large.png");
    default:
      return require("../assets/icons/shadowsAligned/shadowSea-XX-Large.png");
  }
}