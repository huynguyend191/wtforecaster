import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class Places extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Places</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


export default Places;
