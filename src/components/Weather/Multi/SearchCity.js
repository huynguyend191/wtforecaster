import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import cityList from '../../../utils/world_coor.json';
// import {AsyncStorage} from '@react-native-community/async-storage';

class SearchCity extends Component {
  state = {
    value: "",
    data: cityList
  }
  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = cityList.filter(item => {
      const itemData = `${item.city.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };
  selectCity = async (city) => {
    try {
      let newCities = [];
      const cities = await AsyncStorage.getItem('cities');
      if(cities != null) {
        newCities = JSON.parse(cities);
        newCities.push(city);
        await AsyncStorage.clear();
        await AsyncStorage.setItem('cities', JSON.stringify(newCities));
        console.log(newCities)
      } else {
        newCities.push(city);
        await AsyncStorage.setItem('cities', JSON.stringify(newCities));
        console.log(newCities)
      }
    } catch (error) {
      // Error saving data
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput        
          placeholder="Type Here..."        
          round        
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}         
          value={this.state.value}    
        />   
        <FlatList
          keyExtractor={(item, index) => item.city}
          data={this.state.data}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => this.selectCity(item)}>
              <Text>{item.city}</Text>
            </TouchableOpacity> 
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
  }
});


export default SearchCity;