//cada reducer tiene su propio state
import {types} from '../types/index'

//para testear
const initialState = {
    history:true,
    ReasonsCanceled:false,
    ReasonsCanceledConfirm:false,
    FinishModal:false,
    agregarTest:'test1'
}



export const  modalTransactionReducer = (state=initialState,action) => {

    switch (action.type){
        case  types.CHANGE_HISTORY:
            return{
                ...initialState,
                history: !action.payload
            }
           
        case  types.CHANGE_REASONS_CANCELED:
            return{
                ...initialState,
                ReasonsCanceled: !action.payload
            }
             
        case  types.CHANGE_REASONS_CONFIRM:
            return{
                ...initialState,
                ReasonsCanceledConfirm: !action.payload
            }
               
        case  types.CHANGE_FINISH_MODAL:
            return{
                ...initialState,
                FinishModal: !action.payload
            }
        case types.TEST:
            return{
                ...initialState,
                agregarTest:action.payload
            }

                
        default:
            return state;
    }

}