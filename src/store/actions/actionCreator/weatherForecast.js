import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const startFetchingWeatherDaily = () => {
  return {
    type: actionTypes.START_FETCHING_WEATHER_DAILY
  }
}

export const fetchWeatherDailySucceeded = (dailyWeather) => {
  return {
    type: actionTypes.FETCH_WEATHER_DAILY_SUCCEEDED,
    dailyWeather
  }
}

export const fetchWeatherDailyFailed = () => {
  return {
    type: actionTypes.FETCH_WEATHER_DAILY_FAILED
  }
}

export const fetchWeatherDaily = (coords) => {
  return dispatch => {
    dispatch(startFetchingWeatherDaily());
    axios.get(`http://10.90.252.125:3000/weather/Daily?longitude=${coords.longitude}&latitude=${coords.latitude}`)
    .then(result => {
      console.log(result);
      dispatch(fetchWeatherDailySucceeded(result.data.weatherInfor))
    })
    .catch(error => {
      dispatch(fetchWeatherDailyFailed());
    })
  }
}

