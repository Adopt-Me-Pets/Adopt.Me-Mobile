import axios from "axios";
import { GET_POST_ID } from ".";

const getComentarioId  = (id) => {
    return async function (dispatch) {
        try {
        let result = await axios.get(`http://localhost:3001/comentario/${id}`);
        dispatch({ type: GET_POST_ID, payload: result.data})
    } catch(error) {
        return alert (error)
    }
}
}

export default getComentarioId;