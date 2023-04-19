import axios from 'axios';
import { CREATE_USER } from '.';

export default function createuser(payload) {
    console.log("entre a la action createuser")
    return async function (dispatch){ const result = await axios.post("http://192.168.100.18:19001/usuarios/signup", payload); 
        return dispatch({ type: CREATE_USER, payload: result.data })                                                                                                   
    }
}