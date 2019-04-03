import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchWeatherDaily } from '../store/actions';

class WeatherForecast extends Component {
  componentDidMount() {
    const coords =  {
      latitude: 21.028511,
      longitude: 105.804817
    };
    this.props.fetchWeatherDaily(coords);
  }
  render() {
    return (
      <View>
        <Text>Weather Forecast</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    weatherDaily: state.weatherReducer.dailyWeather,
    loadingDailyWeather: state.weatherReducer.loadingDailyWeather
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchWeatherDaily: (coords) => dispatch(fetchWeatherDaily(coords))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherForecast);