
import { clearUserData } from "./clearUserData";

export const logoutUser = () => {
    return (dispatch) => {
      localStorage.removeItem('token');
      

      dispatch(clearUserData());
    }
  };
  