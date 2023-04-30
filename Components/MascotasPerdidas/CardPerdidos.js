import { Button, Image, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function CardPerdidos({id, tama, estado, imagen}) {

    const navigation = useNavigation();

    return (

        <View>


        <Text>Tamaño: {tama}</Text>
      <Text>EStado: {estado}</Text>
      <Image source={{ uri: imagen }} style={{ width: 200, height: 200}} />
      
      <Button
        title="Ver Detalles"
        onPress={() => {
          navigation.navigate('DetallePerdida', { id })
        }}
        color="#EB274B"
      />

        </View>
    )
}