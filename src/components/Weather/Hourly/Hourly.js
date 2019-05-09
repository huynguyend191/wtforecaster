import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { fetchHourlyWeather } from '../../../store/actions';
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import weatherIconName from '../../../utils/weatherIconName';

class Hourly extends Component {
  componentDidMount() {
    this.onFetchHourlyWeather();
  }
  onFetchHourlyWeather = () => {
    navigator.geolocation.getCurrentPosition(positon => {
      const coords =  {
        latitude: positon.coords.latitude,
        longitude: positon.coords.longitude
      };
      this.props.fetchHourlyWeather(coords);
    }, error => {
      alert('Please turn on your GPS and Internet connection!');
    })
  }
  render() {
    let displayWeatherInfo = (
      <ActivityIndicator size="large" color="white" />
    );
    if (!this.props.loadingHourlyWeather ) {
      console.log(this.props.hourlyWeather)
      if (this.props.hourlyWeather) {

        displayWeatherInfo = (
          <View>
           
          </View>
        )
      }
      
    }
    return (
      <View style={styles.weatherContainer}>
        <Text>Weather Forecast Hourly</Text>
        {displayWeatherInfo}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    hourlyWeather: state.weatherReducer.hourlyWeather,
    loadingHourlyWeather: state.weatherReducer.loadingHourlyWeather
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchHourlyWeather: (coords) => dispatch(fetchHourlyWeather(coords))
  }
}

const styles = StyleSheet.create({
  weatherContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center'
  },
  mainDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Hourly);