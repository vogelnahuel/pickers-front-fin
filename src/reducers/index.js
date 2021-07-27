import { combineReducers } from "redux";
import { modalTransactionReducer } from "./transactionReducer";


export default combineReducers({
    modalTransactionReducer:modalTransactionReducer
})
