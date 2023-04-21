import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import getcountries from "../../Actions/getCountries";
import getusers from "../../Actions/getusers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
// import Geolocation from 'react-native-geolocation-service';
import Cartelito from "../FormularioRegistro/Cartelito";
import { Picker } from '@react-native-picker/picker';
import { ImagePicker } from 'expo';
import createUser from "../../Actions/createuser";
import { Checkbox } from 'react-native-paper';



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

      console.log("usuario", input.usuario)
      console.log("contraseña", input.contrasena)
      console.log("repitaContrseña", input.repitaContrasena)
      console.log("nombre", input.nombre)
      console.log("telefono", input.telefono)
      console.log("pais", input.pais)
      console.log("ciudad", input.ciudad)
      console.log("nacimiento", input.nacimiento)
      console.log("tipo", input.tipo)
      console.log("direccion", input.direccion)
      console.log("terminos", input.terminos)
      console.log("paypal", input.paypal)
      console.log("email", input.email)
      ///////////////////////////////////////////////////////////////////

      const [isSubmit, setisSubmit] = useState(false);
      const [cartelito, setCartelito] = useState(false);
      const [selectedCity, setSelectedCity] = useState("");
      const [selectedCountry, setSelectedCountry] = useState("");
      const [modalVisible, setModalVisible] = useState(false);
      const [checked, setChecked] = useState(false);

            
        let noRepeatUser = undefined;
        let noRepeatMail = undefined;
       
        if (Allusers) {
          noRepeatUser = Allusers.filter((u) => u.usuario === input.usuario);
          noRepeatMail = Allusers.filter((u) => u.email === input.email);
        }


          function handleSubmit() {
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


           function handleChange(name, newText) {            
              setSelectedCity(city);
              setSelectedCountry(country)
              setInput((prev) => ({ 
                ...prev, 
                [name]: newText,
                ciudad: selectedCity, 
                pais: selectedCountry 
              }));
            }

            function handlePickerChange(value) {
              setInput((prev) => ({ 
                ...prev, 
                tipo: value,
              }));
            }


/////////////////////////////////////////////////////////// TOMA MI UBICACION ACTUAL SEGUN MI GPS ///////////////////


        // const [geo, setGeo] = useState({
        //     lng: -61.043988,
        //     lat: -34.7361,
        //   })
          
        //   useEffect(() => {
        //     const getGeoLocation = async () => {
        //       try {
        //         const position = await Geolocation.getCurrentPosition(
        //           (position) => {
        //             setGeo({
        //               lat: position.coords.latitude,
        //               lng: position.coords.longitude,
        //             })
        //           },
        //           (error) => {
        //             console.log(error)
        //           },
        //           {
        //             enableHighAccuracy: true,
        //             timeout: 15000,
        //             maximumAge: 10000,
        //           },
        //         );
        //       } catch (error) {
        //         console.log(error);
        //       }
        //     }
        //     getGeoLocation();
        //   }, [])

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

          // function handleLocation() {
          //   setInput({
          //     ...input,
          //     lat2: geo.lat,
          //     lng2: geo.lng,
          //   });
          //   Toast.show({
          //     text1: "Ubicacion Establecida. Por favor seleccione 'Guardar mi Ubicacion'",
          //     visibilityTime: 1000,
          //     autoHide: true,
          //   });
          // }
        
          // function handleLocation2() {
          //   setInput({
          //     ...input,
          //     lat2: geo.lat,
          //     lng2: geo.lng,
          //   });
          //   Toast.show({
          //     text1: "Ubicacion Guardada con exito",
          //     visibilityTime: 1000,
          //     autoHide: true,
          //   });
          // }

////////////////////////////////////////////////// GUARDAR FOTOS///////////////////////////////////////////

        async function selectImage() {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.cancelled) {
            setInput({ ...input, fotoPerfil: result.uri });
          }   
        }

        async function selectImage2() {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.cancelled) {
            setInput({ ...input, dni1: result.uri });
          }   
        }

        async function selectImage3() {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.cancelled) {
            setInput({ ...input, dni2: result.uri });
          }   
        }

        async function selectImage4() {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

          if (!result.cancelled) {
            setInput({ ...input, servicios: result.uri });
          }   
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

          return (
              <ScrollView>
                
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: "50%"}}>
              <Text>Registro de usuario o paseador</Text>

              {cartelito ? (
                <Cartelito input={input} />
              ) : (
                <>

                {input.fotoPerfil && <Image source={{ uri: input.fotoPerfil }} style={{ width: 200, height: 200 }} />}
                <Button title="Foto de Perfil" onPress={selectImage} />

                  <TextInput
                  style={{ marginTop: "5%", height: "5%", borderColor: "black", borderWidth: 1, borderRadius: 15, width: "70%"}}
                    name="usuario"
                    placeholder="Usuario"
                    value={input.usuario}
                    onChangeText={(newText) => { handleChange("usuario", newText); }}
                  />
                

                  <TextInput
                  style={{ marginTop: "5%", height: "5%", borderColor: "black", borderWidth: 1, borderRadius: 15, width: "70%"}}
                    name="contrasena"
                    placeholder="Contraseña"
                    value={input.contrasena}
                    onChangeText={(newText) => {handleChange("contrasena", newText); }}
                  />
        

                  <TextInput
                  style={{ marginTop: "5%", height: "5%", borderColor: "black", borderWidth: 1, borderRadius: 15, width: "70%"}}
                    name="repitaContrasena"
                    placeholder="Repetir Contraseña"
                    value={input.repitaContrasena}
                    onChangeText={(newText) => {handleChange("repitaContrasena", newText);  }}
                  />       

                  <TextInput
                  style={{ marginTop: "5%", height: "5%", borderColor: "black", borderWidth: 1, borderRadius: 15, width: "70%"}}
                    name="nombre"
                    placeholder="Nombre Completo"
                    value={input.nombre}
                    onChangeText={(newText) => {handleChange("nombre", newText);  }}
                  />

                   <TextInput
                   style={{ marginTop: "5%", height: "5%", borderColor: "black", borderWidth: 1, borderRadius: 15, width: "70%"}}
                    name="telefono"
                    placeholder="Telefono"
                    value={input.telefono}
                    onChangeText={(newText) => {handleChange("telefono", newText);  }}
                  />

                   <TextInput
                   style={{ marginTop: "5%", height: "5%", borderColor: "black", borderWidth: 1, borderRadius: 15, width: "70%"}}
                    name="email"
                    placeholder="E-Mail"
                    value={input.email}
                    onChangeText={(newText) => {handleChange("email", newText);  }}
                  />

                   <TextInput
                   style={{ marginTop: "5%", height: "5%", borderColor: "black", borderWidth: 1, borderRadius: 15, width: "70%"}}
                    name="nacimiento"
                    placeholder="DD/MM/AAAA"
                    value={input.nacimiento}
                    onChangeText={(newText) => {handleChange("nacimiento", newText);  }}
                  />
                      
                      <TextInput
                      style={{ marginTop: "5%", height: "5%", borderColor: "black", borderWidth: 1, borderRadius: 15, width: "70%"}}
                    name="ciudad"
                    placeholder="Ciudad"
                    value={input.ciudad}                
                  />
                    <TextInput
                    style={{ marginTop: "5%", height: "5%", borderColor: "black", borderWidth: 1, borderRadius: 15, width: "70%"}}
                    name="pais"
                    placeholder="Pais"
                    value={input.pais}                
                  />
                    <TextInput
                    style={{ marginTop: "5%", height: "5%", borderColor: "black", borderWidth: 1, borderRadius: 15, width: "70%"}}
                    name="direccion"
                    placeholder="Direccion"
                    value={input.direccion}
                    onChangeText={(newText) => {handleChange("direccion", newText);  }}
                  />
          
                  <View style={{ width: "50%"}}>
                    <Picker
                      name="tipo"
                      selectedValue={input.tipo}
                      onValueChange={(value) => handlePickerChange(value)}
                    >
                      <Picker.Item label="Usuario" value="usuario" />
                      <Picker.Item label="Paseador" value="paseador" />
                    </Picker>
                  </View>

                  {input.tipo === 'paseador' && (
                    <View>
                      <TextInput
                        name="experiencia"
                        placeholder="Experiencia"
                        value={input.experiencia}
                        onChangeText={(newText) => {handleChange("experiencia", newText)}}
                      />
                      <TextInput
                        name="paypal"
                        placeholder="Cuenta de Paypal"
                        value={input.paypal}
                        onChangeText={(newText) => {handleChange("paypal", newText)}}
                      />
                      <Text>Debes tener una cuenta de Paypal para recibir los pagos</Text>

                {input.dni1 && <Image source={{ uri: dni1 }} style={{ width: 200, height: 200 }} />}
                <Button title="Dni Frente" onPress={selectImage2} />

                {input.dni2 && <Image source={{ uri: dni2 }} style={{ width: 200, height: 200 }} />}
                <Button title="Dni Dorso" onPress={selectImage3} />

                {input.servicios && <Image source={{ uri: servicios }} style={{ width: 200, height: 200 }} />}
                <Button title="Servicio a tu Nombre" onPress={selectImage4} />
                      
                    </View>
                  )}

                    <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "10%"}}>
                      <Text style={{ marginBottom: "5%"}}>Debes Aceptar Terminos y Condiciones para Registrarte</Text>
                  <Button
                      style={{ }}
                      title="Ver Términos y Condiciones"
                      onPress={() => setModalVisible(true)}
                  />
                  </View>
               

                  <Modal
                      animationType="slide"
                      transparent={false}
                      visible={modalVisible}
                      onRequestClose={() => {
                          setModalVisible(!modalVisible);
                      }}
                  >
                      <View style={styles.modalView}>
                      <ScrollView>
                          <Text style={styles.modalText}>Términos y Condiciones</Text>
                          <Text>

                          Contenido del usuario {'\n\n'}
      a) Al utilizar nuestro sitio web y Aplicación, puedes publicar contenido, como fotos, comentarios, opiniones o información sobre mascotas perdidas o encontradas.{'\n'}
      b) Aceptas que eres el único responsable del contenido que publiques y que no violarás los derechos de terceros ni infringirás ninguna ley o regulación aplicable.{'\n'}
      c) Nos reservamos el derecho de eliminar o modificar cualquier contenido del usuario que consideremos inapropiado o que viole estos Términos y Condiciones.{'\n'}
      {'\n\n'}
      Propiedad Intelectual {'\n\n'}
      a) Todo el contenido del sitio web y la Aplicación, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes, videos, sonidos, marcas registradas, nombres de dominio y cualquier otro material o propiedad intelectual relacionada, son propiedad exclusiva de Adopt.Me LLC o de sus licenciantes y están protegidos por las leyes de propiedad intelectual aplicables.{'\n'}
      b) No se te concede ningún derecho de propiedad intelectual sobre el contenido del sitio web y la Aplicación, excepto en la medida en que sea necesario para utilizar los servicios ofrecidos en nuestro sitio web y Aplicación de acuerdo con estos Términos y Condiciones.{'\n'}
      {'\n\n'}
      Compras en el e-shop {'\n\n'}
      a) Si realizas compras a través de nuestro e-shop, aceptas cumplir con los términos y condiciones de venta específicos establecidos en nuestra plataforma de venta en línea.{'\n'}
      b) Nos reservamos el derecho de modificar los precios, productos y servicios ofrecidos en nuestro e-shop en cualquier momento y sin previo aviso.{'\n'}
      {'\n\n'}
      Responsabilidad y exención de responsabilidad {'\n\n'}
      a) Nuestro sitio web y Aplicación se proporcionan "tal cual" y "según disponibilidad", y no garantizamos la disponibilidad, seguridad, confiabilidad o exactitud de los servicios ofrecidos.{'\n'}
      b) No nos hacemos responsables de cualquier daño o perjuicio causado por el uso o la imposibilidad de uso de nuestro sitio web y Aplicación, incluyendo pero no limitado a pérdida de datos, interrupción del servicio, errores, virus o cualquier otro software malicioso.{'\n'}
      c) No nos hacemos responsables de la adopción, entrega, cuidado o conducta de las mascotas adoptadas o de los paseadores contratados a través de nuestro sitio web y Aplicación. Es tu responsabilidad realizar la debida diligencia y tomar las precauciones necesarias al adoptar una mascota o contratar a un paseador.{'\n'}
      d) No nos hacemos responsables de la calidad, garantía, entrega o devolución de los productos comprados a través de nuestro e-shop, ya que estos son proporcionados por terceros.{'\n'}
      e) Nuestra responsabilidad total en relación con cualquier reclamo relacionado con nuestro sitio web, Aplicación o servicios ofrecidos se limita al monto que hayas pagado por dichos servicios en los últimos tres meses anteriores al reclamo.{'\n'}
      f) Queremos aclarar que no somos empleadores de los paseadores contratados a través de nuestro sitio web y Aplicación. Actuamos únicamente como un medio por el cual los usuarios pueden conectarse con los paseadores disponibles en su área. Por lo tanto, no tenemos control sobre la conducta, habilidades o cualquier otro aspecto relacionado con los paseadores, y no podemos hacernos responsables de ningún problema que pueda surgir entre el usuario y el paseador contratado.{'\n'}
      {'\n\n'}
      Política de privacidad {'\n\n'}
      a) Aceptas nuestra Política de Privacidad, que se encuentra disponible en [enlace a la política de privacidad] y que describe cómo recopilamos, usamos y protegemos tu información personal en nuestro sitio web y Aplicación.{'\n'}
      {'\n\n'}
      Enlaces a terceros {'\n\n'}
      a) Nuestro sitio web y Aplicación pueden contener enlaces a sitios web o aplicaciones de terceros. No nos hacemos responsables de la disponibilidad, seguridad, confiabilidad o contenido de dichos sitios web o aplicaciones de terceros.{'\n'}
      b) El uso de sitios web o aplicaciones de terceros está sujeto a los términos y condiciones y políticas de privacidad de dichos sitios web o aplicaciones.{'\n'}
      {'\n\n'}
      Modificaciones a los Términos y Condiciones {'\n\n'}
      a) Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento y sin previo aviso. Cualquier modificación será efectiva desde su publicación en nuestro sitio web o Aplicación. Es tu responsabilidad revisar periódicamente estos Términos y Condiciones para estar al tanto de cualquier cambio.{'\n'}
      b) El uso continuo de nuestro sitio web y Aplicación después de la modificación de estos Términos y Condiciones constituye tu aceptación de los términos modificados.{'\n'}
      {'\n\n'}
      Terminación {'\n\n'}
      a) Nos reservamos el derecho de suspender o terminar tu acceso y uso de nuestro sitio web y Aplicación en cualquier momento y por cualquier motivo, sin previo aviso y sin ninguna responsabilidad hacia ti.{'\n'}
      b) Tú puedes cancelar tu cuenta en nuestro sitio web y Aplicación en cualquier momento, siguiendo los procedimientos establecidos en nuestro sitio web o Aplicación.{'\n'}
      {'\n\n'}
      Ley aplicable y jurisdicción {'\n\n'}
      a) Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del país o región, sin tener en cuenta los principios de conflicto de leyes.{'\n'}
      b) Cualquier disputa relacionada con estos Términos y Condiciones será sometida a la jurisdicción exclusiva de los tribunales competentes en ciudad o región.{'\n'}
      {'\n\n'}
      Renuncia {'\n\n'}
      a) La renuncia a cualquier incumplimiento de estos Términos y Condiciones por parte nuestra no se considerará una renuncia a cualquier otro o posterior incumplimiento.{'\n'}
      b) Si alguna disposición de estos Términos y Condiciones se considera inválida o inaplicable por un tribunal competente, dicha disposición será eliminada en la medida necesaria para hacer que estos Términos y Condiciones sean válidos y aplicables en la medida máxima permitida por la ley.{'\n'}
      {'\n\n'}
      Contacto {'\n\n'}
      Si tienes alguna pregunta, comentario o inquietud sobre estos Términos y Condiciones, puedes ponerte en contacto con nosotros a través de adopt.me.pets.arg@gmail.com.{'\n'}
      {'\n\n'}
      Estos Términos y Condiciones constituyen el acuerdo completo entre tú y Adopt.Me LLC con respecto al uso de nuestro sitio web y Aplicación, y reemplazan cualquier acuerdo previo o contemporáneo, ya sea oral o escrito, con respecto a dicho uso.{'\n'}

                          </Text>
                      
                      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: "5%"}}>
                          <Checkbox
                        uncheckedColor="red"
                        color="green"  
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {setChecked(!checked); }}  
                                
                      /><Text style={{ fontSize: 14 }}>Acepto los Términos y Condiciones</Text>
                      </View>
                            
                            <Button
                                title="Aceptar"
                                onPress={() => {
                                  if (input.terminos) {
                                    setModalVisible(false);
                                  } else {
                                    setModalVisible(false);
                                    setInput({ ...input, terminos: true });
                                  }
                                }}
                              />

                            </ScrollView>
                      </View>
                  </Modal>

                 <View
                 style={{justifyContent: "center", alignItems: "center", marginTop: "10%", marginBottom: "90%"}}
                 >
                  <Button
                      
                      title="Registrarme"
                      onPress={(e) => handleSubmit(e)}
                      disabled={
                        (input.tipo === "paseador" && (!input.dni1 || !input.dni2 || !input.servicio)) || !input.terminos || !isSubmit ||
                        (input.tipo === "usuario" && (!isSubmit || !input.terminos || input.tipo === "" )) 
                      }
                    />
                    </View>
                </>
              )}
            </View>
              </ScrollView>
          );      
          
}

const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 20,
        },
        checkboxContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        },
        label: {
          marginLeft: 8,
        },
        modalView: {
          margin: 20,
          backgroundColor: 'white',
          borderRadius: 20,
          padding: 35,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
      },
      modalText: {
          marginBottom: 15,
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
      },
    
      });