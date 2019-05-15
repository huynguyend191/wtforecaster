import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl} from 'react-native';
import { connect } from 'react-redux';
import PostComment from './PostComment';
import axios from '../../utils/axiosConfig';

class Places extends Component {
  state = {
    isHavingInfo: false,
    loadingPlace: false,
    user: null,
    place: null
  }
  componentDidMount() {
    this.getPlace();
  }
  getPlace = () => {
    this.setState({
      loadingPlace: true
    });
    if (this.props.currentWeather && this.props.currentAddress) {
      console.log(this.props.currentWeather)
      console.log(this.props.currentAddress)
      this.setState({
        isHavingInfo: true
      });
    }
  }
  setCurrentUser = (user) => {
    this.setState({
      user: user
    });
  }

  render() {
    let displayPlace = (
      <View>
        <Text style={styles.loadingText}>Getting a beautiful place...</Text>
        <ActivityIndicator size="large" color="white" />
      </View>
    )
    if (this.state.isHavingInfo) {
      displayPlace = (
        <View>
          <PostComment />
        </View>
      )
    } else {
        displayPlace=(
          <View style={styles.error}>
            <Text style={styles.errorMsg}>Can't get weather. Pls refresh</Text>
          </View>
        ) 
    }
    
    return (
      <View style={styles.container}> 
        <ScrollView 
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl
              onRefresh={this.getPlace}
              refreshing={false}
            />
          }
        >
          {displayPlace}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    color: 'white',
    marginBottom: 5
  },
  error: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMsg: {
    color: 'white'
  }
});

const mapStateToProps = state => {
  return {
    currentCity: state.placesReducer.currentCity,
    currentAddress: state.placesReducer.currentAddress,
    currentWeather: state.weatherReducer.currentWeather,
  }
}


export default connect(mapStateToProps, null)(Places);
