/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StatusBar, YellowBox} from 'react-native';
import firebase from '@firebase/app';
import {Container} from 'native-base';
import Router from './src/Router';

class App extends Component {
  UNSAFE_componentWillMount() {
    try {
      firebase.initializeApp({
        apiKey: '',
        authDomain: '',
        databaseURL: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
      });
    } catch (err) {
      if (!/already exists/.test(err.message)) {
        console.log('Firebase initialization error raised', err.stack);
      }
    }
  }
  render() {
    YellowBox.ignoreWarnings(['Setting a timer']);
    return (
      <Container>
        <Router />
      </Container>
    );
  }
}
export default App;
