import axios from "axios";

export default function getDetalleUsuarioSinValidar(id) {
  return async function (dispatch) {
    const result = await axios.get(`http://192.168.100.18:19001/paseadores/paseadoresSinValidar/${id}`);

    return dispatch({
      type: "getDetallePaseadoresSinValidar",
      payload: result.data,
    });
  };
}
