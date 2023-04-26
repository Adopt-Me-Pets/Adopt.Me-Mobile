import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import getusers from '../../Actions/getusers';
import { useNavigation } from '@react-navigation/native';

export default function TodosLosPaseadores() {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dogWalker = useSelector((state) => state.users);
  const walkers = dogWalker.data;
  const walkers2 = Array.isArray(walkers) && walkers.length > 0 ? walkers.filter(({ tipo }) => tipo === "paseador") : [];

  useEffect(() => {
    dispatch(getusers());
  }, [dispatch]);

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

  const handleMarkerPress = (walker) => {
    id = walker._id
    navigation.navigate('DetallePaseador', { id });
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
        {walkers2.map(walker => (
            <Marker
            key={walker._id}
            coordinate={{ latitude: parseFloat(walker.lat2), longitude: parseFloat(walker.lng2) }}
            title={walker.nombre}
            onPress={() => handleMarkerPress(walker)}

          >
          </Marker>
          
            ))}

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
