import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import { AppDispatch, RootState } from "store";
import { TransactionContainerType } from "./types";
import { ModalTransaction } from "./ModalTransaction";

const TransactionContainer = (props:TransactionContainerType):JSX.Element => {
    const [resolutionHeightModal, setresolutionHeightModal] = useState(550)

    useEffect(() => {
        if(window.screen.width<1300){
            setresolutionHeightModal(496)
            
        }
        if(window.screen.width>1900){
            setresolutionHeightModal(675)
        }
    }, [])

    return (
        <ModalTransaction  resolutionHeightModal={resolutionHeightModal} {...props}/>
    );
}


const mapStateToProps = (state:RootState) => ({

});


const mapDispatchToProps = (dispatch:AppDispatch) => ({
   
    
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer);
