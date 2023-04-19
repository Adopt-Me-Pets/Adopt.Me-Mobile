import axios from 'axios';
import { CREATE_ANIMAL } from '.';

export default function createanimal(payload) {
    return async function (dispatch){ 
        const result = await axios.post("http://localhost:3001/animales", payload); 
        return dispatch({ type: CREATE_ANIMAL, payload: result.data })                                                                                                   
    }
}