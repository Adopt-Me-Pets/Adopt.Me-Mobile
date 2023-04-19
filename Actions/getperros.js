import axios from 'axios';
import {GET_PERRO} from '.';

export default function getperro() {
    return async function (dispatch) {
      const perros = await axios.get("http://192.168.100.18:19001/animales/perro");
      return dispatch({ type: GET_PERRO, payload: perros.data });
    };
  }