import { Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../NavBar/NavBar";
import getperro from "../../Actions/getperros";
import Loading from "../Loader/Loader";
import CardPerros from "../CardsMascotas/CardPerros"
import { ScrollView } from "react-native";


export default function HomePerros() {

  const dispatch = useDispatch();
  const perros = useSelector((state)=>state.perrosCopia)


    useEffect(() => {
      dispatch(getperro())
  }, [])  
  

 if (perros.length === 0) {
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
           <Text> Perros en Adopcion</Text>   
             {perros.length > 0 && perros.map(p => {
              return (

                           <CardPerros 
                               id={p._id}
                               perro = {p.perro}
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