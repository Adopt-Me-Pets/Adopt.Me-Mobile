import axios from "axios";
import { GET_POSTS } from ".";

export default function getPosts() {
    return async function (dispatch) {
        const result = await axios.get("http://localhost:3001/comentario");
        return dispatch({ type: GET_POSTS, payload: result.data})
    }
}