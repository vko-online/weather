import React, {Component} from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const FULL_WIDTH = Dimensions.get('screen').width;
const motivationData = require('../../data/quotes.json');

export default class MotivationView extends Component {

  renderRow({item}) {
    return (
      <View style={styles.row} key={item.id}>
        <Image source={{uri: 'https://unsplash.it/300/200/?random'}} style={styles.image}/>
        <Text style={styles.text}>{item.title}</Text>
      </View>
    )
  }

  render() {

    const slides = motivationData.map((item, index) => {
        return (
            <View key={`entry-${index}`} style={styles.row}>
                <Image style={styles.image} source={{uri: 'https://unsplash.it/300/200/?random'}}/>
                <Text style={styles.text}>{ item.text }</Text>
                <Text style={styles.author}>{ item.author }</Text>
            </View>
        );
    });

    return (
      <View style={styles.container}>
        {/*<FlatList
          horizontal={true}
          keyExtractor={(item) => item.id}
          data={motivationData}
          renderItem={this.renderRow}
        />*/}
        <Carousel
          ref={(carousel) => { this._carousel = carousel; }}
          sliderWidth={FULL_WIDTH - 10}
          itemWidth={FULL_WIDTH}>
            { slides }
        </Carousel>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  row:{
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 10,
    color: '#fff',
    fontSize: 18,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  author: {
    backgroundColor: 'rgba(0,0,0,.5)',
    color: '#fff',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});