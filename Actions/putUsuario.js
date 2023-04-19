import axios from "axios";

export default function putUser(payload, id) {
  
  return async function (dispatch) {
    const result = await axios.put(
      `http://localhost:3001/usuarios/${id}`,
      payload
    );
    return dispatch({ type: "putUsuario", payload: result.data });
  };
}
