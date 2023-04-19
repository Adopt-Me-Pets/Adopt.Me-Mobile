import axios from 'axios';
import { POST_PAYPAL } from ".";

export default function postPaypal(payload) {
    return async function (dispatch){ 
        const result = await axios.post("http://192.168.100.18:19001/donaciones", payload); 
        return dispatch({ type: POST_PAYPAL, payload: result.data })                                                                                                   
    }
}