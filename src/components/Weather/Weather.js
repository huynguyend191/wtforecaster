import { createMaterialTopTabNavigator } from 'react-navigation';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import React from 'react';
import Daily from './Daily/Daily';
import Current from './Current/Current';
import Hourly from './Hourly/Hourly';

const Weather = createMaterialTopTabNavigator({
  Current: Current,
  Daily: Daily,
  Hourly: Hourly
},
{
  tabBarOptions: {
    activeTintColor: 'blue',
    inactiveTintColor: 'gray',
    inactiveBackgroundColor: '#353539',
    activeBackgroundColor: '#353539',
    labelStyle: {
      fontSize: 12,
      margin: 0
    },
    style: {
      backgroundColor: 'white',
      height: 30
    },
    indicatorStyle: {
      borderBottomColor: '#6047d9',
      borderBottomWidth: 2,
    }
}}
);

export default Weather;