import * as actionTypes from '../actions/actionTypes';

const initialState = {
  dailyWeather: null,
  loadingDailyWeather: false
}

const reducer = ((state = initialState, action) => {
  switch(action.type) {
    case actionTypes.START_FETCHING_DAILY_WEATHER:
      return {
        ...state,
        loadingDailyWeather: true
      };
    case actionTypes.FETCH_DAILY_WEATHER_SUCCEEDED:
      return {
        ...state,
        loadingDailyWeather: false,
        dailyWeather: action.dailyWeather
      };
    case actionTypes.FETCH_DAILY_WEATHER_FAILED:
      return {
        ...state,
        loadingDailyWeather: false
      };
    default:
      return state;
  }
});

export default reducer;

