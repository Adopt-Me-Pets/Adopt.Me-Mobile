import React, { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../Login/loginProvider';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Actions/userLogin';
import { Button, FormLabel, Grid, Input } from 'react-native-elements';

    function Login() {

        const [email, setEmail] = useState('');
        const [contrasena, setContrasena] = useState('');
        const [errorMessage, setErrorMessage] = useState('');
        const { login } = useContext(LoginContext);
        const navigation = useNavigation();
        const dispatch = useDispatch();

        const handleSubmit = async () => {
            try {
             const response = await axios.post('http://localhost:3001/login', {
                email: email,
                contrasena: contrasena
            });
                localStorage.setItem('token', response.data.token);
                login();
                dispatch(setUser(response.data));
                navigation.navigate('Homepage');
            } catch (error) {
                setErrorMessage('No se pudo iniciar sesión. Por favor, verifique sus credenciales.');
            }
        };

 return (

        <Grid container spacing={3} alignItems="center" justify="center" style={{ marginTop: "15%"}}>

        <Grid item xs={12} style={{ width: "30%", marginTop: "2%" }}>
        <FormLabel htmlFor="email">Correo electrónico:</FormLabel>
        <Input
            keyboardType="email-address"
            id="email"
            name="email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            required
            style={{ width: "80%"}}
        />
        </Grid>

        <Grid item xs={12} style={{ width: "30%", marginTop: "2%" }}>
        <FormLabel htmlFor="password">Contraseña:</FormLabel>
        <Input
            secureTextEntry={true}
            id="password"
            name="password"
            value={contrasena}
            onChangeText={(value) => setContrasena(value)}
            required
            style={{ width: "80%"}}
        />
        </Grid>

        <Grid item xs={12} style={{ marginTop:"5%"}}>
        <Button
        title="Iniciar sesión"
        onPress={handleSubmit}
        buttonStyle={{ backgroundColor: "#063455" }}
        />
        </Grid>
        {errorMessage && <Text>{errorMessage}</Text>}

        </Grid>
    );
 }

export default Login;