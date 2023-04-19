import axios from 'axios';


export default function postPaseador(payload) {
  
    return async function (dispatch){ const result = await axios.post("http://localhost:3001/paseadores/postPaseador", payload); 
        return dispatch({ type: "postPaseador", payload: result.data })                                                                                                   
    }
}