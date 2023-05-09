import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";



export default function CardPerros({ nombre, raza, id, perro, edad, imagen }) {

    return (

        <View style={styles.container}>
          <View>
            <Image style={styles.tinyLogo}>{imagen}</Image>
          </View>
          <View>
            <Text>Nombre: {nombre}</Text>
            <Text>Edad: {edad}</Text>
            <Text>{perro}</Text>
            <Text>Raza: {raza}</Text>
            <Text>Id: {id}</Text>
          </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });