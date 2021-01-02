import {Image, View} from "react-native";
import React, { Component } from "react";

export function getPhoto(name){
  switch(name){
    case "leaf.png":
      return require("../assets/icons/leaf.png");
    case "applejuice.png":
      return require("../assets/icons/applejuice.png");
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
    case "pumpkin.png":
      return require("../assets/icons/pumpkin.png");
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
  else if(name.includes("snowballs") || name.includes("jingle") || name.includes("snowboy"))
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
  else if(name.includes("saharah"))
    return <Image source={require("../assets/icons/saharah.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("balloons"))
    return <Image source={require("../assets/icons/balloon.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("celeste"))
    return <Image source={require("../assets/icons/sparkle.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("recipe"))
    return <Image source={require("../assets/icons/crafting.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("diy"))
    return <Image source={require("../assets/icons/crafting.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("jack"))
    return <Image source={require("../assets/icons/pumpkin.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("zipper"))
    return <Image source={require("../assets/icons/bunny.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("treasure trawler"))
    return <Image source={require("../assets/icons/ship.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>
  else if(name.includes("c.j."))
    return <Image source={require("../assets/icons/beaver.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
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

export function getMaterialImage(material, reduceComplexity=false, flowerSingle=false){
  var materialStripped = material;
  if(flowerSingle){
    materialStripped = materialStripped.replace("roses", "rose");
    materialStripped = materialStripped.replace("pansies", "pansy");
    materialStripped = materialStripped.replace("windflowers", "windflower");
    materialStripped = materialStripped.replace("hyacinths", "hyacinth");
    materialStripped = materialStripped.replace("lilies", "lily");
    materialStripped = materialStripped.replace("cosmos", "cosmos");
    materialStripped = materialStripped.replace("mums", "mum");
    materialStripped = materialStripped.replace("tulips", "tulip");
  }
  var data = require("../assets/data/other.json");
  if(reduceComplexity){
    materialStripped = materialStripped.replace("-","");
    materialStripped = materialStripped.replace(" ","");
    for(var index = 0; index < data.length; index++){
      var dataStripped = data[index]["Name"];
      dataStripped = dataStripped.replace("-","");
      dataStripped = dataStripped.replace(" ","");
      if(dataStripped===materialStripped){
        return data[index]["Inventory Image"]
      }
    }
    return "";
  } else {
    for(var index = 0; index < data.length; index++){
      if(data[index]["Name"]===material){
        return data[index]["Inventory Image"]
      }
    }
    return "";
  }
  
}

export function getSculpturePhotoFake(name){
  console.log(name)
  var data = require("../assets/data/art.json");
  for(var index = 0; index < data.length; index++){
    if(data[index]["Name"]===name && data[index]["Genuine"]==="No"){
      return data[index]["Image"]
    }
  }
  return "none";
}

export function getPaintingPhoto(name){
  switch(name){
    case "Academic Painting":
      return require("../assets/icons/art/AcademicPainting.png");
    case "Amazing Painting":
      return require("../assets/icons/art/AmazingPainting.png");
    case "Basic Painting":
      return require("../assets/icons/art/BasicPainting.png");
    case "Calm Painting":
      return require("../assets/icons/art/CalmPainting.png");
    case "Common Painting":
      return require("../assets/icons/art/CommonPainting.png");
    case "Detailed Painting":
      return require("../assets/icons/art/DetailedPainting.png");
    case "Dynamic Painting":
      return require("../assets/icons/art/DynamicPainting.png");
    case "Famous Painting":
      return require("../assets/icons/art/FamousPainting.png");
    case "Flowery Painting":
      return require("../assets/icons/art/FloweryPainting.png");
    case "Glowing Painting":
      return require("../assets/icons/art/GlowingPainting.png");
    case "Graceful Painting":
      return require("../assets/icons/art/GracefulPainting.png");
    case "Jolly Painting":
      return require("../assets/icons/art/JollyPainting.png");
    case "Moody Painting":
      return require("../assets/icons/art/MoodyPainting.png");
    case "Moving Painting":
      return require("../assets/icons/art/MovingPainting.png");
    case "Mysterious Painting":
      return require("../assets/icons/art/MysteriousPainting.png");
    case "Nice Painting":
      return require("../assets/icons/art/NicePainting.png");
    case "Perfect Painting":
      return require("../assets/icons/art/PerfectPainting.png");
    case "Quaint Painting":
      return require("../assets/icons/art/QuaintPainting.png");
    case "Scary Painting":
      return require("../assets/icons/art/ScaryPainting.png");
    case "Scenic Painting":
      return require("../assets/icons/art/ScenicPainting.png");
    case "Serene Painting":
      return require("../assets/icons/art/SerenePainting.png");
    case "Sinking Painting":
      return require("../assets/icons/art/SinkingPainting.png");
    case "Solemn Painting":
      return require("../assets/icons/art/SolemnPainting.png");
    case "Twinkling Painting":
      return require("../assets/icons/art/TwinklingPainting.png");
    case "Warm Painting":
      return require("../assets/icons/art/WarmPainting.png");
    case "Wild Painting Left Half":
      return require("../assets/icons/art/WildPaintingLeftHalf.png");
    case "Wild Painting Right Half":
      return require("../assets/icons/art/WildPaintingRightHalf.png");
    case "Wistful Painting":
      return require("../assets/icons/art/WistfulPainting.png");
    default:
      return "none";
  }
}

export function getPaintingPhotoFake(name){
  switch(name){
    case "Academic Painting":
    console.log("ya")
      return require("../assets/icons/art/AcademicPaintingFake.png");
    case "Amazing Painting":
      return require("../assets/icons/art/AmazingPaintingFake.png");
    case "Basic Painting":
      return require("../assets/icons/art/BasicPaintingFake.png");
    case "Detailed Painting":
      return require("../assets/icons/art/DetailedPaintingFake.png");
    case "Famous Painting":
      return require("../assets/icons/art/FamousPaintingFake.png");
    case "Graceful Painting":
      return require("../assets/icons/art/GracefulPaintingFake.png");
    case "Jolly Painting":
      return require("../assets/icons/art/JollyPaintingFake.png");
    case "Moving Painting":
      return require("../assets/icons/art/MovingPaintingFake.png");
    case "Quaint Painting":
      return require("../assets/icons/art/QuaintPaintingFake.png");
    case "Scary Painting":
      return require("../assets/icons/art/ScaryPaintingFake.png");
    case "Scenic Painting":
      return require("../assets/icons/art/ScenicPaintingFake.png");
    case "Serene Painting":
      return require("../assets/icons/art/SerenePaintingFake.png");
    case "Solemn Painting":
      return require("../assets/icons/art/SolemnPaintingFake.png");
    case "Wild Painting Left Half":
      return require("../assets/icons/art/WildPaintingLeftHalfFake.png");
    case "Wild Painting Right Half":
      return require("../assets/icons/art/WildPaintingRightHalfFake.png");
    case "Wistful Painting":
      return require("../assets/icons/art/WistfulPaintingFake.png");
    default:
      return "none"
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