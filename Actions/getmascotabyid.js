import {GET_ANIMAL_BY_ID} from '.';
import axios from 'axios';



const getmascotabyid =(id) => {   
    
    
    return async function (dispatch) {
        try {
            
            let result = await axios.get(`http://192.168.100.18:19001/animales/${id}`); 
            dispatch({ type: GET_ANIMAL_BY_ID, payload: result.data })                                                                                                      
                  
            
        } catch (error) {
            return alert (error)            
        }        
    }
    
}

export default getmascotabyid;
