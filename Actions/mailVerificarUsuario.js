import axios from 'axios';
import { MAIL_VERIFICAR_USUARIO } from '.';

export default function mailVerificarUsuario(payload) {

    return async function (dispatch){ 
        const result = await axios.post("http://localhost:3001/usuarios/mailVerificarUsuario", payload); 
        return dispatch({ type: MAIL_VERIFICAR_USUARIO, payload: result.data })                                                                                         
    }
};

