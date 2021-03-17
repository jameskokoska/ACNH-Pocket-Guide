import {Image, View} from "react-native";
import React, { Component } from "react";

export function getPhoto(name, fallback=""){
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
    case "cat.png":
      return require("../assets/icons/cat.png");
    case "digIcon.png":
      return require("../assets/icons/digIcon.png");
    case "miles.png":
      return require("../assets/icons/miles.png");
    case "able.png":
      return require("../assets/icons/able.png");
    case "nook.png":
      return require("../assets/icons/nook.png");
    case "crafting.png":
      return require("../assets/icons/crafting.png");
    case "oceanIcon.png":
      return require("../assets/icons/oceanIcon.png");
    case "saharah.png":
      return require("../assets/icons/saharah.png");
    case "balloon.png":
      return require("../assets/icons/balloon.png");
    case "sparkle.png":
      return require("../assets/icons/sparkle.png");
    case "ship.png":
      return require("../assets/icons/ship.png");
    case "beaver.png":
      return require("../assets/icons/beaver.png");
    case "flowerIcon.png":
      return require("../assets/icons/flowerIcon.png");
    case "rock.png":
      return require("../assets/icons/rock.png");
    case "bellBag.png":
      return require("../assets/icons/bellBag.png");
    case "bell.png":
      return require("../assets/icons/bell.png");
  }
  if(name.includes("bamboo")){
    return require("../assets/icons/bamboo.png");
  } else if(name.includes("shamrock")){
    return require("../assets/icons/shamrock.png");
  } else if(name.includes("ophiuchus")){
    return require("../assets/icons/ophiuchus.png");
  } else if(name.includes("scorpio")){
    return require("../assets/icons/scorpio.png");
  } else if(name.includes("virgo")){
    return require("../assets/icons/virgo.png");
  } else if(name.includes("aries")){
    return require("../assets/icons/aries.png");
  } else if(name.includes("aquarius")){
    return require("../assets/icons/aquarius.png");
  } else if(name.includes("cancer")){
    return require("../assets/icons/cancer.png");
  } else if(name.includes("libra")){
    return require("../assets/icons/libra.png");
  } else if(name.includes("leo")){
    return require("../assets/icons/leo.png");
  } else if(name.includes("sagittarius")){
    return require("../assets/icons/sagittarius.png");
  } else if(name.includes("taurus")){
    return require("../assets/icons/taurus.png");
  } else if(name.includes("capricorn")){
    return require("../assets/icons/capricorn.png");
  } else if(name.includes("gemini")){
    return require("../assets/icons/gemini.png");
  } else if(name.includes("pisces")){
    return require("../assets/icons/pisces.png");
  } else if(name.includes("able")){
    return require("../assets/icons/able.png");
  } else if(name.includes("shells")){
    return require("../assets/icons/shells.png");
  } else if(name.includes("blossom")){
    return require("../assets/icons/blossom.png");
  } else if(name.includes("mario")){
    return require("../assets/icons/mushroom.png");
  } else if(name.includes("acorns")){
    return require("../assets/icons/fall.png");
  } else if(name.includes("snow")){
    return require("../assets/icons/snow.png");
  } else if(name.includes("toy")){
    return require("../assets/icons/santa.png");
  } else if(name.includes("winter")){
    return require("../assets/icons/snow.png");
  } else if(name.includes("new year")){
    return require("../assets/icons/popper.png");
  } else if(name.includes("big game")){
    return require("../assets/icons/football.png");
  } else if(name.includes("festivale")){
    return require("../assets/icons/popper.png");
  } else if(name.includes("maple leaves")){
    return require("../assets/icons/mapleleaves.png");
  } else if(name.includes("mushroom")){
    return require("../assets/icons/mushroommush.png");
  } else if(name.includes("fireworks")){
    return require("../assets/icons/fireworks.png");
  } else if(name.includes("bug")){
    return require("../assets/icons/bugs.png");
  } else if(name.includes("fish")){
    return require("../assets/icons/fish.png");
  } else if(name.includes("summer")){
    return require("../assets/icons/sun.png");
  }
  if(fallback.includes("season")){
    return require("../assets/icons/season.png");
  } else if(fallback.includes("shopping")){
    return require("../assets/icons/nook.png");
  } else {
    return require("../assets/icons/leaf.png");
  }
}

