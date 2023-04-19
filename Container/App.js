import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from '../Components/LandingPage/LandingPage';
import HomePage from '../Components/HomePage/HomePage';
import Login from '../Components/Login/Login';
import Perfil from '../Components/Perfil/Perfil';

const Stack = createStackNavigator();

export default function App() {

  return (

  <NavigationContainer>

  <Stack.Navigator initialRouteName="LandingPage">

  <Stack.Screen name="LandingPage" component={LandingPage} 
  // options={{ headerShown: false }} 
  />
  <Stack.Screen name="HomePage" component={HomePage} 
  // options={{ headerShown: false }}
  />
  <Stack.Screen name="Login" component={Login} 
  // options={{ headerShown: false }}
  />
  <Stack.Screen name="Perfil" component={Perfil} 
  // options={{ headerShown: false }}
  />

   </Stack.Navigator>

  </NavigationContainer>
  )

}
