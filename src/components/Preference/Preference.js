import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class Preference extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


export default Preference;
