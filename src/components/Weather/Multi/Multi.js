import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, Modal, TouchableWithoutFeedback} from 'react-native';
import SearchCity from './SearchCity';

class Multi extends Component {
  state = {
    showSearch: false
  }
  showSearch = () => {
    this.setState({
      showSearch: true
    })
  }
  hideSearch =() => {
    this.setState({
      showSearch: false
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Button title="Show" onPress={this.showSearch} />
        <Modal
          transparent
          visible={this.state.showSearch}
          onRequestClose={this.hideSearch}
        > 
          <TouchableWithoutFeedback onPress={this.hideSearch}>
            <View style={styles.modalContent}>
              <SearchCity onAddCity={this.hideSearch} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  modalContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080'
  }
});


export default Multi;
