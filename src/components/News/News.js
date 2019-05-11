import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import { connect } from 'react-redux';
import { fetchNews } from '../../store/actions';
import NewsItem from './NewsItem';

class News extends Component {
  
  componentDidMount() {
    this.onRefresh();
  }
  onRefresh = () => {
    this.props.fetchNews();
  }
  render() {
    let displayNews = (
      <ActivityIndicator size="large" color="white" />
    )
    if (!this.props.loadingNews) {
      if (this.props.news) {
        displayNews = (
          <FlatList 
            refreshControl={
              <RefreshControl
                onRefresh={this.onRefresh}
              />
            }
            data={this.props.news}
            keyExtractor={(item, index) => item.link}
            renderItem={({item}) => 
              <NewsItem 
                thumbnail={item.thumbnail} 
                summary={item.summary}
                url={item.link}
              />
            }
          />
        )
      }
    }
    return (
      <View style={styles.newsContainer}>
        {displayNews}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 5
  }
});

const mapStateToProps = state => {
  return {
    news: state.newsReducer.news,
    loadingNews: state.newsReducer.loadingNews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNews: () => dispatch(fetchNews())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(News);
