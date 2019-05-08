import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import weatherReducer from '../store/reducers/weatherForecast';
import newsReducer from '../store/reducers/news';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  weatherReducer: weatherReducer,
  newsReducer: newsReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;