import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';

class Places extends Component {

  render() {
    let displayPlace = (
      <View>
        <Text style={styles.loadingText}>Getting a beautiful place...</Text>
        <ActivityIndicator size="large" color="white" />
      </View>
    )
    return (
      <View style={styles.container}>
        {displayPlace}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: 'white',
    marginBottom: 5
  }
});

const mapStateToProps = state => {
  return {
    currentCity: state.placesReducer.currentCity,
    loadingCurrentCity: state.placesReducer.loadingCurrentCity,
    dailyWeather: state.weatherReducer.dailyWeather,
    loadingDailyWeather: state.weatherReducer.loadingDailyWeather,
  }
}


export default connect(mapStateToProps, null)(Places);
