import {Image, View} from "react-native";
import React, { Component } from "react";
import FastImage from "./FastImage";

export function getSizeImage(size){
  switch(size){
    case "0.5x1":
      return require("../assets/icons/sizes/0.5x1.png");
    case "1.5x1.5":
      return require("../assets/icons/sizes/1.5x1.5.png");
    case "1x0.5":
      return require("../assets/icons/sizes/1x0.5.png");
    case "1x1.5":
      return require("../assets/icons/sizes/1x1.5.png");
    case "1x1":
      return require("../assets/icons/sizes/1x1.png");
    case "1x2":
      return require("../assets/icons/sizes/1x2.png");
    case "2x0.5":
      return require("../assets/icons/sizes/2x0.5.png");
    case "2x1.5":
      return require("../assets/icons/sizes/2x1.5.png");
    case "2x1":
      return require("../assets/icons/sizes/2x1.png");
    case "2x2":
      return require("../assets/icons/sizes/2x2.png");
    case "3x1":
      return require("../assets/icons/sizes/3x1.png");
    case "3x2":
      return require("../assets/icons/sizes/3x2.png");
    case "3x3":
      return require("../assets/icons/sizes/3x3.png");
    default:
      return require("../assets/icons/sizes/size.png");
  }
}

export function getPhoto(name, fallback="", returnFalse=false){
  if(name===undefined){
    return require("../assets/icons/leaf.png");
  }
  switch(name){
    case "series5(1).jpg":
      return require("../assets/icons/amiibo/Series5(1).jpg")
    case "series5(2).jpg":
      return require("../assets/icons/amiibo/Series5(2).jpg")
    case "series5(3).jpg":
      return require("../assets/icons/amiibo/Series5(3).jpg")
    case "series5(4).jpg":
      return require("../assets/icons/amiibo/Series5(4).jpg")
    case "series5(5).jpg":
      return require("../assets/icons/amiibo/Series5(5).jpg")
    case "series5(6).jpg":
      return require("../assets/icons/amiibo/Series5(6).jpg")
    case "series5(7).jpg":
      return require("../assets/icons/amiibo/Series5(7).jpg")
    case "series5(8).jpg":
      return require("../assets/icons/amiibo/Series5(8).jpg")
    case "series5(9).jpg":
      return require("../assets/icons/amiibo/Series5(9).jpg")
    case "series5(10).jpg":
      return require("../assets/icons/amiibo/Series5(10).jpg")
    case "series5(11).jpg":
      return require("../assets/icons/amiibo/Series5(11).jpg")
    case "series5(12).jpg":
      return require("../assets/icons/amiibo/Series5(12).jpg")
    case "series5(13).jpg":
      return require("../assets/icons/amiibo/Series5(13).jpg")
    case "series5(14).jpg":
      return require("../assets/icons/amiibo/Series5(14).jpg")
    case "series5(15).jpg":
      return require("../assets/icons/amiibo/Series5(15).jpg")
    case "series5(16).jpg":
      return require("../assets/icons/amiibo/Series5(16).jpg")
    case "series5(17).jpg":
      return require("../assets/icons/amiibo/Series5(17).jpg")
    case "series5(18).jpg":
      return require("../assets/icons/amiibo/Series5(18).jpg")
    case "series5(19).jpg":
      return require("../assets/icons/amiibo/Series5(19).jpg")
    case "series5(20).jpg":
      return require("../assets/icons/amiibo/Series5(20).jpg")
    case "series5(21).jpg":
      return require("../assets/icons/amiibo/Series5(21).jpg")
    case "series5(22).jpg":
      return require("../assets/icons/amiibo/Series5(22).jpg")
    case "series5(23).jpg":
      return require("../assets/icons/amiibo/Series5(23).jpg")
    case "series5(24).jpg":
      return require("../assets/icons/amiibo/Series5(24).jpg")
    case "series5(25).jpg":
      return require("../assets/icons/amiibo/Series5(25).jpg")
    case "series5(26).jpg":
      return require("../assets/icons/amiibo/Series5(26).jpg")
    case "series5(27).jpg":
      return require("../assets/icons/amiibo/Series5(27).jpg")
    case "series5(28).jpg":
      return require("../assets/icons/amiibo/Series5(28).jpg")
    case "series5(29).jpg":
      return require("../assets/icons/amiibo/Series5(29).jpg")
    case "series5(30).jpg":
      return require("../assets/icons/amiibo/Series5(30).jpg")
    case "series5(31).jpg":
      return require("../assets/icons/amiibo/Series5(31).jpg")
    case "series5(32).jpg":
      return require("../assets/icons/amiibo/Series5(32).jpg")
    case "series5(33).jpg":
      return require("../assets/icons/amiibo/Series5(33).jpg")
    case "series5(34).jpg":
      return require("../assets/icons/amiibo/Series5(34).jpg")
    case "leaf.png":
      return require("../assets/icons/leaf.png");
    case "glowingHole.png":
      return require("../assets/icons/glowingHole.png");
    case "crack.png":
      return require("../assets/icons/crack.png");
    case "villager.png":
      return require("../assets/icons/villager.png");
    case "villager2.png":
      return require("../assets/icons/villager2.png");
    case "villager3.png":
      return require("../assets/icons/villager3.png");
    case "villager4.png":
      return require("../assets/icons/villager4.png");
    case "villager5.png":
      return require("../assets/icons/villager5.png");
    case "villager6.png":
      return require("../assets/icons/villager6.png");
    case "villager7.png":
      return require("../assets/icons/villager7.png");
    case "villager8.png":
      return require("../assets/icons/villager8.png");
    case "dice.png":
      return require("../assets/icons/dice.png");
    case "confettiBall.png":
      return require("../assets/icons/confettiBall.png");
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
    case "niko.png":
      return require("../assets/icons/niko.png");
    case "wardell.png":
      return require("../assets/icons/wardell.png");
    case "tortimer.png":
      return require("../assets/icons/tortimer.png");
    case "redd.png":
      return require("../assets/icons/redd.png");
    case "leif.png":
      return require("../assets/icons/leif.png");
    case "kicks.png":
      return require("../assets/icons/kicks.png");
    case "harriet.png":
      return require("../assets/icons/harriet.png");
    case "katrina.png":
      return require("../assets/icons/katrina.png");
    case "daisymae.png":
      return require("../assets/icons/daisymae.png");
    case "lottie.png":
      return require("../assets/icons/lottie.png");
    case "whisp.png":
      return require("../assets/icons/whisp.png");
    case "gulivarrr.png":
      return require("../assets/icons/gulivarrr.png");
    case "flick.png":
      return require("../assets/icons/flick.png");
    case "cj.png":
      return require("../assets/icons/cj.png");
    case "brewster.png":
      return require("../assets/icons/brewster.png");
    case "gyroid.png":
      return require("../assets/icons/gyroid.png");
    case "coffee.png":
      return require("../assets/icons/coffee.png");
    case "kapp.png":
      return require("../assets/icons/kapp.png");
    case "harvey.png":
      return require("../assets/icons/harvey.png");
    case "brewster.png":
      return require("../assets/icons/brewster.png");
    case "nookShopping.png":
      return require("../assets/icons/nookShopping.png");
    case "recycle.png":
      return require("../assets/icons/recycle.png");
    case "suitcase.png":
      return require("../assets/icons/suitcase.png");
    case "airplane.png":
      return require("../assets/icons/airplane.png");
    case "cooking.png":
      return require("../assets/icons/cooking.png");
    case "balloon.png":
      return require("../assets/icons/balloon.png");
    case "sparkle.png":
      return require("../assets/icons/sparkle.png");
    case "ship.png":
      return require("../assets/icons/ship.png");
    case "flowerIcon.png":
      return require("../assets/icons/flowerIcon.png");
    case "rock.png":
      return require("../assets/icons/rock.png");
    case "bellBag.png":
      return require("../assets/icons/bellBag.png");
    case "bell.png":
      return require("../assets/icons/bell.png");
    case "coin.png":
      return require("../assets/icons/coin.png");
    case "flower.png":
      return require("../assets/icons/flower.png");
    case "diyKit.png":
      return require("../assets/icons/diyKit.png");
    case "bulb.png":
      return require("../assets/icons/bulb.png");
    case "octopus.png":
      return require("../assets/icons/octopus.png");
    case "hourglass.png":
      return require("../assets/icons/hourglass.png");
    case "weather.png":
      return require("../assets/icons/weather.png");
    case "alarmClock.png":
      return require("../assets/icons/alarmClock.png");
    case "pascal.png":
      return require("../assets/icons/pascal.png");
    case "loid.png":
      return require("../assets/icons/loid.png");
    case "recipe.png":
      return require("../assets/icons/recipe.png");
    case "cookingRecipe.png":
      return require("../assets/icons/cookingRecipe.png");
    case "recipes.png":
      return require("../assets/icons/recipes.png");
    case "treasureMap.png":
      return require("../assets/icons/treasureMap.png");
    case "cyrus.png":
      return require("../assets/icons/cyrus.png");
    case "tool-box.png":
      return require("../assets/icons/tool-box.png");
    case "clothing-shop.png":
      return require("../assets/icons/clothing-shop.png");
    case "clothes-rack.png":
      return require("../assets/icons/clothes-rack.png");
    case "school.png":
      return require("../assets/icons/school.png");
    case "cage.png":
      return require("../assets/icons/cage.png");
    case "restaurant.png":
      return require("../assets/icons/restaurant.png");
    case "cafe.png":
      return require("../assets/icons/cafe.png");
    case "hospital-building.png":
      return require("../assets/icons/hospital-building.png");
    case "nookOwner.png":
      return require("../assets/icons/nookOwner.png");
    case "sable.png":
      return require("../assets/icons/sable.png");
    case "label.png":
      return require("../assets/icons/label.png");
    case "mabel.png":
      return require("../assets/icons/mabel.png");
    case "kk.png":
      return require("../assets/icons/kk.png");
    case "blathers.png":
      return require("../assets/icons/blathers.png");
    case "celeste.png":
      return require("../assets/icons/celeste.png");
    case "isabelle.png":
      return require("../assets/icons/isabelle.png");
    case "reese.png":
      return require("../assets/icons/reese.png");
    case "tommy.png":
      return require("../assets/icons/tommy.png");
    case "rover.png":
      return require("../assets/icons/rover.png");
    case "gulliver.png":
      return require("../assets/icons/gulliver.png");
  }
  if(name.includes("bamboo")){
    return require("../assets/icons/bamboo.png");
  } else if(name.includes("may day")){
    return require("../assets/icons/treasureMap.png");
  } else if(name.includes("shamrock")){
    return require("../assets/icons/shamrock.png");
  } else if(name.includes("rainy")){
    return require("../assets/icons/rainy.png");
  } else if(name.includes("sunny")){
    return require("../assets/icons/sunny.png");
  } else if(name.includes("snowy")){
    return require("../assets/icons/snowy.png");
  }else if(name.includes("ophiuchus")){
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
  } else if(name.includes("nookLinkCoin")) {
    return require("../assets/icons/nookLinkCoin.png")
  } else if(name.includes("acorns")){
    return require("../assets/icons/fall.png");
  } else if(name.includes("snowflakes")){
    return require("../assets/icons/snowman.png");
  } else if(name.includes("snow")){
    return require("../assets/icons/snow.png");
  } else if(name.includes("toy")&&name.includes("ready")){
    return require("../assets/icons/present.png");
  } else if(name.includes("toy")){
    return require("../assets/icons/santa.png");
  } else if(name.includes("turkey")){
    return require("../assets/icons/corn.png");
  } else if(name.includes("nook friday")){
    return require("../assets/icons/pricetag.png");
  } else if(name.includes("lunar")){
    return require("../assets/icons/fullmoon.png");
  } else if(name.includes("new year's eve") && !name.includes("year of the")) {
    return require("../assets/icons/popper.png")
  } else if(name.includes("new year") && !name.includes("year of the")){
    return require("../assets/icons/confettiBall.png");
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
  } else if(name.includes("winter")){
    return require("../assets/icons/snowy.png");
  } else if(name.includes("fall")){
    return require("../assets/icons/fall.png");
  }  else if(name.includes("spring")){
    return require("../assets/icons/flower.png");
  } else if(name.includes("bunny")){
    return require("../assets/icons/bunny.png");
  } else if(name.includes("halloween")){
    return require("../assets/icons/pumpkin.png");
  } else if(name.includes("pumpkin")){
    return require("../assets/icons/pumpkin.png");
  } else if(name.includes("valentine")){
    return require("../assets/icons/heart.png");
  } else if(name.includes("countdown")){
    return require("../assets/icons/popper.png");
  } else if(name.includes("nature")){
    return require("../assets/icons/butterflies.png");
  } else if(name.includes("birthday")){
    return require("../assets/icons/birthdayCake.png");
  } else if(name.includes("wedding")){
    return require("../assets/icons/birthdayCake.png");
  } else if(name.includes("museum") || name.includes("blathers")){
    return require("../assets/icons/museum.png");
  } else if(name.includes("ornaments")){
    return require("../assets/icons/ornaments.png");
  } else if(name.includes("rainbow feathers")){
    return require("../assets/icons/ornaments.png");
  } else if(name.includes("sea") && !name.includes("seasonal") || name.includes("shoreline") || name.includes("beach")) {
    return require("../assets/icons/oceanIcon.png")
  } else if(name.includes("pier")) {
    return require("../assets/icons/pier.png");
  } else if(name.includes("underwater")) {
    return require("../assets/icons/underwater.png");
  } else if(name.includes("river")) {
    return require("../assets/icons/riverIcon.png");
  } else if(name.includes("pond") || name.includes("water")) {
    return require("../assets/icons/pondIcon.png");
  } else if(name.includes("flying")) {
    return require("../assets/icons/butterflies.png")
  } else if(name.includes("flowers") || name.includes("breeding") || name.includes("seed")) {
    return require("../assets/icons/flowerIcon.png")
  } else if(name.includes("rock")) {
    return require("../assets/icons/rock.png")
  } else if(name.includes("friendship")) {
    return require("../assets/icons/heart.png")
  } else if(name.includes("turnip")) {
    return require("../assets/icons/turnip.png")
  } else if(name.includes("stump")) {
    return require("../assets/icons/stump.png")
  } else if(name.includes("palm")) {
    return require("../assets/icons/palmTree.png")
  } else if(name.includes("tree")) {
    return require("../assets/icons/forest.png");
  } else if(name.includes("ground")) {
    return require("../assets/icons/sprout.png")
  } else if(name.includes("snowballs") || name.includes("jingle")) {
    return require("../assets/icons/snow.png")
  } else if(name.includes("snowboy")) {
    return require("../assets/icons/snowman.png")
  } else if(name.includes("villagers")) {
    return require("../assets/icons/cat.png")
  } else if(name.includes("rover")) {
    return require("../assets/icons/rover.png")
  } else if(name.includes("fossil") || name.includes("dig") || name.includes("plant")) {
    return require("../assets/icons/digIcon.png")
  } else if(name.includes("able")) {
    return require("../assets/icons/able.png")
  } else if(name.includes("pascal")) {
    return require("../assets/icons/pascal.png")
  } else if(name.includes("nook miles")) {
    return require("../assets/icons/miles.png")
  } else if(name.includes("nooklink")) {
    return require("../assets/icons/nookLink.png")
  } else if(name.includes("nook shopping")) {
    return require("../assets/icons/nookShopping.png")
  } else if(name.includes("airline")) {
    return require("../assets/icons/airplane.png")
  } else if(name.includes("nook")) {
    return require("../assets/icons/nook.png")
  } else if(name.includes("crafting")) {
    return require("../assets/icons/crafting.png")
  } else if(name.includes("cooking")) {
    return require("../assets/icons/cooking.png")
  } else if(name.includes("gulliver")) {
    return require("../assets/icons/oceanIcon.png")
  } else if(name.includes("blathers")) {
    return require("../assets/icons/museum.png")
  } else if(name.includes("brewster")) {
    return require("../assets/icons/brewster.png")
  } else if(name.includes("kicks")) {
    return require("../assets/icons/kicks.png")
  } else if(name.includes("daisy mae")) {
    return require("../assets/icons/daisymae.png")
  } else if(name.includes("cyrus")) {
    return require("../assets/icons/cyrus.png")
  } else if(name.includes("katrina")) {
    return require("../assets/icons/katrina.png")
  } else if(name.includes("redd")) {
    return require("../assets/icons/redd.png")
  } else if(name.includes("lottie") || name.includes("hhp office")) {
    return require("../assets/icons/lottie.png")
  } else if(name.includes("leif")) {
    return require("../assets/icons/leif.png")
  } else if(name.includes("niko")) {
    return require("../assets/icons/niko.png")
  } else if(name.includes("wardell")) {
    return require("../assets/icons/wardell.png")
  } else if(name.includes("harriet")) {
    return require("../assets/icons/harriet.png")
  } else if(name.includes("harvey")) {
    return require("../assets/icons/harvey.png")
  } else if(name.includes("café")) {
    return require("../assets/icons/cafe.png")
  } else if(name.includes("saharah")) {
    return require("../assets/icons/saharah.png")
  } else if(name.includes("balloons")) {
    return require("../assets/icons/balloon.png")
  } else if(name.includes("stars")) {
    return require("../assets/icons/sparkle.png")
  } else if(name.includes("prom")) {
    return require("../assets/icons/sparkle.png")
  } else if(name.includes("singmogil")) {
    return require("../assets/icons/forest.png")
  } else if(name.includes("children")) {
    return require("../assets/icons/toys.png")
  } else if(name.includes("mother")) {
    return require("../assets/icons/blossom.png")
  } else if(name.includes("cheese")) {
    return require("../assets/icons/cheese.png")
  } else if(name.includes("father")) {
    return require("../assets/icons/tie.png")
  } else if(name.includes("marine")) {
    return require("../assets/icons/shipWheel.png")
  } else if(name.includes("tomato")) {
    return require("../assets/icons/tomato.png")
  } else if(name.includes("moon")) {
    return require("../assets/icons/fullmoon.png")
  } else if(name.includes("cowboy")) {
    return require("../assets/icons/cowboy.png")
  } else if(name.includes("grape")) {
    return require("../assets/icons/grapes.png")
  } else if(name.includes("lantern")) {
    return require("../assets/icons/lantern.png")
  } else if(name.includes("π")) {
    return require("../assets/icons/pi.png")
  } else if(name.includes("recipe")) {
    return require("../assets/icons/crafting.png")
  } else if(name.includes("diy")) {
    return require("../assets/icons/crafting.png")
  } else if(name.includes("jack")) {
    return require("../assets/icons/pumpkin.png")
  } else if(name.includes("zipper")) {
    return require("../assets/icons/bunny.png")
  } else if(name.includes("treasure trawler")) {
    return require("../assets/icons/ship.png")
  } else if(name.includes("c.j.")) {
    return require("../assets/icons/cj.png")
  } else if(name.includes("flick")) {
    return require("../assets/icons/flick.png")
  } else if(name.includes("fish") || name.includes("catching")) {
    return require("../assets/icons/fish.png")
  } else if(name.includes("net")) {
    return require("../assets/icons/airIcon.png")
  } else if(name.includes("female")) {
    return require("../assets/icons/female.png")
  } else if(name.includes("male")) {
    return require("../assets/icons/male.png")
  } else if(name.includes("recycle")) {
    return require("../assets/icons/recycle.png")
  }
  if(fallback.includes("blooming season")){
    return require("../assets/icons/flowerIcon.png");
  } else if(fallback.includes("season")){
    return require("../assets/icons/season.png");
  } else if(fallback.includes("shopping")){
    if(returnFalse){
      return false
    } else {
      return require("../assets/icons/nookShopping.png");
    }
  }
  return require("../assets/icons/leaf.png");
}

