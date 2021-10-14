import React, {useEffect} from "react";
import {connect} from "react-redux";
import {actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import {Transaction} from "pages/transaction/Transaction"

import { AppDispatch, RootState } from "store";



const TransactionContainer: React.FC<any> = (props):JSX.Element => {
   
    useEffect(() => {
  
    }, [])

    return (
        <Transaction   {...props}/>
    );
}


const mapStateToProps = (state:RootState) => ({
   
});


const mapDispatchToProps = (dispatch:AppDispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer);
