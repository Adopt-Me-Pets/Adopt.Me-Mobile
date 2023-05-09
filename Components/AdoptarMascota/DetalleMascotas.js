import { Text, View, ToastAndroid, ScrollView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LoginContext } from "../Login/loginProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import getusers from "../../Actions/getusers";
import getmascotasbyid from "../../Actions/getmascotabyid";
import { useNavigation } from '@react-navigation/native';
import Loading from "../Loader/Loader";

export default function DetalleMascotas({ route }) {

    const { id } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const detail = useSelector((state) => state.animalesdetail);
    const petOwner = useSelector((state) => state.users);
    const detalleUser = useSelector((state) => state.detalleUsuario);
    const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
    const idUser = user ? user[0]._id : null;
    const ownerPet = petOwner.data;
    const ownerPet2 = ownerPet ? ownerPet.filter(({ _id }) => _id === detail.pichina) : []; 
    const nombre = ownerPet2.map(({ nombre }) => nombre);
    const telefono = ownerPet2.map(({ telefono }) => telefono);
    const email = ownerPet2.map(({ email }) => email);
    const emailUsuario = user ? user[0].email : null;
    const nombreUsuario = user ? user[0].nombre : null;

    useEffect(() => {
        dispatch(getmascotasbyid(id));
        dispatch(getDetalleUsuario(idUser));
        dispatch(getusers());
    }, [dispatch, id, idUser])

    useEffect(() => {
        async function getUser() {
          try {
            const storedUser = await AsyncStorage.getItem('user');
            setUser(JSON.parse(storedUser));
          } catch (error) {
            console.log(error);
          }
        }
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

      const [input, setInput] = useState({
        nombre: nombre,
        telefono: telefono,
        email: email,
        emailUsuario: emailUsuario,
        nombreUsuario: nombreUsuario
      });

      ////////////////////////////////////////////////////////////////////////////////

      function onClick() {
        if (!isLoggedIn) {
          ToastAndroid.fail("Debes iniciar sesion para poder adoptar", ToastAndroid.SHORT)
        }
    
        if (!detalleUser.usuario) {
          ToastAndroid.fail("Debes completar el registro en tu perfil antes de adoptar")
            "Debes completar el registro en tu perfil antes de adoptar",ToastAndroid.SHORT
        }
        if ((isLoggedIn && detalleUser.usuario)) {
    
          dispatch(emailInfoAdoptante(input));
          setInput({
            nombre: "",
            telefono: "",
            email: "",
            emailUsuario: "",
            nombreUsuario: ""
          });
    
    
          ToastAndroid.show(`Esta es la informacion del usuario que dio en adopcion esta mascota: \n
          Se enviara un mail con estos datos a tu correo electronico \n 
          Nombre: ${nombre} \n 
          Telefono: ${telefono} \n 
          Email: ${email}`, ToastAndroid.SHORT)
            navigation.navigate("HomePage");
        }
      }

      if (detail.length === 0) {
        return (
            <>
            <Loading />
            </>
        )
      }

    return (

        <View>

            <ScrollView>

            <View>
                <Text>Detalles de la mascota</Text>
            </View>

        <View>
        <Image source={{ uri: detail.imagen }} style={{ width: 200, height: 200}} />
                <Text>Nombre: {detail.nombre}</Text>
                <Text>Raza: {detail.raza}</Text>
                <Text>Estado: {detail.estado}</Text>
                <Text>Tamaño: {detail.tamaño}</Text>
                <Text>Descripcion: {detail.descripcion}</Text>
                <Text>Edad: {detail.edad}</Text>
                <Text>Peso: {detail.peso}</Text>
                <Text>Castrado: {detail.castrado}</Text>
                <Text>Vacunado: {detail.vacunado}</Text>
        </View>

            </ScrollView>
        </View>

    )
}