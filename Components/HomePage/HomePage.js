import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { LoginContext } from '../Login/loginProvider';
import { useContext, useEffect, useRef } from "react";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import getusers from "../../Actions/getusers";
import NavBar from "../NavBar/NavBar";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomePage() {

  const dispatch = useDispatch();
  const detalleUser = useSelector((state) => state.detalleUsuario); 
  const { isLoggedIn = false, setLoggedIn } = useContext(LoginContext);
  const userData2 = useSelector((state) => state.userData);
  const userId = userData2;
  const usuario = useSelector((state) => state.users);
  const usuario2 = usuario.data;
  const usuario3 = userId ? usuario2.filter(({ email }) => email === userId.email) : [];
  const id = usuario3[0]?._id ?? null;
  const navigation = useNavigation();

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
    if (!usuario) {
      ToastAndroid.show("Debes iniciar sesión para poder poner en adopción", ToastAndroid.SHORT);
      return;
    }

    if (!detalleUser || !detalleUser.usuario) {
      ToastAndroid.show("Debes completar el registro en tu perfil antes de poner en adopción", ToastAndroid.SHORT);
      return;
    }

    navigation.navigate("RegistroMascota");
  }

  useEffect(() => {
    dispatch(getDetalleUsuario(id));
    dispatch(getusers());
  }, [id, dispatch]);

  const usuarios = useSelector((state) => state.detalleUsuario);
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

  if (isLoggedIn && usuarios.tipo === "paseador") {

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

  } else if (isLoggedIn && usuarios.paseadorContratado !== undefined && usuarios.paseadorContratado !== ""){

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
            style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Ver Ubicacion de mi Mascota</Text>
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
         onPress={() => navigation.navigate('PlanesMascotasPerdidas')}
          color="#063455"
          style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
          >
            <Text 
            style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Planes Mascota Perdida</Text>
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


  } else if (isLoggedIn && usuarios.paseadorContratado === "" && usuarios.paseadorContratado === undefined) {

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
                 onPress={() => navigation.navigate('PlanesMascotasPerdidas')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Planes Mascota Perdida</Text>
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
                 onPress={() => navigation.navigate('PlanesMascotasPerdidas')}
                  color="#063455"
                  style={{ backgroundColor: '#063455', borderRadius: 15, padding: 15}}
                  >
                    <Text 
                    style={{ color: 'white', textAlign: 'center', fontSize: 20}}>Planes Mascota Perdida</Text>
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
