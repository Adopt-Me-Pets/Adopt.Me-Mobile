import axios from "axios";
import { GET_PAGOS } from ".";

export default function getpagos() {
    return async function (dispatch) {
        const result = await axios.get("http://192.168.100.18:19001/donaciones/pagos")
        return dispatch({ type: GET_PAGOS, payload: result.data})
    }
}