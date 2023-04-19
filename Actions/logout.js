import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearUserData } from "./clearUserData";

export const logoutUser = () => {

    return (dispatch) => {

      AsyncStorage.removeItem('token');
      dispatch(clearUserData());
      
    }
  };
  