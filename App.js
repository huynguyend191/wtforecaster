import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import WeatherForecast from './src/components/WeatherForecast';

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <WeatherForecast />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#b3f4fc',
    opacity: 0.7
  }
});


export default App;
