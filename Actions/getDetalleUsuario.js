import axios from "axios";

export default function getDetalleUsuario(id) {
  return async function (dispatch) {
    try {
      const result = await axios.get(`http://192.168.100.18:19001/usuarios/${id}`);
      return dispatch({ type: "getDetalleUsuario", payload: result.data });
    } catch (error) {
      console.log(error); 
    }
  };
}
