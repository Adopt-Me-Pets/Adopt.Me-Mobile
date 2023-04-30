import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from "react";
import getAnimalesPerdidos from "../../Actions/getAnimalesPerdidos";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

export default function MapaPerdidas() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const mascotasPerdidas = useSelector((state)=>state.animalesPerdidosCopia);

    useEffect(() => {
        dispatch(getAnimalesPerdidos());
    }, [dispatch])

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      const [location, setLocation] = useState(null);
      const mapRef = useRef(null);
    
      useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

      useEffect(() => {
        if (location) {
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
    
          mapRef.current?.animateToRegion(region, 1000);
        }
      }, [location]);
    
      const handleMarkerPress = (lostPet) => {
        id = lostPet._id
        navigation.navigate('DetallePerdida', { id });
      };

    return (

        <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        followsUserLocation
        ref={mapRef}
      >
        {mascotasPerdidas.map(lostPet => (
            <Marker
            key={lostPet._id}
            coordinate={{ latitude: parseFloat(lostPet.lat), longitude: parseFloat(lostPet.lng) }}
            onPress={() => handleMarkerPress(lostPet)}

          >
          </Marker>
          
            ))}

      </MapView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
  });