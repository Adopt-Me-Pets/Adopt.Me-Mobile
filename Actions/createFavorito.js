import axios from "axios";
import { CREATE_FAVORITO } from ".";

export default function createFavorito(payload) {
    return async function (dispatch) {
        const result = await axios.post("http://192.168.100.18:19001/favoritos", payload);
        return dispatch({ type: CREATE_FAVORITO, payload: result.data})
    }
}