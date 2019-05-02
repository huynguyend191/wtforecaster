import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchCurrentWeather } from '../../../store/actions';
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import weatherIconName from '../../../utils/weatherIconName';

class Current extends Component {
  componentDidMount() {
    this.onFetchCurrentWeather();
  }

  onFetchCurrentWeather = () => {
    navigator.geolocation.getCurrentPosition(positon => {
      const coords =  {
        latitude: positon.coords.latitude,
        longitude: positon.coords.longitude
      };
      this.props.fetchCurrentWeather(coords);
    }, error => {
      alert('Please turn on your GPS and Internet connection!');
    })
  }
  render() {
    let displayWeatherInfo = <Text>Loading...</Text>
    if (!this.props.loadingCurrentWeather ) {
      if (this.props.currentWeather) {
        console.log(this.props.currentWeather)
        const currentWeather = this.props.currentWeather;
        displayWeatherInfo = (
          <View>
            <View style={styles.mainDisplay}>
              <WeatherIcon name={weatherIconName[currentWeather.current.icon]} size={120} color="white" />
              <Text style={styles.temp}>{Math.round(currentWeather.current.temp)}&#8451;</Text>
            </View>
            <Text style={styles.realTemp}>Real Feel: {Math.round(currentWeather.current.apparentTemp)}&#176;</Text>
            <Text style={styles.summary}>{currentWeather.current.summary}</Text>
            <View style={styles.detailInfo}>

            </View>
          </View>
        )
      }
      
    }
    return (
      <View style={styles.weatherContainer}>
        {displayWeatherInfo}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentWeather: state.weatherReducer.currentWeather,
    loadingCurrentWeather: state.weatherReducer.loadingCurrentWeather
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentWeather: (coords) => dispatch(fetchCurrentWeather(coords))
  }
}

const styles = StyleSheet.create({
  weatherContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    padding: 25
  },
  mainDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  temp: {
    color: 'white',
    fontSize: 60,
    marginLeft: 20
  },
  summary: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18
  },
  realTemp: {
    color: 'white',
    textAlign: 'right',
    fontSize: 12
  },
  detailInfo: {
    borderTopWidth: 1,
    borderTopColor: 'white',
    marginTop: 20
  }
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Current);