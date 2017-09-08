import React from "react";
import { StyleSheet, Text, View, Dimensions, Image, StatusBar } from "react-native";
const ScrollableTabView = require("react-native-scrollable-tab-view");
// import ParallaxScrollView from "react-native-parallax-scroll-view";
import ParallaxScroll from "@monterosa/react-native-parallax-scroll";
import MotivationView from "./js/tabs/MotivationView";
import NewsView from "./js/tabs/NewsView";
import WeatherView from "./js/tabs/WeatherView";
import CurrentWeather from './js/components/CurrentWeather';
import CurrentWeatherHeader from './js/components/CurrentWeatherHeader';

const weatherData = require('./data/weather.json');

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  get header() {
    return null;
    // return <CurrentWeatherHeader title="HOT LIKE SAUCE!" temp="34" city="Almaty"/>;
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ParallaxScroll
          parallaxHeight={300}
          fadeOutParallaxBackground={false}
          isBackgroundScalable={true}
          renderParallaxBackground={() => <CurrentWeather title={weatherData.weather[0].description} temp={weatherData.main.temp} city={weatherData.name}/>}
          parallaxBackgroundScrollSpeed={5}
          parallaxForegroundScrollSpeed={2.5}>
          <View style={styles.tabsContainer}>
            <StatusBar hidden={true}/>
            <ScrollableTabView style={styles.tabs}>
              <WeatherView tabLabel="Weather" />
              <NewsView tabLabel="News" />
              <MotivationView tabLabel="Motivation" />
            </ScrollableTabView>
          </View>
        </ParallaxScroll>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get('screen').width,
  },
  parallax: {
    flex: 1,
  },
  tabsContainer: {
    backgroundColor: '#fff',
    height: Dimensions.get("screen").height - 50,
  },
  tabs: {
    // height: Dimensions.get("screen").height / 2,
    width: Dimensions.get('screen').width,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  headerText: {},
  image: {
    height: 300,
    width: Dimensions.get('screen').width,
  },
});
