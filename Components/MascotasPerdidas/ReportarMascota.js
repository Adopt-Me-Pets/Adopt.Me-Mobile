import { Button, Image, Modal, ScrollView, Text, TextInput, ToastAndroid, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import createLocationPerdidos from "../../Actions/createLocationPerdidos";
import createAnimalPerdido from "../../Actions/createAnimalPerdido";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as Location from 'expo-location';
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import NavBar from "../NavBar/NavBar";

export default function ReportarMascotaPerdida() {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        perro: false,
        gato: false,        
        estado: [],
        tama: [],
        peso: "",
        descripcion: "",        
        imagen: "",
        lng: "",
        lat: "",
        adoptado: false
    });
    
      
      //////////////////////////////////////////////////////////////// SUBMIT
      
      function handleSubmit(e){
          e.preventDefault();
          
          dispatch(createLocationPerdidos(input))
          dispatch(createAnimalPerdido(input));
            
            ToastAndroid.show("Debes completar el registro en tu perfil antes de poner en adopción", ToastAndroid.SHORT)
            navigation.navigate("HomePage");
        }

        function handleChange(name, newText) {    
              setInput((prev) => ({ 
                ...prev, 
                [name]: newText,
              }));
            }
        
        ////////////////////////////////////////////////////// HANDLE PICKER
        
        
        function handlePickerChange(value) {
            setInput((prev) => ({ 
              ...prev, 
              tama: value,
            }));
          }

          function handlePickerChange2(value) {
            setInput((prev) => ({ 
              ...prev, 
              estado: value,
            }));
          }

        //////////////////////////////////////////////////////////// CHECK PERRO GATO
        
            const [checked, setChecked] = useState(false);
            const [checked2, setChecked2] = useState(false);
        
            function handleGato(newValue) {
                setInput((prevState) => {
                  return {
                    ...prevState,
                    gato: newValue,
                  };
                });
              }
              
              function handlePerro(newValue) {
                setInput((prevState) => {
                  return {
                    ...prevState,
                    perro: newValue,
                  };
                });
              }

        //////////////////////////////////////////////////////////////// IMAGEN

        const firebaseConfig = {
            apiKey: "AIzaSyAU92LeMpd7lymTILDLkz2FkPuDx_PSGbk",
            authDomain: "adoptme-9d02f.firebaseapp.com",
            projectId: "adoptme-9d02f",
            storageBucket: "adoptme-9d02f.appspot.com",
          };
    
            initializeApp(firebaseConfig);
         
            const selectImage = async () => {
              let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
            
              if (!result.canceled) {
      
                const storage = getStorage();
                const uuid = uuidv4();
                const storageRef = ref(storage, `usuario/${uuid}`);
          
                const response = await fetch(result.assets[0].uri);
                const blob = await response.blob();
                await uploadBytes(storageRef, blob);
            
                const downloadURL = await getDownloadURL(storageRef);
      
                setInput({ ...input, imagen: downloadURL });
              }
            };

 /////////////////////////////////////////////////////////// TOMA MI UBICACION ACTUAL SEGUN MI GPS ///////////////////

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
              setInput({
                lat: location.coords.latitude,
                lng: location.coords.longitude
              })
            
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
             
          const [showMap, setShowMap] = useState(false);

    return (

      <View>

        <NavBar />

        <ScrollView>

             <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                      {input.imagen && (
                        <Image source={{ uri: input.imagen }} style={{ width: 300, height: 300 }} />
                      )}
                      <Button title="Seleccionar imagen" onPress={selectImage} />

                    </View>

                    <View >
                      <Button title="Establecer Ubicacion" onPress={() => setShowMap(true)} />
                          <Modal visible={showMap} animationType="slide">
                      <View style={{width: "100%", height: "100%"}}>
                     
                          <MapView
                            style={{ flex: 1}}
                            initialRegion={region}
                            showsUserLocation
                            followsUserLocation
                            ref={mapRef}
                          >
                         
                            {location && (
                               <Marker
                               coordinate={{
                                 latitude: location.coords.latitude,
                                 longitude: location.coords.longitude
                               }}
                               title="Mi ubicación"
                             />
                            )}
                          </MapView>

                          <View >
                            <Button title="Confirmar Ubicacion" onPress={() => setShowMap(false)} />
                          </View>

                        </View>
                        </Modal>
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: "5%"}}> 
                            <Checkbox
                                value={input.gato}
                                onValueChange={(newValue) => handleGato(newValue)}
                                uncheckedColor="red"
                                color="green"  
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => {
                                setChecked(!checked);
                                handleGato(!input.gato);
                                }}
                            />
                            <Text style={{ fontSize: 14 }}>Gato</Text>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: "5%"}}>
                                <Checkbox
                                    value={input.perro}
                                    onValueChange={(newValue) => handlePerro(newValue)}
                                    uncheckedColor="red"
                                    color="green"  
                                    status={checked2 ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                    setChecked2(!checked2);
                                    handlePerro(!input.perro);
                                    }}
                                />
                                <Text style={{ fontSize: 14 }}>Perro</Text>
                                </View>

                        <View style={{ width: "80%"}}>
                            <Picker
                            name="tama"
                            selectedValue={input.tama}
                            onValueChange={(value) => handlePickerChange(value)}
                            >             
                            <Picker.Item label="Tamaño" value="" />
                            <Picker.Item label="Chico" value="Chico" />
                            <Picker.Item label="Mediano" value="Mediano" />
                            <Picker.Item label="Grande" value="Grande" />
                            </Picker>
                        </View>

                        <View style={{ width: "80%"}}>
                            <Picker
                            name="estado"
                            selectedValue={input.estado}
                            onValueChange={(value) => handlePickerChange2(value)}
                            >             
                            <Picker.Item label="Estado" value="" />
                            <Picker.Item label="Perdido" value="Perdido" />
                            <Picker.Item label="Encontrado" value="Encontrado" />
                            </Picker>
                        </View>
                        
                        <View style={{ marginTop: "5%"}} >
                        <TextInput
                        style={styles.textInput}
                            multiline={true}
                            numberOfLines={4}
                            />
                        <Text>Da una descripcion sobre la mascota</Text>
                        </View>

                        <View style={{ marginTop: "5%"}}>
                            <TextInput
                            style={styles.textInput}
                                  name="peso"
                                  placeholder="Peso en Kg"
                                  value={input.peso}
                                  onChangeText={(newText) => {handleChange("peso", newText);  }}
                            >

                            </TextInput>
                            <Text>Que peso calculas que tiene?</Text>
                        </View>

                    <View style={{ marginTop: "10%"}}>
                      <Button 
                      title="Enviar" onPress={handleSubmit} />
                      </View>


        </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    textInput: {
      borderWidth: 1,
      borderColor: 'black',
      width: "80%",

    },
  });