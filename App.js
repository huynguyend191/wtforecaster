import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
// import WeatherForecast from './src/components/WeatherForecast';
import MainNavigation from './src/components/MainNavigation';
import LinearGradient from 'react-native-linear-gradient';
import { GoogleSignin } from 'react-native-google-signin';


class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    GoogleSignin.configure({
      webClientId: '195557048661-j5v9p9ji2o5q0sr5nomob3gihi9m05qa.apps.googleusercontent.com'
    })
  } 

  render() {
    return (
      <LinearGradient colors={['#6047d9', '#4c9dd5', '#4ac2d2']} style={styles.container}>
        <MainNavigation />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


export default App;
