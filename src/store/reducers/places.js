import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentCity: null,
  loadingCurrentCity: false
}

const reducer = ((state = initialState, action) => {
  switch(action.type) {
    case actionTypes.START_GETTING_CURRENT_CITY: 
      return {
        ...state,
        loadingCurrentCity: true
      }
    case actionTypes.GET_CURRENT_CITY_SUCCEEDED: 
      console.log(action.city)
      return {
        ...state,
        loadingCurrentCity: false,
        currentCity: action.city
      }
    case actionTypes.GET_CURRENT_CITY_FAILED: 
      return {
        ...state,
        loadingCurrentCity: false
      }
    default:
      return state;
  }
});

export default reducer;

