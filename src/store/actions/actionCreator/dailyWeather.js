import * as actionTypes from '../actionTypes';
import axios from '../../../utils/axiosConfig';

export const startFetchingDailyWeather = () => {
  return {
    type: actionTypes.START_FETCHING_DAILY_WEATHER
  }
}

export const fetchDailyWeatherSucceeded = (dailyWeather) => {
  return {
    type: actionTypes.FETCH_DAILY_WEATHER_SUCCEEDED,
    dailyWeather
  }
}

export const fetchDailyWeatherFailed = () => {
  return {
    type: actionTypes.FETCH_DAILY_WEATHER_FAILED
  }
}

export const fetchDailyWeather = (coords) => {
  return dispatch => {
    dispatch(startFetchingDailyWeather());
    axios.get('/weather/Daily?longitude=37.421998333333335&latitude=37.421998333333335')
    .then(result => {
      console.log(result);
      dispatch(fetchDailyWeatherSucceeded(result.data.weatherInfor))
    })
    .catch(error => {
      console.log(error)
      dispatch(fetchDailyWeatherFailed());
    })
  }
}

