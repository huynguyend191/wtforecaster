/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class App extends Component {
  state = {
    coord: null
  }
  getLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        coord: position.coords
      })
    }, error => {
      alert("Please check your GPS or connection and retry");
    })
  }
  render() {
    let coord = null;
    if (this.state.coord) {
      coord = (
        <Text>{this.state.coord.latitude} - {this.state.coord.longitude}</Text>
      )
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to WtForecaster</Text>
        <Button title="Get Location" onPress={this.getLocation} />
        {coord}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});


export default App;
