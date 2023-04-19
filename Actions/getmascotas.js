import axios from "axios";
import { GET_MASCOTAS } from ".";

export default function getmascotas() {
  return async function (dispatch) {
    const result = await axios.get("http://192.168.100.18:19001/animales");
    return dispatch({ type: GET_MASCOTAS, payload: result.data });
  };
}
