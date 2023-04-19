import axios from "axios";

export default function getDetalleUsuarioSinValidar(id) {
  return async function (dispatch) {
    const result = await axios.get(`http://localhost:3001/paseadores/paseadoresSinValidar/${id}`);

    return dispatch({
      type: "getDetallePaseadoresSinValidar",
      payload: result.data,
    });
  };
}
