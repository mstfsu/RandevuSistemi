import React, {Component} from 'react';
import {View, Text, StyleSheet,ImageBackground,StatusBar ,Alert,TouchableOpacity} from 'react-native';
import {Form, Item, Input} from 'native-base';
import firebase from '@firebase/app';
import '@firebase/auth';
import {Actions} from 'react-native-router-flux';
import Spinner from './spinner';


class LoginForm extends Component {

state = { email:'', password:'',buttonState:'false'};

clickLogin(){
  this.setState({buttonState:'true'});
  const { email , password} = this.state;
  if (email !== '' && password !== ''){
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
      .catch((error) => {
        this.setState({buttonState:false});
        var errorCode = error.code;
        console.log(errorCode);
        this.AlertMessage('E-mail veya Şifrenizi Kontrol Ediniz.');
      });
  } else {
    this.AlertMessage('E-mail veya Şifre Boş Bırakılamaz.');
  }
}
AlertMessage(message){
  Alert.alert(
    'Giriş Başarısız',
    message
  );
  this.setState({buttonState:'false'});
}
renderLoginButton(){
  if (this.state.buttonState === 'true'){
    return <Spinner />;
  } else if (this.state.buttonState === 'false'){
    return (
      <Form>
          <Item>
            <Input
              placeholderTextColor="#ffffff"
              style={styles.inputText}
              placeholder="E-mail'inizi giriniz"
              value={this.state.email} onChangeText={val =>this.setState({email:val})}/>
          </Item>
          <Item last>
            <Input
              placeholderTextColor="#ffffff"
              style={styles.inputText}
              placeholder="Şifrenizi Giriniz"
              secureTextEntry={true}
              value={this.state.password} onChangeText={val =>this.setState({password:val})}/>
          </Item>
          <TouchableOpacity
              style={styles.loginScreenButton}
              onPress={() => this.clickLogin()}
              underlayColor="#fff">
              <Text style={styles.loginText}>Giriş Yap</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.loginScreenButton}
                onPress={() =>Actions.RegisterForm()}
                underlayColor="#fff">
                <Text style={styles.loginText}>Kayıt Ol</Text>
            </TouchableOpacity>
        </Form>
      );
  }
}
  render() {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#056676"/>
          <ImageBackground source={require('../images/loginImage.jpg') } style={styles.image}>
            {this.renderLoginButton()}
          </ImageBackground>
        </View>
      )
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
    image: {
     flex: 1,
     resizeMode: 'cover',
     justifyContent: 'center'
    },
    loginText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 20,
        paddingRight : 20,
    },
    container: {
     flex: 1,
     flexDirection: 'column'
   },
   inputText: {
     color: 'white',
     textAlign:'center',
     alignItems: 'stretch',
     fontWeight: 'bold',
     fontSize: 25
   },
});
export default LoginForm;
