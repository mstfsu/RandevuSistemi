import React, {Component} from 'react';
import { Text, StyleSheet,TouchableOpacity, Alert } from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
require('@firebase/database');
import {Form, Item, Input} from 'native-base';
import Spinner from './spinner';


class RegisterFormType extends Component {
  state = { email:'', password:'', barbername:'', username:'',buttonState:'false'};

  createUsers(email,password,userName, userRole, barberName){
    var user = firebase.auth().currentUser;
      if (this.props.type === 'Barber'){
          firebase.database().ref(`/users/${user.uid}`).set({
          username: userName,
          email: email,
          barberName:barberName,
          userRole: 'barber'
        });
      } else {
          firebase.database().ref(`/users/${user.uid}`).set({
          username: userName,
          email: email,
          userRole: 'user'
      });
      this.setState({buttonState:'false'});
    }
  }
  AlertMessage(message){
    Alert.alert(
      'Kullanıcı Kaydedilemedi',
      message
    );
    this.setState({buttonState:'false'});
  }

  ClickRegisterButton(){
    this.setState({buttonState:'true'})
    const {email,password,username, userrole, barbername} = this.state;

    if ((this.props.type === 'Barber' && username !== '' && barbername !== '') || (this.props.type === 'User' && username !== '') ){
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>this.createUsers(email,password,username,userrole,barbername))
        .catch((error) => {
          var errorCode = error.code;
          console.log(errorCode);
          if (errorCode === 'auth/email-already-in-use'){
            this.AlertMessage('Girdiğiniz e-mail adresi kullanılmaktadır.');
          } else if (errorCode === 'auth/weak-password'){
            this.AlertMessage('Şifreniz en az 6 karekter olmalıdır.');
          } else if (errorCode === 'auth/invalid-email') {
            this.AlertMessage('Lütfen Geçerli bir E-mail Adresi Giriniz.');
          }
      });
    } else {
      if (this.props.type === 'User'){
        this.AlertMessage('Lütfen Adınızı Giriniz.');
      } else {
        this.AlertMessage('Tam Ad veya Berber Adı Boş Bırakılamaz.');
      }
    }
  }
  renderregisterButton(){
    if (this.state.buttonState === 'true'){
      return <Spinner />;
    } else if (this.state.buttonState === 'false'){
      return (
        <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => this.ClickRegisterButton()}
            underlayColor="#fff">
            <Text style={styles.loginText}>Kayıt Ol</Text>
          </TouchableOpacity>
      );
    }
  }
render(){
  if (this.props.type === 'Barber'){
    return (
        <Form>
          <Item last>
            <Input placeholder="Tam Adınızı Giriniz" value={this.state.username} onChangeText={val =>this.setState({username:val})}/>
          </Item>
          <Item>
            <Input placeholder="E-mail'inizi giriniz" value={this.state.email} onChangeText={val =>this.setState({email:val})}/>
          </Item>
          <Item last>
            <Input placeholder="Berberinizin Adını Giriniz" value={this.state.barbername} onChangeText={val => this.setState({ barbername: val }) } />
          </Item>
          <Item last>
            <Input placeholder="Şifrenizi Giriniz" secureTextEntry={true} value={this.state.password} onChangeText={val => this.setState({ password: val })} />
          </Item>
          {this.renderregisterButton()}
        </Form>
    )
  } else if (this.props.type === 'User'){
        return (
            <Form>
              <Item last>
                <Input placeholder="Tam Adınızı Giriniz" value={this.state.username} onChangeText={val =>this.setState({username:val})}/>
              </Item>
              <Item>
                <Input placeholder="E-mail'inizi giriniz"  value={this.state.email} onChangeText={val =>this.setState({email:val})}/>
              </Item>
              <Item last>
                <Input placeholder="Şifrenizi Giriniz" secureTextEntry={true} value={this.state.password} onChangeText={val => this.setState({ password: val })} />
              </Item>
              {this.renderregisterButton()}
            </Form>
        )
      }
  }
}

const styles = StyleSheet.create({
  loginScreenButton:{
      marginRight:40,
      marginLeft:40,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#056676',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#fff'
    },
    loginText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
});
export default RegisterFormType;
