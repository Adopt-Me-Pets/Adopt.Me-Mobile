import axios from 'axios';
import {GET_COUNTRIES} from '.';

export default function getcountries() {
    return async function (dispatch) {
      const countries = await axios.get("https://countriesnow.space/api/v0.1/countries?limit=10");
      return dispatch({ type: GET_COUNTRIES, payload: countries.data });
    };
  }