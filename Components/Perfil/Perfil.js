import React, { useContext, useEffect, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import NavBar from "../NavBar/NavBar"
import { useDispatch, useSelector } from "react-redux";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import getusers from "../../Actions/getusers";
import { LoginContext } from "../Login/loginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Perfil() {

    const dispatch = useDispatch();
    const [Render, setRender] = useState(1);
    const userData2 = useSelector((state) => state.userData);
    const userId = userData2;
    const usuario = useSelector((state) => state.users);
    const usuario2 = usuario.data;
    const usuario3 = userId ? usuario2.filter(({ email }) => email === userId.email) : [];
    console.log("tipo", usuario3[0].tipo)
    const id = usuario3[0]?._id ?? null;
    const { isLoggedIn = false, setLoggedIn } = useContext(LoginContext);

    useEffect(() => {
            dispatch(getDetalleUsuario(id));
            dispatch(getusers())
    }, [id, dispatch]);

    useEffect(() => {
        async function checkLoggedIn() {
          const authToken = await AsyncStorage.getItem('token');
          if (authToken) {
            setLoggedIn(true);
          }
        }
    
        checkLoggedIn();
      }, [setLoggedIn]);


    const detalleUser = useSelector((state) => state.detalleUsuario); 
    const usuarioRol = detalleUser && detalleUser.roles ? detalleUser.roles[0] : null;
    const tipoUsuario = detalleUser && detalleUser.tipo ? detalleUser.tipo : null;

    if (usuarioRol === "63d1c3225aa2085acb263f1e") {

    return (

        <View >

            <NavBar />

            <View style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>

            <Text style={{ fontSize: 35, marginTop: "20%"}}>
                {detalleUser.usuario}
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
                Usuario: {detalleUser.usuario}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
                Nombre: {detalleUser.nombre}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
                Telefono: {detalleUser.telefono}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
               Ciudad: {detalleUser.ciudad}
            </Text>

            <Text style={{ fontSize:25, marginTop: "10%"}}>
                Pais: {detalleUser.pais}
            </Text>

            <Text style={{ fontSize:25, marginTop: "10%"}}>
                Direccion: {detalleUser.direccion}
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
                Usuario: {detalleUser.usuario}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
                Nombre: {detalleUser.nombre}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
                Telefono: {detalleUser.telefono}
            </Text>

            <Text style={{ fontSize: 25, marginTop: "10%"}}>
               Ciudad: {detalleUser.ciudad}
            </Text>

            <Text style={{ fontSize:25, marginTop: "10%"}}>
                Pais: {detalleUser.pais}
            </Text>

            <Text style={{ fontSize:25, marginTop: "10%"}}>
                Direccion: {detalleUser.direccion}
            </Text>

           

                </View>
        </View>
    )

}
}