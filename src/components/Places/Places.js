import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
// import WeatherForecast from './src/components/WeatherForecast';



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
    backgroundColor: 'white'
  }
});


export default Places;
