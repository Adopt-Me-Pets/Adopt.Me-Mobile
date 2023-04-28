import React, { useContext, useEffect, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import NavBar from "../NavBar/NavBar"
import { LoginContext } from "../Login/loginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {

    const { isLoggedIn = false, setLoggedIn } = useContext(LoginContext);
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

    const usuarioRol = user && user[0].roles ? user[0].roles[0] : null;
    const tipoUsuario = user && user[0].tipo ? user[0].tipo : null;

    if (usuarioRol === "63d1c3225aa2085acb263f1e") {

    return (

        <View >

            <NavBar />

            <View style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>

            <Text style={{ fontSize: 35, marginTop: "20%"}}>
                {user[0].usuario}
            </Text>

            <Text style={{ fontSize: 25, padding: 15, marginTop: "40%"}}>
                Para ingresar el Panel de Administrador debes dirigirte a la pagina web desde una Pc de Escritorio
            </Text>

                </View>
        </View>
    )
} else if (usuarioRol === "63d1c3225aa2085acb263f1d" && tipoUsuario === "usuario") {

    return (

        <View >

            <NavBar />

            <View style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>

           
            <Text style={{ fontSize: 25, marginTop: "10%"}}>
                Usuario: {user[0].usuario}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
                Nombre: {user[0].nombre}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
                Telefono: {user[0].telefono}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
               Ciudad: {user[0].ciudad}
            </Text>

            <Text style={{ fontSize:25, marginTop: "10%"}}>
                Pais: {user[0].pais}
            </Text>

            <Text style={{ fontSize:25, marginTop: "10%"}}>
                Direccion: {user[0].direccion}
            </Text>

                </View>
        </View>
    )

} else if (usuarioRol === "63d1c3225aa2085acb263f1d" && tipoUsuario === "paseador") {

    return (

        <View >

            <NavBar />

            <View style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>

            

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
                Usuario: {user[0].usuario}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
                Nombre: {user[0].nombre}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
                Telefono: {user[0].telefono}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
               Ciudad: {user[0].ciudad}
            </Text>

            <Text style={{ fontSize:25, marginTop: "10%"}}>
                Pais: {user[0].pais}
            </Text>

            <Text style={{ fontSize:25, marginTop: "10%"}}>
                Direccion: {user[0].direccion}
            </Text>

           

                </View>
        </View>
    )

}
}