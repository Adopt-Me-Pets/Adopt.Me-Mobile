import { Image, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LoginContext } from '../Login/loginProvider';
import { useContext, useEffect } from 'react';
import getusers from "../../Actions/getusers";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavBar from "../NavBar/NavBar";
import { TouchableOpacity } from "react-native-gesture-handler";
import CardPaseador from "./CardPaseador";
import { Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";


export default function ListadoPaseadores() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
    const usuario = useSelector((state) => state.users);
    const usuario2 = usuario.data;
    const walkers2 = Array.isArray(usuario2) && usuario2.length > 0 ? usuario2.filter(({ tipo }) => tipo === "paseador") : [];
    const usuarios = useSelector((state) => state.detalleUsuario);
    const [selectedCity, setSelectedCity] = useState(AsyncStorage.getItem('selectedCity') || '');
    const paseadores = Array.isArray(walkers2) && walkers2.length > 0 ? walkers2.filter(({ ciudad }) => ciudad === selectedCity._z || usuarios.ciudad) : [];
    useContext(LoginContext);
    const userData2 = useSelector((state) => state.userData);
    const userId = userData2;
    const usuario3 = userId ? usuario2.filter(({ email }) => email === userId.email) : [];
    const id = usuario3[0]?._id ?? null;

    useEffect(() => {
        dispatch(getusers())
        dispatch(getDetalleUsuario(id))
    }, [id, dispatch])

    useEffect(() => {
        const checkLoginStatus = async () => {
          try {
            const authToken = await AsyncStorage.getItem('token');
            if (authToken) {
              setLoggedIn(true);
            } else {
              setLoggedIn(false);
            }
          } catch (error) {
            console.error(error);
          }
        };
      
        checkLoginStatus();
      }, [setLoggedIn]);
      

      return (
        <View style={{ flex: 1 }}>
          <NavBar />
    
    <ScrollView>
          <View style={{ marginTop: 40 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
              Paseadores disponibles en tu Ciudad
            </Text>
          </View>
    
          <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: -50, marginTop: 50 }}>
            <Image source={require('../../Imagenes/map.png')} style={{ width: 70, height: 70 }} />
          </View>
    
          <TouchableOpacity onPress={() => navigation.navigate('TodosLosPaseadores')} style={{ alignItems: 'center' }}>
            <Button
              mode="contained"
              buttonColor="#063455"
              uppercase={false}
              style={{ marginTop: 100, marginBottom: 100 }}
              labelStyle={{ fontSize: 18 }}
            >
              Ver Paseadores Cerca Mio
            </Button>
          </TouchableOpacity>
    
          <View>
            {paseadores.length > 0 &&
              paseadores.map((p) => (
                <CardPaseador
                  key={p._id}
                  id={p._id}
                  nombre={p.nombre}
                  puntuacion={p.puntuacion}
                  fotoPerfil={p.fotoPerfil}
                  anosExperiencia={p.anosExperiencia}
                />
              ))}
          </View>
    
          <TouchableOpacity  onPress={() => navigation.navigate('HomePage')} style={{ alignItems: 'center' }}>
            <Button
              mode="contained"
              color="#063455"
              uppercase={false}
              style={{ marginTop: 10, marginBottom: 30 }}
              labelStyle={{ fontSize: 18 }}
            >
              VOLVER
            </Button>
          </TouchableOpacity>
          </ScrollView>
        </View>
      );
}