export function getPhotoCorner(name){
  if(name===undefined){
    return <View/>;
  } else {
    name = name.toLowerCase();
  }
  if(name.includes("sea") && !name.includes("seasonal") || name.includes("pier") || name.includes("shoreline") || name.includes("beach"))
    return <Image source={require("../assets/icons/oceanIcon.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>
  else if(name.includes("river"))
    return <Image source={require("../assets/icons/riverIcon.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>;
  else if(name.includes("pond") || name.includes("water"))
    return <Image source={require("../assets/icons/pondIcon.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>;
  else if(name.includes("flying"))
    return <Image source={require("../assets/icons/butterflies.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("flowers") || name.includes("breeding") || name.includes("seed"))
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
  else if(name.includes("fossil") || name.includes("dig") || name.includes("plant"))
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
  else if(name.includes("celeste") || name.includes("stars"))
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
  else if(name.includes("fish"))
    return <Image source={require("../assets/icons/fish.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("net"))
    return <Image source={require("../assets/icons/airIcon.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
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
      return require("../assets/icons/art/AcademicPainting.jpg");
    case "Amazing Painting":
      return require("../assets/icons/art/AmazingPainting.jpg");
    case "Basic Painting":
      return require("../assets/icons/art/BasicPainting.jpg");
    case "Calm Painting":
      return require("../assets/icons/art/CalmPainting.jpg");
    case "Common Painting":
      return require("../assets/icons/art/CommonPainting.jpg");
    case "Detailed Painting":
      return require("../assets/icons/art/DetailedPainting.jpg");
    case "Dynamic Painting":
      return require("../assets/icons/art/DynamicPainting.jpg");
    case "Famous Painting":
      return require("../assets/icons/art/FamousPainting.jpg");
    case "Flowery Painting":
      return require("../assets/icons/art/FloweryPainting.jpg");
    case "Glowing Painting":
      return require("../assets/icons/art/GlowingPainting.jpg");
    case "Graceful Painting":
      return require("../assets/icons/art/GracefulPainting.jpg");
    case "Jolly Painting":
      return require("../assets/icons/art/JollyPainting.jpg");
    case "Moody Painting":
      return require("../assets/icons/art/MoodyPainting.jpg");
    case "Moving Painting":
      return require("../assets/icons/art/MovingPainting.jpg");
    case "Mysterious Painting":
      return require("../assets/icons/art/MysteriousPainting.jpg");
    case "Nice Painting":
      return require("../assets/icons/art/NicePainting.jpg");
    case "Perfect Painting":
      return require("../assets/icons/art/PerfectPainting.jpg");
    case "Quaint Painting":
      return require("../assets/icons/art/QuaintPainting.jpg");
    case "Scary Painting":
      return require("../assets/icons/art/ScaryPainting.jpg");
    case "Scenic Painting":
      return require("../assets/icons/art/ScenicPainting.jpg");
    case "Serene Painting":
      return require("../assets/icons/art/SerenePainting.jpg");
    case "Sinking Painting":
      return require("../assets/icons/art/SinkingPainting.jpg");
    case "Solemn Painting":
      return require("../assets/icons/art/SolemnPainting.jpg");
    case "Twinkling Painting":
      return require("../assets/icons/art/TwinklingPainting.jpg");
    case "Warm Painting":
      return require("../assets/icons/art/WarmPainting.jpg");
    case "Wild Painting Left Half":
      return require("../assets/icons/art/WildPaintingLeftHalf.jpg");
    case "Wild Painting Right Half":
      return require("../assets/icons/art/WildPaintingRightHalf.jpg");
    case "Wistful Painting":
      return require("../assets/icons/art/WistfulPainting.jpg");
    default:
      return "none";
  }
}

export function getPaintingPhotoFake(name){
  switch(name){
    case "Academic Painting":
      return require("../assets/icons/art/AcademicPaintingFake.jpg");
    case "Amazing Painting":
      return require("../assets/icons/art/AmazingPaintingFake.jpg");
    case "Basic Painting":
      return require("../assets/icons/art/BasicPaintingFake.jpg");
    case "Detailed Painting":
      return require("../assets/icons/art/DetailedPaintingFake.jpg");
    case "Famous Painting":
      return require("../assets/icons/art/FamousPaintingFake.jpg");
    case "Graceful Painting":
      return require("../assets/icons/art/GracefulPaintingFake.jpg");
    case "Jolly Painting":
      return require("../assets/icons/art/JollyPaintingFake.jpg");
    case "Moving Painting":
      return require("../assets/icons/art/MovingPaintingFake.jpg");
    case "Quaint Painting":
      return require("../assets/icons/art/QuaintPaintingFake.jpg");
    case "Scary Painting":
      return require("../assets/icons/art/ScaryPaintingFake.jpg");
    case "Scenic Painting":
      return require("../assets/icons/art/ScenicPaintingFake.jpg");
    case "Serene Painting":
      return require("../assets/icons/art/SerenePaintingFake.jpg");
    case "Solemn Painting":
      return require("../assets/icons/art/SolemnPaintingFake.jpg");
    case "Wild Painting Left Half":
      return require("../assets/icons/art/WildPaintingLeftHalfFake.jpg");
    case "Wild Painting Right Half":
      return require("../assets/icons/art/WildPaintingRightHalfFake.jpg");
    case "Wistful Painting":
      return require("../assets/icons/art/WistfulPaintingFake.jpg");
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