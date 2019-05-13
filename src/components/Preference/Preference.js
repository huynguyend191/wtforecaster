import React, {Component} from 'react';
import {StyleSheet, Text, View, Switch, Button} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

class Preference extends Component {
  state = {
    celcius: false
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      alert('Signed In')
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      alert('Signed out')
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      alert('Sign in plz')
    }
  };
  componentDidMount() {
    GoogleSignin.configure();
  }
  
  toggleSwitch = (value) => {
    //onValueChange of the switch this function will be called
    this.setState({switchValue: value})
    //state changes according to switch
    //which will result in re-render the text
  }
  render() {
      
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this.signIn}
          disabled={this.state.isSigninInProgress} 
        />
        <Text>Setting</Text>
        <Text>{this.state.switchValue ? 'Fahereit' : 'Celcius'}</Text>
        <Switch
          onValueChange = {this.toggleSwitch}
          value = {this.state.switchValue}
        />
        <Button title="Sign out" onPress={this.signOut}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


export default Preference;
