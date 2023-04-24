import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../Login/loginProvider';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function NavBar() {

  const navigation = useNavigation();
  const { isLoggedIn, logout, setLoggedIn } = useContext(LoginContext);
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
   AsyncStorage.getItem('token').then((value) => {
    if (value) {
      setAuthToken(value);
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      setAuthToken("")
    }
  });
}, []);

useEffect(() => {
  if (authToken) {
    setLoggedIn(true);
  } else {
    setLoggedIn(false);
  }
}, [authToken]);



  return (

    <View style={styles.container}>

      <StatusBar backgroundColor="black" barStyle="null" />

      <TouchableOpacity onPress={() => navigation.navigate('HomePage')} >
      <Text style={styles.title}>Adopt.Me</Text>
      </TouchableOpacity>
      
      {!isLoggedIn &&  (

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}


      {isLoggedIn && (

        <View>
          
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={styles.button}>
        <Text style={styles.buttonText}>Mi Perfil</Text>
      </TouchableOpacity>
     
       <TouchableOpacity onPress={() => logout()} style={styles.button}>
       <Text style={styles.buttonText}>Log Out</Text>
     </TouchableOpacity>

     </View>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007bff',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: StatusBar.currentHeight || 0,
    marginTop: 0
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
