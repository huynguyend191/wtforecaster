import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchHourlyWeather } from '../../../store/actions';
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import weatherIconName from '../../../utils/weatherIconName';
import HourlyItem from './HourlyItem';

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
      if (this.props.hourlyWeather) {
        const hourlyWeather = this.props.hourlyWeather;
        displayWeatherInfo = (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this.onFetchHourlyWeather}
              />
            }
            style={styles.weather}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.hourlySummary}>
              <Text style={styles.summaryTitle}>HOURLY SUMMARY</Text>
              <View style={styles.summaryContent}>
                <Text style={styles.summary}>{hourlyWeather.hourlySummary}</Text>
                <WeatherIcon name={weatherIconName[hourlyWeather.hourlyIcon]} size={50} color="white" />
              </View>
            </View>
            <FlatList 
              showsHorizontalScrollIndicator={false}
              horizontal
              data={hourlyWeather.hourlyForecast.filter((a,i)=>i%2===0)} //take every 2 hour
              keyExtractor={(item, index) => item.time}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => 
                <HourlyItem 
                  time={item.time}
                  summary={item.summary}
                  icon={item.icon}
                  rainProb={item.precipProbability}
                  humidity={item.humidity}
                  windSpeed={item.windSpeed}
                  uvIndex={item.uvIndex}
                  temp={item.temp}
                  index={item.index}
                />
              }
            />
          </ScrollView>
        )
      } else {
        displayWeatherInfo = (
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={this.onFetchHourlyWeather}
              />
            }
            style={styles.errorContainer}
          >
            <View>
              <Text style={styles.error}>Something went wrong</Text>
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
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5
  },
  weather: {
    flex: 1,
  },
  hourlySummary: {
    marginVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    width: '100%',
    flex: 1,
    display: 'flex',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 40
  },
  summaryTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  summary: {
    color: 'white',
    flexWrap: 'wrap',
    width: '80%',
  },
  error: {
    color: 'white',
    fontSize: 18,
    marginTop: 250
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Hourly);