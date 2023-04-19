import axios from "axios";
import { FILTRA_TAMAÑO } from ".";

export default function getTamañoAnimales() {
  return async function (dispatch) {
    const tamaños = await axios.get("http://192.168.100.18:19001/animales/tamaño/");
   
    return dispatch({ type: FILTRA_TAMAÑO, payload: tamaños.data });
  };
}