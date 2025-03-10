import axios from 'axios'
import { DELETE_USER } from '.';

export const deleteUser = (id) => async (dispatch) => {
    return await axios.delete(`http://192.168.100.18:19001/usuarios/${id}`) 
    .then(u => dispatch({ type: DELETE_USER, payload: u.data})
    )
}

export default deleteUser

