import axios from "axios";

export default function putUser(payload, id) {
  
  return async function (dispatch) {
    const result = await axios.put(
      `http://192.168.100.18:19001/usuarios/${id}`,
      payload
    );
    return dispatch({ type: "putUsuario", payload: result.data });
  };
}
