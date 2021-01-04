# react-native-infinite-masonry

React Native Masonry component with Infinite Scrolling. For a fully working example check [this repo](http://github.com/roj4s/react-native-masonry-gist). Also detailed explanations are presented in this [medium post](https://medium.com/@roj4s/react-native-masonry-with-infinite-scrolling-6104392f0ff4)

## Getting started

`$ npm install react-native-infinite-masonry --save`

 or with yarn:

`$ yarn add react-native-infinite-masonry`

## Usage

For a fully working example check [this repo](http://github.com/roj4s/react-native-masonry-gist). Also a detailed explanation is presented in this [medium post](https://medium.com/@roj4s/react-native-masonry-with-infinite-scrolling-6104392f0ff4)

```javascript
import Masonry from 'react-native-infinite-masonry';

...

export default function App() {

  return (
    <SafeAreaView style={styles.container}>
      <Masonry
        itemsProvider={dataItemProvider}
        renderItem={Item}
        pageSize={10}
      />
    </SafeAreaView>
 );
}

```
Two properties has to be set for this component to work properly, namely: itemsProvider and renderItem. The former is a function that returns data information used by the later to render items inside masonry. Find below an example for those properties.


```javascript

function Item(dataItem, key){

  return (
    <View
      key={key}
      style={{
          ...styles.card,
          height: dataItem.height
      }}
      >
      <Image
        style={styles.img}
        source={{uri: dataItem.image_url}}
        />
    </View>
    );
}

function dataItemProvider(pageSize=10){

  return [...Array(pageSize).keys()].map((i) => {
    return {
      image_url: `https://i.picsum.photos/id/${parseInt(Math.random() * 200)}/300/400.jpg`,
      height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
      key:i
      };
    });

}

```
