import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl, FlatList} from 'react-native';
import { connect } from 'react-redux';
import PostComment from './PostComment';
import axios from '../../utils/axiosConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlaceItem from './PlaceItem';

class Places extends Component {
  state = {
    isHavingInfo: false,
    loadingPlace: false,
    places: null
  }
  componentDidMount() {
    this.getPlace();
  }
  getPlace = () => {
    this.setState({
      loadingPlace: true
    });
    if (this.props.currentWeather && this.props.currentAddress) {
      const country = this.props.currentAddress.split(" ").pop().toLowerCase();
      const city = this.props.currentCity.toLowerCase();
      const temp = this.props.currentWeather.current.temp;
      this.setState({
        isHavingInfo: true
      });
      axios.get(`/places?min_temp=${temp}&max_temp=${temp}&country=${country}`)
      .then(result => {
        this.setState({
          places: result.data,
          loadingPlace: false,
          isHavingInfo: true
        });
      })
      .catch(error => {
        this.setState({
          isHavingInfo: false,
          loadingPlace: false
        });
      })
    }
  }

  render() {
    let displayPlace = null;
    
    if (this.state.isHavingInfo) {
      displayPlace = (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Getting beautiful places...</Text>
          <ActivityIndicator size="large" color="white" />
        </View>
      )
      if (!this.state.loadingPlace && this.state.places) {
        if (this.state.places.length > 0) {
          displayPlace = (
            <View>
              <View style={styles.locationContainer}>
              <Icon name="map-marker" size={19} color="white" />
              <Text style={styles.location}>{this.props.currentCity}, {this.props.currentAddress.split(" ").pop()}</Text>
            </View>  
            <FlatList 
              data={this.state.places}
              keyExtractor={(item, index) => item._id}
              renderItem={({item}) => 
                <PlaceItem 
                  placeInfo={item}
                />
              }
            />
            </View>
          )
        } else {
          displayPlace = (
            <View style={styles.error}>
              <Text style={styles.errorMsg}>Sorry, we cannot find any place </Text>
              <Icon name="emoticon-sad-outline" color="white" size={30} />
            </View>
          )
        }
      }
    } else {
        displayPlace=(
          <View style={styles.error}>
            <Text style={styles.errorMsg}>Cannot get weather info, please refresh</Text>
            <Icon name="emoticon-sad-outline" color="white" size={30} />
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
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMsg: {
    color: 'white',
    marginBottom: 5,
    fontSize: 16
  },
  location: {
    color: 'white',
    fontSize: 18,
    marginLeft: 3
  },
  locationContainer: {
    height: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20
  },
});

const mapStateToProps = state => {
  return {
    currentCity: state.placesReducer.currentCity,
    currentAddress: state.placesReducer.currentAddress,
    currentWeather: state.weatherReducer.currentWeather,
  }
}


export default connect(mapStateToProps, null)(Places);
