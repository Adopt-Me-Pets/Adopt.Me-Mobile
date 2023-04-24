import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import getusers from "../../Actions/getusers";
import putUser from "../../Actions/putUsuario";
import { useRef } from "react";
import { LoginContext } from "../Login/loginProvider";
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from "@react-native-async-storage/async-storage";
import markerImage from "./paseador.png";
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

export default function  VerGpsMascota() {

    const navigation = useNavigation();
    const { setLoggedIn } = useContext(LoginContext);
    const userData2 = useSelector((state) => state.userData);
    const userId = userData2;
    const usuario = useSelector((state) => state.users);
    const usuario2 = usuario.data;
    const usuario3 = userId ? usuario2.filter(({ email }) => email === userId.email) : [];
    const id = usuario3[0]?._id ?? null;

    const detalleUsuario = useSelector((state) => state.detalleUsuario)
    const walkers2 = usuario2.filter(({ tipo }) => tipo === "paseador") 
    const walkers3 = walkers2.filter(({ _id }) => _id === detalleUsuario.paseadorContratado) 
    const idPaseador = walkers3[0]._id;
    let puntuaciones = walkers3[0].puntuacion;

      const dispatch = useDispatch();
  
  useEffect(() => {
        dispatch(getDetalleUsuario(id));
      }, [dispatch, id]);

    const latitude = walkers3 && walkers3.length > 0 ? walkers3.map(({ lat }) => lat) : null;
    const longitude = walkers3 && walkers3.length > 0 ? walkers3.map(({ lng }) => lng): null;
    const latitude1 = latitude[0]
    const longitude1 = longitude[0]

    useEffect(() => {
        const interval = setInterval(() => {
          dispatch(getusers());
        }, 2000);
      
        return () => clearInterval(interval);
      }, [dispatch]);
      
    
      useEffect(() => {
        const authToken = AsyncStorage.getItem('token');
        if (authToken) {
          setLoggedIn(true);
        }
      }, [setLoggedIn]);

    /////////////////////////////////////////// PUNTUACION DEL PASEADOR ///////////////////////////////////////////////

        const [defaultRating, setDefaultRating] = useState(0);
        const [maxRating, setMaxRating] = useState(5);

        console.log("defaultRating", defaultRating)
      
        const handleRating = (rating) => {
          setDefaultRating(rating);
          const newPuntuacion = [...puntuaciones, rating]; 
          dispatch(putUser({ puntuacion: newPuntuacion }, idPaseador));
        };
        

        //////////////////////////////////////////// UBICACION PASEADOR ///////////////////////////////////////77777

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      const location = latitude1 && longitude1 ? [latitude1, longitude1] : null;
      const mapRef = useRef(null);  

      useEffect(() => {
  if (latitude1 && longitude1) {
    setRegion({
      latitude: latitude1,
      longitude: longitude1,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    mapRef.current?.animateToRegion({
      latitude: latitude1,
      longitude: longitude1,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }, 1000);
    mapRef.current?.animateToRegion(region, 1000);
  }
}, [latitude1, longitude1]);

const moveToMarker = () => {
  if (mapRef && region.latitude && region.longitude) {
    mapRef.current.animateToRegion({
      latitude: parseFloat(latitude1),
      longitude: parseFloat(longitude1),
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  }
};
  

    return (

        <View>
            <View style={{width: "100%", height: "100%"}}>
                     
                     <MapView
                       style={{ flex: 1}}
                       region={region}
                       showsUserLocation
                       followsUserLocation
                       ref={mapRef}
                     >
                    
                    {location && latitude1 && longitude1 && (
                        <Marker
                            coordinate={{
                                latitude: parseFloat(latitude1),
                                longitude: parseFloat(longitude1)
                            }}
                            title="Mi ubicación"
                            image={markerImage}
                        />
                        )}

                        
                     </MapView>

                     <View >
                        <Text style={{ marginBottom: 20 }}>Califica el servicio:</Text>
                        <Rating
                            type='star'
                            ratingCount={maxRating}
                            startingValue={defaultRating}
                            imageSize={30}
                            onFinishRating={(rating) => {
                              handleRating(rating);
                            }}
                            style={{ paddingVertical: 10 }}
                          />

                        <Text style={{ marginTop: 20 }}>
                          Tu calificación es: {defaultRating}/{maxRating}
                        </Text>
                      </View>

                     <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 }}>
                      <TouchableOpacity
                        style={{ backgroundColor: 'red', borderRadius: 15, padding: 15 }}
                        onPress={() => {
                         navigation.navigate('HomePage')
                        }}
                      >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Volver</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ backgroundColor: 'red', borderRadius: 15, padding: 15 }}
                        onPress={moveToMarker}
                      >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Ver Ubicacion del Paseador</Text>
                      </TouchableOpacity>
                    </View>

                   </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 1,
    },
    button: {
      backgroundColor: '#007AFF',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
    },
  });
  