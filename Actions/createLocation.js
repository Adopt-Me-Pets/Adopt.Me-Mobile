import axios from 'axios';
import { CREATE_LOCATION } from '.';

export default function createLocation(payload) {
    console.log("entre a la action location")
    return async function (dispatch){ const result = await axios.post("http://localhost:3001/location", payload); 
        return dispatch({ type: CREATE_LOCATION, payload: result.data })                                                                                                   
    }
}