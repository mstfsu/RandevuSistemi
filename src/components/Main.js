import React, {Component} from 'react';
import {Content} from 'native-base';
import firebase from '@firebase/app';
import '@firebase/auth';
import {Actions} from 'react-native-router-flux';
import Spinner from './spinner';

class Main extends Component{

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if (user){
        firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
        var userRole = (snapshot.val() && snapshot.val().userRole) || 'Anonymous';
          if (userRole === 'barber'){
            Actions.berber();
          } else {
            Actions.deneme();
          }
        });
       } else {
        Actions.LoginForm();
      }
    });
  }

render(){
  return (
    <Content>
      <Spinner />
    </Content>);
  }
}
export default Main;
