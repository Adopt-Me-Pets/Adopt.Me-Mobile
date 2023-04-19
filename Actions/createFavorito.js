import axios from "axios";
import { CREATE_FAVORITO } from ".";

export default function createFavorito(payload) {
    return async function (dispatch) {
        const result = await axios.post("http://localhost:3001/favoritos", payload);
        return dispatch({ type: CREATE_FAVORITO, payload: result.data})
    }
}