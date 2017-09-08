import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from 'react-native';

export default class CurrentWeather extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../img/b1.png')} />
        <Text style={styles.title}>{this.props.title.charAt(0).toUpperCase() + this.props.title.slice(1)}</Text>
        <Text style={styles.city}>{this.props.city}</Text>
        <Text style={styles.temp}>{this.props.temp}℃</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height/2,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  temp: {
    fontSize: 34,
    color: '#fff',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
  city: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    backgroundColor: 'transparent',
    top: -40,
  },
});