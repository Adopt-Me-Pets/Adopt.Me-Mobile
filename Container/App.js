import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from '../Components/LandingPage/LandingPage';
import HomePage from '../Components/HomePage/HomePage';
import Login from '../Components/Login/Login';
import Perfil from '../Components/Perfil/Perfil';
import DarUbicacionPaseadorGps from '../Components/GpsTiempoReal/DarUbicacionPaseador';
import VerGpsMascota from '../Components/GpsTiempoReal/VerGpsMascota';
import RegistroUsuario from '../Components/FormularioRegistro/FormularioRegistro';
import Cartelito from '../Components/FormularioRegistro/Cartelito';
import RegistroMascota from '../Components/FormularioDonarMascota/FormularioDonarMascota';
import DetalleMascotas from '../Components/AdoptarMascota/DetalleMascotas';
import ReportarMascotaPerdida from '../Components/MascotasPerdidas/ReportarMascota';
import BuscarMascotaPerdida from '../Components/MascotasPerdidas/BuscarMascota';
import HomePerros from '../Components/AdoptarMascota/HomePerros';
import HomeGatos from '../Components/AdoptarMascota/HomeGatos';
import PlanesMascotaPerdida from '../Components/PlanesMascotasPerdidas/PlanesMascotasPerdidas';
import DetallePaseador from '../Components/Paseadores/DetallePaseador';
import ListadoPaseadores from '../Components/Paseadores/ListadoPaseadores';
import Top10Paseadores from '../Components/Paseadores/Top10Paseadores';
import MyMap from '../Components/Mapas/mapa';
import TodosLosPaseadores from '../Components/Mapas/TodosLosPaseadores';
// import PayPal2 from '../Components/Paseadores/paypal';



const Stack = createStackNavigator();

export default function App() {

  return (

  <NavigationContainer>

  <Stack.Navigator initialRouteName="LandingPage">

  <Stack.Screen name="LandingPage" component={LandingPage} 
  options={{ headerShown: false }} 
  />
  <Stack.Screen name="HomePage" component={HomePage} 
  options={{ headerShown: false }}
  />
  <Stack.Screen name="Login" component={Login} 
  options={{ headerShown: false }}
  />
  <Stack.Screen name="Perfil" component={Perfil} 
  options={{ headerShown: false }}
  />
    <Stack.Screen name="GpsPaseador" component={DarUbicacionPaseadorGps} 
  options={{ headerShown: false }}
  />
   <Stack.Screen name="VerGpsMascota" component={VerGpsMascota} 
  options={{ headerShown: false }}
  />
  <Stack.Screen name="RegistroUsuario" component={RegistroUsuario} 
  options={{ headerShown: false }}
  />
  <Stack.Screen name="Cartelito" component={Cartelito} 
  options={{ headerShown: false }}
  />
  <Stack.Screen name="RegistroMascota" component={RegistroMascota} 
  options={{ headerShown: false }}
  />
<Stack.Screen name="DetalleMascotas" component={DetalleMascotas} 
  options={{ headerShown: false }}
  />
   <Stack.Screen name="HomePerros" component={HomePerros} 
  options={{ headerShown: false }}
  />
   <Stack.Screen name="HomeGatos" component={HomeGatos} 
  options={{ headerShown: false }}
  />
   <Stack.Screen name="ReportarMascota" component={ReportarMascotaPerdida} 
  options={{ headerShown: false }}
  />
   <Stack.Screen name="BuscarMascota" component={BuscarMascotaPerdida} 
  options={{ headerShown: false }}
  />
   <Stack.Screen name="PlanesMascotasPerdidas" component={PlanesMascotaPerdida} 
  options={{ headerShown: false }}
  />
  <Stack.Screen name="DetallePaseador" component={DetallePaseador} 
  options={{ headerShown: false }}
  />
  <Stack.Screen name="ListadoPaseadores" component={ListadoPaseadores}
  options={{ headerShown: false }}
  />
  <Stack.Screen name="Top10Paseadores" component={Top10Paseadores}
  options={{ headerShown: false }}
  />
  <Stack.Screen name="Mapa" component={MyMap}
  options={{ headerShown: false }}
  />
  <Stack.Screen name="TodosLosPaseadores" component={TodosLosPaseadores}
  options={{ headerShown: false }}
  />

   </Stack.Navigator>

  </NavigationContainer>
  )

}
