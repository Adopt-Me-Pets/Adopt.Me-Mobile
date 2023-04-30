import { useNavigation } from '@react-navigation/native';
import { LoginContext } from '../Login/loginProvider';
import { useContext, useEffect, useRef } from "react";
import NavBar from "../NavBar/NavBar";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';

export default function HomePage() {

  const { isLoggedIn = false, setLoggedIn } = useContext(LoginContext);
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        setUser(JSON.parse(storedUser));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(true);
    getUser();
  }, [isLoggedIn]);

  
  useEffect(() => {
    async function checkLoggedIn() {
      const authToken = await AsyncStorage.getItem('token');
      if (authToken) {
        setLoggedIn(true);
      }
    }

    checkLoggedIn();
  }, [setLoggedIn]);

  async function onClick() {
    if (!isLoggedIn) {
      ToastAndroid.show("Debes iniciar sesión para poder poner en adopción", ToastAndroid.SHORT);
      return;
    }

    if (!detalleUser || !detalleUser.usuario) {
      ToastAndroid.show("Debes completar el registro en tu perfil antes de poner en adopción", ToastAndroid.SHORT);
      return;
    }

    navigation.navigate("RegistroMascota");
  }

  const hoverRef = useRef(null);

  const removeHoverClass = () => {
    if (hoverRef.current) {
      hoverRef.current.setNativeProps({
        style: { backgroundColor: 'transparent' } 
      });
    }
  };

  useEffect(() => {
    if (hoverRef.current) {
      hoverRef.current.setNativeProps({
        onTouchStart: () => hoverRef.current.setNativeProps({ style: { backgroundColor: 'blue' } }), 
        onTouchEnd: removeHoverClass 
      });
    }
  }, [hoverRef]);

  if (isLoggedIn && !isLoading && user[0].tipo === "paseador") {

    return (
      <View  >

        <NavBar />

        <View style={{ marginTop: "15%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity  
             style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
             onPress={() => navigation.navigate('GpsPaseador')}>
            <Text style={{ color: "white"}}>Dar mi Posicion de GPS</Text>
          </TouchableOpacity>
        </View>

      </View>
    );

  } else if (isLoggedIn && !isLoading && user[0].paseadorContratado !== undefined && user[0].paseadorContratado !== ""){

    return (
<View>

<NavBar />

<ScrollView>
<View>


<View style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>

      <View style={{ marginTop: "15%", width: "50%" }}>
        <TouchableOpacity
        onPress={() => navigation.navigate('VerGpsMascota')}
          color="#063455"
          style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
          >
            <Text 
            style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Ver Ubicacion del Paseador</Text>
        </TouchableOpacity>
      </View>
      

      <View style={{ marginTop: "15%", width: "50%" }}>
        <TouchableOpacity
        onPress={() => navigation.navigate('HomePerros')}
          color="#063455"
          style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
          >
            <Text 
            style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Adoptar Perro</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: "15%", width: "50%" }}>
        <TouchableOpacity
        onPress={() => navigation.navigate('HomeGatos')}
          color="#063455"
          style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
          >
            <Text 
            style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Adoptar Gato</Text>
        </TouchableOpacity>
      </View>


      <View style={{ marginTop: "15%", width: "50%" }}>
        <TouchableOpacity
        onPress={() => navigation.navigate('RegistroMascota')}
          color="#063455"
          style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
          >
            <Text 
            style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Dar en Adopcion</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: "15%", width: "50%" }}>
        <TouchableOpacity
        onPress={() => navigation.navigate('BuscarMascota')}
          color="#063455"
          style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
          >
            <Text 
            style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Buscar Mascota Perdida</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: "15%", width: "50%", marginBottom: "30%" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ReportarMascota')}
          color="#063455"
          style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
          >
            <Text 
            style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Reportar Mascota Perdida</Text>
        </TouchableOpacity>
      </View>

      </View>
    </View>
    </ScrollView>
    </View>
    )


  } else if (isLoggedIn && !isLoading && user[0].paseadorContratado === "" && user[0].paseadorContratado === undefined) {

    return (

      <View>

        <NavBar />

      <ScrollView>
      <View>


        <View style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>


              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('ListadoPaseadores')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Contratar Paseador</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                 onPress={() => navigation.navigate('Top10Paseadores')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Ver Top 10 Paseadores</Text>
                </TouchableOpacity>
              </View>


              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('HomePerros')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Adoptar Perro</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('HomeGatos')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Adoptar Gato</Text>
                </TouchableOpacity>
              </View>


              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('RegistroMascota')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Dar en Adopcion</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('BuscarMascota')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Buscar Mascota Perdida</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: "15%", width: "50%", marginBottom: "30%" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ReportarMascota')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Reportar Mascota Perdida</Text>
                </TouchableOpacity>
              </View>

              </View>
      </View>
      </ScrollView>
      </View>
    )

  } else {

    return (

      <View>

        <NavBar />

      <ScrollView>
      <View>


        <View style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>

        <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('RegistroUsuario')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Registrarse</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('ListadoPaseadores')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Contratar Paseador</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                 onPress={() => navigation.navigate('Top10Paseadores')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Ver Top 10 Paseadores</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('HomePerros')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Adoptar Perro</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('HomeGatos')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Adoptar Gato</Text>
                </TouchableOpacity>
              </View>


              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('RegistroMascota')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Dar en Adopcion</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: "15%", width: "50%" }}>
                <TouchableOpacity
                onPress={() => navigation.navigate('BuscarMascota')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Buscar Mascota Perdida</Text>
                </TouchableOpacity>
              </View>

              <View style={{ marginTop: "15%", width: "50%", marginBottom: "30%" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ReportarMascota')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Reportar Mascota Perdida</Text>
                </TouchableOpacity>
              </View>

              </View>
      </View>
      </ScrollView>
      </View>
    )

  }
}
