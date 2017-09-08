import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
} from 'react-native';

export default class CurrentWeatherHeader extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={styles.city}>{this.props.city}</Text>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        
        <Text style={styles.temp}>{this.props.temp}℃</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: "space-between",
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height/2,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: "center",
  },
  temp: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    marginRight: 10,
  },
  city: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: 'transparent',
  },
});