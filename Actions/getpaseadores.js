import axios from "axios";
import { GET_PASEADORES } from ".";

export default function getpaseadores() {
    return async function (dispatch) {
      const result = await axios.get("http://localhost:3001/paseadores");
      return dispatch({ type: GET_PASEADORES, payload: result.data});
    };
  }
  