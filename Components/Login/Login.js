import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../Login/loginProvider';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Actions/userLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

    export default function Login() {

        const [email, setEmail] = useState('');
        const [contrasena, setContrasena] = useState('');
        const [errorMessage, setErrorMessage] = useState('');
        const { login } = useContext(LoginContext);
        const navigation = useNavigation();
        const dispatch = useDispatch();

        const handleSubmit = async () => {
          try {
            const response = await axios.post('http://192.168.100.18:19001/login', {
              email: email,
              contrasena: contrasena
            });
            await AsyncStorage.setItem('token', response.data.token);
            login();
            dispatch(setUser(response.data));
            navigation.navigate('HomePage');
          } catch (error) {
            setErrorMessage('No se pudo iniciar sesión. Por favor, verifique sus credenciales.');
          }
        };
           

        return (

            <View style={{ marginTop: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>


              <View style={{ width: "60%", marginTop: "2%" }}>
                <Text style={{ fontSize: 25, marginBottom: "60%"}}>Ingresa a tu Cuenta</Text>
                <Text style={{ fontSize: 16 }}>Correo electrónico:</Text>
                <TextInput
                  keyboardType="email-address"
                  id="email"
                  name="email"
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                  required
                  style={{ borderWidth: 1, padding: 5 }}
                />
              </View>

              <View style={{ width: "60%", marginTop: "2%" }}>
                <Text style={{ fontSize: 16 }}>Contraseña:</Text>
                <TextInput
                  secureTextEntry={true}
                  id="password"
                  name="password"
                  value={contrasena}
                  onChangeText={(value) => setContrasena(value)}
                  required
                  style={{ borderWidth: 1, padding: 5 }}
                />
              </View>

              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                  title="Iniciar sesión"
                  onPress={handleSubmit}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Iniciar Sesion</Text>
                </TouchableOpacity>
              </View>

              {errorMessage && <Text>{errorMessage}</Text>}
              
            </View>
          );
          
 }
