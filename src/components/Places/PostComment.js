import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

class PostComment extends Component {
  state = {
    user: null,
    signInLoading: false,
    comment: ""
  }
  componentDidMount() {
    this.getCurrentUser();
  }
  signIn = async () => {
    this.setState({signInLoading: true})
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({
        user: userInfo,
        signInLoading: false
      })
    } catch (error) {
      this.setState({signInLoading: false})
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Something went wrong, please try again');
      // play services not available or outdated
      } else {
        alert('Something went wrong, please try again');
        // some other error happened
      }
    }
  };

  getCurrentUser = async () => {
    this.setState({signInLoading: true})
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({
      user: currentUser,
      signInLoading: false
    });
  };

  componentDidMount() {
    GoogleSignin.configure();
    this.getCurrentUser();
  }
  

  render() {
    let commentSection = (
      <View>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this.signIn}
          disabled={this.state.signInLoading} 
        />
      </View>
    )
    if (this.state.user) {
      // const user = this.state.user.user;
      commentSection = (
        <View>
          <TextInput
            placeholder="Comment"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({comment: text})}
            value={this.state.comment}/>
        </View>
        
      )
    }
    return (
      <View>
        {commentSection}
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
});


export default PostComment;
