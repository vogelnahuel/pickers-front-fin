import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {actions as transactionActions, selectors as transactionSelectors} from "reducers/transactions";
import {Transaction} from "pages/transaction/Transaction"
import {useLocation} from "react-router-dom";
import parseQueryParams from "utils/parseQueryParams"
import moment from "moment";
import { AppDispatch, RootState } from "store";
import { TransactionContainerPropsType, URLTransactionContainerType } from "./types";
import { FilterTransactionsType } from "sagas/types/transactions";
import { SetFilterExtraType, SetFilterType } from "reducers/types/transaction";

const TransactionContainer: React.FC<TransactionContainerPropsType> = (props):JSX.Element => {
    const params = useLocation()
    const [resolutionHeightModal, setresolutionHeightModal] = useState(550)
    

    useEffect(() => {
        if(window.screen.width<1300){
            setresolutionHeightModal(496)
            
        }
        if(window.screen.width>1900){
            setresolutionHeightModal(675)
        }
        props.reset();

        const filters:URLTransactionContainerType = parseQueryParams(params.search);
        filters.inAlert=Boolean(filters.inAlert);
        

        filters.maxMinDeliveryDate && (filters.date = { from: moment(filters.minMinDeliveryDate, "YYYY-MM-DD").format("DD/MM/YYYY"), until: moment(filters.maxMinDeliveryDate, "YYYY-MM-DD").format("DD/MM/YYYY") });
        const filtersExtra={limit:window.screen.height<770 ? 3 : 4};
        props.setExtraFilters(filtersExtra);
        props.getTransactions({...filtersExtra, ...filters});
        props.setFilters(filters || {});
        // eslint-disable-next-line
    }, [])

    return (
        <Transaction   resolutionHeightModal={resolutionHeightModal} {...props}/>
    );
}


const mapStateToProps = (state:RootState) => ({
    transactions: transactionSelectors.getTransactions(state),
    isFetching: transactionSelectors.isFetching(state),
    isExportDisabled: transactionSelectors.isExportDisabled(state),
    filters: transactionSelectors.getFilters(state),
    filtersExtra: transactionSelectors.getFiltersExtra(state),
    seeMore: transactionSelectors.getSeeMore(state),
    filtersExtraSeeMore: transactionSelectors.getFiltersExtraSeeMore(state),
    detailTransactionModalOpen:transactionSelectors.getDetailTransactionModalOpen(state),

});


const mapDispatchToProps = (dispatch:AppDispatch) => ({
    getTransactionsExportRequest: (params:FilterTransactionsType,element:HTMLElement) => {
        dispatch(transactionActions.getTransactionsExportRequest(params,element));
    },
    getTransactions: (params:FilterTransactionsType) => {
        dispatch(transactionActions.getTransactionsRequest(params));
    },
    reset: () => {
        dispatch(transactionActions.reset());
    },
    setFilters: (filters:SetFilterType) => {
        dispatch(transactionActions.setTransactionFilters(filters));
    },
    setExtraFilters: (extraFilters:SetFilterExtraType) => {
        dispatch(transactionActions.setTransactionExtraFilters(extraFilters));
    },
    getMoreTransactions: (params:FilterTransactionsType) => {
        dispatch(transactionActions.getMoreTransactionsRequest(params));
    },
    
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer);
