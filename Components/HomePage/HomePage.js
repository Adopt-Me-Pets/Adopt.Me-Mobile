import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LoginContext } from '../Login/loginProvider';
import { useContext } from "react";
import getDetalleUsuario from "../../Actions/getDetalleUsuario";
import getusers from "../../Actions/getusers";

export default function HomePage() {

  const dispatch = useDispatch();
  const detalleUser = useSelector((state) => state.detalleUsuario); 
  const { isLoggedIn, setLoggedIn } = useContext(LoginContext);
  const userData2 = useSelector((state) => state.userData);
  const userId = userData2;
  const usuario = useSelector((state) => state.users);
  const usuario2 = usuario.data;
  const usuario3 = userId ? usuario2.filter(({ email }) => email === userId.email) : [];
  const id = usuario3[0]?._id ?? null;

  useEffect(() => {
    async function checkLoggedIn() {
      const authToken = await AsyncStorage.getItem('token');
      if (authToken) {
        setLoggedIn(true);
      }
    }

    checkLoggedIn();
  }, [setLoggedIn]);

  async function onClick() {
    if (!usuario) {
      ToastAndroid.show("Debes iniciar sesión para poder poner en adopción", ToastAndroid.SHORT);
      return;
    }

    if (!detalleUser || !detalleUser.usuario) {
      ToastAndroid.show("Debes completar el registro en tu perfil antes de poner en adopción", ToastAndroid.SHORT);
      return;
    }

    navigation.navigate("RegistroMascota");
  }

  useEffect(() => {
    dispatch(getDetalleUsuario(id));
    dispatch(getusers());
  }, [id, dispatch]);

  const usuarios = useSelector((state) => state.detalleUsuario);
  const hoverRef = useRef(null);

  const removeHoverClass = () => {
    if (hoverRef.current) {
      hoverRef.current.setNativeProps({
        style: { backgroundColor: 'transparent' } 
      });
    }
  };

  useEffect(() => {
    if (hoverRef.current) {
      hoverRef.current.setNativeProps({
        onTouchStart: () => hoverRef.current.setNativeProps({ style: { backgroundColor: 'blue' } }), 
        onTouchEnd: removeHoverClass 
      });
    }
  }, [hoverRef]);

  if (isLoggedIn && usuarios.tipo === "paseador") {

    return (
      <View >
        
        <View >        
          {!isLoggedIn && (
            <View>
              <TouchableOpacity  onPress={() => navigation.navigate('SignUp')}>
                <Text >Registrarse</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View>
          <TouchableOpacity  onPress={() => navigation.navigate('GpsPaseador')}>
            <Text >Dar mi Posicion de GPS</Text>
          </TouchableOpacity>
        </View>

      </View>
    );

} else {

  return (

    <View>

      <Text>
        Homepage
      </Text>
    </View>

  )

}
}