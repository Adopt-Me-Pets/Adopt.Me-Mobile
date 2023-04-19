import axios from "axios";
import { GET_RESPUESTA } from ".";

export default function getRespuesta() {
    return async function (dispatch) {
        const result = await axios.get("http://192.168.100.18:19001/respuesta");
        return dispatch({ type: GET_RESPUESTA, payload: result.data})
    }
}