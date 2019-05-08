import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Linking} from 'react-native';



class News extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>News</Text>
        <Button title="Click me" onPress={ ()=>{ Linking.openURL('https://google.com')}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


export default News;
