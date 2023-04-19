import axios from 'axios'
import { DELETE_USER } from '.';

export const deleteUser = (id) => async (dispatch) => {
    return await axios.delete(`http://localhost:3001/usuarios/${id}`) 
    .then(u => dispatch({ type: DELETE_USER, payload: u.data})
    )
}

export default deleteUser

