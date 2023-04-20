import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import getcountries from "../../Actions/getCountries";
import getusers from "../../Actions/getusers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useState } from "react";
import Toast from 'react-native-toast-message';
import Geolocation from 'react-native-geolocation-service';
import Cartelito from "../FormularioRegistro/Cartelito";


export default function RegistroUsuario() {

    const dispatch = useDispatch();
    const Allusers = useSelector((state) => state.users).data; 

    const country = AsyncStorage.getItem('selectedCountry');
    const city = AsyncStorage.getItem('selectedCity');

    useEffect(() => {
    dispatch(getcountries());
    dispatch(getusers());
    }, [dispatch]);

    const [input, setInput] = useState({
        usuario: "",
        contrasena: "",
        repitaContrasena: "",
        nombre: "",
        telefono: "",
        email: "",
        nacimiento: "",
        ciudad: "",
        pais: "",
        fotoPerfil: "",
        anosExperiencia: "",
        tipo: "",
        paseadorContratado: "",
        lng: "",
        lat: "",
        lng2: "",
        lat2: "",
        puntuacion: "",
        direccion: "",
        dni1: "",
        dni2: "",
        servicio: "",
        terminos: false,
        paypal: ""
      });

      ///////////////////////////////////////////////////////////////////

      const [errors, setErrors] = useState({});
      const [isSubmit, setisSubmit] = useState(false);
      const [cartelito, setCartelito] = useState(false);
      const [selectedCity, setSelectedCity] = useState("");
      const [selectedCountry, setSelectedCountry] = useState("");
      const [open, setOpen] = useState(false);

      const handleTerminosChange = (event) => {
        setInput({ ...input, terminos: event.target.checked }); 
      };
        
        const handleOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
      
        let noRepeatUser = undefined;
        let noRepeatMail = undefined;
       
        if (Allusers) {
          noRepeatUser = Allusers.filter((u) => u.usuario === input.usuario);
          noRepeatMail = Allusers.filter((u) => u.email === input.email);
        }

        function validation(input) {
            let errors = {};
            
            if (!input.usuario) {
              errors.usuario = "Tenes que ingresar un nombre de usuario";
            } else if (
              !/^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9]{1,15}$/.test(input.usuario)
            ) {
           
              errors.usuario = "El nombre de usuario no es válido";
            } else if (noRepeatUser.length) {
              errors.usuario = `El nombre de usuario ${input.usuario} no está disponible`;
            }
        
            if (!input.contrasena) {
              errors.contrasena = "Tenes que ingresar una contraseña";
            } else if (
              !/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(input.contrasena)
            ) {
              errors.contrasena =
                "La contraseña debe tener entre 8 y 16 caracteres, al menos un número, al menos una minúscula y al menos una mayúscula.";
            }
        
            if (!input.repitaContrasena) {
              errors.repitaContraseña = "Tenes que repetir la contraseña";
            } else if (input.repitaContrasena !== input.contrasena) {
              errors.repitaContraseña = "Las contraseñas no coinciden";
            }
        
            if (!input.nombre) {
              errors.nombre = "Tenes que ingresar un nombre";
            } else if (!/^[a-z\s]+$/i.test(input.nombre)) {
              errors.nombre = "El nombre no es válido";
            }
        
            if (!input.telefono) {
              errors.telefono = "Tenes que ingresar un telefono";
            }
            else if (!/^[0-9]*(\.?)[0-9]+$/.test(input.telefono)) {
              errors.telefono = "Este campo solo debe contener numeros"
            }
            else if (input.telefono.length > 15) {
              errors.telefono = "El teléfono no es válido";
            }
            
            if (!input.email) {
              errors.email = "Tenes que ingresar un e-mail";
            } else if (!/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim.test(input.email)) {
              errors.email = "El e-mail no es válido";
            } else if (noRepeatMail.length) {
              errors.email = "Ya existe una cuenta vinculada a ese mail";
            }
            
            if (!input.nacimiento) {
              errors.nacimiento = "Tenes que ingresar una fecha de nacimiento";
            } else if (
              input.nacimiento.length > 10 ||
              !/^[0-9-]+$/.test(input.nacimiento)
              ) {
                errors.nacimiento = "Tenes  que ingresar una fecha válida (dd-mm-yyyy)";
            }
        
            if (!input.fotoPerfil || input.fotoPerfil === "") {
              setInput({
                fotoPerfil:
                "https://res.cloudinary.com/dvw0vrnxp/image/upload/v1671058408/usuarios/avatarvacio_hcmos8.jpg",
              });
            }
            
            if (Object.keys(errors).length === 0) {
              setisSubmit(true);
            }
        
            return errors;
          }

          function handleSubmit(e) {
            if (noRepeatMail.length) {
                Toast.show({
                  type: 'error',
                  text1: `El mail ingresado ${input.email} ya esta en uso`,
                  visibilityTime: 1500,
                });
                return;
              }
              if (noRepeatUser.length) {
                Toast.show({
                  type: 'error',
                  text1: `El nombre de usuario ${input.usuario} ingresado ya esta en uso`,
                  visibilityTime: 1500,
                });
                return;
              }
          
              if (isSubmit) {
                dispatch(createUser(input));
                setCartelito(true);
          
                Toast.show({
                  type: 'success',
                  text1: 'Usuario creado correctamente',
                  visibilityTime: 1500,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: 'No se pudo completar el registro, revise los campos',
                  visibilityTime: 1500,
                });
              }
          }

          function handleChange(e) {
            setSelectedCity(city);
            setSelectedCountry(country)
            setInput((prev) => ({ 
              ...prev, 
              [e.target.name]: e.target.value, 
              ciudad: selectedCity, 
              pais: selectedCountry 
            }));
        
            setErrors(
              validation({
                ...input,
                [e.target.name]: [e.target.value],
              })
            );
          }

          const options = {
            title: 'Seleccionar foto de perfil',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          
     /////////////////////////////////////////// EJECUTO LOS ERRORES A MEDIDA QUE ME PARO EN UN INPUT ////////////////

        const [isTouched, setIsTouched] = useState (false);
        const [isTouched2, setIsTouched2] = useState (false);
        const [isTouched3, setIsTouched3] = useState (false);
        const [isTouched4, setIsTouched4] = useState (false);
        const [isTouched5, setIsTouched5] = useState (false);
        const [isTouched6, setIsTouched6] = useState (false);
        const [isTouched7, setIsTouched7] = useState (false);

/////////////////////////////////////////////////////////// TOMA MI UBICACION ACTUAL SEGUN MI GPS ///////////////////


        const [geo, setGeo] = useState({
            lng: -61.043988,
            lat: -34.7361,
          })
          
          useEffect(() => {
            const getGeoLocation = async () => {
              try {
                const position = await Geolocation.getCurrentPosition(
                  (position) => {
                    setGeo({
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    })
                  },
                  (error) => {
                    console.log(error)
                  },
                  {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000,
                  },
                );
              } catch (error) {
                console.log(error);
              }
            }
            getGeoLocation();
          }, [])

           /////////////////////////////////////////////////////  MARCADOR MOVIBLE /////////////////////////////////////////////////////7

// const [draggable, setDraggable] = useState(false)
// const markerRef = useRef(null)
// const eventHandlers = useMemo(
//   () => ({
//     dragend() {
//       const marker = markerRef.current
//       if (marker != null) {
//         setGeo(marker.getLatLng())
//       }
//     },
//   }),
//   [],
// )
// const toggleDraggable = useCallback(() => {
//   setDraggable((d) => !d)
// }, [])

          /////////////////////////////////////////////////// GUARDA MI UBICACION ACTUAL EN UN ESTADO Y RENDERIZO  ///////

// const position = [geo.lat, geo.lng]

// const local = position

// function FlyMapTo() {

// const map = useMap()

// useEffect(() => {
//     map.flyTo(local)
    
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, {enableHighAccuracy: true})

