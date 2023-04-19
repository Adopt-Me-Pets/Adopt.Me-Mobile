import axios from "axios";
import { GET_PASEADORES } from ".";

export default function getpaseadores() {
    return async function (dispatch) {
      const result = await axios.get("http://192.168.100.18:19001/paseadores");
      return dispatch({ type: GET_PASEADORES, payload: result.data});
    };
  }
  