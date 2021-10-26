import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/pickers";
import  {Pickers} from "pages/pickers/Pickers";
import {titlesAdminPending,titlesAdminActive} from "utils/constants"
import {  PickersParamsType, ParamsMiddlewareType, PickerContainerTypes, } from "./types";
import { AppDispatch, RootState } from "store";

const PendingUserAdminContainer:React.FC<PickerContainerTypes> = (props):JSX.Element => {

    console.log(props.actualPage)
    
    useEffect(() => {
        const filters = props.actualPage==="PENDING"?{pickerStatusId:"2,3"}:{pickerStatusId:"4,5"};
        const filtersExtra={limit:3};
        props.setPendingUserExtraFilters(filtersExtra)
        props.setPendingUserFilters(filters);
        props.getPendingUser(({...filtersExtra, ...filters}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.actualPage])

    return (
        <Pickers
             {...props}
            tableTitles={props.actualPage==="PENDING"?titlesAdminPending:titlesAdminActive}
        />
    );
};

const mapStateToProps = (state:RootState) => ({
    pendingUsers: pendingUserSelectors.getPendingUser(state),
    isFetching: pendingUserSelectors.isFetching(state),
    filters: pendingUserSelectors.getFilters(state),
    filtersExtra: pendingUserSelectors.getFiltersExtra(state),
    filtersExtraSeeMore: pendingUserSelectors.getFiltersExtraSeeMore(state),
    seeMore: pendingUserSelectors.getSeeMore(state),
    actualPage:pendingUserSelectors.getActualPage(state),
});

const mapDispatchToProps = (dispatch:AppDispatch) => ({
    reset: () => {
        dispatch(pendingUserActions.reset());
    },
    getPendingUser: (params:ParamsMiddlewareType) => {
        dispatch(pendingUserActions.getPendingUserRequest(params));
    },
    setPendingUserFilters:(filters:PickersParamsType)=>{
        dispatch(pendingUserActions.setPendingUserFilters(filters));
    },
    setPendingUserExtraFilters:(extraFilters:PickersParamsType)=>{
        dispatch(pendingUserActions.setPendingUserExtraFilters(extraFilters));
    },
    setActualPage:(page:String)=>{
        dispatch(pendingUserActions.setActualPage(page));
    },
    getPendingUsersExportRequest:(params:ParamsMiddlewareType,element:HTMLElement)=>{
        dispatch(pendingUserActions.getPendingUserExportRequest(params,element))
    },
    getMorePendingUser: (params:ParamsMiddlewareType) => {
        dispatch(pendingUserActions.getMorePendingUserRequest(params));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(PendingUserAdminContainer);
