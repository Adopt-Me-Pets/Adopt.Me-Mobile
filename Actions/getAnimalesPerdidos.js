import axios from 'axios';
import {GET_ANIMALES_PERDIDOS} from '.';

export default function getAnimalesPerdidos() {
    return async function (dispatch) {
      const todos = await axios.get ('http://localhost:3001/animalesPerdidos/todos');
      return dispatch({ type: GET_ANIMALES_PERDIDOS, payload: todos.data });
    };
  }