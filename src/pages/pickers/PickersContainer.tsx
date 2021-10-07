import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actions as pendingUserActions, selectors as pendingUserSelectors} from "reducers/pickers";
import { PendingUserAdmin } from "pages/pickers/Pickers";
import {titulosAdminPending,titulosAdminActive} from "utils/constants"
import { ChangePageTypes, PickersParamsType, PickersContainerTypes, ParamsTypeMiddleware, PickerContainerTypes } from "./types";
import { StateType } from "reducers/types/pickers";

const PendingUserAdminContainer:React.FC<PickerContainerTypes> = (props:PickersContainerTypes):JSX.Element => {
   
    const changePage = (page:ChangePageTypes) => {
        props.setActualPage(page);
    };


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
        <PendingUserAdmin
             {...props}
            changePage={changePage}
            tableTitles={props.actualPage==="PENDING"?titulosAdminPending:titulosAdminActive}
        />
    );
};

const mapStateToProps = (state:StateType) => ({
    pendingUsers: pendingUserSelectors.getPendingUser(state),
    isFetching: pendingUserSelectors.isFetching(state),
    filters: pendingUserSelectors.getFilters(state),
    filtersExtra: pendingUserSelectors.getFiltersExtra(state),
    filtersExtraSeeMore: pendingUserSelectors.getFiltersExtraSeeMore(state),
    seeMore: pendingUserSelectors.getSeeMore(state),
    pag: pendingUserSelectors.getPag(state),
    actualPage:pendingUserSelectors.getActualPage(state),
});

const mapDispatchToProps = (dispatch:Function) => ({
    reset: () => {
        dispatch(pendingUserActions.reset());
    },
    getPendingUser: (params:ParamsTypeMiddleware) => {
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
    getPendingUsersExportRequest:(params:ParamsTypeMiddleware,element:HTMLElement)=>{
        dispatch(pendingUserActions.getPendingUserExportRequest(params,element))
    },
    getMorePendingUser: (params:ParamsTypeMiddleware) => {
        dispatch(pendingUserActions.getMorePendingUserRequest(params));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(PendingUserAdminContainer);
