import { useEffect } from "react";
import { Button, Image, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";
import getDetailMascotaPerdida from "../../Actions/detailMascotaPerdida";


export default function DetallePerdida({ route }) {

    const { id } = route.params;
    const dispatch = useDispatch();    
    const detallePerdida = useSelector((state) => state.animalesPerdidosDetail);
    console.log("detallePerdida", detallePerdida)

    useEffect(() => {
        dispatch(getDetailMascotaPerdida(id))  
    }, [dispatch])

    return (

        <View>

        <NavBar />

        <ScrollView>

        <Image 
                source={{ uri: detallePerdida.imagen }} 
                style={{ width: 200, height: 200, marginTop: 50 }}
                />

             <Text>
                Tamaño: {detallePerdida.tama}
            </Text>
            <Text>
                Estado: {detallePerdida.estado}
            </Text>
            <Text>
                Descripcion: {detallePerdida.descripcion}
            </Text>
       
            
        </ScrollView>

        </View>
    )
}