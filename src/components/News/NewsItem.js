import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableHighlight , Image, Linking } from 'react-native';

class NewsItem extends Component {

  render() {
    return (
      <TouchableHighlight  onPress={ () => {Linking.openURL(this.props.url)}} underlayColor="white">
        <View style={styles.newsItem}>
          <Text style={styles.summary}>{this.props.summary}</Text>
          <Image source={{uri: this.props.thumbnail}} style={styles.thumbnail} />
        </View>
      </TouchableHighlight >
    );
  }
}

const styles = StyleSheet.create({
  newsItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 5,
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 10,
    height: 140
  },
  thumbnail: {
    width: '40%',
    height: '80%'
  },
  summary: {
    flexWrap: 'wrap',
    width: '60%',
    padding: 5
  }
})

export default NewsItem;