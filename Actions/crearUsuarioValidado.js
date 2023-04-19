import axios from 'axios';
import { CREAR_USUARIO_VALIDADO } from '.';

export default function crearUsuarioValidado(payload) {
    return async function (dispatch){ const result = await axios.post("http://192.168.100.18:19001/usuarios/crearUsuarioValidado", payload); 
        return dispatch({ type: CREAR_USUARIO_VALIDADO, payload: result.data })                                                                                              
    }
}