export function getPhotoCorner(name){
  if(name===undefined){
    return <View/>;
  } else {
    name = name.toString().toLowerCase();
  }
  if(name.includes("sea") && !name.includes("seasonal") || name.includes("shoreline") || name.includes("beach"))
    return <Image source={require("../assets/icons/oceanIcon.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>
  else if(name.includes("pier"))
    return <Image source={require("../assets/icons/pier.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>;
  else if(name.includes("underwater"))
    return <Image source={require("../assets/icons/underwater.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
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
  else if(name.includes("friendship"))
    return <Image source={require("../assets/icons/heart.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("turnip"))
    return <Image source={require("../assets/icons/turnip.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("stump"))
    return <Image source={require("../assets/icons/stump.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("palm"))
    return <Image source={require("../assets/icons/palmTree.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("tree"))
    return <Image source={require("../assets/icons/forest.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>;
  else if(name.includes("ground"))
    return <Image source={require("../assets/icons/sprout.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("snowballs") || name.includes("jingle"))
    return <Image source={require("../assets/icons/snow.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("snowboy"))
    return <Image source={require("../assets/icons/snowman.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("villagers"))
    return <Image source={require("../assets/icons/cat.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("rover"))
    return <Image source={require("../assets/icons/rover.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("fossil") || name.includes("dig") || name.includes("plant"))
    return <Image source={require("../assets/icons/digIcon.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("able"))
    return <Image source={require("../assets/icons/able.png")} style={{height: 60, width: 60, resizeMode:'contain'}}/>;
  else if(name.includes("pascal"))
    return <Image source={require("../assets/icons/pascal.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("nook miles"))
    return <Image source={require("../assets/icons/miles.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("nooklink"))
    return <Image source={require("../assets/icons/nookLink.png")} style={{height: 56, width: 56, resizeMode:'contain'}}/>;
  else if(name.includes("nook shopping"))
    return <Image source={require("../assets/icons/nookShopping.png")} style={{height: 56, width: 56, resizeMode:'contain'}}/>;
  else if(name.includes("airline"))
    return <Image source={require("../assets/icons/airplane.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("nook"))
    return <Image source={require("../assets/icons/nook.png")} style={{height: 55, width: 55, resizeMode:'contain'}}/>;
  else if(name.includes("crafting"))
    return <Image source={require("../assets/icons/crafting.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("cooking"))
    return <Image source={require("../assets/icons/cooking.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("gulliver"))
    return <Image source={require("../assets/icons/oceanIcon.png")} style={{height: 75, width: 75, borderRadius: 100, resizeMode:'contain'}}/>
  else if(name.includes("blathers"))
    return <Image source={require("../assets/icons/museum.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("brewster"))
    return <Image source={require("../assets/icons/brewster.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("kicks"))
    return <Image source={require("../assets/icons/kicks.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("daisy mae"))
    return <Image source={require("../assets/icons/daisymae.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("cyrus"))
    return <Image source={require("../assets/icons/cyrus.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("k.k."))
    return <FastImage source={{uri:"https://acnhcdn.com/latest/NpcIcon/tkkA.png"}} cacheKey={"https://acnhcdn.com/latest/NpcIcon/tkkA.png"} style={{height: 50, width: 50, resizeMode:'contain'}}/>;
  else if(name.includes("katrina"))
    return <Image source={require("../assets/icons/katrina.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("redd"))
    return <Image source={require("../assets/icons/redd.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("lottie") || name.includes("hhp office"))
    return <Image source={require("../assets/icons/lottie.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("leif"))
    return <Image source={require("../assets/icons/leif.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("niko"))
    return <Image source={require("../assets/icons/niko.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("wardell"))
    return <Image source={require("../assets/icons/wardell.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("harriet"))
    return <Image source={require("../assets/icons/harriet.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("harvey"))
    return <Image source={require("../assets/icons/harvey.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("café"))
    return <Image source={require("../assets/icons/cafe.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>;
  else if(name.includes("celeste"))
    return <FastImage source={{uri:"https://acnhcdn.com/latest/NpcIcon/ows.png"}} cacheKey={"https://acnhcdn.com/latest/NpcIcon/ows.png"} style={{height: 55, width: 55, resizeMode:'contain'}}/>;
  else if(name.includes("new year"))
    return <Image source={require("../assets/icons/popper.png")} style={{height: 45, width: 45, resizeMode:'contain'}}/>
  else if(name.includes("saharah"))
    return <Image source={require("../assets/icons/saharah.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("balloons"))
    return <Image source={require("../assets/icons/balloon.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("stars"))
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
    return <Image source={require("../assets/icons/cj.png")} style={{height: 44, width: 44, resizeMode:'contain'}}/>
  else if(name.includes("flick"))
    return <Image source={require("../assets/icons/flick.png")} style={{height: 44, width: 44, resizeMode:'contain'}}/>
  else if(name.includes("fish") || name.includes("catching"))
    return <Image source={require("../assets/icons/fish.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("net"))
    return <Image source={require("../assets/icons/airIcon.png")} style={{height: 50, width: 50, resizeMode:'contain'}}/>
  else if(name.includes("female"))
    return <Image source={require("../assets/icons/female.png")} style={{height: 40, width: 40, resizeMode:'contain'}}/>
  else if(name.includes("male"))
    return <Image source={require("../assets/icons/male.png")} style={{height: 37, width: 37, resizeMode:'contain'}}/>
  else if(name.includes("recycle"))
    return <Image source={require("../assets/icons/recycle.png")} style={{height: 40, width: 40, resizeMode:'contain'}}/>
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

export function convertImagesToMaterialImageFormat(images){
  let output = []
  for(let item of images){
    let currentItem = {}
    currentItem["image"] = item
    currentItem["name"] = item
    output.push(currentItem)
  }
  return output
}

export function getAllMaterialImages(dataLoaded, imageProperty){
  let output = []
  for(let database of dataLoaded){
    for(let item of database){
      if(item[imageProperty]!==undefined && item[imageProperty]!=="NA"){
        let currentItem = {}
        currentItem["image"] = item[imageProperty]
        currentItem["name"] = item["NameLanguage"]
        output.push(currentItem)
      }
    }
  }
  return output
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
  var data = require("../assets/data/DataCreated/Other.json");
  if(reduceComplexity){
    materialStripped = materialStripped.toString().replace("-","").toLowerCase();
    materialStripped = materialStripped.toString().replace(" ","");
    for(var index = 0; index < data.length; index++){
      var dataStripped = data[index]["Name"];
      dataStripped = dataStripped.replace("-","");
      dataStripped = dataStripped.replace(" ","").toLowerCase();
      if(dataStripped===materialStripped){
        return data[index]["Inventory Image"]
      }
    }
    return checkMoreMaterials(material);
  } else {
    for(var index = 0; index < data.length; index++){
      if(data[index]["Name"]===material){
        return data[index]["Inventory Image"]
      }
    }
    return checkMoreMaterials(material);
  } 
}

function checkMoreMaterials(material){
  // let foodPhoto = getFoodPhoto(material,"couldn't find")
  // if(foodPhoto !== "couldn't find"){
  //   return foodPhoto
  // }

  let fishPhoto = getFishPhoto(material,"couldn't find")
  if(fishPhoto !== "couldn't find"){
    return fishPhoto
  }

  return ""
}

export function getPaintingPhotoFake(name){
  // console.log(name)
  var data = require("../assets/data/DataCreated/Artwork.json");
  for(var index = 0; index < data.length; index++){
    if(data[index]["Name"]===name && data[index]["Genuine"]==="No"){
      if(data[index]["High-Res Texture"]!=="NA")
        return data[index]["High-Res Texture"]
      else
        return data[index]["Image"]
    }
  }
  return "none";
}

// export function getFoodPhoto(name, defaultImg){
//   var data = require("../assets/data/DataCreated/Food.json");
//   for(var index = 0; index < data.length; index++){
//     if(data[index]["Name"]===name){
//       return data[index]["Image"]
//     }
//   }
//   return defaultImg;
// }

export function getFishPhoto(name, defaultImg){
  var data = require("../assets/data/DataCreated/Fish.json");
  for(var index = 0; index < data.length; index++){
    if(data[index]["Name"]===name){
      return data[index]["Icon Image"]
    }
  }
  data = require("../assets/data/DataCreated/Sea Creatures.json");
  for(var index = 0; index < data.length; index++){
    if(data[index]["Name"]===name){
      return data[index]["Icon Image"]
    }
  }
  return defaultImg;
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