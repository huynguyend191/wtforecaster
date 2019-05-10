import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
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
    let displayWeatherInfo = (
      <ActivityIndicator size="large" color="white" />
    );
    if (!this.props.loadingCurrentWeather ) {
      if (this.props.currentWeather) {
        const currentWeather = this.props.currentWeather;
        displayWeatherInfo = (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this.onFetchCurrentWeather}
              />
            }
            style={styles.weather}
          >
            <Text style={styles.date}>{new Date(currentWeather.current.time).toDateString()}</Text>
            <View style={styles.mainDisplay}>
              <WeatherIcon name={weatherIconName[currentWeather.current.icon]} size={120} color="white" />
              <Text style={styles.temp}>{Math.round(currentWeather.current.temp)}&#8451;</Text>
            </View>
            <Text style={styles.realTemp}>Real Feel: {Math.round(currentWeather.current.apparentTemp)}&#176;</Text>
            <Text style={styles.summary}>{currentWeather.current.summary}</Text>
            <View style={styles.detailInfo}>
              <View style={styles.detailItem}>
                <View style={styles.detailLabel}> 
                  <WeatherIcon name="water-percent" color="white" size={19} />
                  <Text style={styles.detailLabelText}>Humidity</Text>
                </View>
                <Text style={styles.detailData}>{Number(currentWeather.current.humidity) * 100}%</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.detailLabel}> 
                  <WeatherIcon name="white-balance-sunny" color="white" size={19} />
                  <Text style={styles.detailLabelText}>UV index</Text>
                </View>
                <Text style={styles.detailData}>{currentWeather.current.uvIndex}</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.detailLabel}> 
                  <WeatherIcon name="wind-turbine" color="white" size={19} />
                  <Text style={styles.detailLabelText}>Wind speed</Text>
                </View>
                <Text style={styles.detailData}>{currentWeather.current.windSpeed} m/s</Text>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.detailLabel}> 
                  <WeatherIcon name="weather-rainy" color="white" size={19} />
                  <Text style={styles.detailLabelText}>Rain probability</Text>
                </View>
                <Text style={styles.detailData}>{Math.round(Number(currentWeather.current.precipProbability) * 100)}%</Text>
              </View>
            </View>
          </ScrollView>
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
    alignItems: 'center',
    flex: 1
  },
  weather: {
    flex: 1
  },
  mainDisplay: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20
  },
  temp: {
    color: 'white',
    fontSize: 70,
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
    fontSize: 13
  },
  detailInfo: {
    borderTopWidth: 1,
    borderTopColor: 'white',
    marginTop: 30,
    paddingVertical: 20
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  detailLabel: {
    display: 'flex',
    flexDirection: 'row'
  },
  detailLabelText: {
    color: 'white',
    marginLeft: 5
  },
  detailData: {
    color: 'white',
  },
  date: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 50
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Current);