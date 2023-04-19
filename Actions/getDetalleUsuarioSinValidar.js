import axios from "axios";

export default function getDetalleUsuarioSinValidar(id) {
  return async function (dispatch) {
    const result = await axios.get(`http://localhost:3001/usuarios/getUserSinValidar/${id}`);

    return dispatch({
      type: "getDetalleUsuarioSinValidar",
      payload: result.data,
    });
  };
}
