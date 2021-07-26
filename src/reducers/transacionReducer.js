//cada reducer tiene su propio state
import { 
    // AGREGAR_NOMBRE,
    // AGREGAR_NOMBRE_EXITO,
    // AGREGAR_NOMBRE_ERROR
} from '../types/index'

//para testear
const initialState = {
    nombres:['test','test2'],
    error:null,
    loading:false,
}


// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState,action){

    switch (action.type){
        default:
            return state;
    }

}