import axios from 'axios';
import { CREATE_LOCATION_PERDIDOS } from '.';

export default function createLocationPerdidos(payload) {
   
    return async function (dispatch){ const result = await axios.post("http://192.168.100.18:19001/lostlocation", payload); 
        return dispatch({ type: CREATE_LOCATION_PERDIDOS, payload: result.data })                                                                                                   
    }
}