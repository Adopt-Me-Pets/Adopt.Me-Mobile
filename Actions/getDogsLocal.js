import axios from 'axios';
import {GET_DOG_LOCALIDAD} from '.';

export default function getDogsLocal(localidad) {
    return async function (dispatch) {
      const perros = await axios.get(`http://localhost:3001/animales/localidad/?localidad=${localidad}`);
      return dispatch({ type: GET_DOG_LOCALIDAD, payload: perros.data });
    };
  }