import { Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../NavBar/NavBar";
import getperro from "../../Actions/getperros";
import Loading from "../Loader/Loader";
import CardPerros from "../CardsMascotas/CardPerros"


export default function HomePerros() {

  const dispatch = useDispatch();
  const copiaPerros = useSelector((state)=>state.perrosCopia)
  console.log(copiaPerros)
 /*  const perros = copiaPerros.length
   console.log(perros) */


    useEffect(() => {
      dispatch(getperro())
  }, [])  
  

/* if (perros.length === 0) {
return (
  <>
  <Loading />
  </>
)
} */
    return (
         <View >
          <NavBar />
           <Text> Perros en Adopcion</Text>   
             {copiaPerros.length > 0 && copiaPerros.map(p => {
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
    )
}