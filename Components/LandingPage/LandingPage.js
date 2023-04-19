import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import getcountries from "../../Actions/getCountries";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Loader/Loader";
import adoptmelogo from "../../Imagenes/adoptmelogo.png";

 export default function LandingPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcountries());
  
    AsyncStorage.getItem('selectedCountry').then((storedCountry) => {
      if (storedCountry) {
        setSelectedCountry(storedCountry);
      }
    });
  
    AsyncStorage.getItem('selectedCity').then((storedCity) => {
      if (storedCity) {
        setSelectedCity(storedCity);
      }
    });
  }, [dispatch]);
  

  const countries = useSelector((state) => state.paises);
  const countries2 = countries.data;
  const countries3 = countries2 ? countries2.map(c => c.country) : null;
  const [selectedCountry, setSelectedCountry] = useState(AsyncStorage.getItem('selectedCountry') || '');
  const [selectedCity, setSelectedCity] = useState(AsyncStorage.getItem('selectedCity') || '');

  const handleCountrySelect = (value) => {
    setSelectedCountry(value);
    AsyncStorage.setItem('selectedCountry', value);
  };

  const handleCitySelect = (value) => {
    setSelectedCity(value);
    AsyncStorage.setItem('selectedCity', value);
  };

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
    if (selectedCountry && selectedCity) {
        setIsButtonEnabled(true);
    } else {
        setIsButtonEnabled(false);
    }
    }, [selectedCountry, selectedCity]);

  if (countries.length === 0) {
    return (
      <Loading />
    );
  }

  return (
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "space-evenly",
      }}>  

      <View >
        <Image source={adoptmelogo} style={{ width: 150, height: 150, borderRadius: 100 }} />
      </View>

        <Text
        style={{ marginBottom: "-10%"}}
        >Elegir País</Text>
      <View style={{ width: "60%", borderColor: "black", borderWidth: 1, borderRadius: 15}}>
        <Picker
            selectedValue={selectedCountry}
            onValueChange={handleCountrySelect}
        >
        <Picker.Item label="Elegir País" value="" />
        {countries3 &&
        countries3
        .sort()
        .map((c) => (
        <Picker.Item key={c} label={c} value={c} />
        ))}
        </Picker>
        </View>

        <Text
        style={{ marginBottom: "-10%"}}
        >Elegir Ciudad</Text>
        {selectedCountry && countries2 && (
        <View style={{width: "60%", borderColor: "black", borderWidth: 1, borderRadius: 15}}>
            <Picker
            selectedValue={selectedCity}
            onValueChange={handleCitySelect}
            >
            <Picker.Item label="Elegir Ciudad" value="" />
            {(countries2.find((c) => c.country === selectedCountry) || {cities: []}).cities.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
            ))}
            </Picker>
        </View>
        )}


<TouchableOpacity
  style={[styles.button, isButtonEnabled ? styles.enabledButton : styles.disabledButton]}
  onPress={() => props.navigation.navigate('HomePage')}
  disabled={!isButtonEnabled}
>
  <Text style={[styles.buttonText, isButtonEnabled ? styles.enabledButtonText : styles.disabledButtonText]}>Entrar</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 18,
    width: '50%',
    alignItems: 'center',
  },
  enabledButton: {
    backgroundColor: '#063455',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
  },
  enabledButtonText: {
    color: 'white',
  },
  disabledButtonText: {
    color: 'lightgray',
  },
});