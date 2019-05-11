import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import weatherIconName from '../../../utils/weatherIconName';

class DailyItem extends Component {
  render() {
    return (
      <View style={styles.dailyItem}>
        <Text>{this.props.date}</Text>
        <Text>{this.props.summary}</Text>
        <WeatherIcon name={weatherIconName[this.props.icon]} size={50} color="white" />
        <Text>{Math.round(Number(this.props.rainProb) * 100)}%</Text>
        <Text>{Math.round(Number(this.props.humidity) * 100)}%</Text>
        <Text>{this.props.windSpeed} m/s</Text>
        <Text>{this.props.uvIndex}</Text>
        <Text>{Math.round(this.props.tempMax)}</Text>
        <Text>{Math.round(this.props.tempMin)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dailyItem: {
    // height: 150,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    marginBottom: 5
  }
})

export default DailyItem;