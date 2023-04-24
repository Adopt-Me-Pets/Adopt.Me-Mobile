import { Image, Text, View, Button, StyleSheet, Modal, ScrollView } from "react-native";
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import getusers from "../../Actions/getusers";
import { useEffect } from "react";
import { useContext } from "react";
import { LoginContext } from "../Login/loginProvider";
import { useNavigation } from '@react-navigation/native';


export default function DetallePaseador({ route }) {

   const navigation = useNavigation();
    const { id, walkerId } = route.params;
    const dispatch = useDispatch();
    const detallePaseador = useSelector((state) => state.detalleUsuario);
    console.log("detallePaseador",detallePaseador)
    const puntuacion = detallePaseador.puntuacion;
    const puntuaciones = puntuacion || []; 
    const promedio = puntuaciones.length > 0 ? (puntuaciones.reduce((a, b) => a + b) / puntuaciones.length).toFixed(3) : null;
    const usuario = useSelector((state) => state.users);
    const usuario2 = usuario.data;
    const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
    const userData2 = useSelector((state) => state.userData);
    const userId = userData2;
    const usuario3 = userId ? usuario2.filter(({ email }) => email === userId.email) : [];
    const idUsuario = usuario3[0]?._id ?? null;
    const [modalVisible, setModalVisible] = useState(false);

    
    let pais = null;
    let usuario4 = null;

      if (isLoggedIn && usuario2 && usuario2.length > 0) {
        const usuario4 = usuario2.filter(({ _id }) => _id === idUsuario)
        const usuario5 = usuario4[0]
        pais = usuario5.pais
      }

 useEffect(() => {
    dispatch(getDetalleUsuario(id));
    console.log("iddetalle", walkerId)
    dispatch(getusers())
 }, [dispatch, id])

    return (

        <View>

            <NavBar />

            <ScrollView>
            <Image 
                source={{ uri: detallePaseador.fotoPerfil }} 
                style={{ width: 200, height: 200, marginTop: 50 }}
                />

            <Text>
                Nombre: {detallePaseador.nombre}
            </Text>
            <Text>
                Años de Experiencia: {detallePaseador.anosExperiencia}
            </Text>
            <Text>
                Ciudad: {detallePaseador.ciudad}
            </Text>
            <Text>
                Pais: {detallePaseador.pais}
            </Text>
            <Text>
                E-Mail: {detallePaseador.email}
            </Text>
            <Text>
                Telefono: {detallePaseador.telefono}
            </Text>
            <Text>
                Puntuacion: {promedio}
            </Text>

            <Button
            title="Contratar"
            onPress={() => navigation.navigate('Paypal2')}
            >

            </Button>


            <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "10%"}}>
                      <Text style={{ marginBottom: "5%"}}>Revisa los Terminos y Condiciones de Contratacion de un Paseador</Text>
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
                          Precio y pago: El precio de contratación del servicio de paseo de perros es de U$S 54 dólares por mes, que incluye 3 paseos de 1 hora por semana. El pago se realizará por adelantado cada mes y se renovará automáticamente hasta que se cancele la suscripción. Los pagos se pueden hacer mediante tarjeta de crédito o débito a través de nuestra plataforma en línea.{'\n\n'}
            Cancelación: Tanto el usuario como el paseador pueden cancelar la suscripción en cualquier momento. Si el usuario desea cancelar la suscripción, deberá notificar al paseador con al menos 48 horas de anticipación para que no se le cobre el próximo mes. Si el paseador no cumple con los términos acordados, el usuario podrá cancelar la suscripción en cualquier momento sin cargos adicionales.{'\n\n'}
            Reclamos y quejas: Si el usuario tiene algún reclamo o queja sobre el servicio proporcionado por el paseador, deberá informarnos inmediatamente para que podamos resolver el problema. Si el paseador recibe una queja del usuario, podrá cancelar la suscripción del usuario sin previo aviso.{'\n\n'}
            Responsabilidades: El paseador será responsable de cuidar y proteger al perro durante el paseo y de mantenerlo en una correa en todo momento. El usuario será responsable de proporcionar información precisa sobre el perro, incluyendo cualquier problema de salud o comportamiento que pueda afectar el paseo. La compañía no será responsable por cualquier daño o lesión que pueda ocurrir durante el paseo.{'\n\n'}
            Propiedad intelectual: La compañía retiene todos los derechos de propiedad intelectual en relación con el servicio proporcionado, incluyendo cualquier contenido generado por la compañía o el paseador. El usuario se compromete a no copiar, distribuir o reproducir ninguna información o contenido relacionado con el servicio sin el permiso previo por escrito de la compañía.{'\n\n'}
            Ley aplicable: Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes del país donde se ofrece el servicio. Cualquier disputa que surja en relación con el servicio será resuelta por los tribunales competentes del país donde se ofrece el servicio.{'\n\n'}
            Al contratar nuestros servicios de paseador de perros, el usuario acepta los términos y condiciones antes mencionados.

                          </Text>
                            
                            <Button
                                title="Aceptar"
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                              />

                            </ScrollView>
                      </View>
                  </Modal>
                  </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
   
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