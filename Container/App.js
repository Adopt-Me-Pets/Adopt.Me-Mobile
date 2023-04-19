import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from '../Components/LandingPage/LandingPage';
import HomePage from '../Components/HomePage/HomePage';

const Stack = createStackNavigator();

export default function App() {

  return (

  <NavigationContainer>

  <Stack.Navigator initialRouteName="LandingPage">

  <Stack.Screen name="LandingPage" component={LandingPage} />
  <Stack.Screen name="HomePage" component={HomePage} />

   </Stack.Navigator>

  </NavigationContainer>
  )

}
