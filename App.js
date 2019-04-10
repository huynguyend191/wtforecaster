import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
// import WeatherForecast from './src/components/WeatherForecast';
import Tabs from './src/components/Tabs';

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Tabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


export default App;
