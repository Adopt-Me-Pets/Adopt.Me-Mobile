import axios from 'axios';
import { CREATE_PASEADOR } from '.';

export default function createpaseador(payload) {
    return async function (dispatch){ const result = await axios.post("http://192.168.100.18:19001/paseadores/signup", payload); 
        return dispatch({ type: CREATE_PASEADOR, payload: result.data })                                                                                                   
    }
}