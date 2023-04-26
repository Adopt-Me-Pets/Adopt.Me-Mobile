import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import putUser from '../../Actions/putUsuario';
import { LoginContext } from '../Login/loginProvider';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDetalleUsuario from '../../Actions/getDetalleUsuario';

export default function GpsPaseador() {

  const { setLoggedIn } = useContext(LoginContext);
  const userData2 = useSelector((state) => state.userData);
  const userId = userData2;
  const usuario = useSelector((state) => state.users);
  const usuario2 = usuario.data;
  const usuario3 = userId ? usuario2.filter(({ email }) => email === userId.email) : [];
  const id = usuario3[0]?._id ?? null;
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken = AsyncStorage.getItem('token');
    if (authToken) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);

  console.log("latitude", region.latitude)
  console.log("longitude", region.longitude)

  useEffect(() => {
    dispatch(getDetalleUsuario(id))
  }, [dispatch, id])
  
  const detalleUser = useSelector((state) => state.detalleUsuario);
  
  useEffect(() => {
    let intervalId;

    const updateRegion = () => {
      intervalId = setInterval(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, 2000);
    }

    updateRegion();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let intervalId;

    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      mapRef.current?.animateToRegion(region, 1000);

      intervalId = setInterval(() => {
        const updatedUser = Object.assign({}, detalleUser, { lat: region.latitude, lng: region.longitude });
        dispatch(putUser(updatedUser, id));
        console.log("updatedUser", updatedUser)
      }, 2000);
    }

    return () => clearInterval(intervalId);
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        followsUserLocation
        ref={mapRef}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

