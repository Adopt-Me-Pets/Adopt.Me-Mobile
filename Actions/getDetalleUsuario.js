import axios from "axios";

export default function getDetalleUsuario(id) {
  return async function (dispatch) {
      const result = await axios.get(`http://localhost:3001/usuarios/${id}`);
      
    return dispatch({ type: "getDetalleUsuario", payload: result.data });
  };
}
