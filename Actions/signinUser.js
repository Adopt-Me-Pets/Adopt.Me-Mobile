import axios from "axios";

export default function signinUser(payload) {
  
  return async function (dispatch) {
    const result = await axios.post(
      "http://192.168.100.18:19001/usuarios/signin",
      payload
    );
    return dispatch({ type: "signin", payload: result.data });
  };
}
