import React from 'react';
import {StyleSheet} from 'react-native';
import firebase from '@firebase/app';
import '@firebase/auth';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Deneme from './components/deneme';
import Main from './components/Main';
import Berber from './components/berber';



const RouterComponent = props => {
  return (
    <Router
    titleStyle={styles.textStyle}
    navigationBarStyle={{ backgroundColor: '#056676' }}
    >
      <Scene key="main">
        <Scene
          key="Main"
          initial
          renderBackButton={()=> null}
          component={Main}
          title=""
          left={() => null}
        />
        <Scene
          key="LoginForm"
          hideNavBar={true}
          renderBackButton={()=> null}
          component={LoginForm}
          title="Giriş Sayfası"
          left={() => null}
        />
        <Scene
          key="berber"
          navigationBarStyle={{backgroundColor:'white'}}
          renderBackButton={()=> null}
          component={Berber}
          title="Berber Sayfası"
          titleStyle={{color:'black'}}
          left={() => null}
          rightTitle="Çıkış yap"
          statusBarStyle={{backgroundColor:'white'}}
          onRight={()=>logout()}
        />
        <Scene
          key="RegisterForm"
          renderBackButton={()=> null}
          component={RegisterForm}
          title="Kayıt Sayfası"
          navBarButtonColor='white'
        />
        <Scene
          key="deneme"
          renderBackButton={()=> null}
          component={Deneme}
          title="deneme Sayfası"
          left={() => null}
          rightTitle="Çıkış yap"
          onRight={()=>logout()}
        />
      </Scene>
    </Router>
  );
};
function logout(){
  firebase.auth().signOut().catch(function(error) {
});
}
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 23,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
    flex: 1,
  },
});
export default RouterComponent;
