import axios from "axios";
import { GET_USERS } from ".";

export default function getusers() {
    return async function (dispatch) {
      const result = await axios.get("http://192.168.100.18:19001/usuarios");
      return dispatch({ type: GET_USERS, payload: result });
    };
  }
  