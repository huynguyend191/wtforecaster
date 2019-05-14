import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Button, Modal} from 'react-native';
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
          visible={this.state.showSearch}
          onRequestClose={this.hideSearch}
        >
          <SearchCity />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


export default Multi;
