import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight , Image, Linking } from 'react-native';

const NewsItem = (props) => (
  <TouchableHighlight  onPress={ () => {Linking.openURL(props.url)}} underlayColor="gray">
    <View style={styles.newsItem}>
      <Image source={{uri: props.thumbnail}} style={styles.thumbnail} />
      <Text style={styles.summary}>{props.summary}</Text>
    </View>
  </TouchableHighlight >

);

const styles = StyleSheet.create({
  newsItem: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: '40%'
  },
  summary: {
    flexWrap: 'wrap',
    width: '60%',
    backgroundColor: 'white',
    padding: 5
  }
})

export default NewsItem;