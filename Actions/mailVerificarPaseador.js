import axios from 'axios';
import { MAIL_VERIFICAR_PASEADOR } from '.';

export default function mailVerificarPaseador(payload) {

    return async function (dispatch){ 
        const result = await axios.post("http://localhost:3001/paseadores/mailVerificarPaseador", payload); 
        return dispatch({ type: MAIL_VERIFICAR_PASEADOR, payload: result.data })                                                                                         
    }
};
