<h1 align="center" style="font-size:28px; line-height:1"><b>ACNH Pocket Guide</b></h1>

<div align="center" style="font-size:18px">

| 170K+ Downloads | 4.5K+ Reviews | 4.9+ Stars |
| :-------------: | :---------: | :--------: |

</div>

<a href="https://play.google.com/store/apps/details?id=com.acnh.pocket_guide">
  <div align="center">
    <img alt="Icon" src="Promotional/icon.png" width="200px">
  </div>
</a>
<a href="https://play.google.com/store/apps/details?id=com.acnh.pocket_guide">
  <div align="center">
    <img alt="Icon" src="Promotional/google-play-badge.png" width="200px">
  </div>
</a>

With a modern and well polished design, ACNH Pocket Guide is the best guide for tracking your collection as you progress through the game. View information on collectibles and creatures, as well as upcoming in game events. With the latest game information, this is the one stop for all your ACNH needs!

## Official Website
The official website can be found here: https://acnh-pocket.web.app/. The repository of this website is open source and can be found here: https://github.com/jameskokoska/ACNH-Pocket-Guide-Website.

## Motivation

This application is a rewrite of the <a href=https://github.com/jameskokoska/AnimalCrossingNH-App>original</a> from scratch in React Native.

The goal of this rewrite is to make a more modular application that can be updated easier. The original app written in Flutter had various bugs relating to asynchronous function calls, reactive component layouts, and lacked a modular design with much repetitive code. After learning ReactJS, this project was started.

Since this application is written in React Native, support for an iOS app is possible but untested.

Many applications already existing provide a lack of features and intuitive UI layouts. I wanted to create a free application with no advertisements to create a pleasant user experience.

## Languages and Translations

All translations have been created from the help of volunteers listed within the application.

The list of translations can be seen here: https://docs.google.com/spreadsheets/d/1ZslDgBkPNj2kBDnSLFNl7FIFCX3_R29UMCVoC_WuzOM/edit?usp=sharing

Supported Languages:
* English
* English (Europe)
* French
* French (Quebec)
* Spanish
* Spanish (US)
* German
* Russian
* Italian
* Dutch
* Chinese
* Portuguese (Items not translated) 
* Czech (Items not translated)
* Slovak (Items not translated)
* Chinese (Traditional) (Not fully supported, incomplete)
* Korean (Not fully supported, incomplete)
* Japanese (Not fully supported, incomplete)

## Install and Run Application Locally

~~This application uses Expo and React Native. Install expo. Navigate into the `animal_crossing_app` folder (using `cd .\animal_crossing_app\`) repositories root location. Then install dependencies using `npm install`. After installing packages use `npm start` or `expo start`. Open the Expo development application on android device and connect through the localhost on the local network.~~

As of https://github.com/jameskokoska/AnimalCrossingNH-App-React/commit/b0d74f0b021478e57d1ab66499a81d4b60e783d0, this app is now ejected from expo and runs using the bare workflow. Instructions to run the app locally are more complicated resulting from the support of native modules. You can read more about ejecting an application here: https://docs.expo.dev/workflow/customizing/.

First, create a development build of the application. More information can be found here: https://docs.expo.dev/development/create-development-builds/. This can be built locally or using EAS by Expo.

Second, install the development build on your device.

Third, Run `expo start --dev-client` within the `animal_crossing_app` folder (using `cd .\animal_crossing_app\` in the repositories root location).

Fourth, type the IP address into the development build running on your device.

The app should be loaded on the device in development mode. To start up the development environment again, the first and second steps can be skipped unless changes are made to the native modules.

## Technical Features

- Components for modular programming
- Read and save information to local storage
- Read information from large JSON database efficiently
- Easily change attributes of data to display with modular component arguments
- Optimization of lists views and database access
- Classes and functions to allow for modular programming page design
- UI planning for intuitive user flow in Adobe XD
- Responsive design and layout for different screen zoom levels (set in the operating system's settings)
- Preloads databases before application run to memory
- Automatically pre-generate filter definitions with developer setting based on data
- Filter definitions and filter definition generation during run time or read from pre-generated data (for efficiency)
- Multiple language support
- Cloud backups and user account creation using Firebase RTDB
- All data backup and restore
- Cache images during runtime to allow efficient scrolling
- Multiple island profiles
- Customize event notifications
- Custom collection lists
- Custom app global time setting offset

## Features

- Dark mode
- Modern and polished interface and design
- Unique animations
- Intuitive gesture actions and UI layout
- Upcoming events list + Villager birthdays
- Calendar and events list with visuals
- Daily event notifications
- Store hours
- Wishlist and custom collection lists
- Islander info profile
- Real vs Fake art
- Recipes and ingredients lists
- DIY recipe sources
- Active creatures list
- Creature tracking + fish shadows
- Museum collection tracking and art guide
- Villager information
- Furniture, Clothing, Flooring, Wallpaper collections
- Slider song collection
- Song player for Aircheck, Live, and Music Box songs
- Emoticon collection
- Construction tasks and costs
- Flower hybrids guide
- Gyroid collection
- New and recently collected items
- TV schedule
- Achievements
- Paradise planning checklist
- Everything/All items page
- Filtering items
- Searching items
- Global searching
- Hide images to prevent spoilers setting
- 24 hour time
- Custom time, for time travelling
- Haptic feedback configuration
- Materials page
- Letters page
- Loan tracking
- Catalog Scanning with `nook.lol` integration
- Profile home screen page
- Amiibo card collection
- Cloud backups using Firebase RTDB
- Auto backups to Firebase RTDB
- Island user profiles
- MeteoNook and FAQ Guide integration
- TurnipProphet integration
- ... and more!

## Screenshots

Can be seen here: https://play.google.com/store/apps/details?id=com.acnh.pocket_guide or below
| ![Screenshot 1](Promotional/1.jpg) | ![Screenshot 2](Promotional/2.jpg) | ![Screenshot 3](Promotional/3.jpg) |
| ------------- | ------------- | ------------- |
| ![Screenshot 4](Promotional/4.jpg) | ![Screenshot 5](Promotional/5.jpg) | ![Screenshot 6](Promotional/6.jpg) |
| ![Screenshot 7](Promotional/7.jpg) | ![Screenshot 8](Promotional/8.jpg) | ![Screenshot 9](Promotional/9.jpg) |
