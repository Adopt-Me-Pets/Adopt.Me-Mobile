import axios from "axios";
import { CREATE_POST } from ".";

export default function createPost(payload) {
    return async function (dispatch) {
        const result = await axios.post("http://192.168.100.18:19001/comentario", payload);
        return dispatch({ type: CREATE_POST, payload: result.data})
    }
}