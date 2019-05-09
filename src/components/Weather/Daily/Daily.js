import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { fetchDailyWeather } from '../../../store/actions';
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import weatherIconName from '../../../utils/weatherIconName';

class Daily extends Component {
  componentDidMount() {
    this.onFetchDailyWeather();
  }
  onFetchDailyWeather = () => {
    navigator.geolocation.getCurrentPosition(positon => {
      const coords =  {
        latitude: positon.coords.latitude,
        longitude: positon.coords.longitude
      };
      this.props.fetchDailyWeather(coords);
    }, error => {
      alert('Please turn on your GPS and Internet connection!');
    })
    
  }
  render() {
    let displayWeatherInfo = (
      <ActivityIndicator size="large" color="white" />
    );
    if (!this.props.loadingDailyWeather ) {
      if (this.props.dailyWeather) {
        displayWeatherInfo = (
          <View>
            
          </View>
        )
      }
      
    }
    return (
      <View style={styles.weatherContainer}>
        <Text>Weather Forecast</Text>
        {displayWeatherInfo}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    dailyWeather: state.weatherReducer.dailyWeather,
    loadingDailyWeather: state.weatherReducer.loadingDailyWeather
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDailyWeather: (coords) => dispatch(fetchDailyWeather(coords))
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

export default connect(mapStateToProps, mapDispatchToProps)(Daily);