// return null
// }


///////////////////////////////////////////////////// GUARDA LA UBICACION EN LA BASE DE DATOS //////////////////////

          function handleLocation() {
            setInput({
              ...input,
              lat2: geo.lat,
              lng2: geo.lng,
            });
            Toast.show({
              text1: "Ubicacion Establecida. Por favor seleccione 'Guardar mi Ubicacion'",
              visibilityTime: 1000,
              autoHide: true,
            });
          }
        
          function handleLocation2() {
            setInput({
              ...input,
              lat2: geo.lat,
              lng2: geo.lng,
            });
            Toast.show({
              text1: "Ubicacion Guardada con exito",
              visibilityTime: 1000,
              autoHide: true,
            });
          }


          return (
            <View>
              <Text>Registro de usuario o paseador</Text>
              {cartelito ? (
                <Cartelito input={input} />
              ) : (
                <>

                  <TextInput
                    placeholder="Usuario"
                    value={input.usuario}
                    onChangeText={(text) => setInput({ ...input, usuario: text })}
                  />
                  <TextInput
                    placeholder="Contraseña"
                    value={input.contrasena}
                    onChangeText={(text) => setInput({ ...input, contrasena: text })}
                  />
                  <TextInput
                    placeholder="Repetir Contraseña"
                    value={input.repitaContrasena}
                    onChangeText={(text) => setInput({ ...input, repitaContrasena: text })}
                  />
                  <TouchableOpacity onPress={(e) => handleSubmit(e)}>
                    <Text>Enviar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          );
          
          
          
}