import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/pickers";
import  {Pickers} from "pages/pickers/Pickers";
import {titulosAdminPending,titulosAdminActive} from "utils/constants"
import {  PickersParamsType, ParamsMiddlewareType, } from "./types";
import { AppDispatch, RootState } from "store";

//const PendingUserAdminContainer:React.FC<PickerContainerTypes> = (props):JSX.Element => {
const PendingUserAdminContainer:React.FC<any> = (props):JSX.Element => {
    // const changePage = (page:ChangePageTypes) => {
    //     props.setActualPage(page);
    // };


    useEffect(() => {
        const filters = props.actualPage==="PENDING"?{pickerStatusId:"2,3"}:{pickerStatusId:"4,5"};
        const filtersExtra={limit:3};
        //window.screen.height<770 ? 3 : 3
        props.setPendingUserExtraFilters(filtersExtra)
        props.setPendingUserFilters(filters);
        props.getPendingUser(({...filtersExtra, ...filters}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.actualPage])

    return (
        <Pickers
             {...props}
           // changePage={changePage}
            tableTitles={props.actualPage==="PENDING"?titulosAdminPending:titulosAdminActive}
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
    sizePage: pendingUserSelectors.getSizePage(state),
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
