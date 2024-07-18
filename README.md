<h1 align="center" style="font-size:28px; line-height:1"><b>ACNH Pocket Guide</b></h1>

<div align="center" style="font-size:18px">

| 300K+ Downloads | 8.0K+ Reviews | 4.9+ Stars |
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
| ![Screenshot 1](Promotional/store/Frame%201.png) | ![Screenshot 2](Promotional/store/Frame%202.png) | ![Screenshot 3](Promotional/store/Frame%203.png) |
| ------------- | ------------- | ------------- |
| ![Screenshot 4](Promotional/store/Frame%204.png) | ![Screenshot 5](Promotional/store/Frame%205.png) | ![Screenshot 6](Promotional/store/Frame%206.png) |
| ![Screenshot 7](Promotional/store/Frame%207.png) | ![Screenshot 8](Promotional/store/Frame%208.png) | |


## Install and Run Application Locally

~~This application uses Expo and React Native. Install expo. Navigate into the `animal_crossing_app` folder (using `cd .\animal_crossing_app\`) repositories root location. Then install dependencies using `npm install`. After installing packages use `npm start` or `expo start`. Open the Expo development application on android device and connect through the localhost on the local network.~~

~~As of https://github.com/jameskokoska/AnimalCrossingNH-App-React/commit/b0d74f0b021478e57d1ab66499a81d4b60e783d0, this app is now ejected from expo and runs using the bare workflow. Instructions to run the app locally are more complicated resulting from the support of native modules. You can read more about ejecting an application here: https://docs.expo.dev/workflow/customizing/.~~

As of https://github.com/jameskokoska/ACNH-Pocket-Guide/commit/d6c499fe32791126f4854f1fe93e73d2ae5e1e54, this app is now using expo pre-build. You can read more about pre-build here: https://docs.expo.dev/workflow/prebuild/. Pre-build has replaced 'ejecting'. All native code is now generated by Expo pre-build from reading the configuration `app.json`.

First, create a development build of the application. More information can be found here: https://docs.expo.dev/development/create-development-builds/. This can be built locally or using EAS by Expo.

Second, install the development build on your device.

Third, navigate into the `animal_crossing_app` folder (using `cd .\animal_crossing_app\` in the repositories root location). Then install dependencies using `npm install`. Run `expo start --dev-client` within the `animal_crossing_app` folder.

Fourth, type the IP address into the development build running on your device.

The app should be loaded on the device in development mode. To start up the development environment again, the first and second steps can be skipped unless changes are made to the native modules.

## Create Local Builds With EAS
Reference: https://docs.expo.dev/build-reference/local-builds/

Note: This can only be done on Linux/MacOS. For Windows, WSL works. 

### WSL Quick Notes - (guide may be outdated at any point): 
* Install WSL: `wsl.exe --install -d Ubuntu`
* Install JS: https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl
* Install Android SDK: `apt-get install android-sdk`
    * Install the build tools and SDK corresponding to `animal_crossing_app/android/build.gradle` - `buildToolsVersion` and `targetSdkVersion`

### Running EAS Build

Note: files contained within `.gitignore` will not be uploaded/sent to be built with EAS. This includes the `firebaseConfig.js` and `sentryConfig.js`. Please make sure these files exist and are not within `.gitignore` otherwise the build will fail! 

* Make sure EAS is installed and follow this guide `https://docs.expo.dev/build/setup/`

0) Install dependencies `npm install`
1) Generate native code `npx expo prebuild`
2) Configure any updates `eas update:configure`
3) Build using EAS (Remove `--local` to build using expo build servers)
    * development: `npx eas build --profile development --platform android --local`
    * production: `eas build --platform android --local`

## Statistics
As of 3/13/2023:
`cloc --exclude-dir=node_modules .`
| Language     | files | blank | comment | code    |
|--------------|-------|-------|---------|---------|
| JSON         | 3003  | 0     | 0       | 7153353 |
| JavaScript   | 128   | 1412  | 1008    | 29309   |
| XML          | 125   | 1980  | 990     | 16716   |
| Text         | 5     | 0     | 0       | 7035    |
| Python       | 17    | 117   | 56      | 1274    |
| Java         | 8     | 68    | 95      | 395     |
| Gradle       | 3     | 44    | 153     | 255     |
| Markdown     | 3     | 42    | 0       | 142     |
| C++          | 4     | 25    | 15      | 101     |
| Bourne Shell | 1     | 27    | 108     | 99      |
| DOS Batch    | 1     | 21    | 2       | 66      |
| Properties   | 5     | 11    | 34      | 60      |
| C/C++ Header | 3     | 21    | 6       | 59      |
| make         | 1     | 9     | 12      | 27      |
| Starlark     | 1     | 2     | 1       | 16      |
| ProGuard     | 1     | 2     | 10      | 2       |
| SUM:         | 3309  | 3781  | 2490    | 7208909 |

