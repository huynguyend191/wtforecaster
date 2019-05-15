import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchHourlyWeather } from '../../../store/actions';
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import weatherIconName from '../../../utils/weatherIconName';
import HourlyItem from './HourlyItem';
import {convertTemp} from '../../../utils/convertTemp';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';

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
      <View>
        <Text style={styles.loadingText}>Fetching weather...</Text>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
    if (!this.props.loadingHourlyWeather ) {
      if (this.props.hourlyWeather) {
        const hourlyWeather = this.props.hourlyWeather;
        const data = [
          { quarter: 1, earnings: 13000 },
          { quarter: 2, earnings: 16500 },
          { quarter: 3, earnings: 14250 },
          { quarter: 4, earnings: 19000 }
        ];
        
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
                  temp={convertTemp(item.temp, this.props.unit)}
                  index={item.index}
                />
              }
            />
            <View style={styles.container} pointerEvents='none'>
              <VictoryChart>
                <VictoryLine
                  style={{
                    data: { stroke: "white", color: "white" },
                  }}
                  data={[
                    { x: 1, y: 2 },
                    { x: 2, y: 3 },
                    { x: 3, y: 5 },
                    { x: 4, y: 4 },
                    { x: 5, y: 7 }
                  ]}
                />
                <VictoryAxis
                  style={{
                    axis: {stroke: "white"},
                    tickLabels: {fontSize: 10, fill: "white"}
                  }}
                />
                <VictoryAxis dependentAxis
                  style={{
                    axis: {stroke: "white"},
                    tickLabels: {fontSize: 10, fill: "white"}
                  }}
                />
              </VictoryChart>
            </View>
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
    loadingHourlyWeather: state.weatherReducer.loadingHourlyWeather,
    unit: state.weatherReducer.unit
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
  },
  loadingText: {
    color: 'white',
    marginBottom: 5
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Hourly);