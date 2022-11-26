import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Content} from 'native-base';
import RegisterFormType from './RegisterFormType';

class RegisterForm extends Component{
  state = { BackgroundColorBarber:'white',TextColorBarber:'#056676' ,RegisterFormType:' ',
            BackgroundColorUser:'white',TextColorUser:'#056676'};

clickBarberButton(){
  this.setState({BackgroundColorBarber:'#056676',  RegisterFormType:'Barber', TextColorBarber:'white'});
  this.setState({BackgroundColorUser:'white', TextColorUser:'#056676'});

}
clickUserButton(){
  this.setState({BackgroundColorUser:'#056676',  RegisterFormType:'User', TextColorUser:'white'});
  this.setState({BackgroundColorBarber:'white', TextColorBarber:'#056676'});
}
renderForm() {

  if (this.state.RegisterFormType === ' ') {
    console.log();
  } else if (this.state.RegisterFormType === 'Barber') {
      return <RegisterFormType type={this.state.RegisterFormType} />
  }
  else if (this.state.RegisterFormType === 'User') {
      return <RegisterFormType type={this.state.RegisterFormType} />
  }
}
  render(){
    return (
      <Content>
        <View style={{ flexDirection: 'row', flex:1 }}>
          <TouchableOpacity
              style={[styles.loginScreenButton,{backgroundColor:this.state.BackgroundColorBarber}]}
              onPress={() => this.clickBarberButton()}
              underlayColor='#fff'>
              <Text style={[styles.loginText,{color:this.state.TextColorBarber}]}>Berber Kaydı</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.loginScreenButton,{backgroundColor:this.state.BackgroundColorUser}]}
                onPress={() =>  this.clickUserButton()}
                underlayColor='#056676'>
                <Text style={[styles.loginText,{color:this.state.TextColorUser}]}>Kullanıcı Kaydı</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex:1 ,justifyContent: "center", marginTop:10}}>
                {this.renderForm()}
            </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  loginScreenButton:{
      marginRight:40,
      marginLeft:40,
      marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      borderColor:'#056676',
      borderRadius:10,
      borderWidth: 1,
      width:120
    },
    loginText:{
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
});

export default RegisterForm;
