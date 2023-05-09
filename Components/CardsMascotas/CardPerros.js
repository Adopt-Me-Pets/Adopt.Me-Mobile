import React from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';



export default function CardPerros({ nombre, raza, id, perro, edad, imagen }) {
  
  const navigation = useNavigation();

    return (

        <View style={styles.container}>
          <View>
            <Image source={{ uri: imagen }} style={styles.tinyLogo} />
          </View>
          <View>
            <Text>Nombre: {nombre}</Text>
            <Text>Edad: {edad}</Text>
            <Text>{perro}</Text>
            <Text>Raza: {raza}</Text>
            <Text>Id: {id}</Text>
          </View>

          <Button
        title="Ver Detalles"
        onPress={() => {
          navigation.navigate('DetalleMascotas', { id })
        }}
        color="#EB274B"
      />
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