import axios from "axios";
import { GET_FAVORITOS } from ".";

export default function getFavoritos() {
    return async function (dispatch) {
        const result = await axios.get("http://192.168.100.18:19001/favoritos");
        return dispatch({ type: GET_FAVORITOS, payload: result.data})
    }
}