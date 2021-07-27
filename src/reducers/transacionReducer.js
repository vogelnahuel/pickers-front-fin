//cada reducer tiene su propio state
import { 
    CHANGE_HISTORY,
    CHANGE_REASONS_CANCELED,
    CHANGE_REASONS_CONFIRM,
    CHANGE_FINISH_MODAL
} from '../types/index'

//para testear
const initialState = {
    history:true,
    ReasonsCanceled:false,
    ReasonsCanceledConfirm:false,
    FinishModal:false
}


export const  transactionReducerVolver = (state=initialState,action)=>{

    switch (action.type){
        default:
            return state;
    }

}