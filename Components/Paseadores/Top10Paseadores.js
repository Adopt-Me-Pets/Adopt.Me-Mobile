import { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import getusers from "../../Actions/getusers";
import CardPaseador from "./CardPaseador";


export default function Top10Paseadores() {

    const dispatch = useDispatch();

    const dogWalker = useSelector((state) => state.users);
    const walkers = dogWalker.data 
    const walkers2 = walkers && walkers.length > 0 ? walkers.filter(({ tipo, puntuacion }) => tipo === "paseador" && puntuacion)
        .sort((a, b) => {
          const aDistance = Math.abs(a.puntuacion - 5);
          const bDistance = Math.abs(b.puntuacion - 5);
          return aDistance - bDistance;
        })
        .slice(0, 10) : [];


    useEffect(() => {
      dispatch(getusers())
  }, [dispatch])

    return (

        <View>
            <Text>
               Top 10 de los paseadores de tu ciudad
            </Text>

            <View>
            {walkers2.length > 0 &&
              walkers2.map((p) => (
                <CardPaseador
                  key={p._id}
                  id={p._id}
                  nombre={p.nombre}
                  puntuacion={p.puntuacion}
                  fotoPerfil={p.fotoPerfil}
                  anosExperiencia={p.anosExperiencia}
                />
              ))}
          </View>
        </View>
    )
}