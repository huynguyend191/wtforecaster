import React, {Component} from 'react';
import { View, Text, StyleSheet , Image, Animated, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class PlaceItem extends Component {
  state = {
    scaleValue: new Animated.Value(0.01),
    isExpanding: false
  }
  componentDidMount() {
    Animated.timing(this.state.scaleValue, {
        toValue: 1,
        duration : 600,
        delay: this.props.index * 450
    }).start();
  }
  expandInfo = () => {
    this.setState(prevState => ({
      isExpanding: !prevState.isExpanding
    }));
  }
  render() {
    const place = this.props.placeInfo;
    let expandSection = null;
    if (this.state.isExpanding) {
      expandSection = (
        <View>
          <Text style={styles.description}>Description</Text>
          <Text>{place.description}</Text>
        </View>
      )
    } else {
      expandSection = null;
    }
    
    return (
      <TouchableOpacity onPress={this.expandInfo}>
        <Animated.View style={[styles.placeItem, { opacity: this.state.scaleValue }]}>
          <View style={styles.mainDisplay}>
            <Image source={{uri: place.image.link}} style={styles.image} />
            <View style={styles.title}>
              <Text style={styles.placeName}>{place.name}</Text>
              <Text style={styles.address}>{place.address.detail}</Text>
              <AirbnbRating 
                showRating={false}
                size={20}
                defaultRating={place.rate}
                isDisabled={true}
              />
              <View style={styles.commentCount}>
                <Icon name="comment-account-outline" size={20} />              
                <Text>{place.peopleRated}</Text>
              </View>
            </View>
          </View>
          {expandSection}
        </Animated.View>
      </TouchableOpacity >
    );
  }
}

const styles = StyleSheet.create({
  placeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 10,
    width: '100%',
  },
  mainDisplay: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5
  },
  image: {
    width: '30%',
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%'
  },
  placeName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  commentCount: {
    paddingRight: 10,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 5
  },
  description: {
    fontSize: 16,
    marginVertical: 3,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  address: {
    textAlign: 'center'
  }
})

export default PlaceItem;