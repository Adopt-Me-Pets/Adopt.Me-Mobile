import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";
import mailVerificarUsuario from "../../Actions/mailVerificarUsuario";
import { useNavigation } from '@react-navigation/native';

export default function Cartelito({ input }) {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    function handleOnClick() {
        dispatch(mailVerificarUsuario(input))
        navigation.navigate('HomePage')
    }

    return (

        <View>
            <Text>
                Te has registrado correctamente. Valida tu mail para poder comenzar a utilizar todas las funciones de Adopt.Me
            </Text>

            <Button
                style={{ backgroundColor: "grey"}}
                title="Validar E-Mail"
                onPress={handleOnClick}
        />
        </View>
    )
}