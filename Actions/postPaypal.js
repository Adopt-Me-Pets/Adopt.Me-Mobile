import axios from 'axios';
import { POST_PAYPAL } from ".";

export default function postPaypal(payload) {
    return async function (dispatch){ 
        const result = await axios.post("http://localhost:3001/donaciones", payload); 
        return dispatch({ type: POST_PAYPAL, payload: result.data })                                                                                                   
    }
}