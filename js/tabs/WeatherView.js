import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";

const moment = require("moment");
const weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weatherData = require("../../data/forecast.json");

export default class WeatherView extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
    this.formatData = this.formatData.bind(this);
    this.formatItem = this.formatItem.bind(this);
    this.closest = this.closest.bind(this);
  }

  formatItem(item) {
    item.dt_moment = moment(item.dt * 1000);
    item.dt_week = weeks[item.dt_moment.weekday()];
    return item;
  }

  closest(num, arr) {
    var curr = arr[0].dt_moment.hours() + arr[0].dt_moment.minutes();
    var diff = Math.abs(num - curr);
    for (var i = 0; i < arr.length; i++) {
      var newdiff = Math.abs(num - (arr[i].dt_moment.hours() + arr[i].dt_moment.minutes()));
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[i];
      }
    }
    return curr;
  }

  formatData(list) {
    const now = moment();
    const target = now.hours() * 60 + now.minutes(); // 990
    let result = list.map(item => this.formatItem(item));
    let newResult = [];
    let uniqResult = [];
    for(var i = 0; i < result.length; i++) {
      var item = result[i];
      var index = item.dt_moment.date() - now.date();
      if (newResult[index] && newResult[index].length) {
        newResult[index].push(item);
      } else {
        newResult[index] = [item];
      }
    }
    for(var i = 0; i < newResult.length; i++) {
      uniqResult.push(this.closest(target, newResult[i]));
    }
    return uniqResult;
  }

  renderRow({ item }) {
    return (
      <TouchableOpacity style={styles.row} key={item.dt}>
        <Text style={styles.header} numberOfLines={1}>
          {item.dt_week}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.temp}>{item.main.temp}℃</Text>
          <Text style={styles.description}>{item.weather[0].description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.formatData(weatherData.list)}
          keyExtractor={item => item.dt}
          renderItem={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  list: {
    width: Dimensions.get("screen").width
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    color: "#032250",
    fontSize: 18
  },
  meta: {
    flexDirection: "column",
    alignItems: "flex-end"
  },
  temp: {
    color: "#000",
    fontSize: 20
  },
  description: {
    color: "#7F91A7",
    fontSize: 14
  }
});
