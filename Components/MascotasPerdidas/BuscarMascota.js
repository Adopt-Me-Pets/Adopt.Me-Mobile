import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import getAnimalesPerdidos from "../../Actions/getAnimalesPerdidos";
import getGatoPerdido from "../../Actions/getGatosPerdidos";
import getPerroPerdido from "../../Actions/getPerrosPerdidos";
import { useEffect } from "react";
import Loading from "../Loader/Loader";
import CardPerdidos from "./CardPerdidos";
import NavBar from "../NavBar/NavBar";
import { useNavigation } from '@react-navigation/native';



export default function BuscarMascotaPerdida() {

    const dispatch = useDispatch();
    const allPets = useSelector((state)=>state.animalesPerdidosCopia);
  /*   console.log(allPets) */
    const navigation = useNavigation();

    useEffect(()=>{      
        dispatch(getAnimalesPerdidos());
        dispatch(getGatoPerdido());
        dispatch(getPerroPerdido());   
      }, [dispatch]);

      function handleGato (e){    
        dispatch(getGatoPerdido(e.target.value))    
      };
      function handlePerro (e){    
        dispatch(getPerroPerdido(e.target.value)); 
      };
      function handleRecargar (e){     
        dispatch(getAnimalesPerdidos(e.target.value));
      };
    
      if (allPets.length === 0) {
        return (
            <>
            <Loading />
            </>
        )
      }

    return (

        <View>

            <NavBar />

        <ScrollView>
        <View>

            <Text>
                Buscar mascota perdida
            </Text>

         <View>

            <Button title="Gatos" onPress={handleGato}><Text>Gatos</Text></Button>
            <Button title="Perros" onPress={handlePerro}><Text>Perros</Text></Button>
            <Button title="Todos" onPress={handleRecargar}><Text>Todos</Text></Button>

            </View>     


            <Button
            title="Ver Mascotas Perdidas cerca mio"
              mode="contained"
              buttonColor="#063455"
              uppercase={false}
              style={{ marginTop: 100, marginBottom: 100 }}
              labelStyle={{ fontSize: 18 }}
              onPress={() => navigation.navigate('MapaPerdidas')}
            >
            </Button>



        <View style={{ marginBottom: "50%"}}>

        {allPets.length > 0 && allPets.map(a => (
        
            <CardPerdidos
            key={a.id}
            id = {a._id}
            gato = {a.gato}
            perro = {a.perro}
            tama = {a.tama}       
            estado = {a.estado}
            imagen = {a.imagen}
            />   
            
        ))}

        </View>

        </View>
        </ScrollView>

        </View>
    )
}