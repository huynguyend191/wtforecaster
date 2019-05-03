import { createMaterialTopTabNavigator } from 'react-navigation';
import Daily from './Daily/Daily';
import Current from './Current/Current';
import Hourly from './Hourly/Hourly';

const Weather = createMaterialTopTabNavigator({
  Current: Current,
  Hourly: Hourly,
  Daily: Daily
},
{
  tabBarOptions: {
    style: {
      backgroundColor: 'white',
      height: 2,
    },
    indicatorStyle: {
      borderBottomColor: '#6047d9',
      borderBottomWidth: 2,
    },
    showLabel: false
}}
);

export default Weather;