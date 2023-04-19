import axios from "axios";
import { GET_PASEADORES_BY_ID } from ".";

export default function getDetallePaseador(id) {
  return async function (dispatch) {
      const result = await axios.get(`http://192.168.100.18:19001/paseadores/${id}`);
    return dispatch({ type: GET_PASEADORES_BY_ID, payload: result.data });
  };
}