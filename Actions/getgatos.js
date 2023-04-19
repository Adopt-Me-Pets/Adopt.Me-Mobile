import axios from 'axios';
import {GET_GATO} from '.';

export default function getgato() {
    return async function (dispatch) {
      const gatos = await axios.get("http://192.168.100.18:19001/animales/gato");
      return dispatch({ type: GET_GATO, payload: gatos.data });
    };
  }