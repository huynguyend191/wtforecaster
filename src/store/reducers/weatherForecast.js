import * as actionTypes from '../actions/actionTypes';

const initialState = {
  dailyWeather: null,
  loadingDailyWeather: false
}

const reducer = ((state = initialState, action) => {
  switch(action.type) {
    case actionTypes.START_FETCHING_WEATHER_DAILY:
      return {
        ...state,
        loadingDailyWeather: true
      };
    case actionTypes.FETCH_WEATHER_DAILY_SUCCEEDED:
      return {
        ...state,
        loadingDailyWeather: false,
        dailyWeather: action.dailyWeather
      };
    case actionTypes.FETCH_WEATHER_DAILY_FAILED:
      return {
        ...state,
        loadingDailyWeather: false
      };
    default:
      return state;
  }
});

export default reducer;

