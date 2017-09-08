import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Modal,
  WebView
} from "react-native";

const URL =
  "https://api.rss2json.com/v1/api.json?rss_url=https://informburo.kz/xml/rss.xml";
const newsData = require("../../data/news.json");

export default class NewsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      modalVisible: false,
      activeItem: null
    };
    this.closeModal = this.closeModal.bind(this);
    this.showItem = this.showItem.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  componentWillMount() {
    fetch(URL)
      .then(response => response.json())
      .then(list => this.setState({ list }));
  }

  showItem(item) {
    this.setState({ modalVisible: true, activeItem: item });
  }

  renderRow({ item }) {
    return (
      <TouchableOpacity
        style={styles.row}
        key={item.guid}
        onPress={() => this.showItem(item)}
      >
        <Text style={styles.header} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    );
  }

  closeModal() {
    this.setState({ modalVisible: false, activeItem: null });
  }

  render() {
    console.log(this.state.list.items);
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.list.items}
          keyExtractor={item => item.guid}
          renderItem={this.renderRow}
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={styles.modal}>
            <TouchableHighlight onPress={this.closeModal} style={styles.close}>
              <Text style={styles.closeTxt}>Close</Text>
            </TouchableHighlight>
            {this.state.activeItem &&
              <WebView
                source={{ uri: this.state.activeItem.link }}
                style={styles.web}
              />}
          </View>
        </Modal>
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
  list: {},
  row: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  header: {
    color: "#032250",
    fontSize: 18
  },
  description: {
    color: "#7F91A7",
    fontSize: 14
  },
  modal: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    zIndex: 100
  },
  closeTxt: {
    padding: 10
  },
  web: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  }
});
