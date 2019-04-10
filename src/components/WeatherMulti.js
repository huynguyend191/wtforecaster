import React, { Component } from 'react';
import { View, Text } from 'react-native';

class WeatherMulti extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff' }}>
        <Text>Multi weather</Text>
      </View>
    );
  }
}

export default WeatherMulti;