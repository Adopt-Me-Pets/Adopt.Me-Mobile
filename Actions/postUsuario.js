import axios from 'axios';


export default function postUsuario(payload) {
  
    return async function (dispatch){ const result = await axios.post("http://192.168.100.18:19001/usuarios/postUsuario", payload); 
        return dispatch({ type: "postUsuario", payload: result.data })                                                                                                   
    }
}