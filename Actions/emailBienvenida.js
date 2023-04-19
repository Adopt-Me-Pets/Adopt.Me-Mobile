import axios from 'axios';
import { EMAIL_BIENVENIDA } from '.';

export default function emailBienvenida(payload) {
    return async function (dispatch){ 
        const result = await axios.post("http://localhost:3001/usuarios/emailbienvenida", payload); 
        return dispatch({ type: EMAIL_BIENVENIDA, payload: result.data })                                                                                         
    }
};

