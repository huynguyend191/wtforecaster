import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import WeatherForecast from '../components/WeatherForecast';
import WeatherNews from '../components/WeatherNews';
import WeatherMulti from '../components/WeatherMulti';

const TabNavigator = createBottomTabNavigator({
  WeatherForecast: WeatherForecast,
  WeatherNews: WeatherNews,
  WeatherMulti: WeatherMulti
});

export default createAppContainer(TabNavigator);