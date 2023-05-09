import { Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../NavBar/NavBar";
import getgato from "../../Actions/getgatos";
import Loading from "../Loader/Loader";
import CardPerros from "../CardsMascotas/CardPerros"
import { ScrollView } from "react-native";


export default function HomePerros() {

  const dispatch = useDispatch();
  const gatos = useSelector((state)=>state.gatosCopia)


    useEffect(() => {
      dispatch(getgato())
  }, [])  
  

 if (gatos.length === 0) {
return (
  <>
  <Loading />
  </>
)
} 
    return (
      <>
      <ScrollView>
         <View >
          <NavBar />
           <Text> Gatos en Adopcion</Text>   
             {gatos.length > 0 && gatos.map(p => {
              return (

                           <CardPerros 
                               id={p._id}
                               gato = {p.gato}
                               nombre={p.nombre}                     
                               imagen={p.imagen}
                               edad={p.edad}
                               /> 
              )})
            }
              
        </View>  
        </ScrollView>
        </>
    )
}