import axios from 'axios';
import { CREATE_ANIMAL_PERDIDO} from '.';

export default function createAnimalPerdido(payload) {
    return async function (dispatch){ 
        const result = await axios.post("http://192.168.100.18:19001/animalesPerdidos/", payload); 
        return dispatch({ type: CREATE_ANIMAL_PERDIDO, payload: result.data })                                                                                                   
    }
}