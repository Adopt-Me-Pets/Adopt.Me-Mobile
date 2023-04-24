import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CardPaseador({ nombre, id, puntuacion, fotoPerfil, anosExperiencia }) {

  const puntuaciones = puntuacion;
  const promedio = (puntuaciones.reduce((a, b) => a + b, 0) / puntuaciones.length).toFixed(3);
  const navigation = useNavigation();

  return (
    <View>

      <Text>{nombre}</Text>
      <Text>{anosExperiencia}</Text>
      <Image source={{ uri: fotoPerfil }} style={{ width: 200, height: 200}} />
      <Text>{promedio}</Text>

      <Button
        title="Ver Detalles"
        onPress={() => {
          navigation.navigate('DetallePaseador', { id })
        }}
        color="#EB274B"
      />

    </View>
  );
};

